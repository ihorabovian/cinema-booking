import { z } from "zod";

// One place for the booking form rules. The forms read these schemas for validation,
// the asterisk on required fields and their value types.

export function requiredText(message: string) {
  return z.string().trim().min(1, message);
}

// "(416) 555-0123", as maskPhone formats it.
export const phoneSchema = z
  .string()
  .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Enter a 10-digit phone number");

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Enter your email")
  .pipe(z.email("Enter a valid email"));

// Luhn checksum: catches a mistyped digit or two swapped neighbours in a card number.
function passesLuhn(cardNumber: string) {
  const digits = cardNumber.replace(/\D/g, "");
  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    // Every second digit from the right is doubled.
    let digit = Number(digits[digits.length - 1 - i]);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  return sum % 10 === 0;
}

// "12/26" is valid through the last day of December 2026.
function isNotExpired(expiry: string) {
  const [month, year] = expiry.split("/").map(Number);
  const firstDayAfterExpiry = new Date(2000 + year, month, 1);

  return firstDayAfterExpiry > new Date();
}

export const personSchema = z.object({
  lastName: requiredText("Enter your last name"),
  firstName: requiredText("Enter your first name"),
  middleName: z.string().trim(),
  phone: phoneSchema,
  city: requiredText("Enter your city"),
  email: emailSchema,
});

export const cardSchema = z.object({
  pan: z
    .string()
    .regex(/^\d{4}( \d{4}){3}$/, "Enter the 16-digit card number")
    .refine(passesLuhn, "Check the card number"),
  expireDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Enter the date as MM/YY")
    .refine(isNotExpired, "This card has expired"),
  cvv: z.string().regex(/^\d{3,4}$/, "Enter 3 or 4 digits"),
});

export type PersonDetails = z.output<typeof personSchema>;
export type CardDetails = z.output<typeof cardSchema>;
