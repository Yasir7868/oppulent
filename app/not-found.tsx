import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { GhostButton, PrimaryButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  const links = [
    { label: "Services", href: "/services" },
    { label: "Free Score Check", href: "/score-check" },
    { label: "Inner Circle", href: "/inner-circle" },
    { label: "Education Hub", href: "/education" },
  ];
  return (
    <PageHero labelledBy="nf-title" gridAt="50% 30%" innerClassName="lg:py-28">
      <div className="mx-auto flex max-w-[40rem] flex-col items-center gap-6 py-6 text-center">
        <span className="eyebrow text-cyan">Error 404</span>
        <h1 id="nf-title" className="t-title">
          This page isn’t on <span className="shimmer-text">your report.</span>
        </h1>
        <p className="t-lead">The page you’re looking for has moved or doesn’t exist. Let’s get you back on track.</p>
        <div className="flex w-full flex-col justify-center gap-3.5 sm:w-auto sm:flex-row sm:flex-wrap">
          <PrimaryButton href="/" stretch>
            Back to home
          </PrimaryButton>
          <GhostButton href="/contact" stretch>
            Contact us
          </GhostButton>
        </div>
        <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-1">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="link-arrow text-sm">
                {l.label}
                <Icon name="arrowRight" size={14} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageHero>
  );
}
