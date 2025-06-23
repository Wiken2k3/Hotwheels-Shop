'use client'

import { useEffect } from 'react'
import { useAuth } from '@/store/auth-store'
import { useCart } from '@/store/cart-store'
import { useOrder } from '@/store/orders-store'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const cart = useCart()
  const { orders, placeOrder } = useOrder()
  const router = useRouter()

  // Redirect nếu chưa đăng nhập, dùng useEffect tránh lỗi
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  // Nếu chưa có user thì không render nội dung (đợi redirect)
  if (!user) return null

  // Hàm xử lý đặt hàng
  const handlePlaceOrder = () => {
    if (cart.items.length === 0) {
      alert('Giỏ hàng đang trống')
      return
    }

    placeOrder(cart.items, cart.totalPrice())
    cart.clearCart()
    router.push('/orders') // Chuyển sang trang lịch sử đơn hàng hoặc trang phù hợp
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-10">
      {/* Thông tin người dùng */}
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">👋 Xin chào, {user.name}!</h1>
        <p className="text-gray-500">Email: {user.email}</p>
        <Button
          className="mt-4"
          onClick={() => {
            logout()
            router.push('/')
          }}
        >
          Đăng xuất
        </Button>
      </div>

      {/* Giỏ hàng */}
      <div className="bg-neutral-900 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-yellow-400 mb-4">🛒 Giỏ hàng của bạn</h2>
        {cart.items.length === 0 ? (
          <p className="text-gray-400">Chưa có sản phẩm nào trong giỏ hàng.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-700 pb-2"
                >
                  <Link
                    href={`/products/${item.id}`}
                    className="flex items-center gap-4 flex-1 hover:underline"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={40}
                      className="rounded object-cover"
                    />
                    <div>
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-sm text-gray-400">
                        {(item.salePrice ?? item.price).toLocaleString()}₫
                      </p>
                    </div>
                  </Link>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => cart.decreaseQuantity(item.id)}
                    >
                      -
                    </Button>
                    <span className="text-white min-w-[24px] text-center">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => cart.increaseQuantity(item.id)}
                    >
                      +
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => cart.removeFromCart(item.id)}
                      className="text-red-400"
                    >
                      X
                    </Button>
                  </div>
                </li>
              ))}
              <li className="text-right font-bold mt-4 text-yellow-400">
                Tổng cộng: {cart.totalPrice().toLocaleString()}₫
              </li>
            </ul>

            {/* Nút đặt hàng */}
            <div className="mt-4 text-right">
              <Button
                onClick={handlePlaceOrder}
                className="bg-yellow-400 text-black hover:bg-yellow-500"
              >
                Đặt hàng
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Đơn hàng */}
      <div className="bg-neutral-900 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-yellow-400 mb-4">📦 Lịch sử đơn hàng</h2>
        {orders.length === 0 ? (
          <p className="text-gray-400 italic">Bạn chưa có đơn hàng nào.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order.id}
                className="flex items-center gap-4 border-b border-gray-700 pb-4 cursor-pointer hover:bg-neutral-800 rounded"
                onClick={() => router.push(`/orders/${order.id}`)} // chuyển sang trang chi tiết đơn hàng
              >
                {order.items[0] && (
                  <Image
                    src={order.items[0].image}
                    alt={order.items[0].name}
                    width={64}
                    height={40}
                    className="rounded object-cover"
                  />
                )}
                <div className="flex-1">
                  <p className="text-yellow-400 font-semibold">Mã đơn: #{order.id}</p>
                  <p className="text-gray-400 text-sm">
                    Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="font-bold text-yellow-400">{order.total.toLocaleString()}₫</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
