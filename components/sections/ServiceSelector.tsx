"use client";

import { Fragment, useState } from "react";
import { selectorGoals, type Goal, type GoalId } from "@/lib/goals";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { GhostButton, PrimaryButton } from "@/components/ui/Button";

function Recommendation({ goal, compact = false }: { goal: Goal; compact?: boolean }) {
  return (
    <div className="frame-glow">
      <div
        key={goal.id}
        className={cn(
          "frame-glow-inner step-in flex flex-col gap-5 bg-[radial-gradient(460px_280px_at_100%_0%,rgba(31,123,255,0.24),rgba(0,0,0,0)_70%),#0A1325]",
          compact ? "p-6" : "min-h-[440px] p-10",
        )}
      >
        <span className="tag text-fg-3">We recommend</span>
        <div className="flex flex-col gap-1.5">
          <span className="text-[0.8125rem] font-bold tracking-[0.04em] text-brand-light">{goal.group}</span>
          <h3 className={cn("font-display font-semibold tracking-[-0.02em] leading-[1.1]", compact ? "text-[1.75rem]" : "text-[2.375rem]")}>
            {goal.title}
          </h3>
        </div>
        <p className={cn("text-fg-2 text-pretty", compact ? "text-[0.975rem]" : "text-[1.0625rem] leading-[1.65]")}>
          {goal.description}
        </p>
        <div className="flex-1" />
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <PrimaryButton href={goal.href} size="md" className="min-h-[3.375rem]" stretch>
            {goal.cta}
          </PrimaryButton>
          <GhostButton href="/contact" size="md" className="min-h-[3.375rem] px-5" stretch>
            Not sure? Talk to us
          </GhostButton>
        </div>
      </div>
    </div>
  );
}

export function ServiceSelector() {
  const [selected, setSelected] = useState<GoalId>("repair");
  const current = selectorGoals.find((g) => g.id === selected) ?? selectorGoals[0]!;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-2">
      <div role="group" aria-label="Your goal" className="flex flex-col gap-2.5">
        {selectorGoals.map((goal, i) => {
          const on = goal.id === selected;
          return (
            <Fragment key={goal.id}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setSelected(goal.id)}
                className={cn(
                  "group flex min-h-[3.875rem] cursor-pointer items-center gap-4 rounded-xl border px-5 py-3.5 text-left text-[1.0313rem] font-semibold transition-[border-color,background-color,transform,box-shadow] duration-300",
                  on
                    ? "border-brand-light bg-[linear-gradient(90deg,rgba(31,123,255,0.2),rgba(31,123,255,0.06))] shadow-[0_0_30px_rgba(31,123,255,0.18)]"
                    : "border-line-3 bg-ink-5 hover:border-brand-light lg:hover:translate-x-1.5",
                )}
              >
                <span className={cn("min-w-[22px] font-tech text-[0.6875rem] tracking-[0.1em]", on ? "text-cyan" : "text-fg-5")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{goal.prompt}</span>
                <Icon
                  name="chevronRight"
                  size={18}
                  className={cn(
                    "flex-none transition-transform duration-300",
                    on ? "text-cyan max-lg:rotate-90" : "text-fg-5",
                  )}
                />
              </button>
              {on ? (
                <div className="pb-2 lg:hidden">
                  <Recommendation goal={goal} compact />
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>
      <div aria-live="polite" className="sticky top-[calc(var(--header-h)+1.5rem)] hidden lg:block">
        <Recommendation goal={current} />
      </div>
    </div>
  );
}
