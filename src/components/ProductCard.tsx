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
    <div className="group relative rounded-xl overflow-hidden bg-white border border-yellow-100 shadow-sm hover:shadow-yellow-300 transition-all duration-300">
      {/* Image Section */}
      <Link
        href={`/products/${product.id}`}
        className="block relative aspect-[4/3] overflow-hidden"
      >
        <Image
          src={product.image.trim()}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />

        {/* Sale badge */}
        {isOnSale && (
          <div className="absolute top-2 left-2 z-20 bg-red-600 text-white text-[10px] sm:text-xs font-bold py-1 px-2 rounded-full shadow-md animate-pulse">
            🔥 Giảm giá
          </div>
        )}

        {/* Like button */}
        <button
          type="button"
          onClick={handleToggleLike}
          aria-label={liked ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích'}
          className={`absolute top-2 right-2 z-20 p-1.5 sm:p-2 rounded-full backdrop-blur-sm bg-white/80 hover:bg-white transition-all shadow-md ${
            liked ? 'text-red-500 scale-110' : 'text-gray-400 hover:scale-105'
          }`}
        >
          <Heart
            className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
            fill={liked ? 'currentColor' : 'none'}
          />
        </button>
      </Link>

      {/* Info Section */}
      <div className="p-3 sm:p-4 space-y-2">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-yellow-600 transition line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Pricing */}
        <div className="flex items-center gap-2 text-sm">
          {isOnSale ? (
            <>
              <span className="text-red-600 font-bold">
                {product.salePrice?.toLocaleString('vi-VN')}₫
              </span>
              <span className="line-through text-gray-400">
                {product.price.toLocaleString('vi-VN')}₫
              </span>
            </>
          ) : (
            <span className="text-gray-800 font-bold">
              {product.price.toLocaleString('vi-VN')}₫
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          onClick={handleAddToCart}
          type="button"
          size="sm"
          className="w-full flex items-center justify-center gap-1.5 sm:gap-2 bg-yellow-500 text-black font-medium hover:bg-yellow-600 transition hover:scale-105 shadow rounded-lg text-sm sm:text-base py-2 sm:py-2.5"
          aria-label={`Thêm ${product.name} vào giỏ hàng`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">Thêm vào giỏ</span>
          <span className="sm:hidden">Thêm</span>
        </Button>
      </div>
    </div>
  )
}
