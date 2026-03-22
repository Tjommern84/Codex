'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import WorkoutView from '@/components/workout/WorkoutView'
import { generateWorkout, resolveConfig } from '@/lib/workout/generator'
import { POSES } from '@/lib/workout/posesData'
import { MODULES } from '@/lib/workout/modules'
import type { WorkoutSections } from '@/lib/workout/types'

const DISPLAY = "var(--font-display, 'Cormorant Garamond', serif)"
const BODY    = "var(--font-body, 'DM Sans', sans-serif)"

export default function ProgramPageClient() {
  const searchParams = useSearchParams()
  const [regenerateKey, setRegenerateKey] = useState(0)
  const [workout, setWorkout] = useState<WorkoutSections | null>(null)

  const main = Number(searchParams.get('main') ?? 50)
  const showInstructions = searchParams.get('instruksjon') !== '0'
  const focusId = searchParams.get('focus') ?? 'fri'
  const focusModule = MODULES.find((m) => m.id === focusId) ?? MODULES[0]

  // Genereres kun på klienten for å unngå hydreringsfeil (Math.random i shuffle)
  useEffect(() => {
    const config = resolveConfig({ main, muscleFocus: focusModule.muscleGroups })
    setWorkout(generateWorkout(POSES, config))
  }, [main, focusModule.muscleGroups, regenerateKey])

  return (
    <main
      className="min-h-dvh px-6 py-10"
      style={{ backgroundColor: '#FAF6F0' }}
    >
      <div className="max-w-md mx-auto flex flex-col gap-8">

        {/* Nav header */}
        <div className="flex items-baseline gap-4">
          <Link
            href="/"
            style={{
              fontFamily: BODY,
              fontSize: '0.62rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#B0A89E',
              textDecoration: 'none',
            }}
          >
            ← Tilbake
          </Link>
          <span
            className="ml-auto"
            style={{
              fontFamily: DISPLAY,
              fontSize: '1.1rem',
              fontWeight: 300,
              color: '#7A7068',
            }}
          >
            {main + 10} min
          </span>
        </div>

        {workout ? (
          <WorkoutView
            workout={workout}
            showInstructions={showInstructions}
            onRegenerate={() => setRegenerateKey((k) => k + 1)}
          />
        ) : (
          <p style={{ fontFamily: BODY, fontSize: '0.8rem', color: '#B0A89E', textAlign: 'center', letterSpacing: '0.12em' }}>
            Genererer program…
          </p>
        )}

      </div>
    </main>
  )
}
