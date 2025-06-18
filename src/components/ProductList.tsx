import { products } from '@/data/products'
import ProductCard from './ProductCard'

export default function ProductList() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-neutral-900">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-yellow-400 drop-shadow-md">
         Sản phẩm Hot Wheels nổi bật
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
