import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/** Illustrated Inner Circle live-class window. Purely decorative UI, no real member data. */
export function LiveClassWindow({ className }: { className?: string }) {
  return (
    <figure
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-line-4 bg-ink-4 shadow-[0_30px_80px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line-3 px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line-5" />
          <span className="size-2.5 rounded-full bg-line-5" />
          <span className="size-2.5 rounded-full bg-line-5" />
        </div>
        <span className="tag text-fg-4">Live class</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(92,200,255,0.12)] px-2.5 py-1 font-tech text-[0.55rem] tracking-[0.16em] text-cyan">
          <span className="pulse-dot size-1.5 rounded-full bg-cyan" />
          LIVE
        </span>
      </div>
      <div className="grid flex-1 gap-3 p-4 sm:grid-cols-[1.6fr_1fr]">
        <div className="relative flex min-h-36 flex-col justify-end overflow-hidden rounded-xl bg-[radial-gradient(240px_160px_at_80%_20%,rgba(31,123,255,0.35),rgba(0,0,0,0)),linear-gradient(135deg,#12244A,#0A1326)] p-4">
          <Icon name="gauge" size={40} strokeWidth={1.4} className="absolute top-4 right-4 text-cyan-light/70" />
          <span className="tag text-cyan">Module 01</span>
          <span className="mt-1 font-display text-lg font-semibold leading-tight">Building Business Credit</span>
        </div>
        <div className="flex flex-col gap-2 text-[0.8rem]">
          <span className="tag text-fg-5">Up next</span>
          {["Accessing Business Funding", "Q&A with our founder"].map((t) => (
            <span key={t} className="flex items-center gap-2 rounded-lg border border-line-3 bg-ink-5 px-3 py-2 text-fg-2">
              <Icon name="clock" size={14} className="flex-none text-brand-light" />
              {t}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="flex items-center justify-between gap-3 border-t border-line-3 px-4 py-3 text-xs text-fg-4">
        <span className="flex -space-x-2" aria-hidden="true">
          {["#2F8CFF", "#5CC8FF", "#1565E6", "#8FE0FF", "#0E4FC7"].map((c) => (
            <span
              key={c}
              className="size-7 rounded-full border-2 border-ink-4"
              style={{ background: `linear-gradient(140deg, ${c}, #0A1326)` }}
            />
          ))}
        </span>
        <span>Illustration of a live class</span>
      </figcaption>
    </figure>
  );
}
