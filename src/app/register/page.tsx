'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/auth-store'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

// ✅ Import API đăng ký
import { register as registerApi } from '@/lib/auth.service'

const schema = z.object({
  name: z.string().min(2, 'Tên quá ngắn'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
})

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const router = useRouter()
  const login = useAuth((state) => state.login)
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const onSubmit = async (data: FormData) => {
    try {
      const res = await registerApi(data)
      localStorage.setItem('token', res.token)
      login({ name: res.user.name, email: res.user.email })
      toast.success('Đăng ký thành công!')
      router.push('/profile')
    } catch (err) {
      toast.error('Đăng ký thất bại!')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black">
      <div className="w-full max-w-md bg-neutral-900 rounded-2xl shadow-2xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">Đăng ký</h1>
        <p className="text-sm text-gray-400 text-center mb-6">Tạo tài khoản mới để tiếp tục</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <input
              {...register('name')}
              ref={nameRef}
              placeholder="Họ và tên"
              className="w-full rounded-xl px-4 py-3 bg-neutral-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              {...register('email')}
              placeholder="Email"
              type="email"
              autoComplete="email"
              className="w-full rounded-xl px-4 py-3 bg-neutral-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              {...register('password')}
              type="password"
              placeholder="Mật khẩu"
              autoComplete="new-password"
              className="w-full rounded-xl px-4 py-3 bg-neutral-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition"
          >
            Đăng ký
          </Button>
        </form>

        {/* Đã có tài khoản */}
        <p className="text-sm text-center text-gray-400 mt-6">
          Đã có tài khoản?{' '}
          <Link href="/login" className="text-yellow-400 hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  )
}
