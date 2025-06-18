import Hero from "@/components/Hero"
import ProductList from "@/components/ProductList"

export default function HomePage() {
  return (
    <section className="py-10 px-[20px]">
      <h1 className="text-4xl font-bold text-center text-white">
        Chào mừng đến với HotWheels Shop!
      </h1>
      <p className="text-center mt-4 pb-10 text-gray-400">
        Cửa hàng mô hình xe Hotwheels chính hãng, giá tốt, giao nhanh.
      </p>

      {/* Hero section có thể dùng ảnh /images/carcity.jpg nếu bạn muốn */}
      <Hero />

      {/* Danh sách sản phẩm */}
      <ProductList />
    </section>
  )
}
