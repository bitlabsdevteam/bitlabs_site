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

async function hasPosterFallback(page: import("@playwright/test").Page) {
  return page.locator(".landing-transformer-scene").evaluate((element) => {
    const poster = element.querySelector('[data-testid="landing-cinematic-poster"]') as HTMLDivElement | null;

    return Boolean(poster);
  });
}

async function getSceneSource(page: import("@playwright/test").Page) {
  return page.locator(".landing-transformer-scene").getAttribute("data-scene-source");
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
  test("settles the hero headline into a readable denoised state", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const title = page.locator('[data-testid="animated-hero-title"]');

    await expect(title).toHaveAttribute("data-hero-language", "en");
    await expect(page.getByRole("heading", { level: 1, name: /Agentic systems, model programs/i })).toBeVisible();
    await expect
      .poll(() => title.getAttribute("data-hero-phase"), { timeout: 5000 })
      .toBe("settled");

    const settledState = await title.evaluate((element) => ({
      cycle: element.getAttribute("data-hero-cycle"),
      loopState: element.getAttribute("data-hero-loop-state"),
      motion: element.getAttribute("data-hero-motion"),
      label: element.getAttribute("aria-label"),
      clusterCount: element.querySelectorAll(".animated-hero-title__cluster").length,
    }));

    expect(settledState.motion).toBe("dynamic");
    expect(settledState.label).toBe(
      "Agentic systems, model programs, and inference stacks for real deployment.",
    );
    expect(settledState.loopState).toBe("idle");
    expect(settledState.cycle).toBe("0");
    expect(settledState.clusterCount).toBeGreaterThan(6);
  });

  test("does not emit the known scroll-container or THREE clock warnings", async ({ page }) => {
    const warningMessages: string[] = [];

    page.on("console", (message) => {
      if (message.type() !== "warning") {
        return;
      }

      warningMessages.push(message.text());
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".landing-transformer-scene")).toBeVisible();
    await page.waitForTimeout(500);

    expect(
      warningMessages.filter((message) =>
        message.includes("Please ensure that the container has a non-static position") ||
        message.includes("THREE.Clock: This module has been deprecated"),
      ),
    ).toEqual([]);
  });

  test("renders a visible cinematic stage behind readable hero content", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const scene = page.locator(".landing-transformer-scene");
    const canvas = page.locator('[data-testid="landing-cinematic-canvas"] canvas');
    await expect(scene).toBeVisible();
    const sceneSource = await getSceneSource(page);

    if (sceneSource === "poster") {
      await expect(page.locator('[data-testid="landing-cinematic-poster"]')).toHaveCount(1);
      await expect(page.locator('[data-testid="landing-cinematic-canvas"]')).toHaveCount(0);
    } else {
      await expect(scene).toHaveAttribute("data-scene-source", "glb");
      await expect(canvas).toBeVisible();
      await expect(page.locator('[data-testid="landing-cinematic-poster"]')).toHaveCount(0);
    }

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /explore expertise/i })).toBeVisible();

    if (sceneSource !== "poster") {
      const canvasSignal = await readCanvasSignal(page);
      expect(canvasSignal.width).toBeGreaterThan(0);
      expect(canvasSignal.height).toBeGreaterThan(0);
      expect(canvasSignal.signal).toBeGreaterThan(1000);
    }

    const titleBox = await page.getByRole("heading", { level: 1 }).boundingBox();
    const sceneBox = await scene.boundingBox();

    expect(titleBox?.width ?? 0).toBeGreaterThan(260);
    expect(titleBox?.height ?? 0).toBeGreaterThan(40);
    expect(sceneBox?.width ?? 0).toBeGreaterThan(300);
    expect(sceneBox?.height ?? 0).toBeGreaterThan(300);
  });

  test("keeps the hero alive at rest and reacts more strongly to pointer and scroll input", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".landing-transformer-scene")).toBeVisible();
    await expect(page.locator('[data-testid="landing-cinema-grade"]')).toHaveCount(1);
    await expect(page.locator(".landing-cinema-light-sweep")).toHaveCount(1);

    const sceneSource = await getSceneSource(page);
    if (sceneSource === "poster") {
      await expect(page.locator('[data-testid="landing-cinematic-poster"]')).toHaveCount(1);
    } else {
      await expect(page.locator('[data-testid="landing-cinematic-canvas"] canvas')).toBeVisible();
      await expect(page.locator('[data-testid="landing-cinematic-poster"]')).toHaveCount(0);
    }

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
    if (sceneSource !== "poster") {
      expect(hashBuffer(pointerAfter)).not.toBe(hashBuffer(idleAfter));
    }

    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 0.86, behavior: "auto" }));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  });

  test("keeps the headline readable while subtle loop passes introduce bounded change", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const title = page.locator('[data-testid="animated-hero-title"]');
    await expect
      .poll(() => title.getAttribute("data-hero-phase"), { timeout: 5000 })
      .toBe("settled");

    const settledShot = await title.screenshot();

    await expect
      .poll(() => title.getAttribute("data-hero-cycle"), { timeout: 9000 })
      .not.toBe("0");
    await expect
      .poll(() => title.getAttribute("data-hero-loop-state"), { timeout: 3000 })
      .toBe("active");

    const activeShot = await title.screenshot();

    expect(hashBuffer(activeShot)).not.toBe(hashBuffer(settledShot));
    await expect(page.getByRole("heading", { level: 1, name: /Agentic systems, model programs/i })).toBeVisible();
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
    await expect(page.locator(".landing-transformer-scene")).toHaveAttribute("data-scene-source", "poster");
    await expect(page.locator('[data-testid="landing-cinematic-poster"]')).toHaveCount(1);
    await expect(page.locator('[data-testid="landing-cinematic-canvas"]')).toHaveCount(0);
    await expect(page.locator('[data-testid="animated-hero-title"]')).toHaveAttribute("data-hero-motion", "reduced");
    await expect(page.locator('[data-testid="animated-hero-title"]')).toHaveAttribute("data-hero-cycle", "0");
    await expect(page.locator(".animated-hero-title__sweep")).toHaveCount(0);

    expect(await hasPosterFallback(page)).toBe(true);

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

  test("renders the live 3D artifact when motion is allowed", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const scene = page.locator(".landing-transformer-scene");
    await expect(scene).toBeVisible();

    const sceneSource = await getSceneSource(page);
    expect(sceneSource === "glb" || sceneSource === "poster").toBe(true);

    if (sceneSource === "poster") {
      await expect(page.locator('[data-testid="landing-cinematic-poster"]')).toHaveCount(1);
      await expect(page.locator('[data-testid="landing-cinematic-canvas"]')).toHaveCount(0);
    } else {
      await expect(scene).toHaveAttribute("data-scene-source", "glb");
      await expect(page.locator('[data-testid="landing-cinematic-canvas"]')).toHaveCount(1);
      await expect(page.locator('[data-testid="landing-cinematic-poster"]')).toHaveCount(0);
    }
  });

  test("falls back to the poster when the WebGL context is lost", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const scene = page.locator(".landing-transformer-scene");
    const canvas = page.locator('[data-testid="landing-cinematic-canvas"] canvas');

    await expect(scene).toHaveAttribute("data-scene-source", "glb");
    await expect(canvas).toBeVisible();

    await canvas.evaluate((element) => {
      const event = new Event("webglcontextlost", { bubbles: false, cancelable: true });
      element.dispatchEvent(event);
    });

    await expect(scene).toHaveAttribute("data-scene-source", "poster");
    await expect(page.locator('[data-testid="landing-cinematic-poster"]')).toHaveCount(1);
    await expect(page.locator('[data-testid="landing-cinematic-canvas"]')).toHaveCount(0);
  });

  test("renders the Japanese hero title without broken spacing or glyph splitting", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "JP" }).click();

    const title = page.locator('[data-testid="animated-hero-title"]');
    const expectedTitle = "エージェント、モデル開発、推論基盤を本番導入まで設計するAIパートナー。";

    await expect(title).toHaveAttribute("data-hero-language", "ja");
    await expect(page.getByRole("heading", { level: 1, name: expectedTitle })).toBeVisible();
    await expect
      .poll(() => title.getAttribute("data-hero-phase"), { timeout: 6000 })
      .toBe("settled");

    const tokenState = await title.evaluate((element) => ({
      whitespaceCount: element.querySelectorAll(".animated-hero-title__whitespace").length,
      clusterText: Array.from(element.querySelectorAll<HTMLElement>(".animated-hero-title__cluster")).map(
        (node) => node.dataset.clusterText ?? "",
      ),
    }));

    expect(tokenState.whitespaceCount).toBe(0);
    expect(tokenState.clusterText.join("")).toBe(expectedTitle);
    expect(tokenState.clusterText.every((cluster) => cluster.length >= 1)).toBe(true);
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

    const sceneSource = await getSceneSource(page);
    if (sceneSource === "poster") {
      await expect(page.locator('[data-testid="landing-cinematic-poster"]')).toHaveCount(1);
    } else {
      await expect(page.locator('[data-testid="landing-cinematic-canvas"] canvas')).toBeVisible();
    }
  });
});
