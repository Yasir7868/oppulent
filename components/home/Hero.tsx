import type { CSSProperties } from "react";
import { Mark } from "@/components/brand/Logo";
import { GhostButton, PrimaryButton } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Atmosphere } from "@/components/visuals/Atmosphere";
import { ChecklistCard, GlassPanel, MetalCard, StatusChip } from "@/components/visuals/Cards";
import { ScoreGauge } from "@/components/visuals/ScoreGauge";

const delay = (s: number) => ({ animationDelay: `${s}s` }) as CSSProperties;

const trust: { icon: IconName; label: string }[] = [
  { icon: "shield", label: "FCRA · FDCPA · TILA disputes" },
  { icon: "user", label: "Founder-led consulting" },
  { icon: "lock", label: "Encrypted, never stored" },
];

const factors = [
  { label: "Payment history", width: "92%", weight: "35%", delay: 1.3 },
  { label: "Utilization", width: "58%", weight: "30%", delay: 1.45 },
  { label: "Credit age", width: "70%", weight: "15%", delay: 1.6 },
];

const ticker = [
  "Credit Repair",
  "Credit Building",
  "Business Funding",
  "Entity Structuring",
  "Inner Circle",
  "Life Insurance",
  "Annuities",
  "Healthcare Funding",
  "Real Estate Funding",
];

