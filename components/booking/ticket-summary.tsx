import { DetailRow } from "./detail-row";
import {
  formatPrice,
  formatSeanceDateTime,
  formatSeats,
  getTotalPrice,
  type BookingSeance,
  type SelectedSeat,
} from "@/lib/booking";

type TicketSummaryProps = {
  seance: BookingSeance;
  seats: SelectedSeat[];
};

export function TicketSummary({ seance, seats }: TicketSummaryProps) {
  return (
    <div className="flex flex-col gap-4">
      <DetailRow label="Film" value={seance.filmName} />
      <DetailRow label="Number of tickets" value={seats.length} />
      <DetailRow
        label="Date and time"
        value={formatSeanceDateTime(seance.date, seance.time)}
      />
      <DetailRow label="Hall" value={seance.hall} />
      <DetailRow label="Seats" value={formatSeats(seats)} />
      <p className="flex gap-1 text-[32px] leading-10 font-bold">
        <span>Total:</span>
        <span>{formatPrice(getTotalPrice(seats))}</span>
      </p>
    </div>
  );
}
