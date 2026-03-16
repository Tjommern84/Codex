import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateWorkout, resolveConfig } from '@/lib/workout/generator'
import type { Pose } from '@/lib/workout/types'

// Enkel in-memory cache – poser endres sjelden
let poseCache: Pose[] | null = null
let cacheExpiry = 0

async function getPoses(supabase: Awaited<ReturnType<typeof createClient>>): Promise<Pose[]> {
  if (poseCache && Date.now() < cacheExpiry) return poseCache

  const { data, error } = await supabase
    .from('poses')
    .select(`
      *,
      pose_variants!inner (
        instruksjon,
        tilpasning,
        kontraindikasjon
      )
    `)
    .eq('is_active', true)
    .eq('pose_variants.is_canonical', true)
    .order('sort_order')

  if (error || !data) throw new Error('Kunne ikke hente poser')

  // Flatgjør variant-feltene inn i pose-objektet
  poseCache = data.map((p: Record<string, unknown>) => {
    const variant = (p.pose_variants as Record<string, unknown>[] | null)?.[0] ?? {}
    return {
      ...p,
      pose_variants: undefined,
      instruksjon: (variant.instruksjon as string[]) ?? null,
      tilpasning: (variant.tilpasning as string) ?? null,
      kontraindikasjon: (variant.kontraindikasjon as string) ?? null,
    } as Pose
  })

  cacheExpiry = Date.now() + 1000 * 60 * 60 // 1 time
  return poseCache
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const config = resolveConfig({
      warmup: body.warmup,
      main: body.main,
      cooldown: body.cooldown,
      muscleFocus: body.muscleFocus,
    })

    const supabase = await createClient()
    const poses = await getPoses(supabase)
    const workout = generateWorkout(poses, config)

    return NextResponse.json(workout)
  } catch (err) {
    return NextResponse.json({ error: 'Generering feilet' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const config = resolveConfig({
    warmup: Number(searchParams.get('warmup') ?? 10),
    main: Number(searchParams.get('main') ?? 40),
    cooldown: Number(searchParams.get('cooldown') ?? 10),
    muscleFocus: searchParams.get('muscleFocus') ?? undefined,
  })

  try {
    const supabase = await createClient()
    const poses = await getPoses(supabase)
    const workout = generateWorkout(poses, config)
    return NextResponse.json(workout)
  } catch {
    return NextResponse.json({ error: 'Generering feilet' }, { status: 500 })
  }
}
