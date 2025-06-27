'use client'

import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/types/product'
import { products as staticProducts } from '@/data/products'

export default function FeaturedProductList() {
  const [featured, setFeatured] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      const highlight = staticProducts.filter((product) => product.liked === true)
      setFeatured(highlight)
      setLoading(false)
    }, 400)

    return () => clearTimeout(timer)
  }, [])

  if (!loading && featured.length === 0) return null

  return (
    <section className="relative py-14 sm:py-18 px-4 sm:px-6 md:px-10 lg:px-16 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Hiệu ứng nền ánh sáng */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-400/10 via-transparent to-transparent opacity-20 pointer-events-none z-0" />

      <div className="max-w-screen-xl mx-auto relative z-10">
        <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center text-yellow-400 mb-6 tracking-tight">
          🌟 Sản phẩm nhiều người thích
        </h2>
        <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto text-sm sm:text-base">
          Những sản phẩm được yêu thích và đánh giá cao – dành cho tín đồ sưu tầm Hot Wheels!
        </p>

        {/* Grid with consistent height */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 auto-rows-[1fr]">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-neutral-800 rounded-xl min-h-[290px] sm:min-h-[310px]"
                />
              ))
            : featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </section>
  )
}
