'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TimeSelector() {
  const router = useRouter()
  const [total, setTotal] = useState(60)
  const [warmup, setWarmup] = useState(10)
  const [cooldown, setCooldown] = useState(10)
  const [loading, setLoading] = useState(false)
  const [withInstructions, setWithInstructions] = useState(true)

  const main = Math.max(0, total - warmup - cooldown)

  function handleTotalChange(val: number) {
    setTotal(val)
    const newMain = val - warmup - cooldown
    if (newMain < 0) {
      const excess = Math.abs(newMain)
      setWarmup(Math.max(0, warmup - Math.ceil(excess / 2)))
      setCooldown(Math.max(0, cooldown - Math.floor(excess / 2)))
    }
  }

  async function handleGenerate() {
    setLoading(true)
    const params = new URLSearchParams({
      warmup: String(warmup),
      main: String(main),
      cooldown: String(cooldown),
      instruksjon: withInstructions ? '1' : '0',
    })
    router.push(`/program?${params.toString()}`)
  }

  const warmupPct = total > 0 ? (warmup / total) * 100 : 0
  const mainPct = total > 0 ? (main / total) * 100 : 0
  const cooldownPct = total > 0 ? (cooldown / total) * 100 : 0

  return (
    <div className="flex flex-col gap-8">
      {/* Tidslinje-visualisering */}
      <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
        <div
          className="transition-all duration-300 rounded-l-full"
          style={{ width: `${warmupPct}%`, backgroundColor: '#6eb5c9' }}
        />
        <div
          className="transition-all duration-300"
          style={{ width: `${mainPct}%`, backgroundColor: '#c96e6e' }}
        />
        <div
          className="transition-all duration-300 rounded-r-full"
          style={{ width: `${cooldownPct}%`, backgroundColor: '#6ec98b' }}
        />
      </div>

      {/* Total varighet */}
      <SliderField
        label="Total varighet"
        value={total}
        min={20}
        max={120}
        step={5}
        unit="min"
        color="#c9a96e"
        onChange={handleTotalChange}
      />

      {/* Oppvarming */}
      <SliderField
        label="Oppvarming"
        value={warmup}
        min={0}
        max={Math.min(30, total - cooldown)}
        step={5}
        unit="min"
        color="#6eb5c9"
        onChange={setWarmup}
      />

      {/* Avspenning */}
      <SliderField
        label="Avspenning"
        value={cooldown}
        min={0}
        max={Math.min(30, total - warmup)}
        step={5}
        unit="min"
        color="#6ec98b"
        onChange={setCooldown}
      />

      {/* Hoveddel (read-only) */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-sm">
          <span style={{ color: '#c96e6e' }}>Hovedprogram</span>
          <span className="font-semibold" style={{ color: '#c96e6e' }}>
            {main} min
          </span>
        </div>
        <div
          className="h-2 rounded-full opacity-40"
          style={{ backgroundColor: '#c96e6e', width: '100%' }}
        />
      </div>

      {/* Med instruksjon */}
      <button
        type="button"
        onClick={() => setWithInstructions((v) => !v)}
        className="flex items-center gap-3 w-full py-3 px-4 rounded-2xl transition-all duration-200"
        style={{
          backgroundColor: withInstructions ? 'rgba(201,169,110,0.12)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${withInstructions ? 'rgba(201,169,110,0.35)' : 'rgba(255,255,255,0.08)'}`,
        }}
      >
        <span
          className="flex items-center justify-center rounded-md shrink-0 transition-all duration-200"
          style={{
            width: 20,
            height: 20,
            backgroundColor: withInstructions ? '#c9a96e' : 'transparent',
            border: withInstructions ? '2px solid #c9a96e' : '2px solid rgba(255,255,255,0.25)',
          }}
        >
          {withInstructions && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="#1a1a2e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </span>
        <span className="text-sm font-medium" style={{ color: withInstructions ? '#c9a96e' : '#8888aa' }}>
          Med instruksjon
        </span>
      </button>

      {/* Generer-knapp */}
      <button
        onClick={handleGenerate}
        disabled={loading || main <= 0}
        className="w-full py-4 rounded-2xl text-base font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          backgroundColor: '#c9a96e',
          color: '#1a1a2e',
        }}
      >
        {loading ? 'Genererer...' : 'Lag program'}
      </button>
    </div>
  )
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  unit,
  color,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  color: string
  onChange: (v: number) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-sm">
        <span style={{ color }}>{label}</span>
        <span className="font-semibold" style={{ color }}>
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: color }}
      />
    </div>
  )
}
