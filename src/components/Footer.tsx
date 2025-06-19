import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-tr from-neutral-900 to-neutral-800 text-gray-300 pt-12 pb-6 mt-10 border-t border-yellow-400">
      <div className="w-full max-w-screen-xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">
        {/* Cột 1: Logo + tên shop */}
        <div className="text-center md:text-left">
          <div className="w-20 h-20 mx-auto md:mx-0 rounded-full overflow-hidden border-2 border-yellow-400 mb-3">
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
            Cửa hàng chuyên mô hình Hot Wheels chính hãng – nơi bắt đầu cuộc đua của bé!
          </p>
        </div>

        {/* Cột 2: Điều hướng */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-3">Điều hướng</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-yellow-400">Trang chủ</Link></li>
            <li><Link href="/products" className="hover:text-yellow-400">Sản phẩm</Link></li>
            <li><Link href="/sale" className="hover:text-yellow-400">Khuyến mãi</Link></li>
            <li><Link href="/about" className="hover:text-yellow-400">Giới thiệu</Link></li>
          </ul>
        </div>

        {/* Cột 3: Chính sách */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-3">Hỗ trợ</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-yellow-400">Chính sách đổi trả</Link></li>
            <li><Link href="#" className="hover:text-yellow-400">Hướng dẫn mua hàng</Link></li>
            <li><Link href="#" className="hover:text-yellow-400">Bảo mật & thanh toán</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-400">Liên hệ</Link></li>
          </ul>
        </div>

        {/* Cột 4: Liên hệ */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-3">Liên hệ</h4>
          <ul className="space-y-1 text-gray-400">
            <li>📍 292/16 GS14 Phường Đông Hoà Dĩ An, Bình Dương</li>
            <li>📞 0989 648 691</li>
            <li>✉️ support@hotwheels.vn</li>
          </ul>
          <div className="flex items-center gap-4 mt-4">
            <Link href="#" className="hover:text-yellow-400"><Facebook className="w-5 h-5" /></Link>
            <Link href="#" className="hover:text-yellow-400"><Instagram className="w-5 h-5" /></Link>
            <Link href="#" className="hover:text-yellow-400"><Youtube className="w-5 h-5" /></Link>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-500 px-4 max-w-screen-xl mx-auto">
        © {new Date().getFullYear()} Wiken Hotwheels – Powered by tốc độ và đam mê.
      </div>
    </footer>
  )
}
