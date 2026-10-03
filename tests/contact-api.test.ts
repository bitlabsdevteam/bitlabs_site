import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("@/lib/mailer", () => ({
  isMailerConfigured: vi.fn(() => true),
  sendMail: vi.fn(),
}));
import { isMailerConfigured, sendMail } from "@/lib/mailer";
import { POST } from "@/app/api/contact/route";
const valid = {
  name: "Test Person",
  email: "test@example.com",
  company: "Test Company",
  brief: "Synthetic request for server validation tests only.",
  website: "",
};
function request(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
beforeEach(() => {
  vi.stubEnv("CONTACT_TO_EMAIL", "recipient@example.com");
  vi.mocked(isMailerConfigured).mockReturnValue(true);
  vi.mocked(sendMail).mockResolvedValue(undefined);
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.clearAllMocks();
  vi.unstubAllEnvs();
});
describe("contact API without sending email", () => {
  it("preserves the valid contract", async () => {
    const response = await POST(request(valid));
    expect(response.status).toBe(200);
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "recipient@example.com",
        replyTo: valid.email,
      }),
    );
  });
  it.each([
    { ...valid, name: " " },
    { ...valid, email: "invalid" },
    { ...valid, company: "a" },
    { ...valid, brief: "short" },
    { ...valid, brief: "x".repeat(4001) },
    { ...valid, website: "spam.example" },
    null,
  ])("rejects invalid or spam input before mail", async (body) => {
    expect((await POST(request(body))).status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });
  it("rejects malformed JSON", async () => {
    expect(
      (
        await POST(
          new Request("http://localhost/api/contact", {
            method: "POST",
            body: "{",
          }),
        )
      ).status,
    ).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });
  it("returns a recoverable failure when mail is unavailable", async () => {
    vi.mocked(isMailerConfigured).mockReturnValue(false);
    expect((await POST(request(valid))).status).toBe(500);
    expect(sendMail).not.toHaveBeenCalled();
  });
  it("returns a recoverable failure after a delivery error", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(sendMail).mockRejectedValue(
      new Error("Synthetic delivery failure"),
    );
    expect((await POST(request(valid))).status).toBe(502);
  });
});
