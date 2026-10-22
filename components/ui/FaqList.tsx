import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type Faq = { q: string; a: ReactNode };

/** Native <details> accordion — keyboard and screen-reader friendly with no JavaScript. */
export function FaqList({ items, openFirst = false, className }: { items: Faq[]; openFirst?: boolean; className?: string }) {
  return (
    <div className={cn("flex flex-col border-t border-line-3", className)}>
      {items.map((item, i) => (
        <details key={item.q} open={openFirst && i === 0} className="group border-b border-line-3">
          <summary className="flex min-h-18 cursor-pointer items-center justify-between gap-5 py-4 font-display text-[1.0625rem] font-semibold leading-snug transition-colors hover:text-white sm:text-[1.1875rem]">
            {item.q}
            <span
              aria-hidden="true"
              className="faq-plus grid size-9 flex-none place-items-center rounded-full border border-line-5 text-xl leading-none text-brand-light group-open:border-brand-light"
            >
              +
            </span>
          </summary>
          <div className="max-w-3xl pb-6 pr-12 text-fg-3">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
