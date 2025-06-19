'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'destructive' | 'outline'  // thêm outline
  size?: 'default' | 'icon' | 'sm' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'default', size = 'default', ...props },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

    const variants: Record<string, string> = {
      default: 'bg-red-500 text-white hover:bg-red-600',
      ghost: 'bg-transparent hover:bg-gray-100 text-gray-800',
      destructive: 'bg-red-600 text-white hover:bg-red-700',
      outline: 'border border-red-500 text-red-500 hover:bg-red-50',  // style cho outline
    }

    const sizes: Record<string, string> = {
      default: 'h-10 px-4 py-2',
      icon: 'h-10 w-10',
      sm: 'h-8 px-3 text-sm',
      lg: 'h-12 px-6 text-lg',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
