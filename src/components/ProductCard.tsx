import Image from 'next/image'
import { Product } from '@/types/product'
import Link from 'next/link'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden bg-white">
      <Link href={`/products/${product.id}`}>
        <Image
          src={product.image.trim()} // ✨ thêm .trim() để tránh lỗi
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-56 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
          <div className="flex items-center gap-2">
            {product.salePrice ? (
              <>
                <span className="text-red-500 font-bold">{product.salePrice.toLocaleString()}₫</span>
                <span className="line-through text-sm text-gray-400">{product.price.toLocaleString()}₫</span>
              </>
            ) : (
              <span className="font-bold text-gray-800">{product.price.toLocaleString()}₫</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
