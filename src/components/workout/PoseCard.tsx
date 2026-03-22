'use client'

import { useState } from 'react'
import type { WorkoutPoseCard } from '@/lib/workout/types'

const DISPLAY = "var(--font-display, 'Cormorant Garamond', serif)"
const BODY    = "var(--font-body, 'DM Sans', sans-serif)"

// Warm, natural intensity colours
const INTENSITY_COLORS: Record<number, string> = {
  1: '#8A9E8C',
  2: '#9DB09F',
  3: '#C4A060',
  4: '#CC8860',
  5: '#C07050',
  6: '#B05545',
}

interface Props {
  pose: WorkoutPoseCard
  onClick: (pose: WorkoutPoseCard) => void
}

export default function PoseCard({ pose, onClick }: Props) {
  const [expanded, setExpanded] = useState(false)
  const color = INTENSITY_COLORS[pose.intensity_level] ?? '#C4A060'
  const durationMin = Math.round(pose.assignedDurationSec / 60)
  const hasInstructions = pose.instruksjon && pose.instruksjon.length > 0

  return (
    <div
      className="rounded-[20px] overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: 'rgba(255,252,247,0.72)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.65)',
        boxShadow: '0 4px 24px rgba(180,160,130,0.08)',
      }}
    >
      <div className="flex items-stretch">
        {/* Main info — opens modal */}
        <button
          onClick={() => onClick(pose)}
          className="flex-1 text-left p-4 transition-opacity duration-150"
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.72' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
          onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.99)' }}
          onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p
                className="truncate"
                style={{
                  fontFamily: DISPLAY,
                  fontSize: '1.15rem',
                  fontWeight: 400,
                  color: '#3A3530',
                  lineHeight: 1.2,
                }}
              >
                {pose.name_no}
              </p>
              <p
                className="truncate mt-0.5"
                style={{
                  fontFamily: DISPLAY,
                  fontSize: '0.82rem',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#B0A89E',
                }}
              >
                {pose.name_en}
              </p>
              {pose.muscle_groups.length > 0 && (
                <p
                  className="mt-1.5 truncate"
                  style={{
                    fontFamily: BODY,
                    fontSize: '0.58rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#B0A89E',
                  }}
                >
                  {pose.muscle_groups.join(' · ')}
                </p>
              )}
            </div>

            <div className="flex flex-col items-end gap-1.5 shrink-0 mt-0.5">
              <span
                className="px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: color + '18',
                  color: color,
                  fontFamily: BODY,
                  fontSize: '0.58rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {pose.intensity_label}
              </span>
              <span
                style={{
                  fontFamily: BODY,
                  fontSize: '0.68rem',
                  fontWeight: 300,
                  color: '#B0A89E',
                }}
              >
                {durationMin} min
              </span>
            </div>
          </div>
        </button>

        {/* Expand toggle */}
        {hasInstructions && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center justify-center px-3 border-l transition-all duration-200"
            style={{
              borderColor: 'rgba(180,160,130,0.15)',
              color: expanded ? '#5C7A65' : '#C8C0B8',
            }}
            aria-label={expanded ? 'Skjul instruksjon' : 'Vis instruksjon'}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 16 16"
              fill="none"
              style={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }}
            >
              <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Expanded instructions */}
      {hasInstructions && expanded && (
        <div
          className="px-4 pb-4 pt-3"
          style={{ borderTop: '1px solid rgba(180,160,130,0.12)' }}
        >
          <ol className="flex flex-col gap-2.5">
            {pose.instruksjon!.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                  style={{
                    backgroundColor: 'rgba(232,201,154,0.15)',
                    color: '#C4A060',
                    fontFamily: BODY,
                    fontSize: '0.58rem',
                    fontWeight: 400,
                  }}
                >
                  {i + 1}
                </span>
                <span
                  style={{
                    fontFamily: BODY,
                    fontSize: '0.78rem',
                    fontWeight: 300,
                    color: '#7A7068',
                    lineHeight: 1.7,
                  }}
                >
                  {step}
                </span>
              </li>
            ))}
          </ol>
          {pose.kontraindikasjon && (
            <p
              className="mt-3"
              style={{
                fontFamily: BODY,
                fontSize: '0.68rem',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#B0A89E',
                lineHeight: 1.65,
              }}
            >
              {pose.kontraindikasjon}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
