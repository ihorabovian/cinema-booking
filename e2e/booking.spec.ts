import { expect, test } from "@playwright/test";

// The whole booking up to the card step. Paying would place a real order, so it stops there.
test("books seats from the films page to the payment step", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Details" }).first().click();

  await expect(page).toHaveURL(/\/films\/\w+$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  // Any seance of the first date.
  const continueButton = page.getByRole("button", { name: "Continue" });
  await expect(continueButton).toBeDisabled();
  await page.getByRole("button", { name: /^\d{2}:\d{2}$/ }).first().click();
  await page.getByRole("link", { name: "Continue" }).click();

  await expect(page).toHaveURL(/\/booking\?/);
  await expect(page.getByRole("heading", { name: "Seat selection" })).toBeVisible();

  // Any free seat.
  await page.locator('button[aria-pressed="false"][aria-label^="Row"]').first().click();
  await expect(page.getByText("Step 1 of 4")).toBeVisible();
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.getByRole("heading", { name: "Ticket information" })).toBeVisible();
  await page.getByRole("button", { name: "Buy tickets" }).click();

  await expect(page.getByRole("heading", { name: "Your details" })).toBeVisible();
  await page.getByLabel("Last name*").fill("Smith");
  await page.getByLabel("First name*").fill("John");
  await page.getByLabel("Phone*").fill("4165550123");
  await page.getByLabel("City*").fill("Toronto");
  await page.getByLabel("Email*").fill("john@example.com");
  await expect(page.getByLabel("Phone*")).toHaveValue("(416) 555-0123");
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.getByRole("heading", { name: "Payment card" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Pay" })).toBeVisible();

  // The browser Back button returns to the filled details. nuqs writes the URL a moment
  // after the step renders, so wait for it before going back.
  await expect(page).toHaveURL(/step=4/);
  await page.goBack();
  await expect(page.getByRole("heading", { name: "Your details" })).toBeVisible();
  await expect(page.getByLabel("City*")).toHaveValue("Toronto");
});

test("the booking form doesn't continue with missing details", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Details" }).first().click();
  await page.getByRole("button", { name: /^\d{2}:\d{2}$/ }).first().click();
  await page.getByRole("link", { name: "Continue" }).click();
  await page.locator('button[aria-pressed="false"][aria-label^="Row"]').first().click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Buy tickets" }).click();

  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.getByText("Enter your last name")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Your details" })).toBeVisible();
});
