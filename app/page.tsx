import type { Metadata } from "next";
import { HomeHero } from "@/components/home/Hero";
import { ServicesBento } from "@/components/home/ServicesBento";
import { ScoreTeaser } from "@/components/home/ScoreTeaser";
import { InnerCircleBanner } from "@/components/home/InnerCircleBanner";
import {
  EducationPreview,
  FounderIntro,
  HowItWorks,
  PartnerCards,
  ResultsPreview,
} from "@/components/home/HomeSections";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/sections/PageHero";
import { ServiceSelector } from "@/components/sections/ServiceSelector";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Opulent Financial — Turn your credit into capital" },
  description: site.description,
  alternates: { canonical: "/" },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/of-logo.png`,
  description: site.description,
  founder: { "@type": "Person", name: "Leonard Ali-Permell", jobTitle: site.founder.title },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, trusted object — serialized for search engines.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <HomeHero />

      <Section tone="alt" labelledBy="selector-title" className="border-t-0">
        <div className="flex flex-col gap-10 lg:gap-12">
          <SectionHeader
            id="selector-title"
            eyebrow="Start here"
            title="Which service is right for me?"
            lead="Pick the goal that sounds most like you. We’ll point you to the right place."
          />
          <ServiceSelector />
        </div>
      </Section>

      <ServicesBento />
      <ScoreTeaser />
      <InnerCircleBanner />
      <HowItWorks />
      <ResultsPreview />
      <FounderIntro />
      <EducationPreview />
      <PartnerCards />

      <CtaBand
        id="contact"
        title={
          <>
            Your next approval starts with <span className="shimmer-text">one conversation.</span>
          </>
        }
        text="Book a free consultation. We’ll review your profile and map the fastest honest path to your goals."
        primary={{ label: "Book a Free Consultation", href: "/contact" }}
        secondary={{ label: "Check Your Credit Score", href: "/score-check" }}
        className="pt-14 sm:pt-20"
      />
    </>
  );
}
