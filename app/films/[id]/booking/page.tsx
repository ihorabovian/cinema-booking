import { notFound } from "next/navigation";
import type { SearchParams } from "nuqs/server";
import { BookingFlow } from "@/components/booking/booking-flow";
import { loadBookingSearchParams } from "@/lib/booking-search-params";
import { getCurrentUser } from "@/lib/auth";
import { toPersonDetails } from "@/lib/booking";
import { getFilm, getSeanceHall } from "@/lib/cinema-api";

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const { date, time, hall } = await loadBookingSearchParams(searchParams);

  if (!date || !time || !hall) {
    notFound();
  }

  const [film, seanceHall, session] = await Promise.all([
    getFilm(id),
    getSeanceHall(id, date, time, hall),
    getCurrentUser(),
  ]);

  if (!seanceHall) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-page px-4 pt-8 pb-10 md:px-[120px] md:pt-12 md:pb-16">
      <BookingFlow
        seance={{
          filmId: id,
          filmName: film.name,
          date,
          time,
          hall: seanceHall.name,
        }}
        places={seanceHall.places}
        profile={session && toPersonDetails(session.user)}
      />
    </main>
  );
}
