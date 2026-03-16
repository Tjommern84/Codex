'use client'

import { useState } from 'react'

interface Props {
  onSuccess?: () => void
}

export default function SubscriptionGate({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/payments/create-checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4 text-center"
      style={{ backgroundColor: '#16213e', border: '1px solid #c9a96e33' }}
    >
      <div className="text-4xl">🧘</div>
      <h3 className="text-lg font-bold text-white">Pust Yoga Premium</h3>
      <p className="text-sm leading-relaxed" style={{ color: '#8888aa' }}>
        Få tilgang til lydveiledning for alle posisjoner, innlest av sertifisert yin yoga-instruktør.
      </p>

      <div className="flex flex-col gap-1 my-2">
        {[
          '🎙 Norske lydveiledninger per posisjon',
          '📖 Detaljerte instruksjoner',
          '♾️ Ubegrenset programgenerering',
        ].map((feature) => (
          <p key={feature} className="text-sm" style={{ color: '#ccccdd' }}>
            {feature}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-sm transition-opacity disabled:opacity-50"
          style={{ backgroundColor: '#c9a96e', color: '#1a1a2e' }}
        >
          {loading ? 'Laster...' : 'Kjøp livstidstilgang – 499 NOK'}
        </button>
        <p className="text-xs" style={{ color: '#555577' }}>
          Engangsbetaling · Inkl. 25% MVA
        </p>
      </div>
    </div>
  )
}
