import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, it, vi } from "vitest";
import { requestOtp, verifyOtp } from "@/lib/actions/auth";
import { SignInFlow } from "./sign-in-flow";

vi.mock("@/lib/actions/auth", () => ({ requestOtp: vi.fn(), verifyOtp: vi.fn() }));

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(requestOtp).mockResolvedValue({ ok: true, retryDelay: 30_000 });
  vi.mocked(verifyOtp).mockResolvedValue({ error: "Wrong or expired code" });
});

async function enterPhone(phone: string) {
  await userEvent.type(screen.getByLabelText("Phone"), phone);
  await userEvent.click(screen.getByRole("button", { name: "Continue" }));
}

async function openCodeStep() {
  render(<SignInFlow returnTo="/tickets" />);
  await enterPhone("4165550123");
  await screen.findByRole("heading", { name: "Verification code" });
}

it("formats the phone and doesn't send a code for an incomplete number", async () => {
  render(<SignInFlow />);

  await userEvent.type(screen.getByLabelText("Phone"), "416555");
  expect(screen.getByLabelText("Phone")).toHaveValue("(416) 555");

  await userEvent.click(screen.getByRole("button", { name: "Continue" }));

  expect(await screen.findByText("Enter a 10-digit phone number")).toBeInTheDocument();
  expect(requestOtp).not.toHaveBeenCalled();
  expect(screen.getByRole("heading", { name: "Sign in" })).toBeInTheDocument();
});

it("asks for the code once the phone is accepted", async () => {
  await openCodeStep();

  expect(requestOtp).toHaveBeenCalledWith("(416) 555-0123");
  expect(screen.getByText("(416) 555-0123")).toBeInTheDocument();
  expect(screen.getByText("Resend the code in 30 s")).toBeInTheDocument();
});

it("stays on the phone step when the code can't be sent", async () => {
  vi.mocked(requestOtp).mockResolvedValue({ ok: false, error: "Couldn't send the code. Please try again" });
  render(<SignInFlow />);

  await enterPhone("4165550123");

  expect(await screen.findByText("Couldn't send the code. Please try again")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Sign in" })).toBeInTheDocument();
});

it("goes back to the phone step", async () => {
  await openCodeStep();

  await userEvent.click(screen.getByRole("button", { name: "Back" }));

  expect(screen.getByRole("heading", { name: "Sign in" })).toBeInTheDocument();
});

it("keeps only digits in the code and doesn't check a short one", async () => {
  await openCodeStep();

  await userEvent.type(screen.getByLabelText("Code"), "12a3");
  expect(screen.getByLabelText("Code")).toHaveValue("123");

  await userEvent.click(screen.getByRole("button", { name: "Sign in" }));

  expect(await screen.findByText("Enter the code from the SMS")).toBeInTheDocument();
  expect(verifyOtp).not.toHaveBeenCalled();
});

it("signs in with the phone and code, and shows a wrong code", async () => {
  await openCodeStep();

  await userEvent.type(screen.getByLabelText("Code"), "123456");
  await userEvent.click(screen.getByRole("button", { name: "Sign in" }));

  expect(verifyOtp).toHaveBeenCalledWith("(416) 555-0123", "123456", "/tickets");
  expect(await screen.findByText("Wrong or expired code")).toBeInTheDocument();
});
