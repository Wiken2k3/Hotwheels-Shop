'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

const collections = ['Tất cả', 'Cổ điển', 'JDM', 'Muscle', 'Xe tải', 'Đặc biệt']

export default function Filters() {
  const router = useRouter()
  const rawSearchParams = useSearchParams()
  const searchParams = rawSearchParams as unknown as URLSearchParams

  const currentParams = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString())
    return params
  }, [searchParams])

  const handleFilter = (collection: string) => {
    const params = new URLSearchParams(currentParams.toString())

    if (collection === 'Tất cả') {
      params.delete('collection')
    } else {
      params.set('collection', collection)
    }

    router.push(`/products?${params.toString()}`)
  }

  const activeCollection = searchParams.get('collection') || 'Tất cả'

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {collections.map((c) => (
        <button
          key={c}
          onClick={() => handleFilter(c)}
          className={`px-4 py-2 rounded-full text-sm border transition ${
            activeCollection === c
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  )
}
