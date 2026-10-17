import { cacheLife } from "next/cache";
import type { Film, FilmsResponse } from "@/lib/types/cinema";

export async function getFilms(): Promise<Film[]> {
  "use cache";
  cacheLife("minutes");

  const response = await fetch(`${process.env.API_BASE_URL}/api/cinema/films`);

  if (!response.ok) {
    throw new Error(`Failed to fetch films: ${response.status}`);
  }

  const data: FilmsResponse = await response.json();

  if (!data.success) {
    throw new Error("Films response was not successful");
  }

  return data.films;
}

export function getImageUrl(path: string) {
  return `${process.env.API_BASE_URL}/api${path}`;
}
