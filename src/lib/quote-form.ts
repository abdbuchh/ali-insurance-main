import { z } from "zod";

export const INSURANCE_TYPE_LABELS: Record<string, string> = {
  auto: "Auto Insurance",
  home: "Home Insurance",
  life: "Life Insurance",
  bundle: "Bundle (Auto + Home)",
  other: "Other",
};

/** Formats raw input into (XXX) XXX-XXXX, capped at 10 digits. */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export const quoteFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Enter a valid 10-digit US phone number"),
  email: z.string().trim().email("Enter a valid email address").max(254),
  type: z.enum(["auto", "home", "life", "bundle", "other"], {
    errorMap: () => ({ message: "Select an insurance type" }),
  }),
  message: z.string().trim().max(2000).optional(),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export function buildQuoteEmailBody(data: QuoteFormValues): string {
  const lines = [
    "New quote request (website)",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Type: ${INSURANCE_TYPE_LABELS[data.type] ?? data.type}`,
  ];
  if (data.message) {
    lines.push(`Message: ${data.message}`);
  }
  return lines.join("\n");
}
