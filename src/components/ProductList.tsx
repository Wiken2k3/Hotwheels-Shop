'use client'

import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/types/product'
import { products as staticProducts } from '@/data/products'

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mô phỏng delay load để tạo hiệu ứng loading (optional)
    const timer = setTimeout(() => {
      setProducts(staticProducts)
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
    <section className="relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black overflow-hidden">
      {/* Vầng sáng spotlight đằng sau */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(253,224,71,0.1)_0%,transparent_70%)] opacity-40" />
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-yellow-400 mb-6">
          🔥 Sản phẩm nổi bật
        </h2>
        <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto">
          Khám phá những mẫu xe Hot Wheels được yêu thích nhất – tốc độ, phong cách, và niềm vui không giới hạn!
        </p>

      {/* Grid sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-neutral-800 rounded-2xl h-72 sm:h-80 lg:h-[340px]"
              />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </section>
  )
}
