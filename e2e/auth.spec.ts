import { expect, test } from "@playwright/test";

// Signing in sends a real SMS, so these tests stay on the guest side.

for (const path of ["/tickets", "/profile"]) {
  test(`${path} sends a guest to sign in and back`, async ({ page }) => {
    await page.goto(path);

    await expect(page).toHaveURL(`/signin?next=${encodeURIComponent(path)}`);
    await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  });
}

test("sign-in checks the phone before sending a code", async ({ page }) => {
  await page.goto("/signin");

  await page.getByLabel("Phone").fill("416555");
  await expect(page.getByLabel("Phone")).toHaveValue("(416) 555");
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.getByText("Enter a 10-digit phone number")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
});
