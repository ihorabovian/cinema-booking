import { getCinemaToday } from "@/lib/cinema-api";
import { MovieCard } from "@/components/movie-card";
import { MobileHeader } from "@/components/mobile-header";
import { TabBar } from "@/components/tab-bar";
import { cn } from "@/lib/utils";
import type { FilmCard } from "@/lib/types/cinema";

const LARGE_ROW_SIZE = 2;
const SMALL_ROW_SIZE = 4;

type FilmRow = {
  size: "large" | "small";
  films: FilmCard[];
  showActors: boolean;
};

// The design alternates a row of 2 large cards with a row of 4 small ones,
// and every second large row also shows the cast.
function splitIntoRows(films: FilmCard[]) {
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
  const films = await getCinemaToday();
  const rows = splitIntoRows(films);

  return (
    <main>
      <MobileHeader title="Films" />

      {/* pb-28 on phones leaves room for the fixed tab bar */}
      <div className="mx-auto max-w-page px-4 pb-28 md:px-[120px] md:pt-2 md:pb-16">
        <div className="flex flex-col gap-10 pt-8 md:py-10">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={cn(
                row.size === "large"
                  ? "grid gap-10 md:grid-cols-2"
                  : // Small cards scroll sideways on phones, edge to edge
                    "-mx-4 flex gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0",
              )}
            >
              {row.films.map((film) => (
                <MovieCard
                  key={film.id}
                  film={film}
                  size={row.size}
                  showActors={row.showActors}
                  preload={rowIndex === 0}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <TabBar />
    </main>
  );
}
