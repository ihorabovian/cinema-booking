import Image from "next/image";
import { getImageUrl } from "@/lib/cinema-api";
import type { Actor } from "@/lib/types/cinema";

// The design fits four actors in a row.
const MAX_ACTORS = 4;

type ActorListProps = {
  actors: Actor[];
};

export function ActorList({ actors }: ActorListProps) {
  return (
    <div className="grid grid-cols-4 items-start gap-2 md:flex">
      {actors.slice(0, MAX_ACTORS).map((actor) => (
        <div key={actor.id} className="flex shrink-0 flex-col items-center gap-2 md:gap-1">
          <Image
            src={getImageUrl(actor.photo)}
            alt={actor.fullName}
            width={72}
            height={72}
            className="size-18 rounded-full object-cover"
          />
          <p className="w-full text-center text-sm leading-[22px] font-medium wrap-break-word text-surface md:w-34 md:text-lg md:leading-6.5 md:font-normal">
            {actor.fullName}
          </p>
        </div>
      ))}
    </div>
  );
}
