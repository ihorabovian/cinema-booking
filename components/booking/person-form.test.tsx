import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { PersonForm } from "./person-form";

function renderForm() {
  const onSubmit = vi.fn();
  const onBack = vi.fn();
  render(<PersonForm onSubmit={onSubmit} onBack={onBack} />);
  return { onSubmit, onBack };
}

it("shows what's missing and doesn't submit an empty form", async () => {
  const { onSubmit } = renderForm();

  await userEvent.click(screen.getByRole("button", { name: "Continue" }));

  expect(await screen.findByText("Enter your last name")).toBeInTheDocument();
  expect(screen.getByText("Enter your city")).toBeInTheDocument();
  // The middle name is optional.
  expect(screen.getByLabelText("Middle name")).not.toHaveAttribute("aria-invalid", "true");
  expect(onSubmit).not.toHaveBeenCalled();
});

it("formats the phone and submits filled details", async () => {
  const { onSubmit } = renderForm();

  await userEvent.type(screen.getByLabelText("Last name*"), "Smith");
  await userEvent.type(screen.getByLabelText("First name*"), "John");
  await userEvent.type(screen.getByLabelText("Phone*"), "4165550123");
  await userEvent.type(screen.getByLabelText("City*"), "Toronto");
  await userEvent.type(screen.getByLabelText("Email*"), "john@example.com");

  expect(screen.getByLabelText("Phone*")).toHaveValue("(416) 555-0123");

  await userEvent.click(screen.getByRole("button", { name: "Continue" }));

  expect(onSubmit).toHaveBeenCalledWith(
    {
      lastName: "Smith",
      firstName: "John",
      middleName: "",
      phone: "(416) 555-0123",
      city: "Toronto",
      email: "john@example.com",
    },
    expect.anything(),
  );
});

it("opens with the profile's details", () => {
  render(
    <PersonForm
      defaultValues={{ firstName: "John", city: "Toronto" }}
      onSubmit={vi.fn()}
      onBack={vi.fn()}
    />,
  );

  expect(screen.getByLabelText("First name*")).toHaveValue("John");
  expect(screen.getByLabelText("City*")).toHaveValue("Toronto");
  expect(screen.getByLabelText("Last name*")).toHaveValue("");
});

it("goes back without submitting", async () => {
  const { onBack, onSubmit } = renderForm();

  await userEvent.click(screen.getByRole("button", { name: "Back" }));

  expect(onBack).toHaveBeenCalled();
  expect(onSubmit).not.toHaveBeenCalled();
});
