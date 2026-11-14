import { beforeEach, expect, it, vi } from "vitest";
import { createPayment } from "./create-payment";
import { getCurrentUser } from "@/lib/auth";
import { createCinemaPayment, updateProfile } from "@/lib/cinema-api";
import { order, seance, selectedSeats } from "@/.storybook/fixtures";

vi.mock("next/cache", () => ({ updateTag: vi.fn() }));
vi.mock("@/lib/auth", () => ({ getCurrentUser: vi.fn() }));
vi.mock("@/lib/cinema-api", () => ({
  createCinemaPayment: vi.fn(),
  updateProfile: vi.fn(),
  getFilmHallsTag: (filmId: string) => `halls-${filmId}`,
}));

const person = {
  lastName: "Smith",
  firstName: "John",
  middleName: "",
  phone: "(416) 555-0123",
  city: "Toronto",
  email: "john@example.com",
};
const card = { pan: "4111 1111 1111 1111", expireDate: "12/99", cvv: "123" };

beforeEach(() => {
  vi.resetAllMocks();
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.mocked(getCurrentUser).mockResolvedValue(null);
  vi.mocked(createCinemaPayment).mockResolvedValue(order);
});

it("sends the booking to the API as a guest and returns the order", async () => {
  const result = await createPayment(seance, selectedSeats, person, card);

  expect(result).toEqual({ ok: true, order });
  expect(createCinemaPayment).toHaveBeenCalledWith(
    expect.objectContaining({
      filmId: seance.filmId,
      tickets: [
        { row: 3, column: 2 },
        { row: 3, column: 3 },
      ],
      person: expect.objectContaining({ phone: "+14165550123" }),
      debitCard: card,
    }),
    undefined,
  );
  expect(updateProfile).not.toHaveBeenCalled();
});

it("doesn't call the API with an invalid card or no seats", async () => {
  const badCard = await createPayment(seance, selectedSeats, person, { ...card, pan: "1234" });
  const noSeats = await createPayment(seance, [], person, card);

  expect(badCard).toEqual({ ok: false, error: "Check your details and try again" });
  expect(noSeats).toEqual({ ok: false, error: "Check your details and try again" });
  expect(createCinemaPayment).not.toHaveBeenCalled();
});

it("returns an error instead of throwing when the API fails", async () => {
  vi.mocked(createCinemaPayment).mockRejectedValue(new Error("declined"));

  const result = await createPayment(seance, selectedSeats, person, card);

  expect(result).toEqual({ ok: false, error: "Payment failed. Please try again" });
});

it("pays as a signed-in user and saves the details to the profile", async () => {
  vi.mocked(getCurrentUser).mockResolvedValue({ token: "token-1", user: {} } as never);
  vi.mocked(updateProfile).mockResolvedValue(undefined as never);

  await createPayment(seance, selectedSeats, person, card);

  expect(createCinemaPayment).toHaveBeenCalledWith(expect.anything(), "token-1");
  expect(updateProfile).toHaveBeenCalledWith(
    "token-1",
    expect.objectContaining({ city: "Toronto", email: "john@example.com" }),
  );
});

it("keeps the paid order when saving the profile fails", async () => {
  vi.mocked(getCurrentUser).mockResolvedValue({ token: "token-1", user: {} } as never);
  vi.mocked(updateProfile).mockRejectedValue(new Error("profile down"));

  const result = await createPayment(seance, selectedSeats, person, card);

  expect(result).toEqual({ ok: true, order });
});
