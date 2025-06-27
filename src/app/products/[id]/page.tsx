import { products } from '@/data/products'
import { notFound } from 'next/navigation'
import ProductDetailClient from './ProductDetailClient'

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const product = products.find((p) => p.id === params.id)

  if (!product) return notFound()

  return <ProductDetailClient product={product} />
}
