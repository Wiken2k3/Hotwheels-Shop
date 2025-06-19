// 'use client'
import * as React from 'react'
import { products } from '@/data/products'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const product = products.find((p) => p.id === id)

  if (!product) return notFound()

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="w-full overflow-hidden rounded-xl shadow-lg border border-gray-200">
          <Image
            src={product.image}
            alt={product.name}
            width={1000}
            height={800}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-neutral-900">{product.name}</h1>

          <div>
            {product.salePrice ? (
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-red-600">
                  {product.salePrice.toLocaleString()}₫
                </span>
                <span className="line-through text-gray-400 text-lg">
                  {product.price.toLocaleString()}₫
                </span>
              </div>
            ) : (
              <span className="text-3xl font-semibold text-neutral-800">
                {product.price.toLocaleString()}₫
              </span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed text-base">
            {product.description}
          </p>

          <Button
            className="text-base px-8 py-3 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-md transition"
          >
            🛒 Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  )
}
