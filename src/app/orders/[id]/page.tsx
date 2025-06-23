'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/store/auth-store'
import { useOrder, Order } from '@/store/orders-store'
import Image from 'next/image'

export default function OrderDetailPage() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const { orders } = useOrder()

  // Lấy id đơn hàng từ params
  const orderId = params?.id

  // Tìm đơn hàng theo id
  const order: Order | undefined = orders.find((o) => o.id === orderId)

  // Redirect nếu chưa đăng nhập hoặc không tìm thấy đơn hàng
  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else if (orderId && !order) {
      router.push('/orders') // hoặc trang 404 tuỳ bạn
    }
  }, [user, order, orderId, router])

  if (!user) return null // tránh render khi redirect
  if (!order) return <p>Đang tải hoặc không tìm thấy đơn hàng...</p>

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Chi tiết đơn hàng #{order.id}</h1>
      <p className="mb-4 text-gray-400">Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}</p>

      <div className="bg-neutral-900 p-6 rounded-xl shadow space-y-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border-b border-gray-700 pb-4 last:border-b-0">
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={50}
              className="rounded object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold text-white">{item.name}</p>
              <p className="text-sm text-gray-400">
                Giá: {(item.salePrice ?? item.price).toLocaleString()}₫ x {item.quantity}
              </p>
            </div>
            <p className="font-bold text-yellow-400">
              {(item.quantity * (item.salePrice ?? item.price)).toLocaleString()}₫
            </p>
          </div>
        ))}

        <div className="text-right font-bold text-yellow-400 mt-6 text-xl">
          Tổng cộng: {order.total.toLocaleString()}₫
        </div>
      </div>

      <button
        className="mt-8 px-6 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
        onClick={() => router.push('/profile')}
      >
        Quay lại trang cá nhân
      </button>
    </div>
  )
}
