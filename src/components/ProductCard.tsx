import Image from 'next/image'
import { Product } from '@/types/product'
import Link from 'next/link'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const isOnSale = !!product.salePrice

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-orange-500 transition transform hover:-translate-y-1 duration-300 border-2 border-orange-300 relative">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative w-full h-56">
          <Image
            src={product.image.trim()}
            alt={product.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* 🔥 Badge nếu có sale */}
          {isOnSale && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full shadow-md">
              🔥 Giảm giá
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-extrabold text-lg text-gray-800 mb-2 tracking-tight">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            {product.salePrice ? (
              <>
                <span className="text-red-500 font-bold text-lg">{product.salePrice.toLocaleString()}₫</span>
                <span className="line-through text-sm text-gray-400">{product.price.toLocaleString()}₫</span>
              </>
            ) : (
              <span className="font-bold text-gray-700 text-lg">{product.price.toLocaleString()}₫</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
