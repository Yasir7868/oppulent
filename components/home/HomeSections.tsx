import Link from "next/link";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { Timeline, clientJourney } from "@/components/sections/Timeline";
import { ArrowLink, GhostButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FounderPortrait } from "@/components/visuals/FounderPortrait";
import { articles } from "@/lib/articles";
import { caseStudies, resultsDisclaimer } from "@/lib/results";
import { site } from "@/lib/site";

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="pt-2 pb-18 sm:pb-24 lg:pb-32">
      <div className="container-x flex flex-col gap-12 lg:gap-14">
        <SectionHeader id="how-title" eyebrow="How it works" title="From credit report to funded business." />
        <Timeline steps={clientJourney} muteLast />
      </div>
    </section>
  );
}

export function ResultsPreview() {
  return (
    <section id="results" aria-labelledby="results-title" className="section-y border-y border-line-1 bg-ink-3">
      <div className="container-x flex flex-col gap-10 lg:gap-11">
        <SectionHeader
          id="results-title"
          eyebrow="Results"
          title="Real clients. Real numbers."
          action={<ArrowLink href="/results">All case studies</ArrowLink>}
        />
        <div className="snap-rail" role="region" aria-label="Client results" tabIndex={0}>
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={i} study={study} />
          ))}
        </div>
        <p className="text-[0.8125rem] text-fg-4">{resultsDisclaimer}</p>
      </div>
    </section>
  );
}

const credentials = [
  "BS in Finance (Honors), minor in Business Law",
  "Associate’s in Accounting",
  "Expertise in FCRA, FDCPA, CROA and consumer-protection law",
];

export function FounderIntro() {
  return (
    <section id="founder" aria-labelledby="founder-title" className="section-y">
      <div className="container-x grid items-center gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
        <FounderPortrait className="reveal mx-auto aspect-[4/5] max-w-[480px] max-md:aspect-[5/4] max-md:max-w-none" />
        <div className="reveal flex flex-col gap-[22px]">
          <span className="eyebrow">Meet the founder</span>
          <h2 id="founder-title" className="t-h2">
            {site.founder.name}
          </h2>
          <div className="font-semibold text-fg-2">{site.founder.title}</div>
          <p className="max-w-[35rem] text-[1.0625rem] text-fg-3">
            [One or two lines from Lenny on why Opulent Financial exists — to be provided.]
          </p>
          <ul className="flex flex-col gap-2.5 text-[0.97rem]">
            {credentials.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <Icon name="check" size={18} strokeWidth={2.4} className="mt-[3px] flex-none text-brand-light" />
                {c}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <GhostButton href="/founder" size="md" stretch className="min-h-[3.125rem]">
              Meet Lenny
            </GhostButton>
            <Link
              href="/inner-circle"
              className="inline-flex min-h-11 items-center font-semibold text-brand-light transition-colors hover:text-brand-soft"
            >
              Learn directly from Lenny inside the Inner Circle
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EducationPreview() {
  return (
    <section id="learn" aria-labelledby="learn-title" className="section-y border-y border-line-1 bg-ink-3">
      <div className="container-x flex flex-col gap-10 lg:gap-11">
        <SectionHeader
          id="learn-title"
          eyebrow="Education Hub"
          title="Learn how lenders think."
          action={<ArrowLink href="/education">Visit the Education Hub</ArrowLink>}
        />
        <div className="snap-rail" role="region" aria-label="Latest articles" tabIndex={0}>
          {articles.slice(0, 3).map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnerCards() {
  const cards = [
    {
      tag: "Affiliate program",
      title: "Refer clients. Earn with us.",
      text: "For creators, coaches and professionals whose audience needs better credit and funding.",
      href: "/affiliate",
      cta: "Become an affiliate",
    },
    {
      tag: "Careers",
      title: "Build wealth for others. Build a career for you.",
      text: "See open roles or send a general application.",
      href: "/careers",
      cta: "View careers",
    },
  ];
  return (
    <section aria-label="Partner with us" className="pt-18 pb-10 sm:pt-24 lg:pt-32">
      <div className="container-x grid gap-4 sm:gap-5 md:grid-cols-2">
        {cards.map((c) => (
          <div
            key={c.href}
            className="card-lift spotlight reveal flex flex-col gap-4 rounded-[22px] border border-line-3 bg-[linear-gradient(170deg,#0D182E,#0A1224)] p-6 sm:p-[42px]"
          >
            <span className="tag text-brand-light">{c.tag}</span>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-balance sm:text-[1.75rem]">
              {c.title}
            </h2>
            <p className="text-fg-3">{c.text}</p>
            <GhostButton href={c.href} size="md" className="mt-2 self-start">
              {c.cta}
            </GhostButton>
          </div>
        ))}
      </div>
    </section>
  );
}
