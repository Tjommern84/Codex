'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import type { WorkoutPoseCard, WorkoutSections } from '@/lib/workout/types'
import { getPoseImage } from '@/lib/workout/poseImages'

interface FlatPose extends WorkoutPoseCard {
  section: 'Oppvarming' | 'Hovedprogram' | 'Avspenning'
}

function flattenWorkout(workout: WorkoutSections): FlatPose[] {
  return [
    ...workout.warmup.map((p) => ({ ...p, section: 'Oppvarming' as const })),
    ...workout.main.map((p) => ({ ...p, section: 'Hovedprogram' as const })),
    ...workout.cooldown.map((p) => ({ ...p, section: 'Avspenning' as const })),
  ]
}

// ROGBIFF: dype, mørke farger — Fiolett → Rød
const ROGBIFF: [number, number, number][] = [
  [80, 15, 110],
  [40, 20, 120],
  [15, 50, 130],
  [15, 90, 40],
  [100, 90, 10],
  [130, 60, 10],
  [120, 20, 20],
]

function getBgColor(progress: number): string {
  const n = ROGBIFF.length - 1
  const scaled = Math.max(0, Math.min(1, progress)) * n
  const i = Math.min(Math.floor(scaled), n - 1)
  const t = scaled - i
  const a = ROGBIFF[i]
  const b = ROGBIFF[i + 1]
  const r = Math.round(a[0] + (b[0] - a[0]) * t)
  const g = Math.round(a[1] + (b[1] - a[1]) * t)
  const bl = Math.round(a[2] + (b[2] - a[2]) * t)
  return `rgb(${r}, ${g}, ${bl})`
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function playTransitionTone(audioCtx: AudioContext) {
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.connect(gain)
  gain.connect(audioCtx.destination)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(432, audioCtx.currentTime)
  gain.gain.setValueAtTime(0, audioCtx.currentTime)
  gain.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + 0.08)
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2)
  osc.start(audioCtx.currentTime)
  osc.stop(audioCtx.currentTime + 1.2)
}

interface Props {
  workout: WorkoutSections
  onClose: () => void
  showInstructions?: boolean
}

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
  const radius = 48
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * progress

  return (
    <button
      onClick={onToggle}
      className="relative flex items-center justify-center"
      style={{ width: 120, height: 120 }}
      aria-label={isRunning ? 'Pause' : 'Fortsett'}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="3"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="tabular-nums text-white font-light"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.75rem',
            letterSpacing: '0.05em',
            lineHeight: 1,
          }}
        >
          {formatTime(timeLeft)}
        </span>
        <span
          className="text-white mt-1"
          style={{ fontSize: '0.55rem', opacity: 0.4, letterSpacing: '0.12em', fontFamily: "'DM Sans', sans-serif" }}
        >
          {isRunning ? 'PAUSE' : 'FORTSETT'}
        </span>
      </div>
    </button>
  )
}

