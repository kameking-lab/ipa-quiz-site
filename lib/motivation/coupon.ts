import { LS_KEYS } from "@/lib/storage/keys";

export interface CouponState {
  code: string;
  issuedAt: number;
  redeemed: boolean;
  source: "streak-30";
}

const COUPON_PREFIX = "STREAK30-";
const VALID_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function read(): CouponState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LS_KEYS.premiumCoupon);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CouponState>;
    if (typeof parsed.code !== "string" || !parsed.code.startsWith(COUPON_PREFIX)) return null;
    return {
      code: parsed.code,
      issuedAt: typeof parsed.issuedAt === "number" ? parsed.issuedAt : Date.now(),
      redeemed: !!parsed.redeemed,
      source: parsed.source === "streak-30" ? "streak-30" : "streak-30",
    };
  } catch {
    return null;
  }
}

function write(c: CouponState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.premiumCoupon, JSON.stringify(c));
  } catch {
    // ignore
  }
}

function generateCode(): string {
  let body = "";
  for (let i = 0; i < 8; i++) {
    body += VALID_CHARS[Math.floor(Math.random() * VALID_CHARS.length)];
  }
  return `${COUPON_PREFIX}${body}`;
}

export function getCoupon(): CouponState | null {
  return read();
}

export function ensureCouponForStreak(currentStreak: number, longestStreak: number): {
  state: CouponState | null;
  newlyIssued: boolean;
} {
  const existing = read();
  if (existing) {
    return { state: existing, newlyIssued: false };
  }
  const peak = Math.max(currentStreak, longestStreak);
  if (peak < 30) return { state: null, newlyIssued: false };

  const issued: CouponState = {
    code: generateCode(),
    issuedAt: Date.now(),
    redeemed: false,
    source: "streak-30",
  };
  write(issued);
  return { state: issued, newlyIssued: true };
}

export function markRedeemed(): void {
  const cur = read();
  if (!cur) return;
  write({ ...cur, redeemed: true });
}

export function clearCoupon(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(LS_KEYS.premiumCoupon);
  } catch {
    // ignore
  }
}

export function describeCoupon(c: CouponState): string {
  return `30日連続学習達成記念。プレミアム1週間無料 (${c.code})`;
}
