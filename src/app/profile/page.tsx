'use client'

import { useEffect } from 'react'
import { useAuth } from '@/store/auth-store'
import { useCart } from '@/store/cart-store'
import { useOrder } from '@/store/orders-store'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const cart = useCart()
  const { orders, placeOrder } = useOrder()
  const router = useRouter()

  // Redirect nếu chưa đăng nhập
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) return null

  // Xử lý đặt hàng (nếu vẫn giữ flow đặt hàng từ profile)
  const handlePlaceOrder = () => {
    if (cart.items.length === 0) {
      toast.error('Giỏ hàng đang trống!')
      return
    }
    placeOrder(cart.items, cart.totalPrice())
    cart.clearCart()
    toast.success('Đặt hàng thành công!')
    router.push('/orders')
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12">
      {/* ✅ Thông tin người dùng */}
      <section className="text-center space-y-3">
        <h1 className="text-2xl font-bold">👋 Xin chào, {user.name}!</h1>
        <p className="text-gray-400">Email: {user.email}</p>
        <Button
          variant="destructive"
          onClick={() => {
            logout()
            router.push('/')
          }}
        >
          Đăng xuất
        </Button>
      </section>

      {/* ✅ Giỏ hàng */}
      <section className="bg-neutral-900 p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold text-yellow-400">🛒 Giỏ hàng của bạn</h2>
        {cart.items.length === 0 ? (
          <p className="text-gray-400 italic">Chưa có sản phẩm nào trong giỏ hàng.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 border-b border-gray-700 pb-4"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={40}
                    className="rounded object-cover"
                  />
                  <Link
                    href={`/products/${item.id}`}
                    className="flex-1 font-medium text-white hover:underline"
                  >
                    {item.name}
                    <span className="block text-sm text-gray-400">
                      {(item.salePrice ?? item.price).toLocaleString()}₫ x {item.quantity}
                    </span>
                  </Link>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => cart.decreaseQuantity(item.id)}>-</Button>
                    <span className="text-white min-w-[24px] text-center">{item.quantity}</span>
                    <Button size="sm" variant="outline" onClick={() => cart.increaseQuantity(item.id)}>+</Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-400"
                      onClick={() => cart.removeFromCart(item.id)}
                    >
                      X
                    </Button>
                  </div>
                </li>
              ))}
              <li className="text-right text-yellow-400 font-bold mt-4">
                Tổng cộng: {cart.totalPrice().toLocaleString()}₫
              </li>
            </ul>

            {/* ✅ Nút chuyển đến thanh toán */}
            <div className="text-right mt-4">
              <Button
                onClick={() => router.push('/checkout')}
                className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold"
              >
                Thanh toán ngay
              </Button>
            </div>
          </>
        )}
      </section>

      {/* ✅ Lịch sử đơn hàng */}
      <section className="bg-neutral-900 p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold text-yellow-400">📦 Lịch sử đơn hàng</h2>
        {orders.length === 0 ? (
          <p className="text-gray-400 italic">Bạn chưa có đơn hàng nào.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order.id}
                onClick={() => router.push(`/orders/${order.id}`)}
                className="flex items-center gap-4 border-b border-gray-700 pb-4 cursor-pointer hover:bg-neutral-800 p-2 rounded"
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
      </section>
    </div>
  )
}
