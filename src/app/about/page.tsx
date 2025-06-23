'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-20 space-y-20">
      
      {/* Header Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-6xl font-extrabold text-[#D35400] mb-6">
          Về Chúng Tôi
        </h1>
        <p className="text-white-400 text-l leading-relaxed">
          Chúng tôi là những người đam mê tốc độ, thiết kế và những chiếc xe mô hình độc đáo nhất của Hot Wheels. Mục tiêu của chúng tôi là mang lại cho bạn bộ sưu tập xe mô hình phong phú, chất lượng và đầy cảm hứng.
        </p>
      </section>

      {/* Mission Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-[#D35400] ">Sứ mệnh</h2>
          <p className="text-white-800 text-l leading-relaxed tracking-wide">
            Chúng tôi không chỉ bán đồ chơi, mà còn giúp bạn lưu giữ những kỷ niệm tuổi thơ, bắt đầu đam mê sưu tập và tạo ra niềm vui bất tận cho cả trẻ em và người lớn.
          </p>
          <Link
            href="/contact"
            className="inline-block px-7 py-3 bg-[#E67E22] text-white font-semibold rounded-full shadow-lg hover:bg-[#D35400] hover:shadow-xl transition-colors duration-300"
          >
            Liên hệ với chúng tôi
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500">
          <Image
            src="/banners/about.png"
            alt="Sứ mệnh Hot Wheels"
            width={700}
            height={460}
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-tr from-[#FFF8F1] to-[#FFFAE6] p-12 rounded-3xl shadow-xl text-center max-w-4xl mx-auto">
        <h3 className="text-3xl font-extrabold text-[#D35400] mb-4 drop-shadow-sm">
          Cùng bắt đầu hành trình tốc độ với Hot Wheels!
        </h3>
        <p className="text-gray-900 text-lg mb-8">
          Khám phá hàng trăm mẫu xe cực chất chỉ có tại cửa hàng chúng tôi.
        </p>
        <Link
          href="/products"
          className="inline-block px-10 py-4 bg-[#E67E22] text-white font-bold rounded-full shadow-lg hover:bg-[#D35400] hover:shadow-2xl transition duration-300"
        >
          Khám phá ngay
        </Link>
      </section>

    </main>
  )
}
