import { redirect } from "next/navigation";
import { beforeEach, expect, it, vi } from "vitest";
import { requestOtp, verifyOtp } from "./auth";
import { createOtp, signIn } from "@/lib/cinema-api";
import { setSessionToken } from "@/lib/session";

vi.mock("next/navigation", () => ({ redirect: vi.fn() }));
vi.mock("@/lib/cinema-api", () => ({ createOtp: vi.fn(), signIn: vi.fn(), signOut: vi.fn() }));
vi.mock("@/lib/session", () => ({
  setSessionToken: vi.fn(),
  clearSessionToken: vi.fn(),
  getSessionToken: vi.fn(),
}));

beforeEach(() => {
  vi.resetAllMocks();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

it("asks the API for a code for the phone in international form", async () => {
  vi.mocked(createOtp).mockResolvedValue(30_000);

  expect(await requestOtp("(416) 555-0123")).toEqual({ ok: true, retryDelay: 30_000 });
  expect(createOtp).toHaveBeenCalledWith("+14165550123");
});

it("doesn't ask for a code for an incomplete phone", async () => {
  expect(await requestOtp("(416) 555")).toEqual({
    ok: false,
    error: "Enter a 10-digit phone number",
  });
  expect(createOtp).not.toHaveBeenCalled();
});

it("returns an error when the code can't be sent", async () => {
  vi.mocked(createOtp).mockRejectedValue(new Error("sms down"));

  expect(await requestOtp("(416) 555-0123")).toEqual({
    ok: false,
    error: "Couldn't send the code. Please try again",
  });
});

it("signs in, keeps the session and goes to the page that asked for it", async () => {
  vi.mocked(signIn).mockResolvedValue("token-1");

  await verifyOtp("(416) 555-0123", "123456", "/tickets");

  expect(signIn).toHaveBeenCalledWith("+14165550123", 123456);
  expect(setSessionToken).toHaveBeenCalledWith("token-1");
  expect(redirect).toHaveBeenCalledWith("/tickets");
});

it("doesn't send the user to another site after signing in", async () => {
  vi.mocked(signIn).mockResolvedValue("token-1");

  await verifyOtp("(416) 555-0123", "123456", "//evil.com");

  expect(redirect).toHaveBeenCalledWith("/");
});

it("rejects a wrong code without starting a session", async () => {
  vi.mocked(signIn).mockRejectedValue(new Error("bad code"));

  expect(await verifyOtp("(416) 555-0123", "123456", "/tickets")).toEqual({
    error: "Wrong or expired code",
  });
  expect(setSessionToken).not.toHaveBeenCalled();
  expect(redirect).not.toHaveBeenCalled();
});

it("doesn't check a malformed code", async () => {
  expect(await verifyOtp("(416) 555-0123", "12", "/tickets")).toEqual({
    error: "Enter the code from the SMS",
  });
  expect(signIn).not.toHaveBeenCalled();
});
