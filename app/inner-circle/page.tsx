import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/brand/Logo";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { PageHero, Section } from "@/components/sections/PageHero";
import { PrimaryButton } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LiveClassWindow } from "@/components/visuals/LiveClassWindow";
import { MembershipCard } from "@/components/visuals/MembershipCard";
import { innerCircleFaqs, liveClasses, modules, valueStack, valueTotal } from "@/lib/inner-circle";
import { delay } from "@/lib/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Inner Circle — Live Credit & Funding Classes ($97)",
  description:
    "Live classes on personal credit, business credit and funding, a six-module course library, and exclusive Q&A with founder Lenny Ali-Permell — for $97.",
  alternates: { canonical: "/inner-circle" },
};

const joinHref = site.innerCircle.checkoutUrl || "#join";
const joinLabel = `Join the Inner Circle — ${site.innerCircle.price}`;

function Hero() {
  return (
    <PageHero labelledBy="ic-title" gridAt="75% 35%" innerClassName="lg:pt-20 lg:pb-[7.5rem]">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-[26px]">
          <span className="rise eyebrow text-cyan" style={delay(0.1)}>
            Community · Opulent Financial
          </span>
          <h1 id="ic-title" className="rise t-display text-balance" style={delay(0.25)}>
            The <span className="shimmer-text">Inner Circle</span>
          </h1>
          <p className="rise t-lead max-w-[35rem]" style={delay(0.45)}>
            Live classes, exclusive Q&amp;A with our founder, and a community of entrepreneurs building credit and
            funding — together.
          </p>
          <div className="rise flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5" style={delay(0.6)}>
            <PrimaryButton href={joinHref} stretch>
              {joinLabel}
            </PrimaryButton>
            <Link
              href="#curriculum"
              className="inline-flex min-h-11 items-center justify-center font-semibold text-fg-2 transition-colors hover:text-white"
            >
              See the curriculum
            </Link>
          </div>
        </div>

        <div className="relative grid min-h-[280px] place-items-center sm:min-h-[360px] lg:min-h-[420px]">
          {[0, 2].map((d) => (
            <span
              key={d}
              aria-hidden="true"
              className="ring-pulse absolute top-1/2 left-1/2 aspect-square w-[min(520px,115%)] rounded-full border border-[rgba(92,200,255,0.35)] opacity-30"
              style={{ transform: "translate(-50%, -50%)", animationDelay: `${d}s` }}
            />
          ))}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 w-[min(520px,110%)] opacity-[0.28] blur-[28px]"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <Mark className="w-full" sizes="520px" />
          </div>
          <div className="w-[min(100%,470px)] animate-[of-float_8s_ease-in-out_1.8s_infinite]">
            <MembershipCard />
          </div>
        </div>
      </div>
    </PageHero>
  );
}

