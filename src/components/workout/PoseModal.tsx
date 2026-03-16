'use client'

import { useEffect, useState } from 'react'
import type { WorkoutPoseCard, PoseVariant, PoseMedia } from '@/lib/workout/types'
import AudioPlayer from '@/components/audio/AudioPlayer'

interface Props {
  pose: WorkoutPoseCard | null
  onClose: () => void
}

interface PoseDetail {
  variant: PoseVariant | null
  image: PoseMedia | null
  audio: PoseMedia | null
}

const INTENSITY_COLORS: Record<number, string> = {
  1: '#6ec98b', 2: '#a8d8a8', 3: '#c9a96e',
  4: '#e0a040', 5: '#e07040', 6: '#c94040',
}

export default function PoseModal({ pose, onClose }: Props) {
  const [detail, setDetail] = useState<PoseDetail>({ variant: null, image: null, audio: null })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!pose) return
    setDetail({ variant: null, image: null, audio: null })
    setLoading(true)

    fetch(`/api/poses/${pose.slug}`)
      .then((r) => r.json())
      .then((data: PoseDetail) => setDetail(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [pose?.slug])

  // Lukk på Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!pose) return null

  const color = INTENSITY_COLORS[pose.intensity_level] ?? '#c9a96e'

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-t-3xl overflow-y-auto"
        style={{ backgroundColor: '#16213e', maxHeight: '90dvh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 pt-4 pb-3 px-5" style={{ backgroundColor: '#16213e' }}>
          <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ backgroundColor: '#444466' }} />
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-white">{pose.name_no}</h2>
              <p className="text-sm" style={{ color: '#8888aa' }}>{pose.name_en}</p>
            </div>
            <button
              onClick={onClose}
              className="text-2xl leading-none mt-1"
              style={{ color: '#666688' }}
              aria-label="Lukk"
            >
              ×
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            <span
              className="text-xs font-medium px-2 py-1 rounded-full"
              style={{ backgroundColor: color + '22', color }}
            >
              {pose.intensity_label}
            </span>
            <span
              className="text-xs font-medium px-2 py-1 rounded-full"
              style={{ backgroundColor: '#ffffff11', color: '#8888aa' }}
            >
              {pose.category}
            </span>
            <span
              className="text-xs font-medium px-2 py-1 rounded-full"
              style={{ backgroundColor: '#ffffff11', color: '#8888aa' }}
            >
              {Math.round(pose.assignedDurationSec / 60)} min
            </span>
          </div>
        </div>

        <div className="px-5 pb-8 flex flex-col gap-6">
          {/* Bilde */}
          {detail.image?.public_url && (
            <img
              src={detail.image.public_url}
              alt={pose.name_no}
              className="w-full rounded-2xl object-cover"
              style={{ maxHeight: 240 }}
            />
          )}

          {/* Audio-spiller */}
          {detail.audio && (
            <AudioPlayer slug={pose.slug} />
          )}

          {/* Funksjon */}
          {pose.function_desc && (
            <Section title="Funksjon">
              <p className="text-sm leading-relaxed" style={{ color: '#ccccdd' }}>
                {pose.function_desc}
              </p>
            </Section>
          )}

          {/* Instruksjon */}
          {detail.variant?.instruksjon && detail.variant.instruksjon.length > 0 && (
            <Section title="Slik utfører du posen">
              <ol className="flex flex-col gap-2">
                {detail.variant.instruksjon.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm" style={{ color: '#ccccdd' }}>
                    <span
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: '#c9a96e22', color: '#c9a96e' }}
                    >
                      {i + 1}
                    </span>
                    <span className="leading-relaxed pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {/* Anatomi & Energi */}
          <Section title="Anatomi & Energi">
            <div className="grid grid-cols-2 gap-3">
              {pose.muscle_groups.length > 0 && (
                <InfoCell label="Muskelgrupper" value={pose.muscle_groups.join(', ')} />
              )}
              {pose.meridian_tension.length > 0 && (
                <InfoCell label="Meridian (tøy)" value={pose.meridian_tension.join(', ')} />
              )}
              {pose.meridian_compress.length > 0 && (
                <InfoCell label="Meridian (komp.)" value={pose.meridian_compress.join(', ')} />
              )}
              <InfoCell label="Intensitet" value={`${pose.intensity_level}/6 – ${pose.intensity_label}`} />
            </div>
          </Section>

          {/* Tilpasning */}
          {detail.variant?.tilpasning && (
            <Section title="Tilpasning & Props">
              <div
                className="text-sm leading-relaxed p-3 rounded-xl"
                style={{ backgroundColor: '#1a4a2e', color: '#a8d8a8' }}
              >
                {detail.variant.tilpasning}
              </div>
            </Section>
          )}

          {/* Kontraindikasjoner */}
          {detail.variant?.kontraindikasjon && (
            <Section title="Forsiktighetsregler">
              <div
                className="text-sm leading-relaxed p-3 rounded-xl"
                style={{ backgroundColor: '#4a1a1a', color: '#e8a8a8' }}
              >
                {detail.variant.kontraindikasjon}
              </div>
            </Section>
          )}

          {/* Notater */}
          {pose.notes && (
            <Section title="Notater">
              <p className="text-sm leading-relaxed" style={{ color: '#8888aa' }}>
                {pose.notes}
              </p>
            </Section>
          )}

          {loading && (
            <p className="text-center text-sm" style={{ color: '#666688' }}>
              Laster detaljer...
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#c9a96e' }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="p-3 rounded-xl flex flex-col gap-1"
      style={{ backgroundColor: '#1a1a3e' }}
    >
      <span className="text-xs" style={{ color: '#666688' }}>{label}</span>
      <span className="text-sm font-medium" style={{ color: '#ccccdd' }}>{value}</span>
    </div>
  )
}
