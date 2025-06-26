// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Lora } from 'next/font/google'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ToasterProvider from '@/components/ToasterProvider'

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // bạn có thể tùy chỉnh
  display: 'swap',
})

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
      <head>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
      </head>
      <body
        className={`${lora.className} bg-neutral-950 text-white min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow px-4 md:px-8 lg:px-16">{children}</main>
        <Footer />
        <ToasterProvider />
      </body>
    </html>
  )
}
