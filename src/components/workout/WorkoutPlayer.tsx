'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import type { WorkoutPoseCard, WorkoutSections } from '@/lib/workout/types'
import { getPoseImage } from '@/lib/workout/poseImages'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FlatPose extends WorkoutPoseCard {
  section: 'Hovedprogram' | 'Savasana'
}

function flattenWorkout(workout: WorkoutSections): FlatPose[] {
  return [
    ...workout.main.map((p) => ({ ...p, section: 'Hovedprogram' as const })),
    ...workout.cooldown.map((p) => ({ ...p, section: 'Savasana' as const })),
  ]
}

// ─── Design tokens ────────────────────────────────────────────────────────────

const TOKENS = {
  bgPage:    '#FAF6F0',
  bgCard:    '#F2EDE4',
  bgCardAlt: '#EDE7DC',

  textPrimary:   '#3A3530',
  textSecondary: '#7A7068',
  textGhost:     '#B0A89E',

  green:      '#4A6B56',
  greenLight: '#E8EFE9',
  gold:       '#C9A96E',
  goldLight:  '#F5EDD8',

  border:       'rgba(58,53,48,0.10)',
  borderStrong: 'rgba(58,53,48,0.18)',
}

// ─── Intensity badge colours ───────────────────────────────────────────────────

const INTENSITY_STYLE: Record<string, { bg: string; color: string }> = {
  'lav':        { bg: TOKENS.greenLight, color: TOKENS.green },
  'lav-medium': { bg: TOKENS.greenLight, color: TOKENS.green },
  'medium':     { bg: TOKENS.goldLight,  color: '#8A6830'    },
  'medium-høy': { bg: TOKENS.goldLight,  color: '#8A6830'    },
  'høy':        { bg: '#FDE8DC',         color: '#A04520'    },
  'maks':       { bg: '#FCDDD4',         color: '#8B2F1E'    },
}

function getIntensityStyle(label?: string) {
  if (!label) return null
  return INTENSITY_STYLE[label.toLowerCase()] ?? null
}

// ─── Section pill colours ──────────────────────────────────────────────────────

const SECTION_STYLE: Record<string, { bg: string; color: string }> = {
  Savasana:     { bg: TOKENS.goldLight,  color: '#8A6830'   },
  Hovedprogram: { bg: TOKENS.greenLight, color: TOKENS.green },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DISPLAY = "var(--font-display, 'Cormorant Garamond', serif)"
const BODY    = "var(--font-body, 'DM Sans', sans-serif)"

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function playTransitionTone(audioCtx: AudioContext) {
  const osc  = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.connect(gain)
  gain.connect(audioCtx.destination)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(432, audioCtx.currentTime)
  gain.gain.setValueAtTime(0, audioCtx.currentTime)
  gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.10)
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.4)
  osc.start(audioCtx.currentTime)
  osc.stop(audioCtx.currentTime + 1.4)
}

// ─── Circular timer ───────────────────────────────────────────────────────────

