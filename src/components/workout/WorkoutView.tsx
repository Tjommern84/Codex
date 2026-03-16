'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { WorkoutSections, WorkoutPoseCard } from '@/lib/workout/types'
import PoseCard from './PoseCard'
import PoseModal from './PoseModal'
import WorkoutPlayer from './WorkoutPlayer'

interface Props {
  workout: WorkoutSections
  showInstructions?: boolean
}

const SECTION_COLORS = {
  warmup: '#6eb5c9',
  main: '#c96e6e',
  cooldown: '#6ec98b',
}

export default function WorkoutView({ workout, showInstructions = true }: Props) {
  const [selected, setSelected] = useState<WorkoutPoseCard | null>(null)
  const [playing, setPlaying] = useState(false)
  const router = useRouter()

  return (
    <>
      {/* Nytt program */}
      <button
        onClick={() => router.refresh()}
        className="w-full py-3 rounded-2xl font-medium text-sm tracking-wide transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
        style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#8888aa', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        ↺ Nytt program
      </button>

      {/* Start-knapp */}
      <button
        onClick={() => setPlaying(true)}
        className="w-full py-4 rounded-2xl font-semibold text-base tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        style={{ backgroundColor: '#c9a96e', color: '#0f0e17' }}
      >
        ▶ Start program
      </button>

      <div className="flex flex-col gap-8">
        <WorkoutSection
          title="Oppvarming"
          minutes={workout.meta.warmupMinutes}
          poses={workout.warmup}
          color={SECTION_COLORS.warmup}
          onPoseClick={setSelected}
        />
        <WorkoutSection
          title="Hovedprogram"
          minutes={workout.meta.mainMinutes}
          poses={workout.main}
          color={SECTION_COLORS.main}
          onPoseClick={setSelected}
        />
        <WorkoutSection
          title="Avspenning"
          minutes={workout.meta.cooldownMinutes}
          poses={workout.cooldown}
          color={SECTION_COLORS.cooldown}
          onPoseClick={setSelected}
        />
      </div>

      <PoseModal pose={selected} onClose={() => setSelected(null)} />

      {playing && (
        <WorkoutPlayer workout={workout} onClose={() => setPlaying(false)} showInstructions={showInstructions} />
      )}
    </>
  )
}

function WorkoutSection({
  title,
  minutes,
  poses,
  color,
  onPoseClick,
}: {
  title: string
  minutes: number
  poses: WorkoutPoseCard[]
  color: string
  onPoseClick: (pose: WorkoutPoseCard) => void
}) {
  if (poses.length === 0) return null

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-1 h-6 rounded-full" style={{ backgroundColor: color }} />
        <h2 className="font-semibold text-white">{title}</h2>
        <span className="text-sm ml-auto" style={{ color: '#666688' }}>
          {minutes} min
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {poses.map((pose, i) => (
          <PoseCard key={`${pose.slug}-${i}`} pose={pose} onClick={onPoseClick} />
        ))}
      </div>
    </section>
  )
}
