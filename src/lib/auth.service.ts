import API from './api'

interface RegisterData {
  name: string
  email: string
  password: string
}

interface LoginData {
  email: string
  password: string
}

export const register = async (data: RegisterData) => {
  const res = await API.post('/auth/register', data)
  return res.data
}

export const login = async (data: LoginData) => {
  const res = await API.post('/auth/login', data)
  return res.data
}
