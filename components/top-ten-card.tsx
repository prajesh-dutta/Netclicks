"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react"
import type { Movie } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

interface TopTenCardProps {
  movie: Movie
  index: number
  isLoading?: boolean
}

export function TopTenCard({ movie, index, isLoading = false }: TopTenCardProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isHovered, setIsHovered] = useState(false)

  const handlePlayClick = () => {
    router.push(`/watch/${movie.id}`)
  }

  const handleAddToList = () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]")

    if (watchlist.includes(movie.id)) {
      toast({
        title: "Already in your list",
        description: "This title is already in your list",
      })
      return
    }

    watchlist.push(movie.id)
    localStorage.setItem("watchlist", JSON.stringify(watchlist))

    toast({
      title: "Added to My List",
      description: "This title has been added to your list",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center">
        <div className="w-32 h-44 flex-none bg-gray-800 animate-pulse"></div>
        <div className="w-[200px] h-[140px] -ml-8 bg-gray-800 animate-pulse"></div>
      </div>
    )
  }

  return (
    <div
      className="flex items-center relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Big Number */}
      <div className="relative z-10 w-32 h-44 flex items-center justify-center">
        <span
          className="text-[180px] font-bold leading-none text-stroke"
          style={{
            WebkitTextStroke: "4px #404040",
            color: "transparent",
            opacity: isHovered ? 1 : 0.8,
            transition: "opacity 0.2s ease",
          }}
        >
          {index}
        </span>
      </div>

      {/* Card */}
      <div 
        className={`transform transition-all duration-300 -ml-8 ${
          isHovered ? "scale-110 origin-left z-20" : "scale-100 z-10"
        }`}
      >
        <div className="relative w-[210px] h-[140px] overflow-hidden rounded-md">
          <Image
            src={movie.thumbnailUrl || `https://image.tmdb.org/t/p/w500/rYOzV1xPNjYJdmNYKpvscONvNBV.jpg`}
            alt={movie.title}
            width={210}
            height={140}
            className="w-full h-full object-cover"
          />

          {isHovered && (
            <>
              <div className="absolute inset-0 bg-black/20" />
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gray-900/90 p-3 rounded-b-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex gap-2 mb-2">
                  <Button
                    size="sm"
                    className="rounded-full w-8 h-8 p-0 bg-white hover:bg-white/90 text-black"
                    onClick={handlePlayClick}
                  >
                    <Play className="h-4 w-4 fill-black" />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full w-8 h-8 p-0 border-white/40"
                    onClick={handleAddToList}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>

                  <Button size="sm" variant="outline" className="rounded-full w-8 h-8 p-0 border-white/40">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>

                  <Button size="sm" variant="outline" className="rounded-full w-8 h-8 p-0 border-white/40 ml-auto">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500 font-semibold">98% Match</span>
                    <span className="border px-1 text-[10px]">{movie.maturityRating}</span>
                    <span>{movie.duration}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {movie.genres.slice(0, 2).map((genre, idx) => (
                      <span key={idx} className="text-gray-300">
                        {genre}
                        {idx < Math.min(movie.genres.length, 2) - 1 ? " •" : ""}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
