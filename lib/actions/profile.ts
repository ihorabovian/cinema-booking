"use server";

import { refresh } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { toProfileInput } from "@/lib/booking";
import { updateProfile } from "@/lib/cinema-api";
import { profileSchema } from "@/lib/schemas/auth";

export type ProfileResult = { ok: true } | { ok: false; error: string };

export async function saveProfile(values: unknown): Promise<ProfileResult> {
  const session = await getCurrentUser();
  if (!session) {
    return { ok: false, error: "Your session has expired. Sign in again" };
  }

  const parsed = profileSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: "Check your details and try again" };
  }

  try {
    await updateProfile(session.token, toProfileInput(parsed.data));
  } catch (error) {
    console.error(error);
    return { ok: false, error: "Couldn't save your details. Please try again" };
  }

  // The header and checkout read the profile too.
  refresh();
  return { ok: true };
}
