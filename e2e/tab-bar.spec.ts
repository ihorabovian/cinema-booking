import { expect, test } from "@playwright/test";

// The tab bar shows only on phones, so this runs in the mobile project.
test.describe("tab bar @mobile", () => {
  test("each tab leads to its section", async ({ page }) => {
    await page.goto("/");
    const tabBar = page.getByRole("navigation").filter({ has: page.getByRole("link", { name: "Tickets" }) });

    await expect(tabBar.getByRole("link", { name: "Films" })).toHaveAttribute("aria-current", "page");

    // Guests reach sign-in for their tickets and profile.
    await tabBar.getByRole("link", { name: "Tickets" }).tap();
    await expect(page).toHaveURL("/signin?next=%2Ftickets");

    await page.goBack();
    await expect(page).toHaveURL("/");
    await tabBar.getByRole("link", { name: "Profile" }).tap();
    await expect(page).toHaveURL("/signin?next=%2Fprofile");

    await page.goBack();
    await tabBar.getByRole("link", { name: "Films" }).tap();
    await expect(page).toHaveURL("/");
  });
});
