import Link from "next/link";
import type { CaseStudy } from "@/lib/results";
import { Icon } from "@/components/ui/Icon";

function ServiceTag({ children }: { children: string }) {
  return (
    <span className="self-start rounded-full border border-line-5 px-2.5 py-1 text-xs font-bold text-cyan">{children}</span>
  );
}

const cardBase =
  "card-lift spotlight reveal flex h-full flex-col rounded-[20px] border border-line-3 bg-[linear-gradient(170deg,#0D182E,#0A1224)]";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  if (study.kind === "video") {
    return (
      <article className={`${cardBase} gap-4 overflow-hidden`}>
        <div className="relative grid aspect-video place-items-center bg-[radial-gradient(300px_200px_at_70%_30%,rgba(31,123,255,0.3),rgba(0,0,0,0)),linear-gradient(135deg,#12244A,#0A1326)]">
          <Icon name="quote" size={120} strokeWidth={0.8} className="absolute top-3 left-4 text-[rgba(143,224,255,0.12)]" />
          <span
            aria-hidden="true"
            className="pulse-dot grid size-16 place-items-center rounded-full border border-[rgba(238,242,248,0.35)] bg-[rgba(238,242,248,0.14)] backdrop-blur-[6px]"
          >
            <Icon name="play" size={22} className="ml-1 text-fg" />
          </span>
          <span className="absolute bottom-3 left-3.5 text-xs text-fg-2">{study.caption}</span>
        </div>
        <div className="flex flex-col gap-2 px-6 pb-7 sm:px-8 sm:pb-8">
          <ServiceTag>{study.service}</ServiceTag>
          <p className="text-[0.9375rem] text-fg-2">{study.story}</p>
          <Link href="/inner-circle" className="link-arrow mt-auto text-sm">
            See the Inner Circle
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className={`${cardBase} gap-5 p-6 sm:p-8`}>
      <ServiceTag>{study.service}</ServiceTag>
      {study.kind === "score" ? (
        <div className="flex items-center gap-3 font-display sm:gap-4">
          <div>
            <div className="font-sans text-xs text-fg-3">Before</div>
            <div className="text-[1.875rem] font-semibold text-fg-3 sm:text-[2.375rem]">{study.before}</div>
          </div>
          <svg viewBox="0 0 40 12" aria-hidden="true" className="h-3 w-7 flex-none text-brand-light sm:w-10">
            <path d="M0 6h36M30 1l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <div>
            <div className="font-sans text-xs text-fg-3">After</div>
            <div className="text-[1.875rem] font-semibold sm:text-[2.375rem]">{study.after}</div>
          </div>
        </div>
      ) : (
        <div className="font-display">
          <div className="font-sans text-xs text-fg-3">Funding secured</div>
          <div className="text-[1.875rem] font-semibold sm:text-[2.375rem]">{study.amount}</div>
        </div>
      )}
      <p className="text-[0.9375rem] text-fg-2">{study.story}</p>
      <div className="mt-auto text-[0.8125rem] text-fg-4">{study.meta}</div>
    </article>
  );
}
