import type { Metadata } from "next";
import { InnerCircleBanner } from "@/components/home/InnerCircleBanner";
import { ArticleBrowser } from "@/components/sections/ArticleBrowser";
import { Breadcrumbs, PageDisclosure, PageHero, Section } from "@/components/sections/PageHero";
import { articles } from "@/lib/articles";
import { delay } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Education Hub — Learn How Lenders Think",
  description:
    "Plain-language guides to credit scores, business credit and 0% intro-APR funding from Opulent Financial.",
  alternates: { canonical: "/education" },
};

export default function EducationPage() {
  return (
    <>
      <PageHero labelledBy="education-title" gridAt="70% 30%">
        <div className="flex max-w-[50rem] flex-col gap-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Education Hub" }]} />
          <span className="rise eyebrow text-cyan" style={delay(0.1)}>
            Education Hub
          </span>
          <h1 id="education-title" className="rise t-display" style={delay(0.2)}>
            Learn how <span className="shimmer-text">lenders think.</span>
          </h1>
          <p className="rise t-lead max-w-[34rem]" style={delay(0.35)}>
            Plain-language guides to credit, business credit and funding — so every decision you make is an informed one.
          </p>
        </div>
      </PageHero>

      <Section label="Articles">
        <ArticleBrowser articles={articles} />
      </Section>

      <div className="border-t border-line-1">
        <InnerCircleBanner />
      </div>

      <PageDisclosure>Articles are for general education and aren’t legal, tax or financial advice.</PageDisclosure>
    </>
  );
}
