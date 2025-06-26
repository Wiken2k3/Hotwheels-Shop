'use client'

import * as React from 'react'
import { products } from '@/data/products'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'
import { useCart } from '@/store/cart-store'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const product = products.find((p) => p.id === id)

  const [isFavorite, setIsFavorite] = React.useState(false)

  React.useEffect(() => {
    if (!product) return
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]') as string[]
    setIsFavorite(favs.includes(product.id))
  }, [product])

  if (!product) return notFound()

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]') as string[]
    let newFavs: string[]
    if (isFavorite) {
      newFavs = favs.filter((favId) => favId !== product.id)
      toast('Đã bỏ yêu thích')
    } else {
      newFavs = [...favs, product.id]
      toast.success('Đã thêm vào yêu thích!')
    }
    localStorage.setItem('favorites', JSON.stringify(newFavs))
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-16">
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row gap-10">
        
        {/* Ảnh sản phẩm */}
        <div className="w-full md:w-1/2 rounded-xl overflow-hidden border border-yellow-400/40 shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Thông tin chi tiết */}
        <div className="w-full md:w-1/2 flex flex-col justify-between text-gray-900">
          {/* Tên sản phẩm - MÀU ĐỒNG BỘ */}
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-800 tracking-wide">
            {product.name}
          </h1>

          {/* Giá sản phẩm */}
          <div className="mb-4">
            {product.salePrice ? (
              <div className="flex items-end gap-4">
                {/* Giá sale - MÀU ĐỎ */}
                <span className="text-2xl sm:text-3xl font-bold text-red-600">
                  {product.salePrice.toLocaleString()}₫
                </span>
                {/* Giá gốc - MÀU XÁM + GẠCH NGANG */}
                <span className="line-through text-gray-400 text-base sm:text-lg italic">
                  {product.price.toLocaleString()}₫
                </span>
              </div>
            ) : (
              // Giá thường - MÀU XANH
              <span className="text-2xl sm:text-3xl font-semibold text-green-700">
                {product.price.toLocaleString()}₫
              </span>
            )}
          </div>

          {/* Mô tả */}
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
            {product.description}
          </p>

          {/* Nút hành động */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
            <Button
              size="lg"
              className="bg-yellow-500 text-black font-bold px-4 py-3 rounded-xl shadow-xl hover:bg-yellow-600 hover:shadow-yellow-700 transition-transform hover:scale-105 w-full sm:w-auto whitespace-nowrap min-w-0 overflow-hidden text-ellipsis"
              onClick={() => {
                useCart.getState().addToCart(product)
                toast.success('Đã thêm vào giỏ hàng! 🚗')
              }}
              aria-label={`Thêm ${product.name} vào giỏ hàng`}
            >
              <span className="hidden sm:inline">Thêm giỏ hàng</span>
              <span className="inline sm:hidden">Mua</span>
            </Button>

            <Button
              size="lg"
              variant={isFavorite ? 'destructive' : 'outline'}
              className="flex items-center justify-center px-4 py-3 rounded-xl transition-transform hover:scale-105 w-full sm:w-auto whitespace-nowrap min-w-0 overflow-hidden text-ellipsis text-sm sm:text-base font-semibold gap-2"
              onClick={toggleFavorite}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? 'Bỏ yêu thích sản phẩm' : 'Thêm sản phẩm vào yêu thích'}
            >
              {isFavorite ? (
                <>
                  <span>❤️</span>
                  <span className="hidden sm:inline">Yêu thích</span>
                </>
              ) : (
                <>
                  <span>🤍</span>
                  <span className="hidden sm:inline">Yêu thích</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
