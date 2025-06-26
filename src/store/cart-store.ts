// src/store/cart-store.ts
import { create } from 'zustand'
import { Product } from '@/types/product'

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  totalPrice: () => number
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
}

export const useCart = create<CartState>((set, get) => ({
  items: [],
  addToCart: (product) => {
    const existing = get().items.find((item) => item.id === product.id)

    if (existing) {
      if (existing.quantity < 10) {
        set({
          items: get().items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })
      }
    } else {
      set({
        items: [...get().items, { ...product, quantity: 1 }],
      })
    }
  },
  removeFromCart: (id) =>
    set({
      items: get().items.filter((item) => item.id !== id),
    }),
  clearCart: () => set({ items: [] }),
  totalPrice: () =>
    get().items.reduce((acc, item) => {
      const price = item.salePrice ?? item.price
      return acc + price * item.quantity
    }, 0),
  increaseQuantity: (id) => {
    set({
      items: get().items.map((item) =>
        item.id === id && item.quantity < 10
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })
  },
  decreaseQuantity: (id) => {
    const item = get().items.find((i) => i.id === id)
    if (!item) return
    if (item.quantity <= 1) {
      set({
        items: get().items.filter((i) => i.id !== id),
      })
    } else {
      set({
        items: get().items.map((i) =>
          i.id === id ? { ...i, quantity: item.quantity - 1 } : i
        ),
      })
    }
  },
}))