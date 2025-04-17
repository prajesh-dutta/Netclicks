"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-netclicks-black flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-netclicks-red">Error</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Something went wrong</h2>
      <p className="text-lg text-gray-400 mb-8 text-center max-w-md">
        We apologize for the inconvenience. Please try again later.
      </p>
      <Button onClick={reset} className="bg-netclicks-red hover:bg-netclicks-red/90 text-white">
        Try again
      </Button>
    </div>
  )
}
