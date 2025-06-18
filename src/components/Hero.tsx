import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/carcity.jpg" // Đường dẫn đến ảnh nền
        alt="Hot Wheels Hero"
        layout="fill"
        objectFit="cover"
        priority
        quality={100}          // giữ chất lượng ảnh gốc
        className="z-0"
      />

      {/* Overlay đen mờ nhẹ */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-25 z-10"></div> */}

      {/* Nội dung */}
      <div className="z-20 relative max-w-3xl px-6 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-tight">
          Khám phá thế giới mô hình <br />
          <span className="text-yellow-400 drop-shadow-[0_1px_5px_rgba(0,0,0,0.7)]">Hot Wheels</span>
        </h1>
        <p className="text-white mt-4 mb-6 text-lg md:text-xl drop-shadow-md">
          Mẫu mới nhất - Chính hãng - Giao hàng toàn quốc
        </p>
        <Link
          href="/products"
          className="bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-8 rounded-full text-sm font-bold transition transform hover:scale-105 shadow-lg"
        >
          🚗 Xem Sản Phẩm
        </Link>
      </div>

      {/* Gradient bóng nhẹ dưới chân */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
    </section>
  )
}
