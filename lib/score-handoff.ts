import type { ScoreDetails } from "./validation";

/**
 * Carries step-one details (name, email, phone) from the home-page form into the score-check flow.
 * Stored in sessionStorage only — never in the URL — and never includes identity data.
 */

const KEY = "of-score-details";

type Stored = ScoreDetails & { handoff: boolean };

export function saveScoreDetails(details: ScoreDetails): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ ...details, handoff: true } satisfies Stored));
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the flow then starts at step one.
  }
}

export function takeScoreDetails(): { details: ScoreDetails; handoff: boolean } | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Stored>;
    const details: ScoreDetails = {
      firstName: String(parsed.firstName ?? ""),
      lastName: String(parsed.lastName ?? ""),
      email: String(parsed.email ?? ""),
      phone: String(parsed.phone ?? ""),
    };
    if (parsed.handoff) sessionStorage.setItem(KEY, JSON.stringify({ ...details, handoff: false }));
    return { details, handoff: Boolean(parsed.handoff) };
  } catch {
    return null;
  }
}

export function clearScoreDetails(): void {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // Nothing to clear.
  }
}
