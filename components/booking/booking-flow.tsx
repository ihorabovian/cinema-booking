"use client";

import { useState } from "react";
import { useQueryStates } from "nuqs";
import { BookingBreadcrumb } from "./booking-breadcrumb";
import { CardForm } from "./card-form";
import { PaymentSuccess } from "./payment-success";
import { PersonForm } from "./person-form";
import { SeatMap } from "./seat-map";
import { StepActions } from "./step-actions";
import { StepProgress } from "./step-progress";
import { TicketSummary } from "./ticket-summary";
import { TicketsCard } from "./tickets-card";
import {
  resolveSeats,
  sortSeats,
  type BookingSeance,
  type SelectedSeat,
} from "@/lib/booking";
import { bookingSearchParams } from "@/lib/booking-search-params";
import { personSchema } from "@/lib/schemas/booking";
import type { Hall } from "@/lib/types/cinema";
import { useSessionStorage } from "@/lib/use-session-storage";

const STEP_TITLES = [
  "Seat selection",
  "Ticket information",
  "Your details",
  "Payment card",
];

// Seats and the step live in the URL; the customer's details in sessionStorage.
// The card is never stored anywhere.
const queryParsers = {
  step: bookingSearchParams.step,
  seats: bookingSearchParams.seats,
};

type BookingFlowProps = {
  seance: BookingSeance;
  places: Hall["places"];
};

export function BookingFlow({ seance, places }: BookingFlowProps) {
  const [query, setQuery] = useQueryStates(queryParsers);
  const [person, setPerson] = useSessionStorage("booking:person", personSchema);
  // Seats of the paid order, shown on the success screen after the URL is cleared.
  const [paidSeats, setPaidSeats] = useState<SelectedSeat[]>();

  const seats = resolveSeats(places, query.seats);
  // A step opens only once the ones before it are filled in, whatever the URL says.
  const lastOpenStep = seats.length === 0 ? 1 : person ? 4 : 3;
  const step = Math.min(Math.max(query.step, 1), lastOpenStep);

  function goTo(nextStep: number) {
    // Each step is its own history entry, so the browser Back button goes one step back.
    setQuery({ step: nextStep }, { history: "push" });
    window.scrollTo({ top: 0 });
  }

  function toggleSeat(seat: SelectedSeat) {
    const isSame = (s: SelectedSeat) => s.row === seat.row && s.seat === seat.seat;
    const nextSeats = seats.some(isSame)
      ? seats.filter((s) => !isSame(s))
      : sortSeats([...seats, seat]);

    setQuery({ seats: nextSeats });
  }

  function completePayment() {
    // TODO: send createCinemaPayment with the seats, person and card here.
    setPaidSeats(seats);
    // A reload after paying starts a new booking instead of reopening the card step.
    setQuery({ step: null, seats: null });
  }

  if (paidSeats) {
    return <PaymentSuccess seance={seance} seats={paidSeats} />;
  }

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-4">
      <div className="flex w-full min-w-0 flex-col gap-6 md:w-[702px]">
        <BookingBreadcrumb items={STEP_TITLES.slice(0, step)} />
        <h1 className="text-2xl leading-8 font-bold">{STEP_TITLES[step - 1]}</h1>
        <StepProgress step={step} />

        {step === 1 && (
          <>
            <SeatMap places={places} selectedSeats={seats} onToggle={toggleSeat} />
            <StepActions
              back={{ href: `/films/${seance.filmId}` }}
              submitLabel="Continue"
              submitDisabled={seats.length === 0}
              onSubmit={() => goTo(2)}
            />
          </>
        )}

        {step === 2 && (
          <>
            <TicketSummary seance={seance} seats={seats} />
            <StepActions
              back={{ onClick: () => goTo(1) }}
              submitLabel="Buy tickets"
              onSubmit={() => goTo(3)}
            />
          </>
        )}

        {step === 3 && (
          <PersonForm
            // Saved details arrive after hydration; remounting fills the form with them.
            key={person ? "saved" : "empty"}
            defaultValues={person}
            onBack={() => goTo(2)}
            onSubmit={(details) => {
              setPerson(details);
              goTo(4);
            }}
          />
        )}

        {step === 4 && <CardForm onBack={() => goTo(3)} onSubmit={completePayment} />}
      </div>

      {step === 1 && <TicketsCard seance={seance} seats={seats} />}
    </div>
  );
}
