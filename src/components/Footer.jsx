export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-9 bg-gray-13 py-8 px-6 mt-auto font-poppins">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-caption text-gray-6">
        <p>© {new Date().getFullYear()} Rodolfo Serra. All rights reserved.</p>
        <p className="flex gap-4">
          <a href="https://rodkidesigns.com" className="hover:text-green-400 transition-colors cursor-pointer">rodkidesings.com</a>
        </p>
      </div>
    </footer>
  )
}