import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/resume"];
const authPaths = ["/login", "/register"];
const encoder = new TextEncoder();

function base64UrlToBytes(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);

  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function bytesToBase64Url(bytes: ArrayBuffer) {
  const binary = String.fromCharCode(...new Uint8Array(bytes));

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function verifyJwt(token: string) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return false;
  }

  const parts = token.split(".");

  if (parts.length !== 3) {
    return false;
  }

  try {
    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const header = JSON.parse(
      new TextDecoder().decode(base64UrlToBytes(encodedHeader)),
    );

    if (header.alg !== "HS256") {
      return false;
    }

    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(`${encodedHeader}.${encodedPayload}`),
    );

    if (bytesToBase64Url(signature) !== encodedSignature) {
      return false;
    }

    const payload = JSON.parse(
      new TextDecoder().decode(base64UrlToBytes(encodedPayload)),
    );
    const expiresAt = typeof payload.exp === "number" ? payload.exp : 0;

    return Boolean(payload.userId) && expiresAt * 1000 > Date.now();
  } catch {
    return false;
  }
}

function redirectToLogin(req: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", req.url));
  response.cookies.delete("token");
  return response;
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );
  const isAuthPage = authPaths.includes(pathname);

  if (!isProtected && !isAuthPage) {
    return NextResponse.next();
  }

  const hasValidSession = token ? await verifyJwt(token) : false;

  if (isProtected && !hasValidSession) {
    return redirectToLogin(req);
  }

  if (isAuthPage && hasValidSession) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/resume/:path*", "/login", "/register"],
};
