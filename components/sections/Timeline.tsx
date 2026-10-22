import { cn } from "@/lib/cn";

export type Step = { title: string; text: string };

/**
 * Numbered steps. Horizontal with a travelling light on wide screens,
 * a vertical rail on phones and tablets.
 */
export function Timeline({ steps, muteLast = false }: { steps: Step[]; muteLast?: boolean }) {
  const cols = steps.length >= 5 ? "lg:grid-cols-5" : steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-px overflow-hidden bg-line-4 lg:block">
        <span className="travel absolute top-0 h-px w-1/4 bg-[linear-gradient(90deg,rgba(92,200,255,0),#5CC8FF,rgba(92,200,255,0))] shadow-[0_0_12px_#5CC8FF]" />
      </div>
      <ol className={cn("ml-1 grid border-l border-line-4 lg:ml-0 lg:border-l-0", cols)}>
        {steps.map((step, i) => {
          const muted = muteLast && i === steps.length - 1;
          return (
            <li key={step.title} className="reveal relative flex flex-col gap-2.5 pb-9 pl-7 last:pb-0 lg:pt-9 lg:pr-6 lg:pb-0 lg:pl-0">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-1.5 -left-[5px] size-[9px] rounded-full lg:-top-[5px] lg:left-0",
                  muted ? "bg-fg-2" : "bg-brand-light shadow-[0_0_12px_#2F8CFF]",
                )}
              />
              <span className={cn("font-tech text-xs", muted ? "text-fg-2" : "text-brand-light")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[1.25rem] font-semibold">{step.title}</h3>
              <p className="max-w-sm text-[0.9375rem] text-fg-3">{step.text}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export const clientJourney: Step[] = [
  { title: "Free consultation", text: "Check your score and walk through your goals with our team." },
  { title: "Optimize credit", text: "Dispute what shouldn’t be there. Build what should." },
  { title: "Structure the business", text: "Entity, EIN, address and banking set up for fundability." },
  { title: "Access funding", text: "Apply for 0% intro-APR cards and lines of credit in the right sequence." },
  { title: "Protect & grow", text: "Life insurance and annuities to secure what you’ve built." },
];
