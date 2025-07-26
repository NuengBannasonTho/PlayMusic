"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import type { Track } from "@/app/page"

interface AudioPlayerState {
  currentTrack: Track | null
  isPlaying: boolean
  isLoading: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  error: string | null
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [state, setState] = useState<AudioPlayerState>({
    currentTrack: null,
    isPlaying: false,
    isLoading: false,
    currentTime: 0,
    duration: 0,
    volume: 0.75,
    isMuted: false,
    error: null,
  })

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.preload = "metadata"

    const audio = audioRef.current

    const handleLoadStart = () => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))
    }

    const handleLoadedMetadata = () => {
      setState((prev) => ({
        ...prev,
        duration: audio.duration || 0,
        isLoading: false,
      }))
    }

    const handleTimeUpdate = () => {
      setState((prev) => ({
        ...prev,
        currentTime: audio.currentTime || 0,
      }))
    }

    const handlePlay = () => {
      setState((prev) => ({ ...prev, isPlaying: true }))
    }

    const handlePause = () => {
      setState((prev) => ({ ...prev, isPlaying: false }))
    }

    const handleEnded = () => {
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        currentTime: 0,
      }))
    }

    const handleError = () => {
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        isLoading: false,
        error: "Failed to load audio file",
      }))
    }

    const handleCanPlay = () => {
      setState((prev) => ({ ...prev, isLoading: false }))
    }

    // Add event listeners
    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)
    audio.addEventListener("canplay", handleCanPlay)

    return () => {
      // Cleanup event listeners
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("canplay", handleCanPlay)

      audio.pause()
      audio.src = ""
    }
  }, [])

  // Update volume when state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.isMuted ? 0 : state.volume
    }
  }, [state.volume, state.isMuted])

  const loadTrack = useCallback((track: Track) => {
    if (!audioRef.current) return

    const audio = audioRef.current

    // Stop current playback
    audio.pause()
    audio.currentTime = 0

    // Load new track
    audio.src = track.audioUrl

    setState((prev) => ({
      ...prev,
      currentTrack: track,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      error: null,
    }))
  }, [])

  const play = useCallback(async () => {
    if (!audioRef.current || !state.currentTrack) return

    try {
      await audioRef.current.play()
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to play audio",
        isPlaying: false,
      }))
    }
  }, [state.currentTrack])

  const pause = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.pause()
  }, [])

  const togglePlayPause = useCallback(() => {
    if (state.isPlaying) {
      pause()
    } else {
      play()
    }
  }, [state.isPlaying, play, pause])

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = time
    setState((prev) => ({ ...prev, currentTime: time }))
  }, [])

  const setVolume = useCallback((volume: number) => {
    setState((prev) => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) }))
  }, [])

  const toggleMute = useCallback(() => {
    setState((prev) => ({ ...prev, isMuted: !prev.isMuted }))
  }, [])

  const skipForward = useCallback(
    (seconds = 10) => {
      if (!audioRef.current) return
      const newTime = Math.min(audioRef.current.currentTime + seconds, state.duration)
      seek(newTime)
    },
    [seek, state.duration],
  )

  const skipBackward = useCallback(
    (seconds = 10) => {
      if (!audioRef.current) return
      const newTime = Math.max(audioRef.current.currentTime - seconds, 0)
      seek(newTime)
    },
    [seek],
  )

  return {
    ...state,
    loadTrack,
    play,
    pause,
    togglePlayPause,
    seek,
    setVolume,
    toggleMute,
    skipForward,
    skipBackward,
  }
}
