// generator.ts
// Port av WorkoutGenerator.java – bell-curve yin yoga program generator

import { BLOCK_WINDOWS, BLOCK_SIZE_MIN } from './constants'
import type { Pose, WorkoutConfig, WorkoutPoseCard, WorkoutSections } from './types'


// Fast varighet per intensitetsnivå (bortsett fra Savasana som er separat):
// LAV / LAV-MEDIUM (1-2):    5 min
// MEDIUM / MEDIUM-HØY (3-4): 4 min
// HØY / MAKS (5-6):          3 min
const DURATION_SEC: Record<number, number> = {
  1: 5 * 60,
  2: 5 * 60,
  3: 4 * 60,
  4: 4 * 60,
  5: 3 * 60,
  6: 3 * 60,
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getEffectiveDurationSec(pose: Pose): number {
  return DURATION_SEC[pose.intensity_level] ?? 4 * 60
}

/**
 * Fyller en tidsluke med poser fra kandidatlisten.
 * Varighet er fast basert på intensitetsnivå.
 * En pose hoppes over om det ikke er plass til dens fulle varighet.
 */
function fillToTime(candidates: Pose[], targetSec: number, usedIds: Set<string>): WorkoutPoseCard[] {
  if (candidates.length === 0) return []

  const result: WorkoutPoseCard[] = []
  let elapsed = 0
  const available = shuffle(candidates.filter((p) => !usedIds.has(p.id)))

  for (const pose of available) {
    const remaining = targetSec - elapsed
    if (remaining <= 0) break

    const duration = getEffectiveDurationSec(pose)
    if (duration > remaining) continue

    result.push({ ...pose, assignedDurationSec: duration })
    usedIds.add(pose.id)
    elapsed += duration
  }

  return result
}

/**
 * Bygger én 30-minutters blokk med bell-curve intensitetskurve.
 * Port av buildBlock() fra Java.
 */
function buildBlock(
  allPoses: Pose[],
  blockDurationSec: number,
  usedIds: Set<string>,
  muscleFocus?: string[]
): WorkoutPoseCard[] {
  const result: WorkoutPoseCard[] = []
  let elapsed = 0

  for (const window of BLOCK_WINDOWS) {
    const windowDurationSec = (window.endMin - window.startMin) * 60
    if (elapsed >= blockDurationSec) break

    const remaining = blockDurationSec - elapsed
    const windowSec = Math.min(windowDurationSec, remaining)

    let candidates = allPoses.filter(
      (p) =>
        p.intensity_level >= window.minIntensity &&
        p.intensity_level <= window.maxIntensity &&
        p.category !== 'REBOUND'
    )

    if (muscleFocus && muscleFocus.length > 0) {
      const focused = candidates.filter((p) =>
        p.muscle_groups.some((mg) =>
          muscleFocus.some((focus) =>
            mg.toLowerCase().includes(focus.toLowerCase())
          )
        )
      )
      if (focused.length > 0) candidates = focused
    }

    const poses = fillToTime(candidates, windowSec, usedIds)
    result.push(...poses)
    elapsed += poses.reduce((sum, p) => sum + p.assignedDurationSec, 0)
  }

  return result
}

function buildMain(
  poses: Pose[],
  minutes: number,
  usedIds: Set<string>,
  muscleFocus?: string[]
): WorkoutPoseCard[] {
  const result: WorkoutPoseCard[] = []
  const totalSec = minutes * 60
  const blockSec = BLOCK_SIZE_MIN * 60
  let remaining = totalSec

  while (remaining > 0) {
    const blockDuration = Math.min(blockSec, remaining)
    const block = buildBlock(poses, blockDuration, usedIds, muscleFocus)
    result.push(...block)
    remaining -= block.reduce((sum, p) => sum + p.assignedDurationSec, 0)
    if (block.length === 0) break
  }

  return result
}

const SAVASANA_DURATION_SEC = 600 // alltid 10 min

/**
 * Genererer et komplett yogaprogram.
 * Starter alltid uten oppvarming og avslutter alltid med Savasana (10 min).
 */
export function generateWorkout(
  poses: Pose[],
  config: WorkoutConfig
): WorkoutSections {
  const { mainMinutes, muscleFocus } = config

  const usedIds = new Set<string>()
  const main = buildMain(poses, mainMinutes, usedIds, muscleFocus)

  const savasana = poses.find((p) => p.slug === 'savasana')
  const cooldown: WorkoutPoseCard[] = savasana
    ? [{ ...savasana, assignedDurationSec: SAVASANA_DURATION_SEC }]
    : []

  return {
    warmup: [],
    main,
    cooldown,
    meta: {
      totalMinutes: mainMinutes + 10,
      warmupMinutes: 0,
      mainMinutes,
      cooldownMinutes: 10,
    },
  }
}

/**
 * Validerer og normaliserer config-parametere.
 */
export function resolveConfig(params: {
  main?: number
  muscleFocus?: string[]
}): WorkoutConfig {
  const MAX_MAIN = 290 // savasana tar alltid 10 min

  const main = Math.max(10, Math.min(params.main ?? 50, MAX_MAIN))

  return {
    warmupMinutes: 0,
    mainMinutes: main,
    cooldownMinutes: 10,
    muscleFocus: params.muscleFocus,
  }
}
