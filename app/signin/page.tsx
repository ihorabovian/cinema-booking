import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignInFlow } from "@/components/auth/sign-in-flow";
import { getCurrentUser, getSafeReturnPath } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign in · Cinema",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  // A signed-in user has nothing to do here.
  if (await getCurrentUser()) {
    redirect(getSafeReturnPath(next));
  }

  return <SignInFlow returnTo={next} />;
}
