import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe, LIFETIME_PRICE_NOK } from '@/lib/stripe/client'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Ikke innlogget' }, { status: 401 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: user.email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'nok',
          unit_amount: LIFETIME_PRICE_NOK,
          product_data: {
            name: 'Pust Yoga – Livstidstilgang',
            description: 'Lydveiledning for alle yin yoga-posisjoner',
          },
        },
      },
    ],
    automatic_tax: { enabled: true },
    metadata: {
      user_id: user.id,
    },
    success_url: `${baseUrl}/profil?betaling=ok`,
    cancel_url: `${baseUrl}/profil?betaling=avbrutt`,
  })

  return NextResponse.json({ url: session.url })
}
