'use client'

import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/types/product'
import { products as staticProducts } from '@/data/products'

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      const regular = staticProducts.filter(
        (product) =>
          !product.onSale &&
          typeof product.salePrice !== 'number' &&
          !product.liked
      )
      setProducts(regular)
      setLoading(false)
    }, 400)

    return () => clearTimeout(timer)
  }, [])

  if (!loading && products.length === 0) {
    return (
      <p className="text-gray-400 mt-12 text-center text-lg italic animate-fade-in">
        😢 Không có sản phẩm nào phù hợp.
      </p>
    )
  }

  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-16 bg-black overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(253,224,71,0.08)_0%,transparent_70%)] opacity-30" />
      <div className="max-w-screen-xl mx-auto relative z-10">
        <h2 className="text-m sm:text-1xl md:text-3.5xl font-extrabold text-center text-yellow-400 mb-6">
          🚗 Sản phẩm thông thường
        </h2>
        <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto text-sm sm:text-base">
          Những mẫu Hot Wheels chất lượng, đa dạng – sẵn sàng cho bộ sưu tập của bạn.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-neutral-800 rounded-xl aspect-[4/3]"
                />
              ))
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </section>
  )
}
