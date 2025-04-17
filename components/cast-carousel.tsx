"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import type { Movie } from "@/lib/types"

interface CastCarouselProps {
  movie: Movie
}

export function CastCarousel({ movie }: CastCarouselProps) {
  const rowRef = useRef<HTMLDivElement>(null)

  // Mock cast data with more details
  const castMembers = movie.cast.map((name, index) => ({
    id: `cast-${index}`,
    name,
    character: `Character ${index + 1}`,
    image: `/placeholder.svg?height=200&width=200`,
  }))

  // Add director and other crew
  const crew = [
    {
      id: "crew-1",
      name: "Christopher Nolan",
      role: "Director",
      image: `/placeholder.svg?height=200&width=200`,
    },
    {
      id: "crew-2",
      name: "Hans Zimmer",
      role: "Composer",
      image: `/placeholder.svg?height=200&width=200`,
    },
    {
      id: "crew-3",
      name: "Hoyte van Hoytema",
      role: "Cinematographer",
      image: `/placeholder.svg?height=200&width=200`,
    },
  ]

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2

      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative group">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Cast</h3>
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => handleScroll("left")}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div
            ref={rowRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {castMembers.map((cast, index) => (
              <motion.div
                key={cast.id}
                className="flex-none w-[150px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-2 border border-gray-700">
                    <AvatarImage src={cast.image || "/placeholder.svg"} alt={cast.name} />
                    <AvatarFallback>{cast.name[0]}</AvatarFallback>
                  </Avatar>
                  <p className="font-medium text-sm">{cast.name}</p>
                  <p className="text-xs text-gray-400">{cast.character}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => handleScroll("right")}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Crew</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {crew.map((person, index) => (
            <motion.div
              key={person.id}
              className="flex items-center gap-3 bg-gray-900 p-3 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Avatar className="border border-gray-700">
                <AvatarImage src={person.image || "/placeholder.svg"} alt={person.name} />
                <AvatarFallback>{person.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{person.name}</p>
                <p className="text-xs text-gray-400">{person.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
