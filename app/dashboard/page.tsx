import { CalendarView } from "@/components/calendar-view"
import { ConnectedAccounts } from "@/components/connected-accounts"
import { DashboardHeader } from "@/components/dashboard-header"
import { ShareLinks } from "@/components/share-links"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="container mx-auto py-6">
        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <div className="flex flex-col gap-6">
            <ConnectedAccounts />
            <ShareLinks />
          </div>
          <div>
            <CalendarView />
          </div>
        </div>
      </div>
    </div>
  )
}
