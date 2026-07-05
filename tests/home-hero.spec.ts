import { expect, test } from "@playwright/test";

test.describe("homepage themed hero", () => {
  test("renders the themed hero with title, eyebrow, and CTA", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const hero = page.locator("#hero");
    await expect(hero).toBeVisible();

    await expect(
      page.getByRole("heading", { level: 1, name: /Enterprise AI, engineered to be/i }),
    ).toBeVisible();

    // CTA resolves to the expertises route.
    const cta = hero.getByRole("link", { name: /more info/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "#capabilities");

    // CTA scrolls to the capabilities section on the same page.
    await cta.click();
    await expect(page.locator("#capabilities")).toBeInViewport();

    // The legacy 3D cinematic stage is fully removed.
    await expect(page.locator(".landing-transformer-scene")).toHaveCount(0);
  });

  test("is dark-only with no theme toggle", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // The site is dark-only: <html> always carries the `dark` class.
    await expect(page.locator("html")).toHaveClass(/(^|\s)dark(\s|$)/);

    // The light/dark toggle has been removed.
    await expect(page.locator('button[aria-label*="theme" i]')).toHaveCount(0);
  });

  test("renders the Japanese hero copy when language is switched", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "JP" }).click();

    await expect(page.locator("#hero")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("keeps the hero within the viewport without horizontal overflow", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const overflow = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 2);
  });
});
