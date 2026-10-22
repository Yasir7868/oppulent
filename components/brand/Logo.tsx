import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import markSrc from "@/public/brand/of-mark.png";
import logoSrc from "@/public/brand/of-logo.png";

/** The "OF" monogram on its own. Decorative by default. */
export function Mark({
  className,
  alt = "",
  sizes = "64px",
  preload,
}: {
  className?: string;
  alt?: string;
  sizes?: string;
  preload?: boolean;
}) {
  return <Image src={markSrc} alt={alt} sizes={sizes} preload={preload} className={cn("h-auto", className)} />;
}

/** The stacked logo with wordmark, used in the footer. */
export function StackedLogo({ className }: { className?: string }) {
  return <Image src={logoSrc} alt="Opulent Financial" sizes="200px" className={cn("h-auto", className)} />;
}

/** Monogram + typeset wordmark lockup that links home. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Opulent Financial — home"
      className={cn("group flex items-center gap-3 rounded-md text-fg", className)}
    >
      <Mark
        preload
        sizes="56px"
        className="w-12 drop-shadow-[0_0_10px_rgba(47,140,255,0.45)] transition-transform duration-500 group-hover:-rotate-3 lg:w-14"
      />
      <span className="flex flex-col leading-[1.1]">
        <span className="font-tech text-[0.875rem] tracking-[0.14em] lg:text-[0.9375rem]">OPULENT</span>
        <span className="font-tech text-[0.5rem] tracking-[0.52em] text-brand-light lg:text-[0.53rem]">FINANCIAL</span>
      </span>
    </Link>
  );
}
