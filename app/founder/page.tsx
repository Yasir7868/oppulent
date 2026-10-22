import type { Metadata } from "next";
import { InnerCircleBanner } from "@/components/home/InnerCircleBanner";
import { CtaBand } from "@/components/sections/CtaBand";
import { Breadcrumbs, PageHero, Section } from "@/components/sections/PageHero";
import { GhostButton, PrimaryButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FounderPortrait } from "@/components/visuals/FounderPortrait";
import { delay } from "@/lib/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Meet the Founder — Leonard “Lenny” Ali-Permell",
  description:
    "Leonard “Lenny” Ali-Permell, Founder & President of Opulent Financial — BS in Finance (Honors), minor in Business Law, with expertise in FCRA, FDCPA, CROA and consumer-protection law.",
  alternates: { canonical: "/founder" },
};

const credentials = [
  "BS in Finance (Honors), minor in Business Law",
  "Associate’s in Accounting",
  "Expertise in FCRA, FDCPA, CROA and consumer-protection law",
];

const laws = [
  {
    code: "FCRA",
    name: "Fair Credit Reporting Act",
    text: "Your right to accurate, verifiable information on your credit reports — and to dispute what isn’t.",
  },
  {
    code: "FDCPA",
    name: "Fair Debt Collection Practices Act",
    text: "The rules third-party debt collectors must follow when they collect and report debts.",
  },
  {
    code: "CROA",
    name: "Credit Repair Organizations Act",
    text: "The federal law that governs how credit-repair companies may operate and what they must disclose.",
  },
  {
    code: "TILA",
    name: "Truth in Lending Act",
    text: "Requirements that lenders clearly disclose credit terms and costs.",
  },
];

export default function FounderPage() {
  return (
    <>
      <PageHero labelledBy="founder-title" gridAt="30% 40%">
        <div className="flex flex-col gap-7">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Meet the Founder" }]} />
          <div className="grid items-center gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
            <FounderPortrait className="rise mx-auto aspect-[4/5] max-w-[460px] max-md:aspect-[5/4] max-md:max-w-none" />
            <div className="flex flex-col gap-6">
              <span className="rise eyebrow text-cyan" style={delay(0.15)}>
                Meet the founder
              </span>
              <h1 id="founder-title" className="rise t-title" style={delay(0.25)}>
                {site.founder.name}
              </h1>
              <div className="rise font-semibold text-fg-2" style={delay(0.35)}>
                {site.founder.title}, Opulent Financial
              </div>
              <blockquote
                className="rise border-l-2 border-brand-light pl-5 font-display text-[1.1875rem] leading-relaxed text-fg-2 sm:text-[1.3125rem]"
                style={delay(0.45)}
              >
                [One or two lines from Lenny on why Opulent Financial exists — to be provided.]
              </blockquote>
              <ul className="rise flex flex-col gap-2.5 text-[0.97rem]" style={delay(0.55)}>
                {credentials.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <Icon name="check" size={18} strokeWidth={2.4} className="mt-[3px] flex-none text-brand-light" />
                    {c}
                  </li>
                ))}
              </ul>
              <div className="rise flex flex-col gap-3.5 sm:flex-row sm:flex-wrap" style={delay(0.65)}>
                <PrimaryButton href="/contact" stretch>
                  Book a Free Consultation
                </PrimaryButton>
                <GhostButton href="/inner-circle" stretch>
                  Learn from Lenny live
                </GhostButton>
              </div>
            </div>
          </div>
        </div>
      </PageHero>

      <Section labelledBy="expertise-title">
        <div className="flex flex-col gap-10 lg:gap-12">
          <SectionHeader
            id="expertise-title"
            eyebrow="Expertise"
            title="Grounded in consumer-protection law."
            lead="Every strategy starts from the rights federal law already gives you."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        </div>
      </Section>

      <div className="border-t border-line-1 bg-ink-3">
        <InnerCircleBanner />
      </div>

      <CtaBand
        id="book"
        className="pt-18 sm:pt-24 lg:pt-28"
        title={
          <>
            Work with Lenny’s team, <span className="shimmer-text">starting today.</span>
          </>
        }
        text="Book a free consultation. We’ll review your profile and map the fastest honest path to your goals."
        primary={{ label: "Book a Free Consultation", href: "/contact" }}
        secondary={{ label: "Check Your Credit Score", href: "/score-check" }}
      />
    </>
  );
}
