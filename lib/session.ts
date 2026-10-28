import { cookies } from "next/headers";

// The API token lives in an httpOnly cookie: the browser sends it, page scripts can't read it.
const TOKEN_COOKIE = "session";
const THIRTY_DAYS = 60 * 60 * 24 * 30;

export async function getSessionToken() {
  return (await cookies()).get(TOKEN_COOKIE)?.value;
}

// Cookies can only be written from Server Actions and Route Handlers.
export async function setSessionToken(token: string) {
  (await cookies()).set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: THIRTY_DAYS,
  });
}

export async function clearSessionToken() {
  (await cookies()).delete(TOKEN_COOKIE);
}
