'use client'

import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import Image from 'next/image'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function SalePage() {
  const saleProducts = products.filter((p) => p.salePrice)
  const collections = [
    ...new Set(saleProducts.map((p) => p.collection).filter(Boolean)),
  ] as string[]

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  }

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10">
      {/* Banner */}
      <div className="mb-10">
        <Image
          src="/banners/sale-banner.png"
          alt="Giảm giá Hot Wheels"
          width={1200}
          height={400}
          className="rounded-3xl shadow-lg w-full object-cover"
          priority
        />
      </div>

      {/* Tiêu đề chính */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-red-600 tracking-tight mb-8">
        🔥 Sản phẩm khuyến mãi
      </h1>

      {/* Danh sách sản phẩm giảm giá toàn bộ */}
      {saleProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center italic mt-10">
          Hiện chưa có sản phẩm giảm giá nào.
        </p>
      )}

      {/* Carousel từng bộ sưu tập */}
      {collections.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-6 text-orange-500">
            🌟 Sản phẩm khuyến mãi theo bộ sưu tập
          </h2>

          {collections.map((collection) => {
            const items = saleProducts.filter(
              (p) => p.collection === collection
            )

            if (items.length === 0) return null

            return (
              <div key={collection} className="mb-12">
                <h3 className="text-xl font-semibold text-yellow-500 mb-3">
                  🚗 Bộ sưu tập: {collection}
                </h3>

                <div className="-mx-2">
                  <Slider {...sliderSettings}>
                    {items.map((product) => (
                      <div key={product.id} className="px-2">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            )
          })}
        </section>
      )}
    </main>
  )
}
