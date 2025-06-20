// lib/product.service.ts
import API from './api'

export const getAllProducts = async (params?: string) => {
  try {
    const res = await API.get(`/products${params ? `?${params}` : ''}`)
    return res.data.products
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Lỗi khi lấy danh sách sản phẩm')
  }
}

export const getProductById = async (id: string) => {
  try {
    const res = await API.get(`/products/${id}`)
    return res.data.product
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Lỗi khi lấy chi tiết sản phẩm')
  }
}
