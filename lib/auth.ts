import { cache } from "react";
import { redirect } from "next/navigation";
import { getProfile } from "./cinema-api";
import { getSessionToken } from "./session";

// The signed-in user, or null. An expired or revoked token counts as signed out.
// cache() shares one lookup between the header and the page of the same request.
export const getCurrentUser = cache(async () => {
  const token = await getSessionToken();
  if (!token) return null;

  try {
    return { token, user: await getProfile(token) };
  } catch {
    return null;
  }
});

// Pages for signed-in users send everyone else to sign in, then back to the page.
export async function requireUser(returnTo: string) {
  const session = await getCurrentUser();
  if (!session) {
    redirect(getSignInHref(returnTo));
  }
  return session;
}

export function getSignInHref(returnTo: string) {
  return `/signin?${new URLSearchParams({ next: returnTo })}`;
}

// Only paths on this site: "//evil.com" or "https://..." would send the user away.
export function getSafeReturnPath(path: string | undefined) {
  return path?.startsWith("/") && !path.startsWith("//") ? path : "/";
}
