"use client";

import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { GhostButton, PrimaryButton } from "@/components/ui/Button";

export type CtaSet = { ghost?: { label: string; href: string }; primary: { label: string; href: string } };

/** The header's calls to action adapt to the page: joining on Inner Circle, booking everywhere else. */
export function ctasFor(pathname: string): CtaSet {
  if (pathname.startsWith("/inner-circle")) {
    return {
      primary: { label: `Join — ${site.innerCircle.price}`, href: site.innerCircle.checkoutUrl || "#join" },
    };
  }
  if (pathname.startsWith("/score-check")) {
    return { primary: { label: "Book a Free Consultation", href: "/contact?goal=analysis" } };
  }
  return {
    ghost: { label: "Check My Score", href: "/score-check" },
    primary: {
      label: "Book a Free Consultation",
      href: pathname.startsWith("/contact") ? "#book" : "/contact",
    },
  };
}

export function HeaderCtas() {
  const { ghost, primary } = ctasFor(usePathname());
  return (
    <div className="flex items-center gap-2.5 whitespace-nowrap">
      {/* The secondary action joins the header only once there's room for it (it's also in the hero, menu and footer). */}
      {ghost ? (
        <GhostButton href={ghost.href} size="md" className="hidden min-h-11 rounded-lg px-[18px] text-sm wide:inline-flex">
          {ghost.label}
        </GhostButton>
      ) : null}
      <PrimaryButton href={primary.href} size="md" className="min-h-11 text-sm [--slant:12px]">
        {primary.label}
      </PrimaryButton>
    </div>
  );
}
