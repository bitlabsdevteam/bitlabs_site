import { expect, test } from "@playwright/test";
test("static HTML includes Japanese copy, redirects, robots, sitemap, and accessible artifact", async ({
  request,
}, info) => {
  test.skip(info.project.name !== "desktop");
  const japanese = await request.get("/ja/services");
  const html = await japanese.text();
  expect(html).toContain('lang="ja"');
  expect(html).toContain("事業の要件に合わせたAIエンジニアリング。");
  for (const prefix of ["", "/ja"]) {
    const response = await request.get(`${prefix}/expertises`, {
      maxRedirects: 0,
    });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(`${prefix}/services`);
  }
  for (const path of ["/research/not-published", "/ja/research/not-published"])
    expect((await request.get(path)).status()).toBe(404);
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "https://bitlabs.site/sitemap.xml",
  );
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect((sitemap.match(/<url>/g) || []).length).toBe(14);
  expect(sitemap).toContain("/ja/research/bounded-agent-workflow");
  const artifact = await request.get("/examples/bounded-agent-workflow.json");
  expect(artifact.ok()).toBeTruthy();
  expect((await artifact.json()).synthetic).toBe(true);
  const social = await request.get("/opengraph-image");
  expect(social.ok()).toBeTruthy();
  expect(social.headers()["content-type"]).toContain("image/png");
});
test("local content links resolve", async ({ page, request }, info) => {
  test.skip(info.project.name !== "desktop");
  const links = new Set<string>();
  for (const path of [
    "/",
    "/services",
    "/research",
    "/about",
    "/contact",
    "/career",
    "/research/bounded-agent-workflow",
    "/ja",
    "/ja/services",
    "/ja/research",
    "/ja/about",
    "/ja/contact",
    "/ja/career",
    "/ja/research/bounded-agent-workflow",
  ]) {
    await page.goto(path);
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href")!)))
      links.add(href.split("#")[0]);
  }
  for (const href of links)
    expect((await request.get(href)).ok(), href).toBeTruthy();
});
test("representative pages remain stable during loading", async ({
  page,
}, info) => {
  test.skip(info.project.name === "webkit");
  await page.addInitScript(() => {
    const metrics = { cls: 0, lcp: 0 };
    (window as unknown as { testMetrics: typeof metrics }).testMetrics =
      metrics;
    new PerformanceObserver((list) => {
      for (const item of list.getEntries()) {
        const entry = item as PerformanceEntry & {
          hadRecentInput: boolean;
          value: number;
        };
        if (!entry.hadRecentInput) metrics.cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) metrics.lcp = entry.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });
  const results = [];
  for (const path of ["/", "/ja", "/contact"]) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    await page.locator("footer").scrollIntoViewIfNeeded();
    const metrics = await page.evaluate(() => ({
      ...(window as unknown as { testMetrics: { cls: number; lcp: number } })
        .testMetrics,
      resources: performance
        .getEntriesByType("resource")
        .map((e) => ({
          name: e.name,
          bytes: (e as PerformanceResourceTiming).transferSize,
        })),
    }));
    expect(metrics.cls).toBeLessThan(0.1);
    expect(metrics.lcp).toBeLessThan(4000);
    results.push({ path, ...metrics });
  }
  await info.attach("local-loading-metrics", {
    body: JSON.stringify(results, null, 2),
    contentType: "application/json",
  });
});
test("capture desktop and mobile review artifacts", async ({ page }, info) => {
  test.skip(info.project.name === "webkit");
  for (const path of [
    "/",
    "/ja",
    "/services",
    "/contact",
    "/ja/contact",
    "/research/bounded-agent-workflow",
  ]) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const name = path === "/" ? "home" : path.replaceAll("/", "-").slice(1);
    await page.screenshot({
      path: `output/review/${info.project.name}-${name}.png`,
      fullPage: true,
    });
    if (path === "/" || path === "/ja")
      await page.screenshot({
        path: `output/review/${info.project.name}-${name}-hero.png`,
      });
  }
});
