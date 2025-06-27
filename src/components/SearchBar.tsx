'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

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

  const clearInput = () => {
    setKeyword('')
    onSearch('')
  }

  return (
    <div className="relative w-full max-w-xl mx-auto mb-8 px-4 sm:px-0">
      <div className="relative">
        {/* Search icon */}
        <Search
          className={cn(
            'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-all',
            keyword && 'text-yellow-500'
          )}
          aria-hidden
        />

        {/* Input */}
        <Input
          type="text"
          placeholder="Tìm kiếm xe Hot Wheels, chủ đề, bộ sưu tập..."
          value={keyword}
          onChange={handleChange}
          className={cn(
            'w-full pl-10 pr-10 py-2.5 sm:py-3 text-sm sm:text-base rounded-full bg-white text-gray-800 placeholder:text-gray-400',
            'border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400',
            'transition duration-200'
          )}
        />

        {/* Clear button */}
        {keyword && (
          <button
            onClick={clearInput}
            aria-label="Xoá từ khoá"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>
    </div>
  )
}
