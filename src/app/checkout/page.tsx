'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { useCart } from '@/store/cart-store'
import { useOrder } from '@/store/orders-store'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from 'react-hot-toast'

const schema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(8, 'Số điện thoại không hợp lệ'),
  address: z.string().min(5, 'Vui lòng nhập địa chỉ đầy đủ'),
  paymentMethod: z.enum(['cod', 'bank']),
})

type CheckoutForm = z.infer<typeof schema>

export default function CheckoutPage() {
  const cart = useCart()
  const { placeOrder } = useOrder()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CheckoutForm>({
    resolver: zodResolver(schema),
    defaultValues: { paymentMethod: 'cod' },
  })

  const onSubmit = (data: CheckoutForm) => {
    if (cart.items.length === 0) {
      toast.error('Giỏ hàng của bạn đang trống!')
      return
    }

    placeOrder(cart.items, cart.totalPrice())
    cart.clearCart()

    toast.success('🎉 Đặt hàng thành công!')
    router.push('/orders')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-8 text-center">
        🧾 Thông tin thanh toán
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-neutral-900 p-6 sm:p-8 rounded-2xl shadow-xl"
      >
        {/* Họ tên */}
        <div>
          <Label htmlFor="name" className="mb-1 block">Tên người nhận</Label>
          <Input id="name" {...register('name')} placeholder="Nguyễn Văn A" />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="mb-1 block">Email</Label>
          <Input id="email" {...register('email')} placeholder="abc@gmail.com" />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* Điện thoại */}
        <div>
          <Label htmlFor="phone" className="mb-1 block">Số điện thoại</Label>
          <Input id="phone" {...register('phone')} placeholder="0909xxxxxx" />
          {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
        </div>

        {/* Địa chỉ */}
        <div>
          <Label htmlFor="address" className="mb-1 block">Địa chỉ giao hàng</Label>
          <Input id="address" {...register('address')} placeholder="123 Đường ABC, Quận 1" />
          {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>}
        </div>

        {/* Thanh toán */}
        <div>
          <Label className="mb-2 block">Phương thức thanh toán</Label>
          <RadioGroup
            value={watch('paymentMethod')}
            onValueChange={(value) => setValue('paymentMethod', value as 'cod' | 'bank')}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod">Thanh toán khi nhận hàng (COD)</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="bank" id="bank" />
              <Label htmlFor="bank">Chuyển khoản ngân hàng</Label>
            </div>
          </RadioGroup>
          {errors.paymentMethod && <p className="text-sm text-red-500 mt-1">{errors.paymentMethod.message}</p>}
        </div>

        {/* Nút đặt hàng */}
        <div className="text-right pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold px-6 py-2 rounded-full shadow-lg"
          >
            {isSubmitting ? 'Đang xử lý...' : '🛒 Đặt hàng'}
          </Button>
        </div>
      </form>
    </div>
  )
}
