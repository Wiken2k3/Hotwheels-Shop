'use client'

import { useOrder } from '@/store/orders-store'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function OrdersPage() {
  const { orders, clearOrders, removeOrder } = useOrder()
  const router = useRouter()

  const handleClearOrders = () => {
    if (confirm('Bạn chắc chắn muốn xóa toàn bộ đơn hàng?')) {
      clearOrders()
      toast.success('Đã xoá tất cả đơn hàng!')
    }
  }

  const handleRemoveOrder = (id: string) => {
    if (confirm(`Bạn có chắc muốn xoá đơn hàng #${id}?`)) {
      removeOrder(id)
      toast.success(`Đã xoá đơn hàng #${id}`)
    }
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-screen-md mx-auto py-32 text-center px-4">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">📭 Chưa có đơn hàng</h1>
        <p className="text-gray-400">Hãy mua hàng để trải nghiệm Hot Wheels tuyệt vời nhé!</p>
        <Button
          className="mt-6 bg-yellow-400 text-black hover:bg-yellow-500 font-semibold"
          onClick={() => router.push('/products')}
        >
          Mua sắm ngay
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-yellow-400">📦 Đơn hàng của bạn</h1>
        <Button variant="destructive" onClick={handleClearOrders}>
          Xóa tất cả
        </Button>
      </div>

      {/* Danh sách đơn hàng */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-6 rounded-lg bg-neutral-900 border border-gray-700 shadow-md group transition"
          >
            {/* Thông tin đơn */}
            <div
              onClick={() => router.push(`/orders/${order.id}`)}
              className="flex items-center gap-4 cursor-pointer hover:bg-neutral-800 p-2 rounded"
            >
              <Image
                src={order.items[0].image}
                alt={order.items[0].name}
                width={80}
                height={50}
                className="rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{order.items[0].name}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Số sản phẩm: {order.items.length} — Tổng:{' '}
                  <span className="text-yellow-400 font-bold">
                    {order.total.toLocaleString()}₫
                  </span>
                </p>
              </div>
              <span className="text-sm text-yellow-300 font-medium underline whitespace-nowrap">
                Xem chi tiết →
              </span>
            </div>

            {/* Footer */}
            <div className="flex justify-between text-sm text-gray-400 mt-3">
              <span>
                Mã đơn: <span className="text-white font-semibold">#{order.id}</span>
              </span>
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

            {/* Nút xoá đơn */}
            <div className="text-right mt-4">
              <Button
                size="sm"
                variant="outline"
                className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                onClick={() => handleRemoveOrder(order.id)}
              >
                Xoá đơn này
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
