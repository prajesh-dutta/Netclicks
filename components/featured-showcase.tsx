"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Play, Info, Plus, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

export function FeaturedShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const featuredContent = [
    {
      id: "1",
      title: "The Witcher",
      description:
        "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
      image: "https://image.tmdb.org/t/p/original/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
      year: "2019",
      maturityRating: "TV-MA",
      duration: "1h",
      genres: ["Fantasy", "Action", "Adventure"],
    },
    {
      id: "2",
      title: "Stranger Things",
      description:
        "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.",
      image: "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
      year: "2016",
      maturityRating: "TV-14",
      duration: "50m",
      genres: ["Drama", "Fantasy", "Horror"],
    },
    {
      id: "3",
      title: "The Queen's Gambit",
      description:
        "Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA.",
      image: "https://image.tmdb.org/t/p/original/zU0htwkhNvBQdVSwKhpWTRJ3WBM.jpg",
      year: "2020",
      maturityRating: "TV-MA",
      duration: "55m",
      genres: ["Drama"],
    },
  ]

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredContent.length)
      }, 6000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovered, featuredContent.length])

  const handleAddToList = () => {
    toast({
      title: "Added to My List",
      description: `${featuredContent[currentIndex].title} has been added to your list`,
    })
  }

  const handlePlay = (id: string) => {
    router.push(`/watch/${id}`)
  }

  return (
    <div
      className="relative h-[400px] md:h-[500px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="relative h-full">
            <Image
              src={featuredContent[currentIndex].image}
              alt={featuredContent[currentIndex].title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 md:pb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Badge className="bg-primary text-white mb-4">Featured</Badge>
                <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 font-heading text-shadow">
                  {featuredContent[currentIndex].title}
                </h2>

                <div className="flex items-center gap-2 mb-2 md:mb-4 text-sm">
                  <span className="text-green-500 font-semibold">97% Match</span>
                  <span>{featuredContent[currentIndex].year}</span>
                  <span className="border px-1 text-xs">{featuredContent[currentIndex].maturityRating}</span>
                  <span>{featuredContent[currentIndex].duration}</span>
                </div>

                <p className="text-gray-300 mb-4 max-w-xl line-clamp-2 md:line-clamp-3">
                  {featuredContent[currentIndex].description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button
                    className="bg-white hover:bg-white/90 text-black gap-2"
                    onClick={() => handlePlay(featuredContent[currentIndex].id)}
                  >
                    <Play className="fill-black" /> Play
                  </Button>

                  <Button variant="secondary" className="gap-2">
                    <Info /> More Info
                  </Button>

                  <div className="hidden md:flex ml-auto gap-2">
                    <Button variant="outline" size="icon" className="rounded-full" onClick={handleAddToList}>
                      <Plus className="h-5 w-5" />
                    </Button>

                    <Button variant="outline" size="icon" className="rounded-full">
                      <ThumbsUp className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        {featuredContent.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-primary" : "bg-gray-600"}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
