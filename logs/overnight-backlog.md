# 夜間自律改善 バックログ（優先度順）

更新ルール: 着手前に必ず worklog で done/SKIP を確認（二重実装防止）。1所見=1コミット。
P0 をすべて done/SKIP にしてから P1 へ。P1 は「領域 × 観点」をローテーションしてまんべんなく回す。
判断に迷う/実害が無い指摘は直さず worklog に SKIP として記録（過大修正の罠を避ける）。

> **状態 (2026-05-30 セッション5):** P0 全件 done/SKIP。P1 1〜2周目完了。
> 一巡 done: 領域1(ホーム)・領域2(/q SEO/OG)・領域3〜8(quiz/challenge/search/mock-exam/account/blog の A11y/SEO)・
> 領域9(エラー/404)。app 配下 OG 画像欠落は一掃済。stale-closure タイマー同型バグ全て修復(S1/S4)。
> フォームコントロールのアクセシブルネーム/ラベル欠落を一掃(S5: 午後採点/論文添削/学習プラン)。
> **次は 3周目: (a)tabsプリミティブの矢印キー対応(日中判断候補)、(b)パフォーマンス観点
> (bundle・ISR・N+1)、(c)これまでの SKIP の再評価、(d)未点検の細部(エラー説明の充実・空状態)。**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P0（フェーズ14 残・既知の致命傷候補）— ✅ 全件 done/SKIP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### P0-① /admin 503 → 401（コードのみで対処）
- 場所: `app/admin/page.tsx`（401/503 分岐あり）、関連 middleware/auth。
- 期待: 認証情報不足は 401（Unauthorized）を返すべき。503 は「サーバ/依存(KV/env)未設定」を示唆。
- 注意: **env/KV 起因（KV 未設定でコスト上限が inert 等）と判明したら直さず worklog に記録して SKIP。**
  コード側のロジックで 503 を返している箇所が誤りなら 401 に修正可。実害（管理者が正しく弾かれない 等）を確認してから。
- 検証: ローカル本番ビルドで未認証アクセス時の HTTP ステータスを curl で実測（401 を確認）。

### P0-② blog 問題数 2,398 → 2,381（SSOT 統一・網羅 grep）
- **要再確認（過大修正の罠あり）**: 既存ログ（post-phase13-cli-diagnostics, ux-overhaul-phase13-summary）によれば
  **main ソースに `2,398` は存在せず**、実機差異は **CDN/デプロイ stale (`X-Vercel-Cache: HIT`)** の可能性が高い。
- まず `grep -rn "2,398\|2398" app/ components/ lib/ data/ content/`（logs/ と __tests__ を除外）で **ソースに実在するか**確認。
  - 実在しない → これは夜間（コード）で直せる問題ではない。worklog に「SKIP: ソース不在・デプロイ stale 起因」と記録。
  - 実在する → 該当箇所を SSOT（indexable count 算出ロジック）参照に置換。`__tests__/seo/no-hardcoded-counts.test.ts`
    と `home-metadata.test.ts` が緑であることを確認。
- 検証: 修正後に網羅 grep でソース内の `2,398` 残存ゼロ、全数値テスト緑。

### P0-③ バッジ獲得トーストの 5 秒自動消滅を修復
- 場所: 実績/バッジ トースト関連コンポーネント（`grep -rn "toast" components/` で特定。achievement/badge 系）。
- 期待: トーストが無操作で約 5 秒後に自動消滅し、回答後コントロールを覆い続けない（致命傷⑧ で位置は上部へ移動済み・コミット c94339e）。
- 検証: localhost 本番ビルドへの Playwright E2E で「バッジ出現 → 無操作 5 秒待機 → トースト消滅」を実証。
  既存のトースト E2E があれば拡張。落ちる検証を必ず添える。

### P0-④ Q&A JSON-LD の任意警告 11 件削減（dateCreated に ISO + TZ）
- 場所: `lib/seo/question-jsonld.ts`（dateCreated 生成箇所）、テスト `__tests__/seo/question-jsonld.test.ts` / `tests/e2e/qa-schema.spec.ts`。
- 期待: dateCreated が TZ 付き ISO8601（例 `2024-04-21T00:00:00+09:00`）になり、Rich Results の任意警告が減る。
- 検証: `.next` 成果物 or localhost の JSON-LD を curl/grep で抽出し、dateCreated が TZ 付き ISO になっていること、
  question-jsonld テストが緑であることを実測確認。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P1（全体スイープ・領域 × 観点ローテーション）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
P0 完了後に着手。**1所見 = 1コミット**。下記の「領域」を順に巡回し、各領域で「観点」を1つずつ点検する。
1周したら2周目に入り、前回 done のものは飛ばす。worklog に「領域/観点/結果」を必ず残す。

### 領域ローテーション（この順で巡回）
1. ホーム `app/page.tsx`
2. 問題ページ `/q`（SEO ランディング）
3. クイズ `/quiz`
4. チャレンジ `/challenge`
5. 検索 `/search`
6. 模試 `/mock-exam`
7. アカウント `/account`
8. ブログ `/blog`
9. エラー/ローディング画面（not-found / error / loading）

### 観点チェックリスト（各領域で）
- **A11y**: タップ領域 24px 以上 / フォーカス可視 / ARIA 適切 / キーボード操作（Tab・矢印・Enter・数字キー）。
- **SEO**: metadata 網羅（title/description/canonical/OG）/ description 文字数キャップ / canonical 自己参照 /
  内部リンク有無 / JSON-LD 妥当 / sitemap 実在 URL / orphan ページ無し。
- **コンテンツ数値 SSOT 整合**: 問題数など数値が単一情報源由来か（ハードコード混入が無いか）。
- **パフォーマンス**: 不要な `"use client"` 削減 / bundle 肥大 / ISR 設定 / N+1 的データ取得。
- **エラー・ローディング**: 適切な空状態・エラー UI・next-action があるか。
- **デッドコード / lint / ビルドコスト**: 明確に不要なコード・未使用 export・lint 警告の削減（明確なものだけ）。

### P1 の進め方
- 1セッションで領域1〜2個ぶんを点検し、実害ある所見を1件ずつコミット。
- 「理論上の指摘・実害なし」は SKIP（worklog 記録）。
- 観点が出尽くした領域は worklog に「領域X 一巡 done」と記録し次の領域へ。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## メモ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- 既知の env/KV 起因事象（§0 コスト上限 inert・SLACK 未設定・/admin 503 の一部）は **コードで直せない**。SKIP 対象。
- 承認必須事項（モデル変更・価格/無料枠変更・プロンプト大幅変更・依存メジャー更新 等）は自律実行禁止。
