import { Suspense } from 'react'
import Link from 'next/link'
import WorkoutView from '@/components/workout/WorkoutView'
import type { WorkoutSections } from '@/lib/workout/types'

interface Props {
  searchParams: Promise<{ warmup?: string; main?: string; cooldown?: string; instruksjon?: string }>
}

async function getWorkout(warmup: number, main: number, cooldown: number): Promise<WorkoutSections> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const res = await fetch(
    `${baseUrl}/api/workout/generate?warmup=${warmup}&main=${main}&cooldown=${cooldown}`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Generering feilet')
  return res.json()
}

export default async function ProgramPage({ searchParams }: Props) {
  const params = await searchParams
  const warmup = Number(params.warmup ?? 10)
  const main = Number(params.main ?? 40)
  const cooldown = Number(params.cooldown ?? 10)
  const showInstructions = params.instruksjon !== '0'

  let workout: WorkoutSections | null = null
  let error: string | null = null

  try {
    workout = await getWorkout(warmup, main, cooldown)
  } catch {
    error = 'Kunne ikke generere program. Prøv igjen.'
  }

  return (
    <main className="min-h-dvh px-4 py-8">
      <div className="max-w-md mx-auto flex flex-col gap-6">
        {/* Navigasjon */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm"
            style={{ color: '#8888aa' }}
          >
            ← Endre tid
          </Link>
          <h1 className="font-semibold text-white ml-auto">
            {warmup + main + cooldown} min program
          </h1>
        </div>

        {error && (
          <div
            className="p-4 rounded-2xl text-sm text-center"
            style={{ backgroundColor: '#4a1a1a', color: '#e08080' }}
          >
            {error}
          </div>
        )}

        {workout && <WorkoutView workout={workout} showInstructions={showInstructions} />}
      </div>
    </main>
  )
}
