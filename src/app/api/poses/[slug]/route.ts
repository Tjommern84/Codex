import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const supabase = await createClient()

  // Hent kanonisk variant
  const { data: variant } = await supabase
    .from('pose_variants')
    .select('*')
    .eq('pose_id', supabase.from('poses').select('id').eq('slug', slug).single() as unknown as string)
    .eq('is_canonical', true)
    .limit(1)
    .single()

  // Alternativ: hent via pose slug-join
  const { data: pose } = await supabase
    .from('poses')
    .select('id')
    .eq('slug', slug)
    .single()

  let poseVariant = null
  let imageMedia = null
  let audioMedia = null

  if (pose) {
    const { data: variants } = await supabase
      .from('pose_variants')
      .select('*')
      .eq('pose_id', pose.id)
      .eq('is_canonical', true)
      .limit(1)

    poseVariant = variants?.[0] ?? null

    const { data: media } = await supabase
      .from('pose_media')
      .select('*')
      .eq('pose_id', pose.id)
      .order('sort_order')

    imageMedia = media?.find((m) => m.media_type === 'image') ?? null
    audioMedia = media?.find((m) => m.media_type === 'audio') ?? null
  }

  return NextResponse.json({
    variant: poseVariant,
    image: imageMedia,
    audio: audioMedia,
  })
}
