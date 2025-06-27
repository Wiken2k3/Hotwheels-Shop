'use client'

import * as React from 'react'
import Image from 'next/image'
import { Product } from '@/types/product'
import { useCart } from '@/store/cart-store'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'

export default function ProductDetailClient({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = React.useState(false)

  React.useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]') as string[]
    setIsFavorite(favs.includes(product.id))
  }, [product.id])

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]') as string[]
    const updated = isFavorite
      ? favs.filter((id) => id !== product.id)
      : [...favs, product.id]
    localStorage.setItem('favorites', JSON.stringify(updated))
    setIsFavorite(!isFavorite)
    toast.success(isFavorite ? 'Đã bỏ yêu thích' : 'Đã thêm vào yêu thích!')
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-16">
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row gap-y-10 md:gap-x-10">
        {/* Hình ảnh sản phẩm */}
        <div className="w-full md:w-1/2 rounded-xl overflow-hidden border border-yellow-400/40 shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={600}
            className="w-full h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[500px] object-contain"
            priority
          />
        </div>

        {/* Thông tin chi tiết */}
        <div className="w-full md:w-1/2 flex flex-col justify-between text-gray-900">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">{product.name}</h1>

          {/* Giá sản phẩm */}
          <div className="mb-4">
            {product.salePrice ? (
              <div className="flex items-end gap-4">
                <span className="text-2xl sm:text-3xl font-bold text-red-600">
                  {product.salePrice.toLocaleString()}₫
                </span>
                <span className="line-through text-gray-400 text-base sm:text-lg italic">
                  {product.price.toLocaleString()}₫
                </span>
              </div>
            ) : (
              <span className="text-2xl sm:text-3xl font-semibold text-green-700">
                {product.price.toLocaleString()}₫
              </span>
            )}
          </div>

          {/* Mô tả */}
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
            {product.description}
          </p>

          {/* Nút thao tác */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:items-center">
            <Button
              size="lg"
              className="bg-yellow-500 text-black font-bold px-6 py-4 rounded-2xl shadow-xl hover:bg-yellow-600"
              onClick={() => {
                useCart.getState().addToCart(product)
                toast.success('Đã thêm vào giỏ hàng! 🚗')
              }}
            >
              <span className="hidden sm:inline">Thêm giỏ hàng</span>
              <span className="inline sm:hidden">Mua</span>
            </Button>

            <Button
              size="lg"
              variant={isFavorite ? 'destructive' : 'outline'}
              className="flex items-center justify-center px-6 py-4 rounded-2xl transition-transform hover:scale-105"
              onClick={toggleFavorite}
              aria-pressed={isFavorite}
            >
              {isFavorite ? '❤️ Yêu thích' : '🤍 Yêu thích'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
