'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function InnloggingPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/profil`,
      },
    })

    if (error) {
      setError('Noe gikk galt. Prøv igjen.')
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <main className="min-h-dvh flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold" style={{ color: '#c9a96e' }}>
            Pust Yoga
          </h1>
          <p className="text-sm mt-2" style={{ color: '#8888aa' }}>
            Logg inn med e-post
          </p>
        </div>

        {sent ? (
          <div
            className="p-5 rounded-2xl text-center flex flex-col gap-2"
            style={{ backgroundColor: '#1a4a2e' }}
          >
            <p className="text-lg">📬</p>
            <p className="font-medium" style={{ color: '#6ec98b' }}>
              Sjekk e-posten din
            </p>
            <p className="text-sm" style={{ color: '#8888aa' }}>
              Vi har sendt en innloggingslenke til {email}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div
              className="rounded-2xl p-5 flex flex-col gap-4"
              style={{ backgroundColor: '#16213e' }}
            >
              <label className="flex flex-col gap-2">
                <span className="text-sm" style={{ color: '#8888aa' }}>
                  E-postadresse
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="din@epost.no"
                  className="w-full px-4 py-3 rounded-xl text-white outline-none focus:ring-2"
                  style={{
                    backgroundColor: '#1a1a3e',
                    border: '1px solid #333355',
                    caretColor: '#c9a96e',
                  }}
                />
              </label>

              {error && (
                <p className="text-sm" style={{ color: '#e08080' }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-50"
                style={{ backgroundColor: '#c9a96e', color: '#1a1a2e' }}
              >
                {loading ? 'Sender...' : 'Send innloggingslenke'}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}
