export type Category = 'SEAT' | 'SPINE' | 'WINGS' | 'REBOUND'

export interface Pose {
  id: string
  slug: string
  name_no: string
  name_en: string
  category: Category
  archetype: string
  function_desc: string | null
  muscle_groups: string[]
  meridian_tension: string[]
  meridian_compress: string[]
  intensity_label: string
  intensity_level: number
  duration_min_sec: number
  duration_max_sec: number
  notes: string | null
  is_active: boolean
  sort_order: number | null
  // Fra kanonisk pose_variant
  instruksjon: string[] | null
  tilpasning: string | null
  kontraindikasjon: string | null
}

export interface PoseVariant {
  id: string
  pose_id: string
  slug: string
  name_no: string
  name_en: string
  is_canonical: boolean
  instruksjon: string[]
  tilpasning: string | null
  kontraindikasjon: string | null
  myofascial: string | null
  sort_order: number | null
}

export interface PoseMedia {
  id: string
  variant_id: string | null
  pose_id: string | null
  media_type: 'image' | 'audio' | 'video'
  storage_path: string
  public_url: string | null
  language: string
  duration_sec: number | null
  mime_type: string | null
  sort_order: number
}

export interface WorkoutConfig {
  warmupMinutes: number
  mainMinutes: number
  cooldownMinutes: number
  muscleFocus?: string
}

export interface WorkoutPoseCard extends Pose {
  assignedDurationSec: number
}

export interface WorkoutSections {
  warmup: WorkoutPoseCard[]
  main: WorkoutPoseCard[]
  cooldown: WorkoutPoseCard[]
  meta: {
    totalMinutes: number
    warmupMinutes: number
    mainMinutes: number
    cooldownMinutes: number
  }
}
