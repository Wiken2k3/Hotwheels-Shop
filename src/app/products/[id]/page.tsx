import { products } from '@/data/products'
import { notFound } from 'next/navigation'
import ProductDetailClient from './ProductDetailClient'

type Params = {
  id: string
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const product = products.find((p) => p.id === params.id)

  if (!product) return notFound()

  return <ProductDetailClient product={product} />
}
