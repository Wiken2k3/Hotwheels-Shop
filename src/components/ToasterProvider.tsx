'use client'

import { Toaster } from 'react-hot-toast'
import '@/styles/toast-animations.css' // Import custom styles if needed



export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        className: 'animate-slide-in animate-fade-out',
        style: {
          background: 'linear-gradient(135deg, #1f2937, #111827)',
          color: '#fff',
          border: '1px solid #facc15',
          padding: '12px 16px',
          fontWeight: 'bold',
          boxShadow: '0 6px 15px rgba(0,0,0,0.4)',
          borderRadius: '10px',
          transition: 'all 0.3s ease',
        },
        success: {
          icon: '✅',
          iconTheme: {
            primary: '#22c55e',
            secondary: '#f0fdf4',
          },
          style: {
            background: '#1e3a1e',
            borderColor: '#4ade80',
            color: '#ecfdf5',
          },
        },
        error: {
          icon: '❌',
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff1f2',
          },
          style: {
            background: '#4b1e1e',
            borderColor: '#f87171',
            color: '#fee2e2',
          },
        },
      }}
    />
  )
}
