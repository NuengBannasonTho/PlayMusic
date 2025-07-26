"use client"

import { Home, Search, Library, Music, FolderIcon as FolderMusic, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import type { ViewType } from "@/app/page"
import { cn } from "@/lib/utils"

interface SidebarProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

const navigationItems = [
  { id: "home" as ViewType, label: "Home", icon: Home },
  { id: "search" as ViewType, label: "Search", icon: Search },
  { id: "library" as ViewType, label: "Your Library", icon: Library },
  { id: "playlist" as ViewType, label: "Playlists", icon: Music },
  { id: "folders" as ViewType, label: "Music Folders", icon: FolderMusic },
]

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <Music className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">OpenMusic</h1>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={currentView === item.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-12",
                  currentView === item.id && "bg-red-600/10 text-red-600 hover:bg-red-600/20",
                )}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Button>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="w-full justify-start gap-3"
        >
          {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </div>
    </div>
  )
}
