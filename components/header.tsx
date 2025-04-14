import Link from "next/link"

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-800 bg-background/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left side - empty or minimal */}
        <div className="flex-1">{/* Intentionally left empty for minimalist design */}</div>

        {/* Right side - navigation links and connect button */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="#talks" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">
              Talks
            </Link>
            <Link
              href="https://www.sanity.io"
              target="_blank"
              className="text-sm font-medium text-gray-300 hover:text-primary transition-colors"
            >
              Sanity.io
            </Link>
          </nav>

          <Link
            href="https://www.linkedin.com"
            target="_blank"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Connect
          </Link>
        </div>
      </div>
    </header>
  )
}
