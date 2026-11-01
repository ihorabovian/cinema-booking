import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, it, vi } from "vitest";
import { OrderCard } from "./order-card";
import { cancelOrder } from "@/lib/actions/orders";
import { order } from "@/.storybook/fixtures";

// The Server Action would call the real API.
vi.mock("@/lib/actions/orders", () => ({ cancelOrder: vi.fn() }));

beforeEach(() => {
  vi.mocked(cancelOrder).mockReset();
});

it("shows the order details", () => {
  render(<OrderCard order={order} canCancel={false} />);

  expect(screen.getByText("1042")).toBeInTheDocument();
  expect(screen.getByText("paid")).toBeInTheDocument();
  expect(screen.getByText("Warcraft")).toBeInTheDocument();
  expect(screen.getByText("October 20 at 19:00")).toBeInTheDocument();
  expect(screen.getByText("Row 3, seats 2 and 3")).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "Return tickets" })).not.toBeInTheDocument();
});

it("shows a cancelled order", () => {
  render(<OrderCard order={{ ...order, status: "CANCELED" }} canCancel={false} />);

  expect(screen.getByText("cancelled")).toBeInTheDocument();
});

it("returns the tickets after confirming", async () => {
  vi.mocked(cancelOrder).mockResolvedValue({ ok: true });
  render(<OrderCard order={order} canCancel />);

  await userEvent.click(screen.getByRole("button", { name: "Return tickets" }));
  expect(
    screen.getByRole("dialog", { name: "Are you sure you want to return the tickets?" }),
  ).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: "Return" }));

  expect(cancelOrder).toHaveBeenCalledWith("order-1", "1");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

it("keeps the dialog open with the error when returning fails", async () => {
  vi.mocked(cancelOrder).mockResolvedValue({ ok: false, error: "Couldn't return the tickets" });
  render(<OrderCard order={order} canCancel />);

  await userEvent.click(screen.getByRole("button", { name: "Return tickets" }));
  await userEvent.click(screen.getByRole("button", { name: "Return" }));

  expect(await screen.findByRole("alert")).toHaveTextContent("Couldn't return the tickets");
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

it("cancelling the dialog keeps the tickets", async () => {
  render(<OrderCard order={order} canCancel />);

  await userEvent.click(screen.getByRole("button", { name: "Return tickets" }));
  await userEvent.click(screen.getByRole("button", { name: "Cancel" }));

  expect(cancelOrder).not.toHaveBeenCalled();
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
