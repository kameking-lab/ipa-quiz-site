# TTFB 最適化ロードマップ（個別問題ページ /q/*）— 2026-05-23

> 致命傷⑤（激辛レビュー C-6）対応。競合「過去問道場」TTFB ≈ 51ms に対し、
> 過去問AI の /q/* は 540〜806ms（実測、レビュー時点）。約 16 倍遅い。

## 1. 現状アーキテクチャの把握

- `/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx`:
  - `export const dynamicParams = true`
  - `export const revalidate = 86400`（24h ISR）
  - `generateStaticParams` は **2024 年以降のみ** SSG（`SSG_MIN_YEAR = 2024`）。
    それ以前（約 1 万ページ）は **オンデマンド ISR**。
- データはすべてビルド時バンドルの **インメモリ配列**（`ALL_QUESTIONS`）。
  外部 DB / API への fetch は無く、ネットワーク waterfall は存在しない。
  → 「初期データ取得の並列化」は該当なし（ボトルネックではない）。

## 2. ボトルネックの切り分け

TTFB の内訳は概ね次の 3 層:

1. **CDN エッジ配信（最速・~50ms 級）**: SSG 済み or ISR キャッシュヒット時。
   競合の 51ms はこの層（全ページ静的配信）と推定。
2. **ISR キャッシュミス時のサーバレス再生成**: 2024 年より前のページの初回アクセス・
   revalidate 後の初回アクセスはここに落ちる。サーバレスのコールドスタート +
   ページレンダリングのレイテンシがユーザーに渡る。**540〜806ms の主因はここ**。
3. **レンダリング CPU**: 1 リクエストあたり `ALL_QUESTIONS`（~14k）を複数回走査
   （問題解決 ×2、sessionPool、related、otherYears、crossExam）。
   実測で数 ms 規模であり主因ではないが、サーバレス層の総時間に上乗せされる。

結論: **支配項はインフラ層（2）**。コードの CPU 最適化（3）は寄与が小さい。
ただしレンダリングを軽くすればミス時の再生成時間は確実に縮む。

## 3. 本フェーズで実施した低リスク改善（コード）

PR `perf/ttfb-optimization-question-pages`:

- **O(1) ルート索引**（`lib/seo/question-url.ts`）: `findQuestionByRoute` を線形走査
  から `Map` 索引に変更。`generateMetadata` と本体で 2 回走査していた解決処理を
  プール単位（`ALL_QUESTIONS` の配列同一性で WeakMap キャッシュ）に索引化し、
  2 回目以降を O(1) に。
- **同一試験リストの走査範囲縮小**: `sessionPool` / `related` / `otherYearsSameCategory`
  を全 14k 走査から、事前グルーピング済みの `QUESTIONS_BY_EXAM[exam]`（数百〜数千）に
  限定。結果は完全同一（いずれも `x.exam === q.exam` を必須条件にしていたため）。
  `crossExamByTopic` は他試験横断のため `ALL_QUESTIONS` 走査を維持。
- これらは挙動不変・回帰なし。レンダリング CPU を削減し、ISR ミス時の再生成時間を短縮。

## 4. 200ms 以下を達成するための段階ロードマップ（インフラ）

コードのみでは支配項（2）に届かない。以下を順に検討:

- **段階 A（推奨・次PR候補）**: 主要トラフィックの年度を SSG 対象に拡大。
  `SSG_MIN_YEAR` を 2024 → 2020 等へ段階的に下げ、アクセスの多い直近年度を
  ビルド時プリレンダリングして CDN 配信（層 1）に載せる。
  トレードオフ: ビルド時間・メモリ増。OG 画像生成は V8 コールスタック制約があるため
  `opengraph-image.tsx` 側のオンデマンド維持は継続。まず 1〜2 年分追加で計測。
- **段階 B**: ISR の `revalidate` は 86400 のまま、`Cache-Control` / CDN の
  `stale-while-revalidate` を活用し、再生成中も古い静的 HTML をエッジから即時配信。
  Vercel の ISR は既定で SWR 的挙動だが、ヘッダ最適化で初回以外のミス体感を縮める。
- **段階 C**: 低頻度の古い年度はオンデマンドのまま許容（コスト最適）。
  GSC / Vercel Analytics の人気 URL を定期的に SSG 集合へ昇格させる運用。
- **段階 D（計測前提）**: Vercel Speed Insights で /q/* の TTFB 分布（p75/p95）を
  キャッシュヒット / ミス別に観測し、A の効果を定量評価してから恒久設定を決める。

## 5. 計測の次アクション

- Vercel Speed Insights で /q/* の TTFB を「静的 / ISR」別に分離計測。
- 段階 A を 1 年分（2023）で試行 → ビルド時間とミス率の変化を比較 → 横展開可否を判断。

## 付記

本フェーズの PR は「研ぎ澄まし（削除・統合・修正）」の範囲で、挙動を変えずに
レンダリングを軽量化するに留める。SSG 範囲拡大（段階 A）はビルド構成の変更を伴うため、
計測に基づき別 PR で段階適用する。
