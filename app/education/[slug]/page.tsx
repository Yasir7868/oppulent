import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Breadcrumbs, PageHero, Section } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArticleCover } from "@/components/visuals/ArticleCover";
import { articles, categoryLabels, getArticle, readingMinutes, type ArticleBlock } from "@/lib/articles";
import { delay } from "@/lib/motion";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/education/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/education/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.excerpt },
  };
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2 className="mt-7 font-display text-[1.5rem] font-semibold tracking-[-0.02em] text-fg sm:text-[1.75rem]">{block.text}</h2>;
    case "ul":
      return (
        <ul className="flex flex-col gap-3">
          {block.items.map((item) => (
            <li key={item.text} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.7em] size-1.5 flex-none rounded-full bg-brand-light" />
              <span>
                {item.lead ? <strong className="font-semibold text-fg">{item.lead} </strong> : null}
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside className="my-5 flex flex-col gap-4 rounded-[18px] border border-line-6 bg-[radial-gradient(360px_220px_at_100%_0%,rgba(31,123,255,0.22),rgba(0,0,0,0)_70%),#0D1B38] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <p className="font-display text-lg font-semibold text-fg">{block.text}</p>
          <Link href={block.href} className="link-arrow shrink-0">
            {block.cta}
            <Icon name="arrowRight" size={16} />
          </Link>
        </aside>
      );
  }
}

export default async function ArticlePage({ params }: PageProps<"/education/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== article.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/education/${article.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero labelledBy="article-title" gridAt="70% 25%" innerClassName="lg:pb-20">
        <div className="mx-auto flex max-w-[48rem] flex-col gap-6">
          <Breadcrumbs items={[{ label: "Education Hub", href: "/education" }, { label: categoryLabels[article.category] }]} />
          <span className="rise eyebrow" style={delay(0.1)}>
            {categoryLabels[article.category]}
          </span>
          <h1 id="article-title" className="rise t-title" style={delay(0.2)}>
            {article.title}
          </h1>
          <p className="rise t-lead" style={delay(0.3)}>
            {article.excerpt}
          </p>
          <div className="rise flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-4" style={delay(0.4)}>
            <span className="flex items-center gap-2">
              <Icon name="book" size={16} className="text-brand-light" />
              {site.name}
            </span>
            <span className="flex items-center gap-2">
              <Icon name="clock" size={16} className="text-brand-light" />
              {readingMinutes(article)} min read
            </span>
          </div>
        </div>
      </PageHero>

      <article aria-labelledby="article-title" className="pb-16 sm:pb-20">
        <div className="container-x">
          <div className="mx-auto max-w-[48rem]">
            <ArticleCover
              category={article.category}
              id={`hero-${article.slug}`}
              className="-mt-8 rounded-[20px] border border-line-4 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:-mt-12"
            />
            <div className="mt-10 flex flex-col gap-5 text-[1.0625rem] leading-[1.75] text-fg-2 sm:mt-14 sm:text-[1.125rem]">
              {article.body.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
            <p className="mt-12 border-t border-line-3 pt-6 text-[0.84rem] text-fg-4">
              This article is for general education and isn’t legal, tax or financial advice. Individual situations vary.
            </p>
          </div>
        </div>
      </article>

      <Section tone="alt" labelledBy="related-title">
        <div className="flex flex-col gap-10">
          <SectionHeader id="related-title" eyebrow="Keep learning" size="md" title="More from the Education Hub." />
          <div className="grid gap-5 md:grid-cols-2">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        id="book"
        className="pt-18 sm:pt-24 lg:pt-28"
        title="Turn what you’ve learned into a plan."
        text="Book a free consultation and we’ll apply it to your profile."
        primary={{ label: "Book a Free Consultation", href: "/contact" }}
        secondary={{ label: "Check Your Credit Score", href: "/score-check" }}
      />
    </>
  );
}
