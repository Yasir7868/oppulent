import { ChecklistCard, MetalCard } from "./Cards";

/** Layered card composition used beside readiness checklists. */
export function ProfileStack({ variant }: { variant: "funding" | "entity" }) {
  const items =
    variant === "funding"
      ? [
          { label: "LLC formed & EIN issued", state: "done" as const },
          { label: "Business bank account", state: "done" as const },
          { label: "Personal profile optimized", state: "done" as const },
          { label: "0% intro-APR applications", state: "active" as const },
        ]
      : [
          { label: "Entity filed with the state", state: "done" as const },
          { label: "EIN issued", state: "done" as const },
          { label: "Address matches everywhere", state: "done" as const },
          { label: "Business bank account", state: "done" as const },
          { label: "Business credit file", state: "active" as const },
        ];

  return (
    <div
      role="img"
      aria-label={
        variant === "funding"
          ? "Illustration: a funding-readiness checklist beside a business credit card"
          : "Illustration: a business profile checklist beside a business credit card"
      }
      className="relative mx-auto w-full max-w-[26rem] pt-24 pb-4 sm:pt-28"
    >
      <div className="float-2 absolute top-0 right-0 w-[64%]">
        <MetalCard className="rotate-[8deg]" footnote={variant === "funding" ? "0% INTRO APR" : "EIN · VERIFIED"} />
      </div>
      <div className="float-1 relative z-[2] w-[88%]">
        <ChecklistCard title={variant === "funding" ? "Funding readiness" : "Business profile"} items={items} startDelay={0.4} />
      </div>
    </div>
  );
}
