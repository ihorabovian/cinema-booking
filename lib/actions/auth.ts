"use server";

import { redirect } from "next/navigation";
import { getSafeReturnPath } from "@/lib/auth";
import { createOtp, signIn, signOut } from "@/lib/cinema-api";
import { toE164Phone } from "@/lib/input-masks";
import { codeFormSchema, phoneFormSchema } from "@/lib/schemas/auth";
import { clearSessionToken, getSessionToken, setSessionToken } from "@/lib/session";

export type OtpResult = { ok: true; retryDelay: number } | { ok: false; error: string };

export async function requestOtp(phone: unknown): Promise<OtpResult> {
  const parsed = phoneFormSchema.safeParse({ phone });
  if (!parsed.success) {
    return { ok: false, error: "Enter a 10-digit phone number" };
  }

  try {
    const retryDelay = await createOtp(toE164Phone(parsed.data.phone));
    return { ok: true, retryDelay };
  } catch (error) {
    console.error(error);
    return { ok: false, error: "Couldn't send the code. Please try again" };
  }
}

// On success the user lands on the page that asked them to sign in.
export async function verifyOtp(
  phone: unknown,
  code: unknown,
  returnTo: string | undefined,
): Promise<{ error: string }> {
  const parsedPhone = phoneFormSchema.safeParse({ phone });
  const parsedCode = codeFormSchema.safeParse({ code });
  if (!parsedPhone.success || !parsedCode.success) {
    return { error: "Enter the code from the SMS" };
  }

  try {
    const token = await signIn(
      toE164Phone(parsedPhone.data.phone),
      Number(parsedCode.data.code),
    );
    await setSessionToken(token);
  } catch (error) {
    console.error(error);
    return { error: "Wrong or expired code" };
  }

  // redirect() works by throwing, so it stays outside the try block.
  redirect(getSafeReturnPath(returnTo));
}

export async function signOutUser() {
  const token = await getSessionToken();
  if (token) {
    // The local session ends even if the API can't be reached.
    await signOut(token).catch(console.error);
  }
  await clearSessionToken();
  redirect("/");
}
