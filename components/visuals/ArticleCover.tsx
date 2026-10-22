import type { ArticleCategory } from "@/lib/articles";
import { cn } from "@/lib/cn";

/** Generative cover art per article category, so covers never depend on missing photography. */
export function ArticleCover({ category, id, className }: { category: ArticleCategory; id: string; className?: string }) {
  const g = `cover-${id}`;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative aspect-video overflow-hidden bg-[linear-gradient(135deg,#10224A,#0A1326)]",
        className,
      )}
    >
      <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`${g}-a`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0E4FC7" />
            <stop offset="0.6" stopColor="#2F8CFF" />
            <stop offset="1" stopColor="#8FE0FF" />
          </linearGradient>
          <radialGradient id={`${g}-glow`} cx="0.75" cy="0.25" r="0.7">
            <stop offset="0" stopColor="rgba(31,123,255,0.45)" />
            <stop offset="1" stopColor="rgba(31,123,255,0)" />
          </radialGradient>
          <pattern id={`${g}-grid`} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" fill="none" stroke="rgba(130,170,240,0.08)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="320" height="180" fill={`url(#${g}-grid)`} />
        <rect width="320" height="180" fill={`url(#${g}-glow)`} />

        {category === "credit" ? (
          <g transform="translate(200 150)">
            {[104, 82, 60].map((r, i) => (
              <path
                key={r}
                d={`M${-r} 0 A${r} ${r} 0 0 1 ${r} 0`}
                fill="none"
                stroke={i === 0 ? `url(#${g}-a)` : "rgba(92,200,255,0.25)"}
                strokeWidth={i === 0 ? 10 : 1.5}
                strokeLinecap="round"
                strokeDasharray={i === 0 ? "250 400" : i === 1 ? "3 7" : undefined}
              />
            ))}
            <line x1="0" y1="0" x2="58" y2="-58" stroke="#EEF2F8" strokeWidth="3" strokeLinecap="round" />
            <circle r="7" fill="#EEF2F8" />
            <circle r="16" fill="rgba(143,224,255,0.18)" />
          </g>
        ) : null}

        {category === "business-credit" ? (
          <g>
            {[
              { x: 150, h: 70 },
              { x: 186, h: 104 },
              { x: 222, h: 132 },
              { x: 258, h: 88 },
            ].map((b, i) => (
              <g key={b.x}>
                <rect
                  x={b.x}
                  y={170 - b.h}
                  width="28"
                  height={b.h}
                  rx="3"
                  fill={i === 2 ? `url(#${g}-a)` : "rgba(47,140,255,0.18)"}
                  stroke="rgba(143,224,255,0.35)"
                />
                {Array.from({ length: Math.floor(b.h / 22) }).map((_, j) => (
                  <rect
                    key={j}
                    x={b.x + 8}
                    y={176 - b.h + j * 22}
                    width="12"
                    height="8"
                    rx="1.5"
                    fill={i === 2 ? "rgba(255,255,255,0.55)" : "rgba(143,224,255,0.3)"}
                  />
                ))}
              </g>
            ))}
            <path d="M40 170H300" stroke="rgba(143,224,255,0.35)" />
          </g>
        ) : null}

        {category === "funding" ? (
          <g>
            {[40, 64, 52, 88, 76, 112, 136].map((h, i) => (
              <rect
                key={i}
                x={110 + i * 26}
                y={160 - h}
                width="14"
                height={h}
                rx="3"
                fill={i === 6 ? "#8FE0FF" : "rgba(47,140,255,0.28)"}
              />
            ))}
            <path
              d="M100 150 C 160 140, 210 110, 300 30"
              fill="none"
              stroke={`url(#${g}-a)`}
              strokeWidth="4"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 6px #2F8CFF)" }}
            />
            <circle cx="300" cy="30" r="6" fill="#EEF2F8" />
          </g>
        ) : null}
      </svg>
    </div>
  );
}
