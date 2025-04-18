import { type NextRequest, NextResponse } from "next/server"
import { getAvailability } from "@/lib/share-links"

export async function GET(request: NextRequest, { params }: { params: { linkId: string } }) {
  try {
    const searchParams = request.nextUrl.searchParams
    const date = searchParams.get("date")

    if (!date) {
      return NextResponse.json({ error: "Date parameter is required" }, { status: 400 })
    }

    const availability = await getAvailability(params.linkId, date)

    return NextResponse.json({ availability })
  } catch (error) {
    console.error("Error fetching availability:", error)

    return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 })
  }
}
