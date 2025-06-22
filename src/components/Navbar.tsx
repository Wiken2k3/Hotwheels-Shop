'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, User } from 'lucide-react'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Sale', href: '/sale' },
  { name: 'Contact', href: '/contact' },
  { name: 'About', href: '/about' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-neutral-900 via-black to-neutral-900 shadow-md border-b border-yellow-500">
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center h-16 px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="HotWheels Logo"
            width={100}
            height={40}
            priority
          />
        </Link>

        {/* Navigation */}
        {mounted && (
          <nav className="hidden md:flex gap-6 text-sm font-semibold tracking-wide">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition duration-200 hover:text-yellow-400 ${
                  pathname === item.href ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}

        {/* Icons */}
        <div className="flex items-center gap-3">
          <Link href="/profile" aria-label="Tài khoản">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-yellow-400">
              <User className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/cart" aria-label="Giỏ hàng">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-yellow-400">
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
