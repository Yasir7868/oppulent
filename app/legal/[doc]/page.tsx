import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { getLegalDoc, legalDocs } from "@/lib/legal";
import { delay } from "@/lib/motion";

export const dynamicParams = false;

export function generateStaticParams() {
  return legalDocs.map((d) => ({ doc: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[doc]">): Promise<Metadata> {
  const { doc } = await params;
  const page = getLegalDoc(doc);
  if (!page) return {};
  return { title: page.title, description: page.description, alternates: { canonical: `/legal/${page.slug}` } };
}

export default async function LegalPage({ params }: PageProps<"/legal/[doc]">) {
  const { doc } = await params;
  const page = getLegalDoc(doc);
  if (!page) notFound();

  return (
    <>
      <PageHero labelledBy="legal-title" gridAt="75% 20%" innerClassName="lg:pb-20">
        <div className="flex max-w-[48rem] flex-col gap-5">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: page.title }]} />
          <h1 id="legal-title" className="rise t-title" style={delay(0.15)}>
            {page.title}
          </h1>
          <p className="rise t-lead" style={delay(0.25)}>
            {page.intro}
          </p>
          <p className="rise text-sm text-fg-4" style={delay(0.3)}>
            Last updated: [Date]
          </p>
        </div>
      </PageHero>

      <div className="container-x grid gap-10 py-14 sm:py-18 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="On this page" className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
          <details className="group rounded-2xl border border-line-3 bg-ink-5 px-5 lg:border-0 lg:bg-transparent lg:p-0" open>
            <summary className="flex min-h-14 cursor-pointer items-center justify-between font-semibold lg:hidden">
              On this page
              <Icon name="chevronDown" size={18} className="text-brand-light transition-transform group-open:rotate-180" />
            </summary>
            <span className="tag hidden pb-4 text-fg-5 lg:block">On this page</span>
            <ol className="flex flex-col gap-1 pb-4 text-[0.9rem] lg:border-l lg:border-line-3 lg:pb-0">
              {page.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex min-h-10 items-center text-fg-3 transition-colors hover:text-fg lg:-ml-px lg:border-l lg:border-transparent lg:pl-4 lg:hover:border-brand-light">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </details>
        </nav>

        <div className="flex max-w-[48rem] flex-col gap-12">
          {page.sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="flex flex-col gap-4">
              <h2 id={`${s.id}-h`} className="font-display text-[1.5rem] font-semibold tracking-[-0.02em]">
                {s.heading}
              </h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="leading-[1.75] text-fg-2">
                  {p}
                </p>
              ))}
            </section>
          ))}
          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line-3 pt-6 text-sm">
            {legalDocs
              .filter((d) => d.slug !== page.slug)
              .map((d) => (
                <Link key={d.slug} href={`/legal/${d.slug}`} className="link-arrow">
                  {d.title}
                  <Icon name="arrowRight" size={16} />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
