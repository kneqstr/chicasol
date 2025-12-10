import { verifyAccessToken } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function requireAdmin(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  if (!token) return null;

  try {
    const payload = await verifyAccessToken(token);
    const roles = JSON.parse(payload.roles);
    return roles.includes("admin") ? payload : null;
  } catch {
    return null;
  }
}
