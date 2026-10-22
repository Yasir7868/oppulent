import type { ReactNode } from "react";
import { Breadcrumbs, PageHero, type Crumb } from "./PageHero";
import { delay } from "@/lib/motion";

/** Hero layout with the pitch on the left and a form card on the right. */
export function FormPage({
  titleId,
  crumbs,
  eyebrow,
  title,
  lead,
  aside,
  formTitle,
  formIntro,
  form,
}: {
  titleId: string;
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  aside?: ReactNode;
  formTitle: string;
  formIntro?: ReactNode;
  form: ReactNode;
}) {
  return (
    <PageHero labelledBy={titleId} gridAt="70% 25%" innerClassName="lg:pb-24">
      <div className="flex flex-col gap-7">
        <Breadcrumbs items={crumbs} />
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="flex flex-col gap-6">
            <span className="rise eyebrow text-cyan" style={delay(0.1)}>
              {eyebrow}
            </span>
            <h1 id={titleId} className="rise t-title" style={delay(0.2)}>
              {title}
            </h1>
            <p className="rise t-lead max-w-[32rem]" style={delay(0.35)}>
              {lead}
            </p>
            {aside ? (
              <div className="rise mt-2" style={delay(0.5)}>
                {aside}
              </div>
            ) : null}
          </div>
          <div className="rise self-start" style={delay(0.45)}>
            <div className="frame-glow">
              <div className="frame-glow-inner flex flex-col gap-6 bg-ink-4 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:p-9">
                <div className="flex flex-col gap-1.5">
                  <h2 className="font-display text-[1.5rem] font-semibold">{formTitle}</h2>
                  {formIntro ? <p className="text-[0.9rem] text-fg-3">{formIntro}</p> : null}
                </div>
                {form}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageHero>
  );
}

/** Numbered list used beside forms ("How it works", "What to expect"). */
export function NumberedList({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={item.title} className="flex gap-4 rounded-2xl border border-line-3 bg-[rgba(11,20,38,0.7)] p-5">
          <span className="grid size-10 flex-none place-items-center rounded-full border border-brand-light font-tech text-[0.625rem] text-brand-light">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-display font-semibold">{item.title}</h3>
            <p className="mt-1 text-[0.9rem] text-fg-3">{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
