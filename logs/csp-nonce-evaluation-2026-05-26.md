# CSP `script-src 'unsafe-inline'` の nonce 化評価 (2026-05-26)

構造レビュー D-1: CSP の `script-src` に `'unsafe-inline'` が残存。nonce 化の評価結果と決定。

## 結論（先に）

**nonce 化は本サイトには不適切。`'unsafe-inline'` を維持する**（evidence-based の意図的判断・実装見送り）。
理由は「nonce 化が全ページを動的レンダリングへ強制し、12,000 超の静的/SSG/ISR ページの TTFB と
コストを著しく悪化させる」ため。これは本フェーズのコスト削減目標およびフェーズ11 の TTFB 改善と真逆。

## 調査（事実）

1. ルートレイアウト `app/layout.tsx` は現状 `headers()`/`cookies()` を使わず**静的レンダリング互換**。
   ビルド出力で `/`・`/q/*` は ○（static）/●（SSG）/ ISR。
2. nonce はリクエストごとに生成し、レイアウトで `headers().get('x-nonce')` 経由で各インライン script に付与する
   必要がある。`headers()` をルートレイアウトで呼ぶと **そのレイアウト配下＝全ページが動的レンダリング**になる
   （Next.js App Router の仕様）。→ 12k 問題ページを含む全ページが ƒ（dynamic）化し、CDN 静的配信を失う。
3. ハッシュ方式（`'sha256-...'`）は **不可**:
   - 実行されるインライン script はテーマ bootstrap（静的・ハッシュ可）に加え、Next.js ランタイムが
     注入する hydration/flight 用インライン script（ページごとに内容可変・ハッシュ不能）がある。
   - さらに CSP3 ブラウザは「nonce/hash が存在すると `'unsafe-inline'` を無視」する仕様のため、
     ハッシュを足して `'unsafe-inline'` を残すと、ハッシュ未付与の Next ランタイム script が**ブロックされ
     サイトが壊れる**。よってハッシュ併用も危険。

## リスク評価（'unsafe-inline' 維持の妥当性）

- 実際の XSS 注入点は検出されていない。`dangerouslySetInnerHTML` は 2 箇所のみ:
  - `app/layout.tsx`: テーマ bootstrap（**静的定数**・ユーザー入力なし）。
  - `components/seo/JsonLd.tsx`: JSON-LD（`<` を `<` にエスケープ済・データであり実行されない）。
- ユーザー入力をインライン script に展開する箇所はゼロ。
- 既存 CSP は他が強固: `object-src 'none'`・`base-uri 'self'`・`frame-ancestors 'none'`・
  `form-action 'self'`・`upgrade-insecure-requests`・厳格な `connect-src`/`img-src` allowlist。
- したがって `'unsafe-inline'`（script-src）残存の残余リスクは低く、nonce 化のコスト（全ページ動的化）に見合わない。

## 決定

- `next.config.ts` の CSP は現状維持（`script-src 'unsafe-inline'`）。
- 将来、サイトが動的レンダリング主体へ移行する場合に限り nonce 化を再評価する。
- `style-src 'unsafe-inline'` も同様（Tailwind/React のインラインスタイルに必須・nonce 化非現実的）。

## 補足（やってはいけないこと）

- 静的サイトのまま script-src にハッシュ/nonce を足して `'unsafe-inline'` を残す → CSP3 で
  `'unsafe-inline'` 無効化され Next ランタイム script がブロック → 本番障害。実施しないこと。
