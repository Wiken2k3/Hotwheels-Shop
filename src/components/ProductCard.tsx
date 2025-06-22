'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Heart } from 'lucide-react'
import { Product } from '@/types/product'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const isOnSale = typeof product.salePrice === 'number' && product.salePrice < product.price
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem('wishlist') || '[]')
    setLiked(storedLikes.includes(product.id))
  }, [product.id])

  const toggleLike = () => {
    const storedLikes: string[] = JSON.parse(localStorage.getItem('wishlist') || '[]')
    let updatedLikes: string[]

    if (storedLikes.includes(product.id)) {
      updatedLikes = storedLikes.filter(id => id !== product.id)
      toast.error(`💔 Đã xoá khỏi yêu thích: ${product.name}`)
    } else {
      updatedLikes = [...storedLikes, product.id]
      toast.success(`❤️ Đã thêm vào yêu thích: ${product.name}`)
    }

    localStorage.setItem('wishlist', JSON.stringify(updatedLikes))
    setLiked(!liked)
  }

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-400/50 border border-yellow-100 transition-all duration-300 hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="block">
        {/* Ảnh sản phẩm */}
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={product.image.trim()}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Lớp phủ gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />

          {/* Badge giảm giá */}
          {isOnSale && (
            <div className="absolute top-2 left-2 z-20 bg-gradient-to-r from-red-600 to-yellow-400 text-white text-xs font-bold py-1 px-2 rounded-full shadow-md">
              🔥 Giảm giá
            </div>
          )}

          {/* Nút yêu thích */}
          <div className="absolute top-2 right-2 z-20">
            <button
              onClick={(e) => {
                e.preventDefault()
                toggleLike()
              }}
              className={`p-1 rounded-full shadow-md transition-all bg-white/80 hover:bg-white ${
                liked ? 'text-red-500 scale-110' : 'text-gray-400 hover:scale-105'
              }`}
              aria-label={liked ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích'}
            >
              <Heart className="w-4 h-4 fill-current" fill={liked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Nội dung */}
        <div className="p-4 relative z-20">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-yellow-500 transition line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mt-1">
            {isOnSale ? (
              <>
                <span className="text-red-600 font-bold text-sm">
                  {product.salePrice?.toLocaleString('vi-VN')}₫
                </span>
                <span className="line-through text-gray-400 text-sm">
                  {product.price.toLocaleString('vi-VN')}₫
                </span>
              </>
            ) : (
              <span className="text-gray-800 font-bold text-sm">
                {product.price.toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
