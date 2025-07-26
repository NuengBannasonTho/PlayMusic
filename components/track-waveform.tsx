"use client"

import { useEffect, useRef } from "react"

interface TrackWaveformProps {
  progress: number
  isPlaying: boolean
  className?: string
}

export function TrackWaveform({ progress, isPlaying, className = "" }: TrackWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerY = height / 2

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Generate waveform data (simplified)
    const points = 100
    const waveform = Array(points)
      .fill(0)
      .map((_, i) => {
        return Math.sin(i * 0.1) * 20 + Math.random() * 10 - 5
      })

    // Draw background waveform
    ctx.strokeStyle = "#374151"
    ctx.lineWidth = 2
    ctx.beginPath()
    waveform.forEach((point, i) => {
      const x = (i / points) * width
      const y = centerY + point
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.stroke()

    // Draw progress waveform
    const progressWidth = (progress / 100) * width
    ctx.strokeStyle = "#dc2626"
    ctx.lineWidth = 2
    ctx.beginPath()
    waveform.forEach((point, i) => {
      const x = (i / points) * width
      if (x > progressWidth) return
      const y = centerY + point
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.stroke()

    // Draw progress indicator
    ctx.fillStyle = "#dc2626"
    ctx.beginPath()
    ctx.arc(progressWidth, centerY, 4, 0, 2 * Math.PI)
    ctx.fill()
  }, [progress, isPlaying])

  return <canvas ref={canvasRef} width={300} height={60} className={`${className} cursor-pointer`} />
}
