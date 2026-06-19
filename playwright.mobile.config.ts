import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PLAYWRIGHT_PORT ?? 3100);
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  use: {
    baseURL,
    trace: "off",
    video: "off",
    screenshot: "only-on-failure",
  },
  // Exercise both real mobile engines: WebKit (iOS Safari) and Chromium
  // (Android Chrome). Device descriptors bring real DPR, touch, and mobile
  // user agents so layout/rendering is validated the way phones see it.
  projects: [
    { name: "ios-safari", use: { ...devices["iPhone 13"] } },
    { name: "android-chrome", use: { ...devices["Pixel 7"] } },
  ],
  // Self-contained run against the production build; reuses an already-running
  // server (e.g. one started manually) when present.
  webServer: {
    command: `npm run start -- --port ${PORT}`,
    url: baseURL,
    timeout: 120_000,
    reuseExistingServer: true,
  },
});
