import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY!, "base64");

if (encryptionKey.length !== 32) {
  throw new Error("ENCRYPTION_KEY must be 32 bytes after base64 decoding");
}

export async function encryptToken(token: string): Promise<string> {
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-cbc", encryptionKey, iv);

  let encrypted = cipher.update(token, "utf8", "base64");

  encrypted += cipher.final("base64");

  return `${iv.toString("base64")}:${encrypted}`;
}

export async function decryptToken(encryptedToken: string): Promise<string> {
  const [ivBase64, encryptedData] = encryptedToken.split(":");
  const iv = Buffer.from(ivBase64, "base64");
  const decipher = createDecipheriv("aes-256-cbc", encryptionKey, iv);

  let decrypted = decipher.update(encryptedData, "base64", "utf8");

  decrypted += decipher.final("utf8");

  return decrypted;
}