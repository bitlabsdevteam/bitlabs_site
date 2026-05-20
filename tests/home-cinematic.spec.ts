import { expect, test } from "@playwright/test";

async function readCanvasSignal(page: import("@playwright/test").Page) {
  return page.locator('[data-testid="landing-cinematic-canvas"] canvas').evaluate((canvasElement) => {
    const canvas = canvasElement as HTMLCanvasElement;
    const gl =
      canvas.getContext("webgl2", { preserveDrawingBuffer: true }) ??
      canvas.getContext("webgl", { preserveDrawingBuffer: true });

    if (!gl || canvas.width === 0 || canvas.height === 0) {
      return { width: canvas.width, height: canvas.height, signal: 0 };
    }

    const sampleWidth = canvas.width;
    const sampleHeight = canvas.height;
    const x = 0;
    const y = 0;
    const image = new Uint8Array(sampleWidth * sampleHeight * 4);
    gl.readPixels(x, y, sampleWidth, sampleHeight, gl.RGBA, gl.UNSIGNED_BYTE, image);
    let signal = 0;

    for (let index = 0; index < image.length; index += 64) {
      signal += image[index] + image[index + 1] + image[index + 2] + image[index + 3];
    }

    return { width: canvas.width, height: canvas.height, signal };
  });
}

test.describe("homepage cinematic stage", () => {
  test("renders a visible nonblank canvas behind readable hero content", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const canvas = page.locator('[data-testid="landing-cinematic-canvas"] canvas');
    await expect(canvas).toBeVisible();

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("button", { name: /talk to bitlabs/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /explore expertise/i })).toBeVisible();

    await expect.poll(async () => (await readCanvasSignal(page)).signal).toBeGreaterThan(1000);

    const canvasSignal = await readCanvasSignal(page);
    expect(canvasSignal.width).toBeGreaterThan(0);
    expect(canvasSignal.height).toBeGreaterThan(0);

    const titleBox = await page.getByRole("heading", { level: 1 }).boundingBox();
    const canvasBox = await canvas.boundingBox();

    expect(titleBox?.width ?? 0).toBeGreaterThan(260);
    expect(titleBox?.height ?? 0).toBeGreaterThan(40);
    expect(canvasBox?.width ?? 0).toBeGreaterThan(300);
    expect(canvasBox?.height ?? 0).toBeGreaterThan(300);
  });

  test("keeps the page usable with reduced motion", async ({ page }) => {
    await page.addInitScript(() => {
      (window as Window & { __BITLABS_REDUCED_MOTION__?: boolean }).__BITLABS_REDUCED_MOTION__ = true;
      const originalMatchMedia = window.matchMedia.bind(window);
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        value: (query: string) => {
          if (query === "(prefers-reduced-motion: reduce)") {
            return {
              matches: true,
              media: query,
              onchange: null,
              addEventListener: () => undefined,
              removeEventListener: () => undefined,
              addListener: () => undefined,
              removeListener: () => undefined,
              dispatchEvent: () => true,
            };
          }

          return originalMatchMedia(query);
        },
      });
    });
    await page.goto("/?reduced-motion=1", { waitUntil: "networkidle" });

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".landing-transformer-scene")).toHaveAttribute("data-reduced-motion", "true");

    const canvasSignal = await readCanvasSignal(page);
    expect(canvasSignal.signal).toBeGreaterThan(1000);
  });

  test("fits the mobile viewport without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "networkidle" });

    const overflow = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 2);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('[data-testid="landing-cinematic-canvas"] canvas')).toBeVisible();
  });
});
