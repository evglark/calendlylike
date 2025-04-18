import { type NextRequest, NextResponse } from "next/server"
import { createBooking } from "@/lib/share-links"

export async function POST(request: NextRequest, { params }: { params: { linkId: string } }) {
  try {
    const body = await request.json()
    const { start, end, name, email, notes } = body

    if (!start || !end || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const booking = await createBooking(params.linkId, start, end, {
      name,
      email,
      notes,
    })

    return NextResponse.json({ booking })
  } catch (error) {
    console.error("Error creating booking:", error)

    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
