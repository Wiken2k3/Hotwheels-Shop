'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-tr from-neutral-900 to-neutral-800 text-gray-300 pt-14 pb-6 border-t border-yellow-500">
      <div className="w-full max-w-screen-xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">
        {/* Cột 1: Logo */}
        <div className="text-center md:text-left">
          <div className="w-20 h-20 mx-auto md:mx-0 rounded-full overflow-hidden border-2 border-yellow-400 mb-3 shadow-yellow-400/40 shadow-md">
            <Image
              src="/images/logo.png"
              alt="Wiken Hotwheels"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-yellow-400">Wiken Hotwheels</h2>
          <p className="text-gray-400 mt-2 leading-relaxed">
            Mô hình Hot Wheels chính hãng – nơi bắt đầu cuộc đua của bé!
          </p>
        </div>

        {/* Điều hướng */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-3">Điều hướng</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-yellow-400 transition">Trang chủ</Link></li>
            <li><Link href="/products" className="hover:text-yellow-400 transition">Sản phẩm</Link></li>
            <li><Link href="/sale" className="hover:text-yellow-400 transition">Khuyến mãi</Link></li>
            <li><Link href="/about" className="hover:text-yellow-400 transition">Giới thiệu</Link></li>
          </ul>
        </div>

        {/* Chính sách */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-3">Hỗ trợ</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-yellow-400 transition">Chính sách đổi trả</Link></li>
            <li><Link href="#" className="hover:text-yellow-400 transition">Hướng dẫn mua hàng</Link></li>
            <li><Link href="#" className="hover:text-yellow-400 transition">Bảo mật & thanh toán</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-400 transition">Liên hệ</Link></li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-3">Liên hệ</h4>
          <ul className="space-y-1 text-gray-400">
            <li>📍 292/16 GS14, Đông Hoà, Dĩ An, Bình Dương</li>
            <li>📞 0989 648 691</li>
            <li>✉️ support@hotwheels.vn</li>
          </ul>
          <div className="flex items-center gap-4 mt-4 text-yellow-400">
            <Link href="#"><Facebook className="w-5 h-5 hover:scale-110 transition" /></Link>
            <Link href="#"><Instagram className="w-5 h-5 hover:scale-110 transition" /></Link>
            <Link href="#"><Youtube className="w-5 h-5 hover:scale-110 transition" /></Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-xs text-gray-500 px-4 max-w-screen-xl mx-auto">
        © {new Date().getFullYear()} <strong className="text-yellow-400">Wiken Hotwheels</strong> – Powered by tốc độ & đam mê.
      </div>
    </footer>
  )
}
