import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Atmosphere } from "@/components/visuals/Atmosphere";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="rise text-[0.85rem] text-fg-4">
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2.5">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {c.href ? (
              <Link href={c.href} className="inline-flex min-h-8 items-center text-fg-3 transition-colors hover:text-fg">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-fg">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Top-of-page hero for inner pages. Extends beneath the sticky header so the atmosphere reads edge to edge. */
export function PageHero({
  children,
  labelledBy,
  gridAt,
  className,
  innerClassName,
}: {
  children: ReactNode;
  labelledBy: string;
  gridAt?: string;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cn(
        "relative -mt-[var(--header-h)] overflow-hidden border-b border-line-1 bg-ink-1 pt-[var(--header-h)]",
        className,
      )}
    >
      <Atmosphere gridAt={gridAt} />
      <div className={cn("container-x relative pt-6 pb-16 sm:pt-10 sm:pb-20 lg:pt-16 lg:pb-[6.5rem]", innerClassName)}>
        {children}
      </div>
    </section>
  );
}

/** Standard content section. `tone="alt"` gives the raised band with hairlines. */
export function Section({
  children,
  id,
  labelledBy,
  label,
  tone = "base",
  className,
  innerClassName,
}: {
  children: ReactNode;
  id?: string;
  labelledBy?: string;
  label?: string;
  tone?: "base" | "alt";
  className?: string;
  innerClassName?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={cn("section-y", tone === "alt" && "border-y border-line-1 bg-ink-3", className)}
    >
      <div className={cn("container-x", innerClassName)}>{children}</div>
    </section>
  );
}

/** Small-print strip shown above the footer on pages with specific disclosures. */
export function PageDisclosure({ children }: { children: ReactNode }) {
  return (
    <div className="border-t border-line-1 bg-ink-2">
      <p className="container-x py-6 text-[0.8rem] text-fg-5">{children}</p>
    </div>
  );
}
