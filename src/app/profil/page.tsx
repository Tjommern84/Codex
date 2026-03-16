import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SubscriptionGate from '@/components/ui/SubscriptionGate'
import Link from 'next/link'

export default async function ProfilPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/innlogging')

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const isActive = profile?.subscription_status === 'active'

  return (
    <main className="min-h-dvh px-4 py-8">
      <div className="max-w-md mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm" style={{ color: '#8888aa' }}>
            ← Hjem
          </Link>
          <h1 className="font-semibold text-white ml-auto">Profil</h1>
        </div>

        {/* Brukerkort */}
        <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ backgroundColor: '#16213e' }}>
          <p className="text-sm" style={{ color: '#8888aa' }}>Innlogget som</p>
          <p className="font-medium text-white">{user.email}</p>
          <div className="flex items-center gap-2">
            <span
              className="text-xs px-2 py-1 rounded-full font-medium"
              style={{
                backgroundColor: isActive ? '#1a4a2e' : '#2a1a1a',
                color: isActive ? '#6ec98b' : '#e08080',
              }}
            >
              {isActive ? '✓ Premium aktiv' : 'Gratis konto'}
            </span>
          </div>
        </div>

        {/* Abonnement */}
        {!isActive && <SubscriptionGate />}

        {isActive && (
          <div
            className="rounded-2xl p-5 flex flex-col gap-2"
            style={{ backgroundColor: '#1a4a2e' }}
          >
            <p className="font-medium" style={{ color: '#6ec98b' }}>
              Livstidstilgang aktivert
            </p>
            <p className="text-sm" style={{ color: '#a8d8a8' }}>
              Du har tilgang til alle lydveiledninger.
            </p>
          </div>
        )}

        {/* Logg ut */}
        <LogoutButton />
      </div>
    </main>
  )
}

function LogoutButton() {
  return (
    <form action="/api/auth/logout" method="POST">
      <button
        type="submit"
        className="w-full py-3 rounded-xl text-sm font-medium"
        style={{ backgroundColor: '#1a1a3e', color: '#8888aa' }}
      >
        Logg ut
      </button>
    </form>
  )
}
