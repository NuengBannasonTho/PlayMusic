"use client"

import { Home, Search, Library, Music, FolderIcon as FolderMusic, Moon, Sun, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import type { ViewType } from "@/app/page"
import { cn } from "@/lib/utils"

interface MobileSidebarProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
  isOpen: boolean
  onClose: () => void
}

const navigationItems = [
  { id: "home" as ViewType, label: "Home", icon: Home },
  { id: "search" as ViewType, label: "Search", icon: Search },
  { id: "library" as ViewType, label: "Your Library", icon: Library },
  { id: "playlist" as ViewType, label: "Playlists", icon: Music },
  { id: "folders" as ViewType, label: "Music Folders", icon: FolderMusic },
]

export function MobileSidebar({ currentView, onViewChange, isOpen, onClose }: MobileSidebarProps) {
  const { theme, setTheme } = useTheme()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 lg:hidden transform transition-transform duration-300 ease-in-out">
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">OpenMusic</h1>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
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
                  onClick={() => {
                    onViewChange(item.id)
                    onClose()
                  }}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Button>
              )
            })}
          </nav>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
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
    </>
  )
}
