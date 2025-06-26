'use client'

import { useOrder } from '@/store/orders-store'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function OrdersPage() {
  const { orders, clearOrders } = useOrder()
  const router = useRouter()

  if (orders.length === 0) {
    return (
      <div className="max-w-screen-md mx-auto py-32 text-center px-4">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">📭 Chưa có đơn hàng</h1>
        <p className="text-gray-400">Hãy mua hàng để trải nghiệm Hot Wheels tuyệt vời nhé!</p>
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-yellow-400">📦 Đơn hàng của bạn</h1>
        <Button
          variant="destructive"
          onClick={() => {
            if (confirm('Bạn chắc chắn muốn xóa toàn bộ đơn hàng?')) {
              clearOrders()
            }
          }}
        >
          Xóa tất cả
        </Button>
      </div>

      {/* Danh sách đơn hàng */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-6 rounded-lg bg-neutral-900 border border-gray-600 shadow hover:bg-neutral-800 cursor-pointer transition"
            onClick={() => router.push(`/orders/${order.id}`)}
          >
            <div className="flex justify-between text-sm text-gray-400 mb-3">
              <span>Mã đơn: <span className="text-white font-semibold">#{order.id}</span></span>
              <span>
                Ngày đặt:{' '}
                {new Date(order.createdAt).toLocaleString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>

            {/* Sản phẩm đầu tiên + số lượng */}
            {order.items.length > 0 && (
              <div className="flex items-center gap-4">
                <Image
                  src={order.items[0].image}
                  alt={order.items[0].name}
                  width={80}
                  height={50}
                  className="rounded object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-white">{order.items[0].name}</p>
                  <p className="text-sm text-gray-400">
                    Số sản phẩm: {order.items.length} - Tổng tiền:{' '}
                    <span className="text-yellow-400 font-bold">
                      {order.total.toLocaleString()}₫
                    </span>
                  </p>
                </div>
                <div className="text-sm text-yellow-300 font-medium underline">
                  Xem chi tiết →
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
