'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MODULES } from '@/lib/workout/modules'

const SAVASANA_MIN = 10

const DISPLAY = "var(--font-display, 'Cormorant Garamond', serif)"
const BODY    = "var(--font-body, 'DM Sans', sans-serif)"

export default function TimeSelector() {
  const router = useRouter()
  const [total, setTotal] = useState(60)
  const [loading, setLoading] = useState(false)
  const [withInstructions, setWithInstructions] = useState(true)
  const [focusId, setFocusId] = useState('fri')

  const main = Math.max(0, total - SAVASANA_MIN)
  const mainPct = total > 0 ? (main / total) * 100 : 0
  const savasanaPct = total > 0 ? (SAVASANA_MIN / total) * 100 : 0

  async function handleGenerate() {
    setLoading(true)
    const params = new URLSearchParams({
      main: String(main),
      instruksjon: withInstructions ? '1' : '0',
      focus: focusId,
    })
    router.push(`/program?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-8">

      {/* Progress bar */}
      <div className="flex h-1 rounded-full overflow-hidden gap-px">
        <div
          style={{
            width: `${mainPct}%`,
            backgroundColor: '#5C7A65',
            borderRadius: '999px 0 0 999px',
            transition: 'width 0.5s ease',
          }}
        />
        <div
          style={{
            width: `${savasanaPct}%`,
            backgroundColor: '#E8C99A',
            borderRadius: '0 999px 999px 0',
            transition: 'width 0.5s ease',
          }}
        />
      </div>

      {/* Duration slider */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-baseline">
          <span
            style={{
              fontFamily: BODY,
              fontSize: '0.62rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#B0A89E',
            }}
          >
            Varighet
          </span>
          <span
            style={{
              fontFamily: DISPLAY,
              fontSize: '1.6rem',
              fontWeight: 300,
              color: '#3A3530',
              lineHeight: 1,
            }}
          >
            {total}{' '}
            <span style={{ fontSize: '0.85rem', color: '#B0A89E' }}>min</span>
          </span>
        </div>
        <input
          type="range"
          min={20}
          max={120}
          step={5}
          value={total}
          onChange={(e) => setTotal(Number(e.target.value))}
          className="w-full cursor-pointer"
          style={{ accentColor: '#E8C99A' }}
        />
      </div>

      {/* Time breakdown */}
      <div
        className="flex justify-between items-center py-3 px-4 rounded-[14px]"
        style={{ backgroundColor: 'rgba(180,160,130,0.06)', border: '1px solid rgba(180,160,130,0.12)' }}
      >
        <div className="flex flex-col gap-0.5">
          <span
            style={{
              fontFamily: BODY,
              fontSize: '0.58rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#B0A89E',
            }}
          >
            Program
          </span>
          <span style={{ fontFamily: DISPLAY, fontSize: '1.1rem', fontWeight: 300, color: '#3A3530' }}>
            {main} min
          </span>
        </div>

        <div style={{ width: 1, height: 28, backgroundColor: 'rgba(180,160,130,0.2)' }} />

        <div className="flex flex-col gap-0.5 items-end">
          <span
            style={{
              fontFamily: BODY,
              fontSize: '0.58rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#B0A89E',
            }}
          >
            Savasana
          </span>
          <span style={{ fontFamily: DISPLAY, fontSize: '1.1rem', fontWeight: 300, color: '#E8C99A' }}>
            {SAVASANA_MIN} min
          </span>
        </div>
      </div>

      {/* Instructions toggle */}
      <button
        type="button"
        onClick={() => setWithInstructions((v) => !v)}
        className="flex items-center gap-3 w-full py-3 px-4 rounded-[16px] transition-all duration-300"
        style={{
          backgroundColor: withInstructions ? 'rgba(232,201,154,0.10)' : 'rgba(180,160,130,0.05)',
          border: `1px solid ${withInstructions ? 'rgba(232,201,154,0.35)' : 'rgba(180,160,130,0.15)'}`,
        }}
      >
        <span
          className="flex items-center justify-center rounded-md shrink-0 transition-all duration-300"
          style={{
            width: 18,
            height: 18,
            backgroundColor: withInstructions ? '#E8C99A' : 'transparent',
            border: withInstructions ? '2px solid #E8C99A' : '2px solid rgba(180,160,130,0.3)',
          }}
        >
          {withInstructions && (
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="#3A3530" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span
          style={{
            fontFamily: BODY,
            fontSize: '0.78rem',
            fontWeight: 300,
            letterSpacing: '0.04em',
            color: withInstructions ? '#5C7A65' : '#B0A89E',
          }}
        >
          Med instruksjon
        </span>
      </button>

      {/* Focus module chips */}
      <div className="flex flex-col gap-2">
        <span
          style={{
            fontFamily: BODY,
            fontSize: '0.62rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#B0A89E',
          }}
        >
          Fokus
        </span>
        <div className="flex flex-wrap gap-2">
          {MODULES.map((mod) => {
            const active = focusId === mod.id
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => setFocusId(mod.id)}
                style={{
                  fontFamily: BODY,
                  fontSize: '0.68rem',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '5px 14px',
                  borderRadius: '999px',
                  border: active ? '1px solid #5C7A65' : '1px solid rgba(180,160,130,0.3)',
                  backgroundColor: active ? '#5C7A65' : 'transparent',
                  color: active ? '#FAF6F0' : '#B0A89E',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {mod.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={loading || main <= 0}
        className="w-full py-4 rounded-[16px] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          backgroundColor: '#5C7A65',
          color: '#FAF6F0',
          fontFamily: BODY,
          fontSize: '0.72rem',
          fontWeight: 400,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.82' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
        onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)' }}
        onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
      >
        {loading ? 'Genererer…' : 'Lag program'}
      </button>

    </div>
  )
}
