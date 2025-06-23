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
    <section className="relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-400/10 via-transparent to-transparent opacity-20 pointer-events-none z-0" />

      <div className="max-w-screen-xl mx-auto relative z-10">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-yellow-400 mb-6 tracking-tight">
          🌟 Sản phẩm nhiều người thích
        </h2>
        <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto">
          Những sản phẩm được yêu thích và đánh giá cao – dành cho tín đồ sưu tầm HotWheels!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-neutral-800 rounded-2xl h-72 sm:h-80 lg:h-[340px]"
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
