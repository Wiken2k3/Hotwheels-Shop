'use client'

import { useState, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'

const allCollections = ['Case A 2025', 'Case B 2025', 'Case C 2025', 'Case D 2025']

export default function Filters({
  onFilterChange,
}: {
  onFilterChange: (filters: {
    priceRange: number[]
    selectedCollections: string[]
  }) => void
}) {
  const [priceRange, setPriceRange] = useState([0, 200000])
  const [selectedCollections, setSelectedCollections] = useState<string[]>([])

  // useEffect(() => {
  //   onFilterChange({ priceRange, selectedCollections })
  // }, [priceRange, selectedCollections])

  const handleCollectionChange = (value: string) => {
    if (selectedCollections.includes(value)) {
      setSelectedCollections(selectedCollections.filter((item) => item !== value))
    } else {
      setSelectedCollections([...selectedCollections, value])
    }
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow border mb-8">
      <h3 className="text-lg font-bold mb-4">Bộ lọc</h3>

      {/* Khoảng giá */}
      <div className="mb-6">
        <p className="mb-2 font-medium">
          Khoảng giá: {priceRange[0].toLocaleString()}₫ – {priceRange[1].toLocaleString()}₫
        </p>
        <Slider
          min={0}
          max={200000}
          step={10000}
          defaultValue={priceRange}
          onValueChange={(val: number[]) => setPriceRange(val)}
        />
      </div>

      {/* Bộ sưu tập */}
      {/* <div>
        <p className="mb-2 font-medium">Bộ sưu tập</p>
        <div className="space-y-2">
          {allCollections.map((collection) => (
            <label key={collection} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={selectedCollections.includes(collection)}
                onCheckedChange={() => handleCollectionChange(collection)}
              />
              {collection}
            </label>
          ))}
        </div>
      </div> */}
    </div>
  )
}