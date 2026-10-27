import { Ticket } from "lucide-react";
import { DetailRow } from "./detail-row";
import {
  formatSeanceDateTime,
  formatSeats,
  type BookingSeance,
  type SelectedSeat,
} from "@/lib/booking";

type TicketsCardProps = {
  seance: BookingSeance;
  seats: SelectedSeat[];
};

// Side card on the seat step that updates as seats are picked.
export function TicketsCard({ seance, seats }: TicketsCardProps) {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-4 rounded-[24px] bg-secondary px-6 py-6 md:w-[482px] md:px-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl leading-8 font-bold">Your tickets</h2>
        <span className="flex rounded-full bg-pink-medium p-3.5 text-primary-foreground">
          <Ticket className="size-5" />
        </span>
      </div>
      <DetailRow label="Number of tickets" value={seats.length} />
      <DetailRow label="Film" value={seance.filmName} />
      <DetailRow
        label="Date and time"
        value={formatSeanceDateTime(seance.date, seance.time)}
      />
      <DetailRow label="Hall" value={seance.hall} />
      <DetailRow
        label="Seats"
        value={seats.length > 0 ? formatSeats(seats) : "Not selected"}
      />
    </aside>
  );
}
