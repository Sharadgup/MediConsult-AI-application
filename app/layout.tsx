import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MediConsult AI - Medicine Consulting and Solutions',
  description: 'AI-powered platform for prescription management and alternative medicine suggestions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-custom min-h-screen`}>{children}</body>
    </html>
  )
}

