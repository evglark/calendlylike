import { Button } from "@/components/ui/button"
import { Calendar, Clock, Share2 } from "lucide-react"
import NextLink from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-center">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <NextLink href="/" className="flex items-center space-x-2">
              <Calendar className="h-6 w-6" />
              <span className="font-bold">CalSync</span>
            </NextLink>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-2">
              <NextLink href="/dashboard">
                <Button variant="default">Dashboard</Button>
              </NextLink>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <section className="w-full max-w-7xl px-4 md:px-8">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Connect all your calendars in one place
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Connect multiple Google and Outlook calendars, view all your events in one place, and share your
                    availability with others.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <NextLink href="/dashboard">
                    <Button size="lg" className="gap-1">
                      <Calendar className="h-4 w-4" />
                      Get Started
                    </Button>
                  </NextLink>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col items-center gap-2 rounded-lg bg-muted p-4 text-center">
                    <Calendar className="h-10 w-10 text-primary" />
                    <h3 className="text-xl font-bold">Unified Calendar</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      View all your events from multiple accounts in one place
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg bg-muted p-4 text-center">
                    <Share2 className="h-10 w-10 text-primary" />
                    <h3 className="text-xl font-bold">Share Availability</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Generate links to share your free/busy status
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg bg-muted p-4 text-center">
                    <Clock className="h-10 w-10 text-primary" />
                    <h3 className="text-xl font-bold">Easy Booking</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Let others book meetings in your available slots
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg bg-muted p-4 text-center">
                    <NextLink className="h-10 w-10 text-primary" href="#"></NextLink>
                    <h3 className="text-xl font-bold">Multiple Accounts</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Connect unlimited Google and Microsoft calendars
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 CalSync. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
