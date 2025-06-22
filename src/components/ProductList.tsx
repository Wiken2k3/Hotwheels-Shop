'use client'

import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/types/product'
import { products as staticProducts } from '@/data/products'

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Lấy dữ liệu tĩnh luôn
    setProducts(staticProducts)
  }, [])

  if (products.length === 0) {
    return (
      <p className="text-gray-500 mt-6 text-center text-lg">
        Không có sản phẩm nào phù hợp.
      </p>
    )
  }

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 relative">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent opacity-20" />

      <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-yellow-400 drop-shadow-xl tracking-tight z-10 relative">
        🚗 Sản phẩm Hot Wheels nổi bật
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10 z-10 relative">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
