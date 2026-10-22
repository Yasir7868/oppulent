"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { primaryNav, site } from "@/lib/site";
import { serviceCatalog } from "@/lib/services";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { GhostButton, PrimaryButton } from "@/components/ui/Button";
import { ctasFor } from "./HeaderCtas";

/** Full-screen navigation sheet for phones and tablets, built on a modal <dialog>. */
export function MobileMenu() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const { ghost, primary } = ctasFor(pathname);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Navigating anywhere closes the sheet.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Close if the viewport grows past the breakpoint where the desktop nav takes over.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 80rem)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const closeOnLink = (e: React.MouseEvent) => {
    if ((e.target as Element).closest("a")) setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="grid size-12 cursor-pointer place-items-center rounded-xl border border-[rgba(120,160,230,0.25)] bg-[rgba(12,22,42,0.6)] text-fg transition-colors hover:border-brand-light"
      >
        <Icon name="menu" size={22} />
      </button>

      <dialog
        ref={dialogRef}
        className="menu-sheet"
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        onClick={closeOnLink}
      >
        <div className="flex min-h-full flex-col">
          <div className="container-x flex h-[var(--header-h)] flex-none items-center justify-between border-b border-line-1">
            <Logo />
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid size-12 cursor-pointer place-items-center rounded-xl border border-[rgba(120,160,230,0.25)] bg-[rgba(12,22,42,0.6)] text-fg transition-colors hover:border-brand-light"
            >
              <Icon name="close" size={22} />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-x flex flex-1 flex-col gap-8 pt-4 pb-10">
            <ul className="flex flex-col">
              <li className="menu-item border-b border-line-1" style={{ animationDelay: "40ms" }}>
                <details className="group" open={pathname.startsWith("/services")}>
                  <summary className="flex min-h-16 cursor-pointer items-center justify-between font-display text-[1.375rem] font-medium">
                    Services
                    <Icon
                      name="chevronDown"
                      size={20}
                      className="text-brand-light transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>
                  <ul className="grid gap-1 pb-4 sm:grid-cols-2">
                    {serviceCatalog.map((s) => (
                      <li key={s.href}>
                        <Link
                          href={s.href}
                          aria-current={pathname === s.href ? "page" : undefined}
                          className="flex min-h-14 items-center gap-3.5 rounded-xl px-3 transition-colors hover:bg-[rgba(61,149,255,0.08)] aria-[current=page]:bg-[rgba(61,149,255,0.12)]"
                        >
                          <span className="grid size-9 flex-none place-items-center rounded-lg border border-[rgba(61,149,255,0.3)] bg-[rgba(31,123,255,0.12)] text-cyan">
                            <Icon name={s.icon} size={18} strokeWidth={1.8} />
                          </span>
                          <span className="font-semibold">{s.title}</span>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href="/services"
                        className="flex min-h-12 items-center gap-2 px-3 font-semibold text-brand-light"
                      >
                        View all services <Icon name="arrowRight" size={16} />
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
              {primaryNav
                .filter((item) => item.href !== "/services")
                .map((item, i) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <li
                      key={item.href}
                      className="menu-item border-b border-line-1"
                      style={{ animationDelay: `${80 + i * 40}ms` }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex min-h-16 items-center justify-between font-display text-[1.375rem] font-medium",
                          active && "text-cyan",
                        )}
                      >
                        {item.label}
                        {item.badge ? (
                          <span className="font-tech text-[0.625rem] tracking-[0.14em] text-cyan">{item.badge}</span>
                        ) : (
                          <Icon name="chevronRight" size={20} className="text-brand-light" />
                        )}
                      </Link>
                    </li>
                  );
                })}
            </ul>

            <div className="menu-item flex flex-col gap-3" style={{ animationDelay: "320ms" }}>
              {ghost ? (
                <GhostButton href={ghost.href} className="w-full">
                  {ghost.label}
                </GhostButton>
              ) : null}
              <PrimaryButton href={primary.href} block className="w-full">
                {primary.label}
              </PrimaryButton>
            </div>

            <div className="menu-item mt-auto flex flex-col gap-1 text-sm text-fg-3" style={{ animationDelay: "380ms" }}>
              <span className="tag text-fg-5">Reach us</span>
              <span>{site.contact.phone}</span>
              <span>{site.contact.email}</span>
            </div>
          </nav>
        </div>
      </dialog>
    </>
  );
}
