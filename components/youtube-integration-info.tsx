"use client"

import { ExternalLink, AlertCircle, Music, Download } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function YouTubeIntegrationInfo() {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6">Music Integration Guide</h1>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>YouTube Limitation:</strong> Due to YouTube's terms of service, we cannot directly extract audio
            from YouTube videos. Here are the recommended alternatives for adding real music to your application.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-5 h-5 text-red-600" />
                Legal Music Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Streaming APIs</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Spotify Web API</li>
                  <li>• Apple Music API</li>
                  <li>• SoundCloud API</li>
                  <li>• Deezer API</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Free Music Libraries</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Freesound.org</li>
                  <li>• Internet Archive</li>
                  <li>• Creative Commons Music</li>
                  <li>• Jamendo</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-red-600" />
                Implementation Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">For Development</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use demo audio files</li>
                  <li>• Generate synthetic tones</li>
                  <li>• Use royalty-free samples</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">For Production</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• License music properly</li>
                  <li>• Use streaming service APIs</li>
                  <li>• Host your own audio files</li>
                  <li>• Implement user uploads</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Current Demo: ดาวหางฮัลเลย์ (Halley's Comet)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Halley's Comet"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">fellowfellowband - ดาวvsxvxvxหางฮัลเลย์ (Halley's Comet)</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  This track has been added to the "Thai Indie" folder as a demo entry with generated audio.
                </p>
                <p className="text-sm text-muted-foreground mb-4">To use the actual song, you would need to:</p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Obtain the audio file legally</li>
                  <li>• Host it on your server</li>
                  <li>• Update the audioUrl in the track data</li>
                </ul>
                <Button variant="outline" size="sm" asChild>
                  <a href="app/audios/หนุ่มโคราช.mp3" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Original on YouTube
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Code Example: Adding Real Audio</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
              {`// Example: Replace demo audio with real files
const realAudioUrls = {
  "5": "/audio/halley-comet.mp3", // Your hosted audio file
  // or
  "5": "https://your-cdn.com/music/halley-comet.mp3"
}

// Update the track data
{
  id: "5",
  title: "ดาวหางฮัลเลย์ (Halley's Comet)",
  artist: "fellowfellowband",
  album: "Single",
  duration: "4:32",
  coverUrl: "/images/halley-comet-cover.jpg",
  audioUrl: realAudioUrls["5"], // Real audio URL
  folderId: "2",
}`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
