"use server";

import { hasErrors, inquiryFields, inquiryKinds, validateInquiry, type InquiryKind } from "@/lib/validation";

export type InquiryState = {
  status: "idle" | "invalid" | "sent" | "unavailable" | "failed";
  errors?: Record<string, string>;
  values?: Record<string, string>;
  /** Changes on every response so the form can re-mount with the returned values. */
  nonce: number;
};

function isKind(value: unknown): value is InquiryKind {
  return typeof value === "string" && (inquiryKinds as string[]).includes(value);
}

/**
 * Validates an inquiry and forwards it as JSON to INQUIRY_WEBHOOK_URL (a CRM, Zapier/Make hook,
 * or similar). Without that configuration nothing is sent, and the response says so.
 */
export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const nonce = Date.now();
  const kind = formData.get("kind");
  if (!isKind(kind)) return { status: "failed", nonce };

  // Honeypot: real visitors never see or fill this field.
  if (String(formData.get("website_url") ?? "").trim()) return { status: "sent", nonce };

  const values: Record<string, string> = {};
  for (const field of inquiryFields[kind]) {
    values[field] = String(formData.get(field) ?? "").slice(0, 4000);
  }

  const errors = validateInquiry(kind, values);
  if (hasErrors(errors)) return { status: "invalid", errors: errors as Record<string, string>, values, nonce };

  const endpoint = process.env.INQUIRY_WEBHOOK_URL;
  if (!endpoint) return { status: "unavailable", values, nonce };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.INQUIRY_WEBHOOK_SECRET
          ? { authorization: `Bearer ${process.env.INQUIRY_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify({ kind, submittedAt: new Date(nonce).toISOString(), ...values }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return { status: "failed", values, nonce };
    return { status: "sent", nonce };
  } catch {
    return { status: "failed", values, nonce };
  }
}
