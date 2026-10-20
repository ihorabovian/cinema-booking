"use client";

import { useState } from "react";
import { BookingBreadcrumb } from "./booking-breadcrumb";
import { CardForm } from "./card-form";
import { PaymentSuccess } from "./payment-success";
import { PersonForm } from "./person-form";
import { SeatMap } from "./seat-map";
import { StepActions } from "./step-actions";
import { StepProgress } from "./step-progress";
import { TicketSummary } from "./ticket-summary";
import { TicketsCard } from "./tickets-card";
import { sortSeats, type BookingSeance, type SelectedSeat } from "@/lib/booking";
import type { PersonDetails } from "@/lib/schemas/booking";
import type { Hall } from "@/lib/types/cinema";

const STEP_TITLES = [
  "Seat selection",
  "Ticket information",
  "Your details",
  "Payment card",
];
const SUCCESS_STEP = STEP_TITLES.length;

type BookingFlowProps = {
  seance: BookingSeance;
  places: Hall["places"];
};

export function BookingFlow({ seance, places }: BookingFlowProps) {
  const [step, setStep] = useState(0);
  const [seats, setSeats] = useState<SelectedSeat[]>([]);
  // Kept so the form is filled in again when the user steps back to it.
  const [person, setPerson] = useState<PersonDetails>();

  function goTo(nextStep: number) {
    setStep(nextStep);
    window.scrollTo({ top: 0 });
  }

  function toggleSeat(seat: SelectedSeat) {
    setSeats((current) => {
      const isSame = (s: SelectedSeat) => s.row === seat.row && s.seat === seat.seat;

      return current.some(isSame)
        ? current.filter((s) => !isSame(s))
        : sortSeats([...current, seat]);
    });
  }

  if (step === SUCCESS_STEP) {
    return <PaymentSuccess seance={seance} seats={seats} />;
  }

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-4">
      <div className="flex w-full min-w-0 flex-col gap-6 md:w-[702px]">
        <BookingBreadcrumb items={STEP_TITLES.slice(0, step + 1)} />
        <h1 className="text-2xl leading-8 font-bold">{STEP_TITLES[step]}</h1>
        <StepProgress step={step + 1} />

        {step === 0 && (
          <>
            <SeatMap places={places} selectedSeats={seats} onToggle={toggleSeat} />
            <StepActions
              back={{ href: `/films/${seance.filmId}` }}
              submitLabel="Continue"
              submitDisabled={seats.length === 0}
              onSubmit={() => goTo(1)}
            />
          </>
        )}

        {step === 1 && (
          <>
            <TicketSummary seance={seance} seats={seats} />
            <StepActions
              back={{ onClick: () => goTo(0) }}
              submitLabel="Buy tickets"
              onSubmit={() => goTo(2)}
            />
          </>
        )}

        {step === 2 && (
          <PersonForm
            defaultValues={person}
            onBack={() => goTo(1)}
            onSubmit={(details) => {
              setPerson(details);
              goTo(3);
            }}
          />
        )}

        {step === 3 && (
          <CardForm
            onBack={() => goTo(2)}
            // TODO: send createCinemaPayment with the seats, person and card here.
            onSubmit={() => goTo(SUCCESS_STEP)}
          />
        )}
      </div>

      {step === 0 && <TicketsCard seance={seance} seats={seats} />}
    </div>
  );
}
