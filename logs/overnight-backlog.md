# 夜間自律改善 バックログ（優先度順）

更新ルール: 着手前に必ず worklog で done/SKIP を確認（二重実装防止）。1所見=1コミット。
P0 をすべて done/SKIP にしてから P1 へ。P1 は「領域 × 観点」をローテーションしてまんべんなく回す。
判断に迷う/実害が無い指摘は直さず worklog に SKIP として記録（過大修正の罠を避ける）。

> **状態 (2026-05-30 セッション13):** P0 全件 done/SKIP。P1 進行中。
> S13: S5(AfternoonResultView)で確立した「不完全タブ契約→aria-pressed トグル」の決定を同型の残り2箇所へ
> 横展開し完了。①EssayIndustryTabs(/essays 業種別模範答案セレクタ・論文添削C軸, `6e4fb97`)
> ②QuestionListWithFilter(年度別一覧 /[exam]/[yearSeason] の解答状況フィルター・indexable, `8170b44`)。
> どちらも role=tablist/tab/aria-selected を使うが aria-controls/tabpanel/矢印キーを持たない不完全タブ→
> role=group + aria-pressed に統一(見た目・挙動不変・各テスト付き)。残る role="tab" は正当な共有 primitive
> tabs.tsx のみ(矢印キーのみ未対応=S5 で日中候補に SKIP 済)。aria-selected の orphan ゼロを grep 実測。
> 多クラス監査(dangling idref/form button type/positive tabIndex/skip link/main landmark/JSON-LD XSS/essays SEO)は全クリーン。
> **次は: tabs.tsx 矢印キー(日中・影響大)、コピー通知統一/MilestoneToast ref化/exam meta desc 短縮(日中)、**
> **admin チャート role=img(低優先)、SKIP 再評価・新観点の開拓。夜間に安全な実害バグは枯渇傾向。**
>
> **状態 (2026-05-30 セッション12):** P0 全件 done/SKIP。P1 進行中。
> S12: 新観点「コンテナ要素の ARIA ロール/命名の妥当性」を開拓・一巡。recharts(非interactive SVG)の
> role=img は正だが、interactive 子を持つ/role 無しで命名する2パターンは実害。①ホーム LearningCalendar の
> ヒートマップが role=img で focusable button 30個を隠していたのを role=group に是正(`c1de599`・高トラフィック)
> ②/account LearningHeatmap のコンテナが role 無し div への aria-label(命名禁止で無視)→ role=group 付与(`6713bf0`)。
> MockExamRunner の時間タイルは可視ラベルで冗長=実害なし(SKIP)。多クラス監査(アイコンボタン/入力欄モバイル属性/
> ゼロ除算/JSON.parse未ガード/リスナー解放漏れ)は全てクリーン。同型残存ゼロを grep 実測。
> **次は: dangling idref の app 全域スイープ(S12 は mock-exam のみ確認)、tabs矢印キー/コピー通知統一/**
> **MilestoneToast ref化/exam meta desc 短縮(日中)、admin チャート(低優先)、SKIP 再評価。**
>
> **状態 (2026-05-30 セッション11):** P0 全件 done/SKIP。P1 進行中。
> S11: 「データ可視化チャートの代替テキスト(WCAG 1.1.1)」を /account(noindex) チャートへ横展開し完了。
> ①DashboardProgress 習熟度レーダー(`e9d3710`) ②WeaknessHeatmapClient 分野別レーダー(`16bb265`)
> ③TutorClient 演習量バー(`8832c8a`)に role=img+aria-label を付与(additive・各テスト付き)。
> admin(funnel/metrics)チャートは内部運用ツール・低価値で SKIP。**チャート alt-text は public(S10)+account(S11)で完全一巡 done。**
> **次は: tabs矢印キー/コピー通知統一/MilestoneToast ref化/exam meta desc 短縮(いずれも日中候補)、admin チャート(低優先)、SKIP 再評価、新観点の開拓。**
>
> **状態 (2026-05-30 セッション10):** P0 全件 done/SKIP。P1 進行中。
> S10: 「indexable ページのデータ可視化チャートの代替テキスト(WCAG 1.1.1)」を全 public チャートページで一巡。
> recharts チャートが role/aria-label を持たず SR 利用者が図の意味を得られなかった問題を是正。
> ①/stats 4チャート(`09885d4`) ②/transparency 2チャート(`969e533`) ③/ranking スコア分布(`b581146`)に
> `role="img"`+説明ラベルを付与(additive・視覚不変・各テスト付き)。
> perf(ISR/N+1)観点は Explore 提案が全て no-op(home=既static / modes/*=searchParams で dynamic 強制)と実測判定し SKIP。
> ranking の label 未関連付け指摘は wrap label の暗黙関連付け成立で false positive(SKIP)。
> **次は: /account チャート(DashboardProgress/WeaknessHeatmap)の role=img 横展開(noindex・日中候補)、または SKIP再評価。**
> **日中候補蓄積: tabs矢印キー/コピー通知統一/MilestoneToast ref化/exam meta desc 短縮/api-og-result 未参照なら削除。**
>
> **状態 (2026-05-30 セッション9):** P0 全件 done/SKIP。P1 進行中。
> S9: 「SNS シェア時の OG 画像の到達性・速度・健全性」を一巡。①robots.txt `Disallow:/api/` が og:image
> 生成 `/api/og` を巻き込み遮断→`Allow:/api/og` で SNS スクレイパに解禁 (`6d86a70`・全28ページ波及)
> ②`/api/og` に long immutable キャッシュ付与（毎回再レンダー解消, `215a541`）
> ③`/api/og/result` の satori 多子 div 500 レンダー失敗を修復＋キャッシュ (`45f0e77`・現状未参照ルート)。
> sitemap×orphan 監査=クリーン(SKIP)、exam meta desc 長さ=content編集回避(SKIP・日中候補)。
> **次は: パフォーマンス(bundle/ISR/N+1)観点、SKIP再評価4周目。日中候補蓄積: tabs矢印キー/コピー通知統一/**
> **MilestoneToast ref化/exam meta desc 短縮/api-og-result 未参照なら削除検討。**
>
> **状態 (2026-05-30 セッション8):** P0 全件 done/SKIP。P1 進行中。
> S8: 「indexable ページからの内部リンク切れ(404)」観点を一巡。①/topics 索引のロングテール3件
> (`a0e0f16`) ②試験ハブ「通知設定」/account/notifications→/settings (`98d2cc9`)
> ③/glossary(54)・/keywords(16) の relatedTopics 計70件の存在しない /topics リンク→topicLinkHref()で
> /search フォールバック (`cff75d9`)。計74件規模の 404 内部リンクを解消。Explore で残存ゼロ確認。
> **次は: パフォーマンス(bundle/ISR/N+1)観点、または SKIP 再評価4周目。日中候補: tabs矢印キー/コピー通知統一/MilestoneToast ref化。**
>
> **状態 (2026-05-30 セッション7):** P0 全件 done/SKIP。P1 1〜3周目進行。
> S7: ステータスメッセージ(動的成功/失敗通知)の SR 可視性を一巡。EmailLeadCapture の送信結果トーストが
> role/aria-live 完全欠落だったのを ShareButtons の常設 live region パターンへ統一(WCAG 4.1.3, `8ac8960`)。
> stale-closure タイマー監査を lib/・app/ へ拡張(S5 は components/ のみで MilestoneToast 見落とし=訂正)。
> MilestoneToast は同型だが親が毎秒再レンダーせず latent のみ(実害なし)。
> **日中対応候補が蓄積: (a)tabs 矢印キー (b)コピーボタンの SR 通知統一 (c)MilestoneToast 防御的 ref 化。**
> **次は: パフォーマンス(bundle/ISR/N+1)観点、または SKIP 再評価4周目。**
>
> **状態 (2026-05-30 セッション6):** P0 全件 done/SKIP。P1 1〜2周目完了。
> 一巡 done: 領域1(ホーム)・領域2(/q SEO/OG)・領域3〜8(quiz/challenge/search/mock-exam/account/blog の A11y/SEO)・
> 領域9(エラー/404)。app 配下 OG 画像欠落は一掃済。stale-closure タイマー同型バグ全て修復(S1/S4)。
> **フォームコントロールのアクセシブルネーム/ラベル欠落をアプリ全体で完全一掃(S5+S6)** —
> S5:午後採点/論文添削/学習プラン、S6:FeedbackGate/午後デモ/admin期間ピッカー。
> placeholder-only な裸入力欄・外部リンクの rel 漏れ ともに残存ゼロを grep 実測。
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
