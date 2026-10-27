import type {
  GetCinemaTodayQuery,
  GetFilmHallsQuery,
  GetFilmQuery,
  GetFilmScheduleQuery,
  CreateCinemaPaymentDto,
  CreateCinemaPaymentMutation,
} from "@/lib/gql/graphql";

// Types come from the queries in lib/queries, so they always match the fields we request.
export type FilmCard = GetCinemaTodayQuery["getCinemaToday"]["films"][number];
export type FilmDetails = GetFilmQuery["getFilm"]["film"];
export type Actor = FilmCard["actors"][number];

export type FilmSchedule =
  GetFilmScheduleQuery["getFilmSchedule"]["schedules"][number];
export type Seance = FilmSchedule["seances"][number];

export type Hall =
  GetFilmHallsQuery["getFilmSchedule"]["schedules"][number]["seances"][number]["hall"];
export type HallPlace = Hall["places"][number][number];

export type PaymentInput = CreateCinemaPaymentDto;
export type CinemaOrder =
  CreateCinemaPaymentMutation["createCinemaPayment"]["order"];
