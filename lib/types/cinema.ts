import type {
  GetCinemaTodayQuery,
  GetFilmQuery,
  GetFilmScheduleQuery,
} from "@/lib/gql/graphql";

// Types come from the queries in lib/queries, so they always match the fields we request.
export type FilmCard = GetCinemaTodayQuery["getCinemaToday"]["films"][number];
export type FilmDetails = GetFilmQuery["getFilm"]["film"];
export type Actor = FilmCard["actors"][number];

export type FilmSchedule =
  GetFilmScheduleQuery["getFilmSchedule"]["schedules"][number];
export type Seance = FilmSchedule["seances"][number];
