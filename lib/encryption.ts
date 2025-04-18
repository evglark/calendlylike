"use server"

import { createCipheriv, createDecipheriv, randomBytes } from "crypto"

// In a production app, this would be a secure environment variable
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || randomBytes(32).toString("hex")

export async function encryptToken(token: string): Promise<string> {
  const iv = randomBytes(16)
  const cipher = createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY, "hex"), iv)

  let encrypted = cipher.update(token, "utf8", "hex")
  encrypted += cipher.final("hex")

  // Return IV + encrypted data
  return `${iv.toString("hex")}:${encrypted}`
}

export async function decryptToken(encryptedToken: string): Promise<string> {
  const [ivHex, encryptedData] = encryptedToken.split(":")
  const iv = Buffer.from(ivHex, "hex")
  const decipher = createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY, "hex"), iv)

  let decrypted = decipher.update(encryptedData, "hex", "utf8")
  decrypted += decipher.final("utf8")

  return decrypted
}
