import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Mark } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";

/** The brushed-metal business card from the home hero. */
export function MetalCard({ className, label = "BUSINESS", footnote = "0% INTRO APR" }: { className?: string; label?: string; footnote?: string }) {
  return (
    <div className={cn("@container", className)}>
      {/* Everything inside scales with the card's own width (310px is the design size). */}
      <div
        className={cn(
          "relative flex aspect-[1.586] flex-col justify-between overflow-hidden rounded-[5.8cqi] border border-[rgba(160,200,255,0.35)] px-[7cqi] py-[6.5cqi]",
          "bg-[linear-gradient(135deg,#2A4E8F_0%,#12254A_38%,#070E1E_72%,#1B3566_100%)]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_30px_70px_rgba(0,0,0,0.6),0_0_50px_rgba(31,123,255,0.25)]",
        )}
      >
        <div className="sheen pointer-events-none absolute -inset-y-[20%] left-0 w-[45%] bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.22),rgba(255,255,255,0))]" />
        <div className="relative flex items-start justify-between">
          <Mark className="w-[20.5cqi]" sizes="64px" />
          <span className="font-tech text-[2.75cqi] tracking-[0.24em] text-fg-2">{label}</span>
        </div>
        <div className="relative h-[9.7cqi] w-[13cqi] rounded-[2cqi] bg-[linear-gradient(135deg,#E9EEF5,#9AA8BF_55%,#DDE4EE)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)]" />
        <div className="relative flex items-end justify-between gap-2 whitespace-nowrap">
          <span className="font-tech text-[3.55cqi] tracking-[0.16em] text-fg">OPULENT</span>
          <span className="font-tech text-[2.75cqi] tracking-[0.14em] text-cyan-light">{footnote}</span>
        </div>
      </div>
    </div>
  );
}

export type ChecklistItem = { label: string; state: "done" | "active" };

/** "Funding readiness" checklist card with ticks that pop in sequence. */
export function ChecklistCard({
  title,
  items,
  className,
  startDelay = 1.6,
}: {
  title: string;
  items: ChecklistItem[];
  className?: string;
  startDelay?: number;
}) {
  return (
    <div
      className={cn(
        "rounded-[18px] border border-[rgba(120,170,255,0.22)] px-6 py-[22px] backdrop-blur-[16px]",
        "bg-[linear-gradient(160deg,rgba(16,30,58,0.86),rgba(7,13,26,0.9))]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_30px_70px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      <div className="tag text-fg-3">{title}</div>
      <ul className="mt-3.5 flex flex-col gap-[11px] text-sm">
        {items.map((item, i) => (
          <li key={item.label} className={cn("flex items-center gap-2.5", item.state === "active" && "text-fg-2")}>
            {item.state === "done" ? (
              <span
                className="pop grid size-[22px] flex-none place-items-center rounded-full bg-[rgba(61,149,255,0.2)] text-cyan-light"
                style={{ animationDelay: `${startDelay + i * 0.3}s` }}
              >
                <Icon name="check" size={13} strokeWidth={3} />
              </span>
            ) : (
              <span className="spin size-[22px] flex-none rounded-full border-2 border-[#1E3358] border-t-cyan" />
            )}
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Glassy panel used for floating UI in hero compositions. */
export function GlassPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[22px] border border-[rgba(120,170,255,0.24)] backdrop-blur-[18px]",
        "bg-[linear-gradient(160deg,rgba(20,38,72,0.78),rgba(9,17,34,0.82))]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_40px_90px_rgba(0,0,0,0.6),0_0_70px_rgba(31,123,255,0.22)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Small pill with a pulsing dot, e.g. "Dispute sent · FCRA §611". */
export function StatusChip({ children, className, delay = "2.5s" }: { children: ReactNode; className?: string; delay?: string }) {
  return (
    <div
      className={cn(
        "pop inline-flex items-center gap-2.5 rounded-full border border-[rgba(92,200,255,0.35)] bg-[rgba(12,22,42,0.88)] px-4 py-2.5 text-[0.8125rem] font-semibold whitespace-nowrap",
        "shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_24px_rgba(47,140,255,0.25)]",
        className,
      )}
      style={{ animationDelay: delay }}
    >
      <span className="pulse-dot size-2 rounded-full bg-cyan" />
      {children}
    </div>
  );
}
