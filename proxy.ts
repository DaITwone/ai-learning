// proxy.ts
import authConfig from "@/auth.config"
import NextAuth from "next-auth"

const { auth } = NextAuth(authConfig)

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/signup")

  if (!isLoggedIn && !isAuthPage) {
    return Response.redirect(new URL("/login", req.url))
  }

  if (isLoggedIn && isAuthPage) {
    return Response.redirect(new URL("/", req.url))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}