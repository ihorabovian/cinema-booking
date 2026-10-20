import { notFound } from "next/navigation";
import { BookingFlow } from "@/components/booking/booking-flow";
import { getFilm, getSeanceHall } from "@/lib/cinema-api";

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const { date, time, hall } = await searchParams;

  if (
    typeof date !== "string" ||
    typeof time !== "string" ||
    typeof hall !== "string"
  ) {
    notFound();
  }

  const [film, seanceHall] = await Promise.all([
    getFilm(id),
    getSeanceHall(id, date, time, hall),
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
      />
    </main>
  );
}
