// app/about/page.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-16 space-y-12">
      <section className="text-center">
        <h1 className="text-5xl font-extrabold text-orange-500 mb-4">Về Chúng Tôi</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Chúng tôi là những người đam mê tốc độ, thiết kế và những chiếc xe mô hình độc đáo nhất của Hot Wheels. Mục tiêu của chúng tôi là mang lại cho bạn bộ sưu tập xe mô hình phong phú, chất lượng và đầy cảm hứng.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Sứ mệnh</h2>
          <p className="text-gray-600 leading-relaxed">
            Chúng tôi không chỉ bán đồ chơi, mà còn giúp bạn lưu giữ những kỷ niệm tuổi thơ, bắt đầu đam mê sưu tập và tạo ra niềm vui bất tận cho cả trẻ em và người lớn.
          </p>
        </div>
        <div>
          <Image
            src="/about-mission.jpg"
            alt="Sứ mệnh Hot Wheels"
            width={600}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      <section className="bg-orange-50 p-8 rounded-2xl shadow-inner text-center">
        <h3 className="text-2xl font-semibold text-orange-600 mb-2">Cùng bắt đầu hành trình tốc độ với Hot Wheels!</h3>
        <p className="text-gray-700">Khám phá hàng trăm mẫu xe cực chất chỉ có tại cửa hàng chúng tôi.</p>
        <Link
          href="/products"
          className="inline-block mt-4 px-6 py-3 bg-orange-500 text-white font-bold rounded-full shadow hover:bg-orange-600 transition"
        >
          Khám phá ngay
        </Link>
      </section>
    </main>
  )
}