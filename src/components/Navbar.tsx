'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { Button } from './ui/button'

const navItems = [
  { name: 'TRANG CHỦ', href: '/' },
  { name: 'SẢN PHẨM', href: '/products' },
  { name: 'KHUYẾN MÃI', href: '/sale' },
  { name: 'GIỚI THIỆU', href: '/about' },
  { name: 'LIÊN HỆ', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-gradient-to-r from-neutral-900/80 via-black/70 to-neutral-900/80 border-b border-yellow-500/40 shadow-[0_2px_8px_rgba(255,255,0,0.05)]">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="HotWheels Logo"
            width={100}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        {mounted && (
          <nav className="hidden md:flex gap-6 text-sm font-semibold tracking-wide">
            {navItems.map(({ name, href }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={name}
                  href={href}
                  className={`relative transition-colors duration-200 ${
                    isActive ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'
                  }`}
                >
                  {name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400 rounded-full animate-fade-in" />
                  )}
                </Link>
              )
            })}
          </nav>
        )}

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-yellow-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-3">
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

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 space-y-2 bg-neutral-900 border-t border-yellow-500/20 animate-fade-in-down">
          {navItems.map(({ name, href }) => {
            const isActive = pathname === href
            return (
              <Link
                key={name}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 px-3 rounded-md text-sm font-semibold ${
                  isActive ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'
                }`}
              >
                {name}
              </Link>
            )
          })}

          {/* Mobile Icons */}
          <div className="flex gap-4 pt-4 border-t border-yellow-400/10">
            <Link href="/profile" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-yellow-400">
              <User className="w-5 h-5" />
            </Link>
            <Link href="/cart" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-yellow-400">
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
