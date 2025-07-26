"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Folder, FolderOpen, Play, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { MusicFolder, Track } from "@/app/page"
import { cn } from "@/lib/utils"

interface MusicFoldersProps {
  folders: MusicFolder[]
  onPlayTrack: (track: Track) => void
}

interface FolderItemProps {
  folder: MusicFolder
  onPlayTrack: (track: Track) => void
  level?: number
}

function FolderItem({ folder, onPlayTrack, level = 0 }: FolderItemProps) {
  const [isOpen, setIsOpen] = useState(level === 0)
  const hasSubfolders = folder.subfolders.length > 0
  const hasTracks = folder.tracks.length > 0

  return (
    <div className="space-y-1">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn("w-full justify-start gap-2 h-10 font-normal hover:bg-accent", level > 0 && "ml-4")}
            style={{ paddingLeft: `${level * 16 + 12}px` }}
          >
            {hasSubfolders && (
              <>
                {isOpen ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                )}
              </>
            )}
            {isOpen ? (
              <FolderOpen className="w-4 h-4 text-red-600" />
            ) : (
              <Folder className="w-4 h-4 text-muted-foreground" />
            )}
            <span className="flex-1 text-left">{folder.name}</span>
            {hasTracks && (
              <span className="text-xs text-muted-foreground">
                {folder.tracks.length} track{folder.tracks.length !== 1 ? "s" : ""}
              </span>
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-1">
          {/* Render tracks in this folder */}
          {folder.tracks.map((track) => (
            <div
              key={track.id}
              className={cn(
                "flex items-center gap-3 p-2 rounded-md hover:bg-accent group cursor-pointer",
                level > 0 && "ml-4",
              )}
              style={{ paddingLeft: `${(level + 1) * 16 + 12}px` }}
              onClick={() => onPlayTrack(track)}
            >
              <div className="w-8 h-8 bg-muted rounded flex items-center justify-center group-hover:bg-red-600 transition-colors">
                <Music className="w-4 h-4 text-muted-foreground group-hover:text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate text-sm">{track.title}</p>
                <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
              </div>
              <span className="text-xs text-muted-foreground">{track.duration}</span>
              <Button
                size="sm"
                variant="ghost"
                className="w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 hover:text-white transition-all"
              >
                <Play className="w-3 h-3 ml-0.5" />
              </Button>
            </div>
          ))}

          {/* Render subfolders */}
          {folder.subfolders.map((subfolder) => (
            <FolderItem key={subfolder.id} folder={subfolder} onPlayTrack={onPlayTrack} level={level + 1} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export function MusicFolders({ folders, onPlayTrack }: MusicFoldersProps) {
  const totalTracks = folders.reduce((total, folder) => {
    const countTracks = (f: MusicFolder): number => {
      return f.tracks.length + f.subfolders.reduce((sum, sub) => sum + countTracks(sub), 0)
    }
    return total + countTracks(folder)
  }, 0)

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">Music Folders</h1>
        <p className="text-muted-foreground">Organize your music collection • {totalTracks} total tracks</p>
      </div>

      <div className="grid gap-4 lg:gap-6">
        {folders.map((folder) => (
          <Card key={folder.id} className="overflow-hidden">
            <CardContent className="p-0">
              <FolderItem folder={folder} onPlayTrack={onPlayTrack} />
            </CardContent>
          </Card>
        ))}
      </div>

      {folders.length === 0 && (
        <div className="text-center py-12">
          <Folder className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No folders found</h2>
          <p className="text-muted-foreground">Create folders to organize your music collection</p>
        </div>
      )}
    </div>
  )
}
