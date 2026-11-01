import type { CancelResult } from "../orders";

// Storybook replaces the Server Action with this, so stories never return real tickets.
export async function cancelOrder(): Promise<CancelResult> {
  return { ok: true };
}
