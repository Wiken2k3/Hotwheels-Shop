'use client'

import { useCart } from '@/store/cart-store'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Trash2, Plus, Minus } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function CartPage() {
  const router = useRouter()
  const {
    items,
    removeFromCart,
    totalPrice,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart()

  const handleIncrease = (id: string, qty: number) => {
    if (qty >= 10) {
      toast.error('Bạn đã đạt số lượng tối đa (10)')
      return
    }
    increaseQuantity(id)
  }

  const handleDecrease = (id: string, qty: number) => {
    if (qty <= 1) {
      toast.error('Số lượng tối thiểu là 1')
      return
    }
    decreaseQuantity(id)
  }

  const handleCheckout = () => {
    if (!items.length) {
      toast.error('Giỏ hàng của bạn đang trống!')
      return
    }
    router.push('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="max-w-screen-md mx-auto py-32 text-center px-4 md:px-8">
        <h1 className="text-3xl font-extrabold mb-4 text-yellow-400 drop-shadow-lg">
          Giỏ hàng trống!
        </h1>
        <p className="text-gray-300 text-lg">Thêm vài mẫu Hot Wheels để bắt đầu sưu tập nhé!</p>
        <Button
          className="mt-6 bg-yellow-400 text-black hover:bg-yellow-500 font-bold"
          onClick={() => router.push('/products')}
        >
          Mua sắm ngay
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 py-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">
        Giỏ hàng của bạn
      </h1>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center gap-4 p-6 rounded-xl border border-gray-700 bg-neutral-900 hover:bg-neutral-800 transition"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={140}
              height={90}
              className="rounded-lg object-cover shadow-sm"
              priority
            />

            <div className="flex-1 w-full">
              <div className="flex justify-between flex-wrap items-center gap-3">
                <Link
                  href={`/products/${item.id}`}
                  className="font-semibold text-lg sm:text-xl text-white hover:text-yellow-400 transition truncate"
                >
                  {item.name}
                </Link>
                <p className="text-yellow-400 font-bold text-lg whitespace-nowrap">
                  {(item.salePrice ?? item.price).toLocaleString()}₫
                </p>
              </div>

              {/* Quantity controls */}
              <div className="mt-3 flex items-center gap-2 text-gray-300">
                <span className="text-sm font-medium">Số lượng:</span>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleDecrease(item.id, item.quantity)}
                    className="p-1"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-white font-semibold w-6 text-center">{item.quantity}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleIncrease(item.id, item.quantity)}
                    className="p-1"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Remove button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromCart(item.id)}
                className="mt-4 flex items-center gap-2 text-sm text-red-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                Xóa
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Total + Actions */}
      <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-xl sm:text-2xl font-extrabold text-yellow-400">
          Tổng tiền: <span className="text-white">{totalPrice().toLocaleString()}₫</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            onClick={handleCheckout}
            className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold shadow transition"
          >
            Thanh toán
          </Button>
          <Button
            size="lg"
            variant="destructive"
            onClick={clearCart}
            className="font-bold shadow hover:bg-red-700 transition"
          >
            Xóa tất cả
          </Button>
        </div>
      </div>
    </div>
  )
}
