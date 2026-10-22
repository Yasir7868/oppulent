import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Breadcrumbs, PageDisclosure, PageHero, Section } from "@/components/sections/PageHero";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { delay } from "@/lib/motion";
import { caseStudies, resultsDisclaimer } from "@/lib/results";

export const metadata: Metadata = {
  title: "Results — Client Case Studies",
  description:
    "Client results from Opulent Financial: credit repair, business funding and Inner Circle stories, anonymized and published with written permission.",
  alternates: { canonical: "/results" },
};

const principles: { icon: IconName; title: string; text: string }[] = [
  { icon: "user", title: "Real clients only", text: "Every story here comes from a real client." },
  { icon: "lock", title: "Anonymized, with permission", text: "Stories are anonymized and published only with written permission." },
  { icon: "shield", title: "Honest about outcomes", text: "Results vary, and accurate, verified information may legally remain on a report." },
];

export default function ResultsPage() {
  return (
    <>
      <PageHero labelledBy="results-title" gridAt="70% 30%">
        <div className="flex max-w-[50rem] flex-col gap-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Results" }]} />
          <span className="rise eyebrow text-cyan" style={delay(0.1)}>
            Results
          </span>
          <h1 id="results-title" className="rise t-display" style={delay(0.2)}>
            Real clients. <span className="shimmer-text">Real numbers.</span>
          </h1>
          <p className="rise t-lead max-w-[36rem]" style={delay(0.35)}>
            Credit repair, business funding and Inner Circle stories — anonymized and published with each client’s written
            permission.
          </p>
        </div>
      </PageHero>

      <Section labelledBy="studies-title">
        <div className="flex flex-col gap-10">
          <SectionHeader id="studies-title" eyebrow="Case studies" size="md" title="Before, after, and how we got there." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study, i) => (
              <CaseStudyCard key={i} study={study} />
            ))}
          </div>
          <p className="text-[0.8125rem] text-fg-4">{resultsDisclaimer}</p>
        </div>
      </Section>

      <Section tone="alt" labelledBy="principles-title">
        <div className="flex flex-col gap-10">
          <SectionHeader id="principles-title" eyebrow="How we publish results" size="md" title="Proof you can trust." />
          <div className="grid gap-4 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="reveal flex flex-col gap-3 rounded-[18px] border border-line-4 bg-ink-5 p-6 sm:p-8">
                <span className="grid size-11 place-items-center rounded-xl border border-[rgba(61,149,255,0.3)] bg-[rgba(31,123,255,0.12)] text-cyan">
                  <Icon name={p.icon} size={20} strokeWidth={1.8} />
                </span>
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="text-[0.95rem] text-fg-3">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        id="book"
        className="pt-18 sm:pt-24 lg:pt-28"
        title={
          <>
            Ready to write <span className="shimmer-text">your own story?</span>
          </>
        }
        text="Book a free consultation. We’ll review your profile and map the fastest honest path to your goals."
        primary={{ label: "Book a Free Consultation", href: "/contact" }}
        secondary={{ label: "Check Your Credit Score", href: "/score-check" }}
      />

      <PageDisclosure>{resultsDisclaimer}</PageDisclosure>
    </>
  );
}
