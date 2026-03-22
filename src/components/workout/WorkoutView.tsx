'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { WorkoutSections, WorkoutPoseCard } from '@/lib/workout/types'
import PoseCard from './PoseCard'
import PoseModal from './PoseModal'
import WorkoutPlayer from './WorkoutPlayer'

const DISPLAY = "var(--font-display, 'Cormorant Garamond', serif)"
const BODY    = "var(--font-body, 'DM Sans', sans-serif)"

interface Props {
  workout: WorkoutSections
  showInstructions?: boolean
  onRegenerate?: () => void
}

export default function WorkoutView({ workout, showInstructions = true, onRegenerate }: Props) {
  const [selected, setSelected] = useState<WorkoutPoseCard | null>(null)
  const [playing, setPlaying] = useState(false)
  const router = useRouter()

  function handleRegenerate() {
    if (onRegenerate) {
      onRegenerate()
    } else {
      router.refresh()
    }
  }

  return (
    <>
      {/* Start button */}
      <button
        onClick={() => setPlaying(true)}
        className="w-full py-4 rounded-[16px] transition-all duration-200"
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
        Start program
      </button>

      {/* Sections */}
      <div className="flex flex-col gap-10">
        <WorkoutSection
          title="Hovedprogram"
          minutes={workout.meta.mainMinutes}
          poses={workout.main}
          accentColor="#5C7A65"
          onPoseClick={setSelected}
        />
        <WorkoutSection
          title="Savasana"
          minutes={workout.meta.cooldownMinutes}
          poses={workout.cooldown}
          accentColor="#E8C99A"
          onPoseClick={setSelected}
        />
      </div>

      {/* Regenerate */}
      <button
        onClick={handleRegenerate}
        className="w-full py-3 rounded-[16px] transition-all duration-200"
        style={{
          backgroundColor: 'transparent',
          color: '#B0A89E',
          border: '1px solid rgba(180,160,130,0.2)',
          fontFamily: BODY,
          fontSize: '0.65rem',
          fontWeight: 300,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.55' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
      >
        ↺ Nytt program
      </button>

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
  accentColor,
  onPoseClick,
}: {
  title: string
  minutes: number
  poses: WorkoutPoseCard[]
  accentColor: string
  onPoseClick: (pose: WorkoutPoseCard) => void
}) {
  if (poses.length === 0) return null

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div
          className="rounded-full"
          style={{ width: 2, height: 24, backgroundColor: accentColor, opacity: 0.55 }}
        />
        <h2
          style={{
            fontFamily: DISPLAY,
            fontSize: '1.3rem',
            fontWeight: 300,
            color: '#3A3530',
            letterSpacing: '0.01em',
          }}
        >
          {title}
        </h2>
        <span
          className="ml-auto"
          style={{
            fontFamily: BODY,
            fontSize: '0.6rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#B0A89E',
          }}
        >
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
