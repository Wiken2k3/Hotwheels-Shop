'use client'

import { useEffect, useState } from 'react'
import { products } from '@/data/products'
import { Product } from '@/types/product'
import ProductCard from '@/components/ProductCard'
import SearchBar from '@/components/SearchBar'
// import Filters from '@/components/Filters'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function Products() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Lấy danh sách ban đầu
  useEffect(() => {
    setAllProducts(products)
    setDisplayedProducts(products)
    setLoading(false)
  }, [])

  // Tìm kiếm theo keyword
  const filteredBySearch = displayedProducts.filter((p) =>
    p.name.toLowerCase().includes(searchKeyword.toLowerCase())
  )

  // Tạo danh sách bộ sưu tập duy nhất
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
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
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
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-16">
      {/* Thanh tìm kiếm */}
      <SearchBar onSearch={setSearchKeyword} />

      {/* Bộ lọc (tuỳ chọn kích hoạt)
      <Filters
        onFilterChange={(filters) => {
          const filtered = products.filter((p) => {
            const inRange =
              p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
            const inCollection =
              filters.selectedCollections.length === 0 ||
              filters.selectedCollections.includes(p.collection)
            return inRange && inCollection
          })
          setDisplayedProducts(filtered)
        }}
      /> */}

      {/* Hiển thị theo bộ sưu tập nếu không có search */}
      {searchKeyword === '' && collections.map((collection) => {
        const filtered = allProducts.filter((p) => p.collection === collection)
        return (
          <div key={collection} className="mb-16">
            <h2 className="text-2xl font-bold mb-4 text-yellow-500">
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

      {/* Tiêu đề chung */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-orange-500 mb-6">
        🏁 Tất cả sản phẩm Hot Wheels
      </h1>

      {/* Lưới sản phẩm tìm kiếm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
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
