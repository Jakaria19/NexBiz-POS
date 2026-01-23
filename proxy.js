import { NextResponse } from "next/server";

export function proxy(request) {
  const auth = request.cookies.get("auth")?.value;
  const role = request.cookies.get("role")?.value;

  const protectedPaths = [
    "/dashboard",
    "/products",
    "/sales",
    "/customers",
    "/dealers",
    "/dues",
    "/salesmen",
    "/summary",
    "/collections",
    "/payments",
  ];

  if (
    protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    if (!auth) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (role === "manager" && request.nextUrl.pathname.startsWith("/summary")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
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
    "/dues/:path*",
    "/salesmen/:path*",
    "/summary/:path*",
    "/collections/:path*",
    "/payments/:path*",
  ],
};
