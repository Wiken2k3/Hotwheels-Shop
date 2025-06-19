'use client'

import { useCart } from '@/store/cart-store'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Trash2, Plus, Minus } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function CartPage() {
  const { items, removeFromCart, totalPrice, clearCart, increaseQuantity, decreaseQuantity } = useCart()

  const handleIncrease = (id: string, currentQty: number) => {
    if (currentQty >= 10) {
      toast.error('Bạn đã đạt số lượng tối đa cho sản phẩm này')
      return
    }
    increaseQuantity(id)
  }

  if (items.length === 0) {
    return (
      <div className="max-w-screen-md mx-auto py-32 text-center px-4 md:px-8 lg:px-16">
        <h1 className="text-3xl font-extrabold mb-4 text-yellow-400 drop-shadow-lg">
          Giỏ hàng của bạn đang trống!
        </h1>
        <p className="text-gray-300 text-lg">
          Hãy thêm những mẫu xe Hot Wheels yêu thích để bắt đầu cuộc vui nhé!
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 py-12">
      <h1 className="text-4xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">
        Giỏ hàng của bạn
      </h1>
      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center md:items-start gap-4 p-6 rounded-xl border border-gray-600 bg-neutral-900
              hover:bg-neutral-800 transition-colors shadow-md"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={140}
              height={90}
              className="rounded-lg object-cover shadow-sm"
              priority
            />
            <div className="flex-1 min-w-0">
              {/* Link về trang chi tiết sản phẩm */}
              <Link
                href={`/products/${item.id}`}
                className="font-semibold text-xl text-white truncate hover:text-yellow-400 transition-colors"
                aria-label={`Xem chi tiết sản phẩm ${item.name}`}
              >
                {item.name}
              </Link>
              <p className="text-gray-400 font-medium mt-2">
                Số lượng:
                <span className="inline-flex items-center ml-3 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => decreaseQuantity(item.id)}
                    aria-label={`Giảm số lượng ${item.name}`}
                    className="p-1"
                  >
                    <Minus className="w-4 h-4 text-gray-300" />
                  </Button>
                  <span className="text-white font-semibold min-w-[24px] text-center">{item.quantity}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleIncrease(item.id, item.quantity)}
                    aria-label={`Tăng số lượng ${item.name}`}
                    className="p-1"
                  >
                    <Plus className="w-4 h-4 text-gray-300" />
                  </Button>
                </span>
              </p>
              <p className="text-yellow-400 font-bold text-lg mt-3">
                {(item.salePrice ?? item.price).toLocaleString()}₫
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              className="flex items-center gap-2 text-sm font-semibold
                hover:bg-red-600 focus:bg-red-600"
              onClick={() => removeFromCart(item.id)}
              aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
            >
              <Trash2 className="w-4 h-4" />
              Xóa
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6 gap-4">
        <p className="text-2xl font-extrabold text-yellow-400 drop-shadow-lg">
          Tổng tiền: <span className="text-white">{totalPrice().toLocaleString()}₫</span>
        </p>
        <Button
          variant="destructive"
          size="lg"
          onClick={clearCart}
          className="uppercase tracking-wide shadow-md hover:bg-red-600 focus:bg-red-600"
          aria-label="Xóa tất cả sản phẩm trong giỏ hàng"
        >
          Xóa tất cả
        </Button>
      </div>
    </div>
  )
}
