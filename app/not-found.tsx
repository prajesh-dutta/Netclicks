import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-netclicks-black flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-netclicks-red">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg text-gray-400 mb-8 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button className="bg-netclicks-red hover:bg-netclicks-red/90 text-white">Return to Home</Button>
      </Link>
    </div>
  )
}
