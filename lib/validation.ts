/** Field validators shared by client forms and the server action. Each returns an error message or null. */

export type FieldErrors<K extends string = string> = Partial<Record<K, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function required(value: string, label: string): string | null {
  return value.trim() ? null : `Enter your ${label}.`;
}

export function name(value: string, label: string): string | null {
  const v = value.trim();
  if (!v) return `Enter your ${label}.`;
  if (v.length > 60) return `${label[0]!.toUpperCase()}${label.slice(1)} must be 60 characters or fewer.`;
  return null;
}

export function email(value: string): string | null {
  const v = value.trim();
  if (!v) return "Enter your email address.";
  if (!EMAIL.test(v) || v.length > 254) return "Enter a valid email address, like name@example.com.";
  return null;
}

export function phone(value: string, { optional = false } = {}): string | null {
  const d = digitsOnly(value);
  if (!d) return optional ? null : "Enter your phone number.";
  const national = d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
  if (national.length !== 10) return "Enter a 10-digit US phone number.";
  return null;
}

export function zip(value: string): string | null {
  const v = value.trim();
  if (!v) return "Enter your ZIP code.";
  if (!/^\d{5}(-?\d{4})?$/.test(v)) return "Enter a 5-digit ZIP code.";
  return null;
}

/** Accepts MM/DD/YYYY (spaces optional). Requires a real date and an adult applicant. */
export function dateOfBirth(value: string, now = new Date()): string | null {
  const d = digitsOnly(value);
  if (!d) return "Enter your date of birth.";
  if (d.length !== 8) return "Use the format MM / DD / YYYY.";
  const month = Number(d.slice(0, 2));
  const day = Number(d.slice(2, 4));
  const year = Number(d.slice(4));
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return "Enter a real date in the format MM / DD / YYYY.";
  }
  const eighteen = new Date(year + 18, month - 1, day);
  if (eighteen > now) return "You must be 18 or older to check your credit.";
  if (year < now.getFullYear() - 120) return "Check the year of your date of birth.";
  return null;
}

/** Structural SSN check (9 digits, no never-issued area, group or serial numbers). */
export function ssn(value: string): string | null {
  const d = digitsOnly(value);
  if (!d) return "Enter your Social Security number.";
  if (d.length !== 9) return "Your Social Security number has 9 digits.";
  const area = d.slice(0, 3);
  if (area === "000" || area === "666" || area.startsWith("9") || d.slice(3, 5) === "00" || d.slice(5) === "0000") {
    return "Check your Social Security number.";
  }
  return null;
}

export function message(value: string, { optional = true, max = 2000 } = {}): string | null {
  const v = value.trim();
  if (!v) return optional ? null : "Tell us a little about what you need.";
  if (v.length > max) return `Keep your message under ${max} characters.`;
  return null;
}

export function url(value: string, { optional = true } = {}): string | null {
  const v = value.trim();
  if (!v) return optional ? null : "Enter a link.";
  try {
    const u = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`);
    return u.hostname.includes(".") ? null : "Enter a valid link, like linkedin.com/in/yourname.";
  } catch {
    return "Enter a valid link, like linkedin.com/in/yourname.";
  }
}

/** Collects non-null results into an errors object. */
export function collect<K extends string>(checks: Record<K, string | null>): FieldErrors<K> {
  const errors: FieldErrors<K> = {};
  for (const key of Object.keys(checks) as K[]) {
    const result = checks[key];
    if (result) errors[key] = result;
  }
  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

/* ───────────── Inquiries (booking, affiliate, careers, Inner Circle) ───────────── */

export type InquiryKind = "consultation" | "affiliate" | "careers" | "inner-circle";

export const inquiryKinds: InquiryKind[] = ["consultation", "affiliate", "careers", "inner-circle"];

export const inquiryFields: Record<InquiryKind, string[]> = {
  consultation: ["firstName", "lastName", "email", "phone", "goal", "contactMethod", "message", "consent"],
  affiliate: ["firstName", "lastName", "email", "platform", "audience", "message", "consent"],
  careers: ["firstName", "lastName", "email", "phone", "role", "link", "message", "consent"],
  "inner-circle": ["firstName", "email", "consent"],
};

const CONSENT = "Please confirm we may contact you about this request.";

export function validateInquiry(kind: InquiryKind, v: Record<string, string>): FieldErrors {
  const get = (k: string) => v[k] ?? "";
  switch (kind) {
    case "consultation":
      return collect({
        firstName: name(get("firstName"), "first name"),
        lastName: name(get("lastName"), "last name"),
        email: email(get("email")),
        phone: phone(get("phone")),
        goal: get("goal") ? null : "Choose what you’d like help with.",
        message: message(get("message")),
        consent: get("consent") ? null : CONSENT,
      });
    case "affiliate":
      return collect({
        firstName: name(get("firstName"), "first name"),
        lastName: name(get("lastName"), "last name"),
        email: email(get("email")),
        platform: required(get("platform"), "main platform or website"),
        audience: get("audience") ? null : "Choose your audience size.",
        message: message(get("message")),
        consent: get("consent") ? null : CONSENT,
      });
    case "careers":
      return collect({
        firstName: name(get("firstName"), "first name"),
        lastName: name(get("lastName"), "last name"),
        email: email(get("email")),
        phone: phone(get("phone"), { optional: true }),
        role: get("role") ? null : "Choose the kind of role you’re interested in.",
        link: url(get("link")),
        message: message(get("message"), { optional: false }),
        consent: get("consent") ? null : CONSENT,
      });
    case "inner-circle":
      return collect({
        firstName: name(get("firstName"), "first name"),
        email: email(get("email")),
        consent: get("consent") ? null : CONSENT,
      });
  }
}

/* ───────────── Score check ───────────── */

export type ScoreDetails = { firstName: string; lastName: string; email: string; phone: string };

export function validateScoreDetails(d: ScoreDetails): FieldErrors<keyof ScoreDetails> {
  return collect({
    firstName: name(d.firstName, "first name"),
    lastName: name(d.lastName, "last name"),
    email: email(d.email),
    phone: phone(d.phone),
  });
}

export type ScoreIdentity = {
  address: string;
  city: string;
  state: string;
  zip: string;
  dob: string;
  ssn: string;
};

export function validateScoreIdentity(d: ScoreIdentity): FieldErrors<keyof ScoreIdentity> {
  return collect({
    address: required(d.address, "street address"),
    city: required(d.city, "city"),
    state: d.state ? null : "Choose your state.",
    zip: zip(d.zip),
    dob: dateOfBirth(d.dob),
    ssn: ssn(d.ssn),
  });
}

export const usStates: [string, string][] = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"], ["CA", "California"],
  ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"], ["DC", "District of Columbia"],
  ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"], ["ID", "Idaho"], ["IL", "Illinois"],
  ["IN", "Indiana"], ["IA", "Iowa"], ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"],
  ["ME", "Maine"], ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"],
  ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"], ["NV", "Nevada"],
  ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"], ["NY", "New York"],
  ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"], ["OK", "Oklahoma"], ["OR", "Oregon"],
  ["PA", "Pennsylvania"], ["RI", "Rhode Island"], ["SC", "South Carolina"], ["SD", "South Dakota"],
  ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"],
  ["WA", "Washington"], ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
];
