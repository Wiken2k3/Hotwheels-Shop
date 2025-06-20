'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')

  // ✅ 1. Đọc giá trị từ searchParams một cách an toàn
  useEffect(() => {
    const value = searchParams?.get?.('q') || ''
    setQuery(value)
  }, [searchParams])

  // ✅ 2. Tạo bản sao để chỉnh sửa
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // ⚠️ Bản đúng: ép kiểu thủ công
    const raw = new URLSearchParams(searchParams.toString())

    if (query.trim()) {
      raw.set('q', query.trim())
    } else {
      raw.delete('q')
    }

    router.push(`/products?${raw.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="mb-4 flex w-full max-w-md">
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-400"
      />
      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded-r-md hover:bg-red-600"
        aria-label="Tìm kiếm"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  )
}
