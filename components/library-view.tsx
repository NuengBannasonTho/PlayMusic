"use client"

import { Play, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Track, Playlist } from "@/app/page"

interface LibraryViewProps {
  tracks: Track[]
  playlists: Playlist[]
  onPlayTrack: (track: Track) => void
  onPlayPlaylist: (playlist: Playlist) => void
}

export function LibraryView({ tracks, playlists, onPlayTrack, onPlayPlaylist }: LibraryViewProps) {
  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">Your Library</h1>

      <Tabs defaultValue="tracks" className="space-y-4 lg:space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="tracks">Tracks</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
        </TabsList>

        <TabsContent value="tracks" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg lg:text-xl font-semibold">Your Tracks ({tracks.length})</h2>
            <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
              <Play className="w-4 h-4 mr-2" />
              Play All
            </Button>
          </div>

          <div className="grid gap-2">
            {tracks.map((track, index) => (
              <Card key={track.id} className="group hover:bg-accent transition-colors">
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="w-6 lg:w-8 text-center text-sm text-muted-foreground group-hover:hidden hidden sm:block">
                      {index + 1}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-6 lg:w-8 h-6 lg:h-8 rounded-full hidden group-hover:flex sm:group-hover:flex items-center justify-center hover:bg-red-600 hover:text-white"
                      onClick={() => onPlayTrack(track)}
                    >
                      <Play className="w-3 h-3 ml-0.5" />
                    </Button>
                    <img
                      src={track.coverUrl || "/placeholder.svg"}
                      alt={track.title}
                      className="w-10 lg:w-12 h-10 lg:h-12 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate text-sm lg:text-base">{track.title}</h3>
                      <p className="text-xs lg:text-sm text-muted-foreground truncate">
                        {track.artist} • {track.album}
                      </p>
                    </div>
                    <span className="text-xs lg:text-sm text-muted-foreground hidden sm:block">{track.duration}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-8 h-8 rounded-full hover:bg-red-600 hover:text-white sm:hidden"
                      onClick={() => onPlayTrack(track)}
                    >
                      <Play className="w-3 h-3 ml-0.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="playlists" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg lg:text-xl font-semibold">Your Playlists ({playlists.length})</h2>
            <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
              <Music className="w-4 h-4 mr-2" />
              Create Playlist
            </Button>
          </div>

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
        </TabsContent>
      </Tabs>
    </div>
  )
}
