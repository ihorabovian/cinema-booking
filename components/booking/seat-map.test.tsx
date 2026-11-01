import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { SeatMap } from "./seat-map";
import { places } from "@/.storybook/fixtures";

it("picks a free seat with its price", async () => {
  const onToggle = vi.fn();
  render(<SeatMap places={places} selectedSeats={[]} onToggle={onToggle} />);

  await userEvent.click(screen.getByRole("button", { name: "Row 1, seat 2, CA$15.00" }));

  expect(onToggle).toHaveBeenCalledWith({ row: 1, seat: 2, price: 15 });
});

it("doesn't let a taken seat be picked", () => {
  render(<SeatMap places={places} selectedSeats={[]} onToggle={vi.fn()} />);

  expect(screen.getByRole("button", { name: "Row 1, seat 1, taken" })).toBeDisabled();
});

it("shows a selected seat's price and removes it from the tooltip", async () => {
  const onToggle = vi.fn();
  const seat = { row: 3, seat: 2, price: 12 };
  render(<SeatMap places={places} selectedSeats={[seat]} onToggle={onToggle} />);

  expect(screen.getByRole("button", { name: "Row 3, seat 2, CA$12.00" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await userEvent.click(screen.getByRole("button", { name: "Remove Row 3, seat 2" }));

  expect(onToggle).toHaveBeenCalledWith(seat);
});
