import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

const ARC = "M30 150 A120 120 0 0 1 270 150";
const ARC_LENGTH = 377;
const MIN = 300;
const MAX = 850;

type Props = {
  score: number;
  rating: string;
  /** Unique id for the SVG gradient. */
  gradientId: string;
  /** Delay before the fill animation starts, e.g. "1s". */
  delay?: string;
  thickness?: number;
  className?: string;
  ratingClassName?: string;
};

/**
 * Semicircular 300–850 credit-score gauge. The final state lives in inline styles; CSS keyframes
 * only describe where the animation starts, so reduced-motion users see the finished gauge.
 */
export function ScoreGauge({
  score,
  rating,
  gradientId,
  delay = "1s",
  thickness = 16,
  className,
  ratingClassName = "text-cyan",
}: Props) {
  const fraction = Math.min(1, Math.max(0, (score - MIN) / (MAX - MIN)));
  const offset = ARC_LENGTH * (1 - fraction);
  const rotation = 180 * fraction;
  const vars = { "--gauge-delay": delay } as CSSProperties;

  return (
    <div className={cn("@container mx-auto w-full max-w-[300px]", className)} style={vars}>
      <div className="relative">
      <svg viewBox="0 0 300 170" className="block w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0E4FC7" />
            <stop offset="0.6" stopColor="#2F8CFF" />
            <stop offset="1" stopColor="#8FE0FF" />
          </linearGradient>
        </defs>
        <path d={ARC} fill="none" stroke="#16223B" strokeWidth={thickness} strokeLinecap="round" />
        <path d={ARC} fill="none" stroke="#22355A" strokeWidth="1" strokeDasharray="2 10" />
        <path
          className="gauge-arc"
          d={ARC}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={ARC_LENGTH}
          style={{ strokeDashoffset: offset, filter: "drop-shadow(0 0 10px rgba(47,140,255,0.8))" }}
        />
        <g className="gauge-needle" style={{ transform: `rotate(${rotation}deg)` }}>
          <circle cx="30" cy="150" r="13" fill="rgba(143,224,255,0.25)" />
          <circle cx="30" cy="150" r="8" fill="#FFFFFF" stroke="#0B1426" strokeWidth="3" />
        </g>
      </svg>
      <div className="absolute inset-x-0 top-[41%] text-center">
        <div className="font-display text-[clamp(2.4rem,20cqi,3.9rem)] leading-none font-semibold tracking-[-0.03em] tabular-nums">
          <span className="gauge-count" style={{ "--of-n": score } as CSSProperties} aria-hidden="true" />
          <span className="sr-only">{score}</span>
        </div>
        <div className={cn("mt-2 text-[0.78rem] font-bold tracking-[0.12em] uppercase", ratingClassName)}>{rating}</div>
      </div>
      </div>
      <div className="flex justify-between px-4 pt-0.5 text-xs text-fg-5">
        <span>{MIN}</span>
        <span>{MAX}</span>
      </div>
    </div>
  );
}
