import { cn } from "@/lib/cn";

type Props = {
  /** Where the grid's visible window is centred, as a CSS position. */
  gridAt?: string;
  /** Draw the sweeping light curves from the home hero. */
  curves?: boolean;
  stars?: boolean;
  beam?: boolean;
  className?: string;
};

const stars = [
  { top: "18%", left: "54%", size: 3, delay: "0s" },
  { top: "34%", left: "92%", size: 2, delay: "-1.2s" },
  { top: "72%", left: "48%", size: 3, delay: "-2.1s" },
  { top: "12%", left: "22%", size: 2, delay: "-0.6s" },
  { top: "58%", left: "8%", size: 2, delay: "-2.8s" },
  { top: "86%", left: "78%", size: 3, delay: "-1.7s" },
];

/** Layered hero background: drifting light, a panning grid, a sweeping beam and light trails. */
export function Atmosphere({ gridAt = "68% 35%", curves = false, stars: showStars = false, beam = false, className }: Props) {
  const mask = `radial-gradient(65% 75% at ${gridAt}, #000 25%, transparent 75%)`;
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="orb-a absolute -top-64 -right-40 h-[820px] w-[980px] rounded-full bg-[radial-gradient(closest-side,rgba(31,123,255,0.42),rgba(31,123,255,0))] blur-[30px] max-sm:-right-[28rem] max-sm:h-[620px]" />
      <div className="orb-b absolute -bottom-80 -left-52 h-[700px] w-[860px] rounded-full bg-[radial-gradient(closest-side,rgba(92,200,255,0.16),rgba(92,200,255,0))] blur-[40px]" />
      <div className="absolute inset-0 overflow-hidden" style={{ maskImage: mask, WebkitMaskImage: mask }}>
        <div className="grid-pan" />
      </div>
      {beam ? (
        <div className="beam absolute -top-52 left-0 h-[1400px] w-[140px] bg-[linear-gradient(90deg,rgba(92,200,255,0),rgba(92,200,255,0.1),rgba(255,255,255,0.14),rgba(92,200,255,0.1),rgba(92,200,255,0))] blur-[6px]" />
      ) : null}
      {curves ? (
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path
            className="draw"
            d="M-60 860 C 380 850, 880 700, 1500 260"
            fill="none"
            stroke="#2F8CFF"
            strokeWidth="2.5"
            opacity="0.85"
            style={{ filter: "drop-shadow(0 0 8px #2F8CFF)" }}
          />
          <path
            className="draw"
            d="M-60 900 C 420 885, 920 745, 1500 330"
            fill="none"
            stroke="#5CC8FF"
            strokeWidth="1.2"
            opacity="0.5"
            style={{ animationDelay: "0.75s" }}
          />
          <path
            className="comet"
            d="M-60 860 C 380 850, 880 700, 1500 260"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 10px #5CC8FF) drop-shadow(0 0 4px #FFFFFF)" }}
          />
        </svg>
      ) : null}
      {showStars
        ? stars.map((s) => (
            <span
              key={`${s.top}-${s.left}`}
              className="twinkle absolute rounded-full bg-[#CFE6FF] shadow-[0_0_8px_#5CC8FF]"
              style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }}
            />
          ))
        : null}
    </div>
  );
}
