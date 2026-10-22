import type { CSSProperties } from "react";

/** Inline style for staggering entrance animations. */
export function delay(seconds: number): CSSProperties {
  return { animationDelay: `${seconds}s` };
}
