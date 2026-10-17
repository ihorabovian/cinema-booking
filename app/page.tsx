import { getFilms } from "@/lib/cinema-api";
import { MovieCard } from "@/components/movie-card";
import { cn } from "@/lib/utils";
import type { Film } from "@/lib/types/cinema";

const LARGE_ROW_SIZE = 2;
const SMALL_ROW_SIZE = 4;

type FilmRow = {
  size: "large" | "small";
  films: Film[];
  showActors: boolean;
};

// The design alternates a row of 2 large cards with a row of 4 small ones,
// and every second large row also shows the cast.
function splitIntoRows(films: Film[]) {
  const rows: FilmRow[] = [];
  let index = 0;

  while (index < films.length) {
    const size = rows.length % 2 === 0 ? "large" : "small";
    const count = size === "large" ? LARGE_ROW_SIZE : SMALL_ROW_SIZE;

    const showActors = rows.length % 4 === 2;

    rows.push({ size, films: films.slice(index, index + count), showActors });
    index += count;
  }

  return rows;
}

export default async function HomePage() {
  const films = await getFilms();
  const rows = splitIntoRows(films);

  return (
    <main>
      <div className="mx-auto max-w-page px-[120px] pt-2 pb-16">
        <div className="flex flex-col gap-10 py-10">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={cn(
                "grid",
                row.size === "large"
                  ? "grid-cols-2 gap-10"
                  : "grid-cols-4 gap-6",
              )}
            >
              {row.films.map((film) => (
                <MovieCard
                  key={film.id}
                  film={film}
                  size={row.size}
                  showActors={row.showActors}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
