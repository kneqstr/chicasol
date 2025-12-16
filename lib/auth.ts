import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { connectDB } from "./db";
import sessionModel from "@/models/session.model";
import userModel, { IUser } from "@/models/user.model";

const ACCESS_SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!);
const REFRESH_SECRET = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET!);

export type JWTPayload = { sub: string; email: string; roles: string };
export type RefreshPayload = { sub: string };
export type SetCookiesProps = { accessToken: string; refreshToken: string };
export type RefreshResult = {
  success: boolean;
  accessToken?: string;
  error?: string;
  user?: { id: string; email: string };
};

export async function createAccessToken(
  payload: JWTPayload,
  expiresIn = process.env.JWT_ACCESS_EXPIRES || "15m",
) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(ACCESS_SECRET);
}

export async function createRefreshToken(
  payload: RefreshPayload,
  expiresIn = process.env.JWT_REFRESH_EXPIRES || "30d",
) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(REFRESH_SECRET);
}

export async function verifyAccessToken(token: string): Promise<JWTPayload> {
  return await jwtVerify(token, ACCESS_SECRET).then((r) => r.payload as JWTPayload);
}

export async function verifyRefreshToken(token: string): Promise<RefreshPayload> {
  return await jwtVerify(token, REFRESH_SECRET).then((r) => r.payload as RefreshPayload);
}

export async function setAuthCookies({ accessToken, refreshToken }: SetCookiesProps) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "access_token",
    value: accessToken,
    httpOnly: true,
    path: "/",
    maxAge: 15 * 60,
    sameSite: "lax",
    secure: process.env.COOKIE_SECURE === "true",
  });

  cookieStore.set({
    name: "refresh_token",
    value: refreshToken,
    httpOnly: true,
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
    sameSite: "lax",
    secure: process.env.COOKIE_SECURE === "true",
  });
}
export async function getCurrentUser(): Promise<IUser | null> {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) return null;

    const payload = await verifyAccessToken(accessToken);

    if (!payload?.sub) return null;

    const user = await userModel.findById(payload.sub);
    return user;
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) return { isAuth: false, isAdmin: false };

  try {
    const { roles } = await verifyAccessToken(accessToken);
    const parserRoles = JSON.parse(roles);

    return { isAuth: true, isAdmin: parserRoles.includes("admin") };
  } catch {
    return { isAuth: false, isAdmin: false };
  }
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
}

export async function hashToken(raw: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(raw);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

export async function refreshAccessToken(refreshToken: string): Promise<RefreshResult> {
  await connectDB();

  try {
    await verifyRefreshToken(refreshToken);

    const hashedRefreshToken = await hashToken(refreshToken);

    const session = await sessionModel
      .findOne({
        refreshToken: hashedRefreshToken,
        revoked: { $ne: true },
        expiresAt: { $gt: new Date() },
      })
      .populate("user");

    if (!session) {
      await clearAuthCookies();
      return { success: false, error: "Session not found" };
    }
    const user = session.user as IUser;

    const newAccessToken = await createAccessToken({
      sub: user._id.toString(),
      email: user.email,
      roles: JSON.stringify(user.roles),
    });

    return {
      success: true,
      accessToken: newAccessToken,
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    };
  } catch (e) {
    await clearAuthCookies();
    return { success: false, error: "Token refresh failed" };
  }
}
