import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm, type FieldDef } from "@/components/forms/InquiryForm";
import { PageHero } from "@/components/sections/PageHero";
import { Icon, type IconName } from "@/components/ui/Icon";
import { inquiryTopics, isGoalId } from "@/lib/goals";
import { delay } from "@/lib/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description:
    "Book a free consultation with Opulent Financial. We’ll review your profile and map the fastest honest path to your credit, funding and protection goals.",
  alternates: { canonical: "/contact" },
};

const fields: FieldDef[] = [
  { name: "firstName", label: "First name", type: "text", autoComplete: "given-name", half: true },
  { name: "lastName", label: "Last name", type: "text", autoComplete: "family-name", half: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email", half: true },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", half: true },
  {
    name: "goal",
    label: "What can we help with?",
    type: "select",
    placeholder: "Choose a goal",
    options: inquiryTopics.map((t) => ({ value: t.id, label: t.label })),
  },
  {
    name: "contactMethod",
    label: "Best way to reach you",
    type: "select",
    optional: true,
    placeholder: "No preference",
    options: [
      { value: "call", label: "Phone call" },
      { value: "text", label: "Text message" },
      { value: "email", label: "Email" },
    ],
  },
  {
    name: "message",
    label: "Anything we should know?",
    type: "textarea",
    optional: true,
    placeholder: "Your goals, timeline, or questions.",
  },
  {
    name: "consent",
    label: "I agree that Opulent Financial may contact me about this request by phone, text or email.",
    type: "consent",
  },
];

const expectations: { icon: IconName; title: string; text: string }[] = [
  { icon: "user", title: "Tell us your goal", text: "Fix credit, build it, structure a business, get funded or protect your family." },
  { icon: "gauge", title: "We review your profile", text: "A clear look at what’s helping and what’s holding you back." },
  { icon: "trend", title: "Get your path", text: "The fastest honest route to your goal — and what it takes." },
];

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { goal } = await searchParams;
  const defaults = isGoalId(goal) ? { goal } : undefined;

  return (
    <PageHero labelledBy="contact-title" gridAt="70% 25%" innerClassName="lg:pb-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
        <div className="flex flex-col gap-6">
          <span className="rise eyebrow text-cyan" style={delay(0.1)}>
            Free consultation
          </span>
          <h1 id="contact-title" className="rise t-display" style={delay(0.2)}>
            Let’s map your <span className="shimmer-text">next approval.</span>
          </h1>
          <p className="rise t-lead max-w-[32rem]" style={delay(0.35)}>
            Book a free consultation. We’ll review your profile and map the fastest honest path to your goals.
          </p>
        </div>

        {/* DOM order puts the form right after the intro on phones; on desktop it spans the right column. */}
        <div id="book" className="rise self-start lg:col-start-2 lg:row-span-2 lg:row-start-1" style={delay(0.45)}>
          <div className="frame-glow">
            <div className="frame-glow-inner flex flex-col gap-6 bg-ink-4 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:p-9">
              <div className="flex flex-col gap-1.5">
                <h2 className="font-display text-[1.5rem] font-semibold">Request your consultation</h2>
                <p className="text-[0.9rem] text-fg-3">
                  Prefer to start with a number?{" "}
                  <Link href="/score-check" className="font-semibold text-brand-light hover:text-brand-soft">
                    Check your score first
                  </Link>
                  .
                </p>
              </div>
              <InquiryForm
                kind="consultation"
                fields={fields}
                defaults={defaults}
                submitLabel="Book My Free Consultation"
                successTitle="Request received."
                successText="Thanks — our team will reach out to schedule your free consultation."
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-start-1 lg:row-start-2">
          <ol className="rise flex flex-col gap-3" style={delay(0.5)}>
            {expectations.map((e, i) => (
              <li key={e.title} className="flex gap-4 rounded-2xl border border-line-3 bg-[rgba(11,20,38,0.7)] p-5">
                <span className="grid size-11 flex-none place-items-center rounded-xl border border-[rgba(61,149,255,0.3)] bg-[rgba(31,123,255,0.12)] text-cyan">
                  <Icon name={e.icon} size={20} strokeWidth={1.8} />
                </span>
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-tech text-[0.625rem] text-brand-light">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display font-semibold">{e.title}</span>
                  </div>
                  <p className="mt-1 text-[0.9rem] text-fg-3">{e.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="rise flex flex-col gap-2 border-t border-line-1 pt-6 text-[0.95rem] text-fg-3" style={delay(0.6)}>
            <span className="tag text-fg-5">Reach us directly</span>
            <span className="flex items-center gap-2.5">
              <Icon name="phone" size={16} className="text-brand-light" />
              {site.contact.phone}
            </span>
            <span className="flex items-center gap-2.5">
              <Icon name="mail" size={16} className="text-brand-light" />
              {site.contact.email}
            </span>
            <span className="flex items-center gap-2.5">
              <Icon name="clock" size={16} className="text-brand-light" />
              {site.contact.hours}
            </span>
          </div>
        </div>
      </div>
    </PageHero>
  );
}
