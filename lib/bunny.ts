import crypto from "crypto";

const LIBRARY_ID = process.env.BUNNY_LIBRARY_ID!;
const TOKEN_KEY = process.env.BUNNY_STREAM_TOKEN!;

export function generateSecureVideoUrl(videoId: string, expiresInSeconds = 7200) {
  const expiration = Math.floor(Date.now() / 1000) + expiresInSeconds;

  const payload = `${TOKEN_KEY}${videoId}${expiration}`;

  const token = crypto.createHash("sha256").update(payload).digest("hex");

  const baseUrl = `https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${videoId}`;

  const params = new URLSearchParams({
    token,
    expires: expiration.toString(),
    autoplay: "false",
    loop: "false",
    muted: "false",
  });

  return `${baseUrl}?${params}`;
}
