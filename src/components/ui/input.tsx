'use client'

import * as React from 'react'

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`border border-gray-300 rounded-xl px-4 py-2 w-full text-sm shadow-sm
        placeholder:text-gray-400
        focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
        transition duration-150 ease-in-out bg-white text-gray-900 ${className}`}
      {...props}
    />
  )
})
Input.displayName = 'Input'
