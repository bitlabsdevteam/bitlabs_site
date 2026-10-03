import config from "./playwright.config";

// Retain the existing mobile-check entry point with the shared test suite.
export default {
  ...config,
  projects: config.projects?.filter((project) => project.name !== "desktop"),
};
