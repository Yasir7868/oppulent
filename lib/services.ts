import type { GoalId } from "./goals";
import type { IconName } from "@/components/ui/Icon";

export type ServiceGroup = "Credit" | "Business" | "Community" | "Protection";

export type ServiceSummary = {
  href: string;
  title: string;
  group: ServiceGroup;
  summary: string;
  icon: IconName;
};

export const serviceCatalog: ServiceSummary[] = [
  {
    href: "/services/credit-optimization",
    title: "Credit Optimization",
    group: "Credit",
    summary: "Credit repair and credit building — one strategy for a profile lenders say yes to.",
    icon: "gauge",
  },
  {
    href: "/services/business-funding",
    title: "Business Funding",
    group: "Business",
    summary: "0% intro-APR business credit cards and business lines of credit.",
    icon: "trend",
  },
  {
    href: "/services/entity-structuring",
    title: "Entity Structuring",
    group: "Business",
    summary: "LLC or corp, EIN, address, bank account — built to be fundable.",
    icon: "building",
  },
  {
    href: "/inner-circle",
    title: "The Inner Circle",
    group: "Community",
    summary: "Live classes, a course library and founder Q&A for $97.",
    icon: "users",
  },
  {
    href: "/services/life-insurance",
    title: "Life Insurance",
    group: "Protection",
    summary: "Protection, legacy and living benefits for your family.",
    icon: "shield",
  },
  {
    href: "/services/annuities",
    title: "Annuities",
    group: "Protection",
    summary: "Retirement income, growth and protection.",
    icon: "clock",
  },
];

/* ───────────── Template-driven service pages ───────────── */

export type ServiceCard = { id?: string; tag?: string; title: string; text: string; note?: string };

export type ServiceBlock =
  | {
      kind: "cards";
      id?: string;
      eyebrow: string;
      title: string;
      intro?: string;
      cards: ServiceCard[];
    }
  | {
      kind: "checklist";
      id?: string;
      eyebrow: string;
      title: string;
      intro?: string;
      items: { title: string; text: string }[];
      visual: "funding" | "entity";
    }
  | {
      kind: "steps";
      id?: string;
      eyebrow: string;
      title: string;
      intro?: string;
      steps: { title: string; text: string }[];
    };

export type ServicePage = {
  slug: string;
  title: string;
  metaDescription: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  lead: string;
  primaryCta: { label: string; goal: GoalId };
  heroCards: { title: string; text: string; href: string }[];
  blocks: ServiceBlock[];
  related: { eyebrow: string; title: string; text: string; href: string; cta: string };
  faqs: { q: string; a: string }[];
  cta: { title: string; text: string; label: string; goal: GoalId };
  disclaimer: string;
};

