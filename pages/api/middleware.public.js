import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
  const res = NextResponse.next();

  res.cookies.set("cookieName", "cookieValue", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  return res;
}
