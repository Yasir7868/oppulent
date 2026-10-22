import type { Metadata } from "next";
import { ScoreCheckFlow } from "@/components/forms/ScoreCheckFlow";
import { PageDisclosure, PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { delay } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Free Credit Score Check",
  description:
    "Check where you stand, see what’s driving your score, and book a free credit analysis with Opulent Financial.",
  alternates: { canonical: "/score-check" },
};

export default function ScoreCheckPage() {
  const intro = (
    <>
      <span className="rise eyebrow" style={delay(0.1)}>
        Free credit score check
      </span>
      <h1 id="score-check-title" className="rise t-title" style={delay(0.2)}>
        Know where you stand. Then <span className="shimmer-text">know what to do next.</span>
      </h1>
      <p className="rise t-lead max-w-[32.5rem]" style={delay(0.3)}>
        Check your score right here, see what’s driving it, and book a free credit analysis with our team.
      </p>
    </>
  );

  const notes = (
    <div className="flex max-w-[28.75rem] flex-col gap-2.5 text-sm text-fg-3">
      <p className="flex gap-2.5">
        <Icon name="lock" size={18} className="mt-0.5 flex-none text-brand-light" />
        Encrypted in transit. SSN and date of birth are never stored on our site or in form logs.
      </p>
      <p className="flex gap-2.5">
        <Icon name="shield" size={18} className="mt-0.5 flex-none text-brand-light" />
        We pull data only after you give FCRA authorization.
      </p>
    </div>
  );

  return (
    <>
      <PageHero labelledBy="score-check-title" gridAt="70% 20%" innerClassName="lg:pb-28">
        <ScoreCheckFlow intro={intro} notes={notes} />
      </PageHero>
      <PageDisclosure>[Credit-data provider disclosure.]</PageDisclosure>
    </>
  );
}
