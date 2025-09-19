import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppProvider } from '@/contexts/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Michael's Amazing Web Store",
  description: 'A modern e-commerce store with international support',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
