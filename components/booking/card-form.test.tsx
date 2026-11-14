import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { CardForm } from "./card-form";

// What counts as a valid card is covered by the cardSchema tests. These check that the
// form shows the schema's errors and submits what the user typed.

async function fillCard(card: { pan: string; expiry: string; cvv: string }) {
  await userEvent.type(screen.getByLabelText("Card number*"), card.pan);
  await userEvent.type(screen.getByLabelText("Expiry*"), card.expiry);
  await userEvent.type(screen.getByLabelText("CVV*"), card.cvv);
  await userEvent.click(screen.getByRole("button", { name: "Pay" }));
}

it("shows what's missing and doesn't submit an empty form", async () => {
  const onSubmit = vi.fn();
  render(<CardForm onSubmit={onSubmit} onBack={vi.fn()} />);

  await userEvent.click(screen.getByRole("button", { name: "Pay" }));

  expect(await screen.findByText("Enter the 16-digit card number")).toBeInTheDocument();
  expect(screen.getByText("Enter 3 or 4 digits")).toBeInTheDocument();
  expect(onSubmit).not.toHaveBeenCalled();
});

it("doesn't submit an expired card or a short CVV", async () => {
  const onSubmit = vi.fn();
  render(<CardForm onSubmit={onSubmit} onBack={vi.fn()} />);

  await fillCard({ pan: "4111111111111111", expiry: "0120", cvv: "12" });

  expect(await screen.findByText("This card has expired")).toBeInTheDocument();
  expect(screen.getByText("Enter 3 or 4 digits")).toBeInTheDocument();
  expect(onSubmit).not.toHaveBeenCalled();
});

it("formats the card and submits it", async () => {
  const onSubmit = vi.fn();
  render(<CardForm onSubmit={onSubmit} onBack={vi.fn()} />);

  await fillCard({ pan: "4111111111111111", expiry: "1299", cvv: "123" });

  expect(screen.getByLabelText("Card number*")).toHaveValue("4111 1111 1111 1111");
  expect(onSubmit).toHaveBeenCalledWith(
    { pan: "4111 1111 1111 1111", expireDate: "12/99", cvv: "123" },
    expect.anything(),
  );
});
