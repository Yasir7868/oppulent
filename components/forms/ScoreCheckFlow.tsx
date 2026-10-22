"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { saveScoreDetails, takeScoreDetails } from "@/lib/score-handoff";
import {
  digitsOnly,
  hasErrors,
  usStates,
  validateScoreDetails,
  validateScoreIdentity,
  type FieldErrors,
  type ScoreDetails,
  type ScoreIdentity,
} from "@/lib/validation";
import { ScoreGauge } from "@/components/visuals/ScoreGauge";
import { CheckField, SelectField, TextField } from "@/components/ui/Field";
import { GhostAction, PrimaryAction, PrimaryButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type Step = "details" | "verify" | "unavailable" | "sample";

const stepIndex: Record<Step, number> = { details: 1, verify: 2, unavailable: 3, sample: 3 };
const stepLabels = ["Your details", "Verify identity", "See your score"];

const emptyDetails: ScoreDetails = { firstName: "", lastName: "", email: "", phone: "" };
type Address = Pick<ScoreIdentity, "address" | "city" | "state" | "zip">;
const emptyAddress: Address = { address: "", city: "", state: "", zip: "" };

const sampleFactors = [
  { label: "Payment history", weight: "35%", status: "Needs work", tone: "text-amber" },
  { label: "Amounts owed / utilization", weight: "30%", status: "Needs work", tone: "text-amber" },
  { label: "Length of credit history", weight: "15%", status: "Good", tone: "text-cyan" },
  { label: "Credit mix", weight: "10%", status: "Good", tone: "text-cyan" },
  { label: "New credit / inquiries", weight: "10%", status: "Fair", tone: "text-fg-2" },
];

function formatDob(value: string) {
  const d = digitsOnly(value).slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)} / ${d.slice(2)}`;
  return `${d.slice(0, 2)} / ${d.slice(2, 4)} / ${d.slice(4)}`;
}

function formatSsn(value: string) {
  const d = digitsOnly(value).slice(0, 9);
  if (d.length <= 3) return d;
  if (d.length <= 5) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 5)}-${d.slice(5)}`;
}

