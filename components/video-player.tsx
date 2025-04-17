"use client"

import { useState, useRef, useEffect } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Settings,
  Subtitles,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface VideoPlayerProps {
  title: string
  videoUrl: string
  thumbnailUrl: string
}

export function VideoPlayer({ title, videoUrl, thumbnailUrl }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isVolumeSliderVisible, setIsVolumeSliderVisible] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [quality, setQuality] = useState("Auto")

  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // For demo purposes, use a placeholder video
  const demoVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    const handleWaiting = () => {
      setIsBuffering(true)
    }

    const handlePlaying = () => {
      setIsBuffering(false)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("ended", handleEnded)
    video.addEventListener("waiting", handleWaiting)
    video.addEventListener("playing", handlePlaying)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("ended", handleEnded)
      video.removeEventListener("waiting", handleWaiting)
      video.removeEventListener("playing", handlePlaying)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.play().catch((error) => {
        console.error("Error playing video:", error)
        setIsPlaying(false)
      })
    } else {
      video.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = isMuted
    video.volume = isMuted ? 0 : volume
  }, [isMuted, volume])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = playbackSpeed
  }, [playbackSpeed])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newTime = value[0]
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleFullscreenToggle = () => {
    const player = playerRef.current
    if (!player) return

    if (!isFullscreen) {
      if (player.requestFullscreen) {
        player.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const handleMouseMove = () => {
    setShowControls(true)

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const handleSkip = (seconds: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime += seconds
  }

  const handlePlaybackSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed)
  }

  const handleQualityChange = (quality: string) => {
    setQuality(quality)
    // In a real implementation, this would switch video sources
  }

  return (
    <div
      ref={playerRef}
      className="relative w-full aspect-video bg-black group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onClick={() => (isPlaying ? setShowControls(true) : handlePlayPause())}
    >
      <video ref={videoRef} className="w-full h-full" poster={thumbnailUrl}>
        <source src={demoVideoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Buffering indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Play/Pause overlay button (center) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-20 h-20 rounded-full bg-black/30 hover:bg-black/50 transition-all duration-300 transform hover:scale-110"
            onClick={(e) => {
              e.stopPropagation()
              handlePlayPause()
            }}
          >
            <Play className="w-10 h-10 fill-white" />
          </Button>
        </div>
      )}

      {/* Title overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent"
          >
            <h2 className="text-xl font-bold text-white">{title}</h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-2"
          >
            {/* Progress bar */}
            <div className="mb-2">
              <Slider
                value={[currentTime]}
                min={0}
                max={duration || 100}
                step={0.1}
                onValueChange={handleSeek}
                className="cursor-pointer [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-primary [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary"
              />
            </div>

            <div className="flex items-center">
              {/* Play/Pause button */}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-transparent"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePlayPause()
                }}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </Button>

              {/* Skip buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-transparent"
                onClick={(e) => {
                  e.stopPropagation()
                  handleSkip(-10)
                }}
              >
                <SkipBack className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-transparent"
                onClick={(e) => {
                  e.stopPropagation()
                  handleSkip(10)
                }}
              >
                <SkipForward className="w-6 h-6" />
              </Button>

              {/* Volume control */}
              <div
                className="relative flex items-center ml-1"
                onMouseEnter={() => setIsVolumeSliderVisible(true)}
                onMouseLeave={() => setIsVolumeSliderVisible(false)}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleMuteToggle()
                  }}
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </Button>

                {isVolumeSliderVisible && (
                  <div className="absolute bottom-full left-0 mb-2 p-2 bg-black/80 rounded-md w-32">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      min={0}
                      max={1}
                      step={0.01}
                      onValueChange={handleVolumeChange}
                      className="cursor-pointer [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-primary [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary"
                    />
                  </div>
                )}
              </div>

              {/* Time display */}
              <div className="text-white text-sm ml-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

              {/* Right side controls */}
              <div className="ml-auto flex items-center gap-2">
                {/* Subtitles button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-transparent"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Subtitles className="w-5 h-5" />
                </Button>

                {/* Settings dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-transparent">
                      <Settings className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-black/90 border-gray-700">
                    <DropdownMenuLabel>Playback Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuLabel className="text-xs text-gray-400">Playback Speed</DropdownMenuLabel>
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                      <DropdownMenuItem
                        key={speed}
                        className={`${playbackSpeed === speed ? "bg-white/10" : ""}`}
                        onClick={() => handlePlaybackSpeedChange(speed)}
                      >
                        {speed === 1 ? "Normal" : `${speed}x`}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuLabel className="text-xs text-gray-400">Quality</DropdownMenuLabel>
                    {["Auto", "4K", "1080p", "720p", "480p"].map((q) => (
                      <DropdownMenuItem
                        key={q}
                        className={`${quality === q ? "bg-white/10" : ""}`}
                        onClick={() => handleQualityChange(q)}
                      >
                        {q}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleFullscreenToggle()
                  }}
                >
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prajesh signature - appears briefly when video starts */}
      <AnimatePresence>
        {isPlaying && !isBuffering && currentTime < 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-16 right-8 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg"
          >
            <p className="text-sm text-white">
              Made with <span className="text-primary">❤️</span> by Prajesh
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
