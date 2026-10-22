import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { Breadcrumbs, PageHero, Section } from "@/components/sections/PageHero";
import { ServiceSelector } from "@/components/sections/ServiceSelector";
import { Timeline, clientJourney } from "@/components/sections/Timeline";
import { GhostButton, PrimaryButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { delay } from "@/lib/motion";
import { serviceCatalog, type ServiceGroup } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services — Credit, Funding, Community & Protection",
  description:
    "Credit optimization, entity structuring, 0% intro-APR business funding, the Inner Circle community, life insurance and annuities — one path from credit to capital.",
  alternates: { canonical: "/services" },
};

const groups: { group: ServiceGroup; title: string; text: string }[] = [
  { group: "Credit", title: "Optimize your credit", text: "Repair what’s wrong. Build what’s missing." },
  { group: "Business", title: "Structure & fund your business", text: "Built to be fundable, then funded in the right order." },
  { group: "Community", title: "Learn with the Inner Circle", text: "Live classes, a course library and founder Q&A." },
  { group: "Protection", title: "Protect what you build", text: "Coverage and retirement income for your family." },
];

const subLinks: Record<string, { label: string; href: string }[]> = {
  "/services/credit-optimization": [
    { label: "Credit Repair", href: "/services/credit-optimization#repair" },
    { label: "Credit Building", href: "/services/credit-optimization#building" },
  ],
  "/services/business-funding": [
    { label: "Healthcare practitioners", href: "/services/business-funding#healthcare" },
    { label: "Real estate pros", href: "/services/business-funding#real-estate" },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <PageHero labelledBy="services-title" gridAt="72% 30%">
        <div className="flex max-w-[52rem] flex-col gap-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          <span className="rise eyebrow text-cyan" style={delay(0.1)}>
            Services
          </span>
          <h1 id="services-title" className="rise t-display" style={delay(0.2)}>
            One path from credit to <span className="shimmer-text">capital.</span>
          </h1>
          <p className="rise t-lead max-w-[38rem]" style={delay(0.35)}>
            Credit optimization, business structuring, funding, community and protection — each step setting up the
            next.
          </p>
          <div className="rise flex flex-col gap-3.5 sm:flex-row sm:flex-wrap" style={delay(0.5)}>
            <PrimaryButton href="/contact" stretch>
              Book a Free Consultation
            </PrimaryButton>
            <GhostButton href="#start" stretch>
              Help me choose
            </GhostButton>
          </div>
        </div>
      </PageHero>

      <section aria-label="All services" className="section-y">
        <div className="container-x flex flex-col">
          {groups.map((g, gi) => {
            const items = serviceCatalog.filter((s) => s.group === g.group);
            return (
              <div
                key={g.group}
                className="reveal grid gap-6 border-t border-line-3 py-10 first:border-t-0 first:pt-0 last:pb-0 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-12 lg:py-14"
              >
                <div className="flex flex-col gap-2">
                  <span className="font-tech text-xs text-brand-light">{String(gi + 1).padStart(2, "0")}</span>
                  <h2 className="font-display text-[1.625rem] leading-tight font-semibold tracking-[-0.02em] text-balance sm:text-[2rem]">
                    {g.title}
                  </h2>
                  <p className="text-fg-3">{g.text}</p>
                </div>
                <div className={items.length > 1 ? "grid gap-4 md:grid-cols-2" : "grid gap-4"}>
                  {items.map((s) => (
                    <div
                      key={s.href}
                      className="card-lift spotlight group relative flex flex-col gap-4 rounded-[20px] border border-line-3 bg-[linear-gradient(170deg,#0D182E,#0A1224)] p-6 sm:p-7"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="grid size-12 place-items-center rounded-[14px] border border-[rgba(61,149,255,0.3)] bg-[rgba(31,123,255,0.12)] text-cyan">
                          <Icon name={s.icon} size={24} strokeWidth={1.8} />
                        </span>
                        <Icon
                          name="arrowUpRight"
                          size={20}
                          className="text-brand-light transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>
                      <h3 className="font-display text-[1.375rem] font-semibold">
                        <Link href={s.href} className="after:absolute after:inset-0 after:rounded-[20px] after:content-['']">
                          {s.title}
                        </Link>
                      </h3>
                      <p className="text-[0.95rem] text-fg-3">{s.summary}</p>
                      {subLinks[s.href] ? (
                        <ul className="relative z-[1] mt-auto flex flex-wrap gap-2 pt-1">
                          {subLinks[s.href]!.map((l) => (
                            <li key={l.href}>
                              <Link href={l.href} className="btn-ghost min-h-10 rounded-full px-3.5 text-[0.84rem]">
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Section id="start" tone="alt" labelledBy="start-title">
        <div className="flex flex-col gap-10 lg:gap-12">
          <SectionHeader
            id="start-title"
            eyebrow="Start here"
            title="Which service is right for me?"
            lead="Pick the goal that sounds most like you. We’ll point you to the right place."
          />
          <ServiceSelector />
        </div>
      </Section>

      <Section labelledBy="journey-title">
        <div className="flex flex-col gap-12 lg:gap-14">
          <SectionHeader id="journey-title" eyebrow="How it works" title="From credit report to funded business." />
          <Timeline steps={clientJourney} muteLast />
        </div>
      </Section>

      <CtaBand
        id="book"
        title={
          <>
            Your next approval starts with <span className="shimmer-text">one conversation.</span>
          </>
        }
        text="Book a free consultation. We’ll review your profile and map the fastest honest path to your goals."
        primary={{ label: "Book a Free Consultation", href: "/contact" }}
        secondary={{ label: "Check Your Credit Score", href: "/score-check" }}
      />
    </>
  );
}
