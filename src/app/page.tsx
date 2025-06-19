import Hero from "@/components/Hero"
import ProductList from "@/components/ProductList"

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <section className="py-12 px-4 max-w-screen-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-6">
          🔥 Sản phẩm nổi bật
        </h2>
        <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto">
          Khám phá những mẫu xe Hot Wheels được yêu thích nhất – tốc độ, phong cách, và niềm vui không giới hạn!
        </p>
        <ProductList />
      </section>
    </>
  )
}
