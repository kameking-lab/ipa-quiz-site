/**
 * Emergency kill switches for disaster recovery.
 * All flags default to ON (false = not killed).
 * To disable a feature, set the corresponding env variable to "false" in Vercel Dashboard
 * and trigger a redeploy — or use the GEMINI_API_KEY removal shortcut for AI features.
 *
 * Usage:
 *   import { getFeatureFlags } from "@/lib/admin/feature-flags";
 *   const flags = getFeatureFlags();
 *   if (!flags.AI_COPILOT_ENABLED) return 503;
 */

export interface FeatureFlags {
  /** AI copilot streaming endpoint. Kill switch: set KILL_AI_COPILOT=true */
  AI_COPILOT_ENABLED: boolean;
  /** Search / filter functionality. Kill switch: set KILL_SEARCH=true */
  SEARCH_ENABLED: boolean;
  /** Quiz play feature. Kill switch: set KILL_QUIZ=true (nuclear option) */
  QUIZ_ENABLED: boolean;
  /** Blog pages. Kill switch: set KILL_BLOG=true */
  BLOG_ENABLED: boolean;
  /** Afternoon (午後) question feature. Kill switch: set KILL_AFTERNOON=true */
  AFTERNOON_ENABLED: boolean;
}

function parseBoolEnv(key: string, defaultValue: boolean): boolean {
  const raw = process.env[key];
  if (raw === undefined || raw === "") return defaultValue;
  return raw.toLowerCase() !== "true";
}

/**
 * Returns current feature flag state from environment variables.
 * All flags are ON by default; set the env var to "true" to KILL the feature.
 * Called per-request in server components / API routes.
 */
export function getFeatureFlags(): FeatureFlags {
  return {
    AI_COPILOT_ENABLED: parseBoolEnv("KILL_AI_COPILOT", true),
    SEARCH_ENABLED: parseBoolEnv("KILL_SEARCH", true),
    QUIZ_ENABLED: parseBoolEnv("KILL_QUIZ", true),
    BLOG_ENABLED: parseBoolEnv("KILL_BLOG", true),
    AFTERNOON_ENABLED: parseBoolEnv("KILL_AFTERNOON", true),
  };
}

/**
 * Quick check — true when AI copilot should serve requests.
 * Also checks GEMINI_API_KEY presence as a secondary gate.
 */
export function isAiCopilotEnabled(): boolean {
  const flags = getFeatureFlags();
  return flags.AI_COPILOT_ENABLED && Boolean(process.env.GEMINI_API_KEY);
}
