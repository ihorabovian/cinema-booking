import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DetailRow } from "./detail-row";
import {
  formatSeanceDateTime,
  formatSeatsByRow,
  type BookingSeance,
  type SelectedSeat,
} from "@/lib/booking";

const buttonClassName = "h-13 w-full rounded-full px-6";

type PaymentSuccessProps = {
  seance: BookingSeance;
  seats: SelectedSeat[];
};

export function PaymentSuccess({ seance, seats }: PaymentSuccessProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden>
          <circle cx="28" cy="28" r="28" className="fill-pink-medium" />
          <path
            d="M40.1381 19.3899C39.4904 18.8734 38.5466 18.9798 38.0301 19.6276L24.9464 36.0364C24.7604 36.2697 24.4128 36.2892 24.2019 36.0783L17.8649 29.7413C17.2791 29.1555 16.3294 29.1555 15.7436 29.7413C15.1578 30.3271 15.1578 31.2768 15.7436 31.8626L22.0806 38.1996C23.5572 39.6762 25.9901 39.5395 27.292 37.9067L40.3757 21.4979C40.8922 20.8501 40.7858 19.9064 40.1381 19.3899Z"
            className="fill-primary-foreground"
          />
        </svg>
        <h1 className="text-2xl leading-8 font-bold">Payment successful</h1>
      </div>

      <div className="flex w-full flex-col gap-4 md:w-[398px]">
        <DetailRow size="sm" label="Number of tickets" value={seats.length} />
        <DetailRow size="sm" label="Film" value={seance.filmName} />
        <DetailRow
          size="sm"
          label="Date and time"
          value={formatSeanceDateTime(seance.date, seance.time)}
        />
        <DetailRow size="sm" label="Hall" value={seance.hall} />
        <DetailRow size="sm" label="Seats" value={formatSeatsByRow(seats)} />
        {/* TODO: add the "Ticket numbers" row from the createCinemaPayment response */}
        <hr className="h-px rounded-full border-0 bg-secondary" />
        <p className="text-base leading-6 font-medium text-surface">
          All the details have been sent to you by SMS
        </p>
      </div>

      <div className="flex w-full flex-col gap-4 md:w-[398px]">
        {/* TODO: open the order once the orders page exists */}
        <Button variant="secondary" className={buttonClassName}>
          Order details
        </Button>
        <Button asChild className={buttonClassName}>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
