import Link from "next/link";
import { categoryLabels, readingMinutes, type Article } from "@/lib/articles";
import { ArticleCover } from "@/components/visuals/ArticleCover";
import { Icon } from "@/components/ui/Icon";

export function ArticleCard({ article, headingLevel = "h3" }: { article: Article; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="card-lift spotlight reveal group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-line-3 bg-ink-5">
      <ArticleCover category={article.category} id={article.slug} className="transition-transform duration-700 group-hover:scale-[1.03]" />
      <div className="flex flex-1 flex-col gap-2.5 px-6 pt-6 pb-7">
        <span className="tag text-brand-light">{categoryLabels[article.category]}</span>
        <Heading className="font-display text-xl leading-snug font-semibold text-balance">
          <Link href={`/education/${article.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {article.title}
          </Link>
        </Heading>
        <p className="text-[0.9rem] text-fg-3">{article.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-[0.8125rem] text-fg-4">
          <span>{readingMinutes(article)} min read</span>
          <Icon
            name="arrowUpRight"
            size={18}
            className="text-brand-light transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </article>
  );
}
