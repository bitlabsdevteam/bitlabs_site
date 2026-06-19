import { expect, test } from "@playwright/test";

const routes = ["/", "/services", "/research", "/about", "/contact"] as const;

// The active Playwright project (ios-safari / android-chrome) supplies the real
// device viewport, DPR, touch, and user agent, so each spec runs once per engine.
for (const route of routes) {
  test(`${route} renders within the mobile viewport`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });

    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return {
        clientWidth: doc.clientWidth,
        scrollWidth: doc.scrollWidth,
      };
    });

    // No horizontal scroll/overflow on any mobile engine.
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 2);

    await expect(page.locator("main")).toBeVisible();

    if (route === "/") {
      // The cinematic hero must paint as either the WebGL scene or its poster
      // fallback — never a blank/broken region — on every mobile browser.
      const scene = page.locator(".landing-transformer-scene");
      await expect(scene).toBeAttached();
      const hasVisual = await page
        .locator(
          ".landing-cinematic-canvas, [data-testid='landing-cinematic-poster']",
        )
        .first()
        .count();
      expect(hasVisual).toBeGreaterThan(0);

      await page.screenshot({
        path: testInfo.outputPath(`${testInfo.project.name}-home.png`),
        fullPage: false,
      });
    }
  });
}

test("mobile nav opens, navigates, and closes without overflow", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  // The toggle's accessible name flips between open/close, so match both.
  const toggle = page.getByRole("button", {
    name: /open menu|close menu|メニューを(開く|閉じる)/i,
  });
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");

  // All primary links are reachable as stacked, full-width targets.
  const panel = page.locator("nav[id]");
  await expect(panel.getByRole("link", { name: "Services" })).toBeVisible();

  // Opening the menu must not introduce horizontal overflow.
  const overflow = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 2);

  await panel.getByRole("link", { name: "Services" }).click();
  await expect(page).toHaveURL(/\/services$/);
  // Menu auto-closes after navigation.
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});
