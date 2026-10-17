import Image from "next/image";
import { getImageUrl } from "@/lib/cinema-api";
import type { Person } from "@/lib/types/cinema";

type ActorListProps = {
  actors: Person[];
};

export function ActorList({ actors }: ActorListProps) {
  return (
    <div className="flex w-full items-start gap-2 overflow-hidden">
      {actors.map((actor) => (
        <div key={actor.id} className="flex shrink-0 flex-col items-center gap-1">
          <Image
            src={getImageUrl(actor.photo)}
            alt={actor.fullName}
            width={72}
            height={72}
            className="size-18 rounded-full object-cover"
            unoptimized
          />
          <p className="w-34 text-center text-lg leading-6.5 text-surface">
            {actor.fullName}
          </p>
        </div>
      ))}
    </div>
  );
}
