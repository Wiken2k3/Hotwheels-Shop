// lib/product.service.ts
import API from './api'

export const getAllProducts = async (params?: string) => {
  try {
    const res = await API.get(`/products${params ? `?${params}` : ''}`)
    console.log('API getAllProducts response:', res.data)

    // Kiểm tra các dạng dữ liệu trả về thường gặp
    if (res.data?.data?.products) {
      return res.data.data.products
    }
    if (res.data?.products) {
      return res.data.products
    }
    // Nếu API trả về luôn mảng sản phẩm ở res.data
    if (Array.isArray(res.data)) {
      return res.data
    }

    // Nếu không có trường nào phù hợp, trả về rỗng để tránh lỗi
    return []
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Lỗi khi lấy danh sách sản phẩm')
  }
}

export const getProductById = async (id: string) => {
  try {
    const res = await API.get(`/products/${id}`)
    console.log('API getProductById response:', res.data)

    if (res.data?.data?.product) {
      return res.data.data.product
    }
    if (res.data?.product) {
      return res.data.product
    }
    if (res.data) {
      return res.data
    }

    return null
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Lỗi khi lấy chi tiết sản phẩm')
  }
}
