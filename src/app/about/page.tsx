'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-20">
      {/* Header Section */}
      <section className="text-center max-w-3xl mx-auto px-2">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-500 mb-6 drop-shadow">
          Về Chúng Tôi
        </h1>
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed tracking-wide">
          Chúng tôi là những người đam mê tốc độ, thiết kế và những chiếc xe mô hình độc đáo nhất của Hot Wheels.
          Mục tiêu của chúng tôi là mang lại cho bạn bộ sưu tập xe mô hình phong phú, chất lượng và đầy cảm hứng.
        </p>
      </section>

      {/* Mission Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="space-y-6 px-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-500">Sứ mệnh</h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Chúng tôi không chỉ bán đồ chơi, mà còn giúp bạn lưu giữ những kỷ niệm tuổi thơ, bắt đầu đam mê sưu tập và tạo ra niềm vui bất tận cho cả trẻ em và người lớn.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-full bg-yellow-500 text-black font-semibold shadow hover:bg-yellow-400 hover:scale-105 transition"
          >
            Liên hệ với chúng tôi
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl shadow-xl mx-auto w-full max-w-md md:max-w-full hover:scale-105 transition-transform duration-500">
          <Image
            src="/banners/about.png"
            alt="Ảnh mô tả sứ mệnh"
            width={700}
            height={460}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-tr from-yellow-50 via-yellow-100 to-yellow-50 p-10 sm:p-12 rounded-3xl shadow-2xl text-center max-w-4xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-yellow-600 mb-4 tracking-tight">
          🚗 Cùng bắt đầu hành trình tốc độ với Hot Wheels!
        </h3>
        <p className="text-gray-800 text-base sm:text-lg mb-6">
          Khám phá hàng trăm mẫu xe cực chất chỉ có tại cửa hàng chúng tôi.
        </p>
        <Link
          href="/products"
          className="inline-block px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full shadow-lg hover:bg-yellow-400 hover:scale-105 transition"
        >
          Khám phá ngay
        </Link>
      </section>
    </main>
  )
}
