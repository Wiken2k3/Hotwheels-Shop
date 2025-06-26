'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Heart, ShoppingCart } from 'lucide-react'
import { Product } from '@/types/product'
import { Button } from '@/components/ui/button'
import { useCart } from '@/store/cart-store'
import { getWishlist, toggleWishlist } from '@/lib/wishlist'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const [liked, setLiked] = useState(false)
  const { addToCart } = useCart()
  const isOnSale = typeof product.salePrice === 'number' && product.salePrice < product.price

  // Cập nhật liked khi component mount hoặc khi product.id thay đổi
  useEffect(() => {
    setLiked(getWishlist().includes(product.id))
  }, [product.id])

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    const updated = toggleWishlist(product.id)
    const isNowLiked = updated.includes(product.id)
    setLiked(isNowLiked)
    toast.success(
      isNowLiked
        ? `❤️ Đã thêm vào yêu thích: ${product.name}`
        : `💔 Đã xoá khỏi yêu thích: ${product.name}`
    )
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
    toast.success(`🛒 Đã thêm vào giỏ: ${product.name}`)
  }

  return (
    <div className="group relative rounded-3xl overflow-hidden bg-white border border-yellow-100 shadow-md hover:shadow-yellow-300 transition-all duration-300">
      {/* Image section */}
      <Link href={`/products/${product.id}`} className="block relative h-56 sm:h-64 overflow-hidden">
        <Image
          src={product.image.trim()}
          alt={product.name}
          fill
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />

        {/* Sale badge */}
        {isOnSale && (
          <div className="absolute top-2 left-2 z-20 bg-red-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg animate-pulse">
            🔥 Giảm giá
          </div>
        )}

        {/* Like button */}
        <button
          onClick={handleToggleLike}
          className={`absolute top-2 right-2 z-20 p-2 rounded-full backdrop-blur-sm bg-white/80 hover:bg-white transition-all shadow-md ${
            liked ? 'text-red-500 scale-110' : 'text-gray-400 hover:scale-105'
          }`}
          aria-label={liked ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích'}
        >
          <Heart className="w-5 h-5 fill-current" fill={liked ? 'currentColor' : 'none'} />
        </button>
      </Link>

      {/* Content section */}
      <div className="p-4 sm:p-5 space-y-3">
        {/* Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-yellow-600 transition line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2">
          {isOnSale ? (
            <>
              <span className="text-red-600 font-bold text-sm sm:text-base">
                {product.salePrice?.toLocaleString('vi-VN')}₫
              </span>
              <span className="line-through text-gray-400 text-sm">
                {product.price.toLocaleString('vi-VN')}₫
              </span>
            </>
          ) : (
            <span className="text-gray-800 font-bold text-sm sm:text-base">
              {product.price.toLocaleString('vi-VN')}₫
            </span>
          )}
        </div>

        {/* Action button */}
        <Button
          onClick={handleAddToCart}
          size="sm"
          className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-black font-medium hover:bg-yellow-600 transition hover:scale-105 shadow-md rounded-xl"
          aria-label={`Thêm ${product.name} vào giỏ hàng`}
        >
          <ShoppingCart className="w-4 h-4" />
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  )
}
