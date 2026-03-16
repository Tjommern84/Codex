import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const supabase = await createClient()

  // Sjekk autentisering
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Ikke innlogget' }, { status: 401 })
  }

  // Sjekk abonnement
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single()

  if (!profile || profile.subscription_status !== 'active') {
    return NextResponse.json({ error: 'Krever abonnement' }, { status: 402 })
  }

  // Hent audio-media rad
  const { data: media } = await supabase
    .from('pose_media')
    .select('storage_path')
    .eq('media_type', 'audio')
    .eq('language', 'no')
    .or(`pose_id.eq.${slug},variant_id.eq.${slug}`)
    .order('sort_order')
    .limit(1)
    .single()

  // Prøv slug-basert path som fallback
  const storagePath = media?.storage_path ?? `audio/no/${slug}.mp3`

  // Generer signert URL (1 time)
  const { data: signed, error } = await supabase.storage
    .from('yoga-media')
    .createSignedUrl(storagePath, 3600)

  if (error || !signed) {
    return NextResponse.json({ error: 'Lydfil ikke funnet' }, { status: 404 })
  }

  return NextResponse.json({ url: signed.signedUrl })
}
