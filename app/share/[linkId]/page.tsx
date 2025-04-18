import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default function SharePage({ params }: { params: { linkId: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <Calendar className="h-6 w-6" />
              <span className="font-bold">CalSync</span>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>John Doe's Availability</CardTitle>
              <CardDescription>Select a time slot to book a meeting.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium">Select a date</h3>
                    <div className="border rounded-md p-4">
                      {/* This would be replaced with an actual date picker */}
                      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium mb-2">
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div
                            key={i}
                            className={`text-center p-2 text-sm rounded-md ${
                              i === 15 ? "bg-primary text-primary-foreground" : "hover:bg-muted cursor-pointer"
                            }`}
                          >
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium">Available time slots</h3>
                    <div className="border rounded-md p-4 flex flex-col gap-2">
                      {[
                        "9:00 AM - 9:30 AM",
                        "10:00 AM - 10:30 AM",
                        "11:00 AM - 11:30 AM",
                        "2:00 PM - 2:30 PM",
                        "3:00 PM - 3:30 PM",
                      ].map((slot, i) => (
                        <Button key={i} variant={i === 2 ? "default" : "outline"} className="justify-start gap-2">
                          <Clock className="h-4 w-4" />
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6">
              <Button variant="outline">Cancel</Button>
              <Button>Confirm Booking</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
