import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Covenants PharmaChem LLP - APIs, Intermediates & Specialty Chemicals',
  description: 'Expanding horizons in APIs, intermediates & specialty chemicals. Your trusted supply chain partner for custom manufacturing, research, and SCM services.',
  keywords: ['pharmaceutical', 'API', 'intermediates', 'specialty chemicals', 'supply chain', 'manufacturing'],
  authors: [{ name: 'Covenants PharmaChem LLP' }],
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon-32.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Covenants PharmaChem LLP',
    description: 'Expanding horizons in APIs, intermediates & specialty chemicals',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  )
}

