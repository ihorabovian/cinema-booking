import { describe, expect, it } from "vitest";
import { maskCardNumber, maskCvv, maskExpiry, maskPhone, toE164Phone } from "./input-masks";

describe("maskPhone", () => {
  it.each([
    ["416", "416"],
    ["4165", "(416) 5"],
    ["4165550123", "(416) 555-0123"],
    // A leading country code is dropped, extra digits are cut off.
    ["+1 416 555 0123", "(416) 555-0123"],
    ["41655501239999", "(416) 555-0123"],
    ["abc", ""],
  ])("formats %j as %j", (input, expected) => {
    expect(maskPhone(input)).toBe(expected);
  });
});

it("toE164Phone turns a masked phone into the API format", () => {
  expect(toE164Phone("(416) 555-0123")).toBe("+14165550123");
});

it("maskCardNumber groups 16 digits by four", () => {
  expect(maskCardNumber("41111111111111119999")).toBe("4111 1111 1111 1111");
  expect(maskCardNumber("41111")).toBe("4111 1");
});

it("maskExpiry adds the slash after the month", () => {
  expect(maskExpiry("12")).toBe("12");
  expect(maskExpiry("1226")).toBe("12/26");
  expect(maskExpiry("12/2699")).toBe("12/26");
});

it("maskCvv keeps up to four digits", () => {
  expect(maskCvv("12a345")).toBe("1234");
});
