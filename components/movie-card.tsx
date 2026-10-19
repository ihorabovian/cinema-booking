import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { getImageUrl } from "@/lib/cinema-api";
import { cn } from "@/lib/utils";
import type { FilmCard } from "@/lib/types/cinema";
import { Badge } from "@/components/ui/badge";
import { ActorList } from "@/components/actor-list";

type MovieCardProps = {
  film: FilmCard;
  size?: "large" | "small";
  showActors?: boolean;
  preload?: boolean;
};

export function MovieCard({
  film,
  size = "small",
  showActors = false,
  preload = false,
}: MovieCardProps) {
  const isLarge = size === "large";

  return (
    <article
      className={cn(
        "flex flex-col gap-2 md:gap-4",
        !isLarge && "w-[235px] shrink-0 md:w-auto",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[24px] p-4",
          isLarge ? "h-[235px] md:h-[455px]" : "h-[235px]",
        )}
      >
        <Image
          src={getImageUrl(film.img)}
          alt={film.name}
          fill
          sizes={
            isLarge
              ? "(min-width: 1440px) 580px, (min-width: 768px) 50vw, 100vw"
              : "(min-width: 1440px) 282px, (min-width: 768px) 25vw, 235px"
          }
          preload={preload}
          className="object-cover"
        />
        <Badge className="absolute top-4 left-4 h-8 rounded-full bg-accent-primary px-4 py-2 text-xs leading-4 font-bold text-primary">
          {film.userRatings.kinopoisk}
        </Badge>
      </div>

      <div className="flex flex-col md:gap-1">
        <h3
          className={cn(
            "text-lg leading-6.5 md:font-bold",
            isLarge
              ? "md:text-[32px] md:leading-10"
              : "truncate md:text-2xl md:leading-8",
          )}
        >
          {film.name}
        </h3>
        <p className="text-sm leading-[22px] font-medium text-surface first-letter:uppercase md:text-lg md:leading-6.5 md:font-normal">
          {film.genres.join(", ")}
        </p>
      </div>

      {showActors && (
        <div className="flex flex-col gap-2 md:gap-4">
          <h4 className="text-base leading-6 font-medium md:text-2xl md:leading-8 md:font-bold">
            Actors
          </h4>
          <ActorList actors={film.actors} />
        </div>
      )}

      <Button asChild className="mt-auto h-[52px] w-full rounded-full px-6">
        <Link href={`/films/${film.id}`}>Details</Link>
      </Button>
    </article>
  );
}
