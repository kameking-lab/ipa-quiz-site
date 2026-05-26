# フェーズ12 総括 — sitemap 404 + 構造レビュー残課題 + コスト削減 (2026-05-26)

開始時 main: `a3e9662`（フェーズ11完了） / 完了時 main: `66cc2a3` → 本サマリ（#443）マージ後に更新

---

## 1. 各タスクの PR 番号・マージ SHA・実装サマリ

- ①: PR #435 / `1e42dfe` — sitemap 404 調査＋決定的解決ガード。本番サンプリング（724 URL・全7種）100% 200、
  決定的全件検証（12,653問+445試験ハブ+71トピック+153ブログ）で解決不能 0。GSC の 4,425 件 404 は
  フェーズ11以前の陳腐化 URL（再クロールで自然減）と判明。退行防止テスト + 本番 HEAD サンプラ追加。
- ②: PR #436 / `8116ae6` — 死蔵列 `StudyRecord.timeSpentMs` 削除（書き込みゼロ・常時 NULL）。DROP COLUMN
  マイグレーション。本番適用は社長作業。
- ③: PR #437 / `678106f` — AI 日次上限のサーバ/クライアント単一情報源化。サーバの env 上書きを廃止し
  定数（lib/constants/ai-quota.ts）に一本化、表示と enforcement が乖離不能に。整合テスト追加。
- ④: PR #438 / `6f6b573` — CSP nonce 化を評価し**意図的に不採用**（unsafe-inline 維持）。nonce は
  ルートレイアウトの headers() で全ページ動的化 → 12k 静的/SSG/ISR ページの TTFB・コスト悪化。
  実 XSS 面は低い。根拠を記録。
- ⑤: PR #439 / `ff75711` — /q crossExam の index 化は**不要と判明**。topicTags が全 14,402 問で空のため
  14k 走査分岐に入らず既に O(1)。推測最適化を避け revert、topicTag 投入の将来タスクと同梱が正しい順序と記録。
- ⑥: PR #440 / `6a99357` — role=radio の矢印キー roving 実装。再利用フック `useRovingRadioGroup` を
  5 radiogroup（OnboardingTour×2・CharacterSelector・MockExamLanding・settings）に適用。WCAG radio パターン適合。
- ⑦: PR #441 / `80196c7` — 純粋表示コンポーネント 4 件から `"use client"` 削除（BadgeMedallion・
  DashboardWeakness・QuestionCard・stats/ShareButtons）。残りは大半が必要のため将来送り。
- ⑧: PR #442 / `66cc2a3` — `.vercelignore` 追加。__tests__/tests/scripts/docs（＋成果物）を Vercel ビルド
  対象から除外（~115 ファイル・うち ~91 が .ts/.tsx で型チェック対象外に）。logs/ は build 読込のため維持。
- ⑨: 本サマリ（PR #443 予定 / docs）。

---

## 2. 新発見致命傷 sitemap 404 の解消結果

- **現行生成ロジックは 404 を出さない**ことを決定的に証明（全 URL を各ページの notFound 条件と同一ロジックで照合、
  解決不能 0 件）。実機サンプリングでも 724 URL 全て 200。
- GSC の 4,425 件 404（インデックス率 29.9% の主因とされた）は**過去サイトマップ由来の陳腐化 URL**
  （削除済 essays/success-stories 詳細・needsReview/placeholder 時代の問題 URL）。コードでの追加修正不要、
  再クロールで自然減。退行防止に決定的テストを常設化。
- 削除 URL 数: コード側は 0（既に列挙していない）。GSC 側の 4,425 件はクロール完了で減少見込み。

## 3. 構造レビュー残課題 6 件の対応状況 → 6/6 対応（内訳: 修正3・記録2・部分1）

- I-2 timeSpentMs 死蔵列 → ② **修正**（列削除）。
- A-2 サーバ/クライアント AI 上限乖離 → ③ **修正**（単一情報源化）。
- F-1 role=radio roving → ⑥ **修正**（全 5 radiogroup）。
- D-1 CSP unsafe-inline → ④ **評価し意図的に維持**（nonce は全ページ動的化でコスト悪化・記録）。
- C-1 /q crossExam 全走査 → ⑤ **moot と判明**（topicTags 全空で走査未発生・記録）。
- A-4/C-2 use client 削減 → ⑦ **部分対応**（純粋 4 件。残りは要 client のため将来）。

