export interface User {
  id: string
  name: string
  email: string
  password?: string // optional để không expose khi không cần
}
