"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ProfileSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Profile {
  id: string
  name: string
  avatar: string
  isKid: boolean
}

export function ProfileSelector({ open, onOpenChange }: ProfileSelectorProps) {
  const { toast } = useToast()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  // Fetch user profiles
  useEffect(() => {
    if (open) {
      fetchProfiles()
    }
  }, [open])

  const fetchProfiles = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/user/profiles')
      if (!response.ok) {
        throw new Error('Failed to fetch profiles')
      }
      
      const data = await response.json()
      setProfiles(data.profiles || [])
    } catch (error) {
      console.error('Error fetching profiles:', error)
      // Use fallback profiles if API fails
      setProfiles([
        {
          id: "1",
          name: "Main Profile",
          avatar: "/placeholder-user.jpg",
          isKid: false,
        },
        {
          id: "2",
          name: "Kids",
          avatar: "/placeholder-user.jpg",
          isKid: true,
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddProfile = () => {
    toast({
      title: "Add Profile",
      description: "This feature is coming soon. Stay tuned!"
    })
  }

  const handleEditProfile = (profile: Profile) => {
    toast({
      title: "Edit Profile",
      description: `Editing profile: ${profile.name}. This feature is coming soon.`
    })
  }

  const handleSelectProfile = (profile: Profile) => {
    if (!isEditing) {
      toast({
        title: "Profile Selected",
        description: `Now watching as ${profile.name}`
      })
      onOpenChange(false)
    } else {
      handleEditProfile(profile)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl mb-2">
            {isEditing ? "Manage Profiles" : "Who's watching?"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isEditing
              ? "Edit profiles to customize your Netclicks experience."
              : "Select a profile to start watching."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
          {isLoading ? (
            // Loading placeholders
            Array(3).fill(0).map((_, i) => (
              <div key={`loading-${i}`} className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full bg-gray-800 animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-800 rounded animate-pulse"></div>
              </div>
            ))
          ) : (
            <>
              {profiles.map((profile) => (
                <div 
                  key={profile.id} 
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                  onClick={() => handleSelectProfile(profile)}
                >
                  <div className="relative">
                    <Avatar className="w-20 h-20 border-2 border-transparent group-hover:border-red-600 transition-all">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback>{profile.name[0]}</AvatarFallback>
                    </Avatar>

                    {isEditing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Pencil className="w-8 h-8 text-white" />
                      </div>
                    )}

                    {profile.isKid && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs px-1 rounded">KIDS</div>
                    )}
                  </div>
                  <span className="text-sm font-medium">{profile.name}</span>
                </div>
              ))}

              {/* Add profile button */}
              {profiles.length < 5 && (
                <div 
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                  onClick={handleAddProfile}
                >
                  <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center border-2 border-transparent group-hover:border-red-600 transition-all">
                    <PlusCircle className="w-10 h-10 text-gray-400 group-hover:text-red-600 transition-colors" />
                  </div>
                  <span className="text-sm font-medium">Add Profile</span>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex justify-center mt-4">
          {isEditing ? (
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(false)} 
              className="px-8 hover:bg-red-600 hover:text-white"
            >
              Done
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(true)} 
              className="px-8 hover:bg-red-600 hover:text-white"
            >
              Manage Profiles
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
