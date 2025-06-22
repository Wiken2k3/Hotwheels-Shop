export interface Product {
  id: string
  name: string
  price: number
  salePrice?: number
  image: string
  description?: string
  collection?: string
  onSale?: boolean
}
