/**
 * Education Hub articles. Starter pieces cover the topics the design names (credit, business credit,
 * funding) with general, factual information. Replace or extend them with the firm's own writing.
 */

export type ArticleCategory = "credit" | "business-credit" | "funding";

export const categoryLabels: Record<ArticleCategory, string> = {
  credit: "Credit",
  "business-credit": "Business Credit",
  funding: "Funding",
};

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: { lead?: string; text: string }[] }
  | { type: "callout"; text: string; href: string; cta: string };

export type Article = {
  slug: string;
  category: ArticleCategory;
  title: string;
  excerpt: string;
  body: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "how-credit-scores-work",
    category: "credit",
    title: "How credit scores really work",
    excerpt: "The five factors behind your FICO® Score, what each one weighs, and where to focus first.",
    body: [
      {
        type: "p",
        text: "Your credit score is a three-digit summary of your credit reports — the records Equifax, Experian and TransUnion keep about how you’ve borrowed and repaid. Lenders use it to estimate how likely you are to pay as agreed. Most FICO® Scores range from 300 to 850, and higher is better.",
      },
      { type: "h2", text: "The five factors" },
      { type: "p", text: "FICO publishes the general weight of each category for the population as a whole:" },
      {
        type: "ul",
        items: [
          { lead: "Payment history — 35%.", text: "Whether you’ve paid past credit accounts on time." },
          {
            lead: "Amounts owed — 30%.",
            text: "How much you owe, including how much of your available revolving credit you’re using — your utilization.",
          },
          { lead: "Length of credit history — 15%.", text: "How long your accounts have been open." },
          { lead: "Credit mix — 10%.", text: "The variety of credit you manage, such as cards, installment loans and mortgages." },
          { lead: "New credit — 10%.", text: "Recently opened accounts and hard inquiries." },
        ],
      },
      {
        type: "p",
        text: "Your own breakdown can differ. How much each category matters depends on what’s actually in your report.",
      },
      { type: "h2", text: "There isn’t just one score" },
      {
        type: "p",
        text: "Lenders use different scoring models and versions — FICO alone publishes industry-specific versions for auto and card lending — and each bureau’s report can contain different information. That’s why the score in one app may not match the one a lender pulls.",
      },
      { type: "h2", text: "Where to focus first" },
      {
        type: "ul",
        items: [
          { lead: "Pay every account on time.", text: "Payment history carries the most weight." },
          { lead: "Keep utilization low.", text: "Lower balances relative to your limits generally help your score." },
          { lead: "Be deliberate about new accounts.", text: "Each application usually triggers a hard inquiry." },
          {
            lead: "Check your reports for errors.",
            text: "You can get free copies from AnnualCreditReport.com and dispute information that’s inaccurate or incomplete.",
          },
        ],
      },
      { type: "h2", text: "Your rights under the FCRA" },
      {
        type: "p",
        text: "The Fair Credit Reporting Act gives you the right to dispute information in your file that you believe is inaccurate or incomplete. The credit bureau generally must investigate — usually within 30 days — and correct or delete information that’s inaccurate, incomplete or can’t be verified. Accurate, verified information may legally remain on your report.",
      },
      {
        type: "callout",
        text: "Want to know where you stand? Check your score and book a free credit analysis.",
        href: "/score-check",
        cta: "Check your score",
      },
    ],
  },
  {
    slug: "business-credit-vs-personal-credit",
    category: "business-credit",
    title: "Business credit vs. personal credit: what lenders actually check",
    excerpt:
      "How business credit profiles are built, why your personal credit still matters, and the details that need to match.",
    body: [
      {
        type: "p",
        text: "Personal credit follows you as an individual, through your Social Security number. Business credit follows your company — typically through its EIN — and is tracked by business-credit bureaus such as Dun & Bradstreet, Experian Business and Equifax Business.",
      },
      { type: "h2", text: "Why personal credit still matters" },
      {
        type: "p",
        text: "For most small businesses, lenders look at the owner too. Many business credit cards and lines of credit require a personal guarantee and review your personal credit when you apply. A strong personal profile is usually the first step toward business funding.",
      },
      { type: "h2", text: "What builds a business credit profile" },
      {
        type: "ul",
        items: [
          { lead: "A properly formed entity.", text: "An LLC or corporation registered with your state." },
          { lead: "An EIN.", text: "Your business’s federal tax ID." },
          {
            lead: "Consistent business details.",
            text: "The same legal name, address and phone number everywhere your business appears.",
          },
          { lead: "A business bank account.", text: "Separate finances and a banking relationship." },
          {
            lead: "Accounts that report.",
            text: "Vendors, cards and lenders that report your payment history to business-credit bureaus.",
          },
        ],
      },
      { type: "h2", text: "Consistency is a quiet approval factor" },
      {
        type: "p",
        text: "Lenders compare what you put on an application with what they find in public and bureau records. Mismatched names, old addresses or missing listings can slow down or derail an application — even when everything else is strong.",
      },
      { type: "h2", text: "Keep the two separate" },
      {
        type: "p",
        text: "Running business expenses through a business account and business credit keeps your company’s finances easier to evaluate and helps keep balances off your personal cards.",
      },
      {
        type: "callout",
        text: "Starting or restructuring a business? Build it to be fundable from day one.",
        href: "/services/entity-structuring",
        cta: "See Entity Structuring",
      },
    ],
  },
  {
    slug: "zero-percent-intro-apr-explained",
    category: "funding",
    title: "What 0% intro APR really means for your business",
    excerpt: "How introductory APR periods work, what happens when they end, and how to use them without getting caught out.",
    body: [
      {
        type: "p",
        text: "A 0% intro APR is a promotional period during which a card charges no interest on eligible purchases, balance transfers or both. Used deliberately, it can fund launch costs, inventory or equipment without paying interest right away.",
      },
      { type: "h2", text: "What happens when the intro period ends" },
      {
        type: "p",
        text: "Any remaining balance starts accruing interest at the card’s standard variable APR. The simplest safeguard is a payoff plan: divide the balance by the number of months left in the intro period and pay at least that much each month.",
      },
      { type: "h2", text: "The fine print to read" },
      {
        type: "ul",
        items: [
          { lead: "What qualifies.", text: "Purchases, balance transfers or both." },
          { lead: "Balance-transfer fees.", text: "Often charged as a percentage of the amount you move." },
          {
            lead: "Minimum payments.",
            text: "They’re still due every month, and on some cards a late payment can end the promotional rate.",
          },
          { lead: "The length of the intro period", text: "and the standard APR that applies afterward." },
        ],
      },
      { type: "h2", text: "Sequencing matters" },
      {
        type: "p",
        text: "Each application usually results in a hard inquiry, and lenders can see recently opened accounts. Preparing your profile first and applying in a deliberate order helps you avoid stacking inquiries before the approvals that matter most.",
      },
      { type: "h2", text: "Use it as a tool, not a cushion" },
      {
        type: "p",
        text: "Interest-free capital works best when it funds something with a clear return and a clear payoff date.",
      },
      {
        type: "callout",
        text: "Want a funding plan built around your profile?",
        href: "/services/business-funding",
        cta: "See Business Funding",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Estimated reading time at ~220 words per minute. */
export function readingMinutes(article: Article): number {
  const words = article.body
    .flatMap((b) => {
      if (b.type === "ul") return b.items.map((i) => `${i.lead ?? ""} ${i.text}`);
      return [b.text];
    })
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
