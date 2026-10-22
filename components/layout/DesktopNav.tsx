"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { primaryNav } from "@/lib/site";
import { serviceCatalog } from "@/lib/services";
import { Icon } from "@/components/ui/Icon";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  // A mouse that hovers opens the panel; its follow-up click shouldn't immediately close it again.
  const hoverOpened = useRef(false);

  // Close the services panel whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const hoverOpen = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    if (!open) hoverOpened.current = true;
    setOpen(true);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    hoverOpened.current = false;
    closeTimer.current = window.setTimeout(() => setOpen(false), 160);
  };
  const onToggle = () => {
    if (hoverOpened.current) {
      hoverOpened.current = false;
      return;
    }
    setOpen((v) => !v);
  };

  const servicesActive = pathname.startsWith("/services");

  return (
    <div className="flex items-center gap-1 rounded-full border border-[rgba(120,160,230,0.16)] bg-[rgba(12,22,42,0.55)] p-[5px] text-sm font-medium backdrop-blur-[14px]">
      <div
        ref={wrapRef}
        className="relative"
        onPointerEnter={hoverOpen}
        onPointerLeave={hoverClose}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
        }}
      >
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            "flex min-h-10 cursor-pointer items-center gap-1 rounded-full px-3 whitespace-nowrap transition-colors wide:px-4",
            servicesActive || open ? "bg-[rgba(61,149,255,0.14)] text-fg" : "text-fg-2 hover:text-fg",
          )}
        >
          Services
          <Icon name="chevronDown" size={14} className={cn("transition-transform duration-300", open && "rotate-180")} />
        </button>

        <div
          id={panelId}
          hidden={!open}
          className="absolute top-[calc(100%+14px)] left-1/2 w-[min(600px,80vw)] -translate-x-1/2"
        >
          <div className="step-in rounded-[20px] border border-[rgba(120,170,255,0.22)] bg-[rgba(8,15,30,0.97)] p-3 shadow-[0_40px_90px_rgba(0,0,0,0.7),0_0_50px_rgba(31,123,255,0.15)]">
            <ul className="grid grid-cols-2 gap-1">
              {serviceCatalog.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    aria-current={isActive(pathname, s.href) ? "page" : undefined}
                    className="group flex gap-3.5 rounded-[14px] p-3.5 transition-colors hover:bg-[rgba(61,149,255,0.08)] aria-[current=page]:bg-[rgba(61,149,255,0.1)]"
                  >
                    <span className="grid size-10 flex-none place-items-center rounded-xl border border-[rgba(61,149,255,0.3)] bg-[rgba(31,123,255,0.12)] text-cyan">
                      <Icon name={s.icon} size={20} strokeWidth={1.8} />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="font-semibold text-fg">{s.title}</span>
                      <span className="text-[0.8125rem] leading-snug text-fg-3">{s.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="mt-2 flex min-h-12 items-center justify-between rounded-[14px] border border-line-3 px-4 font-semibold text-brand-light transition-colors hover:border-brand-light hover:text-brand-soft"
            >
              View all services
              <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>
      </div>

      {primaryNav
        .filter((item) => item.href !== "/services")
        .map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-10 items-center rounded-full px-3 whitespace-nowrap transition-colors wide:px-4",
                active ? "bg-[rgba(61,149,255,0.14)] text-fg" : "text-fg-2 hover:text-fg",
              )}
            >
              {item.label}
            </Link>
          );
        })}
    </div>
  );
}
