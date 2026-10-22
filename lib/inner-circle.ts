export const liveClasses = ["Building Personal Credit", "Building Business Credit", "Accessing Business Funding"];

export const valueStack: { item: string; value: string }[] = [
  { item: "Live classes — personal credit, business credit, funding", value: "[$000]" },
  { item: "Exclusive founder Q&A sessions", value: "[$000]" },
  { item: "Full course library (6 modules)", value: "[$000]" },
  { item: "Recordings of past live sessions", value: "[$000]" },
  { item: "Community of entrepreneurs", value: "[$000]" },
];

export const valueTotal = "[$0,000]";

export type Module = {
  num: string;
  title: string;
  badge?: string;
  groups?: { title: string; lessons: string[] }[];
  lessons?: string[];
  summary?: string;
};

export const modules: Module[] = [
  {
    num: "01",
    title: "Credit Mastery",
    groups: [
      {
        title: "Credit Score Basics",
        lessons: [
          "How Credit Scores Really Work",
          "The 40 Different FICO Scores Explained",
          "Building Strong Credit from Scratch (Pts 1 & 2)",
        ],
      },
      {
        title: "Bank Psychology (How Lenders Think)",
        lessons: ["How Banks Really Evaluate Borrowers", "Building Banking Relationships", "Your Internal Bank Scores"],
      },
      {
        title: "Credit Profile Optimization",
        lessons: [
          "What a Fundable Credit Profile Looks Like",
          "Authorized Users Done the Right Way",
          "Managing Your Credit Cards",
          "Utilization Strategy",
        ],
      },
    ],
  },
  {
    num: "02",
    title: "Live Recordings",
    summary: "Recordings of past live sessions, available on demand.",
  },
  {
    num: "03",
    title: "Business Funding 101",
    groups: [
      {
        title: "Funding Foundations",
        lessons: ["Funding Profile Requirements", "Secret Bank Finder for Funding", "All Bank Data Points"],
      },
      { title: "Personal Funding Sequence", lessons: ["TransUnion, Experian and Equifax Stacking Sequences"] },
      {
        title: "0% Business Funding Plays",
        lessons: [
          "Step-by-step plays for 8+ lenders, including Amex (incl. sole prop), Chase, Truist, Elan Financial, Citizens Bank (0% + line of credit), U.S. Bank and Fulton Bank",
        ],
      },
    ],
  },
  {
    num: "04",
    title: "Business Optimization",
    lessons: ["Unlocking the Corporate Veil", "Step-by-Step LLC Filing", "Nav Prime", "Tax Strategy & Bookkeeping"],
  },
  {
    num: "05",
    title: "Banks to Open Today",
    summary:
      "Account-opening guides for Amex High-Yield Savings, Chase Business, PNC, Navy Federal, Andrews FCU and Bank of America Business.",
  },
  {
    num: "06",
    title: "Make Extra Income",
    badge: "Coming soon",
    summary: "Launch your own tradeline shop with MyTradeLine.",
  },
];

export const innerCircleFaqs = [
  { q: "Is it monthly or one-time?", a: "[Billing terms — to be confirmed.]" },
  { q: "Can I cancel?", a: "[Cancellation policy — to be confirmed.]" },
  {
    q: "What if I’m starting from zero credit?",
    a: "You’re in the right place. Credit Mastery starts with Credit Score Basics and Building Strong Credit from Scratch, and live classes cover building personal credit step by step.",
  },
];
