"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { PrimaryAction } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { saveScoreDetails } from "@/lib/score-handoff";
import { hasErrors, validateScoreDetails, type FieldErrors, type ScoreDetails } from "@/lib/validation";

/** Step one of the score check, embedded on the home page; continues on /score-check. */
export function ScoreStartForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FieldErrors<keyof ScoreDetails>>({});
  const [busy, setBusy] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const details: ScoreDetails = {
      firstName: String(fd.get("firstName") ?? ""),
      lastName: String(fd.get("lastName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
    };
    const found = validateScoreDetails(details);
    setErrors(found);
    if (hasErrors(found)) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setBusy(true);
    saveScoreDetails(details);
    router.push("/score-check");
  };

  const clear = (field: keyof ScoreDetails) => () =>
    errors[field] && setErrors((prev) => ({ ...prev, [field]: undefined }));

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="score-start-title"
      className="frame-glow-inner flex flex-col gap-[18px] bg-ink-4 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:p-[38px]"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 id="score-start-title" className="font-display text-[1.3125rem] font-semibold">
          Start your free check
        </h3>
        <span className="text-[0.8125rem] whitespace-nowrap text-fg-3">Step 1 of 3</span>
      </div>
      <div aria-hidden="true" className="h-1 rounded-sm bg-line-2">
        <div className="h-1 w-1/3 rounded-sm bg-[linear-gradient(90deg,#1565E6,#5CC8FF)] shadow-[0_0_10px_#2F8CFF]" />
      </div>
      <div className="grid gap-3.5 sm:grid-cols-2">
        <TextField id="h-fn" name="firstName" label="First name" autoComplete="given-name" error={errors.firstName} onInput={clear("firstName")} />
        <TextField id="h-ln" name="lastName" label="Last name" autoComplete="family-name" error={errors.lastName} onInput={clear("lastName")} />
      </div>
      <TextField id="h-em" name="email" type="email" label="Email" autoComplete="email" inputMode="email" error={errors.email} onInput={clear("email")} />
      <TextField id="h-ph" name="phone" type="tel" label="Phone" autoComplete="tel" inputMode="tel" error={errors.phone} onInput={clear("phone")} />
      <PrimaryAction type="submit" icon="arrowRight" shine disabled={busy} aria-busy={busy}>
        {busy ? "Opening your check…" : "Continue"}
      </PrimaryAction>
      <p className="flex gap-2 text-[0.78rem] text-fg-4">
        <Icon name="lock" size={16} className="mt-0.5 flex-none" />
        Encrypted in transit. Your SSN and date of birth are never stored on our site.
      </p>
    </form>
  );
}
