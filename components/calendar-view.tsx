"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye } from "lucide-react"
import { fetchCalendarEvents } from "@/lib/calendar"

// This would be replaced with the actual FullCalendar component
// For the MVP, we're showing a simplified calendar view
export function CalendarView() {
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState<any[]>([])
  const [isPublicView, setIsPublicView] = useState(false)

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true)
        const calendarEvents = await fetchCalendarEvents()
        setEvents(calendarEvents || [])
      } catch (error) {
        console.error("Failed to fetch calendar events", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadEvents()
  }, [])

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>View and manage your events from all connected calendars.</CardDescription>
        </div>
        <Button
          variant={isPublicView ? "default" : "outline"}
          size="sm"
          className="gap-2"
          onClick={() => setIsPublicView(!isPublicView)}
        >
          <Eye className="h-4 w-4" />
          {isPublicView ? "Viewing as Recipient" : "View as Recipient"}
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-[500px] items-center justify-center">
            <p className="text-muted-foreground">Loading calendar...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="flex h-[500px] flex-col items-center justify-center text-center">
            <p className="mb-2 text-lg font-medium">No events to display</p>
            <p className="text-sm text-muted-foreground">Connect a calendar account to see your events here.</p>
          </div>
        ) : (
          <div className="h-[500px] border rounded-md p-4">
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium mb-2">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className="grid grid-cols-7 gap-1 h-[450px]">
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="border rounded-md p-1 h-full overflow-hidden">
                  <div className="text-xs font-medium mb-1">{i + 1}</div>
                  {i % 7 === 2 && (
                    <div className="text-xs p-1 mb-1 rounded bg-blue-100 dark:bg-blue-900 truncate">
                      {isPublicView ? "Busy" : "Team Meeting"}
                    </div>
                  )}
                  {i % 7 === 4 && (
                    <div className="text-xs p-1 mb-1 rounded bg-green-100 dark:bg-green-900 truncate">
                      {isPublicView ? "Busy" : "Client Call"}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
