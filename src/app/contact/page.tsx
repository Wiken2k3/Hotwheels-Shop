'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !message) {
      toast.error('Vui lòng điền đầy đủ thông tin.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Email không hợp lệ.')
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      toast.success('📨 Đã gửi liên hệ thành công!')
      setName('')
      setEmail('')
      setMessage('')
      setIsSubmitting(false)
    }, 1200)
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="text-5xl font-extrabold text-center text-[#D35400] mb-4 drop-shadow-sm">
        Liên hệ với chúng tôi
      </h1>
      <p className="text-gray-600 text-center mb-12">
        Hãy để lại lời nhắn nếu bạn có thắc mắc, góp ý hoặc muốn hợp tác cùng Hot Wheels Shop.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-2xl border border-[#FDEBD0] space-y-8"
        noValidate
      >
        {/* Họ tên */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2" htmlFor="name">
            Họ và tên
          </label>
          <Input
            id="name"
            placeholder="Nhập tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-gray-300 focus:ring-[#E67E22] focus:border-[#E67E22]"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-300 focus:ring-[#E67E22] focus:border-[#E67E22]"
            required
          />
        </div>

        {/* Nội dung */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2" htmlFor="message">
            Nội dung
          </label>
          <Textarea
            id="message"
            rows={6}
            placeholder="Lời nhắn, góp ý hoặc yêu cầu hỗ trợ..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border-gray-300 focus:ring-[#E67E22] focus:border-[#E67E22]"
            required
          />
        </div>

        {/* Nút gửi */}
        <Button
          type="submit"
          aria-label="Gửi liên hệ"
          disabled={isSubmitting}
          className="w-full bg-[#E67E22] text-white font-semibold rounded-full shadow-lg hover:bg-[#D35400] transition-colors duration-300 disabled:opacity-60"
        >
          {isSubmitting ? 'Đang gửi...' : 'Gửi liên hệ'}
        </Button>
      </form>
    </main>
  )
}
