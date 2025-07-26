"use client"

import { useEffect, useRef } from "react"

interface AudioVisualizerProps {
  isPlaying: boolean
  className?: string
}

export function AudioVisualizer({ isPlaying, className = "" }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const bars = 20
    const barWidth = canvas.width / bars
    let heights = Array(bars)
      .fill(0)
      .map(() => Math.random() * 50 + 10)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (isPlaying) {
        // Animate bars when playing
        heights = heights.map((height, index) => {
          const target = Math.random() * 40 + 10
          return height + (target - height) * 0.1
        })
      } else {
        // Gradually reduce bars when paused
        heights = heights.map((height) => Math.max(2, height * 0.95))
      }

      // Draw bars
      heights.forEach((height, index) => {
        const x = index * barWidth
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - height)
        gradient.addColorStop(0, "#dc2626")
        gradient.addColorStop(1, "#ef4444")

        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.height - height, barWidth - 2, height)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  return <canvas ref={canvasRef} width={200} height={60} className={`${className}`} />
}
