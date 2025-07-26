"use client"

import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Track, Playlist } from "@/app/page"

interface MainContentProps {
  tracks: Track[]
  playlists: Playlist[]
  onPlayTrack: (track: Track) => void
  onPlayPlaylist: (playlist: Playlist) => void
}

export function MainContent({ tracks, playlists, onPlayTrack, onPlayPlaylist }: MainContentProps) {
  return (
    <div className="p-4 lg:p-6 space-y-6 lg:space-y-8">
      {/* Hero Section */}
      <section className="relative rounded-lg bg-gradient-to-r from-red-600 to-red-800 p-6 lg:p-8 text-white overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl lg:text-4xl font-bold mb-2">Welcome to OpenMusic</h1>
          <p className="text-lg lg:text-xl opacity-90 mb-4 lg:mb-6">Discover and enjoy your favorite music</p>
          <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
            <Play className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
            Start Listening
          </Button>
        </div>
        <div className="absolute inset-0 bg-black/20" />
      </section>

      {/* Recently Played */}
      <section>
        <h2 className="text-xl lg:text-2xl font-bold mb-4">Recently Played</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
          {tracks.slice(0, 6).map((track) => (
            <Card key={track.id} className="group cursor-pointer hover:bg-accent transition-colors">
              <CardContent className="p-3 lg:p-4">
                <div className="relative mb-2 lg:mb-3">
                  <img
                    src={track.coverUrl || "/placeholder.svg"}
                    alt={track.title}
                    className="w-full aspect-square rounded-md object-cover"
                  />
                  <Button
                    size="sm"
                    className="absolute bottom-1 lg:bottom-2 right-1 lg:right-2 w-8 lg:w-10 h-8 lg:h-10 rounded-full bg-red-600 hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onPlayTrack(track)}
                  >
                    <Play className="w-3 lg:w-4 h-3 lg:h-4 text-white ml-0.5" />
                  </Button>
                </div>
                <h3 className="font-medium truncate text-sm lg:text-base">{track.title}</h3>
                <p className="text-xs lg:text-sm text-muted-foreground truncate">{track.artist}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Playlists */}
      <section>
        <h2 className="text-xl lg:text-2xl font-bold mb-4">Popular Playlists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
          {playlists.map((playlist) => (
            <Card key={playlist.id} className="group cursor-pointer hover:bg-accent transition-colors">
              <CardContent className="p-3 lg:p-4">
                <div className="relative mb-2 lg:mb-3">
                  <img
                    src={playlist.coverUrl || "/placeholder.svg"}
                    alt={playlist.name}
                    className="w-full aspect-square rounded-md object-cover"
                  />
                  <Button
                    size="sm"
                    className="absolute bottom-1 lg:bottom-2 right-1 lg:right-2 w-8 lg:w-10 h-8 lg:h-10 rounded-full bg-red-600 hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onPlayPlaylist(playlist)}
                  >
                    <Play className="w-3 lg:w-4 h-3 lg:h-4 text-white ml-0.5" />
                  </Button>
                </div>
                <h3 className="font-medium truncate text-sm lg:text-base">{playlist.name}</h3>
                <p className="text-xs lg:text-sm text-muted-foreground">{playlist.tracks.length} tracks</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
