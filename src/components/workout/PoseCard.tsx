'use client'

import { useState } from 'react'
import type { WorkoutPoseCard } from '@/lib/workout/types'

const INTENSITY_COLORS: Record<number, string> = {
  1: '#6ec98b',
  2: '#a8d8a8',
  3: '#c9a96e',
  4: '#e0a040',
  5: '#e07040',
  6: '#c94040',
}

interface Props {
  pose: WorkoutPoseCard
  onClick: (pose: WorkoutPoseCard) => void
}

export default function PoseCard({ pose, onClick }: Props) {
  const [expanded, setExpanded] = useState(false)
  const color = INTENSITY_COLORS[pose.intensity_level] ?? '#c9a96e'
  const durationMin = Math.round(pose.assignedDurationSec / 60)
  const hasInstructions = pose.instruksjon && pose.instruksjon.length > 0

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{ backgroundColor: '#16213e' }}
    >
      {/* Hoved-rad */}
      <div className="flex items-stretch">
        {/* Klikk på info åpner modal */}
        <button
          onClick={() => onClick(pose)}
          className="flex-1 text-left p-4 transition-colors duration-150 hover:bg-white/[0.02] active:bg-white/[0.04]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">{pose.name_no}</p>
              <p className="text-sm truncate" style={{ color: '#8888aa' }}>
                {pose.name_en}
              </p>
              {pose.muscle_groups.length > 0 && (
                <p className="text-xs mt-1 truncate" style={{ color: '#666688' }}>
                  {pose.muscle_groups.join(', ')}
                </p>
              )}
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ backgroundColor: color + '22', color }}
              >
                {pose.intensity_label}
              </span>
              <span className="text-xs" style={{ color: '#8888aa' }}>
                {durationMin} min
              </span>
            </div>
          </div>
        </button>

        {/* Ekspander-knapp — kun om instruksjon finnes */}
        {hasInstructions && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center justify-center px-3 border-l transition-colors duration-150"
            style={{
              borderColor: 'rgba(255,255,255,0.06)',
              color: expanded ? '#c9a96e' : '#444466',
            }}
            aria-label={expanded ? 'Skjul instruksjon' : 'Vis instruksjon'}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
            >
              <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Instruksjonspanel */}
      {hasInstructions && expanded && (
        <div
          className="px-4 pb-4 pt-1"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <ol className="flex flex-col gap-2 mt-2">
            {pose.instruksjon!.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span
                  className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5"
                  style={{ backgroundColor: '#c9a96e22', color: '#c9a96e', fontSize: '0.65rem' }}
                >
                  {i + 1}
                </span>
                <span className="leading-relaxed" style={{ color: '#b8b8cc' }}>
                  {step}
                </span>
              </li>
            ))}
          </ol>
          {pose.kontraindikasjon && (
            <p
              className="mt-3 text-xs leading-relaxed italic"
              style={{ color: '#886666' }}
            >
              ⚠ {pose.kontraindikasjon}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
