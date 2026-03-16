import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pust Yoga',
  description: 'Generer ditt personlige yin yoga-program',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Pust Yoga',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no">
      <body
        className={geist.className}
        style={{ backgroundColor: '#1a1a2e', color: '#ffffff', minHeight: '100dvh' }}
      >
        {children}
      </body>
    </html>
  )
}
