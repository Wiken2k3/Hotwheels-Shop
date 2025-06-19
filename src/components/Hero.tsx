import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-[75vh] md:h-[80vh] flex items-center justify-center text-center overflow-hidden bg-black">
      {/* Ảnh nền */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/carcity.jpg"
          alt="Hot Wheels Hero"
          fill
          style={{ objectFit: 'cover' }}
          priority
          quality={100}
          className="opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
      </div>

      {/* Nội dung chính */}
      <div className="z-20 relative max-w-3xl px-6 text-white animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] tracking-tight">
          Khám phá thế giới <br />
          <span className="text-yellow-400 drop-shadow-[0_1px_6px_rgba(255,255,0,0.8)]">
            Hot Wheels
          </span>
        </h1>
        <p className="mt-4 mb-8 text-lg md:text-xl text-gray-100 drop-shadow-md">
          Mô hình xe chính hãng – Độc đáo – Giao hàng toàn quốc 🚚
        </p>
        <Link
          href="/products"
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-8 rounded-full text-base font-bold uppercase tracking-wide transition-all transform hover:scale-105 shadow-lg hover:shadow-yellow-500"
        >
          🚗 Khám phá ngay
        </Link>
      </div>

      {/* Hiệu ứng ánh sáng dưới chân */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black via-black/60 to-transparent z-10 pointer-events-none" />
    </section>
  )
}
