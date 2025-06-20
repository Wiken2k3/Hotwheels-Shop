// lib/api.ts
import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // chỉnh lại nếu backend host khác
  withCredentials: true, // nếu dùng cookie auth
})

// Gắn token từ localStorage nếu có
API.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default API
