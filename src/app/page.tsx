'use client'

import Hero from '@/components/Hero'
import FeaturedProductList from '@/components/FeaturedProductList'
import ProductList from '@/components/ProductList'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Intro Section */}
      <section className="bg-neutral-950 py-10 px-4 md:px-8 lg:px-16 text-center text-gray-300">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-400 drop-shadow-sm">
            🚗 Khám phá thế giới Hot Wheels
          </h2> */}
          {/* <p className="text-sm sm:text-base text-gray-400">
            Chúng tôi mang đến những mẫu mô hình Hot Wheels chính hãng, cực chất – từ cổ điển đến siêu xe hiện đại. Đam mê tốc độ? Bắt đầu từ đây!
          </p> */}
          {/* <Link
            href="/about"
            className="inline-block mt-4 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition"
          >
            Tìm hiểu thêm
          </Link> */}
        </div>
      </section>

      {/* Featured Product Section */}
      <FeaturedProductList />

      {/* Regular Product Section */}
      <ProductList />
    </>
  )
}