function HeroCopy() {
  return (
    <div className="@container flex flex-col gap-7">
      <div
        className="rise inline-flex items-center gap-3 self-start rounded-full border border-[rgba(92,200,255,0.28)] bg-[rgba(31,123,255,0.08)] py-2 pr-4 pl-2.5 font-tech text-[length:min(0.625rem,calc((100cqi_-_3rem)/27.6))] tracking-[0.16em] whitespace-nowrap text-cyan-pale sm:text-[0.656rem] sm:tracking-[0.22em]"
        style={delay(0.1)}
      >
        <span className="pulse-dot size-2 rounded-full bg-cyan" />
        CREDIT · FUNDING · PROTECTION
      </div>

      <h1 id="hero-title" className="t-hero">
        <span className="block whitespace-nowrap">
          {["Turn", "your", "credit"].map((w, i) => (
            <span key={w}>
              <span className="rise-word" style={delay(0.2 + i * 0.1)}>
                {w}
              </span>{" "}
            </span>
          ))}
        </span>
        <span className="block whitespace-nowrap">
          <span className="rise-word" style={delay(0.55)}>
            into
          </span>{" "}
          <span className="rise-word relative" style={delay(0.7)}>
            <span className="shimmer-text">capital.</span>
            <svg
              viewBox="0 0 300 24"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute -bottom-3.5 left-[2%] h-[18px] w-[94%] overflow-visible"
            >
              <path
                className="draw"
                d="M2 20 C 90 6, 200 2, 298 4"
                fill="none"
                stroke="#3D95FF"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ animationDelay: "1.3s", animationDuration: "1.2s", filter: "drop-shadow(0 0 6px #2F8CFF)" }}
              />
            </svg>
          </span>
        </span>
      </h1>

      <p className="rise t-lead max-w-[34rem]" style={delay(0.9)}>
        We repair and build credit using consumer-protection law, structure your business to be fundable, and help you
        access 0% intro-APR business credit — then protect what you build.
      </p>

      <div className="rise flex flex-col gap-3.5 sm:flex-row sm:flex-wrap" style={delay(1.05)}>
        <PrimaryButton href="/contact" icon="arrowRight" stretch>
          Book a Free Consultation
        </PrimaryButton>
        <GhostButton href="#score" icon="gauge" stretch className="backdrop-blur-[10px]">
          Check Your Credit Score
        </GhostButton>
      </div>

      <ul
        className="rise grid gap-x-6 gap-y-2.5 pt-1 text-[0.84rem] text-fg-4 xs:flex xs:flex-wrap"
        style={delay(1.2)}
      >
        {trust.map((t) => (
          <li key={t.label} className="flex items-center gap-2">
            <Icon name={t.icon} size={16} className="flex-none text-brand-light" />
            {t.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function HeroStage() {
  return (
    <div
      role="img"
      aria-label="Illustrative dashboard: a sample credit score of 712 rising, a business card, and a funding-readiness checklist"
      className="relative mx-auto w-full max-w-[27.5rem] lg:min-h-[650px] lg:max-w-none"
    >
      <div
        className="breathe pointer-events-none absolute top-1/2 left-1/2 w-[min(560px,120%)] opacity-25 blur-[26px]"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <Mark className="w-full" sizes="560px" />
      </div>

      <div className="relative pt-[5.25rem] pb-6 max-lg:animate-[of-rise_1.1s_var(--ease-out-expo)_.7s_both] lg:absolute lg:inset-0 lg:p-0 lg:[transform-style:preserve-3d] lg:[transform:perspective(1600px)_rotateY(-9deg)_rotateX(4deg)] lg:animate-[of-stage-in_1.6s_var(--ease-out-expo)_.35s_both]">
        {/* Score card */}
        <div className="float-1 relative z-[2] lg:absolute lg:top-[70px] lg:right-0 lg:w-[min(410px,86%)]">
          <GlassPanel className="px-5 pt-6 pb-6 sm:px-7 sm:pb-7">
            <div className="flex items-center justify-between">
              <span className="tag text-fg-3">Credit score</span>
              <span className="rounded border border-line-5 px-2 py-0.5 font-tech text-[0.5625rem] tracking-[0.18em] text-fg-4">
                SAMPLE
              </span>
            </div>
            <ScoreGauge score={712} rating="Good" gradientId="hero-gauge" className="mt-2.5" />
            <div className="mt-[18px] flex flex-col gap-3 text-[0.8125rem]">
              {factors.map((f) => (
                <div key={f.label} className="grid grid-cols-[6.5rem_1fr_2.4rem] items-center gap-3">
                  <span className="text-fg-3">{f.label}</span>
                  <div className="h-1.5 rounded-sm bg-line-2">
                    <div
                      className="bar-fill h-1.5 rounded-sm bg-[linear-gradient(90deg,#1565E6,#5CC8FF)]"
                      style={{ width: f.width, animationDelay: `${f.delay}s` }}
                    />
                  </div>
                  <span className="text-right text-fg-2">{f.weight}</span>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>

        {/* Metal business card */}
        <div className="float-2 absolute top-1.5 right-3.5 z-[1] w-[56%] lg:top-0 lg:right-auto lg:left-0 lg:z-[3] lg:w-[min(310px,66%)]">
          <MetalCard className="-rotate-[10deg]" />
        </div>

        {/* Funding readiness */}
        <div className="float-3 absolute bottom-0 left-[4%] z-[4] hidden w-[min(330px,78%)] lg:block">
          <ChecklistCard
            title="Funding readiness"
            items={[
              { label: "LLC formed & EIN issued", state: "done" },
              { label: "Business bank account", state: "done" },
              { label: "Personal profile optimized", state: "done" },
              { label: "0% intro-APR applications", state: "active" },
            ]}
          />
        </div>

        {/* Dispute chip */}
        <div className="float-1 absolute bottom-0 left-4 z-[5] lg:right-[2%] lg:bottom-24 lg:left-auto" style={delay(-2.4)}>
          <StatusChip>Dispute sent · FCRA §611</StatusChip>
        </div>
      </div>
    </div>
  );
}

function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="relative z-[2] overflow-hidden border-t border-[rgba(120,160,230,0.12)] bg-[rgba(5,10,20,0.6)] [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
    >
      <div className="marquee-track flex w-max py-[1.125rem] sm:py-[1.375rem]">
        {[...ticker, ...ticker].map((t, i) => (
          <div
            key={`${t}-${i}`}
            className="flex items-center gap-7 pr-7 font-tech text-[0.6875rem] tracking-[0.22em] whitespace-nowrap text-fg-4 uppercase sm:text-xs"
          >
            <span>{t}</span>
            <span className="h-1.5 w-[18px] bg-brand-bright shadow-[0_0_8px_#2F8CFF] [clip-path:polygon(30%_0,100%_0,70%_100%,0_100%)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative -mt-[var(--header-h)] overflow-hidden border-b border-line-1 bg-ink-1 pt-[var(--header-h)]"
    >
      <Atmosphere curves stars beam />
      <div className="container-x relative z-[2] grid items-center gap-12 pt-8 pb-14 sm:pt-12 sm:pb-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14 lg:pt-16 lg:pb-28">
        <HeroCopy />
        <HeroStage />
      </div>
      <Marquee />
    </section>
  );
}
