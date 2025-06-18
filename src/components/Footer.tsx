export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-gray-400 py-6 mt-10 border-t border-gray-700">
      <div className="container mx-auto px-4 text-center text-sm select-none">
        © {new Date().getFullYear()} HotWheels Shop. All rights reserved.
      </div>
    </footer>
  )
}
