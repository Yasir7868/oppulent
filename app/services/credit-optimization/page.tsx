import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { HeroLinkCard } from "@/components/sections/HeroLinkCard";
import { Breadcrumbs, PageDisclosure, PageHero, Section } from "@/components/sections/PageHero";
import { ArrowLink, GhostButton, PrimaryButton } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { StatusChip } from "@/components/visuals/Cards";
import { delay } from "@/lib/motion";
import { complianceNote } from "@/lib/site";

export const metadata: Metadata = {
  title: "Credit Optimization — Credit Repair & Credit Building",
  description:
    "Repair what’s wrong and build what’s missing. We challenge inaccurate, unverifiable and unfair items under the FCRA, FDCPA and TILA, then build a profile lenders say yes to.",
  alternates: { canonical: "/services/credit-optimization" },
};

const laws = [
  {
    code: "FCRA",
    name: "Fair Credit Reporting Act",
    text: "Your right to accurate, verifiable information — and to dispute what isn’t.",
  },
  {
    code: "FDCPA",
    name: "Fair Debt Collection Practices Act",
    text: "Rules on how third-party debt collectors may collect and report.",
  },
  { code: "TILA", name: "Truth in Lending Act", text: "Requirements for clear disclosure of credit terms and costs." },
];

const challenged = [
  "Collections",
  "Charge-offs",
  "Late payments",
  "Evictions",
  "Bankruptcies",
  "Repossessions",
  "Hard inquiries",
];

const building = [
  {
    key: "A",
    title: "Positive accounts",
    text: "Add the right accounts, in the right order, so your history works for you.",
  },
  {
    key: "B",
    title: "Utilization strategy",
    text: "Manage balances and limits so utilization helps your score instead of hurting it.",
  },
  {
    key: "C",
    title: "Profile optimization",
    text: "Tighten every data point lenders review — from personal information to account mix.",
  },
];

const faqs = [
  {
    q: "Can you remove accurate negative items?",
    a: "No one can legally promise that. We challenge items that are inaccurate, unverifiable or unfair. Accurate, verified information may legally remain on a credit report.",
  },
  {
    q: "What’s the difference between repair and building?",
    a: "Repair addresses negative items that shouldn’t be there. Building adds and strengthens the positive history lenders look for. Most clients benefit from both.",
  },
  {
    q: "How long does it take?",
    a: "[Typical timeline range — to be provided.] Every profile is different, and results vary.",
  },
  {
    q: "What happens after my credit is optimized?",
    a: "If your goal is business funding, we move on to entity structuring and a funding plan for 0% intro-APR business credit.",
  },
  { q: "How much does it cost?", a: "[Pricing — to be provided.]" },
];

function UtilizationVisual() {
  const bands = [
    { label: "Under 10%", note: "Strongest", width: "w-[18%]", tone: "bg-cyan" },
    { label: "10–29%", note: "Healthy", width: "w-[37%]", tone: "bg-brand-bright" },
    { label: "30%+", note: "Can weigh on scores", width: "flex-1", tone: "bg-line-5" },
  ];
  return (
    <figure className="reveal flex flex-col gap-5 rounded-[18px] border border-line-4 bg-ink-5 p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="tag text-fg-3">Revolving utilization</span>
        <span className="rounded border border-line-5 px-2 py-0.5 font-tech text-[0.5625rem] tracking-[0.18em] text-fg-4">
          GUIDE
        </span>
      </div>
      <div className="relative pt-7">
        <div className="flex h-2.5 gap-1 overflow-hidden rounded-full">
          {bands.map((b) => (
            <span key={b.label} className={`${b.width} ${b.tone} h-full`} />
          ))}
        </div>
        <span
          aria-hidden="true"
          className="absolute top-0 left-[8%] flex -translate-x-1/2 flex-col items-center gap-1 text-[0.6875rem] font-bold text-cyan"
        >
          Goal
          <span className="h-4 w-px bg-cyan" />
        </span>
      </div>
      <ul className="grid grid-cols-3 gap-3 text-[0.8125rem]">
        {bands.map((b) => (
          <li key={b.label} className="flex flex-col gap-0.5">
            <span className="font-semibold text-fg">{b.label}</span>
            <span className="text-fg-4">{b.note}</span>
          </li>
        ))}
      </ul>
      <figcaption className="text-[0.78rem] text-fg-4">
        General guidance: lower balances relative to your limits generally help your score.
      </figcaption>
    </figure>
  );
}

