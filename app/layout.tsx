import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
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

export const metadata: Metadata = {
  title: 'Covenants PharmaChem LLP - APIs, Intermediates & Specialty Chemicals',
  description: 'Expanding horizons in APIs, intermediates & specialty chemicals. Your trusted supply chain partner for custom manufacturing, research, and SCM services.',
  keywords: ['pharmaceutical', 'API', 'intermediates', 'specialty chemicals', 'supply chain', 'manufacturing'],
  authors: [{ name: 'Covenants PharmaChem LLP' }],
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
      </body>
    </html>
  )
}

