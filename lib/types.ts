export type Movie = {
  id: string
  title: string
  description: string
  thumbnailUrl?: string
  videoUrl?: string
  genres: string[]
  releaseYear?: string
  maturityRating?: string
  duration?: string
  cast?: string[]
  trending?: boolean
}

export type User = {
  id: string
  name?: string
  email?: string
  image?: string
  watchlist?: string[]
  watchProgress?: WatchProgress[]
}

export type WatchProgress = {
  movieId: string
  progress: number
  lastWatched: Date
}

export type Profile = {
  id: string
  name: string
  avatarUrl?: string
  isPrimary?: boolean
  isKids?: boolean
}

export type NavLink = {
  title: string
  href: string
  icon?: React.ReactNode
}
