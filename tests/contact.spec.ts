import { expect, test } from "@playwright/test";
for (const locale of ["en", "ja"] as const) {
  const path = locale === "en" ? "/contact" : "/ja/contact";
  const labels =
    locale === "en"
      ? ["Name", "Work email", "Company", "Project brief", "Send inquiry"]
      : [
          "氏名",
          "勤務先メールアドレス",
          "会社名",
          "プロジェクト概要",
          "問い合わせを送信",
        ];
  test(`${locale} contact validates, handles server failure, retries, and clears draft`, async ({
    page,
  }) => {
    let calls = 0;
    let body: Record<string, string> | undefined;
    await page.route("**/api/contact", async (route) => {
      calls++;
      body = route.request().postDataJSON();
      await route.fulfill({
        status: calls === 1 ? 502 : 200,
        json: calls === 1 ? { error: "Mock server failure" } : { ok: true },
      });
    });
    await page.goto(path);
    await page.getByRole("button", { name: labels[4], exact: true }).click();
    await expect(page.getByLabel(labels[0], { exact: true })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    await expect(page.getByLabel(labels[0], { exact: true })).toBeFocused();
    expect(calls).toBe(0);
    await page.getByLabel(labels[0], { exact: true }).fill("Test Person");
    await page
      .getByLabel(labels[1], { exact: true })
      .fill("tester@example.com");
    await page
      .getByLabel(labels[2], { exact: true })
      .fill("Synthetic Test Company");
    await page
      .getByLabel(labels[3], { exact: true })
      .fill("A synthetic inquiry used only for automated testing.");
    await page.getByRole("button", { name: labels[4], exact: true }).click();
    await expect(page.getByRole("status")).toContainText(
      locale === "en" ? "Please try again" : "もう一度",
    );
    await expect(page.getByLabel(labels[3], { exact: true })).not.toHaveValue(
      "",
    );
    await page.getByRole("button", { name: labels[4], exact: true }).click();
    await expect(page.getByRole("status")).toContainText(
      locale === "en" ? "has been received" : "受け付けました",
    );
    expect(calls).toBe(2);
    expect(body?.website).toBe("");
    expect(body?.email).toBe("tester@example.com");
    await expect(page.getByLabel(labels[0], { exact: true })).toHaveValue("");
    expect(
      await page.evaluate(() =>
        sessionStorage.getItem("bitlabs-contact-draft-v1"),
      ),
    ).toBeNull();
  });
  test(`${locale} contact announces server validation and network failure`, async ({
    page,
  }) => {
    let calls = 0;
    await page.route("**/api/contact", async (route) => {
      calls++;
      if (calls === 1)
        await route.fulfill({
          status: 400,
          json: { error: "Invalid contact request." },
        });
      else await route.abort();
    });
    await page.goto(path);
    for (const [index, value] of [
      "Test Person",
      "tester@example.com",
      "Test Company",
      "An entirely synthetic test inquiry with enough characters.",
    ].entries())
      await page.getByLabel(labels[index], { exact: true }).fill(value);
    await page.getByRole("button", { name: labels[4], exact: true }).click();
    await expect(page.getByRole("status")).toContainText(
      locale === "en" ? "check your details" : "入力内容をご確認",
    );
    await page.getByRole("button", { name: labels[4], exact: true }).click();
    await expect(page.getByRole("status")).toContainText(
      locale === "en" ? "Please try again" : "もう一度",
    );
  });
}
test("draft survives language navigation and reload, clears after success", async ({
  page,
}) => {
  await page.route("**/api/contact", (route) =>
    route.fulfill({ status: 200, json: { ok: true } }),
  );
  await page.goto("/contact");
  await page.getByLabel("Name", { exact: true }).fill("Draft Person");
  await page
    .getByLabel("Work email", { exact: true })
    .fill("draft@example.com");
  await page.getByLabel("Company", { exact: true }).fill("Draft Company");
  await page
    .getByLabel("Project brief", { exact: true })
    .fill("Synthetic draft to verify cross-language preservation.");
  await page.getByRole("link", { name: "日本語", exact: true }).click();
  await expect(page).toHaveURL(/\/ja\/contact$/);
  await expect(page.getByLabel("氏名", { exact: true })).toHaveValue(
    "Draft Person",
  );
  await page.reload();
  await expect(
    page.getByLabel("プロジェクト概要", { exact: true }),
  ).toHaveValue("Synthetic draft to verify cross-language preservation.");
  await page
    .getByRole("button", { name: "問い合わせを送信", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("受け付けました");
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page.getByLabel("Name", { exact: true })).toHaveValue("");
});
test("pending contact blocks duplicate sends and announces loading", async ({
  page,
}) => {
  let release!: () => void;
  const pending = new Promise<void>((resolve) => {
    release = resolve;
  });
  let calls = 0;
  await page.route("**/api/contact", async (route) => {
    calls++;
    await pending;
    await route.fulfill({ status: 200, json: { ok: true } });
  });
  await page.goto("/contact");
  for (const [label, value] of [
    ["Name", "Test Person"],
    ["Work email", "test@example.com"],
    ["Company", "Test Company"],
    ["Project brief", "A synthetic test request with sufficient detail."],
  ])
    await page.getByLabel(label, { exact: true }).fill(value);
  await page.getByRole("button", { name: "Send inquiry", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Sending...", exact: true }),
  ).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("Sending");
  release();
  await expect(page.getByRole("status")).toContainText("received");
  expect(calls).toBe(1);
});
test("careers application retains its API contract with a mocked submission", async ({
  page,
}) => {
  let body = "";
  await page.route("**/api/application", async (route) => {
    body = route.request().postData() || "";
    await route.fulfill({ status: 200, json: { ok: true } });
  });
  await page.goto("/career");
  await page.getByLabel("Name", { exact: true }).fill("Test Applicant");
  await page.getByLabel("Email", { exact: true }).fill("applicant@example.com");
  await page
    .getByLabel("Role", { exact: true })
    .selectOption({ label: "AI Engineer" });
  await page
    .getByLabel("Tell us about yourself", { exact: true })
    .fill("Synthetic application for automated verification only.");
  await page.getByRole("button", { name: "Submit application" }).click();
  await expect(
    page.getByText("Your application has been received.", { exact: false }),
  ).toBeVisible();
  expect(body).toContain("Test Applicant");
});
