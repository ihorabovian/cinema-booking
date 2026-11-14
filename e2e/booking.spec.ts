import { expect, test } from "@playwright/test";

// The whole booking, paid with a test card. It places a real order on the API.
test("books a seat from the films page and pays for it", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Details" }).first().click();

  await expect(page).toHaveURL(/\/films\/\w+$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  // Any seance of the first date.
  await page.getByRole("button", { name: /^\d{2}:\d{2}$/ }).first().click();
  await page.getByRole("link", { name: "Continue" }).click();

  await expect(page).toHaveURL(/\/booking\?/);
  await expect(page.getByRole("heading", { name: "Seat selection" })).toBeVisible();

  // The last free seat: other runs and people take the first ones.
  await page.locator('button[aria-pressed="false"][aria-label^="Row"]').last().click();
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
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.getByRole("heading", { name: "Payment card" })).toBeVisible();

  // The browser Back button returns to the filled details. nuqs writes the URL a moment
  // after the step renders, so wait for it before going back.
  await expect(page).toHaveURL(/step=4/);
  await page.goBack();
  await expect(page.getByRole("heading", { name: "Your details" })).toBeVisible();
  await expect(page.getByLabel("City*")).toHaveValue("Toronto");

  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByRole("heading", { name: "Payment card" })).toBeVisible();
  await page.getByLabel("Card number").fill("4111111111111111");
  await page.getByLabel("Expiry").fill("1230");
  await page.getByLabel("CVV").fill("123");
  await page.getByRole("button", { name: "Pay" }).click();

  await expect(page.getByRole("heading", { name: "Payment successful" })).toBeVisible();
  await expect(page.getByText("Order number")).toBeVisible();
  await expect(page.getByRole("link", { name: "Order details" })).toBeVisible();
});
