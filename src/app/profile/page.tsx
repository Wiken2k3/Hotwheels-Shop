'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/store/auth-store'
import { useCart } from '@/store/cart-store'
import { useOrder } from '@/store/orders-store'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'
import { getWishlist, setWishlist } from '@/lib/wishlist'
import { products } from '@/data/products'
import { Product } from '@/types/product'
import { motion, AnimatePresence } from 'framer-motion'

function Skeleton() {
  return (
    <div className="animate-pulse space-y-2">
      <div className="bg-gray-700 rounded w-full h-6" />
      <div className="bg-gray-700 rounded w-full h-6" />
      <div className="bg-gray-700 rounded w-full h-6" />
    </div>
  )
}

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const cart = useCart()
  const { orders, placeOrder } = useOrder()
  const router = useRouter()

  const [wishlistItems, setWishlistItems] = useState<Product[] | null>(null) // null = loading

  // Redirect nếu chưa đăng nhập
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  // Lấy sản phẩm yêu thích từ localStorage, giả lập load async
  useEffect(() => {
    setWishlistItems(null) // loading
    const timer = setTimeout(() => {
      const ids = getWishlist()
      const items = products.filter((p) => ids.includes(p.id))
      setWishlistItems(items)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  if (!user) return null

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

  const handleAddToCart = (product: Product) => {
    cart.addToCart(product)
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`)
  }

  const handleRemoveWishlist = (id: number) => {
    const newWishlist = wishlistItems?.filter((item) => item.id !== id) || []
    setWishlistItems(newWishlist)
    // Cập nhật localStorage
    const currentIds = getWishlist()
    const updatedIds = currentIds.filter((pid) => pid !== id)
    setWishlist(updatedIds)
    toast.success('Đã xóa sản phẩm khỏi danh sách yêu thích')
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12">
      {/* Thông tin người dùng */}
      <section className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-yellow-400 tracking-wide">
          👋 Xin chào, <span className="text-white">{user.name}</span>!
        </h1>
        <p className="text-gray-400 text-sm">{user.email}</p>
        <Button
          variant="destructive"
          onClick={() => {
            logout()
            router.push('/')
          }}
          className="mt-2"
        >
          Đăng xuất
        </Button>
      </section>

      {/* Giỏ hàng */}
      <section className="bg-neutral-900 p-6 rounded-xl shadow space-y-4">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-3">🛒 Giỏ hàng của bạn</h2>
        {cart.items.length === 0 ? (
          <p className="text-gray-400 italic">Chưa có sản phẩm nào trong giỏ hàng.</p>
        ) : (
          <motion.ul
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {cart.items.map((item) => (
              <motion.li
                layout
                key={item.id}
                className="flex items-center gap-4 border-b border-gray-700 pb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
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
              </motion.li>
            ))}
            <motion.li className="text-right text-yellow-400 font-bold mt-4" layout>
              Tổng cộng: {cart.totalPrice().toLocaleString()}₫
            </motion.li>
            <motion.div className="text-right mt-4" layout>
              <Button
                onClick={() => router.push('/checkout')}
                className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold"
              >
                Thanh toán ngay
              </Button>
            </motion.div>
          </motion.ul>
        )}
      </section>

      {/* Lịch sử đơn hàng */}
      <section className="bg-neutral-900 p-6 rounded-xl shadow space-y-4">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-3">📦 Lịch sử đơn hàng</h2>
        {orders.length === 0 ? (
          <p className="text-gray-400 italic">Bạn chưa có đơn hàng nào.</p>
        ) : (
          <motion.ul layout className="space-y-4">
            {orders.map((order) => (
              <motion.li
                key={order.id}
                onClick={() => router.push(`/orders/${order.id}`)}
                className="flex items-center gap-4 border-b border-gray-700 pb-4 cursor-pointer hover:bg-neutral-800 p-2 rounded"
                layout
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
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
              </motion.li>
            ))}
          </motion.ul>
        )}
      </section>

      {/* Danh sách yêu thích */}
      <section className="bg-neutral-900 p-6 rounded-xl shadow space-y-4">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-3">❤️ Sản phẩm yêu thích</h2>
        {wishlistItems === null ? (
          <Skeleton />
        ) : wishlistItems.length === 0 ? (
          <p className="text-gray-400 italic">Bạn chưa có sản phẩm yêu thích nào.</p>
        ) : (
          <motion.ul
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {wishlistItems.map((item) => (
                <motion.li
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.3 }}
                  className="bg-neutral-800 hover:bg-neutral-700 rounded-lg overflow-hidden p-4 flex flex-col"
                >
                  <Link href={`/products/${item.id}`} className="group">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={120}
                      className="rounded object-cover w-full h-32 mb-2 transition-transform group-hover:scale-105"
                    />
                    <h3 className="text-white font-semibold">{item.name}</h3>
                    <p className="text-yellow-400 font-bold mt-1">
                      {(item.salePrice ?? item.price).toLocaleString()}₫
                    </p>
                  </Link>
                  <div className="mt-auto flex justify-between items-center gap-2">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold flex-1"
                    >
                      + Thêm vào giỏ
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-red-400"
                      onClick={() => handleRemoveWishlist(item.id)}
                      aria-label={`Xóa ${item.name} khỏi yêu thích`}
                    >
                      ✕
                    </Button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </section>
    </div>
  )
}
