"use client";

import { useState } from "react";
import { categoryLabels, type Article, type ArticleCategory } from "@/lib/articles";
import { cn } from "@/lib/cn";
import { ArticleCard } from "./ArticleCard";

type Filter = "all" | ArticleCategory;

/** Article grid with category filter chips. */
export function ArticleBrowser({ articles }: { articles: Article[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const filters: Filter[] = ["all", ...(Object.keys(categoryLabels) as ArticleCategory[])];
  const shown = filter === "all" ? articles : articles.filter((a) => a.category === filter);

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Filter by topic" className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.map((f) => {
          const count = f === "all" ? articles.length : articles.filter((a) => a.category === f).length;
          const on = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f)}
              className={cn(
                "inline-flex min-h-11 flex-none cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors",
                on ? "border-brand-light bg-[rgba(61,149,255,0.14)] text-fg" : "border-line-5 text-fg-2 hover:border-brand-light",
              )}
            >
              {f === "all" ? "All topics" : categoryLabels[f]}
              <span className={cn("font-tech text-[0.625rem]", on ? "text-cyan" : "text-fg-5")}>{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "article" : "articles"}
      </p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((a) => (
          <ArticleCard key={a.slug} article={a} headingLevel="h2" />
        ))}
      </div>
    </div>
  );
}
