import type { BookingSeance, SelectedSeat } from "@/lib/booking";
import type { FilmCard, FilmSchedule, Hall, UserOrder } from "@/lib/types/cinema";

// Sample data in the shape of the API responses, taken from the real API.

export const film: FilmCard = {
  id: "1",
  name: "Warcraft",
  genres: ["fantasy", "action", "adventure"],
  img: "/static/images/cinema/films/warcraft.webp",
  userRatings: { imdb: "6.7" },
  actors: [
    { id: "1", fullName: "Travis Fimmel", photo: "/static/images/cinema/actors/travis-fimmel.webp" },
    { id: "2", fullName: "Paula Patton", photo: "/static/images/cinema/actors/paula-patton.webp" },
    { id: "3", fullName: "Ben Foster", photo: "/static/images/cinema/actors/ben-foster.webp" },
  ],
};

export const schedules: FilmSchedule[] = ["20.10.26", "21.10.26", "22.10.26", "23.10.26"].map(
  (date) => ({
    date,
    seances: [
      { time: "10:00", hall: { name: "red" } },
      { time: "14:30", hall: { name: "red" } },
      { time: "19:00", hall: { name: "green" } },
      { time: "21:40", hall: { name: "blue" } },
    ],
  }),
);

const seat = (type: Hall["places"][number][number]["type"], price = 12) => ({ type, price });

// Five rows of eight: an aisle in the middle, a few seats sold.
export const places: Hall["places"] = Array.from({ length: 5 }, (_, row) =>
  Array.from({ length: 8 }, (_, column) => {
    if (column === 4 && row > 0) return seat("BLOCKED");
    if ((row + column) % 5 === 0) return seat("PAID");
    return seat(row < 2 ? "COMFORT" : "ECONOM", row < 2 ? 15 : 12);
  }),
);

export const seance: BookingSeance = {
  filmId: film.id,
  filmName: film.name,
  date: "20.10.26",
  time: "19:00",
  hall: "Green",
};

export const selectedSeats: SelectedSeat[] = [
  { row: 3, seat: 2, price: 12 },
  { row: 3, seat: 3, price: 12 },
];

export const order: UserOrder = {
  _id: "order-1",
  orderNumber: 1042,
  status: "PAID",
  film: { id: film.id, name: film.name },
  tickets: selectedSeats.map(({ row, seat }, index) => ({
    _id: `ticket-${index}`,
    row,
    column: seat,
    seance: { date: seance.date, time: seance.time },
  })),
};
