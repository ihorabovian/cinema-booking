import Image from "next/image";
import { getImageUrl } from "@/lib/cinema-api";
import type { Person } from "@/lib/types/cinema";

// The design fits four actors in a row.
const MAX_ACTORS = 4;

type ActorListProps = {
  actors: Person[];
};

export function ActorList({ actors }: ActorListProps) {
  return (
    <div className="flex items-start gap-2">
      {actors.slice(0, MAX_ACTORS).map((actor) => (
        <div key={actor.id} className="flex shrink-0 flex-col items-center gap-1">
          <Image
            src={getImageUrl(actor.photo)}
            alt={actor.fullName}
            width={72}
            height={72}
            className="size-18 rounded-full object-cover"
          />
          <p className="w-34 text-center text-lg leading-6.5 text-surface">
            {actor.fullName}
          </p>
        </div>
      ))}
    </div>
  );
}
