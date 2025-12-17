import { NextRequest, NextResponse } from "next/server";
import { refreshAccessToken, verifyAccessToken } from "./lib/auth";

const publicPaths = [
  "/",
  "/login",
  "/register",
  "/verify",
  "/complete-register",
  "/about",
  "/resources",
  "/blog",
  "/courses",
  "/payment/return",
];
const authPaths = ["/login", "/register", "/verify", "/complete-register"];
const oauthPaths = ["/api/oauth", "/api/oauth/callback", "/api/send"];

const publicApi = ["/api/wayforpay/callback"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicApi = publicApi.includes(pathname);
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const isAdminPath = pathname.startsWith("/admin");
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/"),
  );
  const isAuthPath = authPaths.includes(pathname);
  const isAPIPath = pathname.startsWith("/api/");
  const isOAuthPath = oauthPaths.some((path) => pathname.startsWith(path));

  if (isOAuthPath) {
    return NextResponse.next();
  }

  if (isPublicApi) {
    return NextResponse.next();
  }

  if (isAdminPath) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const { roles } = await verifyAccessToken(accessToken);

      const parserRoles = JSON.parse(roles);

      if (!parserRoles.includes("admin")) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (isAuthPath && accessToken) {
    try {
      await verifyAccessToken(accessToken);
      return NextResponse.redirect(new URL("/", request.url));
    } catch {}
  }

  if (isPublicPath && !isAuthPath) {
    return NextResponse.next();
  }

  if (!isPublicPath) {
    let isValidToken: boolean = false;
    let newAccessToken: string | undefined = undefined;

    if (accessToken) {
      try {
        await verifyAccessToken(accessToken);
        isValidToken = true;
      } catch {
        if (refreshToken) {
          const refreshResult = await refreshAccessToken(refreshToken);
          if (refreshResult.success) {
            isValidToken = true;
            newAccessToken = refreshResult.accessToken;
          }
        }
      }
    } else if (refreshToken) {
      const refreshResult = await refreshAccessToken(refreshToken);

      if (refreshResult.success) {
        isValidToken = true;
        newAccessToken = refreshResult.accessToken;
      }
    }

    if (isValidToken) {
      if (newAccessToken) {
        const response = NextResponse.next();
        response.cookies.set({
          name: "access_token",
          value: newAccessToken,
          httpOnly: true,
          maxAge: 15 * 60,
          path: "/",
          sameSite: "lax",
          secure: process.env.COOKIE_SECURE === "true",
        });
        return response;
      }
      return NextResponse.next();
    }

    if (isAPIPath) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
