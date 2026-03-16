// generator.ts
// Port av WorkoutGenerator.java – bell-curve yin yoga program generator

import { BLOCK_WINDOWS, BLOCK_SIZE_MIN } from './constants'
import type { Pose, WorkoutConfig, WorkoutPoseCard, WorkoutSections } from './types'

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
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
  return randomInt(pose.duration_min_sec, pose.duration_max_sec)
}

/**
 * Fyller en tidsluke med poser fra kandidatlisten.
 * Poser repeteres ved behov. Port av fillToTime() fra Java.
 */
function fillToTime(candidates: Pose[], targetSec: number, usedIds: Set<string>): WorkoutPoseCard[] {
  if (candidates.length === 0) return []

  const result: WorkoutPoseCard[] = []
  let elapsed = 0
  const available = shuffle(candidates.filter((p) => !usedIds.has(p.id)))

  for (const pose of available) {
    if (elapsed >= targetSec) break
    const duration = getEffectiveDurationSec(pose)
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
  muscleFocus?: string
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

    if (muscleFocus) {
      const focused = candidates.filter((p) =>
        p.muscle_groups.some((mg) =>
          mg.toLowerCase().includes(muscleFocus.toLowerCase())
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

function buildWarmup(poses: Pose[], minutes: number, usedIds: Set<string>): WorkoutPoseCard[] {
  const candidates = poses.filter(
    (p) =>
      p.intensity_level <= 2 &&
      (p.category === 'SEAT' || p.category === 'SPINE')
  )
  return fillToTime(candidates, minutes * 60, usedIds)
}

function buildMain(
  poses: Pose[],
  minutes: number,
  usedIds: Set<string>,
  muscleFocus?: string
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

function buildCooldown(poses: Pose[], minutes: number, usedIds: Set<string>): WorkoutPoseCard[] {
  const candidates = poses.filter((p) => p.category === 'REBOUND')
  return fillToTime(candidates, minutes * 60, usedIds)
}

/**
 * Genererer et komplett yogaprogram.
 * @param poses – alle aktive poser fra databasen (lastet inn én gang og cachet)
 * @param config – varighet-konfigurasjon
 */
export function generateWorkout(
  poses: Pose[],
  config: WorkoutConfig
): WorkoutSections {
  const { warmupMinutes, mainMinutes, cooldownMinutes, muscleFocus } = config

  const usedIds = new Set<string>()
  const warmup = buildWarmup(poses, warmupMinutes, usedIds)
  const main = buildMain(poses, mainMinutes, usedIds, muscleFocus)
  const cooldown = buildCooldown(poses, cooldownMinutes, usedIds)

  return {
    warmup,
    main,
    cooldown,
    meta: {
      totalMinutes: warmupMinutes + mainMinutes + cooldownMinutes,
      warmupMinutes,
      mainMinutes,
      cooldownMinutes,
    },
  }
}

/**
 * Validerer og normaliserer config-parametere.
 */
export function resolveConfig(params: {
  warmup?: number
  main?: number
  cooldown?: number
  muscleFocus?: string
}): WorkoutConfig {
  const MAX_SECTION = 180
  const MAX_TOTAL = 300

  let warmup = Math.max(0, Math.min(params.warmup ?? 10, MAX_SECTION))
  let main = Math.max(0, Math.min(params.main ?? 40, MAX_SECTION))
  let cooldown = Math.max(0, Math.min(params.cooldown ?? 10, MAX_SECTION))

  const total = warmup + main + cooldown
  if (total > MAX_TOTAL) {
    const scale = MAX_TOTAL / total
    warmup = Math.round(warmup * scale)
    main = Math.round(main * scale)
    cooldown = Math.round(cooldown * scale)
  }

  return {
    warmupMinutes: warmup,
    mainMinutes: main,
    cooldownMinutes: cooldown,
    muscleFocus: params.muscleFocus,
  }
}
