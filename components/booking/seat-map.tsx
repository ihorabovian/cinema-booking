import { Fragment } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import tooltipArrow from "@/public/tooltip-arrow.svg";
import { formatPrice, formatSeat, type SelectedSeat } from "@/lib/booking";
import { cn } from "@/lib/utils";
import type { Hall, HallPlace } from "@/lib/types/cinema";

const SEAT_SIZE = 20;
const SEAT_GAP = 24;
// Width of a one-digit row number; the label column itself sizes to its content.
const ROW_LABEL_WIDTH = 8;

const legend = [
  { label: "Taken", className: "bg-primary" },
  { label: "Selected", className: "bg-pink-light" },
  { label: "Available", className: "bg-seat" },
];

type SeatMapProps = {
  places: Hall["places"];
  selectedSeats: SelectedSeat[];
  onToggle: (seat: SelectedSeat) => void;
};

export function SeatMap({ places, selectedSeats, onToggle }: SeatMapProps) {
  const columns = Math.max(...places.map((row) => row.length));
  // The design spaces seats 24px apart. Wide halls squeeze the gap so they still fit.
  const maxWidth = ROW_LABEL_WIDTH + columns * (SEAT_SIZE + SEAT_GAP);

  function isSelected(row: number, seat: number) {
    return selectedSeats.some((s) => s.row === row && s.seat === seat);
  }

  return (
    <div className="flex w-full flex-col gap-6" style={{ maxWidth }}>
      <p className="text-base leading-6 font-medium">Row</p>

      {/* Wide halls scroll sideways on phones. The padding keeps tooltips of the first
          and last rows inside the scroll box, and the negative margin cancels it out. */}
      <div className="-my-14 overflow-x-auto py-14 md:my-0 md:overflow-visible md:py-0">
        <div
          className="grid items-center justify-between gap-x-2 gap-y-6"
          style={{
            gridTemplateColumns: `auto repeat(${columns}, ${SEAT_SIZE}px)`,
          }}
        >
          {places.map((rowPlaces, rowIndex) => {
            const row = rowIndex + 1;

            return (
              <Fragment key={row}>
                <span className="text-center text-sm leading-5.5 font-medium">
                  {row}
                </span>
                {rowPlaces.map((place, seatIndex) => {
                  const seat = seatIndex + 1;

                  return (
                    <Seat
                      key={seat}
                      place={place}
                      row={row}
                      seat={seat}
                      selected={isSelected(row, seat)}
                      onToggle={onToggle}
                    />
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between gap-4">
        {legend.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className={cn("size-5 rounded", item.className)} />
            <span className="text-base leading-6 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type SeatProps = {
  place: HallPlace;
  row: number;
  seat: number;
  selected: boolean;
  onToggle: (seat: SelectedSeat) => void;
};

function Seat({ place, row, seat, selected, onToggle }: SeatProps) {
  // Blocked cells are gaps in the hall, not seats.
  if (place.type === "BLOCKED") {
    return <span aria-hidden />;
  }

  if (place.type === "PAID") {
    return (
      <button
        type="button"
        disabled
        aria-label={`${formatSeat({ row, seat })}, taken`}
        className="size-5 rounded bg-primary"
      />
    );
  }

  const selectedSeat = { row, seat, price: place.price };

  return (
    <div className="relative size-5">
      <button
        type="button"
        aria-pressed={selected}
        aria-label={`${formatSeat({ row, seat })}, ${formatPrice(place.price)}`}
        onClick={() => onToggle(selectedSeat)}
        className={cn(
          "size-5 cursor-pointer rounded",
          selected ? "bg-pink-light" : "bg-seat hover:bg-pink-light/60",
        )}
      />
      {selected && (
        <SeatTooltip
          seat={selectedSeat}
          // Neighbouring tooltips alternate above and below so they don't overlap.
          placement={seat % 2 === 1 ? "top" : "bottom"}
          onRemove={() => onToggle(selectedSeat)}
        />
      )}
    </div>
  );
}

type SeatTooltipProps = {
  seat: SelectedSeat;
  placement: "top" | "bottom";
  onRemove: () => void;
};

function SeatTooltip({ seat, placement, onRemove }: SeatTooltipProps) {
  const isTop = placement === "top";

  return (
    <div
      className={cn(
        "absolute left-1/2 z-10 flex -translate-x-1/2 flex-col rounded-lg bg-primary px-2 py-1.5 text-xs leading-4 font-medium whitespace-nowrap",
        isTop ? "bottom-full mb-2.5" : "top-full mt-2.5",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-primary-foreground">{formatPrice(seat.price)}</span>
        <button
          type="button"
          aria-label={`Remove ${formatSeat(seat)}`}
          onClick={onRemove}
          className="cursor-pointer text-primary-foreground"
        >
          <X className="size-4" />
        </button>
      </div>
      <span className="text-muted-foreground">{formatSeat(seat)}</span>
      <Image
        src={tooltipArrow}
        alt=""
        className={cn(
          "absolute left-1/2 -translate-x-1/2",
          isTop ? "top-full" : "bottom-full rotate-180",
        )}
      />
    </div>
  );
}