export const servicePages: ServicePage[] = [
  {
    slug: "business-funding",
    title: "Business Funding",
    metaDescription:
      "Access 0% intro-APR business credit cards and business lines of credit with a clear picture of what you need to qualify and the right order to apply.",
    eyebrow: "Business service",
    titleLead: "Business",
    titleAccent: "Funding",
    lead: "Access 0% intro-APR business credit cards and business lines of credit — with a clear picture of what you need to qualify and the right order to apply.",
    primaryCta: { label: "Book a Free Consultation", goal: "funding" },
    heroCards: [
      {
        title: "0% intro-APR cards",
        text: "Business credit cards with an introductory 0% APR period.",
        href: "#products",
      },
      {
        title: "Lines of credit",
        text: "Revolving business credit you draw on as you need it.",
        href: "#products",
      },
    ],
    blocks: [
      {
        kind: "cards",
        id: "products",
        eyebrow: "What we help you access",
        title: "Two kinds of capital. One plan for getting approved.",
        intro:
          "We help you understand which products fit your business, what lenders look for, and the order to apply in.",
        cards: [
          {
            tag: "01",
            title: "0% intro-APR business credit cards",
            text: "An introductory period with no interest on eligible purchases — useful for launch costs, inventory, equipment and marketing. The card’s standard APR applies when the intro period ends.",
          },
          {
            tag: "02",
            title: "Business lines of credit",
            text: "Revolving credit you draw on as needed and repay over time — flexible working capital for uneven cash flow.",
          },
        ],
      },
      {
        kind: "checklist",
        id: "readiness",
        eyebrow: "Funding readiness",
        title: "What lenders want to see before they say yes.",
        intro: "Funding goes smoother when the groundwork is done first. We work through it with you, in order.",
        visual: "funding",
        items: [
          { title: "LLC formed & EIN issued", text: "A properly registered entity with its own federal tax ID." },
          { title: "Business bank account", text: "Separate finances and a banking relationship lenders can see." },
          { title: "Personal profile optimized", text: "Most lenders review the owner’s personal credit, too." },
          {
            title: "Applications in the right sequence",
            text: "Each application usually means a hard inquiry, so order matters.",
          },
        ],
      },
      {
        kind: "cards",
        id: "industries",
        eyebrow: "Funding by industry",
        title: "Plans shaped around how your industry earns.",
        cards: [
          {
            id: "healthcare",
            tag: "Industry",
            title: "Healthcare practitioners",
            text: "For practice owners and independent practitioners funding equipment, buildout and working capital.",
            note: "[Program details — to be provided.]",
          },
          {
            id: "real-estate",
            tag: "Industry",
            title: "Real estate pros",
            text: "For agents, brokers and investors funding marketing, deal costs and business growth.",
            note: "[Program details — to be provided.]",
          },
        ],
      },
    ],
    related: {
      eyebrow: "Start here first",
      title: "Funding starts with your credit profile.",
      text: "Most small-business cards and lines look at the owner’s personal credit. Credit Optimization gets that profile ready.",
      href: "/services/credit-optimization",
      cta: "See Credit Optimization",
    },
    faqs: [
      {
        q: "What does 0% intro APR actually mean?",
        a: "For a set introductory period, eligible purchases on the card accrue no interest. When it ends, the card’s standard variable APR applies to any remaining balance. Intro periods and terms vary by issuer.",
      },
      {
        q: "Do I need good personal credit to get business funding?",
        a: "For most small-business cards and lines of credit, lenders review the owner’s personal credit and require a personal guarantee. That’s why many clients start with Credit Optimization.",
      },
      {
        q: "How much funding can I qualify for?",
        a: "It depends on your credit profile, income and business details — approval and limits are set by each lender. [Typical ranges — to be provided.]",
      },
      {
        q: "Will applying hurt my credit?",
        a: "Each application usually results in a hard inquiry, which can lower your score slightly for a period of time. Sequencing applications carefully is part of the plan.",
      },
      { q: "How much does it cost?", a: "[Pricing — to be provided.]" },
    ],
    cta: {
      title: "See what your profile is ready for.",
      text: "Book a free consultation and we’ll map your path to business funding.",
      label: "Book a Free Consultation",
      goal: "funding",
    },
    disclaimer:
      "Approval, credit limits and terms are determined by each lender. Introductory APRs are temporary; standard rates apply afterward. Individual results vary.",
  },
  {
    slug: "entity-structuring",
    title: "Entity Structuring",
    metaDescription:
      "LLC or corporation setup, EIN, business address, bank account and a business-credit foundation — structured to be fundable from day one.",
    eyebrow: "Business service",
    titleLead: "Entity",
    titleAccent: "Structuring",
    lead: "LLC or corporation setup, EIN, business address, bank account and a business-credit foundation — structured to be fundable from day one.",
    primaryCta: { label: "Book a Free Consultation", goal: "entity" },
    heroCards: [
      { title: "Formation", text: "LLC or corporation, chosen around your goals and filed correctly.", href: "#foundation" },
      { title: "Foundation", text: "EIN, address, banking and the start of business credit.", href: "#foundation" },
    ],
    blocks: [
      {
        kind: "checklist",
        id: "foundation",
        eyebrow: "What we set up",
        title: "Five pieces lenders look for before they lend.",
        intro: "We build each piece in order, so your business information lines up everywhere it appears.",
        visual: "entity",
        items: [
          { title: "Entity formation", text: "An LLC or corporation, chosen around your goals and registered with your state." },
          { title: "EIN", text: "Your federal Employer Identification Number, so the business has its own tax identity." },
          { title: "Business address", text: "A professional address that matches across every record and application." },
          { title: "Business bank account", text: "Separate finances and a banking history lenders can review." },
          { title: "Business-credit foundation", text: "The listings and accounts that start a business credit profile." },
        ],
      },
      {
        kind: "cards",
        id: "why",
        eyebrow: "Why it matters",
        title: "Consistency is fundability.",
        intro:
          "Lenders and business-credit bureaus compare your details across records. A business structured cleanly from day one avoids the mismatches that stall applications.",
        cards: [
          {
            tag: "Match",
            title: "One identity everywhere",
            text: "The same legal name, address and phone number on filings, bank records, listings and applications.",
          },
          {
            tag: "Separate",
            title: "Business and personal, apart",
            text: "Keeping business finances separate makes your company easier for lenders to evaluate.",
          },
          {
            tag: "Build",
            title: "A profile that grows",
            text: "Accounts that report your payments help your business build its own credit history.",
          },
        ],
      },
    ],
    related: {
      eyebrow: "Next step",
      title: "Structured? Then it’s time for funding.",
      text: "Once the foundation is in place, we line up 0% intro-APR business credit in the right sequence.",
      href: "/services/business-funding",
      cta: "See Business Funding",
    },
    faqs: [
      {
        q: "Should I form an LLC or a corporation?",
        a: "It depends on your goals, ownership and state. We walk you through the trade-offs; for tax decisions, we recommend confirming with a licensed CPA or attorney.",
      },
      {
        q: "I already have an LLC. Can you still help?",
        a: "Yes. We review your existing setup and identify gaps that could hold back funding.",
      },
      { q: "How long does it take?", a: "[Typical timeline — to be provided.] Filing times vary by state." },
      { q: "How much does it cost?", a: "[Pricing — to be provided.]" },
    ],
    cta: {
      title: "Build a business lenders can say yes to.",
      text: "Book a free consultation and we’ll review what you have and what’s missing.",
      label: "Book a Free Consultation",
      goal: "entity",
    },
    disclaimer:
      "Opulent Financial does not provide legal or tax advice. Consult a licensed attorney or CPA about your specific situation.",
  },
  {
    slug: "life-insurance",
    title: "Life Insurance",
    metaDescription:
      "Life insurance coverage built around protection, legacy and living benefits — matched to your family and your goals.",
    eyebrow: "Protection",
    titleLead: "Life",
    titleAccent: "Insurance",
    lead: "Coverage built around protection, legacy and living benefits — matched to your family and your goals.",
    primaryCta: { label: "Request a quote", goal: "life" },
    heroCards: [
      { title: "Protection", text: "Keep your family secure if the unexpected happens.", href: "#coverage" },
      { title: "Legacy & living benefits", text: "Pass on wealth — and, with some policies, access benefits while living.", href: "#coverage" },
    ],
    blocks: [
      {
        kind: "cards",
        id: "coverage",
        eyebrow: "What coverage can do",
        title: "Protect what you’re building — and who you’re building it for.",
        cards: [
          {
            tag: "Protection",
            title: "Income and debt protection",
            text: "A death benefit that can replace income and cover debts, so your family isn’t left carrying the bills.",
          },
          {
            tag: "Legacy",
            title: "Wealth you pass on",
            text: "Life insurance death benefits are generally paid to beneficiaries free of federal income tax.",
          },
          {
            tag: "Living benefits",
            title: "Benefits while you’re living",
            text: "Some policies let you access part of the death benefit early after a qualifying chronic, critical or terminal illness. Availability varies by policy and carrier.",
          },
        ],
      },
      {
        kind: "cards",
        id: "types",
        eyebrow: "Plainly explained",
        title: "Term or permanent?",
        intro: "The two broad families of life insurance work differently. We help you weigh them against your goals.",
        cards: [
          {
            tag: "Term",
            title: "Coverage for a set period",
            text: "Covers a defined number of years — often while income replacement matters most. Typically the lower-cost way to buy a large death benefit.",
          },
          {
            tag: "Permanent",
            title: "Coverage for life",
            text: "Designed to last your lifetime and can build cash value over time. Premiums are typically higher than term for the same death benefit.",
          },
        ],
      },
      {
        kind: "steps",
        id: "process",
        eyebrow: "How it works",
        title: "From first call to coverage.",
        steps: [
          { title: "Understand your goals", text: "Your family, income, debts and what you want coverage to do." },
          { title: "Compare options", text: "Policy types and features that fit — explained plainly." },
          { title: "Apply", text: "We guide you through the application and underwriting." },
          { title: "Review over time", text: "Revisit coverage as your family and business change." },
        ],
      },
    ],
    related: {
      eyebrow: "Plan for retirement, too",
      title: "Protection pairs with retirement income.",
      text: "Annuities can turn savings into income you can plan around.",
      href: "/services/annuities",
      cta: "See Annuities",
    },
    faqs: [
      {
        q: "How much coverage do I need?",
        a: "It depends on your income, debts, dependents and goals. We’ll work through it with you on a free call.",
      },
      {
        q: "Do I need a medical exam?",
        a: "Some policies require one and some don’t. It depends on the carrier, the amount of coverage and your health.",
      },
      {
        q: "How much does it cost?",
        a: "Premiums depend on your age, health, the coverage amount and the policy type. Request a quote to see your numbers.",
      },
    ],
    cta: {
      title: "Get coverage matched to your family.",
      text: "Request a quote and we’ll walk through your options.",
      label: "Request a quote",
      goal: "life",
    },
    disclaimer:
      "Coverage is subject to underwriting and carrier approval. Policy features and availability vary by carrier and state. [Licensed agent and agency disclosures — to be provided.]",
  },
  {
    slug: "annuities",
    title: "Annuities",
    metaDescription:
      "Turn savings into retirement income with annuity options focused on growth and protection, explained plainly.",
    eyebrow: "Protection",
    titleLead: "",
    titleAccent: "Annuities",
    lead: "Turn savings into retirement income with options focused on growth and protection, explained plainly.",
    primaryCta: { label: "Book a call", goal: "annuity" },
    heroCards: [
      { title: "Retirement income", text: "Payments for a set period or for life.", href: "#benefits" },
      { title: "Growth & protection", text: "Tax-deferred growth, with options that protect principal.", href: "#benefits" },
    ],
    blocks: [
      {
        kind: "cards",
        id: "benefits",
        eyebrow: "What an annuity can do",
        title: "Income you can plan around.",
        cards: [
          {
            tag: "Income",
            title: "Retirement income",
            text: "Convert part of your savings into payments that can last for a set period or for the rest of your life.",
          },
          {
            tag: "Growth",
            title: "Tax-deferred growth",
            text: "Earnings aren’t taxed until you withdraw them, so more of your money keeps working in the meantime.",
          },
          {
            tag: "Protection",
            title: "Principal protection",
            text: "Fixed and fixed-indexed annuities can protect your principal from market losses, backed by the issuing insurer.",
          },
        ],
      },
      {
        kind: "steps",
        id: "how",
        eyebrow: "How it works",
        title: "Three phases, plainly.",
        steps: [
          { title: "Fund it", text: "With a lump sum or contributions over time." },
          { title: "Let it grow", text: "Earnings grow tax-deferred during the accumulation phase." },
          { title: "Take income", text: "Turn the value into payments, or withdraw as your contract allows." },
        ],
      },
    ],
    related: {
      eyebrow: "Protect your family, too",
      title: "Retirement income pairs with protection.",
      text: "Life insurance covers the people who depend on you while you build.",
      href: "/services/life-insurance",
      cta: "See Life Insurance",
    },
    faqs: [
      {
        q: "Can I access my money early?",
        a: "Most annuities allow limited withdrawals. Taking more during the surrender period may trigger surrender charges, and withdrawals before age 59½ may incur a 10% federal tax penalty.",
      },
      {
        q: "Is an annuity right for me?",
        a: "Annuities are long-term products and aren’t right for everyone. We’ll explain the trade-offs plainly on a free call.",
      },
      {
        q: "What does it cost?",
        a: "Costs depend on the product and any optional riders. Ask us to walk through them before you decide.",
      },
    ],
    cta: {
      title: "Plan retirement income with clarity.",
      text: "Book a call and we’ll explain your options plainly.",
      label: "Book a call",
      goal: "annuity",
    },
    disclaimer:
      "Annuities are long-term insurance products. Guarantees are backed by the financial strength and claims-paying ability of the issuing insurer. Withdrawals may be subject to surrender charges and, before age 59½, a 10% federal tax penalty. [Licensed agent and agency disclosures — to be provided.]",
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((p) => p.slug === slug);
}
