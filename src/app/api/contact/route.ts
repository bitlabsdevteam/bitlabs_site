import { isMailerConfigured, sendMail } from "@/lib/mailer";
import { z } from "zod";

export const runtime = "nodejs";

const requestSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.email(),
  company: z.string().trim().min(2).max(200),
  brief: z.string().trim().min(20).max(4000),
  website: z.string().max(0),
});

export async function POST(request: Request) {
  const toAddress = process.env.CONTACT_TO_EMAIL;

  const parsedBody = requestSchema.safeParse(await request.json().catch(() => null));

  if (!parsedBody.success) {
    return Response.json({ error: "Invalid contact request." }, { status: 400 });
  }

  const { name, email, company, brief, website } = parsedBody.data;

  if (website) {
    return Response.json({ ok: true });
  }

  if (!isMailerConfigured() || !toAddress) {
    return Response.json({ error: "Contact form is not configured." }, { status: 500 });
  }

  try {
    await sendMail({
      to: toAddress,
      replyTo: email,
      subject: `New inquiry from ${name} (${company})`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${brief}`,
    });
  } catch (error) {
    console.error("Gmail SMTP contact send failed:", error);
    return Response.json({ error: "Failed to send inquiry." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
