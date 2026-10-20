// Rows and seats are numbered from 1, the way the hall shows them.
export type SelectedSeat = {
  row: number;
  seat: number;
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
