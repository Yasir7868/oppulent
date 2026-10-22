import Link from "next/link";
import { Mark } from "@/components/brand/Logo";
import { ArrowLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/lib/site";

function SmallService({ href, icon, title, text }: { href: string; icon: IconName; title: string; text: string }) {
  return (
    <Link
      href={href}
      className="card-lift spotlight reveal group flex flex-1 gap-4 rounded-[22px] border border-line-3 bg-[linear-gradient(170deg,#0D182E,#0A1224)] p-6 text-fg sm:flex-col sm:gap-3 sm:p-8"
    >
      <span className="grid size-12 flex-none place-items-center rounded-[14px] border border-[rgba(61,149,255,0.3)] bg-[rgba(31,123,255,0.12)] text-cyan sm:size-[52px]">
        <Icon name={icon} size={24} strokeWidth={1.8} />
      </span>
      <span className="flex flex-col gap-1.5 sm:mt-2">
        <span className="flex items-center gap-2 font-display text-xl font-semibold sm:text-[1.4375rem]">
          {title}
          <Icon
            name="arrowUpRight"
            size={18}
            className="text-brand-light opacity-60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
          />
        </span>
        <span className="text-[0.9375rem] text-fg-3">{text}</span>
      </span>
    </Link>
  );
}

function ProtectionCard({ href, icon, title, text }: { href: string; icon: IconName; title: string; text: string }) {
  return (
    <Link
      href={href}
      className="card-lift spotlight reveal flex items-start gap-[18px] rounded-[18px] border border-line-3 bg-ink-3 px-6 py-6 text-fg sm:px-[30px] sm:py-7"
    >
      <Icon name={icon} size={26} strokeWidth={1.8} className="flex-none text-fg-2" />
      <span>
        <span className="block font-display text-[1.1875rem] font-semibold">{title}</span>
        <span className="mt-1 block text-[0.9rem] text-fg-3">{text}</span>
      </span>
    </Link>
  );
}

export function ServicesBento() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y">
      <div className="container-x flex flex-col gap-10 sm:gap-12">
        <SectionHeader
          id="services-title"
          eyebrow="Services"
          title="One path from credit to capital."
          action={<ArrowLink href="/services">View all services</ArrowLink>}
        />

        <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row">
          <Link
            href="/services/credit-optimization"
            className="card-lift spotlight reveal group relative flex flex-col gap-5 overflow-hidden rounded-[22px] border border-line-5 bg-[radial-gradient(560px_320px_at_88%_6%,rgba(31,123,255,0.3),rgba(0,0,0,0)_70%),linear-gradient(160deg,#0F1C36,#0A1326)] p-6 text-fg sm:gap-[22px] sm:p-11 lg:min-h-[400px] lg:flex-[2_1_0%]"
          >
            <Mark className="pointer-events-none absolute -top-8 -right-10 w-[300px] opacity-[0.08]" sizes="300px" />
            <div className="relative flex items-center justify-between gap-3">
              <span className="tag text-cyan">Flagship</span>
              <span className="grid size-11 place-items-center rounded-full border border-line-6 transition-colors duration-300 group-hover:border-cyan group-hover:bg-[rgba(92,200,255,0.1)]">
                <Icon name="arrowUpRight" size={20} strokeWidth={1.8} />
              </span>
            </div>
            <h3 className="relative font-display text-[clamp(1.875rem,1.4rem+1.6vw,2.375rem)] font-semibold tracking-[-0.02em]">
              Credit Optimization
            </h3>
            <p className="relative max-w-[35rem] text-[1.0625rem] text-fg-3">
              Repair what’s wrong, build what’s missing. Two services, one strategy for a profile lenders say yes to.
            </p>
            <div className="flex-1" />
            <div className="relative grid gap-3 sm:grid-cols-2 sm:gap-3.5">
              {[
                { t: "Credit Repair", d: "Dispute inaccurate, unverifiable and unfair items under the FCRA, FDCPA and TILA." },
                { t: "Credit Building", d: "Positive accounts, utilization strategy and profile optimization." },
              ].map((s) => (
                <div key={s.t} className="rounded-[14px] border border-line-4 bg-[rgba(4,7,14,0.55)] px-5 py-[18px]">
                  <div className="font-bold">{s.t}</div>
                  <div className="mt-1 text-sm text-fg-3">{s.d}</div>
                </div>
              ))}
            </div>
          </Link>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-5 lg:flex-[1_1_0%] lg:flex-col">
            <SmallService
              href="/services/business-funding"
              icon="trend"
              title="Business Funding"
              text="0% intro-APR business credit cards and business lines of credit."
            />
            <SmallService
              href="/services/entity-structuring"
              icon="building"
              title="Entity Structuring"
              text="LLC or corp, EIN, address, bank account — built to be fundable."
            />
          </div>
        </div>

        <Link
          href="/inner-circle"
          className="ring-conic card-lift group relative flex flex-col gap-6 rounded-[22px] px-6 py-8 text-fg shadow-[0_0_60px_rgba(31,123,255,0.18)] [--ring-fill:linear-gradient(100deg,#0E2350,#0A1730_55%,#0B1426)] sm:px-[42px] sm:py-[38px] lg:flex-row lg:items-center lg:justify-between lg:gap-10"
        >
          <div className="flex min-w-0 flex-col gap-2.5 lg:max-w-[40rem]">
            <span className="tag text-cyan">Community · Featured</span>
            <h3 className="font-display text-[1.625rem] font-semibold tracking-[-0.01em] sm:text-[1.875rem]">
              Opulent Financial Inner Circle
            </h3>
            <p className="text-fg-2">
              Live classes on personal credit, business credit and funding — plus exclusive Q&amp;A with our founder.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="font-display text-[2.5rem] leading-none font-semibold tracking-[-0.03em] sm:text-5xl">
              {site.innerCircle.price}
            </div>
            <span className="btn-primary min-h-[3.125rem] w-full [--slant:12px] sm:w-auto">
              <span className="btn-face text-[0.9375rem]">
                Join the Inner Circle
                <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </span>
          </div>
        </Link>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          <ProtectionCard
            href="/services/life-insurance"
            icon="shield"
            title="Life Insurance"
            text="Protection, legacy and living benefits for your family."
          />
          <ProtectionCard
            href="/services/annuities"
            icon="clock"
            title="Annuities"
            text="Retirement income, growth and protection."
          />
          <div className="reveal flex flex-col gap-3 rounded-[18px] border border-line-3 bg-ink-3 px-6 py-6 sm:px-[30px] sm:py-7 md:col-span-2 lg:col-span-1">
            <span className="tag text-fg-3">Funding by industry</span>
            <div className="flex flex-wrap gap-2.5">
              <Link href="/services/business-funding#healthcare" className="btn-ghost min-h-11 rounded-full px-4 text-sm">
                Healthcare practitioners
              </Link>
              <Link href="/services/business-funding#real-estate" className="btn-ghost min-h-11 rounded-full px-4 text-sm">
                Real estate pros
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
