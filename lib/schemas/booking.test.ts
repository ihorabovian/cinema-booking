import { describe, expect, it } from "vitest";
import { profileSchema } from "./auth";
import { cardSchema, personSchema } from "./booking";

const person = {
  lastName: "Smith",
  firstName: "John",
  middleName: "",
  phone: "(416) 555-0123",
  city: "Toronto",
  email: "john@example.com",
};

const card = { pan: "4111 1111 1111 1111", expireDate: "12/99", cvv: "123" };

function errorOf(result: { success: boolean; error?: { issues: { message: string }[] } }) {
  return result.error?.issues[0].message;
}

describe("personSchema", () => {
  it("accepts filled details with an empty middle name", () => {
    expect(personSchema.safeParse(person).success).toBe(true);
  });

  it("rejects a blank first name and a short phone", () => {
    expect(errorOf(personSchema.safeParse({ ...person, firstName: "  " }))).toBe("Enter your first name");
    expect(errorOf(personSchema.safeParse({ ...person, phone: "(416) 555" }))).toBe(
      "Enter a 10-digit phone number",
    );
  });
});

describe("cardSchema", () => {
  it("accepts a valid card", () => {
    expect(cardSchema.safeParse(card).success).toBe(true);
  });

  it("rejects a mistyped card number", () => {
    expect(errorOf(cardSchema.safeParse({ ...card, pan: "4111 1111 1111 1112" }))).toBe(
      "Check the card number",
    );
  });

  it("rejects an expired card and a bad month", () => {
    expect(errorOf(cardSchema.safeParse({ ...card, expireDate: "01/20" }))).toBe("This card has expired");
    expect(errorOf(cardSchema.safeParse({ ...card, expireDate: "13/30" }))).toBe("Enter the date as MM/YY");
  });
});

it("profileSchema lets city and email stay empty, unlike checkout", () => {
  const profile = { lastName: "Smith", firstName: "John", middleName: "" };
  expect(profileSchema.safeParse({ ...profile, city: "", email: "" }).success).toBe(true);
  expect(profileSchema.safeParse({ ...profile, email: "not-an-email" }).success).toBe(false);
});
