# フェーズ11 総括 — 激辛統合対応（致命傷10 + 即修正12 + 構造レビュー20）2026-05-26

> 背景: 構造的激辛レビュー（CLI, 2026-05-23）「実勢7.5割」→ 実機激辛レビュー（Chrome, 2026-05-26）で
> 6.5〜7割へ下方修正。「Phase10で全部潰した」は事実誤認。本フェーズで致命傷・即修正・構造的負債を潰す。

開始時 main: `d1c54cb`（構造レビュー保存後）
完了時 main: `8fef92b` → 本サマリ（#434）マージ後に更新

---

## 1. 各タスクの PR 番号・マージ SHA・実装サマリ

- ①: PR #418 / `c290a02` — 実機激辛レビューを `logs/ipa-quiz-site-empirical-spicy-review-2026-05-26.md` に逐語保存。
- ②: PR #419 / `287db1c` — 解説 vs 公式正解の整合性監査。全 14,402 問走査で真の矛盾 2 件（ap-2025h-am-q1, fe-2013a-am-q5。残り 6 件は誤検知）を検出・修正。`validate:questions` に dispute hard-fail ゲート + 検出器 + テスト追加。
- ③: PR #420 / `eee4ff3` — 公称問題数の真の単一情報源化。`getQuestionsByExamStrict` を indexable 基準に統一し、全 displayed カウントが published 総数（12,653）に一致。raw/stale リテラル混入禁止の回帰テスト + GSC 再クロール手順。
- ④: PR #421 / `21b826e` — `/feedback` 404 を `/contact?type=error` へ永続リダイレクト。実機で 308→200 確認。E2E テスト追加。
- ⑤: PR #422 / `0c501a6` — Cloudflare Turnstile を `/contact` フォーム + `/api/contact` に実配線（fail-open）。CSP に challenges.cloudflare.com 追加。**本番有効化は社長作業（鍵登録）**。
- ⑥: PR #423 / `c76033d` — Basic-auth 保護の `/admin` インデックスページ追加（bare /admin の 404/エラー解消）。404/error ページは既存・スタイル済みを確認。
- ⑦: PR #424 / `9578ba4` — 学習カレンダーセルに min 24px のタップターゲット下限を付与（WCAG 2.5.8）。フッターは既達を確認。
- ⑧: PR #425 / `d910ba2` — 死蔵 `ipa-quiz:onboarded:v1` の migration/read-on-write を削除し、cleanup で既存ユーザーから除去。`kakomon-ai-onboarding-v1` は現役（selectedExam）のため維持。
- ⑨: PR #426 / `0ee14fe` — AiContentNotice の二重 ⚠️ を解消（見出し絵文字を削除し lucide アイコン 1 個に）。
- ⑩: PR #427 / `7759a94` — セキュリティヘッダ監査。`X-Powered-By` は既に抑制済（実機確認）。`Server: Vercel` は Vercel エッジ仕様で除去不可と記録。
- ⑪: PR #428 / `62b0966` — pnpm overrides を `pnpm-workspace.yaml` へ移動（pnpm 10 が package.json の pnpm フィールドを無視していた件）。security pin 復活、audit 脆弱性 0 維持。
- ⑫: PR #429 / `bcf2bb3` — `StudyRecord @@unique(userId, questionId, answeredAt)` + dedup マイグレーション。`skipDuplicates` の no-op を解消。**本番 DB 適用は社長作業**。
- ⑬: PR #430 / `9cb1827` — CLAUDE.md の「1日30回」→ 実装値（初回10・FB後ほぼ無制限）、アフィリエイト env 名修正。.env.example を `AUTH_SECRET`（v5）+ 運用 env 追記。
- ⑭: PR #431 / `4918e78` — 死蔵コード削除（WelcomeModal 192行 + 未参照 export 4 件）。
- ⑮: PR #432 / `36394bd` — noindex の success-stories/essays 6 ページから JSON-LD 削除（Google が無視する無駄バイト）。
- ⑯: PR #433 / `8fef92b` — 孤児 sitemap ルート 2 本削除 + 固定 lastmod の動的化（ビルド日 / per-question lastUpdated）。
- ⑰: 本サマリ（PR #434 予定 / docs）。

---

## 2. 致命傷 10 件（実機レビュー TOP10）の対応状況 → 8/10 コード対応、2 件は非コード領域

1. 指名検索「過去問AI」でブランド負け（F-2） → **未対応（コード外）**。被リンク・ドメインオーソリティ・E-E-A-T の領域。SEO 技術修正では突破不可。フェーズ12 以降の PR/被リンク戦略。
2. AI解説と公式正解の矛盾（F-1） → ② 対応。
3. 公称問題数3バージョン（C-4/F-6） → ③ 対応（コード統一）。SERP の旧値はクロール待ち（GSC 手順記録）。
4. フィードバック二重配線 / 誤り報告404（A-1） → ④ 対応。
5. Turnstile不在（A-2） → ⑤ 対応（コード）。**本番有効化は社長作業**。
6. /admin エラーページ（#6） → ⑥ 対応。
7. タップターゲット8px（F-3） → ⑦ 対応。
8. インデックス率32%（B-2） → **部分対応（時間依存）**。sitemap 整理（⑯）+ GSC 再申請（③）で促進するが、本質はクロール時間。コードでは即時改善不可。
9. 死蔵 localStorage キー（#9/E-2） → ⑧ 対応。
10. /feedback 404（#10） → ④ 対応（#4 と同一）。

