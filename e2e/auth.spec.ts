import { expect, test } from "@playwright/test";
import { readOtpCode } from "./otp";

for (const path of ["/tickets", "/profile"]) {
  test(`${path} sends a guest to sign in and back`, async ({ page }) => {
    await page.goto(path);

    await expect(page).toHaveURL(`/signin?next=${encodeURIComponent(path)}`);
    await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  });
}

test("a guest signs in with the code from the SMS and lands on the page they asked for", async ({
  page,
}) => {
  await page.goto("/tickets");

  await page.getByLabel("Phone").fill("4165550123");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByRole("heading", { name: "Verification code" })).toBeVisible();

  await page.getByLabel("Code").fill(await readOtpCode("+14165550123"));
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL("/tickets");
  await expect(page.getByRole("heading", { name: "Ticket history" })).toBeVisible();
});
