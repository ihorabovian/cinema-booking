import { describe, expect, it } from "vitest";
import {
  formatPrice,
  formatSeanceDateTime,
  formatSeatsByRow,
  getTotalPrice,
  resolveSeats,
  sortSeats,
  toPaymentInput,
  toPersonDetails,
} from "./booking";
import { places, seance, selectedSeats } from "@/.storybook/fixtures";

describe("formatSeatsByRow", () => {
  it("groups seats by row", () => {
    expect(
      formatSeatsByRow([
        { row: 1, seat: 5 },
        { row: 1, seat: 6 },
        { row: 1, seat: 7 },
        { row: 2, seat: 3 },
      ]),
    ).toBe("Row 1, seats 5, 6 and 7; Row 2, seat 3");
  });
});

it("formatSeanceDateTime reads the API date format", () => {
  expect(formatSeanceDateTime("20.10.26", "19:00")).toBe("October 20 at 19:00");
});

it("formatPrice shows Canadian dollars", () => {
  expect(formatPrice(12)).toBe("CA$12.00");
});

it("getTotalPrice adds up the seats", () => {
  expect(getTotalPrice(selectedSeats)).toBe(24);
});

it("sortSeats orders by row, then seat", () => {
  const seats = [
    { row: 2, seat: 1, price: 1 },
    { row: 1, seat: 4, price: 1 },
    { row: 1, seat: 2, price: 1 },
  ];
  expect(sortSeats(seats).map(({ row, seat }) => `${row}-${seat}`)).toEqual(["1-2", "1-4", "2-1"]);
});

describe("resolveSeats", () => {
  it("keeps free seats with their prices", () => {
    expect(resolveSeats(places, [{ row: 1, seat: 2 }])).toEqual([{ row: 1, seat: 2, price: 15 }]);
  });

  it("drops sold seats, gaps, missing seats and duplicates", () => {
    const refs = [
      { row: 1, seat: 1 }, // sold
      { row: 2, seat: 5 }, // gap in the hall
      { row: 99, seat: 1 }, // no such row
      { row: 3, seat: 2 },
      { row: 3, seat: 2 },
    ];
    expect(resolveSeats(places, refs)).toEqual([{ row: 3, seat: 2, price: 12 }]);
  });
});

it("toPersonDetails fills empty profile fields with empty strings", () => {
  expect(
    toPersonDetails({
      phone: "+14165550123",
      firstname: "John",
      lastname: null,
      middlename: null,
      city: null,
      email: null,
    }),
  ).toEqual({
    lastName: "",
    firstName: "John",
    middleName: "",
    phone: "(416) 555-0123",
    city: "",
    email: "",
  });
});

it("toPaymentInput maps seats to columns and the phone to E.164", () => {
  const input = toPaymentInput(
    seance,
    selectedSeats,
    {
      lastName: "Smith",
      firstName: "John",
      middleName: "",
      phone: "(416) 555-0123",
      city: "Toronto",
      email: "john@example.com",
    },
    { pan: "4111 1111 1111 1111", expireDate: "12/30", cvv: "123" },
  );

  expect(input.tickets).toEqual([
    { row: 3, column: 2 },
    { row: 3, column: 3 },
  ]);
  expect(input.person.phone).toBe("+14165550123");
  expect(input.seance).toEqual({ date: "20.10.26", time: "19:00" });
});
