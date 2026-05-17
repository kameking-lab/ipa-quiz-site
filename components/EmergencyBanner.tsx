/**
 * Emergency banner shown at the top of every page during incidents.
 * Controlled entirely by the NEXT_PUBLIC_EMERGENCY_BANNER_MESSAGE env variable.
 * Empty string or unset = banner hidden.
 *
 * Usage (Vercel Dashboard > Settings > Environment Variables):
 *   NEXT_PUBLIC_EMERGENCY_BANNER_MESSAGE=AIコパイロットを一時停止中です。クイズ機能は通常通りご利用いただけます。
 * To dismiss: delete the env var or set it to empty string, then redeploy.
 */

const message = process.env.NEXT_PUBLIC_EMERGENCY_BANNER_MESSAGE ?? "";

export function EmergencyBanner() {
  if (!message.trim()) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className="w-full bg-destructive px-4 py-2.5 text-center text-sm font-medium text-destructive-foreground print:hidden"
    >
      <span className="mr-1.5" aria-hidden="true">
        ⚠️
      </span>
      {message}
    </div>
  );
}
