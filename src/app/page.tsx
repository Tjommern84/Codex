import TimeSelector from '@/components/workout/TimeSelector'

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md flex flex-col gap-10">
        {/* Header */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#c9a96e' }}>
            Pust Yoga
          </h1>
          <p className="text-sm" style={{ color: '#8888aa' }}>
            Tilpass varigheten og generer ditt yin yoga-program
          </p>
        </div>

        {/* Tidsvelger */}
        <div
          className="rounded-3xl p-6"
          style={{ backgroundColor: '#16213e' }}
        >
          <TimeSelector />
        </div>
      </div>
    </main>
  )
}
