import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Array of public routes that don't require authentication
const publicRoutes = [
  "/login",
  "/pricing",
  "/features",
  "/help",
  "/legal",
  "/terms",
  "/api/auth",
  "/api/schedule"
];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isPublicRoute = publicRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  // Allow access to public routes regardless of authentication status
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated and trying to access protected route
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)"  
  ]
};