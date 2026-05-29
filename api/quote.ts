import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { buildQuoteEmailBody, quoteFormSchema } from "../lib/quote-form.js";

function getEnv(name: string): string | undefined {
  const raw = process.env[name]?.trim();
  if (!raw) return undefined;
  // Vercel env UI sometimes stores surrounding quotes from .env files
  if (raw.startsWith('"') && raw.endsWith('"')) return raw.slice(1, -1).trim() || undefined;
  return raw;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = getEnv("RESEND_API_KEY");
  const quoteToEmail = getEnv("QUOTE_TO_EMAIL");
  const emailFrom = getEnv("EMAIL_FROM");

  if (!apiKey || !quoteToEmail || !emailFrom) {
    console.error("Missing Resend email environment variables");
    return res.status(500).json({ error: "Email is not configured on the server" });
  }

  const body = req.body as Record<string, unknown> | undefined;
  if (typeof body?.website === "string" && body.website.trim()) {
    return res.status(200).json({ ok: true });
  }

  const parsed = quoteFormSchema.safeParse(body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid form data",
      details: parsed.error.flatten().fieldErrors,
    });
  }

  const text = buildQuoteEmailBody(parsed.data);
  const subject = `New quote request — ${parsed.data.name}`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: emailFrom,
      to: quoteToEmail,
      replyTo: parsed.data.email,
      subject,
      text,
    });

    if (error) {
      console.error("Resend email failed:", error);
      return res.status(502).json({ error: "Failed to send notification" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend email failed:", err);
    return res.status(502).json({ error: "Failed to send notification" });
  }
}
