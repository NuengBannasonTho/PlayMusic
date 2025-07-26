"use client"

import { useState } from "react"
import { Search, Play } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Track } from "@/app/page"

interface SearchViewProps {
  tracks: Track[]
  onPlayTrack: (track: Track) => void
}

export function SearchView({ tracks, onPlayTrack }: SearchViewProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.album.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-4 lg:p-6">
      <div className="max-w-2xl mx-auto mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 text-center">Search Music</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search for songs, artists, or albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 lg:h-12 text-base lg:text-lg"
          />
        </div>
      </div>

      {searchQuery && (
        <div className="space-y-4">
          <h2 className="text-lg lg:text-xl font-semibold">
            {filteredTracks.length > 0
              ? `Found ${filteredTracks.length} result${filteredTracks.length !== 1 ? "s" : ""}`
              : "No results found"}
          </h2>

          <div className="grid gap-2">
            {filteredTracks.map((track) => (
              <Card key={track.id} className="group hover:bg-accent transition-colors">
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-3 lg:gap-4">
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
                    <div className="flex items-center gap-2">
                      <span className="text-xs lg:text-sm text-muted-foreground hidden sm:block">{track.duration}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-8 lg:w-10 h-8 lg:h-10 rounded-full hover:bg-red-600 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                        onClick={() => onPlayTrack(track)}
                      >
                        <Play className="w-3 lg:w-4 h-3 lg:h-4 ml-0.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {!searchQuery && (
        <div className="text-center py-12">
          <Search className="w-12 lg:w-16 h-12 lg:h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg lg:text-xl font-semibold mb-2">Start searching</h2>
          <p className="text-muted-foreground text-sm lg:text-base">Find your favorite songs, artists, and albums</p>
        </div>
      )}
    </div>
  )
}
