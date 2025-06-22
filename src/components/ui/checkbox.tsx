'use client'

import * as React from 'react'

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = '', ...props }, ref) => {
  return (
    <input
      type="checkbox"
      ref={ref}
      className={`w-5 h-5 rounded border border-gray-300
        focus:ring-2 focus:ring-yellow-400 focus:ring-offset-0
        transition ${className}`}
      {...props}
    />
  )
})
Checkbox.displayName = 'Checkbox'
