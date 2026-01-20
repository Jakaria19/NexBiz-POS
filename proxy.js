import { NextResponse } from "next/server";

export function middleware(request) {
  const auth = request.cookies.get("auth")?.value;

  if (
    protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    if (!auth || auth !== "true") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/add-item/:path*", "/dashboard/:path*"],
};