## 3. 即修正 12 件（改善優先度マトリクス）の対応状況 → 10/12 コード対応

①AI解説矛盾=②、②Turnstile=⑤、③誤り報告404=④、④公称数統一=③、⑤/admin・error=⑥、
⑥タップターゲット=⑦、⑦localStorage=⑧、⑧AI警告アイコン=⑨、⑨Server header=⑩（X-Powered-By抑制済・Serverは制約）。
残 ⑩被リンク/PR・⑪インデックス率向上 は非コード/時間依存（フェーズ12 方針）。⑫SERPキャッシュ更新=GSC手順（③）。

## 4. 構造レビュー20件指摘の対応状況 → 約12/20

対応済: H-2(pnpm overrides=⑪)、I-1(StudyRecord unique=⑫)、B-1/B-4(死蔵コード=⑭)、E-2(孤児sitemap=⑯)、
E-3(noindex JSON-LD=⑮)、E-5(固定lastmod=⑯)、G-1/G-2(CLAUDE.md=⑬)、A-3(.env AUTH_SECRET=⑬)、
A-1/B-3(feedback二重配線・/feedback=④、turnstile復活=⑤)、A-5(LSキー衝突は別件、⑧で死蔵キー除去)、H-1(next-auth beta=記録)。
未対応（フェーズ12 候補）: I-2(timeSpentMs 死蔵列・write 未実装)、A-2(サーバ/クライアント AI 上限の env 乖離)、
A-4/C-2(use client 128 の削減)、F-1(role=radio の矢印キー roving)、C-1(/q の crossExamByTopic 全走査)、
D-1(CSP 'unsafe-inline' の nonce 化)。

---

## 5. 全フェーズ累計 PR 本数（1〜11）

- 通算 PR 発番: #434 まで（フェーズ11 は #418〜#434 の 17 本）。
- フェーズ11 内訳: コード変更 PR 12 本 + docs 単独 PR 5 本（①⑩⑬⑰ + 構造レビュー#417）。
- すべて squash マージ・feature ブランチ削除済み。`phase11-alive` マーカーは完了時に削除予定。

## 6. 研ぎ澄まし完成度の再評価（6.5〜7割 → ?）

- **コード/構造の制御可能領域: 約 8〜8.5 割**。致命傷のコード起因分（解説矛盾・問題数・404・Turnstile 配線・/admin・
  タップターゲット・死蔵キー・依存 pin・DB 一意制約）をほぼ解消。
- **競争ポジション（ブランド検索・インデックス率）: 不変、3〜4 割**。これはコードでなく被リンク・ドメイン
  オーソリティ・クロール時間の関数。フェーズ11 のスコープ外。
- **ならし評価: 約 7.5 割**（コード健全性は上がったが、競合との本質差＝ブランドシグナルは未着手）。
  「全部潰した」と言える状態ではない。コード起因の致命傷は潰したが、ビジネス起因（SEO 権威性）が残る。

## 7. 社長作業が必要な項目（コードでは完了できない）

1. **Turnstile 本番有効化**（⑤）: Cloudflare で鍵発行 → Vercel env（`NEXT_PUBLIC_TURNSTILE_SITE_KEY` /
   `TURNSTILE_SECRET_KEY`）登録 → 再デプロイ。手順: `logs/turnstile-deployment-2026-05-26.md`。
2. **StudyRecord マイグレーション本番適用**（⑫）: Neon 本番 DB に `20260526000000_studyrecord_unique` を deploy。
3. **GSC 再クロール**（③）: sitemap 再送信 + 主要 URL のインデックス登録リクエスト。手順:
   `logs/gsc-recache-instructions.md`。SERP の旧「14,402問」更新と公称数反映のため。
4. **被リンク・PR 戦略**（F-2, ビジネス施策）: 指名検索でのブランド勝利はコード外。外部発信・被リンク獲得が必要。

## 8. 残課題とフェーズ12 以降の推奨方針

優先度高（コード）:
- I-2 timeSpentMs: 計測の実装 or 列削除（現状は常に null をエクスポート）。
- A-2 サーバ/クライアント AI 上限の env 同期（表示と enforcement の乖離防止）。
- D-1 CSP `'unsafe-inline'` の nonce 化（XSS 耐性）。

優先度中（コード）:
- C-1 /q の crossExamByTopic 全走査の index 化（TTFB）。
- F-1 role=radio の矢印キー roving（a11y パターン適合）。
- A-4/C-2 use client 128 の段階削減（バンドル/SSR）。

優先度高（非コード・ビジネス）:
- 被リンク獲得・PR・E-E-A-T 強化（指名検索・インデックス率の本質課題）。
- GSC/Speed Insights で SEO 効果（インデックス率 32%→目標 70%、CTR、リッチリザルト）を 2〜4 週観測。
