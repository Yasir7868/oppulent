import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow: string;
  title: ReactNode;
  id?: string;
  lead?: ReactNode;
  /** Right-aligned action on wide screens (e.g. "View all"). */
  action?: ReactNode;
  size?: "lg" | "md";
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeader({ eyebrow, title, id, lead, action, size = "lg", className, as: Tag = "h2" }: Props) {
  return (
    <div
      className={cn(
        "reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="flex max-w-2xl flex-col gap-3.5">
        <span className="eyebrow">{eyebrow}</span>
        <Tag id={id} className={size === "lg" ? "t-h2" : "t-h2-sm"}>
          {title}
        </Tag>
        {lead ? <p className="t-lead max-w-xl">{lead}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
