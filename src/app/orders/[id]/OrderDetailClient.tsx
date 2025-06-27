'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/auth-store'
import { useOrder, Order } from '@/store/orders-store'
import Image from 'next/image'

interface Props {
  orderId: string
}

export default function OrderDetailClient({ orderId }: Props) {
  const { user } = useAuth()
  const router = useRouter()
  const { orders } = useOrder()

  const order: Order | undefined = orders.find((o) => o.id === orderId)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else if (orderId && !order) {
      router.push('/orders')
    }
  }, [user, order, orderId, router])

  if (!user) return null
  if (!order) {
    return (
      <p className="text-center text-gray-400 mt-12">
        Đang tải hoặc không tìm thấy đơn hàng...
      </p>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">🧾 Chi tiết đơn hàng</h1>
        <p className="text-gray-300">
          Mã đơn: <span className="text-white font-semibold">#{order.id}</span>
        </p>
        <p className="text-gray-400 text-sm">
          Ngày đặt:{' '}
          {new Date(order.createdAt).toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="bg-neutral-900 p-6 rounded-xl shadow divide-y divide-gray-700">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4">
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={50}
              className="rounded object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-white">{item.name}</p>
              <p className="text-sm text-gray-400">
                Giá: {(item.salePrice ?? item.price).toLocaleString()}₫ x {item.quantity}
              </p>
            </div>
            <p className="font-bold text-yellow-400 whitespace-nowrap">
              {(item.quantity * (item.salePrice ?? item.price)).toLocaleString()}₫
            </p>
          </div>
        ))}
      </div>

      {/* Tổng cộng */}
      <div className="text-right font-bold text-yellow-400 text-xl">
        Tổng cộng: {order.total.toLocaleString()}₫
      </div>

      {/* Nút quay lại */}
      <div className="text-center">
        <button
          className="mt-4 px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 font-semibold shadow"
          onClick={() => router.push('/profile')}
        >
          ← Quay lại trang cá nhân
        </button>
      </div>
    </div>
  )
}
