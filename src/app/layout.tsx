import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-display',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Pust Yoga',
  description: 'Generer ditt personlige yin yoga-program',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Pust Yoga',
  },
}

export const viewport: Viewport = {
  themeColor: '#FAF6F0',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body
        style={{
          fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
          backgroundColor: '#FAF6F0',
          color: '#3A3530',
          minHeight: '100dvh',
        }}
      >
        {children}
      </body>
    </html>
  )
}
