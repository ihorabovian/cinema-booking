import {
  createLoader,
  createParser,
  createSerializer,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

// The booking page keeps its state in the URL, so a reload or the Back button restores it:
// /films/1/booking?date=24.10.26&time=10:30&hall=Red&step=2&seats=1-3,1-4

export type SeatRef = {
  row: number;
  seat: number;
};

// "1-3" is row 1, seat 3. Anything else in the URL is ignored.
const parseAsSeat = createParser<SeatRef>({
  parse(value) {
    const [row, seat] = value.split("-").map(Number);
    const isValid = Number.isInteger(row) && Number.isInteger(seat) && row > 0 && seat > 0;
    return isValid ? { row, seat } : null;
  },
  serialize: ({ row, seat }) => `${row}-${seat}`,
});

export const bookingSearchParams = {
  date: parseAsString,
  time: parseAsString,
  hall: parseAsString,
  // Counted from 1; the booking flow keeps it within the steps the user has completed.
  step: parseAsInteger.withDefault(1),
  seats: parseAsArrayOf(parseAsSeat).withDefault([]),
};

export const loadBookingSearchParams = createLoader(bookingSearchParams);

const serializeBookingSearchParams = createSerializer(bookingSearchParams);

export function getBookingHref(
  filmId: string,
  seance: { date: string; time: string; hall: string },
) {
  return serializeBookingSearchParams(`/films/${filmId}/booking`, seance);
}