export default function CreditOptimizationPage() {
  return (
    <>
      <PageHero labelledBy="co-title" gridAt="75% 30%">
        <div className="flex flex-col gap-7">
          <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: "Credit Optimization" }]} />
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
            <div className="flex flex-col gap-6">
              <span className="rise eyebrow text-cyan" style={delay(0.1)}>
                Flagship service
              </span>
              <h1 id="co-title" className="rise t-display" style={delay(0.25)}>
                Credit <span className="shimmer-text">Optimization</span>
              </h1>
              <p className="rise t-lead max-w-[35rem]" style={delay(0.45)}>
                Repair what’s wrong. Build what’s missing. A single strategy that takes your profile from questionable
                to fundable.
              </p>
              <div className="rise flex flex-col gap-3.5 sm:flex-row sm:flex-wrap" style={delay(0.6)}>
                <PrimaryButton href="/contact?goal=repair" stretch>
                  Book a Free Consultation
                </PrimaryButton>
                <GhostButton href="/score-check" stretch>
                  Check Your Credit Score
                </GhostButton>
              </div>
            </div>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <HeroLinkCard
                num="01"
                title="Credit Repair"
                text="Challenge inaccurate, unverifiable and unfair items."
                href="#repair"
                wait={0.7}
              />
              <HeroLinkCard
                num="02"
                title="Credit Building"
                text="Establish and strengthen a profile lenders trust."
                href="#building"
                wait={0.85}
              />
            </div>
          </div>
        </div>
      </PageHero>

      <Section id="repair" tone="alt" labelledBy="repair-title" className="border-t-0">
        <div className="flex flex-col gap-12">
          <div className="reveal grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col gap-4">
              <span className="eyebrow">01 · Credit repair</span>
              <h2 id="repair-title" className="t-h2-sm">
                We use consumer-protection law to challenge what doesn’t belong on your report.
              </h2>
            </div>
            <div className="flex flex-col gap-6 lg:justify-end">
              <p className="text-[1.0625rem] text-fg-3 sm:text-[1.09rem]">
                We challenge inaccurate, unverifiable and unfair items on your consumer reports and work to get them
                removed — grounded in the rights federal law already gives you.
              </p>
              <StatusChip delay="0.2s" className="self-start">
                Dispute sent · FCRA §611
              </StatusChip>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {laws.map((law) => (
              <div
                key={law.code}
                className="card-lift spotlight reveal flex flex-col gap-2 rounded-2xl border border-line-3 bg-ink-5 p-6 sm:p-7"
              >
                <span className="font-tech text-lg tracking-[0.06em]">{law.code}</span>
                <span className="font-semibold text-fg-2">{law.name}</span>
                <span className="text-[0.9rem] text-fg-3">{law.text}</span>
              </div>
            ))}
          </div>

          <div className="reveal flex flex-col gap-[18px]">
            <h3 className="font-display text-[1.375rem] font-semibold">What we challenge</h3>
            <ul className="flex flex-wrap gap-2.5">
              {challenged.map((item) => (
                <li key={item} className="chip min-h-12 px-[18px] text-[0.95rem]">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-light" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[0.84rem] text-fg-4">{complianceNote}</p>
          </div>
        </div>
      </Section>

      <Section id="building" labelledBy="building-title">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-[18px]">
            <span className="eyebrow reveal">02 · Credit building</span>
            <h2 id="building-title" className="t-h2-sm reveal">
              A clean report is the start. A strong profile gets you approved.
            </h2>
            <p className="reveal text-[1.0625rem] text-fg-3 sm:text-[1.09rem]">
              We help you establish and strengthen your credit profile so it reads the way lenders want it to.
            </p>
            <div className="mt-3">
              <UtilizationVisual />
            </div>
          </div>
          <ol className="flex flex-col gap-3.5">
            {building.map((b) => (
              <li
                key={b.key}
                className="card-lift reveal flex gap-5 rounded-[14px] border border-line-3 bg-ink-5 px-5 py-6 sm:px-[26px]"
              >
                <span className="pt-1 font-tech text-xs text-brand-light">{b.key}</span>
                <div>
                  <h3 className="font-display text-[1.1875rem] font-semibold">{b.title}</h3>
                  <p className="mt-1 text-[0.9375rem] text-fg-3">{b.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="alt" labelledBy="receive-title">
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="reveal flex flex-col gap-[18px] rounded-[18px] border border-line-4 bg-ink-5 p-6 sm:p-9">
            <span className="tag text-brand-light">What you receive</span>
            <h2 id="receive-title" className="font-display text-[1.625rem] font-semibold">
              Everything in one plan
            </h2>
            <ul className="flex flex-col gap-3 text-[0.97rem]">
              {[
                "Full review of your consumer reports",
                "Dispute strategy built on FCRA, FDCPA and TILA",
                "A credit-building and utilization plan",
                "[Progress updates — cadence to confirm]",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Icon name="check" size={18} strokeWidth={2.4} className="mt-[3px] flex-none text-brand-light" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal flex flex-col gap-[18px] rounded-[18px] border border-line-4 bg-ink-5 p-6 sm:p-9">
            <span className="tag text-brand-light">Who it’s for</span>
            <h3 className="font-display text-[1.625rem] font-semibold">Built for where you are</h3>
            <ul className="flex flex-col gap-3.5 text-[0.97rem] text-fg-2">
              {[
                "People with negative items holding their score down",
                "Anyone starting from thin or no credit",
                "Entrepreneurs preparing a profile for business funding",
                "Home and auto buyers who want better terms",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 flex-none rounded-full bg-brand-light" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal flex flex-col gap-[18px] rounded-[18px] border border-line-6 bg-[radial-gradient(360px_220px_at_100%_0%,rgba(31,123,255,0.25),rgba(0,0,0,0)_70%),#0D1B38] p-6 sm:p-9 md:col-span-2 lg:col-span-1">
            <span className="tag text-cyan">The outcome</span>
            <h3 className="font-display text-[1.625rem] font-semibold">A profile that’s ready for funding</h3>
            <p className="text-[0.97rem] text-fg-2">
              Optimized credit is step one. From here, we structure your business and line up 0% intro-APR funding.
            </p>
            <ArrowLink href="/services/business-funding" className="mt-auto">
              See Business Funding
            </ArrowLink>
          </div>
        </div>
      </Section>

      <Section labelledBy="faq-title" innerClassName="max-w-[60rem]">
        <div className="flex flex-col gap-9">
          <div className="reveal flex flex-col gap-3.5">
            <span className="eyebrow">FAQ</span>
            <h2 id="faq-title" className="t-h2-sm">
              Questions, answered.
            </h2>
          </div>
          <FaqList items={faqs} openFirst />
        </div>
      </Section>

      <CtaBand
        id="book"
        title="See what’s holding your score back."
        text="Book a free consultation and credit analysis with our team."
        primary={{ label: "Book a Free Consultation", href: "/contact?goal=repair" }}
        secondary={{ label: "Check Your Credit Score", href: "/score-check" }}
      />

      <PageDisclosure>{complianceNote}</PageDisclosure>
    </>
  );
}
