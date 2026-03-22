import { Suspense } from 'react'
import ProgramPageClient from './ProgramPageClient'

export default function ProgramPage() {
  return (
    <Suspense fallback={
      <main className="min-h-dvh flex items-center justify-center">
        <p style={{ color: '#8888aa' }}>Genererer program...</p>
      </main>
    }>
      <ProgramPageClient />
    </Suspense>
  )
}
