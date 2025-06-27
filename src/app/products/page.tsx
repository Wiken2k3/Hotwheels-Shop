"use client"

import { useEffect, useState } from 'react'
import { products } from '@/data/products'
import { Product } from '@/types/product'
import ProductCard from '@/components/ProductCard'
import SearchBar from '@/components/SearchBar'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function Products() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setAllProducts(products)
    setDisplayedProducts(products)
    setLoading(false)
  }, [])

  const filteredBySearch = displayedProducts.filter((p) =>
    p.name.toLowerCase().includes(searchKeyword.toLowerCase())
  )

  const collections = Array.from(
    new Set(allProducts.map((p) => p.collection).filter(Boolean))
  )

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  }

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 animate-pulse">
        Đang tải sản phẩm...
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
      <SearchBar onSearch={setSearchKeyword} />

      {searchKeyword === '' && collections.map((collection) => {
        const filtered = allProducts.filter((p) => p.collection === collection)
        return (
          <div key={collection} className="mb-16">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-yellow-500">
              🚗 Bộ sưu tập: {collection}
            </h2>
            <Slider {...sliderSettings}>
              {filtered.map((product) => (
                <div key={product.id} className="px-2">
                  <ProductCard product={product} />
                </div>
              ))}
            </Slider>
          </div>
        )
      })}

      <h1 className="text-2xl sm:text-3xl font-bold text-center text-orange-500 mb-8">
        🏁 Tất cả sản phẩm Hot Wheels
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-16 auto-rows-[1fr]">
        {filteredBySearch.length > 0 ? (
          filteredBySearch.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Không tìm thấy sản phẩm phù hợp.
          </p>
        )}
      </div>
    </div>
  )
}
