import { users } from '@/data/users'

export async function login({ email, password }: { email: string; password: string }) {
  const user = users.find((u) => u.email === email && u.password === password)
  if (!user) throw new Error('Đăng nhập thất bại')

  return {
    token: 'mock-token',
    user: { name: user.name, email: user.email },
  }
}

export async function register({ name, email, password }: { name: string; email: string; password: string }) {
  const exists = users.some((u) => u.email === email)
  if (exists) throw new Error('Email đã được sử dụng')

  const newUser = { id: Date.now().toString(), name, email, password }
  users.push(newUser)

  return {
    token: 'mock-token',
    user: { name: newUser.name, email: newUser.email },
  }
}
