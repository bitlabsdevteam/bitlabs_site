import { expect, test } from "@playwright/test";
const ids = [
  "p-autonomous-agents",
  "p-workflow-agents",
  "p-voice-agents",
  "p-llm-fine-tuning",
  "p-gpu-inference",
];
for (const [prefix, heading] of [
  ["", "What we build"],
  ["/ja", "私たちが構築するもの"],
] as const) {
  test(`services page shows the five product kinds (${prefix || "en"})`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/services`);
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    for (const id of ids) await expect(page.locator(`#${id}`)).toBeVisible();
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
test("Japanese home product tiles stay on the Japanese services page", async ({
  page,
}) => {
  await page.goto("/ja");
  const tile = page.locator('.product-strip a[href$="#p-voice-agents"]');
  await tile.scrollIntoViewIfNeeded();
  await tile.click();
  await expect(page).toHaveURL(/\/ja\/services#p-voice-agents$/);
});
