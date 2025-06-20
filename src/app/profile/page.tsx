'use client'

import { useAuth } from '@/store/auth-store'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <div className="max-w-md mx-auto py-12 text-center">
      <h1 className="text-2xl font-bold mb-2">Xin chào, {user.name}!</h1>
      <p className="text-gray-600 mb-6">Email: {user.email}</p>
      <Button onClick={() => { logout(); router.push('/') }}>Đăng xuất</Button>
    </div>
  )
}
