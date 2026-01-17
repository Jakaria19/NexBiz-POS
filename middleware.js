import { NextResponse } from "next/server";

export function middleware(request) {
  const auth = request.cookies.get("auth")?.value;
  const role = request.cookies.get("role")?.value;

  if (!auth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Manager restrictions
  if (
    role === "manager" &&
    (request.nextUrl.pathname === "/summary" ||
      request.nextUrl.pathname.includes("edit") ||
      request.nextUrl.pathname.includes("delete"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/products/:path*",
    "/sales/:path*",
    "/customers/:path*",
    "/dealers/:path*",
    "/summary/:path*",
  ],
};
