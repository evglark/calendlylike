"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Plus, Trash2 } from "lucide-react"
import { generateShareLink } from "@/lib/share-links"

type ShareLink = {
  id: string
  name: string
  url: string
  calendarId: string
}

export function ShareLinks() {
  const [shareLinks, setShareLinks] = useState<ShareLink[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newLinkName, setNewLinkName] = useState("")
  const [selectedCalendar, setSelectedCalendar] = useState("")

  const handleCreateLink = async () => {
    if (!newLinkName || !selectedCalendar) return

    try {
      const linkId = await generateShareLink(selectedCalendar)

      // In a real app, we would get the actual link from the backend
      const newLink = {
        id: linkId || `link-${Date.now()}`,
        name: newLinkName,
        url: `https://calsync.app/share/${linkId || `link-${Date.now()}`}`,
        calendarId: selectedCalendar,
      }

      setShareLinks([...shareLinks, newLink])
      setNewLinkName("")
      setSelectedCalendar("")
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Failed to create share link", error)
    }
  }

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url)
    // In a real app, we would show a toast notification
  }

  const handleDeleteLink = (id: string) => {
    setShareLinks(shareLinks.filter((link) => link.id !== id))
    // In a real app, we would also delete the link from the backend
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Links</CardTitle>
        <CardDescription>Create links to share your availability with others.</CardDescription>
      </CardHeader>
      <CardContent>
        {shareLinks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="mb-4 text-sm text-muted-foreground">No share links created yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {shareLinks.map((link) => (
              <div key={link.id} className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="text-sm font-medium">{link.name}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[180px]">{link.url}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleCopyLink(link.url)}>
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy link</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteLink(link.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete link</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Create Share Link
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Share Link</DialogTitle>
              <DialogDescription>Create a link to share your availability with others.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Link Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Meeting Availability"
                  value={newLinkName}
                  onChange={(e) => setNewLinkName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="calendar">Calendar for Bookings</Label>
                <Select value={selectedCalendar} onValueChange={setSelectedCalendar}>
                  <SelectTrigger id="calendar">
                    <SelectValue placeholder="Select a calendar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="calendar-1">Work Calendar (Google)</SelectItem>
                    <SelectItem value="calendar-2">Personal Calendar (Google)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">New bookings will be created in this calendar.</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateLink}>Create Link</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
