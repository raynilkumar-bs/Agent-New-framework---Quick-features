export type SsoCheckResult =
  | { type: "single"; provider: "google" | "sutter" }
  | { type: "multiple"; providers: ("google" | "microsoft")[] }
  | { type: "none" };

/**
 * Demo SSO routing (ported from Implementssologinflow). Test emails:
 * - google@gmail.com → Google mock
 * - try@sutterhealth.com → Sutter mock
 * - gm@gmail.com → multiple providers (Google + Microsoft)
 * - nosso@gmail.com → no SSO (password)
 * - anything else → password
 */
export function checkEmailSSO(email: string): SsoCheckResult {
  const normalized = email.toLowerCase().trim();
  if (normalized === "google@gmail.com") return { type: "single", provider: "google" };
  if (normalized === "try@sutterhealth.com") return { type: "single", provider: "sutter" };
  if (normalized === "gm@gmail.com")
    return { type: "multiple", providers: ["google", "microsoft"] };
  if (normalized === "nosso@gmail.com") return { type: "none" };
  return { type: "none" };
}
