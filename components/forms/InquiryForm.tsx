"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitInquiry, type InquiryState } from "@/lib/actions/inquiry";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { hasErrors, validateInquiry, type InquiryKind } from "@/lib/validation";
import { CheckField, FormStatus, SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import { PrimaryAction } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export type FieldDef =
  | {
      name: string;
      label: string;
      type: "text" | "email" | "tel" | "url";
      autoComplete?: string;
      half?: boolean;
      optional?: boolean;
      placeholder?: string;
      hint?: string;
    }
  | {
      name: string;
      label: string;
      type: "select";
      options: { value: string; label: string }[];
      half?: boolean;
      optional?: boolean;
      placeholder: string;
    }
  | { name: string; label: string; type: "textarea"; optional?: boolean; placeholder?: string }
  | { name: string; label: string; type: "consent" };

const inputModes = { email: "email", tel: "tel", url: "url", text: undefined } as const;

const initial: InquiryState = { status: "idle", nonce: 0 };

type Props = {
  kind: InquiryKind;
  fields: FieldDef[];
  submitLabel: string;
  successTitle: string;
  successText: string;
  defaults?: Record<string, string>;
  idPrefix?: string;
  className?: string;
};

export function InquiryForm({
  kind,
  fields,
  submitLabel,
  successTitle,
  successText,
  defaults = {},
  idPrefix = kind,
  className,
}: Props) {
  const [state, formAction, pending] = useActionState(submitInquiry, initial);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const errors = { ...(state.status === "invalid" ? state.errors : {}), ...clientErrors };
  const values = { ...defaults, ...(state.values ?? {}) };

  useEffect(() => {
    if (state.status === "invalid" && state.errors) {
      const first = Object.keys(state.errors)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    } else if (state.status !== "idle") {
      statusRef.current?.focus();
    }
  }, [state]);

  if (state.status === "sent") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className={cn("step-in flex flex-col items-start gap-4 rounded-[20px] border border-[rgba(92,200,255,0.45)] bg-[rgba(92,200,255,0.06)] p-7 outline-none sm:p-9", className)}
      >
        <span className="grid size-14 place-items-center rounded-full border border-[rgba(92,200,255,0.5)] bg-[rgba(92,200,255,0.12)] text-cyan">
          <Icon name="check" size={26} strokeWidth={2.4} />
        </span>
        <h3 className="font-display text-2xl font-semibold">{successTitle}</h3>
        <p className="text-fg-2">{successText}</p>
        <Link href="/" className="link-arrow">
          Back to home <Icon name="arrowRight" size={16} />
        </Link>
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const fd = new FormData(e.currentTarget);
    const current: Record<string, string> = {};
    for (const f of fields) current[f.name] = String(fd.get(f.name) ?? "");
    const found = validateInquiry(kind, current) as Record<string, string>;
    setClientErrors(found);
    if (hasErrors(found)) {
      e.preventDefault();
      const first = Object.keys(found)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  };

  const clear = (name: string) => () => {
    if (!clientErrors[name]) return;
    setClientErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  return (
    <form
      key={state.nonce}
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      className={cn("flex flex-col gap-[18px]", className)}
    >
      <input type="hidden" name="kind" value={kind} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${idPrefix}-website`}>Leave this field empty</label>
        <input id={`${idPrefix}-website`} name="website_url" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-[18px] sm:grid-cols-2">
        {fields.map((f) => {
          const id = `${idPrefix}-${f.name}`;
          const error = errors[f.name];
          if (f.type === "consent") {
            return (
              <CheckField
                key={f.name}
                id={id}
                name={f.name}
                defaultChecked={values[f.name] === "on"}
                error={error}
                onChange={clear(f.name)}
                className="sm:col-span-2"
              >
                {f.label}
              </CheckField>
            );
          }
          if (f.type === "select") {
            return (
              <SelectField
                key={f.name}
                id={id}
                name={f.name}
                label={f.label}
                optional={f.optional}
                defaultValue={values[f.name] ?? ""}
                error={error}
                onChange={clear(f.name)}
                className={f.half ? undefined : "sm:col-span-2"}
              >
                <option value="" disabled>
                  {f.placeholder}
                </option>
                {f.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </SelectField>
            );
          }
          if (f.type === "textarea") {
            return (
              <TextAreaField
                key={f.name}
                id={id}
                name={f.name}
                label={f.label}
                optional={f.optional}
                placeholder={f.placeholder}
                defaultValue={values[f.name] ?? ""}
                error={error}
                onInput={clear(f.name)}
                className="sm:col-span-2"
                rows={5}
              />
            );
          }
          return (
            <TextField
              key={f.name}
              id={id}
              name={f.name}
              type={f.type}
              label={f.label}
              optional={f.optional}
              placeholder={f.placeholder}
              hint={f.hint}
              autoComplete={f.autoComplete}
              inputMode={inputModes[f.type]}
              defaultValue={values[f.name] ?? ""}
              error={error}
              onInput={clear(f.name)}
              className={f.half ? undefined : "sm:col-span-2"}
            />
          );
        })}
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none empty:hidden">
        {state.status === "unavailable" ? (
          <FormStatus tone="info" title="Your request wasn’t sent — online requests aren’t connected yet.">
            Your details are still here. Please reach our team directly at {site.contact.phone} or {site.contact.email}.
          </FormStatus>
        ) : null}
        {state.status === "failed" ? (
          <FormStatus tone="error" title="Something went wrong, and your request wasn’t sent.">
            Please try again in a moment, or reach us at {site.contact.phone}.
          </FormStatus>
        ) : null}
        {hasErrors(errors) ? (
          <p className="text-sm text-danger">Check the highlighted fields and try again.</p>
        ) : null}
      </div>

      <PrimaryAction type="submit" disabled={pending} aria-busy={pending} icon={pending ? undefined : "arrowRight"}>
        {pending ? (
          <>
            <span aria-hidden="true" className="spin size-4 rounded-full border-2 border-white/30 border-t-white" />
            Sending…
          </>
        ) : (
          submitLabel
        )}
      </PrimaryAction>
    </form>
  );
}
