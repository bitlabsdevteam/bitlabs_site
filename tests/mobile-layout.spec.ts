import { expect, test } from "@playwright/test";

const mobileProjects = [
  { name: "iphone-13", viewport: { width: 390, height: 844 } },
  { name: "pixel-7", viewport: { width: 412, height: 915 } },
] as const;

const routes = ["/", "/services", "/research", "/about", "/contact"] as const;

for (const project of mobileProjects) {
  test.describe(project.name, () => {
    test.use({ viewport: project.viewport });

    for (const route of routes) {
      test(`${route} fits mobile viewport`, async ({ page }, testInfo) => {
        await page.goto(route, { waitUntil: "domcontentloaded" });

        const overflow = await page.evaluate(() => {
          const doc = document.documentElement;
          return {
            clientWidth: doc.clientWidth,
            scrollWidth: doc.scrollWidth,
          };
        });

        expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 2);

        await expect(page.locator("main")).toBeVisible();

        if (route === "/") {
          await page.screenshot({
            path: testInfo.outputPath(`${project.name}-home.png`),
            fullPage: false,
          });
        }
      });
    }
  });
}
