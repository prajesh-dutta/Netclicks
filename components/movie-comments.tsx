"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, Flag } from "lucide-react"
import { useSession } from "next-auth/react"

interface MovieCommentsProps {
  movieId: string
}

interface Comment {
  id: string
  userId: string
  userName: string
  userImage: string
  text: string
  likes: number
  createdAt: string
  isLiked?: boolean
}

export function MovieComments({ movieId }: MovieCommentsProps) {
  const { data: session } = useSession()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // In a real app, this would fetch from the API
        // const response = await fetch(`/api/movies/${movieId}/comments`)
        // if (!response.ok) throw new Error("Failed to fetch comments")
        // const data = await response.json()

        // For demo, use placeholder data
        const placeholderComments: Comment[] = [
          {
            id: "1",
            userId: "user1",
            userName: "MovieFan123",
            userImage: "/placeholder-user.jpg",
            text: "This movie was absolutely amazing! The visual effects were stunning and the storyline kept me engaged throughout.",
            likes: 24,
            createdAt: "2023-05-15T14:30:00Z",
          },
          {
            id: "2",
            userId: "user2",
            userName: "CinemaLover",
            userImage: "/placeholder-user.jpg",
            text: "I thought the acting was superb, especially the lead actor's performance. The cinematography was breathtaking as well.",
            likes: 18,
            createdAt: "2023-05-14T09:15:00Z",
          },
          {
            id: "3",
            userId: "user3",
            userName: "FilmCritic42",
            userImage: "/placeholder-user.jpg",
            text: "While the special effects were impressive, I found the plot to be somewhat predictable. Still worth watching though!",
            likes: 7,
            createdAt: "2023-05-13T22:45:00Z",
          },
        ]

        setComments(placeholderComments)
      } catch (error) {
        console.error("Error fetching comments:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [movieId])

  const handleSubmitComment = () => {
    if (!newComment.trim() || !session?.user) return

    const newCommentObj: Comment = {
      id: `new-${Date.now()}`,
      userId: session.user.id || "guest",
      userName: session.user.name || "Guest User",
      userImage: session.user.image || "/placeholder-user.jpg",
      text: newComment,
      likes: 0,
      createdAt: new Date().toISOString(),
      isLiked: false,
    }

    setComments([newCommentObj, ...comments])
    setNewComment("")

    // In a real app, this would send to the API
    // fetch(`/api/movies/${movieId}/comments`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ text: newComment })
    // })
  }

  const handleLikeComment = (commentId: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          const isLiked = comment.isLiked || false
          return {
            ...comment,
            likes: isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !isLiked,
          }
        }
        return comment
      }),
    )

    // In a real app, this would send to the API
    // fetch(`/api/comments/${commentId}/like`, {
    //   method: "POST"
    // })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Today"
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-24 bg-gray-800 animate-pulse rounded-md"></div>
        <div className="h-24 bg-gray-800 animate-pulse rounded-md"></div>
        <div className="h-24 bg-gray-800 animate-pulse rounded-md"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {session?.user && (
        <div className="flex gap-4 mb-6">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src={session.user.image || ""} />
            <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2 bg-gray-900 border-gray-700 resize-none"
            />
            <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
              Post Comment
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-center text-gray-400 py-4">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage src={comment.userImage} />
                <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{comment.userName}</span>
                  <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="text-gray-300 mb-2">{comment.text}</p>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-xs"
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    <ThumbsUp className={`h-4 w-4 ${comment.isLiked ? "text-primary fill-primary" : ""}`} />
                    {comment.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    <Flag className="h-4 w-4" />
                    Report
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
