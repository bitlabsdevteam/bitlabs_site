import { expect, test } from "@playwright/test";
for (const locale of ["en", "ja"] as const) {
  const path = locale === "en" ? "/" : "/ja";
  const label = locale === "en" ? "Watch the intro" : "紹介動画を見る";
  test(`${locale} intro video opens on click and unmounts on Esc`, async ({
    page,
  }) => {
    await page.route("**/youtube-nocookie.com/**", (r) =>
      r.fulfill({ body: "<html></html>", contentType: "text/html" }),
    );
    await page.goto(path);
    await expect(page.locator("iframe")).toHaveCount(0);
    await page.getByRole("button", { name: new RegExp(label) }).click();
    await expect(page.locator("dialog[open] iframe")).toHaveAttribute(
      "src",
      /youtube-nocookie\.com\/embed\/YpYtGt7R3xE/,
    );
    await page.keyboard.press("Escape");
    await expect(page.locator("iframe")).toHaveCount(0);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });
}
