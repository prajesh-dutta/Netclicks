"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react"
import type { Movie } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

interface MovieCardProps {
  movie: Movie
  isLoading?: boolean
  showBadge?: boolean
  badgeText?: string
}

export function MovieCard({ movie, isLoading = false, showBadge = false, badgeText = "NEW" }: MovieCardProps) {
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
    return <div className="w-full h-[140px] bg-gray-800 rounded-md animate-pulse" />
  }

  return (
    <div
      className="relative rounded-md overflow-hidden transition-all duration-200 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative ${
          isHovered ? "scale-110 shadow-xl rounded-t-md z-10" : "scale-100"
        } transition-all duration-200`}
      >
        <Image
          src={movie.thumbnailUrl || "https://image.tmdb.org/t/p/w500/rYOzV1xPNjYJdmNYKpvscONvNBV.jpg"}
          alt={movie.title}
          width={250}
          height={140}
          className="w-full h-[140px] object-cover"
        />

        {isHovered && <div className="absolute inset-0 bg-black/20" />}

        {showBadge && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-netclicks-red text-white">{badgeText}</Badge>
          </div>
        )}
      </div>

      {isHovered && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gray-900 p-3 rounded-b-md z-10 transform transition-all duration-200"
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
              {movie.genres.map((genre, index) => (
                <span key={index} className="text-gray-300">
                  {genre}
                  {index < movie.genres.length - 1 ? " •" : ""}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
