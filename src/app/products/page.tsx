'use client'

import { useEffect, useState } from 'react'
import { products } from '@/data/products'
import { Product } from '@/types/product'
import ProductCard from '@/components/ProductCard'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function Products() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setAllProducts(products)
    setLoading(false)
  }, [])

  const collections = Array.from(new Set(products.map((p) => p.collection)))

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  }

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Đang tải sản phẩm...</div>
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-orange-500 mb-10">
        🏁 Tất cả sản phẩm Hot Wheels
      </h1>

      {/* Danh sách đầy đủ sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Danh sách theo bộ sưu tập */}
      {collections.map((collection) => {
        const filtered = allProducts.filter((p) => p.collection === collection)

        return (
          <div key={collection} className="mb-16">
            <h2 className="text-2xl font-bold mb-4 text-yellow-500">
              🚗 Bộ sưu tập: {collection}
            </h2>
            <Slider {...sliderSettings}>
              {filtered.map((product) => (
                <div key={product.id} className="px-2">
                  <ProductCard product={product} />
                </div>
              ))}
            </Slider>
          </div>
        )
      })}
    </div>
  )
}
