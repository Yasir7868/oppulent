import { Mark } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/** The Inner Circle member card with a light tracing its edge. */
export function MembershipCard({ className, animateIn = true }: { className?: string; animateIn?: boolean }) {
  return (
    <div
      role="img"
      aria-label="Inner Circle membership card"
      className={cn(
        "ring-conic relative flex aspect-[1.586] w-full flex-col justify-between overflow-hidden rounded-[22px] p-[7%]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_40px_90px_rgba(0,0,0,0.6),0_0_80px_rgba(31,123,255,0.35)]",
        "[--ring-fill:linear-gradient(135deg,#1E3E78_0%,#0E1C3C_45%,#060B18_80%,#13295A_100%)]",
        className,
      )}
      style={
        animateIn
          ? {
              transform: "perspective(1400px) rotateY(-12deg) rotateX(6deg) rotate(-4deg)",
              animation:
                "of-card-in 1.6s cubic-bezier(.2,.8,.2,1) .35s both, of-rotate-angle 6s linear infinite",
            }
          : undefined
      }
    >
      <div className="sheen pointer-events-none absolute -inset-y-[20%] left-0 w-[40%] bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.2),rgba(255,255,255,0))]" />
      <div className="relative flex items-start justify-between">
        <Mark className="w-[22%] min-w-14" sizes="120px" />
        <span className="font-tech text-[0.625rem] tracking-[0.24em] text-fg-2">MEMBER</span>
      </div>
      <div className="relative flex items-end justify-between gap-3">
        <div>
          <div className="font-tech text-[clamp(0.85rem,3.6vw,1.125rem)] tracking-[0.16em]">INNER CIRCLE</div>
          <div className="mt-1.5 font-tech text-[0.5rem] tracking-[0.5em] text-cyan sm:text-[0.5625rem]">OPULENT FINANCIAL</div>
        </div>
        <div className="font-display text-[clamp(1.6rem,6vw,2.125rem)] font-semibold">{site.innerCircle.price}</div>
      </div>
    </div>
  );
}
