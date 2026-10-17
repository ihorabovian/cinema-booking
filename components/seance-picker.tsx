"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import type { FilmSchedule, Seance } from "@/lib/types/cinema";

// The design shows four dates in one row; the API sends a whole week.
const MAX_DATES = 4;

type SeancePickerProps = {
  schedules: FilmSchedule[];
};

type SelectedSeance = {
  hall: string;
  time: string;
};

// The API sends dates as "dd.mm.yy".
function formatDate(date: string) {
  const [day, month, year] = date.split(".").map(Number);
  const parsed = new Date(2000 + year, month - 1, day);

  const weekday = parsed.toLocaleDateString("en-US", { weekday: "short" });
  const monthName = parsed.toLocaleDateString("en-US", { month: "short" });

  return `${weekday}, ${day} ${monthName}`;
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

export function SeancePicker({ schedules }: SeancePickerProps) {
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
        <div className="flex h-[50px] items-center self-start rounded-full bg-muted p-1">
          {dates.map((schedule, index) => (
            <button
              key={schedule.date}
              type="button"
              aria-pressed={index === dateIndex}
              onClick={() => selectDate(index)}
              className={cn(
                "cursor-pointer rounded-full px-3 py-2 text-lg leading-6.5 font-bold whitespace-nowrap",
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

      <div className="pt-6">
        {/* TODO: open seat selection once that screen exists */}
        <Button
          disabled={!selected}
          className="h-[52px] w-[328px] rounded-full px-6"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
