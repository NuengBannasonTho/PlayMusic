"use client"

import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, Menu, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import type { useAudioPlayer } from "@/hooks/use-audio-player"
import { formatTime, calculateProgress } from "@/utils/audio-utils"
import { cn } from "@/lib/utils"

interface MusicPlayerProps {
  audioPlayer: ReturnType<typeof useAudioPlayer>
  onMenuClick?: () => void
}

export function MusicPlayer({ audioPlayer, onMenuClick }: MusicPlayerProps) {
  const {
    currentTrack,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    volume,
    isMuted,
    error,
    togglePlayPause,
    seek,
    setVolume,
    toggleMute,
    skipForward,
    skipBackward,
  } = audioPlayer

  const progress = calculateProgress(currentTime, duration)

  const handleProgressChange = (value: number[]) => {
    const newTime = (value[0] / 100) * duration
    seek(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100)
  }

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 lg:relative h-16 lg:h-20 bg-card border-t border-border flex items-center justify-center">
        {onMenuClick && (
          <Button variant="ghost" size="sm" className="absolute left-4 lg:hidden" onClick={onMenuClick}>
            <Menu className="w-5 h-5" />
          </Button>
        )}
        <p className="text-muted-foreground text-sm lg:text-base">No track selected</p>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 lg:relative h-16 lg:h-20 bg-card border-t border-border">
      {/* Mobile Layout */}
      <div className="lg:hidden flex items-center px-4 h-full gap-3">
        <Button variant="ghost" size="sm" onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
        </Button>

        <img
          src={currentTrack.coverUrl || "/placeholder.svg"}
          alt={currentTrack.title}
          className="w-10 h-10 rounded object-cover"
        />

        <div className="flex-1 min-w-0">
          <p className="font-medium truncate text-sm">{currentTrack.title}</p>
          <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
          {error && <p className="text-xs text-red-500 truncate">{error}</p>}
        </div>

        <div className="flex items-center gap-2">
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white",
              isPlaying && "animate-pulse",
            )}
            onClick={togglePlayPause}
            disabled={isLoading}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center px-4 gap-4 h-full">
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <img
            src={currentTrack.coverUrl || "/placeholder.svg"}
            alt={currentTrack.title}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div className="min-w-0">
            <p className="font-medium truncate">{currentTrack.title}</p>
            <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
            {error && <p className="text-xs text-red-500 truncate">{error}</p>}
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => skipBackward(10)}>
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white",
                isPlaying && "animate-pulse",
              )}
              onClick={togglePlayPause}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => skipForward(10)}>
              <SkipForward className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Repeat className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-muted-foreground w-10">{formatTime(currentTime)}</span>
            <Slider value={[progress]} onValueChange={handleProgressChange} max={100} step={0.1} className="flex-1" />
            <span className="text-xs text-muted-foreground w-10">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <Button variant="ghost" size="sm" onClick={toggleMute}>
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume * 100]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>
    </div>
  )
}
