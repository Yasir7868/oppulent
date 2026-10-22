import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sections/CtaBand";
import { HeroLinkCard } from "@/components/sections/HeroLinkCard";
import { Breadcrumbs, PageDisclosure, PageHero, Section } from "@/components/sections/PageHero";
import { Timeline } from "@/components/sections/Timeline";
import { GhostButton, PrimaryButton } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProfileStack } from "@/components/visuals/ProfileStack";
import { cn } from "@/lib/cn";
import { delay } from "@/lib/motion";
import { getServicePage, servicePages, type ServiceBlock } from "@/lib/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: `/services/${page.slug}` },
  };
}

function Block({ block, index }: { block: ServiceBlock; index: number }) {
  const tone = index % 2 === 0 ? "alt" : "base";
  const titleId = `${block.id ?? `block-${index}`}-title`;

  if (block.kind === "checklist") {
    return (
      <Section id={block.id} tone={tone} labelledBy={titleId} className={index === 0 ? "border-t-0" : undefined}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeader id={titleId} eyebrow={block.eyebrow} size="md" title={block.title} lead={block.intro} />
            <ul className="flex flex-col gap-3">
              {block.items.map((item) => (
                <li key={item.title} className="reveal flex gap-4 rounded-[14px] border border-line-3 bg-ink-5 px-5 py-4">
                  <span className="mt-0.5 grid size-6 flex-none place-items-center rounded-full bg-[rgba(61,149,255,0.2)] text-cyan-light">
                    <Icon name="check" size={13} strokeWidth={3} />
                  </span>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-0.5 text-[0.9rem] text-fg-3">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Illustrates the list beside it; on phones the list alone carries the content. */}
          <div className="hidden md:block">
            <ProfileStack variant={block.visual} />
          </div>
        </div>
      </Section>
    );
  }

  if (block.kind === "steps") {
    return (
      <Section id={block.id} tone={tone} labelledBy={titleId} className={index === 0 ? "border-t-0" : undefined}>
        <div className="flex flex-col gap-12">
          <SectionHeader id={titleId} eyebrow={block.eyebrow} size="md" title={block.title} lead={block.intro} />
          <Timeline steps={block.steps} />
        </div>
      </Section>
    );
  }

  const three = block.cards.length >= 3;
  return (
    <Section id={block.id} tone={tone} labelledBy={titleId} className={index === 0 ? "border-t-0" : undefined}>
      <div className="flex flex-col gap-10 lg:gap-12">
        <SectionHeader id={titleId} eyebrow={block.eyebrow} size="md" title={block.title} lead={block.intro} />
        <div className={cn("grid gap-4 sm:gap-5", three ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2")}>
          {block.cards.map((card, i) => (
            <article
              key={card.title}
              id={card.id}
              className={cn(
                "card-lift spotlight flex flex-col gap-3 rounded-[20px] border border-line-3 bg-[linear-gradient(170deg,#0D182E,#0A1224)] p-6 sm:p-8",
                // Anchor targets stay put so in-page links land precisely.
                !card.id && "reveal",
                three && i === 2 && "md:col-span-2 lg:col-span-1",
              )}
            >
              {card.tag ? <span className="tag text-cyan">{card.tag}</span> : null}
              <h3 className="font-display text-[1.375rem] leading-snug font-semibold">{card.title}</h3>
              <p className="text-[0.97rem] text-fg-3">{card.text}</p>
              {card.note ? <p className="mt-auto pt-2 text-[0.84rem] text-fg-4">{card.note}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const protection = page.primaryCta.goal === "life" || page.primaryCta.goal === "annuity";
  const contactHref = `/contact?goal=${page.primaryCta.goal}`;

  return (
    <>
      <PageHero labelledBy="service-title" gridAt="75% 30%">
        <div className="flex flex-col gap-7">
          <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: page.title }]} />
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
            <div className="flex flex-col gap-6">
              <span className="rise eyebrow text-cyan" style={delay(0.1)}>
                {page.eyebrow}
              </span>
              <h1 id="service-title" className="rise t-display" style={delay(0.25)}>
                {page.titleLead ? `${page.titleLead} ` : null}
                <span className="shimmer-text">{page.titleAccent}</span>
              </h1>
              <p className="rise t-lead max-w-[35rem]" style={delay(0.45)}>
                {page.lead}
              </p>
              <div className="rise flex flex-col gap-3.5 sm:flex-row sm:flex-wrap" style={delay(0.6)}>
                <PrimaryButton href={contactHref} stretch>
                  {page.primaryCta.label}
                </PrimaryButton>
                {protection ? (
                  <GhostButton href="/services" stretch>
                    Explore all services
                  </GhostButton>
                ) : (
                  <GhostButton href="/score-check" stretch>
                    Check Your Credit Score
                  </GhostButton>
                )}
              </div>
            </div>
            <div className="grid gap-3.5 sm:grid-cols-2">
              {page.heroCards.map((c, i) => (
                <HeroLinkCard
                  key={c.title}
                  num={String(i + 1).padStart(2, "0")}
                  title={c.title}
                  text={c.text}
                  href={c.href}
                  wait={0.7 + i * 0.15}
                />
              ))}
            </div>
          </div>
        </div>
      </PageHero>

      {page.blocks.map((block, i) => (
        <Block key={block.id ?? i} block={block} index={i} />
      ))}

      <section aria-labelledby="related-title" className="pt-18 sm:pt-24 lg:pt-28">
        <div className="container-x">
          <Link
            href={page.related.href}
            className="ring-conic card-lift group flex flex-col gap-6 rounded-[22px] p-6 shadow-[0_0_60px_rgba(31,123,255,0.15)] [--ring-fill:linear-gradient(100deg,#0E2350,#0A1730_55%,#0B1426)] sm:p-10 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex max-w-[40rem] flex-col gap-2.5">
              <span className="tag text-cyan">{page.related.eyebrow}</span>
              <h2 id="related-title" className="font-display text-[1.625rem] font-semibold tracking-[-0.01em] sm:text-[1.875rem]">
                {page.related.title}
              </h2>
              <p className="text-fg-2">{page.related.text}</p>
            </div>
            <span className="link-arrow shrink-0 text-base">
              {page.related.cta}
              <Icon name="arrowRight" size={16} />
            </span>
          </Link>
        </div>
      </section>

      <Section labelledBy="service-faq-title" innerClassName="max-w-[60rem]">
        <div className="flex flex-col gap-9">
          <div className="reveal flex flex-col gap-3.5">
            <span className="eyebrow">FAQ</span>
            <h2 id="service-faq-title" className="t-h2-sm">
              Questions, answered.
            </h2>
          </div>
          <FaqList items={page.faqs} openFirst />
        </div>
      </Section>

      <CtaBand
        id="book"
        title={page.cta.title}
        text={page.cta.text}
        primary={{ label: page.cta.label, href: contactHref }}
        secondary={{ label: "See all services", href: "/services" }}
      />

      <PageDisclosure>{page.disclaimer}</PageDisclosure>
    </>
  );
}
