import Image from "next/image";
import Link from "next/link";
import successIcon from "@/public/success.svg";
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
        <Image src={successIcon} alt="" />
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
