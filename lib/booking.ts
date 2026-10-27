import type { SeatRef } from "./booking-search-params";
import type { CardDetails, PersonDetails } from "./schemas/booking";
import type { Hall, PaymentInput } from "./types/cinema";

// Rows and seats are numbered from 1, the way the hall shows them.
export type SelectedSeat = SeatRef & {
  price: number;
};

export type BookingSeance = {
  filmId: string;
  filmName: string;
  date: string;
  time: string;
  hall: string;
};

// The site is for Canada: Canadian English formats and prices in Canadian dollars.
export const LOCALE = "en-CA";

// en-CA writes the Canadian dollar as a bare "$". Generic English data marks it
// as "CA$", so prices always say which dollar they are in.
const priceFormat = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "CAD",
});

// The API sends dates as "dd.mm.yy".
export function parseScheduleDate(date: string) {
  const [day, month, year] = date.split(".").map(Number);
  return new Date(2000 + year, month - 1, day);
}

// "October 20 at 12:00"
export function formatSeanceDateTime(date: string, time: string) {
  const day = parseScheduleDate(date).toLocaleDateString(LOCALE, {
    month: "long",
    day: "numeric",
  });

  return `${day} at ${time}`;
}

// "CA$10.00"
export function formatPrice(price: number) {
  return priceFormat.format(price);
}

export function formatSeat({ row, seat }: Pick<SelectedSeat, "row" | "seat">) {
  return `Row ${row}, seat ${seat}`;
}

export function formatSeats(seats: SelectedSeat[]) {
  return seats.map(formatSeat).join("; ");
}

function joinWithAnd(items: number[]) {
  if (items.length === 1) return String(items[0]);
  return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

// "Row 1, seats 5 and 6", one group per row.
export function formatSeatsByRow(seats: SelectedSeat[]) {
  const rows = new Map<number, number[]>();

  for (const { row, seat } of seats) {
    rows.set(row, [...(rows.get(row) ?? []), seat]);
  }

  return [...rows]
    .map(([row, rowSeats]) => {
      const label = rowSeats.length === 1 ? "seat" : "seats";
      return `Row ${row}, ${label} ${joinWithAnd(rowSeats)}`;
    })
    .join("; ");
}

export function getTotalPrice(seats: SelectedSeat[]) {
  return seats.reduce((sum, seat) => sum + seat.price, 0);
}

// Keeps seats ordered by row, then seat, however the user clicked them.
export function sortSeats(seats: SelectedSeat[]) {
  return seats.toSorted((a, b) => a.row - b.row || a.seat - b.seat);
}

// Turns the seats from the URL into bookable seats with prices. Seats that don't exist,
// are gaps or were sold since the link was made are dropped.
export function resolveSeats(places: Hall["places"], refs: SeatRef[]) {
  const seats = new Map<string, SelectedSeat>();

  for (const { row, seat } of refs) {
    const place = places[row - 1]?.[seat - 1];
    if (place && place.type !== "BLOCKED" && place.type !== "PAID") {
      seats.set(`${row}-${seat}`, { row, seat, price: place.price });
    }
  }

  return sortSeats([...seats.values()]);
}

// Maps the booking to the createCinemaPayment input. The API numbers seats as columns
// and expects the phone in E.164: "+14165550123".
export function toPaymentInput(
  seance: BookingSeance,
  seats: SelectedSeat[],
  person: PersonDetails,
  card: CardDetails,
): PaymentInput {
  return {
    filmId: seance.filmId,
    tickets: seats.map((s) => ({ row: s.row, column: s.seat })),
    person: {
      firstname: person.firstName,
      lastname: person.lastName,
      middlename: person.middleName,
      phone: `+1${person.phone.replace(/\D/g, "")}`,
    },
    debitCard: card,
    seance: { date: seance.date, time: seance.time },
  };
}
