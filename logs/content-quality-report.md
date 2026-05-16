# Phase 3: コンテンツ品質スキャン報告

調査対象: HEAD 37e85b7
スキャン日: 2026-05-16


## 3.1 プレースホルダ・「準備中」表記の検出

優先度: Medium

ユーザー向け露出する「準備中」(条件付きフォールバック含む):

1. app/[exam]/[yearSeason]/QuestionListWithFilter.tsx:162
   - `<Badge variant="warn">解説準備中</Badge>`
   - 解説のない問題に表示(機能的)
   - 判定: 正常な状態表示、許容

2. app/essay/page.tsx:86
   - 「準備中(順次追加)」
   - 設問が空のセクションに表示(条件付き)
   - 判定: ユーザーに進行中感を与える、許容範囲

3. app/[exam]/topic/[topicSlug]/page.tsx:200
   - `{isPlaceholder && <Badge variant="warn">解説準備中</Badge>}`
   - 解説プレースホルダ判定で表示
   - 判定: 機能的、許容

4. app/topics/[slug]/page.tsx:211
   - 同上のパターン
   - 判定: 機能的、許容

5. app/recommended-books/page.tsx:110
   - `{books[0]?.title ?? "情報を準備中"}`
   - 書籍データなし時のフォールバック
   - 判定: 軽微なUI欠落、許容範囲

6. app/recommended-books/[exam]/page.tsx:420
   - 「※ 購入リンク準備中」
   - アフィリエイトリンク未設定時の表示
   - 判定: 商用機能の整備状況に依存、軽微

7. app/stats/page.tsx:104
   - 「Search Console 連携準備中」
   - GSC API 未連携時のフォールバック
   - 判定: 設計通り

8. app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx:549,689
   - 「解説は準備中です。AI コパイロットに詳しい解説を依頼してください。」
   - 「解説は準備中。クイズモードでAIに質問できます。」
   - 判定: 機能的説明、許容範囲

TODO / FIXME / XXX / HACK コメント検出:
- app/ 配下: 0件
- components/ 配下: 0件
- lib/ 配下: 1件 (lib/feedback/pii-masker.ts:31 — PII正規表現のフォーマット例示で実コメント、虚偽の TODO ではない)

draft / experiment / prototype / @deprecated マーカー: 0件

判定: 全体として「TODO」「FIXME」のような開発残留コメントはゼロで非常にクリーン。「準備中」は機能フォールバックで露出は最小限。


## 3.2 メタデータ品質

優先度: Medium

OpenGraph / Twitter Card / images を定義しているページ: 20件以上 (主要ページは網羅)

ハードコードされた問題数不整合 (重大):
- app/launch/page.tsx:20 — `"全13試験区分・12,000問以上"` (description)
- app/launch/page.tsx:84 — `"IPA Quiz が全13試験区分・12,000問以上を揃えて正式公開します。"`
- 実態: 14,417 問 (ディスパッチ前提)
- app/layout.tsx は動的計算 (APPROX_QUESTION_COUNT_LABEL) で正確
- 判定: launch/ は古い数値を保持、削除推奨ルート (Phase 1) と整合
- 推奨アクション: launch/ 削除と同時に解消

サービス名表記の揺れ:
- 「過去問AI」「IPA Quiz」が混在
- app/launch/page.tsx で「IPA Quiz が...」と旧名称
- 内部一貫性として「過去問AI」へ統一推奨


## 3.3 日付情報スキャン

優先度: Medium

publishedAt の未来日付: 0件 (PR #198 C5 で対応済を再確認)

固定日付参照:
1. app/launch/page.tsx:81 — 「2026年5月、正式リリース」
   - 現在日付 2026-05-16 で今月だが、Badge は「正式リリース予告」のまま
   - 判定: 状態表記の更新漏れ、削除推奨と整合

2. blog タイトル『〜【2026年最新】』
   - data/blog/generators.ts で buildOverviewPost() が全試験記事に付与
   - 翌年(2027)への自動更新ロジック未確認
   - 判定: 年次手動更新タスクが必要、要オーナー判断

「最新の」「直近の」「今月の」「本日の」表現:
- app/about/page.tsx:47 — 「運営の透明性レポート・直近の活動状況は...」(透明性ページへのリンク文脈、適切)
- app/account/study-plan/StudyPlanClient.tsx:175 — 「直近の正答率」(ユーザー個別UI、適切)
- app/account/tutor/TutorClient.tsx:122 — 「今月の重点分野」(動的計算、適切)
- app/[exam]/page.tsx:349 — 「最新の確定値は IPA 公式統計をご確認ください」(IPA リンク文脈、適切)
- app/admin/errors/page.tsx — 「直近のエラー一覧」(動的Sentry連携、適切)
- app/challenge/page.tsx:58 — 「本日のチャレンジを生成できません」(動的、適切)

判定: 「最新の」「直近の」表現は全て動的データに紐づき問題なし。


## 件数サマリ

- 「準備中」「TODO」等プレースホルダ露出: 8箇所 (全て機能的フォールバックで許容範囲)
- TODO/FIXME/XXX/HACK コメント残骸: 0件 (極めてクリーン)
- 数値ハードコード不整合(問題数): 2箇所 (launch/ 内、削除推奨と統合解消)
- サービス名揺れ: 1箇所 (launch/ 内、同上)
- 古い日付・状態未更新: 1箇所 (launch/ の「正式リリース予告」)
- blog タイトルの年表記要更新ロジック: 65記事(全試験オーバービュー)


## 段階別アクション提案(削除実施は別ディスパッチ)

段階1: app/launch/ 削除で問題数・サービス名・日付の不整合を一括解消
段階2: blog タイトル『〜【2026年最新】』の年次更新ロジック設計
段階3: 「準備中」UI フォールバックの文言統一(必要に応じて)
