"use server";

import { updateTag } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import {
  toPaymentInput,
  toProfileInput,
  type BookingSeance,
  type SelectedSeat,
} from "@/lib/booking";
import {
  createCinemaPayment,
  getFilmHallsTag,
  updateProfile,
} from "@/lib/cinema-api";
import { cardSchema, personSchema } from "@/lib/schemas/booking";
import type { CinemaOrder } from "@/lib/types/cinema";

export type PaymentResult =
  | { ok: true; order: CinemaOrder }
  | { ok: false; error: string };

// Anyone can POST to a Server Action, so the details are checked again here.
// Errors come back as a result: Next hides the message of a thrown error in production.
export async function createPayment(
  seance: BookingSeance,
  seats: SelectedSeat[],
  person: unknown,
  card: unknown,
): Promise<PaymentResult> {
  const parsedPerson = personSchema.safeParse(person);
  const parsedCard = cardSchema.safeParse(card);

  if (!parsedPerson.success || !parsedCard.success || seats.length === 0) {
    return { ok: false, error: "Check your details and try again" };
  }

  try {
    const session = await getCurrentUser();
    const order = await createCinemaPayment(
      toPaymentInput(seance, seats, parsedPerson.data, parsedCard.data),
      session?.token,
    );
    // The seats are sold now: the next hall request must not show them as free.
    updateTag(getFilmHallsTag(seance.filmId));

    if (session) {
      // The payment carries only names and phone, so city and email reach the profile
      // here, and the next checkout starts filled in. A failure here doesn't undo the order.
      await updateProfile(session.token, toProfileInput(parsedPerson.data)).catch(
        console.error,
      );
    }

    return { ok: true, order };
  } catch (error) {
    console.error(error);
    return { ok: false, error: "Payment failed. Please try again" };
  }
}
