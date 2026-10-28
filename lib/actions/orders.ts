"use server";

import { refresh, updateTag } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { cancelCinemaOrder, getFilmHallsTag } from "@/lib/cinema-api";

export type CancelResult = { ok: true } | { ok: false; error: string };

export async function cancelOrder(orderId: string, filmId: string): Promise<CancelResult> {
  const session = await getCurrentUser();
  if (!session) {
    return { ok: false, error: "Your session has expired. Sign in again" };
  }

  try {
    // The API checks that the order belongs to the token's user.
    await cancelCinemaOrder(session.token, orderId);
  } catch (error) {
    console.error(error);
    return { ok: false, error: "Couldn't return the tickets. Please try again" };
  }

  // The seats are free again, and the order moves to the history tab.
  updateTag(getFilmHallsTag(filmId));
  refresh();
  return { ok: true };
}
