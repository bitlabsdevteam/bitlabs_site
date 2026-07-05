import nodemailer from "nodemailer";

type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

type MailInput = {
  to: string;
  subject: string;
  text: string;
  replyTo: string;
  attachments?: MailAttachment[];
};

export function isMailerConfigured(): boolean {
  return Boolean(process.env.GOOGLE_WORKSPACE_SMTP_USER && process.env.GOOGLE_WORKSPACE_SMTP_PASS);
}

export async function sendMail({ to, subject, text, replyTo, attachments }: MailInput): Promise<void> {
  const user = process.env.GOOGLE_WORKSPACE_SMTP_USER;
  const pass = process.env.GOOGLE_WORKSPACE_SMTP_PASS;
  const host = process.env.GOOGLE_WORKSPACE_SMTP_HOST ?? "smtp.gmail.com";
  const port = Number(process.env.GOOGLE_WORKSPACE_SMTP_PORT ?? 587);

  const transport = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user, pass },
  });

  await transport.sendMail({
    from: user,
    to,
    replyTo,
    subject,
    text,
    attachments,
  });
}
