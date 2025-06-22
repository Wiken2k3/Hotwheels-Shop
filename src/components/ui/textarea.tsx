import * as React from 'react'

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`border border-gray-300 rounded-md px-4 py-2 w-full resize-y min-h-[100px] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition ${className}`}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'
