import { type NextRequest, NextResponse } from "next/server"
import { handleGoogleCallback } from "@/lib/auth/google"

export async function GET(request: NextRequest) {
  try {
    // Get the authorization code and state from the URL
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    if (!code || !state) {
      return NextResponse.redirect(new URL("/error?message=Missing+parameters", request.url))
    }

    // Exchange the code for tokens and get user info
    const result = await handleGoogleCallback(code, state)

    // Redirect to the dashboard with a success message
    return NextResponse.redirect(new URL("/dashboard?success=true", request.url))
  } catch (error) {
    console.error("Google OAuth callback error:", error)

    // Redirect to the error page
    return NextResponse.redirect(new URL(`/error?message=${encodeURIComponent((error as Error).message)}`, request.url))
  }
}