function CircularTimer({
  progress,
  timeLeft,
  isRunning,
  onToggle,
}: {
  progress: number
  timeLeft: number
  isRunning: boolean
  onToggle: () => void
}) {
  const radius      = 36
  const circumference = 2 * Math.PI * radius
  const dashOffset  = circumference * progress

  return (
    <button
      onClick={onToggle}
      aria-label={isRunning ? 'Pause' : 'Fortsett'}
      style={{
        position: 'relative',
        width: 96,
        height: 96,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg
        width="96"
        height="96"
        viewBox="0 0 96 96"
        style={{ position: 'absolute', transform: 'rotate(-90deg)' }}
      >
        <circle
          cx="48" cy="48" r={radius}
          fill="none"
          stroke={TOKENS.border}
          strokeWidth="2"
        />
        <circle
          cx="48" cy="48" r={radius}
          fill="none"
          stroke={TOKENS.gold}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>

      <div style={{ position: 'relative', textAlign: 'center' }}>
        <div style={{
          fontFamily: DISPLAY,
          fontSize: '1.45rem',
          fontWeight: 300,
          color: TOKENS.textPrimary,
          letterSpacing: '0.03em',
          lineHeight: 1,
        }}>
          {formatTime(timeLeft)}
        </div>
        <div style={{
          fontFamily: BODY,
          fontSize: '0.5rem',
          color: TOKENS.textGhost,
          letterSpacing: '0.16em',
          marginTop: 4,
        }}>
          {isRunning ? 'PAUSE' : 'FORTSETT'}
        </div>
      </div>
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  workout: WorkoutSections
  onClose: () => void
  showInstructions?: boolean
}

export default function WorkoutPlayer({ workout, onClose }: Props) {
  const poses = flattenWorkout(workout)
  const [idx, setIdx]           = useState(0)
  const [timeLeft, setTimeLeft] = useState(poses[0].assignedDurationSec)
  const [isRunning, setIsRunning]     = useState(true)
  const [transitioning, setTransitioning] = useState(false)
  const audioRef = useRef<AudioContext | null>(null)

  const pose          = poses[idx]
  const poseProgress  = 1 - timeLeft / pose.assignedDurationSec
  const imageSrc      = getPoseImage(pose.slug)
  const intensityStyle = getIntensityStyle(pose.intensity_label)
  const sectionStyle   = SECTION_STYLE[pose.section] ?? { bg: TOKENS.greenLight, color: TOKENS.green }

  // Time-based session progress (more accurate than index-based)
  const totalDuration  = poses.reduce((acc, p) => acc + p.assignedDurationSec, 0)
  const elapsedBefore  = poses.slice(0, idx).reduce((acc, p) => acc + p.assignedDurationSec, 0)
  const sessionProgress = (elapsedBefore + (pose.assignedDurationSec - timeLeft)) / totalDuration

  function ensureAudio() {
    if (!audioRef.current) audioRef.current = new AudioContext()
    if (audioRef.current.state === 'suspended') audioRef.current.resume()
  }

  function triggerEffects() {
    if (audioRef.current) playTransitionTone(audioRef.current)
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(50)
  }

  function animateTransition(cb: () => void) {
    setTransitioning(true)
    setTimeout(() => { cb(); setTimeout(() => setTransitioning(false), 50) }, 280)
  }

  const goToNext = useCallback(() => {
    triggerEffects()
    animateTransition(() => {
      if (idx < poses.length - 1) {
        setIdx(idx + 1)
        setTimeLeft(poses[idx + 1].assignedDurationSec)
      } else {
        onClose()
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, poses, onClose])

  const goToPrev = useCallback(() => {
    if (idx === 0) return
    triggerEffects()
    animateTransition(() => {
      setIdx(idx - 1)
      setTimeLeft(poses[idx - 1].assignedDurationSec)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, poses])

  useEffect(() => {
    if (!isRunning) return
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { goToNext(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [isRunning, goToNext])

  return (
    <>
      <style>{`
        @keyframes wp-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .wp-fade   { animation: wp-up 0.42s cubic-bezier(0.22,1,0.36,1) both; }
        .wp-fade-2 { animation: wp-up 0.42s cubic-bezier(0.22,1,0.36,1) 0.06s both; }
        .glass-scroll::-webkit-scrollbar { display: none; }
        .glass-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Root */}
      <div
        className="fixed inset-0 z-50 flex flex-col"
        style={{ backgroundColor: TOKENS.bgPage, fontFamily: BODY, overflowY: 'auto' }}
        onClick={ensureAudio}
      >

        {/* Session progress — 2px gold line */}
        <div style={{ height: 2, backgroundColor: TOKENS.border, flexShrink: 0 }}>
          <div style={{
            height: '100%',
            width: `${sessionProgress * 100}%`,
            backgroundColor: TOKENS.gold,
            transition: 'width 1s linear',
          }} />
        </div>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem 0.5rem',
          flexShrink: 0,
        }}>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: TOKENS.textGhost,
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              fontFamily: BODY,
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke={TOKENS.textGhost} strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            TILBAKE
          </button>

          {/* Section pill */}
          <span style={{
            backgroundColor: sectionStyle.bg,
            color: sectionStyle.color,
            fontSize: '0.58rem',
            letterSpacing: '0.16em',
            fontWeight: 400,
            padding: '0.25rem 0.75rem',
            borderRadius: 999,
            fontFamily: BODY,
          }}>
            {pose.section.toUpperCase()}
          </span>

          <span style={{
            color: TOKENS.textGhost,
            fontFamily: BODY,
            fontSize: '0.65rem',
            letterSpacing: '0.06em',
          }}>
            {idx + 1} / {poses.length}
          </span>
        </div>

        {/* Image card */}
        <div
          key={`img-${idx}`}
          style={{
            margin: '0.75rem 1.5rem',
            borderRadius: 16,
            backgroundColor: TOKENS.bgCardAlt,
            border: `1px solid ${TOKENS.border}`,
            overflow: 'hidden',
            position: 'relative',
            height: '36vw',
            maxHeight: 220,
            minHeight: 140,
            flexShrink: 0,
            opacity: transitioning ? 0 : 1,
            transition: 'opacity 0.28s ease',
          }}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={pose.name_en}
              fill
              priority
              style={{
                objectFit: 'contain',
                padding: '1rem',
                mixBlendMode: 'multiply',
              }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="32" height="42" viewBox="0 0 28 36" fill="none" style={{ opacity: 0.15 }}>
                <path
                  d="M14 33 C14 33, 3 24, 3 14 C3 7, 7.5 3, 14 3 C20.5 3, 25 7, 25 14 C25 24, 14 33, 14 33Z"
                  stroke={TOKENS.textSecondary}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path d="M14 33 L14 6" stroke={TOKENS.textSecondary} strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </div>

        {/* Pose name */}
        <div
          key={`name-${idx}`}
          className="wp-fade"
          style={{
            padding: '0 1.5rem',
            flexShrink: 0,
            opacity: transitioning ? 0 : 1,
            transition: 'opacity 0.28s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h2 style={{
              fontFamily: DISPLAY,
              fontSize: 'clamp(1.8rem, 7vw, 2.4rem)',
              fontWeight: 300,
              color: TOKENS.textPrimary,
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
            }}>
              {pose.name_no}
            </h2>
            {intensityStyle && (
              <span style={{
                backgroundColor: intensityStyle.bg,
                color: intensityStyle.color,
                fontSize: '0.58rem',
                letterSpacing: '0.12em',
                padding: '0.2rem 0.55rem',
                borderRadius: 999,
                fontFamily: BODY,
                alignSelf: 'center',
                flexShrink: 0,
              }}>
                {pose.intensity_label.toUpperCase()}
              </span>
            )}
          </div>

          <p style={{
            fontFamily: DISPLAY,
            fontSize: '0.9rem',
            fontStyle: 'italic',
            fontWeight: 300,
            color: TOKENS.textGhost,
            marginTop: '0.15rem',
            letterSpacing: '0.04em',
          }}>
            {pose.name_en}
          </p>
        </div>

        {/* Separator */}
        <div style={{ margin: '0.75rem 1.5rem', height: 1, backgroundColor: TOKENS.border, flexShrink: 0 }} />

        {/* Instructions */}
        <div
          key={`desc-${idx}`}
          className="wp-fade-2 glass-scroll"
          style={{
            padding: '0 1.5rem',
            flex: 1,
            overflowY: 'auto',
            opacity: transitioning ? 0 : 1,
            transition: 'opacity 0.28s ease',
          }}
        >
          {pose.instruksjon && pose.instruksjon.length > 0 ? (
            <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {pose.instruksjon.map((step, i) => (
                <li key={i} style={{
                  display: 'flex',
                  gap: '0.75rem',
                  marginBottom: '0.55rem',
                  alignItems: 'flex-start',
                }}>
                  <span style={{
                    fontFamily: BODY,
                    fontSize: '0.6rem',
                    color: TOKENS.gold,
                    fontWeight: 400,
                    letterSpacing: '0.06em',
                    paddingTop: '0.2rem',
                    minWidth: 16,
                    flexShrink: 0,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{
                    fontFamily: BODY,
                    fontSize: '0.875rem',
                    color: TOKENS.textPrimary,
                    fontWeight: 300,
                    lineHeight: 1.65,
                    letterSpacing: '0.01em',
                  }}>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          ) : pose.function_desc ? (
            <p style={{
              fontFamily: BODY,
              fontSize: '0.875rem',
              color: TOKENS.textPrimary,
              fontWeight: 300,
              lineHeight: 1.7,
              margin: 0,
            }}>
              {pose.function_desc}
            </p>
          ) : null}

          {pose.kontraindikasjon && (
            <p style={{
              fontFamily: BODY,
              fontSize: '0.75rem',
              color: TOKENS.textGhost,
              fontStyle: 'italic',
              fontWeight: 300,
              lineHeight: 1.65,
              marginTop: '0.75rem',
            }}>
              {pose.kontraindikasjon}
            </p>
          )}

          {pose.muscle_groups.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.75rem', paddingBottom: '0.5rem' }}>
              {pose.muscle_groups.map((mg) => (
                <span key={mg} style={{
                  backgroundColor: TOKENS.bgCard,
                  color: TOKENS.textSecondary,
                  border: `1px solid ${TOKENS.border}`,
                  fontFamily: BODY,
                  fontSize: '0.58rem',
                  letterSpacing: '0.1em',
                  padding: '0.18rem 0.55rem',
                  borderRadius: 999,
                }}>
                  {mg.toUpperCase()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Separator */}
        <div style={{ margin: '0.75rem 1.5rem 0', height: 1, backgroundColor: TOKENS.border, flexShrink: 0 }} />

        {/* Timer + navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.6rem 2rem max(env(safe-area-inset-bottom), 1rem)',
          flexShrink: 0,
        }}>
          <button
            onClick={goToPrev}
            disabled={idx === 0}
            style={{
              background: 'none', border: 'none',
              cursor: idx === 0 ? 'default' : 'pointer',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 5,
              opacity: idx === 0 ? 0.18 : 0.55,
            }}
            aria-label="Forrige pose"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M14 4L7 11L14 18" stroke={TOKENS.textPrimary} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{
              color: TOKENS.textSecondary,
              fontFamily: BODY,
              fontSize: '0.52rem',
              letterSpacing: '0.14em',
            }}>
              FORRIGE
            </span>
          </button>

          <CircularTimer
            progress={poseProgress}
            timeLeft={timeLeft}
            isRunning={isRunning}
            onToggle={() => {
              ensureAudio()
              setIsRunning((r) => !r)
            }}
          />

          <button
            onClick={goToNext}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 5,
              opacity: 0.55,
            }}
            aria-label="Neste pose"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M8 4L15 11L8 18" stroke={TOKENS.textPrimary} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{
              color: TOKENS.textSecondary,
              fontFamily: BODY,
              fontSize: '0.52rem',
              letterSpacing: '0.14em',
            }}>
              NESTE
            </span>
          </button>
        </div>

      </div>
    </>
  )
}
