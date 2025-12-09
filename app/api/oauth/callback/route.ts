import { NextResponse } from "next/server";
import { createAccessToken, createRefreshToken, setAuthCookies, hashToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import bcrypt from "bcrypt";
import User from "@/models/user.model";
import sessionModel from "@/models/session.model";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (!code) return NextResponse.redirect("/login?error=no_code");

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: "authorization_code",
    }),
  }).then((r) => r.json());

  const access_token = tokenRes.access_token;

  const profile = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then((r) => r.json());

  await connectDB();

  let user = await User.findOne({ email: profile.email });

  const hashedPassword = await bcrypt.hash(Math.random().toString(36), 12);

  if (!user) {
    user = await User.create({
      email: profile.email,
      password: hashedPassword,
      firstName: profile.given_name || profile.name,
      avatarUrl: profile.picture,
      roles: ["user"],
    });
  }

  const accessToken = await createAccessToken({
    sub: user._id.toString(),
    email: user.email,
    roles: JSON.stringify(user.roles),
  });
  const refreshToken = await createRefreshToken({ sub: user._id.toString() });

  const hashedRefreshToken = await hashToken(refreshToken);

  await sessionModel.create({
    user: user._id,
    refreshToken: hashedRefreshToken,
    expiresAt: new Date(Date.now() + 30 * 24 * 3600 * 1000),
  });

  await setAuthCookies({ accessToken, refreshToken });

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
}
