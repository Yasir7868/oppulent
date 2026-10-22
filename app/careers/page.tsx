import type { Metadata } from "next";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { FormPage } from "@/components/sections/FormPage";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Careers — Build Wealth for Others",
  description: "Careers at Opulent Financial. See open roles or send a general application.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <FormPage
      titleId="careers-title"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Careers" },
      ]}
      eyebrow="Careers"
      title={
        <>
          Build wealth for others. <span className="shimmer-text">Build a career for you.</span>
        </>
      }
      lead="See open roles or send a general application."
      aside={
        <section aria-labelledby="roles-title" className="flex flex-col gap-3">
          <h2 id="roles-title" className="tag text-fg-4">
            Open roles
          </h2>
          <div className="flex items-center gap-4 rounded-2xl border border-dashed border-line-5 bg-[rgba(11,20,38,0.7)] p-5">
            <span className="grid size-11 flex-none place-items-center rounded-xl border border-[rgba(61,149,255,0.3)] bg-[rgba(31,123,255,0.12)] text-cyan">
              <Icon name="briefcase" size={20} strokeWidth={1.8} />
            </span>
            <p className="text-[0.95rem] text-fg-3">[Open roles — to be provided.] Don’t see a fit? Send a general application.</p>
          </div>
        </section>
      }
      formTitle="General application"
      formIntro="Tell us where you’d make an impact."
      form={
        <InquiryForm
          kind="careers"
          fields={[
            { name: "firstName", label: "First name", type: "text", autoComplete: "given-name", half: true },
            { name: "lastName", label: "Last name", type: "text", autoComplete: "family-name", half: true },
            { name: "email", label: "Email", type: "email", autoComplete: "email", half: true },
            { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", optional: true, half: true },
            {
              name: "role",
              label: "Area of interest",
              type: "select",
              placeholder: "Choose an area",
              options: [
                { value: "credit", label: "Credit consulting" },
                { value: "funding", label: "Business funding" },
                { value: "protection", label: "Insurance & annuities" },
                { value: "client-success", label: "Client success" },
                { value: "marketing", label: "Marketing & content" },
                { value: "other", label: "Something else" },
              ],
            },
            {
              name: "link",
              label: "LinkedIn or portfolio",
              type: "url",
              optional: true,
              placeholder: "linkedin.com/in/yourname",
            },
            {
              name: "message",
              label: "Tell us about yourself",
              type: "textarea",
              placeholder: "Your experience and what draws you to Opulent Financial.",
            },
            {
              name: "consent",
              label: "I agree that Opulent Financial may contact me about my application.",
              type: "consent",
            },
          ]}
          submitLabel="Send application"
          successTitle="Application received."
          successText="Thanks for your interest — we’ll reach out if there’s a fit."
        />
      }
    />
  );
}
