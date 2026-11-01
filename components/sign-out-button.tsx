"use client";

import { ConfirmDialog } from "./confirm-dialog";
import { signOutUser } from "@/lib/actions/auth";

// Wraps any button: the header's "Sign out" and the profile's.
export function SignOutButton({ children }: { children: React.ReactNode }) {
  return (
    <ConfirmDialog
      title="Are you sure you want to sign out?"
      confirmLabel="Sign out"
      cancelLabel="Cancel"
      confirmVariant="default"
      onConfirm={signOutUser}
    >
      {children}
    </ConfirmDialog>
  );
}
