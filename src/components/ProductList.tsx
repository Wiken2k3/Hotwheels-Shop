'use client'

import { useEffect, useState } from 'react'
import { getAllProducts } from '@/lib/product.service'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

interface Product {
  _id: string
  title: string
  image: string
  price: number
  salePrice?: number
  onSale: boolean
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts()
        setProducts(data)
      } catch (err) {
        toast.error('Không thể lấy danh sách sản phẩm!')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400 text-lg">
        Đang tải sản phẩm Hot Wheels...
      </div>
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
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={300}
              className="object-cover w-full h-48"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1 line-clamp-1">{product.title}</h3>
              {product.onSale ? (
                <div className="flex items-center gap-2">
                  <span className="text-red-600 font-bold text-sm">${product.salePrice}</span>
                  <span className="line-through text-gray-400 text-sm">${product.price}</span>
                </div>
              ) : (
                <span className="text-gray-800 font-bold text-sm">${product.price}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
