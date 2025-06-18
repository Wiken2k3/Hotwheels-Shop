export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6 mt-10 border-t">
      <div className="container mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} HotWheels Shop. All rights reserved.
      </div>
    </footer>
  )
}
