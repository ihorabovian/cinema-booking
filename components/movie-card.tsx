import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { getImageUrl } from "@/lib/cinema-api";
import { cn } from "@/lib/utils";
import type { Film } from "@/lib/types/cinema";
import { Badge } from "@/components/ui/badge";

type MovieCardProps = {
  film: Film;
  size?: "large" | "small";
};

export function MovieCard({ film, size = "small" }: MovieCardProps) {
  const isLarge = size === "large";

  return (
    <article className="flex flex-col gap-4">
      <div
        className={cn(
          "relative overflow-hidden rounded-[24px] p-4",
          isLarge ? "h-[455px]" : "h-[235px]",
        )}
      >
        <Image
          src={getImageUrl(film.img)}
          alt={film.name}
          fill
          className="object-cover"
          unoptimized
        />
        <Badge className="absolute top-4 left-4 h-8 rounded-full bg-accent-primary px-4 py-2 text-xs leading-4 font-bold text-primary">
          {film.userRatings.kinopoisk}
        </Badge>
      </div>

      <div className="flex flex-col gap-1">
        <h3
          className={cn(
            "font-bold",
            isLarge ? "text-[32px] leading-10" : "text-2xl leading-8",
          )}
        >
          {film.name}
        </h3>
        <p className="text-lg leading-[26px] text-surface capitalize">
          {film.genres.join(", ")}
        </p>
      </div>

      <Button asChild className="mt-auto h-[52px] w-full rounded-full px-6">
        <Link href={`/films/${film.id}`}>Details</Link>
      </Button>
    </article>
  );
}
