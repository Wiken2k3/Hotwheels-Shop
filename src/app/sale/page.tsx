'use client'

import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import Image from 'next/image'

export default function SalePage() {
  const saleProducts = products.filter((p) => p.salePrice)

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Image
          src="/banners/sale-banner.jpg"
          alt="Giảm giá Hot Wheels"
          width={1200}
          height={400}
          className="rounded-xl shadow-lg w-full object-cover"
          priority
        />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-red-600">🔥 Sản phẩm khuyến mãi</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {saleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
