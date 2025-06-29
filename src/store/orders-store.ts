// src/store/order-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types/product'

export interface OrderItem extends Product {
  quantity: number
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  createdAt: Date
}

interface OrderState {
  orders: Order[]
  placeOrder: (items: OrderItem[], total: number) => void
  clearOrders: () => void
  removeOrder: (id: string) => void
}

export const useOrder = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      placeOrder: (items, total) => {
        const newOrder: Order = {
          id: Date.now().toString(),
          items,
          total,
          createdAt: new Date(),
        }
        set((state) => ({
          orders: [newOrder, ...state.orders],
        }))
      },
      clearOrders: () => set({ orders: [] }),
      removeOrder: (id) =>
        set((state) => ({
          orders: state.orders.filter((o) => o.id !== id),
        })),
    }),
    {
      name: 'orders-storage',
      partialize: (state) => ({ orders: state.orders }),
    }
  )
)
