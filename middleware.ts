import { type NextRequest, NextResponse } from "next/server"
import { decrypt } from "@/lib/auth"

const protectedRoutes = ["/dashboard"]
const publicRoutes = ["/login", "/", "/api"]

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route))

  // Get session from cookie
  const cookie = req.cookies.get("session")?.value

  let session = null
  if (cookie) {
    try {
      session = await decrypt(cookie)
    } catch (error) {
      // Invalid session
    }
  }

  // Check if session is valid and not expired
  const isAuthenticated = session && new Date(session.expiresAt) > new Date()

  // Redirect to login if accessing protected route without valid session
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }

  // Redirect to dashboard if accessing login with valid session
  if (path.startsWith("/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
