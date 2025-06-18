import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gray-100 h-[70vh] flex items-center justify-center text-center">
      <Image
        src="/images/hero.png"
        alt="Hot Wheels Hero"
        layout="fill"
        objectFit="cover"
        className="z-0 opacity-80"
      />
      <div className="z-10 relative max-w-2xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          Khám phá thế giới mô hình <br /> <span className="text-red-500">Hot Wheels</span>
        </h1>
        <p className="text-white mt-4 mb-6 text-lg">Mẫu mới nhất - Chính hãng - Giao hàng toàn quốc</p>
        <Link
          href="/products"
          className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-md text-sm font-medium transition"
        >
          Xem Sản Phẩm
        </Link>
      </div>
    </section>
  )
}
