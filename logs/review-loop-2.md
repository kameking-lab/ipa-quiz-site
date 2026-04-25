# Loop 2 — 激辛レビュー（齋藤ナオ・厳格モード）
日時: 2026-04-26 / 開始コミット: 78453ad（Loop 1 push 後）

## Phase 1: 過去ループ修正の再検証
Loop 1 修正のうち、layout.tsx / ExamCategoryGrid.tsx は parallel worktree が同時進行で同じ問題を解決済（より良いバージョンで）→ rebase で取り込み済。
最終 origin/main 上の Loop 1 修正は app/page.tsx, app/modes/year/page.tsx 2 ファイルの description のみが残存。

ローカル build / typecheck 両方クリーン。Vercel デプロイは進行中（本ループの prod 検証時はまだ反映前 = description 旧値）。

## Phase 2: Critical（即修正）

### C2-1. ホームページの OG 画像が **0 byte** で生成失敗
**実測**:
```
$ curl -sI https://ipa-quiz-site.vercel.app/opengraph-image
HTTP/1.1 200 OK
Content-Type: image/png
Content-Length: 0       ← 0 バイト!
```
- 質問詳細ページの OG (`/q/.../opengraph-image`) は 96,913 バイトで正常生成
- ホームページの OG だけが 0 バイト → SNS シェア時に画像なし
- 原因（コード読解）: `app/opengraph-image.tsx` が
  - `runtime = "edge"` 指定（質問ページ版は node 既定で動作）
  - flex コンテナ内で `<br />` 利用（satori が flex+br で silent fail する既知パターン）

**修正**:
- `runtime = "edge"` を削除（node 既定へ）
- `<br />` を `display:flex; flex-direction:column` + `<span>` 2 行に置換
- ローカル dev で 85,316 バイト の正常 PNG を確認済

### C2-2. （調査結果）他に Critical 該当なし
全エンドポイント HTTP ステータス: privacy/terms/operator/commerce/faq/about/pricing 全て 200。`/api/copilot` 405（POST のみ受付・正常）、`/admin/stats` 401（認証要・正常）、`/api/auth/session` 200。

## Phase 3: Major（記録のみ）
### M2-1. CLAUDE.md の無料枠回数が古い（30/日 → 実装は 50/日）
- `lib/rate-limit/server.ts:BETA_DAILY_LIMIT = parseLimit(process.env.BETA_DAILY_LIMIT, 50)`
- CLAUDE.md §9: 「AI コパイロット: 1 日 30 回」
- FAQ・実装は 50/日で整合、CLAUDE.md のみ古い → major-issues.md に記録

## Phase 4: Minor（即修正）
### N2-1. FAQ Q1 「現在は応用情報（AP）400問を中心に」が古い
- `app/faq/page.tsx:41`
- 実態は 13 試験 12,162 問
- 修正: 「合計 12,000 問超を AI コパイロット付きで学習」へ

### N2-2. FAQ Q5 「端末間での同期は現在サポートしていません」が古い
- `app/faq/page.tsx:61`
- PR #61 で /account 経由のクラウド同期実装済
- 修正: ログイン時はクラウド同期される旨に書き直し

### N2-3. FAQ Q6 「将来的にはクラウド同期・エクスポート機能を提供予定」が古い
- `app/faq/page.tsx:66`
- 同上（クラウド同期は実装済）

### N2-4. FAQ Q9 「午後の記述式・論文の AI 採点はロードマップ上のフェーズ3・4で対応予定」が古い
- `app/faq/page.tsx:81`
- PR #19486f4 で AP 午後採点、複数 PR で論文模範解答を実装済
- 修正: β提供中の旨に書き直し

## Phase 5: ビジネス・SEO・差別化評価
- ホームページ OG 画像が壊れていたためソーシャル流入が機能不全だった可能性 — **C2-1 修正で復旧見込み**
- FAQ の古い「未対応です／予定です」表現が複数 → 訪問者にプロダクトが進んでないと誤解させる致命的な情報設計ミス → 本ループで一括修正
- 出典・著作権・運営者情報・特商法は全 200 OK で揃っている

## Phase 6: NPS 予測
- Loop 1 比 +3 → **+8（baseline）**
- 理由: SNS シェア時のサムネが復旧、FAQ の鮮度向上で「動いてる感」UP

## Phase 7: ローンチ可否判定
- **Soft Launch 可、Hard Launch は更に 1-2 ループの精査後に再判定**
- C2-1 が prod 反映され OG 画像が出れば、X カード経由の自然流入が機能し始める

## 本ループで対応する Issue
- C2-1: ホーム OG 画像 0 byte → edge runtime 削除＋`<br/>` 置換
- N2-1〜N2-4: FAQ 4 項目を最新仕様に書き直し
- M2-1: major-issues.md に記録のみ
