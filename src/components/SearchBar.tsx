'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface SearchBarProps {
  onSearch: (keyword: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [keyword, setKeyword] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setKeyword(value)
    onSearch(value)
  }

  return (
    <div className="flex items-center gap-2 w-full max-w-lg mx-auto mb-8">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Tìm kiếm sản phẩm Hot Wheels..."
          value={keyword}
          onChange={handleChange}
          className="pl-10 py-2 text-sm border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
        />
      </div>
    </div>
  )
}
