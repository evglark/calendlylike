"use server"

import { cookies } from "next/headers"
import { encryptToken } from "@/lib/encryption"

// Google OAuth configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ""
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ""
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`

const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
]

export async function connectGoogleCalendar() {
  const state = Math.random().toString(36).substring(2)
  const cookieStore = await cookies();

  // Store state in cookies for verification later
  cookieStore.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
  })

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth")
  authUrl.searchParams.append("client_id", GOOGLE_CLIENT_ID)
  authUrl.searchParams.append("redirect_uri", REDIRECT_URI)
  authUrl.searchParams.append("response_type", "code")
  authUrl.searchParams.append("scope", SCOPES.join(" "))
  authUrl.searchParams.append("access_type", "offline")
  authUrl.searchParams.append("prompt", "consent")
  authUrl.searchParams.append("state", state)

  return { url: authUrl.toString() }
}

export async function handleGoogleCallback(code: string, state: string) {
  const cookieStore = await cookies();
  const storedState = cookieStore.get("oauth_state")?.value;

  if (!storedState || storedState !== state) {
    throw new Error("Invalid state parameter")
  }

  // Exchange code for tokens
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  })

  if (!tokenResponse.ok) {
    throw new Error("Failed to exchange code for tokens")
  }

  const tokens = await tokenResponse.json()

  // Encrypt tokens before storing
  const encryptedAccessToken = await encryptToken(tokens.access_token)
  const encryptedRefreshToken = tokens.refresh_token ? await encryptToken(tokens.refresh_token) : null

  // Store encrypted tokens in database
  // In a real app, we would store these in Vercel KV or Supabase

  // Get user info to identify the account
  const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
    },
  })

  if (!userInfoResponse.ok) {
    throw new Error("Failed to fetch user info")
  }

  const userInfo = await userInfoResponse.json()
  console.log("User Info:", userInfo);

  // Return user info and token expiration
  return {
    email: userInfo.email,
    name: userInfo.name,
    picture: userInfo.picture,
    expiresIn: tokens.expires_in,
  }
}
