'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-neutral-950 to-neutral-900 text-gray-300 pt-14 pb-8 border-t border-yellow-400/20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-yellow-400 via-transparent to-transparent" />

      <div className="w-full max-w-screen-xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm relative z-10">
        {/* Logo & Mô tả */}
        <div className="text-center md:text-left">
          <div className="w-20 h-20 mx-auto md:mx-0 rounded-full overflow-hidden border-2 border-yellow-400 shadow-yellow-500/30 shadow-md mb-3">
            <Image
              src="/images/logo.png"
              alt="Wiken Hotwheels"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-yellow-400 tracking-wide">Wiken Hotwheels</h2>
          <p className="text-gray-400 mt-2 leading-relaxed text-sm">
            Mô hình Hot Wheels chính hãng – nơi bắt đầu cuộc đua và đam mê tốc độ.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Điều hướng</h4>
          <ul className="space-y-2">
            {[
              { name: 'Trang chủ', href: '/' },
              { name: 'Sản phẩm', href: '/products' },
              { name: 'Khuyến mãi', href: '/sale' },
              { name: 'Giới thiệu', href: '/about' },
            ].map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-yellow-400 transition">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Hỗ trợ</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-yellow-400 transition">Chính sách đổi trả</Link></li>
            <li><Link href="#" className="hover:text-yellow-400 transition">Hướng dẫn mua hàng</Link></li>
            <li><Link href="#" className="hover:text-yellow-400 transition">Bảo mật & thanh toán</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-400 transition">Liên hệ</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Liên hệ</h4>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li>📍 292/16 GS14, Dĩ An, Bình Dương</li>
            <li>📞 0989 648 691</li>
            <li>✉️ support@hotwheels.vn</li>
          </ul>

          <div className="flex gap-4 mt-4 text-yellow-400">
            {[{ Icon: Facebook, href: '#' }, { Icon: Instagram, href: '#' }, { Icon: Youtube, href: '#' }].map(({ Icon, href }, i) => (
              <Link key={i} href={href} aria-label={`Mạng xã hội ${i + 1}`}>
                <Icon className="w-5 h-5 hover:scale-110 hover:text-white transition-all duration-200" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 text-center text-xs text-gray-500 px-4 relative z-10">
        © {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">Wiken Hotwheels</span> – Nơi xe mô hình trở thành huyền thoại.
      </div>
    </footer>
  )
}
