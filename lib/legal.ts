import { resultsDisclaimer } from "./results";
import { servicePages } from "./services";
import { complianceNote, site } from "./site";

export type LegalSection = { id: string; heading: string; paragraphs: string[] };
export type LegalDoc = { slug: string; title: string; description: string; intro: string; sections: LegalSection[] };

const counsel = "[To be provided by counsel.]";
const disclaimerFor = (slug: string) => servicePages.find((p) => p.slug === slug)?.disclaimer ?? "";

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: "How Opulent Financial collects, uses and protects your information.",
    intro: "This page explains how this website handles the information you share with us.",
    sections: [
      {
        id: "website",
        heading: "How this website handles your information",
        paragraphs: [
          "Forms. When you submit a consultation, affiliate, careers or Inner Circle form, the details you enter are sent to our team so we can respond to your request.",
          "Score check. To save you retyping, your name, email and phone number may be kept in your browser’s session storage while the tab is open. Your date of birth and Social Security number are not stored on this site.",
          "Credit data. We request a consumer credit report only after you authorize it under the Fair Credit Reporting Act.",
        ],
      },
      { id: "collect", heading: "Information we collect", paragraphs: [counsel] },
      { id: "use", heading: "How we use information", paragraphs: [counsel] },
      { id: "share", heading: "How we share information", paragraphs: [counsel] },
      { id: "choices", heading: "Your choices and rights", paragraphs: [counsel] },
      { id: "security", heading: "Data security", paragraphs: [counsel] },
      {
        id: "contact",
        heading: "Contact us",
        paragraphs: [`Questions about this policy? Reach us at ${site.contact.email} or ${site.contact.phone}.`],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    description: "The terms that apply when you use the Opulent Financial website.",
    intro: "These terms apply to your use of this website.",
    sections: [
      { id: "use", heading: "Use of this website", paragraphs: [counsel] },
      {
        id: "education",
        heading: "Educational content",
        paragraphs: [
          "Content on this website is for general education and isn’t legal, tax or financial advice. Your situation may differ.",
        ],
      },
      { id: "results", heading: "Services and results", paragraphs: [complianceNote, counsel] },
      { id: "links", heading: "Third-party links", paragraphs: [counsel] },
      { id: "liability", heading: "Limitation of liability", paragraphs: [counsel] },
      {
        id: "contact",
        heading: "Contact us",
        paragraphs: [`Questions about these terms? Reach us at ${site.contact.email} or ${site.contact.phone}.`],
      },
    ],
  },
  {
    slug: "disclosures",
    title: "Disclosures",
    description: "Credit-services, funding, insurance and results disclosures for Opulent Financial.",
    intro: "Important information about our services and the results clients can expect.",
    sections: [
      {
        id: "credit",
        heading: "Credit services",
        paragraphs: [
          "We challenge items that are inaccurate, unverifiable or unfair. No one can legally promise to remove accurate information.",
          complianceNote,
          "[Credit Repair Organizations Act (CROA) disclosures, including your right to cancel — to be provided by counsel.]",
        ],
      },
      { id: "funding", heading: "Business funding", paragraphs: [disclaimerFor("business-funding")] },
      { id: "entity", heading: "Entity structuring", paragraphs: [disclaimerFor("entity-structuring")] },
      { id: "life", heading: "Life insurance", paragraphs: [disclaimerFor("life-insurance")] },
      { id: "annuities", heading: "Annuities", paragraphs: [disclaimerFor("annuities")] },
      { id: "results", heading: "Results and testimonials", paragraphs: [resultsDisclaimer] },
      { id: "credit-data", heading: "Credit-data provider", paragraphs: ["[Credit-data provider disclosure.]"] },
    ],
  },
];

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return legalDocs.find((d) => d.slug === slug);
}
