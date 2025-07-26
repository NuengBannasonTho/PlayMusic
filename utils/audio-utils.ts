export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00"

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export function calculateProgress(currentTime: number, duration: number): number {
  if (!duration || duration === 0) return 0
  return (currentTime / duration) * 100
}

// Generate demo audio URLs (you can replace these with real audio files)
export function getDemoAudioUrl(trackId: string): string {
  // Using different demo audio files for each track
  const demoUrls = {
    "1": "/UFO.mp3",
    "2": "/ดาวหางฮลเลย.mp3",
    "3": "/อยากนอนกับเธอ.mp3",
    "4": "/หนุ่มโคราช.mp3",
    "5": "/หนุ่มโคราช.mp3", // Local demo audio
  }

  // Fallback to a default demo audio or generate a tone
  return demoUrls[trackId as keyof typeof demoUrls] || generateToneUrl(440, 30)
}

// Generate a simple tone for demo purposes
export function generateToneUrl(frequency = 440, duration = 30): string {
  // This creates a data URL with a simple sine wave tone
  const sampleRate = 44100
  const samples = sampleRate * duration
  const buffer = new ArrayBuffer(44 + samples * 2)
  const view = new DataView(buffer)

  // WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i))
    }
  }

  writeString(0, "RIFF")
  view.setUint32(4, 36 + samples * 2, true)
  writeString(8, "WAVE")
  writeString(12, "fmt ")
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeString(36, "data")
  view.setUint32(40, samples * 2, true)

  // Generate sine wave
  for (let i = 0; i < samples; i++) {
    const sample = Math.sin((2 * Math.PI * frequency * i) / sampleRate) * 0.3
    view.setInt16(44 + i * 2, sample * 32767, true)
  }

  const blob = new Blob([buffer], { type: "audio/wav" })
  return URL.createObjectURL(blob)
}
