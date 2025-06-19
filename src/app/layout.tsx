import './globals.css'
import type { Metadata } from 'next'
import { Fredoka } from 'next/font/google'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ToasterProvider from '@/components/ToasterProvider' // Client Component

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
      <head>
        {/* Disable iOS phone/email/address auto linking to avoid hydration issues */}
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
      </head>
      <body
        className={`${fredoka.className} bg-neutral-950 text-white min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow px-4 md:px-8 lg:px-16">{children}</main>
        <Footer />
        <ToasterProvider /> {/* Client component */}
      </body>
    </html>
  )
}
