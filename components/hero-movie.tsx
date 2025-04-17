"use client"

import { useState, useEffect } from "react"
import { Play, Info, Plus, VolumeX, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

export function HeroMovie() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate video loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    // Check if movie is in watchlist
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]")
    setIsInWatchlist(watchlist.includes("hero-movie-id"))

    return () => clearTimeout(timer)
  }, [])

  const handleToggleWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]")

    if (isInWatchlist) {
      const updatedWatchlist = watchlist.filter((id: string) => id !== "hero-movie-id")
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist))
      setIsInWatchlist(false)
      toast({
        title: "Removed from My List",
        description: "This title has been removed from your list",
      })
    } else {
      watchlist.push("hero-movie-id")
      localStorage.setItem("watchlist", JSON.stringify(watchlist))
      setIsInWatchlist(true)
      toast({
        title: "Added to My List",
        description: "This title has been added to your list",
      })
    }
  }

  return (
    <div className="relative w-full h-[85vh] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg')",
            filter: "brightness(0.5)",
          }}
        />

        {isLoaded && (
          <div className="absolute inset-0 bg-black/30">
            {isPlaying && (
              <video autoPlay loop muted={isMuted} className="w-full h-full object-cover">
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
                  type="video/mp4"
                />
              </video>
            )}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-16 max-w-3xl">
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-4"
              >
                <Badge className="bg-netclicks-red text-white px-3 py-1 text-sm font-medium rounded-sm">
                  NETCLICKS ORIGINAL
                </Badge>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-4 font-heading text-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Interstellar
              </motion.h1>

              <motion.div
                className="flex items-center gap-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="text-green-500 font-semibold">98% Match</span>
                <span>2014</span>
                <span className="border px-1 text-xs">PG-13</span>
                <span>2h 49m</span>
                <span className="border px-1 text-xs">HD</span>
              </motion.div>

              <motion.p
                className="text-lg text-gray-300 mb-6 line-clamp-3 md:line-clamp-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to
                pilot a spacecraft, along with a team of researchers, to find a new planet for humans. A team of
                explorers travel through a wormhole in space in an attempt to ensure humanity's survival.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button
                  size="lg"
                  className="bg-white hover:bg-white/90 text-black gap-2 group"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <>
                      <Play className="fill-black group-hover:scale-110 transition-transform" />
                      Playing
                    </>
                  ) : (
                    <>
                      <Play className="fill-black group-hover:scale-110 transition-transform" />
                      Play
                    </>
                  )}
                </Button>

                <Button size="lg" variant="secondary" className="gap-2">
                  <Info /> More Info
                </Button>

                <div className="flex ml-auto">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-white/10"
                    onClick={handleToggleWatchlist}
                  >
                    <Plus className={`h-6 w-6 ${isInWatchlist ? "text-netclicks-red" : "text-white"}`} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-white/10"
                    onClick={() => setIsMuted(!isMuted)}
                    disabled={!isPlaying}
                  >
                    {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
