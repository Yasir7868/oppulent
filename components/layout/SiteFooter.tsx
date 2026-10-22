import Link from "next/link";
import { StackedLogo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { complianceNote, legalNav, site } from "@/lib/site";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Credit Optimization", href: "/services/credit-optimization" },
      { label: "Business Funding", href: "/services/business-funding" },
      { label: "Entity Structuring", href: "/services/entity-structuring" },
      { label: "Life Insurance", href: "/services/life-insurance" },
      { label: "Annuities", href: "/services/annuities" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Meet the Founder", href: "/founder" },
      { label: "Results", href: "/results" },
      { label: "Affiliate Program", href: "/affiliate" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Inner Circle", href: "/inner-circle" },
      { label: "Education Hub", href: "/education" },
      { label: "Free Score Check", href: "/score-check" },
      { label: "MyTradeLine", href: site.myTradeLineUrl || "/inner-circle#module-06" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line-1 bg-ink-0">
      <div className="container-x flex flex-col gap-14 pt-16 pb-10 sm:pt-[4.5rem]">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="flex max-w-sm flex-col gap-5">
            <Link href="/" aria-label="Opulent Financial — home" className="w-fit rounded-md">
              <StackedLogo className="w-40 sm:w-[200px]" />
            </Link>
            <address className="flex flex-col gap-1 text-[0.9rem] not-italic text-fg-3">
              <span>{site.contact.phone}</span>
              <span>{site.contact.email}</span>
              <span>{site.contact.hours}</span>
            </address>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold" aria-label="Social media">
              {site.social.map((s) =>
                s.href ? (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center text-brand-light transition-colors hover:text-brand-soft"
                    >
                      {s.label}
                    </a>
                  </li>
                ) : (
                  <li key={s.label} className="inline-flex min-h-11 items-center text-fg-5" title="Profile link coming soon">
                    {s.label}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 text-[0.9rem] sm:grid-cols-3 lg:w-[min(100%,40rem)]">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title} className="flex flex-col gap-1">
                <span className="tag mb-2 text-fg-5">{col.title}</span>
                {col.links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="group inline-flex min-h-10 w-fit items-center gap-1.5 text-fg-2 transition-colors hover:text-white"
                  >
                    {l.label}
                    <Icon
                      name="arrowUpRight"
                      size={13}
                      className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </Link>
                ))}
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line-1 pt-7 text-[0.8rem] text-fg-5">
          <p className="max-w-4xl">
            {complianceNote} [Required credit-services, insurance and funding disclosures.]
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span>© {year} Opulent Financial. All rights reserved.</span>
            <ul className="flex flex-wrap gap-x-5">
              {legalNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-10 items-center text-fg-3 transition-colors hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
