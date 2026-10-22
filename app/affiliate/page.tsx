import type { Metadata } from "next";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { FormPage, NumberedList } from "@/components/sections/FormPage";
import { Section } from "@/components/sections/PageHero";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Affiliate Program — Refer Clients, Earn With Us",
  description:
    "Join the Opulent Financial affiliate program: for creators, coaches and professionals whose audience needs better credit and funding.",
  alternates: { canonical: "/affiliate" },
};

const audiences: { icon: IconName; title: string; text: string }[] = [
  { icon: "spark", title: "Creators", text: "Your audience asks how to build credit and fund their ideas." },
  { icon: "users", title: "Coaches", text: "Your clients’ next step depends on better credit or access to capital." },
  {
    icon: "briefcase",
    title: "Professionals",
    text: "Realtors, accountants and advisors whose clients need funding-ready profiles.",
  },
];

export default function AffiliatePage() {
  return (
    <>
      <FormPage
        titleId="affiliate-title"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Affiliate Program" },
        ]}
        eyebrow="Affiliate program"
        title={
          <>
            Refer clients. <span className="shimmer-text">Earn with us.</span>
          </>
        }
        lead="For creators, coaches and professionals whose audience needs better credit and funding."
        aside={
          <NumberedList
            items={[
              { title: "Apply", text: "Tell us about you and the people you serve." },
              { title: "Share", text: "Refer people who need credit, funding or protection help." },
              { title: "Earn", text: "[Commission structure — to be provided.]" },
            ]}
          />
        }
        formTitle="Apply to become an affiliate"
        form={
          <InquiryForm
            kind="affiliate"
            fields={[
              { name: "firstName", label: "First name", type: "text", autoComplete: "given-name", half: true },
              { name: "lastName", label: "Last name", type: "text", autoComplete: "family-name", half: true },
              { name: "email", label: "Email", type: "email", autoComplete: "email" },
              {
                name: "platform",
                label: "Main platform or website",
                type: "text",
                placeholder: "e.g. instagram.com/yourhandle",
                half: true,
              },
              {
                name: "audience",
                label: "Audience size",
                type: "select",
                placeholder: "Choose a range",
                half: true,
                options: [
                  { value: "under-1k", label: "Under 1,000" },
                  { value: "1k-10k", label: "1,000 – 10,000" },
                  { value: "10k-100k", label: "10,000 – 100,000" },
                  { value: "100k-plus", label: "100,000+" },
                  { value: "clients", label: "I refer clients directly" },
                ],
              },
              {
                name: "message",
                label: "Who do you serve?",
                type: "textarea",
                optional: true,
                placeholder: "Tell us about your audience or clients.",
              },
              {
                name: "consent",
                label: "I agree that Opulent Financial may contact me about the affiliate program.",
                type: "consent",
              },
            ]}
            submitLabel="Submit application"
            successTitle="Application received."
            successText="Thanks for applying — we’ll be in touch about next steps."
          />
        }
      />

      <Section labelledBy="audiences-title">
        <div className="flex flex-col gap-10">
          <SectionHeader id="audiences-title" eyebrow="Who it’s for" size="md" title="Built for people who help people." />
          <div className="grid gap-4 md:grid-cols-3">
            {audiences.map((a) => (
              <div key={a.title} className="card-lift spotlight reveal flex flex-col gap-3 rounded-[18px] border border-line-3 bg-ink-5 p-6 sm:p-8">
                <span className="grid size-11 place-items-center rounded-xl border border-[rgba(61,149,255,0.3)] bg-[rgba(31,123,255,0.12)] text-cyan">
                  <Icon name={a.icon} size={20} strokeWidth={1.8} />
                </span>
                <h3 className="font-display text-xl font-semibold">{a.title}</h3>
                <p className="text-[0.95rem] text-fg-3">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
