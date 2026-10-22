/**
 * Site-wide configuration.
 *
 * Values in [square brackets] are content slots carried over from the design that the
 * business still needs to supply. Links read from environment variables stay inactive
 * until they are configured (see .env.example).
 */

export const site = {
  name: "Opulent Financial",
  tagline: "Turn your credit into capital.",
  description:
    "Credit repair and credit building under consumer-protection law, fundable business structuring, 0% intro-APR business funding, and protection planning — founder-led consulting from Opulent Financial.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  founder: {
    name: "Leonard “Lenny” Ali-Permell",
    shortName: "Lenny",
    title: "Founder & President",
  },
  contact: {
    phone: "[Phone number]",
    email: "[Email address]",
    hours: "[Business hours]",
  },
  innerCircle: {
    price: "$97",
    checkoutUrl: process.env.NEXT_PUBLIC_INNER_CIRCLE_CHECKOUT_URL ?? "",
  },
  myTradeLineUrl: process.env.NEXT_PUBLIC_MYTRADELINE_URL ?? "",
  social: [
    { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "" },
    { label: "TikTok", href: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "" },
    { label: "YouTube", href: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "" },
    { label: "Facebook", href: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "" },
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  badge?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Results", href: "/results" },
  { label: "Inner Circle", href: "/inner-circle", badge: site.innerCircle.price },
  { label: "Education", href: "/education" },
  { label: "Founder", href: "/founder" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Disclosures", href: "/legal/disclosures" },
];

export const complianceNote =
  "Results vary. Accurate, verified information may legally remain on a credit report.";
