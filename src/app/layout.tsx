// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Fredoka } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const fredoka = Fredoka({ subsets: ['latin'], weight: ['400', '600', '700'] })

export const metadata: Metadata = {
  title: 'HotWheels Shop',
  description: 'Mua bán mô hình xe Hotwheels chính hãng',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body
        className={`${fredoka.className} bg-neutral-900 text-white min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow px-4 md:px-8 lg:px-16">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
