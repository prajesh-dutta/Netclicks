"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Share2, ThumbsUp, Plus, Flag, Download, Bookmark } from "lucide-react"

import { VideoPlayer } from "@/components/video-player"
import { Button } from "@/components/ui/button"
import type { Movie } from "@/lib/types"
import { RelatedContent } from "@/components/related-content"
import { MovieComments } from "@/components/movie-comments"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PrajeshCredit } from "@/components/prajesh-credit"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { MovieRating } from "@/components/movie-rating"
import { CastCarousel } from "@/components/cast-carousel"
import { SimilarMovies } from "@/components/similar-movies"
import { motion } from "framer-motion"
import { getMovieById } from "@/lib/movies"

export default function WatchPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [userRating, setUserRating] = useState<number | null>(null)

  useEffect(() => {
    const fetchMovie = async () => {
      if (params.id) {
        try {
          const movieData = await getMovieById(params.id as string)
          setMovie(movieData)

          // Check if movie is in user's watchlist
          const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]")
          setIsInWatchlist(watchlist.includes(params.id))

          // Check if movie is liked
          const likedMovies = JSON.parse(localStorage.getItem("likedMovies") || "[]")
          setIsLiked(likedMovies.includes(params.id))

          // Check if movie is bookmarked
          const bookmarkedMovies = JSON.parse(localStorage.getItem("bookmarkedMovies") || "[]")
          setIsBookmarked(bookmarkedMovies.includes(params.id))

          // Get user rating
          const ratings = JSON.parse(localStorage.getItem("movieRatings") || "{}")
          setUserRating(ratings[params.id as string] || null)

          // Add to continue watching
          const continueWatching = JSON.parse(localStorage.getItem("continueWatching") || "[]")
          const existingIndex = continueWatching.findIndex((item: any) => item.id === params.id)

          if (existingIndex !== -1) {
            // Move to the front if already exists
            const item = continueWatching.splice(existingIndex, 1)[0]
            item.timestamp = Date.now()
            continueWatching.unshift(item)
          } else {
            // Add new entry
            continueWatching.unshift({
              id: params.id,
              progress: 0,
              timestamp: Date.now(),
            })
          }

          // Keep only the last 10 items
          const updatedList = continueWatching.slice(0, 10)
          localStorage.setItem("continueWatching", JSON.stringify(updatedList))
        } catch (error) {
          console.error("Failed to fetch movie:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchMovie()
  }, [params.id])

  const handleToggleLike = () => {
    const likedMovies = JSON.parse(localStorage.getItem("likedMovies") || "[]")

    if (isLiked) {
      const updatedLikes = likedMovies.filter((id: string) => id !== params.id)
      localStorage.setItem("likedMovies", JSON.stringify(updatedLikes))
      setIsLiked(false)
      toast({
        title: "Removed from liked videos",
        description: "This title has been removed from your liked videos",
      })
    } else {
      likedMovies.push(params.id)
      localStorage.setItem("likedMovies", JSON.stringify(likedMovies))
      setIsLiked(true)
      toast({
        title: "Added to liked videos",
        description: "This title has been added to your liked videos",
      })
    }
  }

  const handleToggleWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]")

    if (isInWatchlist) {
      const updatedWatchlist = watchlist.filter((id: string) => id !== params.id)
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist))
      setIsInWatchlist(false)
      toast({
        title: "Removed from My List",
        description: "This title has been removed from your list",
      })
    } else {
      watchlist.push(params.id)
      localStorage.setItem("watchlist", JSON.stringify(watchlist))
      setIsInWatchlist(true)
      toast({
        title: "Added to My List",
        description: "This title has been added to your list",
      })
    }
  }

  const handleToggleBookmark = () => {
    const bookmarkedMovies = JSON.parse(localStorage.getItem("bookmarkedMovies") || "[]")

    if (isBookmarked) {
      const updatedBookmarks = bookmarkedMovies.filter((id: string) => id !== params.id)
      localStorage.setItem("bookmarkedMovies", JSON.stringify(updatedBookmarks))
      setIsBookmarked(false)
      toast({
        title: "Removed from bookmarks",
        description: "This title has been removed from your bookmarks",
      })
    } else {
      bookmarkedMovies.push(params.id)
      localStorage.setItem("bookmarkedMovies", JSON.stringify(bookmarkedMovies))
      setIsBookmarked(true)
      toast({
        title: "Bookmarked",
        description: "You can find this title in your bookmarks",
      })
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied",
      description: "Video link has been copied to clipboard",
    })
  }

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "This title will be available offline soon",
    })
  }

  const handleRateMovie = (rating: number) => {
    const ratings = JSON.parse(localStorage.getItem("movieRatings") || "{}")
    ratings[params.id as string] = rating
    localStorage.setItem("movieRatings", JSON.stringify(ratings))
    setUserRating(rating)

    toast({
      title: "Rating saved",
      description: `You rated this title ${rating} out of 5 stars`,
    })
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-netclicks-black">
        <div className="w-full aspect-video bg-gray-900 animate-pulse" />
        <div className="max-w-5xl mx-auto px-4 py-8 w-full">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-6" />
          <Skeleton className="h-24 w-full mb-8" />
          <Skeleton className="h-8 w-1/3 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-netclicks-black text-white">
        <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
        <Button onClick={() => router.push("/browse")}>Back to Browse</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-netclicks-black">
      <Button variant="ghost" className="absolute top-4 left-4 z-50 text-white" onClick={() => router.push("/browse")}>
        <ArrowLeft className="mr-2" />
        Back
      </Button>

      <VideoPlayer title={movie.title} videoUrl={movie.videoUrl} thumbnailUrl={movie.thumbnailUrl} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-4 py-8 text-white"
      >
        <div className="grid md:grid-cols-[2fr_1fr] gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 font-heading">{movie.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
              <span className="text-green-500 font-semibold">98% Match</span>
              <span>{movie.releaseYear}</span>
              <Badge variant="outline" className="rounded-sm">
                {movie.maturityRating}
              </Badge>
              <span>{movie.duration}</span>
              <Badge variant="outline" className="rounded-sm">
                HD
              </Badge>
              <Badge variant="outline" className="rounded-sm">
                5.1
              </Badge>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <Button variant={isLiked ? "default" : "outline"} size="sm" className="gap-2" onClick={handleToggleLike}>
                <ThumbsUp className={`h-4 w-4 ${isLiked ? "fill-white" : ""}`} />
                {isLiked ? "Liked" : "Like"}
              </Button>

              <Button
                variant={isInWatchlist ? "default" : "outline"}
                size="sm"
                className="gap-2"
                onClick={handleToggleWatchlist}
              >
                <Plus className="h-4 w-4" />
                {isInWatchlist ? "Added to My List" : "Add to My List"}
              </Button>

              <Button
                variant={isBookmarked ? "default" : "outline"}
                size="sm"
                className="gap-2"
                onClick={handleToggleBookmark}
              >
                <Bookmark className="h-4 w-4" />
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </Button>

              <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                Share
              </Button>

              <Button variant="outline" size="sm" className="gap-2" onClick={handleDownload}>
                <Download className="h-4 w-4" />
                Download
              </Button>

              <Button variant="outline" size="sm" className="gap-2 ml-auto">
                <Flag className="h-4 w-4" />
                Report
              </Button>
            </div>

            {/* Progress bar for continue watching */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Continue watching</span>
                <span>45 minutes left</span>
              </div>
              <Progress value={35} className="h-1" indicatorClassName="bg-netclicks-red" />
            </div>

            <p className="text-lg mb-6">{movie.description}</p>

            <Tabs defaultValue="details" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="cast">Cast & Crew</TabsTrigger>
                <TabsTrigger value="more">More Like This</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Cast</h2>
                    <p className="text-gray-300">{movie.cast.join(", ")}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2">Genres</h2>
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map((genre, index) => (
                        <Badge key={index} variant="secondary" className="rounded-full">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2">Director</h2>
                    <p className="text-gray-300">Christopher Nolan</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2">Audio</h2>
                    <p className="text-gray-300">English [Original], Spanish, French</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="cast">
                <CastCarousel movie={movie} />
              </TabsContent>
              <TabsContent value="more">
                <RelatedContent movieId={movie.id} genres={movie.genres} />
              </TabsContent>
              <TabsContent value="comments">
                <MovieComments movieId={movie.id} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Rate this title</h3>
              <MovieRating currentRating={userRating} onRate={handleRateMovie} />
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Why you might like it</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <ThumbsUp className="h-4 w-4 mt-0.5 text-green-500" />
                  <span>Based on your interest in Sci-Fi movies</span>
                </li>
                <li className="flex items-start gap-2">
                  <ThumbsUp className="h-4 w-4 mt-0.5 text-green-500" />
                  <span>Popular among viewers with similar taste</span>
                </li>
                <li className="flex items-start gap-2">
                  <ThumbsUp className="h-4 w-4 mt-0.5 text-green-500" />
                  <span>Award-winning director and cast</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Ratings & Reviews</h3>
              <div className="flex items-center gap-4 mb-2">
                <div className="text-3xl font-bold">4.8</div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="h-2 bg-green-500 rounded-full w-[95%]"></div>
                    <span className="text-xs">95%</span>
                  </div>
                  <div className="text-xs text-gray-400">Based on 12,458 reviews</div>
                </div>
              </div>
            </div>

            <PrajeshCredit />
          </div>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6 font-heading">Similar Movies</h2>
        <SimilarMovies movieId={movie.id} genres={movie.genres} limit={6} />
      </div>
    </div>
  )
}
