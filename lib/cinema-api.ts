import { cacheLife } from "next/cache";
import { gqlClient } from "./graphql-client";
import { GET_CINEMA_TODAY } from "./queries/GET_CINEMA_TODAY";
import { GET_FILM } from "./queries/GET_FILM";
import { GET_FILM_HALLS } from "./queries/GET_FILM_HALLS";
import { GET_FILM_SCHEDULE } from "./queries/GET_FILM_SCHEDULE";
import type {
  FilmCard,
  FilmDetails,
  FilmSchedule,
  Hall,
} from "@/lib/types/cinema";

type ApiResponse = {
  success: boolean;
  reason: string | null;
};

// Every query answers with `success` and `reason`, so a failed one becomes an error here.
function assertSuccess(response: ApiResponse, query: string) {
  if (!response.success) {
    throw new Error(`${query} failed: ${response.reason ?? "unknown reason"}`);
  }
}

export async function getCinemaToday(): Promise<FilmCard[]> {
  "use cache";
  cacheLife("minutes");

  const { getCinemaToday } = await gqlClient.request(GET_CINEMA_TODAY);
  assertSuccess(getCinemaToday, "getCinemaToday");

  return getCinemaToday.films;
}

export async function getFilm(filmId: string): Promise<FilmDetails> {
  "use cache";
  cacheLife("minutes");

  const { getFilm } = await gqlClient.request(GET_FILM, { filmId });
  assertSuccess(getFilm, "getFilm");

  return getFilm.film;
}

export async function getFilmSchedule(filmId: string): Promise<FilmSchedule[]> {
  "use cache";
  cacheLife("minutes");

  const { getFilmSchedule } = await gqlClient.request(GET_FILM_SCHEDULE, {
    filmId,
  });
  assertSuccess(getFilmSchedule, "getFilmSchedule");

  return getFilmSchedule.schedules;
}

// The API has no query for one seance, so we take the week and pick the hall out of it.
// Seats sell out quickly, so this cache is short.
export async function getSeanceHall(
  filmId: string,
  date: string,
  time: string,
  hallName: string,
): Promise<Hall | null> {
  "use cache";
  cacheLife("seconds");

  const { getFilmSchedule } = await gqlClient.request(GET_FILM_HALLS, {
    filmId,
  });
  assertSuccess(getFilmSchedule, "getFilmHalls");

  const seance = getFilmSchedule.schedules
    .find((schedule) => schedule.date === date)
    ?.seances.find(
      (seance) => seance.time === time && seance.hall.name === hallName,
    );

  return seance?.hall ?? null;
}

export function getImageUrl(path: string) {
  return `${process.env.API_BASE_URL}${path}`;
}
