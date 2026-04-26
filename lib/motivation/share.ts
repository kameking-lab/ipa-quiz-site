export interface ShareOgParams {
  type: "streak" | "session" | "badge";
  title?: string;
  streak?: number;
  accuracy?: number;
  count?: number;
  badge?: string;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ipa-quiz-site.vercel.app";

export function buildOgImageUrl(params: ShareOgParams): string {
  const u = new URL(`${BASE_URL}/api/og`);
  u.searchParams.set("type", params.type);
  if (params.title) u.searchParams.set("title", params.title);
  if (params.streak !== undefined) u.searchParams.set("streak", String(params.streak));
  if (params.accuracy !== undefined) u.searchParams.set("accuracy", String(params.accuracy));
  if (params.count !== undefined) u.searchParams.set("count", String(params.count));
  if (params.badge) u.searchParams.set("badge", params.badge);
  return u.toString();
}

export function buildXShareUrl(text: string, url: string): string {
  const u = new URL("https://twitter.com/intent/tweet");
  u.searchParams.set("text", text);
  u.searchParams.set("url", url);
  return u.toString();
}

export function buildLineShareUrl(text: string, url: string): string {
  return `https://line.me/R/msg/text/?${encodeURIComponent(`${text}\n${url}`)}`;
}

export function buildSessionText(p: { count: number; accuracy: number }): string {
  return `📚 IPA Quiz セッション完了！${p.count}問・正答率${p.accuracy}% #IPA過去問 #IPA_Quiz`;
}

export function buildStreakText(p: { streak: number; count: number }): string {
  return `🔥 IPA Quiz ${p.streak}日連続学習中！累計${p.count}問解きました #IPA過去問 #IPA_Quiz`;
}

export function buildBadgeText(p: { name: string; days: number }): string {
  return `🏆 IPA Quiz「${p.name}」バッジ獲得！${p.days}日継続達成 #IPA過去問 #IPA_Quiz`;
}
