import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { CardForm } from "./card-form";

it("rejects a mistyped card number", async () => {
  const onSubmit = vi.fn();
  render(<CardForm onSubmit={onSubmit} onBack={vi.fn()} />);

  await userEvent.type(screen.getByLabelText("Card number*"), "4111111111111112");
  await userEvent.type(screen.getByLabelText("Expiry*"), "1299");
  await userEvent.type(screen.getByLabelText("CVV*"), "123");
  await userEvent.click(screen.getByRole("button", { name: "Pay" }));

  expect(await screen.findByText("Check the card number")).toBeInTheDocument();
  expect(onSubmit).not.toHaveBeenCalled();
});

it("pays with a valid card", async () => {
  const onSubmit = vi.fn();
  render(<CardForm onSubmit={onSubmit} onBack={vi.fn()} />);

  await userEvent.type(screen.getByLabelText("Card number*"), "4111111111111111");
  await userEvent.type(screen.getByLabelText("Expiry*"), "1299");
  await userEvent.type(screen.getByLabelText("CVV*"), "123");
  await userEvent.click(screen.getByRole("button", { name: "Pay" }));

  expect(onSubmit).toHaveBeenCalledWith(
    { pan: "4111 1111 1111 1111", expireDate: "12/99", cvv: "123" },
    expect.anything(),
  );
});

it("shows a declined payment", () => {
  render(<CardForm error="Payment failed. Please try again" onSubmit={vi.fn()} onBack={vi.fn()} />);

  expect(screen.getByRole("alert")).toHaveTextContent("Payment failed. Please try again");
});
