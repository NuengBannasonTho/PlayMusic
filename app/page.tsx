"use client"

import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { MusicPlayer } from "@/components/music-player"
import { MainContent } from "@/components/main-content"
import { SearchView } from "@/components/search-view"
import { LibraryView } from "@/components/library-view"
import { PlaylistView } from "@/components/playlist-view"
import { MusicFolders } from "@/components/music-folders"
import { useAudioPlayer } from "@/hooks/use-audio-player"
import { getDemoAudioUrl } from "@/utils/audio-utils"

export type ViewType = "home" | "search" | "library" | "playlist" | "folders"

export interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  coverUrl: string
  audioUrl: string
  folderId: string
}

export interface Playlist {
  id: string
  name: string
  tracks: Track[]
  coverUrl: string
}

export interface MusicFolder {
  id: string
  name: string
  tracks: Track[]
  subfolders: MusicFolder[]
  parentId?: string
}

const mockFolders: MusicFolder[] = [
  {
    id: "1",
    name: "Rock",
    tracks: [],
    subfolders: [
      {
        id: "1-1",
        name: "Classic Rock",
        tracks: [
          {
            id: "1",
            title: "เพลง: ยานอวกาศ",
            artist: "YOUNGGU Ft. YOUNGOHM, M-FLOW, DOPER DOPER, & SONOFO",
            album: "A Night at the Opera",
            duration: "5:55",
            coverUrl: "/rat_memes_1.jpg",
            audioUrl: getDemoAudioUrl("1"),
            folderId: "1-1",
          },
          {
            id: "2",
            title: "เพลง: ดาวหางฮัลเลย์",
            artist: "Gavin-D",
            album: "Led Zeppelin IV",
            duration: "8:02",
            coverUrl: "/dog_memes_1.jpg",
            audioUrl: getDemoAudioUrl("2"),
            folderId: "1-1",
          },
        ],
        subfolders: [],
        parentId: "1",
      },
      {
        id: "1-2",
        name: "Alternative Rock",
        tracks: [
          {
            id: "3",
            title: "เพลง: อยากนอนกับเธอ",
            artist: "เด็กเลี้ยงควาย",
            album: "Hotel California",
            duration: "6:30",
            coverUrl: "/f9fa72bc4e11357047c5cfb5f07364ba.jpg",
            audioUrl: getDemoAudioUrl("3"),
            folderId: "1-2",
          },
        ],
        subfolders: [],
        parentId: "1",
      },
    ],
  },
  {
    id: "2",
    name: "Thai Indie",
    tracks: [
      {
        id: "5",
        title: "เพลง: หนุ่มโคราช",
        artist: "NA You know me.",
        album: "Single",
        duration: "4:32",
        coverUrl: "/46e3fb6897abdeda7736efe243d1460e.jpg",
        audioUrl: getDemoAudioUrl("5"),
        folderId: "2",
      },
    ],
    subfolders: [],
  },
  // {
  //   id: "3",
  //   name: "Pop",
  //   tracks: [
  //     {
  //       id: "4",
  //       title: "Imagine",
  //       artist: "John Lennon",
  //       album: "Imagine",
  //       duration: "3:07",
  //       coverUrl: "/dog_memes_1.jpg",
  //       audioUrl: getDemoAudioUrl("4"),
  //       folderId: "3",
  //     },
  //   ],
  //   subfolders: [],
  // },
  {
    id: "4",
    name: "Jazz",
    tracks: [],
    subfolders: [
      {
        id: "4-1",
        name: "Smooth Jazz",
        tracks: [],
        subfolders: [],
        parentId: "4",
      },
      {
        id: "4-2",
        name: "Bebop",
        tracks: [],
        subfolders: [],
        parentId: "4",
      },
    ],
  },
]

// Flatten all tracks from folders
const getAllTracks = (folders: MusicFolder[]): Track[] => {
  const tracks: Track[] = []

  const extractTracks = (folder: MusicFolder) => {
    tracks.push(...folder.tracks)
    folder.subfolders.forEach(extractTracks)
  }

  folders.forEach(extractTracks)
  return tracks
}

const mockTracks = getAllTracks(mockFolders)

const mockPlaylists: Playlist[] = [
  {
    id: "1",
    name: "Rock Classics",
    tracks: mockTracks.slice(0, 2),
    coverUrl: "/dog_memes_1.jpg",
  },
  {
    id: "2",
    name: "Chill Vibes",
    tracks: mockTracks.slice(2, 4),
    coverUrl: "/dog_memes_1.jpg",
  },
]

export default function Component() {
  const [currentView, setCurrentView] = useState<ViewType>("home")
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const audioPlayer = useAudioPlayer()

  const handlePlayTrack = (track: Track) => {
    audioPlayer.loadTrack(track)
    audioPlayer.play()
  }

  const handlePlayPlaylist = (playlist: Playlist) => {
    setCurrentPlaylist(playlist)
    if (playlist.tracks.length > 0) {
      handlePlayTrack(playlist.tracks[0])
    }
  }

  const renderContent = () => {
    switch (currentView) {
      case "search":
        return <SearchView tracks={mockTracks} onPlayTrack={handlePlayTrack} />
      case "library":
        return (
          <LibraryView
            tracks={mockTracks}
            playlists={mockPlaylists}
            onPlayTrack={handlePlayTrack}
            onPlayPlaylist={handlePlayPlaylist}
          />
        )
      case "playlist":
        return <PlaylistView playlists={mockPlaylists} onPlayPlaylist={handlePlayPlaylist} />
      case "folders":
        return <MusicFolders folders={mockFolders} onPlayTrack={handlePlayTrack} />
      default:
        return (
          <MainContent
            tracks={mockTracks}
            playlists={mockPlaylists}
            onPlayTrack={handlePlayTrack}
            onPlayPlaylist={handlePlayPlaylist}
          />
        )
    }
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="music-app-theme">
      <div className="flex h-screen bg-background text-foreground overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto pb-20 lg:pb-0">{renderContent()}</div>
          <MusicPlayer audioPlayer={audioPlayer} onMenuClick={() => setIsSidebarOpen(true)} />
        </main>
      </div>
    </ThemeProvider>
  )
}
