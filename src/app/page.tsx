// src/app/page.tsx
import Hero from '@/components/Hero'
import FeaturedProductList from '@/components/FeaturedProductList'
import ProductList from '@/components/ProductList'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      {/* Featured Product Section */}
      <FeaturedProductList />

      {/* Regular Product Section */}
      <ProductList />
    </>
  )
}
