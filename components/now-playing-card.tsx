"use client"

import { Play, Pause, Heart, Share, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AudioVisualizer } from "@/components/audio-visualizer"
import { TrackWaveform } from "@/components/track-waveform"
import type { useAudioPlayer } from "@/hooks/use-audio-player"
import { calculateProgress } from "@/utils/audio-utils"
import type { Track } from "@/app/page"

interface NowPlayingCardProps {
  track: Track
  audioPlayer: ReturnType<typeof useAudioPlayer>
}

export function NowPlayingCard({ track, audioPlayer }: NowPlayingCardProps) {
  const { isPlaying, currentTime, duration, togglePlayPause } = audioPlayer
  const progress = calculateProgress(currentTime, duration)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Album Art */}
          <div className="relative">
            <img
              src={track.coverUrl || "/placeholder.svg"}
              alt={track.title}
              className="w-full aspect-square rounded-lg object-cover"
            />
            <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Button
                size="lg"
                className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </Button>
            </div>
          </div>

          {/* Track Info */}
          <div className="text-center space-y-1">
            <h3 className="font-semibold text-lg">{track.title}</h3>
            <p className="text-muted-foreground">{track.artist}</p>
            <p className="text-sm text-muted-foreground">{track.album}</p>
          </div>

          {/* Audio Visualizer */}
          <div className="flex justify-center">
            <AudioVisualizer isPlaying={isPlaying} />
          </div>

          {/* Waveform */}
          <div className="flex justify-center">
            <TrackWaveform progress={progress} isPlaying={isPlaying} />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="w-4 h-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Add to Playlist</DropdownMenuItem>
                <DropdownMenuItem>Add to Queue</DropdownMenuItem>
                <DropdownMenuItem>View Album</DropdownMenuItem>
                <DropdownMenuItem>View Artist</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
