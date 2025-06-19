'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, User } from 'lucide-react'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Sale', href: '/sale' },
  { name: 'Contact', href: '/contact' },
  { name: 'About', href: '/about' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-neutral-900 shadow-md">
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center h-16 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="HotWheels Logo"
            width={100}
            height={40}
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="space-x-6 hidden md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition hover:text-yellow-400 ${
                pathname === item.href ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User/Cart */}
        <div className="flex items-center gap-4">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-yellow-400">
              <User className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-yellow-400">
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