export default function WorkoutPlayer({ workout, onClose, showInstructions = true }: Props) {
  const poses = flattenWorkout(workout)
  const [poseIndex, setPoseIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(poses[0].assignedDurationSec)
  const [isRunning, setIsRunning] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [instrSynlig, setInstrSynlig] = useState(showInstructions)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const currentPose = poses[poseIndex]
  const poseProgress = 1 - timeLeft / currentPose.assignedDurationSec
  const bgColor = getBgColor(poseProgress)
  const imageSrc = getPoseImage(currentPose.slug)

  // Session-fremdrift
  const totalDuration = poses.reduce((acc, p) => acc + p.assignedDurationSec, 0)
  const elapsedBefore = poses.slice(0, poseIndex).reduce((acc, p) => acc + p.assignedDurationSec, 0)
  const sessionProgress = (elapsedBefore + (currentPose.assignedDurationSec - timeLeft)) / totalDuration

  const sectionColors: Record<string, string> = {
    Oppvarming: 'rgba(255,185,110,0.7)',
    Hovedprogram: 'rgba(110,210,255,0.7)',
    Avspenning: 'rgba(190,150,255,0.7)',
  }
  const sectionDotColor = sectionColors[currentPose.section] ?? 'rgba(255,255,255,0.5)'

  function ensureAudioCtx() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
  }

  function triggerTransitionEffects() {
    if (audioCtxRef.current) playTransitionTone(audioCtxRef.current)
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(60)
  }

  function animateTransition(callback: () => void) {
    setIsTransitioning(true)
    setTimeout(() => {
      callback()
      setTimeout(() => setIsTransitioning(false), 50)
    }, 300)
  }

  const goToNext = useCallback(() => {
    triggerTransitionEffects()
    animateTransition(() => {
      if (poseIndex < poses.length - 1) {
        const next = poseIndex + 1
        setPoseIndex(next)
        setTimeLeft(poses[next].assignedDurationSec)
      } else {
        onClose()
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poseIndex, poses, onClose])

  const goToPrev = useCallback(() => {
    if (poseIndex === 0) return
    triggerTransitionEffects()
    animateTransition(() => {
      const prev = poseIndex - 1
      setPoseIndex(prev)
      setTimeLeft(poses[prev].assignedDurationSec)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poseIndex, poses])

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          goToNext()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isRunning, goToNext])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .pose-content {
          animation: fadeUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .pose-image-bg {
          animation: fadeIn 0.8s ease both;
        }
        .glass-scroll::-webkit-scrollbar { display: none; }
        .glass-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Root container */}
      <div
        className="fixed inset-0 z-50 overflow-hidden"
        style={{
          backgroundColor: bgColor,
          transition: 'background-color 2s ease',
          fontFamily: "'DM Sans', sans-serif",
        }}
        onClick={ensureAudioCtx}
      >
        {/* Støy-tekstur */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            opacity: 0.04,
            mixBlendMode: 'overlay',
            zIndex: 1,
          }}
        />

        {/* Bilde — synlig kort i øvre sone */}
        <div
          key={`img-${poseIndex}`}
          className="absolute pose-image-bg"
          style={{
            top: '4.5rem',
            left: '1rem',
            right: '1rem',
            bottom: 'calc(60vh + 0.75rem)',
            borderRadius: '1.25rem',
            overflow: 'hidden',
            backgroundColor: 'rgba(0,0,0,0.18)',
            zIndex: 2,
            opacity: isTransitioning ? 0 : 1,
            transition: 'opacity 0.35s ease',
          }}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={currentPose.name_en}
              fill
              className="object-contain p-3"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span style={{ fontSize: '3rem', opacity: 0.15 }}>🧘</span>
            </div>
          )}
        </div>

        {/* Gradient veil: transparent → bgColor fra midten ned */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: '65%',
            background: `linear-gradient(to bottom, transparent 0%, ${bgColor} 55%)`,
            transition: 'background 2s ease',
            zIndex: 3,
          }}
        />

        {/* Sesjons-fremgangsbar — 2px øverst */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{ height: '2px', backgroundColor: 'rgba(255,255,255,0.1)', zIndex: 10 }}
        >
          <div
            style={{
              height: '100%',
              width: `${sessionProgress * 100}%`,
              backgroundColor: 'rgba(255,255,255,0.45)',
              transition: 'width 1s linear',
            }}
          />
        </div>

        {/* Svevende header */}
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-between"
          style={{ padding: '1.75rem 1.25rem 0.75rem', zIndex: 11 }}
        >
          <button
            onClick={onClose}
            className="text-white"
            style={{ opacity: 0.38, fontSize: '0.7rem', letterSpacing: '0.18em', fontWeight: 300 }}
          >
            AVSLUTT
          </button>

          {/* Instruksjon-toggle */}
          {currentPose.instruksjon && currentPose.instruksjon.length > 0 && (
            <button
              onClick={() => setInstrSynlig((v) => !v)}
              className="flex items-center gap-1.5 text-white transition-opacity duration-150"
              style={{ opacity: instrSynlig ? 0.75 : 0.32, fontSize: '0.62rem', letterSpacing: '0.14em', fontWeight: 300 }}
              aria-label={instrSynlig ? 'Skjul instruksjon' : 'Vis instruksjon'}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M4 5h8M4 8h6M4 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              STEG
            </button>
          )}

          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: sectionDotColor }}
            />
            <span
              className="text-white"
              style={{ fontSize: '0.65rem', letterSpacing: '0.16em', opacity: 0.55, fontWeight: 300 }}
            >
              {currentPose.section.toUpperCase()}
            </span>
          </div>

          <span
            className="text-white"
            style={{ opacity: 0.3, fontSize: '0.7rem', letterSpacing: '0.1em', fontWeight: 300 }}
          >
            {poseIndex + 1} / {poses.length}
          </span>
        </div>

        {/* Frosted glass panel — vokser opp fra bunnen */}
        <div
          className="absolute bottom-0 left-0 right-0 flex flex-col"
          style={{
            height: '60vh',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            backgroundColor: 'rgba(0,0,0,0.12)',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '1.75rem 1.75rem 0 0',
            zIndex: 5,
          }}
        >
          {/* Pose-navn */}
          <div
            key={`name-${poseIndex}`}
            className="px-6 pt-5 pb-1 shrink-0 pose-content"
            style={{ opacity: isTransitioning ? 0 : 1, transition: 'opacity 0.3s ease' }}
          >
            <h2
              className="text-white"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.7rem, 6.5vw, 2.4rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              {currentPose.name_no}
            </h2>
            <p
              className="text-white italic mt-0.5"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '0.9rem',
                fontWeight: 300,
                opacity: 0.4,
                letterSpacing: '0.04em',
              }}
            >
              {currentPose.name_en}
            </p>
          </div>

          {/* Scrollbart innhold */}
          <div
            key={`desc-${poseIndex}`}
            className="flex-1 overflow-y-auto px-6 pt-2 pb-1 glass-scroll pose-content"
            style={{ opacity: isTransitioning ? 0 : 1, transition: 'opacity 0.3s ease' }}
          >
            {instrSynlig && currentPose.instruksjon && currentPose.instruksjon.length > 0 ? (
              <ol className="space-y-2">
                {currentPose.instruksjon.map((step, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span
                      className="shrink-0 text-white"
                      style={{
                        fontSize: '0.65rem',
                        opacity: 0.32,
                        marginTop: '0.3em',
                        letterSpacing: '0.06em',
                        fontWeight: 300,
                        minWidth: '1.4em',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="text-white leading-relaxed"
                      style={{ fontSize: '0.82rem', opacity: 0.8, fontWeight: 300, lineHeight: 1.65 }}
                    >
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            ) : currentPose.function_desc ? (
              <p
                className="text-white leading-relaxed"
                style={{ fontSize: '0.84rem', opacity: 0.8, fontWeight: 300, lineHeight: 1.65 }}
              >
                {currentPose.function_desc}
              </p>
            ) : null}

            {currentPose.kontraindikasjon && (
              <p
                className="text-white mt-3 leading-relaxed"
                style={{ fontSize: '0.7rem', opacity: 0.38, fontWeight: 300, lineHeight: 1.6, fontStyle: 'italic' }}
              >
                ⚠ {currentPose.kontraindikasjon}
              </p>
            )}

            {currentPose.muscle_groups.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3 pb-1">
                {currentPose.muscle_groups.map((mg) => (
                  <span
                    key={mg}
                    className="text-white px-2 py-0.5 rounded-full"
                    style={{
                      fontSize: '0.62rem',
                      opacity: 0.45,
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {mg}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Timer + navigasjon — forankret i bunnen av glasspanelet */}
          <div
            className="px-5 py-4 flex items-center justify-between shrink-0"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
          >
            <button
              onClick={goToPrev}
              disabled={poseIndex === 0}
              className="flex flex-col items-center gap-1"
              style={{ opacity: poseIndex === 0 ? 0.12 : 0.5 }}
              aria-label="Forrige pose"
            >
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                <path d="M18 6L10 14L18 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-white" style={{ fontSize: '0.55rem', letterSpacing: '0.12em' }}>FORRIGE</span>
            </button>

            <CircularTimer
              progress={poseProgress}
              timeLeft={timeLeft}
              isRunning={isRunning}
              onToggle={() => {
                ensureAudioCtx()
                setIsRunning((r) => !r)
              }}
            />

            <button
              onClick={goToNext}
              className="flex flex-col items-center gap-1"
              style={{ opacity: 0.5 }}
              aria-label="Neste pose"
            >
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                <path d="M10 6L18 14L10 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-white" style={{ fontSize: '0.55rem', letterSpacing: '0.12em' }}>NESTE</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
