import { SITE_BASE_URL } from "./config";

/**
 * IndexNow キーは ENV INDEXNOW_KEY で設定する。
 * 値はランダム 8〜128 文字の英数字（IndexNow 仕様）。
 * https://www.indexnow.org/documentation
 */
export function getIndexNowKey(): string | null {
  const k = process.env.INDEXNOW_KEY?.trim();
  return k && /^[a-z0-9-]{8,128}$/i.test(k) ? k : null;
}

/**
 * 検証用の key file の中身。サイト直下に key.txt として配信し、
 * 内容は key 文字列のみ。
 */
export function getIndexNowKeyFileContent(): string | null {
  return getIndexNowKey();
}

interface IndexNowResult {
  ok: boolean;
  status?: number;
  reason?: string;
}

/**
 * 単一/複数 URL を IndexNow にプッシュする。
 * fail-soft: ネットワーク失敗・キー未設定時も throw せず { ok: false } を返す。
 */
export async function pingIndexNow(
  urls: string[],
  endpoint: string = "https://api.indexnow.org/indexnow",
): Promise<IndexNowResult> {
  const key = getIndexNowKey();
  if (!key) return { ok: false, reason: "no-key" };
  if (urls.length === 0) return { ok: false, reason: "empty" };

  const host = new URL(SITE_BASE_URL).host;
  const body = JSON.stringify({
    host,
    key,
    keyLocation: `${SITE_BASE_URL}/indexnow-key.txt`,
    urlList: urls.slice(0, 10000),
  });

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body,
    });
    return { ok: res.ok, status: res.status };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : String(e) };
  }
}
