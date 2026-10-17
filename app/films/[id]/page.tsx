import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ActorList } from "@/components/actor-list";
import { SeancePicker } from "@/components/seance-picker";
import { getFilm, getFilmSchedule, getImageUrl } from "@/lib/cinema-api";

export default async function FilmPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [film, schedules] = await Promise.all([
    getFilm(id),
    getFilmSchedule(id),
  ]);

  return (
    <main>
      <div className="mx-auto max-w-page px-[120px] pt-2 pb-16">
        <div className="grid grid-cols-[541fr_619fr] items-start gap-10 py-10">
          <SeancePicker schedules={schedules} />

          <div className="flex min-w-0 flex-col gap-6">
            <div className="relative h-[369px] overflow-hidden rounded-[24px]">
              <Image
                src={getImageUrl(film.img)}
                alt={film.name}
                fill
                sizes="(min-width: 1440px) 619px, 52vw"
                preload
                className="object-cover"
              />
              <Badge className="absolute top-4 left-4 h-8 rounded-full bg-accent-primary px-4 py-2 text-xs leading-4 font-bold text-primary">
                {film.userRatings.kinopoisk}
              </Badge>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-[32px] leading-10 font-bold">
                  {film.name}
                </h1>
                <p className="text-lg leading-6.5 text-surface first-letter:uppercase">
                  {film.genres.join(", ")}
                </p>
              </div>

              <p className="text-base leading-6 font-medium">
                {film.description}
              </p>

              <div className="flex flex-col gap-4">
                <h2 className="text-2xl leading-8 font-bold">Actors</h2>
                <ActorList actors={film.actors} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