## 4. コスト削減 同梱箇所

- ⑧ `.vercelignore`: dev 専用 ~115 ファイル（うち ~91 .ts/.tsx）を Vercel ビルド対象外に。型チェック処理＋
  アップロードを削減（除外時ビルドの正常コンパイルをローカルシミュレーションで確認）。
- ③: サーバ rate-limit の env 上書き層を撤去（読み取り 1 経路化・微小）。
- ⑦: 純粋 4 コンポーネントの client→server 化（server-import 時に client バンドル削減）。
- ⑤: 不要な index 追加を回避（推測最適化禁止に従いコード増を抑制）。
- 既存の良好設定を確認: `productionBrowserSourceMaps: false`、`experimental.optimizePackageImports`、
  `poweredByHeader: false`、`compress: true`。新規の推測最適化は追加せず。

## 5. ビルド時間/サイズ

- ローカル `next build`: 約 15〜17 秒（タスク全体で安定、回帰なし）。静的ページ生成数は不変域。
- `.vercelignore` による Vercel ビルド時間短縮は本番デプロイ後に観測（型チェック対象 ~91 ファイル減＋
  アップロード ~115 ファイル減）。ローカルでは除外シミュレーションでコンパイル成功を確認済。
- バンドルサイズ: ⑦ で 4 コンポーネントが server 化（server-import 経路で client バンドル減）。大規模測定は未実施
  （計測根拠なしの推測最適化禁止に従い、明確な箇所のみ）。

## 6. 全フェーズ累計 PR 本数（1〜12）

- 通算 PR 発番: #443 まで（フェーズ12 は #435〜#443 の 9 本）。
- すべて squash マージ・feature ブランチ削除済み。`phase12-alive` は完了時削除予定。

## 7. 研ぎ澄まし完成度の再評価（7.5割 → ?）

- **コード/構造の制御可能領域: 約 8.5 割**。構造レビュー残課題を全件処理（修正/記録/部分）、新発見
  sitemap 404 は「現行コードは無害・GSC は陳腐化」と決定的に切り分け、退行防止を常設化。
- **競争ポジション（ブランド検索・インデックス率）: 依然として時間/SEO 依存**。インデックス率 29.9% の主因は
  「実在しない URL 列挙」ではなく**過去 URL の残存＋クロール時間**と判明（コード起因ではない）。
- **ならし評価: 約 8 割**。コード健全性は着実に向上。残るのはブランドシグナル（被リンク・権威性）と
  クロール待ちという非コード要因。
- 重要な発見: フェーズ12 の 2 つの「致命傷/残課題」（sitemap 404・crossExam 14k 走査）は**実測の結果、
  現行コードでは発生していなかった**。コードレビューの理論的指摘を実測で検証する姿勢が、過大な修正を防いだ。

## 8. インデックス率改善見込み（29.9% → ?、GSC 観測待ち）

- 現行サイトマップは 404 ゼロ（決定的検証済）。GSC が再クロールすれば 4,425 件の陳腐化 404 が脱落し、
  「検出 - インデックス未登録」「404」カテゴリが縮小、インデックス率は機械的に改善する見込み。
- 理論上の到達点は published 12,653 問の大半（目標 70%+）だが、最終的には Google のクロール予算・
  ドメインオーソリティに依存。コード側の阻害要因は解消済。

## 9. 残課題・社長作業・フェーズ13 方針

社長作業:
- ② `20260527000000_remove_timespentms` を Neon 本番 DB に適用（prisma migrate deploy）。
- ① GSC でサイトマップ再送信＋主要 URL 再クロール申請、4,425→の 404 減少を 2〜4 週観測
  （手順: logs/sitemap-validation-2026-05-26.md, logs/gsc-recache-instructions.md）。
- Turnstile 本番有効化（フェーズ11 から継続・logs/turnstile-deployment-2026-05-26.md）。

フェーズ13 候補（コード）:
- topicTags の投入（topic-tagger 実行）。投入時に /q crossExam の index 化を同梱（⑤）。これにより
  #tag リンク・関連トピック表示・AI 前提知識整理も初めて機能する。
- use client のさらなる削減（A-4/C-2 の残り、要 client 判定の精査）。

フェーズ13 候補（非コード・本質課題）:
- 被リンク獲得・PR・E-E-A-T 強化（指名検索でのブランド勝利・インデックス率の根本要因）。
