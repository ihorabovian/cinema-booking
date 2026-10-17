import { cacheLife } from "next/cache";
import type {
  Film,
  FilmResponse,
  FilmSchedule,
  FilmsResponse,
  ScheduleResponse,
} from "@/lib/types/cinema";

// Every endpoint answers with `success`, so the status checks live in one place.
async function fetchFromApi<T extends { success: boolean }>(
  path: string,
): Promise<T> {
  const response = await fetch(`${process.env.API_BASE_URL}/api/cinema${path}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }

  const data: T = await response.json();

  if (!data.success) {
    throw new Error(`Response for ${path} was not successful`);
  }

  return data;
}

export async function getFilms(): Promise<Film[]> {
  "use cache";
  cacheLife("minutes");

  const data = await fetchFromApi<FilmsResponse>("/films");
  return data.films;
}

export async function getFilm(id: string): Promise<Film> {
  "use cache";
  cacheLife("minutes");

  const data = await fetchFromApi<FilmResponse>(`/film/${id}`);
  return data.film;
}

export async function getFilmSchedule(id: string): Promise<FilmSchedule[]> {
  "use cache";
  cacheLife("minutes");

  const data = await fetchFromApi<ScheduleResponse>(`/film/${id}/schedule`);
  return data.schedules;
}

export function getImageUrl(path: string) {
  return `${process.env.API_BASE_URL}/api${path}`;
}
