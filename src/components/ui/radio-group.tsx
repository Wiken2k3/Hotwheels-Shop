import {
  Root as RadioGroup,
  Item as RadioGroupItemPrimitive,
  Indicator,
} from '@radix-ui/react-radio-group'

import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import * as React from 'react'

// Tạo style variant cho RadioGroupItem
const radioGroupItemVariants = cva(
  'aspect-square h-4 w-4 rounded-full border border-gray-300 text-yellow-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

// Custom RadioGroupItem kết hợp class + Indicator
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupItemPrimitive>,
  React.ComponentPropsWithoutRef<typeof RadioGroupItemPrimitive>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupItemPrimitive
      ref={ref}
      className={cn(radioGroupItemVariants(), className)}
      {...props}
    >
      <Indicator className="flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-yellow-500" />
      </Indicator>
    </RadioGroupItemPrimitive>
  )
})
RadioGroupItem.displayName = 'RadioGroupItem'

export { RadioGroup, RadioGroupItem }
