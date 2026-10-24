import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ActorList } from "@/components/actor-list";
import { MobileHeader } from "@/components/mobile-header";
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
      <MobileHeader title="About the film" backHref="/" />

      <div className="mx-auto max-w-page px-4 pb-10 md:px-[120px] md:pt-2 md:pb-16">
        <div className="grid items-start gap-6 pt-8 md:grid-cols-[541fr_619fr] md:gap-10 md:py-10">
          <SeancePicker filmId={id} schedules={schedules} />

          <div className="order-first flex min-w-0 flex-col gap-2 md:order-none md:gap-6">
            <div className="relative h-[235px] overflow-hidden rounded-[24px] md:h-[369px]">
              <Image
                src={getImageUrl(film.img)}
                alt={film.name}
                fill
                sizes="(min-width: 1440px) 619px, (min-width: 768px) 52vw, 100vw"
                preload
                className="object-cover"
              />
              <Badge className="absolute top-4 left-4 h-8 rounded-full bg-accent-primary px-4 py-2 text-xs leading-4 font-bold text-primary">
                {film.userRatings.imdb}
              </Badge>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:gap-1">
                <h1 className="text-2xl leading-8 font-medium md:text-[32px] md:leading-10 md:font-bold">
                  {film.name}
                </h1>
                <p className="text-sm leading-[22px] font-medium text-surface first-letter:uppercase md:text-lg md:leading-6.5 md:font-normal">
                  {film.genres.join(", ")}
                </p>
              </div>

              <p className="text-base leading-6 font-medium">
                {film.description}
              </p>

              {/* The mobile design has no cast block */}
              <div className="hidden flex-col gap-4 md:flex">
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
