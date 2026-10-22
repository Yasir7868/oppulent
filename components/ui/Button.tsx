import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

type Size = "md" | "lg";

const heights: Record<Size, string> = {
  md: "min-h-12 text-[0.9375rem]",
  lg: "min-h-14 text-base",
};

type Common = {
  children: ReactNode;
  size?: Size;
  /** Full width below the `sm` breakpoint. */
  stretch?: boolean;
  /** Square-cornered block button (no slanted edge). */
  block?: boolean;
  icon?: IconName;
  shine?: boolean;
  className?: string;
};

type LinkButtonProps = Common & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

/** The slanted, glowing primary call to action. */
export function PrimaryButton({
  href,
  children,
  size = "lg",
  stretch,
  block,
  icon,
  shine = true,
  className,
  ...rest
}: LinkButtonProps) {
  const external = /^https?:\/\//.test(href);
  const classes = cn("btn-primary", heights[size], block && "btn-block", stretch && "w-full sm:w-auto", className);
  const face = (
    <span className="btn-face">
      {children}
      {icon ? <Icon name={icon} size={18} /> : null}
      {shine ? <span className="btn-shine" aria-hidden="true" /> : null}
    </span>
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {face}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {face}
    </Link>
  );
}

/** The outlined secondary action. */
export function GhostButton({ href, children, size = "lg", stretch, icon, className, ...rest }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn("btn-ghost px-6", size === "lg" && "btn-fluid", heights[size], stretch && "w-full sm:w-auto", className)}
      {...rest}
    >
      {icon ? <Icon name={icon} size={18} className="text-brand-light" /> : null}
      {children}
    </Link>
  );
}

type SubmitProps = Common & Omit<ComponentProps<"button">, "className" | "children">;

/** A primary-styled <button>. */
export function PrimaryAction({
  children,
  size = "lg",
  stretch,
  block = true,
  icon,
  shine = false,
  className,
  type = "button",
  ...rest
}: SubmitProps) {
  return (
    <button
      type={type}
      className={cn(
        "btn-primary cursor-pointer border-0 bg-transparent p-0",
        heights[size],
        block && "btn-block",
        stretch && "w-full sm:w-auto",
        className,
      )}
      {...rest}
    >
      <span className="btn-face">
        {children}
        {icon ? <Icon name={icon} size={18} /> : null}
        {shine ? <span className="btn-shine" aria-hidden="true" /> : null}
      </span>
    </button>
  );
}

/** An outlined <button>. */
export function GhostAction({ children, size = "lg", className, type = "button", ...rest }: SubmitProps) {
  return (
    <button
      type={type}
      className={cn("btn-ghost cursor-pointer px-6", size === "lg" && "btn-fluid", heights[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Inline text link with a trailing arrow. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("link-arrow", className)}>
      {children}
      <Icon name="arrowRight" size={16} />
    </Link>
  );
}
