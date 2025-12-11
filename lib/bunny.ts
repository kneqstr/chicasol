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

export async function uploadToBunnyCDN(file: File, path: string) {
  const apiKey = process.env.BUNNY_STORAGE_API_KEY!;
  const endpoint = process.env.BUNNY_STORAGE_ENDPOINT!;
  const cdnHostname = process.env.BUNNY_CDN_HOSTNAME!;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const url = `${endpoint}/${path}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      AccessKey: apiKey,
      "Content-Type": file.type || "application/octet-stream",
    },
    body: buffer,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Bunny upload failed: ${res.status} - ${text}`);
  }

  return `${cdnHostname}/${path}`;
}
