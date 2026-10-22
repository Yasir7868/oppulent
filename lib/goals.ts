/** The goals a visitor can pick in "Which service is right for me?" and on the booking form. */

export type GoalId =
  | "repair"
  | "build"
  | "entity"
  | "funding"
  | "community"
  | "life"
  | "annuity"
  | "analysis"
  | "other";

export type Goal = {
  id: GoalId;
  /** First-person phrasing used in the selector. */
  prompt: string;
  /** Short label used in the booking form. */
  label: string;
  group: string;
  title: string;
  description: string;
  href: string;
  cta: string;
};

export const selectorGoals: Goal[] = [
  {
    id: "repair",
    prompt: "I want to fix my credit",
    label: "Credit repair",
    group: "Credit Optimization",
    title: "Credit Repair",
    description:
      "We challenge inaccurate, unverifiable and unfair items on your consumer reports — collections, charge-offs, late payments, evictions, bankruptcies, repossessions and hard inquiries — using the FCRA, FDCPA and TILA.",
    href: "/services/credit-optimization#repair",
    cta: "Explore Credit Repair",
  },
  {
    id: "build",
    prompt: "I want to build my credit",
    label: "Credit building",
    group: "Credit Optimization",
    title: "Credit Building",
    description:
      "Establish and strengthen your profile with the right positive accounts, a utilization strategy and full profile optimization.",
    href: "/services/credit-optimization#building",
    cta: "Explore Credit Building",
  },
  {
    id: "entity",
    prompt: "I want to start or structure my business",
    label: "Entity structuring",
    group: "Business",
    title: "Entity Structuring",
    description:
      "LLC or corporation setup, EIN, business address, bank account and a business-credit foundation — structured to be fundable from day one.",
    href: "/services/entity-structuring",
    cta: "Explore Entity Structuring",
  },
  {
    id: "funding",
    prompt: "I want funding for my business",
    label: "Business funding",
    group: "Business",
    title: "Business Funding",
    description:
      "Access 0% intro-APR business credit cards and business lines of credit, with a clear picture of what you need to qualify and the right order to apply.",
    href: "/services/business-funding",
    cta: "Explore Business Funding",
  },
  {
    id: "community",
    prompt: "I want live training and a community to grow with",
    label: "The Inner Circle",
    group: "Community · $97",
    title: "The Inner Circle",
    description:
      "Live classes on personal credit, business credit and funding, a full course library, and exclusive Q&A sessions with our founder.",
    href: "/inner-circle",
    cta: "Join the Inner Circle",
  },
  {
    id: "life",
    prompt: "I want to protect my family",
    label: "Life insurance",
    group: "Protection",
    title: "Life Insurance",
    description:
      "Coverage built around protection, legacy and living benefits — matched to your family and your goals.",
    href: "/contact?goal=life",
    cta: "Request a quote",
  },
  {
    id: "annuity",
    prompt: "I want to plan for retirement",
    label: "Annuities",
    group: "Protection",
    title: "Annuities",
    description:
      "Turn savings into retirement income with options focused on growth and protection, explained plainly.",
    href: "/contact?goal=annuity",
    cta: "Book a call",
  },
];

/** Options for the booking form's topic select, in display order. */
export const inquiryTopics: { id: GoalId; label: string }[] = [
  ...selectorGoals.map((g) => ({ id: g.id, label: g.label })),
  { id: "analysis", label: "Free credit analysis" },
  { id: "other", label: "Something else" },
];

export function isGoalId(value: unknown): value is GoalId {
  return typeof value === "string" && inquiryTopics.some((t) => t.id === value);
}
