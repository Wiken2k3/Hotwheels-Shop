'use client'

import Image from 'next/image'
import { Product } from '@/types/product'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const isOnSale = typeof product.salePrice === 'number'
  const [liked, setLiked] = useState(false)

  // Lấy trạng thái yêu thích từ localStorage
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem('wishlist') || '[]')
    setLiked(storedLikes.includes(product.id))
  }, [product.id])

  // Xử lý toggle yêu thích + toast
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
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-md border border-orange-300 hover:shadow-orange-400 transition-all duration-300 hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative w-full h-56">
          <Image
            src={product.image.trim()}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />

          {/* Badge giảm giá */}
          {isOnSale && (
            <div className="absolute top-2 left-2 z-20 bg-gradient-to-r from-red-500 to-orange-400 text-white text-xs font-bold py-1 px-2 rounded-full shadow-md">
              🔥 Giảm giá
            </div>
          )}

          {/* Nút tim */}
          <div className="absolute top-2 right-2 z-20">
            <button
              onClick={(e) => {
                e.preventDefault() // tránh chuyển trang
                toggleLike()
              }}
              className={`p-1 rounded-full shadow transition-all bg-white/80 hover:bg-white ${
                liked ? 'text-red-500 scale-110' : 'text-gray-400 hover:scale-105'
              }`}
              aria-label={liked ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích'}
            >
              <Heart className="w-4 h-4 fill-current" fill={liked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        <div className="p-4 relative z-20">
          <h3 className="font-extrabold text-lg text-neutral-800 group-hover:text-orange-500 transition mb-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-2">
            {isOnSale ? (
              <>
                <span className="text-red-500 font-bold text-lg">
                  {product.salePrice?.toLocaleString('vi-VN')}₫
                </span>
                <span className="line-through text-sm text-gray-400">
                  {product.price.toLocaleString('vi-VN')}₫
                </span>
              </>
            ) : (
              <span className="text-gray-800 font-bold text-lg">
                {product.price.toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
