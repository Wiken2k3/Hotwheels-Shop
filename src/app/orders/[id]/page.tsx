// src/app/orders/[id]/page.tsx

import { type Metadata } from 'next'
import OrderDetailClient from './OrderDetailClient'

type PageProps = {
  params: { id: string }
}

// Optional: Nếu muốn SEO
export const generateMetadata = ({ params }: PageProps): Metadata => {
  return {
    title: `Chi tiết đơn hàng #${params.id}`,
    description: 'Xem chi tiết đơn hàng của bạn',
  }
}

export default function OrderPage({ params }: PageProps) {
  return <OrderDetailClient orderId={params.id} />
}
