import { expect, test } from "@playwright/test";
const routes = [
  "/",
  "/services",
  "/research",
  "/about",
  "/contact",
  "/career",
  "/research/bounded-agent-workflow",
];
for (const prefix of ["", "/ja"])
  for (const route of routes) {
    const path = prefix + (route === "/" ? "" : route) || "/";
    test(`${path} fits viewport with correct metadata and no browser errors`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("main h1")).toBeVisible();
      const widths = await page.evaluate(() => ({
        client: document.documentElement.clientWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      expect(widths.scroll).toBeLessThanOrEqual(widths.client + 1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://bitlabs.site${path === "/" ? "" : path}`,
      );
      await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
        "href",
        `https://bitlabs.site${route === "/" ? "" : route}`,
      );
      await expect(page.locator('link[hreflang="ja"]')).toHaveAttribute(
        "href",
        `https://bitlabs.site/ja${route === "/" ? "" : route}`,
      );
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        "content",
        /^https:\/\/bitlabs.site\/opengraph-image/,
      );
      expect(errors).toEqual([]);
    });
  }
test("mobile navigation opens, closes on Escape, and navigates", async ({
  page,
}, info) => {
  test.skip(info.project.name === "desktop");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /open menu|close menu/i });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .locator("#mobile-navigation")
    .getByRole("link", { name: "Research", exact: true })
    .click();
  await expect(page).toHaveURL(/\/research$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});
test("320px narrow layout and 200% equivalent reflow remain unclipped", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const path of ["/", "/ja", "/contact", "/ja/services"]) {
    await page.goto(path);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(321);
  }
});
