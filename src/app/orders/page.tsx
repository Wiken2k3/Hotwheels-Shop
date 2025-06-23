// 📁 src/app/orders/page.tsx
'use client'

import { useOrder } from '@/store/orders-store'
import { Button } from '@/components/ui/button'

export default function OrdersPage() {
  const { orders, clearOrders } = useOrder()

  if (orders.length === 0) {
    return (
      <div className="max-w-screen-md mx-auto py-32 text-center px-4">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">Chưa có đơn hàng</h1>
        <p className="text-gray-400">Hãy đặt hàng và trải nghiệm Hot Wheels tuyệt vời nhé!</p>
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-yellow-400">Đơn hàng của bạn</h1>
        <Button variant="destructive" onClick={clearOrders}>Xóa tất cả</Button>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-600 p-6 rounded-lg bg-neutral-900">
            <div className="flex justify-between text-sm text-gray-400 mb-3">
              <span>Mã đơn: #{order.id}</span>
              <span>Ngày đặt: {new Date(order.createdAt).toLocaleString()}</span>
            </div>

            <ul className="space-y-2">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between text-white">
                  <span>{item.name} x {item.quantity}</span>
                  <span>{((item.salePrice ?? item.price) * item.quantity).toLocaleString()}₫</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 text-right text-yellow-400 font-bold">
              Tổng cộng: {order.total.toLocaleString()}₫
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
