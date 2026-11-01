import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { SeancePicker } from "./seance-picker";
import { schedules } from "@/.storybook/fixtures";

it("continues only once a time is picked, to that seance's booking", async () => {
  render(<SeancePicker filmId="1" schedules={schedules} />);

  expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();

  await userEvent.click(screen.getByRole("button", { name: "19:00" }));

  const link = screen.getByRole("link", { name: "Continue" });
  const url = new URL(link.getAttribute("href")!, "http://localhost");
  expect(url.pathname).toBe("/films/1/booking");
  expect(Object.fromEntries(url.searchParams)).toEqual({ date: "20.10.26", time: "19:00", hall: "green" });
});

it("a second tap on the time unselects it", async () => {
  render(<SeancePicker filmId="1" schedules={schedules} />);

  await userEvent.click(screen.getByRole("button", { name: "19:00" }));
  await userEvent.click(screen.getByRole("button", { name: "19:00" }));

  expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
});

it("picking another date clears the time", async () => {
  render(<SeancePicker filmId="1" schedules={schedules} />);

  await userEvent.click(screen.getByRole("button", { name: "19:00" }));
  await userEvent.click(screen.getByRole("button", { name: "Wed, Oct 21" }));

  expect(screen.getByRole("button", { name: "Wed, Oct 21" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
});
