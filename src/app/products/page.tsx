'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getProductById } from '@/lib/product.service'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { useCart } from '@/store/cart-store'

export default function ProductDetailPage() {
  const params = useParams()
  const id = params?.id as string

  const [product, setProduct] = useState<any>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id)
        if (!data) return notFound()

        setProduct(data)
        const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
        setIsFavorite(favs.includes(data._id))
      } catch {
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])
  
  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
    let newFavs: string[]

    if (isFavorite) {
      newFavs = favs.filter((favId) => favId !== product._id)
      toast('Đã bỏ yêu thích')
    } else {
      newFavs = [...favs, product._id]
      toast.success('Đã thêm vào yêu thích!')
    }

    localStorage.setItem('favorites', JSON.stringify(newFavs))
    setIsFavorite(!isFavorite)
  }

  const handleAddToCart = () => {
    useCart.getState().addToCart(product)
    toast.success('Đã thêm vào giỏ hàng! 🚗')
  }

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Đang tải sản phẩm...</div>
  }

  if (!product) return null

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-16">
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row gap-10">
        {/* Hình ảnh */}
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

        {/* Chi tiết */}
        <div className="w-full md:w-1/2 flex flex-col justify-between text-gray-900">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-800 tracking-wide">
            {product.name}
          </h1>

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

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
            {product.description}
          </p>

          {/* Nút hành động */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
            <Button
              size="lg"
              className="bg-yellow-500 text-black font-bold px-4 py-3 rounded-xl shadow-xl hover:bg-yellow-600 hover:shadow-yellow-700 transition-transform hover:scale-105 w-full sm:w-auto"
              onClick={handleAddToCart}
              aria-label={`Thêm ${product.name} vào giỏ hàng`}
            >
              <span className="hidden sm:inline">Thêm giỏ hàng</span>
              <span className="inline sm:hidden">Mua</span>
            </Button>

            <Button
              size="lg"
              variant={isFavorite ? 'destructive' : 'outline'}
              className="flex items-center justify-center px-4 py-3 rounded-xl transition-transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base font-semibold gap-2"
              onClick={toggleFavorite}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? 'Bỏ yêu thích sản phẩm' : 'Thêm sản phẩm vào yêu thích'}
            >
              {isFavorite ? '❤️ Yêu thích' : '🤍 Yêu thích'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
