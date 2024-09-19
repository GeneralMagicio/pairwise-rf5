import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@smastrom/react-rating/style.css'
import AppKitProvider from './utils/wallet/provider'
import { ReactNode } from 'react'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Pairwise',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <AppKitProvider>{children}</AppKitProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  )
}
