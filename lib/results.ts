/**
 * Client results. Every entry is a slot from the design, to be filled only with real, anonymized
 * stories published with the client's written permission.
 */

export type CaseStudy =
  | {
      kind: "score";
      service: string;
      before: string;
      after: string;
      story: string;
      meta: string;
    }
  | {
      kind: "funding";
      service: string;
      amount: string;
      story: string;
      meta: string;
    }
  | {
      kind: "video";
      service: string;
      caption: string;
      story: string;
    };

export const caseStudies: CaseStudy[] = [
  {
    kind: "score",
    service: "Credit Repair",
    before: "[000]",
    after: "[000]",
    story: "[Client story, anonymized — published with written permission.]",
    meta: "[Client initials] · [Timeline]",
  },
  {
    kind: "funding",
    service: "Business Funding",
    amount: "[$000,000]",
    story: "[Client story, anonymized — published with written permission.]",
    meta: "[Industry] · [Timeline]",
  },
  {
    kind: "video",
    service: "Inner Circle",
    caption: "[Video testimonial]",
    story: "[Member name] on going from zero credit to their first business card.",
  },
];

export const resultsDisclaimer =
  "Results not typical. Individual results vary. Accurate, verified information may legally remain on a credit report.";
