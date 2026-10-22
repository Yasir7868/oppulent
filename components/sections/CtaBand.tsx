import type { ReactNode } from "react";
import { Mark } from "@/components/brand/Logo";
import { GhostButton, PrimaryButton } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Action = { label: string; href: string };

/** The closing call-to-action panel: glow, a passing comet, one decisive action. */
export function CtaBand({
  id,
  title,
  text,
  primary,
  secondary,
  showMark = false,
  children,
  className,
}: {
  id?: string;
  title: ReactNode;
  text?: ReactNode;
  primary?: Action;
  secondary?: Action;
  showMark?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("pb-18 sm:pb-24 lg:pb-32", className)}>
      <div className="container-x">
        <div className="reveal relative flex flex-col items-center gap-5 overflow-hidden rounded-[22px] border border-line-4 bg-ink-4 px-4 py-14 text-center sm:rounded-[28px] sm:px-12 sm:py-20 lg:py-[5.5rem]">
          <div
            aria-hidden="true"
            className="orb-a pointer-events-none absolute -top-64 left-1/2 -ml-[450px] h-[520px] w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(47,140,255,0.45),rgba(0,0,0,0))]"
          />
          <svg
            viewBox="0 0 1280 400"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <path
              className="comet"
              d="M-40 380 C 360 360, 820 260, 1320 20"
              fill="none"
              stroke="#8FE0FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 8px #5CC8FF)" }}
            />
          </svg>
          {showMark ? <Mark className="relative w-24 sm:w-[120px]" sizes="120px" /> : null}
          <h2 id={headingId} className="relative t-cta max-w-[52rem]">
            {title}
          </h2>
          {text ? <p className="relative t-lead max-w-[35rem]">{text}</p> : null}
          {primary || secondary ? (
            <div className="relative mt-2 flex w-full flex-col justify-center gap-3.5 sm:w-auto sm:flex-row sm:flex-wrap">
              {primary ? (
                <PrimaryButton href={primary.href} stretch>
                  {primary.label}
                </PrimaryButton>
              ) : null}
              {secondary ? (
                <GhostButton href={secondary.href} stretch>
                  {secondary.label}
                </GhostButton>
              ) : null}
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
