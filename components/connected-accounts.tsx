"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChromeIcon as Google, Mail } from "lucide-react"
import { connectGoogleCalendar } from "@/lib/auth/google"

export function ConnectedAccounts() {
  const [accounts, setAccounts] = useState<{ id: string; type: string; email: string }[]>([])

  const handleConnectGoogle = async () => {
    try {
      await connectGoogleCalendar()
      // In a real app, we would update the accounts state after successful connection
    } catch (error) {
      console.error("Failed to connect Google Calendar", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Accounts</CardTitle>
        <CardDescription>Connect your calendar accounts to view all events in one place.</CardDescription>
      </CardHeader>
      <CardContent>
        {accounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="mb-4 text-sm text-muted-foreground">No accounts connected yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {accounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-3">
                  {account.type === "google" ? <Google className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
                  <div>
                    <p className="text-sm font-medium">{account.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {account.type === "google" ? "Google Calendar" : "Outlook"}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Disconnect
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full gap-2" onClick={handleConnectGoogle}>
          <Google className="h-4 w-4" />
          Connect Google Calendar
        </Button>
        <Button className="w-full gap-2" variant="outline" disabled>
          <Mail className="h-4 w-4" />
          Connect Outlook (Coming Soon)
        </Button>
      </CardFooter>
    </Card>
  )
}
