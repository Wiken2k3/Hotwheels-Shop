// app/contact/page.tsx
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) {
      toast.error('Vui lòng điền đầy đủ thông tin.')
      return
    }
    toast.success('📨 Đã gửi liên hệ thành công!')
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-center text-orange-500 mb-8">Liên hệ với chúng tôi</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl space-y-6 border border-orange-100"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
          <Input
            placeholder="Nhập tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <Input
            type="email"
            placeholder="email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
          <Textarea
            rows={5}
            placeholder="Lời nhắn, góp ý hoặc yêu cầu hỗ trợ..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full bg-orange-500 text-white hover:bg-orange-600">
          Gửi liên hệ
        </Button>
      </form>
    </main>
  )
}
