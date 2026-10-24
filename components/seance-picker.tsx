"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { LOCALE, parseScheduleDate } from "@/lib/booking";
import { getBookingHref } from "@/lib/booking-search-params";
import { cn } from "@/lib/utils";
import type { FilmSchedule, Seance } from "@/lib/types/cinema";

// The design shows four dates in one row; the API sends a whole week.
const MAX_DATES = 4;

const continueClassName = "h-[52px] w-full rounded-full px-6 md:w-[328px]";

type SeancePickerProps = {
  filmId: string;
  schedules: FilmSchedule[];
};

type SelectedSeance = {
  hall: string;
  time: string;
};

// "Tue, Oct 20"
function formatDate(date: string) {
  return parseScheduleDate(date).toLocaleDateString(LOCALE, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function groupByHall(seances: Seance[]) {
  const halls = new Map<string, Seance[]>();

  for (const seance of seances) {
    const hallSeances = halls.get(seance.hall.name) ?? [];
    hallSeances.push(seance);
    halls.set(seance.hall.name, hallSeances);
  }

  return [...halls];
}

export function SeancePicker({ filmId, schedules }: SeancePickerProps) {
  const [dateIndex, setDateIndex] = useState(0);
  const [selected, setSelected] = useState<SelectedSeance | null>(null);

  const dates = schedules.slice(0, MAX_DATES);
  const halls = groupByHall(dates[dateIndex]?.seances ?? []);

  function selectDate(index: number) {
    setDateIndex(index);
    setSelected(null);
  }

  function toggleSeance(hall: string, time: string) {
    const isSame = selected?.hall === hall && selected.time === time;
    setSelected(isSame ? null : { hall, time });
  }

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex h-[50px] max-w-full items-center self-start overflow-x-auto rounded-full bg-muted p-1">
          {dates.map((schedule, index) => (
            <button
              key={schedule.date}
              type="button"
              aria-pressed={index === dateIndex}
              onClick={() => selectDate(index)}
              className={cn(
                "shrink-0 cursor-pointer rounded-full px-3 py-2 text-lg leading-6.5 font-bold whitespace-nowrap",
                index === dateIndex && "bg-background shadow-sm",
              )}
            >
              {formatDate(schedule.date)}
            </button>
          ))}
        </div>

        {halls.map(([hall, seances]) => (
          <div key={hall} className="flex flex-col gap-2">
            <p className="text-sm leading-[22px] font-medium first-letter:uppercase">
              {hall} hall
            </p>
            <div className="flex flex-wrap gap-2">
              {seances.map((seance) => {
                const isSelected =
                  selected?.hall === hall && selected.time === seance.time;

                return (
                  <button
                    key={seance.time}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleSeance(hall, seance.time)}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-full py-3 text-xl leading-7 font-bold",
                      isSelected
                        ? "bg-pink px-[18px] text-primary-foreground"
                        : "bg-secondary px-8",
                    )}
                  >
                    {seance.time}
                    {isSelected && <X size={20} />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="md:pt-6">
        {selected ? (
          <Button asChild className={continueClassName}>
            <Link
              href={getBookingHref(filmId, {
                date: dates[dateIndex].date,
                time: selected.time,
                hall: selected.hall,
              })}
            >
              Continue
            </Link>
          </Button>
        ) : (
          <Button disabled className={continueClassName}>
            Continue
          </Button>
        )}
      </div>
    </div>
  );
}
