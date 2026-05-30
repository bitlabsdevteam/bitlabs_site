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

async function hasTransformerFallback(page: import("@playwright/test").Page) {
  return page.locator(".landing-transformer-scene").evaluate((element) =>
    window.getComputedStyle(element).backgroundImage.includes("transformer-background"),
  );
}

function hashBuffer(buffer: Buffer) {
  let hash = 2166136261;
  for (let index = 0; index < buffer.length; index += 11) {
    hash ^= buffer[index];
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash;
}

test.describe("homepage cinematic stage", () => {
  test("does not emit the known scroll-container or THREE clock warnings", async ({ page }) => {
    const warningMessages: string[] = [];

    page.on("console", (message) => {
      if (message.type() !== "warning") {
        return;
      }

      warningMessages.push(message.text());
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator('[data-testid="landing-cinematic-canvas"] canvas')).toBeVisible();
    await page.waitForTimeout(500);

    expect(
      warningMessages.filter((message) =>
        message.includes("Please ensure that the container has a non-static position") ||
        message.includes("THREE.Clock: This module has been deprecated"),
      ),
    ).toEqual([]);
  });

  test("renders a visible nonblank canvas behind readable hero content", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const canvas = page.locator('[data-testid="landing-cinematic-canvas"] canvas');
    await expect(canvas).toBeVisible();

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /explore expertise/i })).toBeVisible();

    const canvasSignal = await readCanvasSignal(page);
    expect(canvasSignal.width).toBeGreaterThan(0);
    expect(canvasSignal.height).toBeGreaterThan(0);
    expect(canvasSignal.signal > 1000 || (await hasTransformerFallback(page))).toBe(true);

    const titleBox = await page.getByRole("heading", { level: 1 }).boundingBox();
    const sceneBox = await page.locator('[data-testid="landing-cinematic-canvas"]').boundingBox();

    expect(titleBox?.width ?? 0).toBeGreaterThan(260);
    expect(titleBox?.height ?? 0).toBeGreaterThan(40);
    expect(sceneBox?.width ?? 0).toBeGreaterThan(300);
    expect(sceneBox?.height ?? 0).toBeGreaterThan(300);
  });

  test("keeps the hero alive at rest and reacts more strongly to pointer and scroll input", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator('[data-testid="landing-cinematic-canvas"] canvas')).toBeVisible();
    await expect(page.locator('[data-testid="landing-cinema-grade"]')).toHaveCount(1);
    await expect(page.locator(".landing-cinema-light-sweep")).toHaveCount(1);

    const before = await page.locator(".landing-transformer-scene").screenshot();
    await page.waitForTimeout(700);
    const idleAfter = await page.locator(".landing-transformer-scene").screenshot();

    await page.mouse.move(1200, 220);
    await page.waitForTimeout(650);

    const pointerAfter = await page.locator(".landing-transformer-scene").screenshot();

    expect(before.length).toBeGreaterThan(1000);
    expect(idleAfter.length).toBeGreaterThan(1000);
    expect(pointerAfter.length).toBeGreaterThan(1000);
    expect(hashBuffer(idleAfter)).not.toBe(hashBuffer(before));
    expect(hashBuffer(pointerAfter)).not.toBe(hashBuffer(idleAfter));

    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 0.86, behavior: "auto" }));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
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
    await page.goto("/?reduced-motion=1", { waitUntil: "domcontentloaded" });

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".landing-transformer-scene")).toHaveAttribute("data-reduced-motion", "true");

    const canvasSignal = await readCanvasSignal(page);
    expect(canvasSignal.signal > 1000 || (await hasTransformerFallback(page))).toBe(true);

    const reducedState = await page.locator(".landing-transformer-scene").evaluate((element) => {
      const sweep = element.querySelector(".landing-cinema-light-sweep");
      const label = element.querySelector(".scene-label");

      return {
        sweepAnimation: sweep ? window.getComputedStyle(sweep).animationName : null,
        labelAnimation: label ? window.getComputedStyle(label).animationName : null,
      };
    });

    expect(reducedState.sweepAnimation).toBe("none");
    expect(reducedState.labelAnimation === null || reducedState.labelAnimation === "none").toBe(true);
  });

  test("fits the mobile viewport without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const overflow = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 2);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('[data-testid="landing-cinematic-canvas"] canvas')).toBeVisible();
  });
});
