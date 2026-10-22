"use client";

import { useEffect } from "react";
import { GhostButton, PrimaryAction } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section aria-labelledby="error-title" className="container-x flex min-h-[60vh] items-center justify-center py-20">
      <div className="flex max-w-[34rem] flex-col items-center gap-5 text-center">
        <span className="grid size-16 place-items-center rounded-full border border-[rgba(245,165,36,0.5)] bg-[rgba(245,165,36,0.12)] text-amber">
          <Icon name="alert" size={28} />
        </span>
        <h1 id="error-title" className="t-h2-sm">
          Something went wrong.
        </h1>
        <p className="text-fg-3">This page hit an unexpected error. Try again, or head back to the home page.</p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
          <PrimaryAction onClick={reset}>Try again</PrimaryAction>
          <GhostButton href="/">Back to home</GhostButton>
        </div>
      </div>
    </section>
  );
}
