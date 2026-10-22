import Link from "next/link";
import { Mark } from "@/components/brand/Logo";
import { PrimaryButton } from "@/components/ui/Button";
import { liveClasses } from "@/lib/inner-circle";
import { site } from "@/lib/site";

const tiles = [...liveClasses.map((t) => ({ tag: "Live", title: t })), { tag: "Exclusive", title: "Q&A with our founder" }];

export function InnerCircleBanner() {
  return (
    <section aria-labelledby="ic-banner-title" className="section-y">
      <div className="container-x">
        <div className="ring-conic relative overflow-hidden rounded-[22px] px-4 py-11 [--ring-fill:radial-gradient(640px_420px_at_100%_0%,rgba(92,200,255,0.18),rgba(0,0,0,0)_70%),linear-gradient(135deg,#0D2049,#081228_60%)] sm:rounded-[28px] sm:p-12 lg:p-[68px]">
          <div className="float-2 pointer-events-none absolute -right-16 -bottom-[70px] w-[340px] opacity-[0.12] sm:w-[540px]">
            <Mark className="w-full" sizes="540px" />
          </div>
          <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col gap-[22px]">
              <span className="eyebrow text-cyan">The Inner Circle</span>
              <h2 id="ic-banner-title" className="t-h2">
                Join the Inner Circle.
              </h2>
              <p className="max-w-[34rem] text-[1.0625rem] text-fg-2 sm:text-lg">
                Live classes, exclusive Q&amp;A with our founder, and a community of entrepreneurs building credit and
                funding.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                <PrimaryButton href="/inner-circle" stretch>
                  Join the Inner Circle — {site.innerCircle.price}
                </PrimaryButton>
                <Link
                  href="/inner-circle#curriculum"
                  className="inline-flex min-h-11 items-center justify-center font-semibold text-fg-2 transition-colors hover:text-white"
                >
                  See the curriculum
                </Link>
              </div>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
              {tiles.map((t) => (
                <li
                  key={t.title}
                  className="card-lift flex items-baseline gap-4 rounded-[14px] border border-line-5 bg-[rgba(4,7,14,0.5)] px-4 py-3.5 sm:block sm:p-[22px]"
                >
                  <div className="tag w-[5.75rem] flex-none text-cyan sm:w-auto">{t.tag}</div>
                  <div className="leading-snug font-bold sm:mt-2">{t.title}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
