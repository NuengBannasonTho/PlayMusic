"use client"

import { Play, Music, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Playlist } from "@/app/page"

interface PlaylistViewProps {
  playlists: Playlist[]
  onPlayPlaylist: (playlist: Playlist) => void
}

export function PlaylistView({ playlists, onPlayPlaylist }: PlaylistViewProps) {
  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold">Playlists</h1>
        <Button className="bg-red-600 hover:bg-red-700" size="sm">
          <Music className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Create New Playlist</span>
          <span className="sm:hidden">Create</span>
        </Button>
      </div>

      <div className="grid gap-3 lg:gap-4">
        {playlists.map((playlist) => (
          <Card key={playlist.id} className="group hover:bg-accent transition-colors">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="relative flex-shrink-0">
                  <img
                    src={playlist.coverUrl || "/placeholder.svg"}
                    alt={playlist.name}
                    className="w-16 lg:w-20 h-16 lg:h-20 rounded-lg object-cover"
                  />
                  <Button
                    size="sm"
                    className="absolute inset-0 w-full h-full rounded-lg bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    onClick={() => onPlayPlaylist(playlist)}
                  >
                    <Play className="w-5 lg:w-6 h-5 lg:h-6 text-white ml-0.5" />
                  </Button>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg lg:text-xl font-semibold mb-1 truncate">{playlist.name}</h3>
                  <p className="text-muted-foreground mb-2 lg:mb-3 text-sm lg:text-base">
                    {playlist.tracks.length} tracks
                  </p>
                  <div className="flex items-center gap-2 lg:gap-4">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={() => onPlayPlaylist(playlist)}>
                      <Play className="w-3 lg:w-4 h-3 lg:h-4 mr-1 lg:mr-2" />
                      Play
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Edit Playlist</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="text-right hidden lg:block">
                  <p className="text-sm text-muted-foreground">
                    {playlist.tracks.reduce((total, track) => {
                      const [minutes, seconds] = track.duration.split(":").map(Number)
                      return total + minutes * 60 + seconds
                    }, 0) > 3600
                      ? `${Math.floor(
                          playlist.tracks.reduce((total, track) => {
                            const [minutes, seconds] = track.duration.split(":").map(Number)
                            return total + minutes * 60 + seconds
                          }, 0) / 3600,
                        )}h ${Math.floor(
                          (playlist.tracks.reduce((total, track) => {
                            const [minutes, seconds] = track.duration.split(":").map(Number)
                            return total + minutes * 60 + seconds
                          }, 0) %
                            3600) /
                            60,
                        )}m`
                      : `${Math.floor(
                          playlist.tracks.reduce((total, track) => {
                            const [minutes, seconds] = track.duration.split(":").map(Number)
                            return total + minutes * 60 + seconds
                          }, 0) / 60,
                        )}m`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
