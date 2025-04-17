"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function AuthError() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string>("An authentication error occurred")

  useEffect(() => {
    const error = searchParams.get("error")
    
    if (error === "Configuration") {
      setErrorMessage("There is a problem with the server configuration. Please contact support.")
    } else if (error === "AccessDenied") {
      setErrorMessage("Access denied. You do not have permission to sign in.")
    } else if (error === "Verification") {
      setErrorMessage("The verification link was invalid or has expired. Please request a new one.")
    } else if (error === "OAuthCallback") {
      setErrorMessage("There was a problem with the OAuth callback. Please try again.")
    } else if (error === "OAuthAccountNotLinked") {
      setErrorMessage("To confirm your identity, sign in with the same account you used originally.")
    } else if (error) {
      setErrorMessage(`Authentication error: ${error}`)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-black bg-opacity-75 flex items-center justify-center p-4 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Card className="bg-black/80 border-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-500">Authentication Error</CardTitle>
            <CardDescription className="text-gray-400">There was a problem signing you in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg mb-4">
              <p className="text-white">{errorMessage}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="w-full flex gap-4">
              <Button 
                variant="outline" 
                className="flex-1 bg-transparent border-gray-700 text-white hover:bg-gray-800"
                onClick={() => router.back()}
              >
                Go Back
              </Button>
              <Button 
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                asChild
              >
                <Link href="/auth/signin">
                  Try Again
                </Link>
              </Button>
            </div>
            <div className="text-xs text-gray-500 text-center">
              Need help? Contact support at support@netclicks.example.com
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}