'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/auth-store'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// ✅ Thêm import API đăng ký
import { register as registerApi } from '@/lib/auth.service'

const schema = z.object({
  name: z.string().min(2, 'Tên quá ngắn'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
})

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const router = useRouter()
  const login = useAuth((state) => state.login)

  // ✅ Hàm submit đã được cập nhật
  const onSubmit = async (data: FormData) => {
    try {
      const res = await registerApi(data)
      localStorage.setItem('token', res.token)
      login({ name: res.user.name, email: res.user.email }) // Zustand state
      toast.success('Đăng ký thành công!')
      router.push('/profile')
    } catch (err) {
      toast.error('Đăng ký thất bại!')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold mb-2 text-center text-white">Đăng ký</h1>
        <p className="text-sm text-gray-400 text-center mb-6">Tạo tài khoản mới để tiếp tục</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register('name')}
              placeholder="Họ và tên"
              className="w-full border rounded px-4 py-2"
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <input
              {...register('email')}
              placeholder="Email"
              className="w-full border rounded px-4 py-2"
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <input
              {...register('password')}
              type="password"
              placeholder="Mật khẩu"
              className="w-full border rounded px-4 py-2"
            />
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>

          <Button className="w-full">Đăng ký</Button>
        </form>

        <p className="text-sm text-center text-gray-300 mt-4">
          Đã có tài khoản?{' '}
          <Link href="/login" className="text-red-400 hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  )
}
