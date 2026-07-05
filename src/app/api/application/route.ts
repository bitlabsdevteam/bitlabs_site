import { isMailerConfigured, sendMail } from "@/lib/mailer";
import { z } from "zod";

export const runtime = "nodejs";

const requestSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.email(),
  role: z.string().trim().min(2).max(200),
  message: z.string().trim().min(20).max(4000),
  website: z.string().max(0),
});

const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export async function POST(request: Request) {
  const toAddress = process.env.CAREERS_TO_EMAIL ?? process.env.CONTACT_TO_EMAIL;

  const formData = await request.formData().catch(() => null);

  if (!formData) {
    return Response.json({ error: "Invalid application request." }, { status: 400 });
  }

  const parsedBody = requestSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    role: formData.get("role"),
    message: formData.get("message"),
    website: formData.get("website"),
  });

  if (!parsedBody.success) {
    return Response.json({ error: "Invalid application request." }, { status: 400 });
  }

  const { name, email, role, message, website } = parsedBody.data;

  if (website) {
    return Response.json({ ok: true });
  }

  if (!isMailerConfigured() || !toAddress) {
    return Response.json({ error: "Application form is not configured." }, { status: 500 });
  }

  const resumeEntry = formData.get("resume");
  let attachments: { filename: string; content: Buffer; contentType: string }[] | undefined;

  if (resumeEntry instanceof File && resumeEntry.size > 0) {
    if (resumeEntry.size > MAX_RESUME_SIZE_BYTES || !ACCEPTED_RESUME_TYPES.has(resumeEntry.type)) {
      return Response.json({ error: "Invalid resume attachment." }, { status: 400 });
    }

    attachments = [
      {
        filename: resumeEntry.name,
        content: Buffer.from(await resumeEntry.arrayBuffer()),
        contentType: resumeEntry.type,
      },
    ];
  }

  try {
    await sendMail({
      to: toAddress,
      replyTo: email,
      subject: `New application: ${role} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nRole: ${role}\n\n${message}`,
      attachments,
    });
  } catch (error) {
    console.error("Gmail SMTP application send failed:", error);
    return Response.json({ error: "Failed to send application." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