/** The step list. Vertical beside the panel on desktop, a compact row above it on phones. */
export function ScoreSteps({ current, compact = false }: { current: number; compact?: boolean }) {
  return (
    <ol
      aria-label="Progress"
      className={cn(compact ? "grid grid-cols-3 gap-2" : "flex max-w-[28.75rem] flex-col gap-3.5")}
    >
      {stepLabels.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const now = n === current;
        return (
          <li
            key={label}
            aria-current={now ? "step" : undefined}
            className={cn(
              "flex items-center rounded-xl border transition-colors duration-500",
              compact ? "flex-col gap-1.5 px-2 py-3 text-center text-[0.78rem]" : "gap-4 px-[18px] py-4",
              now ? "border-brand-light bg-[rgba(31,123,255,0.12)]" : "border-line-3",
            )}
          >
            <span
              className={cn(
                "grid flex-none place-items-center rounded-full border font-tech text-[0.6875rem]",
                compact ? "size-7" : "size-[34px]",
                now || done ? "border-cyan text-cyan" : "border-fg-5 text-fg-5",
              )}
            >
              {done ? <Icon name="check" size={14} strokeWidth={2.6} /> : String(n).padStart(2, "0")}
            </span>
            <span className={cn("font-semibold", now ? "text-fg" : done ? "text-fg-2" : "text-fg-3")}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

export function ScoreCheckFlow({ intro, notes }: { intro: React.ReactNode; notes: React.ReactNode }) {
  const [step, setStep] = useState<Step>("details");
  const [details, setDetails] = useState<ScoreDetails>(emptyDetails);
  const [address, setAddress] = useState<Address>(emptyAddress);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [consent, setConsent] = useState(false);
  const [showSsn, setShowSsn] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const moved = useRef(false);

  // Pick up details handed over from the home-page form.
  useEffect(() => {
    const stored = takeScoreDetails();
    if (!stored) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from sessionStorage after hydration
    setDetails(stored.details);
    if (stored.handoff && !hasErrors(validateScoreDetails(stored.details))) setStep("verify");
  }, []);

  useEffect(() => {
    if (!moved.current) return;
    headingRef.current?.focus();
  }, [step]);

  const go = (next: Step) => {
    moved.current = true;
    setErrors({});
    setStep(next);
  };

  const focusFirstError = (found: FieldErrors) => {
    const first = Object.keys(found)[0];
    formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const clear = (name: string) => () => {
    if (!errors[name]) return;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const submitDetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const next: ScoreDetails = {
      firstName: String(fd.get("firstName") ?? ""),
      lastName: String(fd.get("lastName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
    };
    const found = validateScoreDetails(next);
    setDetails(next);
    if (hasErrors(found)) {
      setErrors(found);
      focusFirstError(found);
      return;
    }
    saveScoreDetails(next);
    takeScoreDetails(); // mark the handoff as consumed
    go("verify");
  };

  const submitIdentity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const identity: ScoreIdentity = {
      address: String(fd.get("address") ?? ""),
      city: String(fd.get("city") ?? ""),
      state: String(fd.get("state") ?? ""),
      zip: String(fd.get("zip") ?? ""),
      dob: String(fd.get("dob") ?? ""),
      ssn: String(fd.get("ssn") ?? ""),
    };
    setAddress({ address: identity.address, city: identity.city, state: identity.state, zip: identity.zip });
    const found: FieldErrors = { ...validateScoreIdentity(identity) };
    if (!consent) found.consent = "Authorization is required to check your credit.";
    if (hasErrors(found)) {
      setErrors(found);
      focusFirstError(found);
      return;
    }
    // No credit-data provider is connected, so identity data goes nowhere: it is not sent or stored.
    go("unavailable");
  };

  const current = stepIndex[step];

  return (
    <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="flex flex-col gap-6 lg:pt-3">
        {intro}
        <div className="hidden lg:block">
          <ScoreSteps current={current} />
        </div>
        <div className="hidden lg:block">{notes}</div>
      </div>

    <div className="flex flex-col gap-5">
      <div className="lg:hidden">
        <ScoreSteps current={current} compact />
      </div>

      <div className="rise rounded-[22px] border border-[rgba(120,170,255,0.24)] bg-[linear-gradient(160deg,rgba(18,34,66,0.82),rgba(9,17,34,0.9))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_40px_100px_rgba(0,0,0,0.55),0_0_70px_rgba(31,123,255,0.18)] backdrop-blur-[16px] sm:p-10" style={{ animationDelay: "0.35s" }}>
        {step === "details" ? (
          <form key="details" ref={formRef} noValidate onSubmit={submitDetails} className="step-in flex flex-col gap-[18px]">
            <div className="flex items-baseline justify-between gap-4">
              <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl font-semibold outline-none">
                Your details
              </h2>
              <span className="text-[0.8125rem] whitespace-nowrap text-fg-3">Step 1 of 3</span>
            </div>
            <Progress value={33} />
            <div className="grid gap-3.5 sm:grid-cols-2">
              <TextField id="d-fn" name="firstName" label="First name" autoComplete="given-name" defaultValue={details.firstName} error={errors.firstName} onInput={clear("firstName")} />
              <TextField id="d-ln" name="lastName" label="Last name" autoComplete="family-name" defaultValue={details.lastName} error={errors.lastName} onInput={clear("lastName")} />
            </div>
            <TextField id="d-em" name="email" type="email" inputMode="email" label="Email" autoComplete="email" defaultValue={details.email} error={errors.email} onInput={clear("email")} />
            <TextField id="d-ph" name="phone" type="tel" inputMode="tel" label="Mobile phone" autoComplete="tel" defaultValue={details.phone} error={errors.phone} onInput={clear("phone")} />
            <PrimaryAction type="submit" icon="arrowRight">
              Continue
            </PrimaryAction>
          </form>
        ) : null}

        {step === "verify" ? (
          <form key="verify" ref={formRef} noValidate onSubmit={submitIdentity} className="step-in flex flex-col gap-[18px]">
            <div className="flex items-baseline justify-between gap-4">
              <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl font-semibold outline-none">
                Verify your identity
              </h2>
              <span className="text-[0.8125rem] whitespace-nowrap text-fg-3">Step 2 of 3</span>
            </div>
            <Progress value={66} />
            {details.firstName ? (
              <p className="-mt-1 text-[0.9rem] text-fg-3">
                Checking for <span className="font-semibold text-fg">{`${details.firstName} ${details.lastName}`.trim()}</span>.{" "}
                <button type="button" onClick={() => go("details")} className="cursor-pointer font-semibold text-brand-light underline-offset-4 hover:underline">
                  Edit
                </button>
              </p>
            ) : null}
            <TextField id="v-ad" name="address" label="Street address" autoComplete="street-address" defaultValue={address.address} error={errors.address} onInput={clear("address")} />
            <div className="grid gap-3.5 sm:grid-cols-[1.3fr_1fr_0.8fr]">
              <TextField id="v-ci" name="city" label="City" autoComplete="address-level2" defaultValue={address.city} error={errors.city} onInput={clear("city")} />
              <SelectField id="v-st" name="state" label="State" autoComplete="address-level1" defaultValue={address.state} error={errors.state} onChange={clear("state")}>
                <option value="" disabled>
                  Choose
                </option>
                {usStates.map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </SelectField>
              <TextField id="v-zip" name="zip" label="ZIP" inputMode="numeric" autoComplete="postal-code" maxLength={10} defaultValue={address.zip} error={errors.zip} onInput={clear("zip")} />
            </div>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <TextField
                id="v-dob"
                name="dob"
                label="Date of birth"
                placeholder="MM / DD / YYYY"
                inputMode="numeric"
                autoComplete="bday"
                maxLength={14}
                error={errors.dob}
                onInput={(e) => {
                  e.currentTarget.value = formatDob(e.currentTarget.value);
                  clear("dob")();
                }}
              />
              <div className="relative">
                <TextField
                  id="v-ssn"
                  name="ssn"
                  type={showSsn ? "text" : "password"}
                  label="Social Security number"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={11}
                  error={errors.ssn}
                  onInput={(e) => {
                    e.currentTarget.value = formatSsn(e.currentTarget.value);
                    clear("ssn")();
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowSsn((v) => !v)}
                  aria-pressed={showSsn}
                  aria-controls="v-ssn"
                  className="absolute top-[1.7rem] right-1 grid h-11 cursor-pointer place-items-center rounded-lg px-3 text-[0.78rem] font-semibold text-brand-light hover:text-brand-soft"
                >
                  {showSsn ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <CheckField
              id="v-consent"
              name="consent"
              checked={consent}
              error={errors.consent}
              onChange={() => {
                setConsent((v) => !v);
                clear("consent")();
              }}
            >
              I authorize Opulent Financial and its credit-data provider to obtain my consumer credit report under the
              Fair Credit Reporting Act to show me my score and a credit analysis. [Final consent language — legal
              review.]
            </CheckField>
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <GhostAction onClick={() => go("details")}>Back</GhostAction>
              <PrimaryAction type="submit" aria-disabled={!consent} className="flex-1">
                Check my score
              </PrimaryAction>
            </div>
          </form>
        ) : null}

        {step === "unavailable" ? (
          <div key="unavailable" role="status" className="step-in flex flex-col items-center gap-[18px] py-4 text-center sm:py-5">
            <span className="grid size-16 place-items-center rounded-full border border-[rgba(245,165,36,0.5)] bg-[rgba(245,165,36,0.12)] text-amber">
              <Icon name="alert" size={28} />
            </span>
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl font-semibold text-balance outline-none">
              We couldn’t pull your report online
            </h2>
            <p className="max-w-[26.25rem] text-fg-3">
              Online score checks aren’t connected yet, so nothing from the verification step was sent or stored. Our
              team can pull your report with you on a quick, free call instead.
            </p>
            <PrimaryButton href="/contact?goal=analysis" block className="w-full">
              Book a free call
            </PrimaryButton>
            <GhostAction onClick={() => go("sample")} className="w-full">
              Preview a sample report
            </GhostAction>
            <button
              type="button"
              onClick={() => go("verify")}
              className="min-h-11 cursor-pointer text-sm font-semibold text-fg-3 hover:text-fg"
            >
              Back to verification
            </button>
          </div>
        ) : null}

        {step === "sample" ? (
          <div key="sample" className="step-in flex flex-col gap-[22px]">
            <div className="flex items-center justify-between gap-4">
              <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl font-semibold outline-none">
                Sample credit report
              </h2>
              <span className="rounded border border-line-5 px-2 py-0.5 font-tech text-[0.5625rem] tracking-[0.18em] text-fg-5">
                EXAMPLE
              </span>
            </div>
            <p className="-mt-2 text-[0.875rem] text-fg-4">An illustration of what your report will show — not your score.</p>
            <ScoreGauge
              score={642}
              rating="Fair"
              gradientId="sample-gauge"
              delay="0.3s"
              thickness={18}
              ratingClassName="text-brand-light"
              className="max-w-[340px]"
            />
            <dl className="flex flex-col border-t border-line-3">
              {sampleFactors.map((f) => (
                <div key={f.label} className="flex items-center justify-between gap-3 border-b border-line-3 py-3 text-[0.9rem]">
                  <dt>
                    {f.label} <span className="text-fg-5">· {f.weight}</span>
                  </dt>
                  <dd className={cn("text-[0.78rem] font-bold whitespace-nowrap", f.tone)}>{f.status}</dd>
                </div>
              ))}
            </dl>
            <PrimaryButton href="/contact?goal=analysis" block className="w-full">
              Book my free credit analysis
            </PrimaryButton>
            <Link
              href="/services/credit-optimization"
              className="flex min-h-11 items-center justify-center font-semibold text-brand-light hover:text-brand-soft"
            >
              See how Credit Optimization works
            </Link>
          </div>
        ) : null}
      </div>
      <div className="lg:hidden">{notes}</div>
    </div>
    </div>
  );
}

function Progress({ value }: { value: number }) {
  return (
    <div aria-hidden="true" className="h-1 rounded-sm bg-line-2">
      <div
        className="h-1 rounded-sm bg-[linear-gradient(90deg,#1565E6,#5CC8FF)] shadow-[0_0_10px_#2F8CFF] transition-[width] duration-700"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
