import { expect, test } from "@playwright/test";
for (const locale of ["en", "ja"] as const) {
  const root = locale === "en" ? "" : "/ja";
  test(`${locale} hero is stable, readable, and links to work and contact`, async ({
    page,
  }) => {
    await page.goto(root || "/");
    const hero = page.locator("#hero");
    await expect(hero.getByRole("heading", { level: 1 })).toContainText(
      locale === "en" ? "Research depth." : "AI研究の深さを、",
    );
    await expect(
      hero.getByRole("link", {
        name: locale === "en" ? "Discuss your project" : "プロジェクトのご相談",
      }),
    ).toHaveAttribute("href", `${root}/contact`);
    await hero
      .getByRole("link", {
        name: locale === "en" ? "Explore our work" : "取り組みを見る",
      })
      .click();
    await expect(page.locator("#demonstrations")).toBeInViewport();
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
  });
  test(`${locale} workflow supports approval and rejection without network actions`, async ({
    page,
  }) => {
    let requests = 0;
    page.on("request", (req) => {
      if (req.method() === "POST") requests++;
    });
    await page.goto(`${root}/research/bounded-agent-workflow`);
    await page
      .getByRole("button", {
        name: locale === "en" ? "Simulate approval" : "承認を試す",
      })
      .click();
    await expect(page.getByRole("status")).toContainText(
      locale === "en" ? "No order was placed" : "発注は行っていません",
    );
    await page
      .getByRole("button", {
        name: locale === "en" ? "Reset example" : "リセット",
      })
      .click();
    await page
      .getByRole("button", {
        name: locale === "en" ? "Simulate rejection" : "却下を試す",
      })
      .click();
    await expect(page.getByRole("status")).toContainText(
      locale === "en" ? "No action was taken" : "操作は行っていません",
    );
    expect(requests).toBe(0);
  });
}
test("language links preserve equivalent routes and legacy anchors", async ({
  page,
}) => {
  await page.goto("/about#contact-form");
  await page.getByRole("link", { name: "日本語", exact: true }).click();
  await expect(page).toHaveURL(/\/ja\/about#contact-form$/);
  await expect(page.locator("#contact-form")).toBeInViewport();
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/about#contact-form$/);
});
test("reduced motion keeps all content visible and disables motion", async ({
  page,
  browserName,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("#hero h1")).toBeVisible();
  expect(
    await page
      .locator(".system-diagram")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  // Safari uses Option-Tab to include links when full keyboard access is off.
  await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});
