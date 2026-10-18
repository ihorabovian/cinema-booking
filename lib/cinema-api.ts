import { cacheLife } from "next/cache";
import { gqlClient } from "./graphql-client";
import { GET_CINEMA_TODAY } from "./queries/GET_CINEMA_TODAY";
import { GET_FILM } from "./queries/GET_FILM";
import { GET_FILM_SCHEDULE } from "./queries/GET_FILM_SCHEDULE";
import type { FilmCard, FilmDetails, FilmSchedule } from "@/lib/types/cinema";

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

export function getImageUrl(path: string) {
  return `${process.env.API_BASE_URL}${path}`;
}
