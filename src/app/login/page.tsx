'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/store/auth-store'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { login as loginApi } from '@/lib/auth.service'

const schema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự'),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const login = useAuth((state) => state.login)
  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    try {
      const res = await loginApi(data)
      localStorage.setItem('token', res.token)
      login({ name: res.user.name, email: res.user.email })
      toast.success('Đăng nhập thành công!')
      router.push('/profile')
    } catch (err) {
      toast.error('Sai email hoặc mật khẩu!')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-neutral-950">
      <div className="w-full max-w-md bg-black rounded-xl shadow-md p-8 border border-neutral-800">
        <h1 className="text-2xl font-bold mb-2 text-center text-white">Đăng nhập</h1>
        <p className="text-sm text-gray-400 text-center mb-6">Chào mừng bạn trở lại!</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="space-y-1">
            <Input
              {...register('email')}
              type="email"
              placeholder="Email"
              className="w-full"
              autoComplete="email"
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <Input
              {...register('password')}
              type="password"
              placeholder="Mật khẩu"
              className="w-full"
              autoComplete="current-password"
            />
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-300 mt-4">
          Bạn chưa có tài khoản?{' '}
          <Link href="/register" className="text-yellow-400 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  )
}