function Included() {
  return (
    <Section tone="alt" labelledBy="included-title" className="border-t-0">
      <div className="flex flex-col gap-10 lg:gap-11">
        <SectionHeader
          id="included-title"
          eyebrow="What’s included"
          size="md"
          title="Learn live. Ask the founder. Build alongside people doing the same."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {liveClasses.map((c) => (
            <div key={c} className="card-lift spotlight reveal flex flex-col gap-2.5 rounded-2xl border border-line-3 bg-ink-5 p-6 sm:p-7">
              <span className="tag text-cyan">Live class</span>
              <span className="font-display text-xl font-semibold">{c}</span>
            </div>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="reveal flex flex-col gap-5 rounded-2xl border border-line-6 bg-[radial-gradient(360px_220px_at_100%_0%,rgba(31,123,255,0.22),rgba(0,0,0,0)_70%),#0D1B38] p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-7">
            <div className="relative grid size-24 flex-none place-items-center overflow-hidden rounded-full border-2 border-brand-light bg-[linear-gradient(160deg,#1C3B73,#0B1630)] shadow-[0_0_24px_rgba(47,140,255,0.4)]">
              <Mark className="w-14" sizes="56px" />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="tag text-cyan">Exclusive</span>
              <span className="font-display text-xl font-semibold">Q&amp;A sessions with our founder</span>
              <span className="text-[0.9375rem] text-fg-3">
                Bring your questions to Lenny — a professional financial consultant.
              </span>
            </div>
          </div>
          <div className="reveal flex flex-col justify-center gap-1.5 rounded-2xl border border-line-3 bg-ink-5 p-6 sm:p-7">
            <span className="tag text-cyan">On demand</span>
            <span className="font-display text-xl font-semibold">Full course library + past live recordings</span>
            <span className="text-[0.9375rem] text-fg-3">Six modules you can work through at your own pace.</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Value() {
  return (
    <Section labelledBy="value-title">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="reveal flex flex-col gap-4">
          <span className="eyebrow">The value</span>
          <h2 id="value-title" className="t-h2-sm">
            Everything you get, for one price.
          </h2>
          <p className="max-w-[30rem] text-[1.0625rem] text-fg-3">
            What each piece would cost on its own, next to what you pay to join.
          </p>
        </div>
        <div className="reveal rounded-[20px] border border-line-4 bg-ink-5 px-5 pt-2 pb-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:px-8 sm:pt-3 sm:pb-8">
          <table className="w-full border-collapse">
            <caption className="sr-only">Inner Circle value stack</caption>
            <tbody>
              {valueStack.map((row, i) => (
                <tr key={row.item} className={i === valueStack.length - 1 ? "border-b border-line-4" : "border-b border-line-3"}>
                  <th scope="row" className="py-4 pr-4 text-left text-[0.95rem] font-medium text-fg-2 sm:py-[18px] sm:text-base">
                    {row.item}
                  </th>
                  <td className="py-4 text-right whitespace-nowrap text-fg-3 sm:py-[18px]">{row.value}</td>
                </tr>
              ))}
              <tr>
                <th scope="row" className="pt-5 pb-2 text-left font-semibold text-fg-3">
                  Total value
                </th>
                <td className="pt-5 pb-2 text-right whitespace-nowrap text-fg-3 line-through">{valueTotal}</td>
              </tr>
              <tr>
                <th scope="row" className="pt-1.5 text-left font-display text-[1.375rem] font-semibold">
                  You pay
                </th>
                <td className="pt-1.5 text-right font-display text-[2.75rem] leading-tight font-semibold [text-shadow:0_0_24px_rgba(47,140,255,0.5)]">
                  {site.innerCircle.price}
                </td>
              </tr>
            </tbody>
          </table>
          <PrimaryButton href={joinHref} block className="mt-6 w-full">
            {joinLabel}
          </PrimaryButton>
        </div>
      </div>
    </Section>
  );
}

function Curriculum() {
  return (
    <Section id="curriculum" tone="alt" labelledBy="curriculum-title" innerClassName="max-w-[65rem]">
      <div className="flex flex-col gap-10">
        <SectionHeader
          id="curriculum-title"
          eyebrow="Curriculum"
          size="md"
          title="Six modules. Credit to capital."
          lead="Lessons unlock inside the community after you join."
        />
        <div className="flex flex-col gap-3">
          {modules.map((m, i) => (
            <details
              key={m.num}
              id={`module-${m.num}`}
              open={i === 0}
              className="group rounded-[14px] border border-line-4 bg-ink-5 px-[18px] transition-colors open:border-line-6 sm:px-[26px]"
            >
              <summary className="flex min-h-[4.75rem] cursor-pointer items-center gap-4 py-3 sm:gap-5">
                <span className="min-w-[26px] font-tech text-[0.6875rem] text-brand-light">{m.num}</span>
                <span className="flex-1 font-display text-[1.125rem] font-semibold sm:text-xl">{m.title}</span>
                {m.badge ? (
                  <span className="hidden rounded border border-line-6 px-2 py-1 font-tech text-[0.5625rem] tracking-[0.16em] text-cyan uppercase xs:inline">
                    {m.badge}
                  </span>
                ) : null}
                <span
                  aria-hidden="true"
                  className="faq-plus grid size-9 flex-none place-items-center rounded-full border border-line-5 text-xl leading-none text-brand-light group-open:border-brand-light"
                >
                  +
                </span>
              </summary>
              <div className="pb-7 sm:pl-[46px]">
                {m.badge ? (
                  <span className="mb-3 inline-block rounded border border-line-6 px-2 py-1 font-tech text-[0.5625rem] tracking-[0.16em] text-cyan uppercase xs:hidden">
                    {m.badge}
                  </span>
                ) : null}
                {m.groups ? (
                  <div className="grid gap-6 md:grid-cols-3">
                    {m.groups.map((g) => (
                      <div key={g.title} className="flex flex-col gap-2">
                        <span className="text-sm font-bold text-fg-2">{g.title}</span>
                        <ul className="flex list-disc flex-col gap-1 pl-[18px] text-[0.9rem] text-fg-3 marker:text-brand-light">
                          {g.lessons.map((l) => (
                            <li key={l}>{l}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}
                {m.lessons ? (
                  <ul className="flex list-disc flex-col gap-1 pl-[18px] text-[0.9rem] text-fg-3 marker:text-brand-light">
                    {m.lessons.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                ) : null}
                {m.summary ? (
                  <p className="text-[0.9rem] text-fg-3">
                    {m.num === "06" && site.myTradeLineUrl ? (
                      <>
                        Launch your own tradeline shop with{" "}
                        <a href={site.myTradeLineUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-light hover:text-brand-soft">
                          MyTradeLine
                        </a>
                        .
                      </>
                    ) : (
                      m.summary
                    )}
                  </p>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Members() {
  return (
    <Section labelledBy="members-title">
      <div className="flex flex-col gap-10">
        <SectionHeader id="members-title" eyebrow="Members" size="md" title="From the community." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1].map((i) => (
            <figure key={i} className="reveal flex flex-col gap-5 rounded-2xl border border-line-3 bg-ink-5 p-6 sm:p-[30px]">
              <blockquote className="text-[1.0625rem] text-fg-2">“[Member testimonial — with permission.]”</blockquote>
              <figcaption className="mt-auto flex items-center gap-3 text-sm text-fg-3">
                <span aria-hidden="true" className="size-10 rounded-full bg-[linear-gradient(140deg,#22355A,#0B1426)]" />
                [Member name]
              </figcaption>
            </figure>
          ))}
          <LiveClassWindow className="reveal md:col-span-2 lg:col-span-1" />
        </div>
      </div>
    </Section>
  );
}

function Join() {
  return (
    <section id="join" aria-labelledby="join-title" className="pb-18 sm:pb-24 lg:pb-[7.5rem]">
      <div className="container-x">
        <div className="reveal relative flex flex-col items-center gap-5 overflow-hidden rounded-[22px] border border-line-6 bg-[radial-gradient(600px_320px_at_50%_0%,rgba(47,140,255,0.38),rgba(0,0,0,0)_70%),#081124] px-4 py-12 text-center sm:rounded-3xl sm:px-12 sm:py-[4.5rem]">
          <Mark className="w-24 sm:w-[120px]" sizes="120px" />
          <h2 id="join-title" className="t-h2 max-w-[47.5rem]">
            Your seat in the Inner Circle is waiting.
          </h2>
          {site.innerCircle.checkoutUrl ? (
            <PrimaryButton href={site.innerCircle.checkoutUrl} stretch className="mt-2">
              {joinLabel}
            </PrimaryButton>
          ) : (
            <div className="mt-2 w-full max-w-[34rem] text-left">
              <p className="mb-6 text-center text-fg-3">
                Reserve your seat for {site.innerCircle.price}. Leave your name and email and we’ll follow up with your
                secure checkout link.
              </p>
              <InquiryForm
                kind="inner-circle"
                fields={[
                  { name: "firstName", label: "First name", type: "text", autoComplete: "given-name", half: true },
                  { name: "email", label: "Email", type: "email", autoComplete: "email", half: true },
                  {
                    name: "consent",
                    label: "I agree that Opulent Financial may email me about joining the Inner Circle.",
                    type: "consent",
                  },
                ]}
                submitLabel={`Reserve my seat — ${site.innerCircle.price}`}
                successTitle="Your seat is reserved."
                successText="Watch your inbox — we’ll send your secure checkout link."
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function InnerCirclePage() {
  return (
    <>
      <Hero />
      <Included />
      <Value />
      <Curriculum />
      <Members />
      <section aria-labelledby="ic-faq-title" className="pb-18 sm:pb-24 lg:pb-28">
        <div className="container-x flex max-w-[60rem] flex-col gap-8">
          <h2 id="ic-faq-title" className="t-h2-sm reveal">
            Common questions
          </h2>
          <FaqList items={innerCircleFaqs} />
        </div>
      </section>
      <Join />
    </>
  );
}
