import Image from "next/image";
import { Mark } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/**
 * Founder portrait frame. Pass `src` once a headshot is supplied; until then it renders an
 * art-directed monogram composition rather than an empty placeholder.
 */
export function FounderPortrait({ src, className }: { src?: string; className?: string }) {
  return (
    <div className={cn("frame-glow relative w-full rounded-[26px] p-px", className)}>
      <div className="relative h-full w-full overflow-hidden rounded-[25px] bg-[linear-gradient(160deg,#13284F,#0A1326)]">
        {src ? (
          <Image
            src={src}
            alt={`${site.founder.name}, ${site.founder.title}`}
            fill
            sizes="(min-width: 1024px) 480px, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <div aria-hidden="true" className="absolute inset-0">
            <div className="orb-a absolute -inset-x-[20%] -bottom-[30%] h-[70%] bg-[radial-gradient(closest-side,rgba(47,140,255,0.4),rgba(0,0,0,0))]" />
            {[88, 66, 44].map((size, i) => (
              <span
                key={size}
                className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                style={{
                  width: `${size}%`,
                  aspectRatio: "1",
                  borderColor: `rgba(92,200,255,${0.1 + i * 0.08})`,
                }}
              />
            ))}
            <div className="absolute top-[44%] left-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2">
              <Mark className="w-full drop-shadow-[0_0_30px_rgba(47,140,255,0.55)]" sizes="240px" />
            </div>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-[linear-gradient(0deg,rgba(4,7,14,0.92),rgba(4,7,14,0))] p-5 pt-16 sm:p-6 sm:pt-20">
          <span className="font-tech text-[0.7rem] tracking-[0.16em] text-fg sm:text-xs">LEONARD ALI-PERMELL</span>
          <span className="font-tech text-[0.55rem] tracking-[0.3em] text-cyan">FOUNDER &amp; PRESIDENT</span>
        </div>
      </div>
    </div>
  );
}
