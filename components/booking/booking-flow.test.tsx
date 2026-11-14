import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { beforeEach, expect, it, vi } from "vitest";
import { BookingFlow } from "./booking-flow";
import { createPayment } from "@/lib/actions/create-payment";
import { PERSON_STORAGE_KEY } from "@/lib/booking";
import { order, places, seance } from "@/.storybook/fixtures";

vi.mock("@/lib/actions/create-payment", () => ({ createPayment: vi.fn() }));

const person = {
  lastName: "Smith",
  firstName: "John",
  middleName: "",
  phone: "(416) 555-0123",
  city: "Toronto",
  email: "john@example.com",
};

beforeEach(() => {
  vi.resetAllMocks();
  window.scrollTo = vi.fn();
  sessionStorage.clear();
  sessionStorage.setItem(PERSON_STORAGE_KEY, JSON.stringify(person));
});

// The payment step, as the customer reaches it: seats chosen, details filled in.
function renderPaymentStep() {
  render(
    <NuqsTestingAdapter searchParams="?step=4&seats=3-2,3-3">
      <BookingFlow seance={seance} places={places} profile={null} />
    </NuqsTestingAdapter>,
  );
}

async function pay() {
  await userEvent.type(await screen.findByLabelText("Card number*"), "4111111111111111");
  await userEvent.type(screen.getByLabelText("Expiry*"), "1299");
  await userEvent.type(screen.getByLabelText("CVV*"), "123");
  await userEvent.click(screen.getByRole("button", { name: "Pay" }));
}

it("pays for the chosen seats and shows the order", async () => {
  vi.mocked(createPayment).mockResolvedValue({ ok: true, order });
  renderPaymentStep();

  await pay();

  expect(createPayment).toHaveBeenCalledWith(
    seance,
    [
      { row: 3, seat: 2, price: 12 },
      { row: 3, seat: 3, price: 12 },
    ],
    person,
    { pan: "4111 1111 1111 1111", expireDate: "12/99", cvv: "123" },
  );
  expect(await screen.findByRole("heading", { name: "Payment successful" })).toBeInTheDocument();
  expect(screen.getByText(String(order.orderNumber))).toBeInTheDocument();
  // The next booking asks for the details again.
  expect(sessionStorage.getItem(PERSON_STORAGE_KEY)).toBeNull();
});

it("shows a declined payment on the card step and keeps the booking", async () => {
  vi.mocked(createPayment).mockResolvedValue({
    ok: false,
    error: "Payment failed. Please try again",
  });
  renderPaymentStep();

  await pay();

  expect(await screen.findByRole("alert")).toHaveTextContent("Payment failed. Please try again");
  expect(screen.getByRole("heading", { name: "Payment card" })).toBeInTheDocument();
  expect(sessionStorage.getItem(PERSON_STORAGE_KEY)).not.toBeNull();
});
