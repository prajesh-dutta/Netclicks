"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, Info, X } from "lucide-react"
import { useRouter } from "next/navigation"

export function BillboardAd() {
  const [dismissed, setDismissed] = useState(false)
  const router = useRouter()

  if (dismissed) return null

  return (
    <motion.div
      className="relative w-full rounded-lg overflow-hidden my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative aspect-[21/9]">
        <Image src="/placeholder.svg?height=600&width=1400" alt="Featured Original" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 rounded-full bg-black/50 hover:bg-black/70 z-10"
          onClick={() => setDismissed(true)}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:w-2/3 z-10">
          <div className="mb-4">
            <span className="bg-netclicks-red text-white px-2 py-1 text-xs font-bold rounded">NETCLICKS ORIGINAL</span>
          </div>
          <h3 className="text-2xl md:text-4xl font-bold mb-2 text-shadow-lg">The Crown: Season 5</h3>
          <p className="text-sm md:text-base text-gray-200 mb-4 line-clamp-2 md:line-clamp-3">
            As Queen Elizabeth II faces a rapidly changing Britain, new challenges test the monarchy's strength and her
            family's stability.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              className="bg-white hover:bg-white/90 text-black gap-2"
              onClick={() => router.push("/watch/featured-1")}
            >
              <Play className="fill-black" /> Play
            </Button>
            <Button variant="outline" className="gap-2">
              <Info /> More Info
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
