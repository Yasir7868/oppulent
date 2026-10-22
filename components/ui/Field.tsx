import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Base = {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  className?: string;
  optional?: boolean;
};

function Label({ id, label, optional }: { id: string; label: string; optional?: boolean }) {
  return (
    <label htmlFor={id} className="text-[0.8125rem] font-semibold text-fg-2">
      {label}
      {optional ? <span className="ml-1.5 font-normal text-fg-5">(optional)</span> : null}
    </label>
  );
}

function Message({ id, error, hint }: { id: string; error?: string; hint?: ReactNode }) {
  if (error) {
    return (
      <p id={`${id}-error`} className="flex items-start gap-1.5 text-[0.8125rem] text-danger">
        <span aria-hidden="true">●</span>
        {error}
      </p>
    );
  }
  if (hint) {
    return (
      <p id={`${id}-hint`} className="text-[0.8125rem] text-fg-4">
        {hint}
      </p>
    );
  }
  return null;
}

function describedBy(id: string, error?: string, hint?: ReactNode) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

export function TextField({
  id,
  label,
  error,
  hint,
  className,
  optional,
  ...input
}: Base & Omit<ComponentProps<"input">, "id" | "className">) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label id={id} label={label} optional={optional} />
      <input
        id={id}
        className="field-input"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...input}
      />
      <Message id={id} error={error} hint={hint} />
    </div>
  );
}

export function SelectField({
  id,
  label,
  error,
  hint,
  className,
  optional,
  children,
  ...select
}: Base & Omit<ComponentProps<"select">, "id" | "className">) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label id={id} label={label} optional={optional} />
      <select
        id={id}
        className="field-input cursor-pointer"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...select}
      >
        {children}
      </select>
      <Message id={id} error={error} hint={hint} />
    </div>
  );
}

export function TextAreaField({
  id,
  label,
  error,
  hint,
  className,
  optional,
  ...textarea
}: Base & Omit<ComponentProps<"textarea">, "id" | "className">) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label id={id} label={label} optional={optional} />
      <textarea
        id={id}
        className="field-input"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...textarea}
      />
      <Message id={id} error={error} hint={hint} />
    </div>
  );
}

export function CheckField({
  id,
  children,
  error,
  className,
  ...input
}: { id: string; children: ReactNode; error?: string; className?: string } & Omit<
  ComponentProps<"input">,
  "id" | "className" | "type" | "children"
>) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-start gap-3.5 rounded-[10px] border bg-ink-3 p-4 text-[0.84rem] leading-relaxed text-fg-2 transition-colors has-[:checked]:border-brand-light",
          error ? "border-danger" : "border-line-5",
        )}
      >
        <input
          id={id}
          type="checkbox"
          className="check-input"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...input}
        />
        <span>{children}</span>
      </label>
      <Message id={id} error={error} />
    </div>
  );
}

/** Polite status region for form-level outcomes. */
export function FormStatus({
  tone,
  title,
  children,
}: {
  tone: "success" | "error" | "info";
  title: string;
  children?: ReactNode;
}) {
  const styles = {
    success: "border-[rgba(92,200,255,0.45)] bg-[rgba(92,200,255,0.08)]",
    error: "border-[rgba(255,138,138,0.5)] bg-[rgba(255,138,138,0.07)]",
    info: "border-[rgba(245,165,36,0.5)] bg-[rgba(245,165,36,0.07)]",
  }[tone];
  return (
    <div className={cn("step-in flex flex-col gap-1 rounded-xl border p-4 text-sm", styles)}>
      <strong className="font-semibold text-fg">{title}</strong>
      {children ? <div className="text-fg-2">{children}</div> : null}
    </div>
  );
}
