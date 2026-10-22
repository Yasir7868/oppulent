import { ScoreStartForm } from "@/components/forms/ScoreStartForm";

const steps = ["Your details", "Verify identity", "See your score"];

export function ScoreTeaser() {
  return (
    <section
      id="score"
      aria-labelledby="score-title"
      className="section-y relative overflow-hidden border-y border-line-1 bg-ink-3"
    >
      <div
        aria-hidden="true"
        className="orb-b pointer-events-none absolute -top-24 -left-52 h-[700px] w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(31,123,255,0.22),rgba(31,123,255,0))]"
      />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="reveal flex flex-col gap-6">
          <span className="eyebrow">Free credit score check</span>
          <h2 id="score-title" className="t-h2">
            Know your number in minutes — without leaving the site.
          </h2>
          <p className="t-lead max-w-[34rem]">
            See your score with a clear breakdown of what’s helping and what’s holding you back, then book a free credit
            analysis with our team.
          </p>

          {/* Compact stepper on phones, tiles from sm up */}
          <ol className="relative flex max-w-[32.5rem] justify-between sm:grid sm:grid-cols-3 sm:gap-3">
            <span aria-hidden="true" className="absolute top-[17px] right-[16%] left-[16%] h-px bg-line-4 sm:hidden" />
            {steps.map((s, i) => (
              <li
                key={s}
                className="relative flex w-1/3 flex-col items-center gap-2 text-center sm:w-auto sm:items-start sm:gap-1.5 sm:rounded-[14px] sm:border sm:border-line-3 sm:bg-ink-5 sm:p-4 sm:text-left"
              >
                <span className="grid size-[35px] place-items-center rounded-full border border-brand-light bg-ink-3 font-tech text-[0.625rem] text-brand-light sm:hidden">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="hidden font-tech text-[0.625rem] tracking-[0.14em] text-brand-light sm:block">
                  STEP {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.84rem] font-semibold sm:text-[0.9rem]">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="reveal frame-glow">
          <ScoreStartForm />
        </div>
      </div>
    </section>
  );
}
