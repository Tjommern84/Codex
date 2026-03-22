'use client'

import { useEffect } from 'react'
import type { WorkoutPoseCard } from '@/lib/workout/types'
import { POSES } from '@/lib/workout/posesData'
import { getPoseImage } from '@/lib/workout/poseImages'

const DISPLAY = "var(--font-display, 'Cormorant Garamond', serif)"
const BODY    = "var(--font-body, 'DM Sans', sans-serif)"

const INTENSITY_COLORS: Record<number, string> = {
  1: '#8A9E8C', 2: '#9DB09F', 3: '#C4A060',
  4: '#CC8860', 5: '#C07050', 6: '#B05545',
}

interface Props {
  pose: WorkoutPoseCard | null
  onClose: () => void
}

export default function PoseModal({ pose, onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!pose) return null

  const fullPose = POSES.find((p) => p.slug === pose.slug)
  const color = INTENSITY_COLORS[pose.intensity_level] ?? '#C4A060'
  const imageSrc = getPoseImage(pose.slug)

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ backgroundColor: 'rgba(58,53,48,0.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-y-auto"
        style={{
          backgroundColor: '#F2EDE4',
          maxHeight: '92dvh',
          borderRadius: '28px 28px 0 0',
          boxShadow: '0 -8px 48px rgba(180,160,130,0.18)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-4 pb-2">
          <div
            className="rounded-full"
            style={{ width: 32, height: 3, backgroundColor: 'rgba(180,160,130,0.28)' }}
          />
        </div>

        {/* Sticky header */}
        <div
          className="sticky top-0 z-10 px-6 pb-4 pt-2"
          style={{
            backgroundColor: '#F2EDE4',
            borderBottom: '1px solid rgba(180,160,130,0.12)',
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                style={{
                  fontFamily: DISPLAY,
                  fontSize: '2rem',
                  fontWeight: 300,
                  color: '#3A3530',
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                }}
              >
                {pose.name_no}
              </h2>
              <p
                style={{
                  fontFamily: DISPLAY,
                  fontSize: '1rem',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#B0A89E',
                  marginTop: 3,
                }}
              >
                {pose.name_en}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center rounded-full shrink-0 transition-opacity duration-150"
              style={{
                width: 30,
                height: 30,
                backgroundColor: 'rgba(180,160,130,0.12)',
                color: '#7A7068',
                fontSize: '1rem',
                marginTop: 4,
              }}
              aria-label="Lukk"
            >
              ×
            </button>
          </div>

          <div className="flex gap-2 mt-3 flex-wrap">
            <Pill accent={color}>{pose.intensity_label}</Pill>
            <Pill>{pose.category}</Pill>
            <Pill>{Math.round(pose.assignedDurationSec / 60)} min</Pill>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pb-12 flex flex-col gap-8 pt-6">

          {/* Image */}
          {imageSrc && (
            <div
              className="rounded-[20px] overflow-hidden"
              style={{
                backgroundColor: 'rgba(255,252,247,0.6)',
                border: '1px solid rgba(255,255,255,0.6)',
              }}
            >
              <img
                src={imageSrc}
                alt={pose.name_no}
                className="w-full object-contain"
                style={{ maxHeight: 220 }}
              />
            </div>
          )}

          {/* Funksjon */}
          {pose.function_desc && (
            <ModalSection title="Funksjon">
              <p style={{ fontFamily: BODY, fontSize: '0.875rem', fontWeight: 300, color: '#7A7068', lineHeight: 1.75 }}>
                {pose.function_desc}
              </p>
            </ModalSection>
          )}

          {/* Instruksjon */}
          {fullPose?.instruksjon && fullPose.instruksjon.length > 0 && (
            <ModalSection title="Slik utfører du posen">
              <ol className="flex flex-col gap-3.5">
                {fullPose.instruksjon.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: 'rgba(232,201,154,0.18)',
                        color: '#C4A060',
                        fontFamily: BODY,
                        fontSize: '0.62rem',
                        fontWeight: 400,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      style={{
                        fontFamily: BODY,
                        fontSize: '0.85rem',
                        fontWeight: 300,
                        color: '#7A7068',
                        lineHeight: 1.75,
                        paddingTop: 2,
                      }}
                    >
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </ModalSection>
          )}

          {/* Anatomi */}
          <ModalSection title="Anatomi & Energi">
            <div className="grid grid-cols-2 gap-2">
              {pose.muscle_groups.length > 0 && (
                <InfoCell label="Muskelgrupper" value={pose.muscle_groups.join(', ')} />
              )}
              {pose.meridian_tension.length > 0 && (
                <InfoCell label="Meridian — tøy" value={pose.meridian_tension.join(', ')} />
              )}
              {pose.meridian_compress.length > 0 && (
                <InfoCell label="Meridian — komp." value={pose.meridian_compress.join(', ')} />
              )}
              <InfoCell label="Intensitet" value={`${pose.intensity_level} / 6`} />
            </div>
          </ModalSection>

          {/* Tilpasning */}
          {fullPose?.tilpasning && (
            <ModalSection title="Tilpasning & Props">
              <div
                className="p-4 rounded-[16px]"
                style={{
                  backgroundColor: 'rgba(138,158,140,0.10)',
                  border: '1px solid rgba(138,158,140,0.18)',
                }}
              >
                <p style={{ fontFamily: BODY, fontSize: '0.85rem', fontWeight: 300, color: '#5C7A65', lineHeight: 1.75 }}>
                  {fullPose.tilpasning}
                </p>
              </div>
            </ModalSection>
          )}

          {/* Forsiktighetsregler */}
          {fullPose?.kontraindikasjon && (
            <ModalSection title="Forsiktighetsregler">
              <div
                className="p-4 rounded-[16px]"
                style={{
                  backgroundColor: 'rgba(222,184,168,0.15)',
                  border: '1px solid rgba(222,184,168,0.25)',
                }}
              >
                <p style={{ fontFamily: BODY, fontSize: '0.85rem', fontWeight: 300, color: '#A06858', lineHeight: 1.75 }}>
                  {fullPose.kontraindikasjon}
                </p>
              </div>
            </ModalSection>
          )}

        </div>
      </div>
    </div>
  )
}

function Pill({ accent, children }: { accent?: string; children: React.ReactNode }) {
  return (
    <span
      className="px-2.5 py-1 rounded-full"
      style={{
        backgroundColor: accent ? accent + '18' : 'rgba(180,160,130,0.12)',
        color: accent ?? '#7A7068',
        fontFamily: BODY,
        fontSize: '0.6rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </span>
  )
}

function ModalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3
        style={{
          fontFamily: BODY,
          fontSize: '0.58rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#B0A89E',
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  )
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="p-3 rounded-[14px] flex flex-col gap-1.5"
      style={{
        backgroundColor: 'rgba(255,252,247,0.65)',
        border: '1px solid rgba(255,255,255,0.6)',
      }}
    >
      <span
        style={{
          fontFamily: BODY,
          fontSize: '0.56rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#B0A89E',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: BODY,
          fontSize: '0.82rem',
          fontWeight: 300,
          color: '#3A3530',
        }}
      >
        {value}
      </span>
    </div>
  )
}
