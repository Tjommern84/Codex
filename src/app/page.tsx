import TimeSelector from '@/components/workout/TimeSelector'

export default function Home() {
  return (
    <main
      className="min-h-dvh flex flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: '#FAF6F0' }}
    >
      <div className="w-full max-w-sm flex flex-col gap-12">

        {/* Header */}
        <header className="text-center flex flex-col items-center gap-4">
          {/* Botanical leaf mark */}
          <svg width="28" height="36" viewBox="0 0 28 36" fill="none" aria-hidden="true">
            <path
              d="M14 33 C14 33, 3 24, 3 14 C3 7, 7.5 3, 14 3 C20.5 3, 25 7, 25 14 C25 24, 14 33, 14 33Z"
              stroke="#5C7A65"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M14 33 L14 6" stroke="#5C7A65" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M14 18 C12 16, 7 15, 5 15" stroke="#5C7A65" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M14 23 C16 21, 21 20, 23 20" stroke="#5C7A65" strokeWidth="1.2" strokeLinecap="round" />
          </svg>

          <h1
            style={{
              fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
              fontSize: 'clamp(2.8rem, 12vw, 4rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
              color: '#3A3530',
            }}
          >
            Pust Yoga
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
              fontSize: '0.65rem',
              fontWeight: 300,
              letterSpacing: '0.2em',
              color: '#B0A89E',
              textTransform: 'uppercase',
            }}
          >
            Yin · Pust · Ro
          </p>
        </header>

        {/* Card */}
        <div
          className="rounded-[20px] p-6"
          style={{
            backgroundColor: 'rgba(255,252,247,0.72)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.7)',
            boxShadow: '0 4px 32px rgba(180,160,130,0.10)',
          }}
        >
          <TimeSelector />
        </div>

        {/* Tagline */}
        <p
          className="text-center"
          style={{
            fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
            fontSize: '0.95rem',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#B0A89E',
            lineHeight: 1.6,
          }}
        >
          Begin when you're ready.
        </p>

      </div>
    </main>
  )
}
