# 過去問AI 包括激辛レビュー (2026-05-16)

レビュアー視点: シニアプロダクトエンジニア15年・教育SaaS立て直し専門
ベース HEAD: ab90812 (PR #229 マージ後・origin/main 直近)
評価方法: コード一次情報 + 既存スキャン (logs/seo-harsh-review-20260515.md, ux-harsh-review-20260515.md, site-scan-summary.md, brand-risk-report.md, content-quality-report.md, route-scan-report.md, component-deadcode-report.md, content-duplication-report.md) を最新HEADで再検証
根拠: Google Search Central / schema.org / WCAG 2.1 AA / Apple HIG / Material Design / OWASP / IPA著作権規定

---

## エグゼクティブサマリ

総合評価: B-

直近1ヶ月で PR #195〜#229 計29本のマージにより、過去の SEO/UX/a11y/security/bundle の主要技術負債は大幅に解消された。ホーム title 重複、essays soft-404、blog 未来日付、legacy sitemap chunk、ContactForm iOSズーム、QuizPlayer ボタン 44px化、security headers (CSP)、25MB バンドル削減はすべて済。ベース体力は教育SaaSとして十分競争力あり。

ただし「直近スプリントで修正範囲外だった残骸」と「PR #100 (educational-contribution ピボット) の整理漏れ」が複数残り、第三者目線でブランド毀損リスクとして表面化する状態。具体的には (a) /launch の事実不整合 (b) Stripe 残骸6箇所 (c) /analytics のモックデータ公開 (d) /test/sentry の外部実行可能性 (e) /stats の内部パス露出 (f) i18n dead infra (g) デッドコード25ファイル2901行が PR #227 報告から未対応のまま残存。「やった」「綺麗」と見える表面のすぐ下に整理漏れが層をなしている。

致命的問題は3件 (#001/#002/#003)。修正必須5件、推奨14件、観察11件、削除推奨16件、計49項目。

### 強み (根拠付き)

1. 技術SEO・セキュリティヘッダーが業界平均上位 — HSTS preload 2年・CSP 厳格 enforcing (object-src 'none', frame-ancestors 'none', worker-src/manifest-src 明示)・COOP same-origin・X-Frame-Options DENY・poweredByHeader false。Vercel HTTP/2 配信・TTFB ~60ms。lib/seo/sitemap-pagination.ts:5 の getIndexableQuestions も適切に placeholder 除外。
2. クイズプレイヤーのインタラクション品質 — ChoiceButton.tsx で aria-pressed/aria-keyshortcuts/min-h-[64px]/正誤アイコン併用 (色だけ依存しない) を実装。Button sm variant は [@media(pointer:coarse)]:min-h-[44px] でタッチ環境のみ 44px 確保するスマートな WCAG 2.5.5 対応。
3. データ規模と網羅性 — ALL_QUESTIONS 14,417問 / 13試験区分 / blog 71記事 / essays 27ファイル (3年 × 8業種 + index) / e2e 12ファイル 61テスト。教育貢献プロジェクトとして単独で予備校級の量を保持。差別化軸 (B) AI コパイロット常駐 / (C) 午後 AI 採点 (DEMO含む) を実装済み。

### 致命的問題

1. 【課題001】/analytics ページが BasicAuth/noindex 保護なしでモックデータを公開 — DAU 498, プレミアム転換率 1.0%, 累計 153 人など完全な架空数値を robots.txt で disallow するだけでブロックしているが、URL 直打ちで誰でも閲覧可。第三者 (投資家/採用候補/競合) が「過去問AI のプレミアム転換率は 1%」と誤解するリスク。教育貢献を謳う中での「プレミアム転換率」表示は理念矛盾。
2. 【課題002】/launch ページの事実不整合複数 — "正式リリース予告" Badge、"2026年5月、正式リリース"、"全13試験区分・12,000問以上" (実態 14,417問)、サービス名 "IPA Quiz" (現公式名 "過去問AI")、Stripe 決済記述、CountdownTimer による「リリースまで」表示。今日 2026-05-16 は既にリリース完了状態であるべきで、過去のローンチ予告ページが本番公開を続けている。
3. 【課題003】app/privacy/page.tsx:83-85, 141 で Stripe 決済を「ご利用の際は…直接処理」と現在進行形で記述 — 実装フェーズ4でまだ未稼働。教育貢献プロジェクトとして「全機能無料公開」を /about, /transparency で謳う一方、プライバシーポリシーは Stripe 決済を前提とした第三者 Cookie 通知を含む。プライバシーポリシーは法的文書であり、未実装機能の記述は虚偽記載のリスク。

### 件数サマリ (採用判断容易フォーマット)

- 致命的問題: 3件
- 修正必須項目: 5件
- 推奨項目: 14件
- 観察事項・要確認: 11件
- 削除・アーカイブ推奨: 16件
- 合計: 49件

---

## カテゴリ別評価 (各 A-F)

- アーキテクチャ: B+ — Next.js 16 App Router / Server-first / Edge-friendly。ALL_QUESTIONS の static import が一部 client へ漏出していた問題は PR #229 で 25MB→4MB に圧縮済。残課題は middleware の matcher が /admin と /api/admin のみで /analytics 等を捕捉できない設計。
- メイン機能の質: B — /q クイズプレイヤーは ChoiceButton/ExplanationCard/CopilotPanel の組み合わせで業界最高水準。/essays/sc も server-componentized 済。/stats は GSC/PostHog 未連携時に「準備中」が複数セクションで露出。/api/essay-grading が誰からも参照されないデッド API。
- SEO品質: B — 5/9 致命傷 (C1-C9 from logs/seo-harsh-review-20260515.md) は解消。残り C7 (ホーム OGP override) は対応済み、C8 (12,000問 → 動的化) も対応済み。残課題は (a) /api-docs に noindex なし (b) /launch が 12,000 問のままで sitemap に含まれる (c) URL ホストの不整合 (with-www / naked) が画面表示の curl 文字列で混在。
- UX品質: B+ — UX harsh review 2026-05-15 の M1-M7 致命的問題はすべて解消。残課題は (a) /stats の「準備中」セクション複数 (R2 from ux-harsh-review-20260515 未対応) (b) text-[11px] が複数残存 (重要 disclaimer "AI生成の解説は誤りを含む可能性があります" が 11px は読みにくい) (c) ホーム情報密度過多 (13試験タイル + 続き + カレンダー + その他 details の選択肢過多)。
- コンテンツ品質: B — 14,417問の placeholder 解説検出ゼロ (正解は[アイウエ]ですパターン未検出)。blog 71記事の datePublished は Math.min clamping で実日付化済。essays 27本も業種固有性確保。残課題は (a) /transparency の月次レポートが 2026-03, 2026-04 のみ (2026-05 が現在月だが未追加) (b) blog タイトル「【2026年最新】」65記事の年次自動更新なし (c) "AI生成解説" の disclaimer が text-[11px] と過小。
- 不要機能・デッドコード対応: D — PR #227 で報告した削除推奨ルート 8件・デッドコード 25ファイル 2901行・i18n dead infra 13KB のすべてが本HEADで残存。PR #227 audit 後の整理 dispatch が未着手。
- ブランド毀損リスク: C — 上記致命的問題 #001, #002, #003 が外部目線で「教育貢献を謳いながら課金前提の文言が残る」「ローンチ予告ページが残る」「DAU/プレミアム転換数値を公開」となり、ブランド一貫性に懸念。
- セキュリティ・運用: A- — CSP enforcing/HSTS preload/COOP・CORP・X-Frame-Options DENY。middleware で /admin /api/admin Basic Auth。Rate limit は in-memory map (Vercel serverless では cold-start 毎にリセットされるため、効果限定的だが教育貢献の度量としては許容)。残課題: /test/sentry の外部公開 (誰でも Sentry テストエラー発射可能)。
- 法的・倫理的観点: B — IPA 著作権遵守 (sourcePdfUrl 全問保持、/about で出典明記)。プライバシーポリシーは Stripe 記述不整合 (#003)。AI 生成解説の disclaimer は存在するが小さい。データ削除手順あり。AI 査読体制 (人間 reviewer) の明示なし。
- 競合比較: B — data/competitors.json + /admin/competitors で内部競合監視あり。/blog/ipa-shiken-ai-katsuyou-benkyouhou が "過去問道場のような従来型サービス" として直接言及。差別化点 (AI コパイロット・午後採点) を明確化。Public API (/api-docs, /api/v1/exams|questions|grade) を提供する点は競合 (siken.com 系) にない独自路線。

---

## 修正課題リスト (通し番号付き、採用/不採用判断容易フォーマット)

### 致命的問題 (優先度: 最高)

#### 【課題001】/analytics ページが BasicAuth 保護なしでモックデータ公開
- 該当URL/該当ファイル: app/analytics/page.tsx (全行), middleware.ts:62
- 現状: robots.txt で /analytics は Disallow 設定済 (app/robots.ts:17)。しかし middleware の matcher は ["/admin/:path*", "/api/admin/:path*"] のみで /analytics を保護対象外。URL 直打ち・SNS シェア・ブックマーク経由なら誰でも 200 OK で閲覧可能。コンテンツは DAU 498 / 累計プレミアム 153 人 / 5問完了 5,100 / プレミアム転換 1.0% などの架空モックデータ。
- 問題点: (a) 教育貢献プロジェクト (全機能無料) を謳いつつ「プレミアム転換率」を公開している矛盾 (b) 第三者が誤解する数値を放置 (c) "管理画面" / "モックデータ" Badge 表示はあるが、SNS/X リンクで開く受信者は文脈なしで「過去問AI は MAU 1万人」と誤読する。
- 改善案: (1) middleware.ts の matcher に /analytics を追加し BasicAuth 化、もしくは (2) app/analytics/page.tsx に robots noindex + force-static + 認証ロジック追加、もしくは (3) 当面 production では notFound() を返す guard を追加。
- 工数見積: 15分 (middleware matcher 追加 + 動作確認)
- 採用判断観点: 教育貢献ブランドの整合性確保のために必須。投資家プレゼンや採用面接で URL を渡されると致命的に効く。
- 不採用判断観点: モックデータ Badge が明示されており、PR #100 ピボット前から認識済の運用上必要なダッシュボードであれば許容可能。ただしその場合は数値を `__MOCK__` などに置換し具体数値を消す。

#### 【課題002】/launch ページの事実不整合複数 (リリース予告残骸)
- 該当URL/該当ファイル: app/launch/page.tsx:13-39 (metadata), :78 (Badge), :81 (h1), :84 (description), :67 (Stripe roadmap)
- 現状: title "正式リリース — 2026年5月" / description "IPA Quiz が2026年5月に正式リリース…12,000問以上" / Badge "正式リリース予告" / "2026年5月、正式リリース" / "全13試験区分・12,000問以上" / Stripe roadmap 記述 / CountdownTimer による「リリースまで残り」表示。現在日 2026-05-16 で「予告」状態が継続。
- 問題点: (a) サービス名 "IPA Quiz" は旧名で現公式 "過去問AI" と乖離 (b) 12,000問 は実態 14,417 問と過小申告 (c) リリース月内で予告ページ公開は事実誤認 (d) サイトマップに含まれ Google にも index 候補 (sitemap/main.xml で確認)。PR #225 構造化データ整備の効果が薄まる。
- 改善案: (1) /launch ディレクトリごと削除 (PR #227 の段階1推奨) — リダイレクト /launch → / を next.config に追加 (2) もしくは「リリース完了報告」ページに改装 — Badge "リリース完了" / h1 "2026年5月、正式リリースしました"。
- 工数見積: 削除なら 15分 / 改装なら 1時間
- 採用判断観点: /launch は外部からの初回流入で「事前登録 → メールマーケ」目的だったが、リリース後はもはや事前登録不要。検索流入の SEO 損失は微小。残しておくと「このサービスはまだローンチしてない」と誤認されるリスク大。
- 不採用判断観点: 過去ローンチプロモーションの SNS シェア URL が外部で生きている場合、急に 404 にすると残存リンクが壊れる。改装する選択肢 (リリース完了報告ページ) なら過去リンクも生きる。

#### 【課題003】プライバシーポリシーの Stripe 記述が現在進行形・教育貢献体裁と矛盾
- 該当URL/該当ファイル: app/privacy/page.tsx:83-85, :141
- 現状: 第1項 "プレミアムプラン等の有料機能をご利用の際は、決済情報を Stripe が直接処理します。当社サーバーには Stripe 顧客 ID と契約状態のみを保存し、カード番号等の機密情報は保持しません。" / 第3項 Cookie 章 "第三者 Cookie の発行はありません(Stripe Checkout への遷移時を除く)"。/about, /transparency, /operator では「全機能無料公開」「ボランティア有志」「教育貢献プロジェクト」と表明。Stripe は package.json から PR #229 で削除済 (=実装意図なし)。
- 問題点: (a) 法的文書 (プライバシーポリシー) で未実装機能を実装済として記述するのは消費者契約法・特定商取引法解釈上問題リスク (b) 教育貢献プロジェクト体裁と「プレミアムプラン」記述の矛盾 (c) "Stripe Checkout 起動" は admin/stats でも残存 (#024)。
- 改善案: (1) Stripe 関連記述 2箇所を削除 + Cookie 章を「第三者 Cookie の発行はありません」のみに簡素化 (2) フェーズ4 課金実装時に再追加するための git diff コメント残置。
- 工数見積: 10分
- 採用判断観点: 法的文書の正確性は最優先。教育貢献ブランド統一にも直結。
- 不採用判断観点: なし。削除以外の選択肢は薄い。

### 修正必須項目 (優先度: 高)

#### 【課題004】app/stats/page.tsx:117 で内部開発文書パス logs/gsc-setup-guide.md がユーザー向けUIに露出
- 該当: 「セットアップ手順: logs/gsc-setup-guide.md」
- 現状: GSC API 未連携時のフォールバック表示で開発者向け運用手順書ファイル名を表示。
- 問題点: 技術リテラシー高ユーザーから見て「設計が雑」の印象。ブランド毀損度: 中。
- 改善案: 「Google Search Console との連携が完了次第、ここに月間表示回数を自動表示します。」のみに短縮。logs/ パスは削除。
- 工数: 5分
- 採用判断観点: PR #227 brand-risk-report で High 指摘済。即時対応容易。
- 不採用判断観点: ほぼなし。

#### 【課題005】/test/sentry, /test/posthog の外部実行可能性
- 該当: app/test/sentry/SentryTestClient.tsx, app/test/posthog/page.tsx
- 現状: robots.txt で /test/ は Disallow。しかし URL 直打ちでアクセス可。Sentry テストエラー throw / PostHog テストイベント発火ボタンを誰でも押せる。
- 問題点: Sentry ダッシュボードに外部攻撃者がエラーを大量送信して通知ノイズ・ストレージコスト増加させる攻撃ベクトル。PostHog 側も同じ。CTF レベルの脆弱性ではないが運用上のリスク。
- 改善案: (1) production では notFound() を返す環境ガード (NODE_ENV !== "development") (2) もしくは middleware で /test/ も BasicAuth 対象に。
- 工数: 30分
- 採用判断観点: 監視ノイズ防止のため対応推奨。
- 不採用判断観点: 攻撃者の実害は低い (Sentry/PostHog 側の rate-limit が抑制)。当面 robots-only で許容しつつ将来対応も可。

#### 【課題006】/api-docs に noindex メタタグなし・robots.txt 未除外
- 該当: app/api-docs/page.tsx:9-14, app/robots.ts (api-docs なし)
- 現状: Public API β ページ。Swagger UI を表示し、開発者向け。canonical 設定済 / OGP は親 layout 継承。
- 問題点: (a) 検索意図的に流入価値が低い (b) Google が "Public API ドキュメント" を index して SERP に出るとブランド消費型 (c) クロールバジェット消費。
- 改善案: app/robots.ts の disallow に /api-docs を追加。もしくは metadata に robots: { index: false } を追加。
- 工数: 5分
- 採用判断観点: SEO 整理として推奨。SEO harsh review R2 で既出。
- 不採用判断観点: 開発者向け流入も生かすため積極的に index させたい場合は維持。ただし現状リンクは settings/api-keys のみで集客導線弱。

#### 【課題007】app/launch/page.tsx + 重複ペア (final-review/strategy-discussion) が削除されず sitemap に含まれる
- 該当: app/launch/page.tsx, app/final-review/page.tsx, app/strategy-discussion/page.tsx 等
- 現状: 課題002 の launch 残骸に加え、PR #227 で削除推奨された一時公開 8ルートと重複ペア (final-review v1/v3, strategy-discussion v1/v2) が全て残存。
- 問題点: (a) sitemap (lib/seo/sitemap-pagination.ts 経由 main.xml) に launch が含まれ Google 検索結果に出るリスク (b) v1/v2 重複は内部リンク密度を散らす (c) "robots: noindex" 設定はある (final-review-v3 等) が、launch にはなし。
- 改善案: PR #227 段階1+2 を別 Dispatch で実施 (削除実施は別 PR 化)。
- 工数: 1時間 (削除 + sitemap 再生成 + 動作確認)
- 採用判断観点: PR #227 既に判断済の項目。本レビューで再確認 → 削除すべき。
- 不採用判断観点: 一部 (strategy-discussion-v2 = 赤字試算版) が「直近の運営判断ログ」として価値ある場合、/transparency 配下へ統合する選択肢。

#### 【課題008】Rate limit が in-memory map で Vercel serverless 環境では効果限定
- 該当: lib/rate-limit/server.ts:9-10 (dayBuckets, minuteBuckets)
- 現状: Map<string, Bucket> による IP ベース制限。setInterval で 10分毎に古いバケットを GC。
- 問題点: Vercel serverless では関数インスタンスが cold-start のたびに別のメモリ空間。同一 IP が複数インスタンスから叩くと制限が事実上ない。教育貢献プロジェクトでは過大な防御不要だが、AI コスト月5万円上限を守るには Redis/Upstash 等の永続ストア必要。
- 改善案: (1) Upstash Redis 等の rate-limit に切り替え (Vercel KV でも可) (2) もしくは現状を許容しつつ「月5万円上限」を Vercel Spend Cap で hard limit。
- 工数: 4-8時間 (永続化), もしくは 30分 (Spend Cap 設定確認)
- 採用判断観点: AI コスト上限の確実な制御に直結。教育貢献の持続可能性に関わる。
- 不採用判断観点: 現状の利用規模 (PostHog 集計次第) が小さければ in-memory で実害なし。ただし Vercel スポット課金リスクは存在。

### 推奨項目 (優先度: 中)

#### 【課題009】Stripe 残骸 6箇所の整理 (privacy 以外)
- 該当: app/admin/stats/page.tsx:333, app/analytics/page.tsx:194, app/api/copilot/route.ts:146 (コメント), app/launch/page.tsx:67
- 改善案: privacy (#003) と launch (#002) は致命的問題で対応。残りは admin/stats イベント定義削除、analytics text 修正、copilot route コメント整理。
- 工数: 30分

#### 【課題010】app/api/essay-grading/route.ts (5観点プロンプト) がデッド API
- 該当: app/api/essay-grading/route.ts (全行), 一方 essay-grade (4軸プロンプト) は components/essay/EssayEditor.tsx:109 で使用中
- 改善案: essay-grading を削除、もしくは essay-grade と統合 (5観点に拡張)。
- 工数: 30分 (削除) / 2-4時間 (統合)

#### 【課題011】components/quiz/stream/ 4ファイル 623行のデッドコード残存
- 該当: ComboFireworks.tsx, StreamQuizPlayer.tsx (421行), StreamSummary.tsx, StreamQuizLoader.tsx
- 現状: PR #229 で StreamQuizLoader はサーバー側分割対応されたが、stream 機能自体は本番未配線。
- 改善案: 機能をフェーズ2以降に正式実装するなら維持コメント追加。未定なら削除。
- 工数: 削除 30分

#### 【課題012】components/HistoryStats.tsx 等 11トップレベルコンポーネント 1201行のデッドコード
- 該当: ContinueFromHistory, DailyMissions, ExamSelectorDialog, HeroDemoAnimation, HistoryStats, HomeExamPicker, ReviewReminder, SocialProof, TestimonialsCarousel, TrustBadge, XFollowButton
- 改善案: PR #227 段階1で削除実施。
- 工数: 1時間

#### 【課題013】i18n dead infrastructure (lib/i18n + messages/ja|en|zh.json 計13KB)
- 該当: app/layout.tsx で I18nProvider 配線、消費者ゼロ
- 改善案: 多言語予定なし → 削除。予定あり → コメント明記。
- 工数: 15分 (削除) / 5分 (コメント追加)

#### 【課題014】lib/audio/bgm.ts 259行, lib/podcast/episodes.ts 159行 等 lib デッドファイル 738行
- 該当: lib/analytics/server-events.ts, lib/audio/bgm.ts, lib/podcast/episodes.ts, lib/seo/expected-404.ts, lib/storage/avatar.ts, lib/storage/community.ts, lib/streak/StreakProfileCard.tsx
- 改善案: PR #227 段階3で削除。
- 工数: 1時間

#### 【課題015】"AI生成の解説は誤りを含む可能性があります" disclaimer が text-[11px] と過小
- 該当: components/quiz/ExplanationCard.tsx:186-189
- 現状: 11px の灰色テキストで disclaimer 表示。
- 問題点: 重要な法的・倫理的 disclaimer (AI生成コンテンツの正確性保証なし) は WCAG 推奨 16px 以上。教育サービスとして AI 解説精度の責任分界が読みにくい。
- 改善案: text-sm (14px) + 軽い枠線で視認性向上。「※」マークも維持。
- 工数: 10分

#### 【課題016】/transparency 月次レポートが 2026-03, 2026-04 のみで 2026-05 未追加
- 該当: app/transparency/page.tsx:71-99 (REPORTS 配列)
- 現状: 「2026-04」「2026-03」のみハードコード。今日 2026-05-16 で月内最新レポート未着。
- 問題点: "毎月公開" を謳いながら 2ヶ月止まり。透明性をブランドの中核とするページが古いと逆効果。
- 改善案: 2026-05 レポート追加、または「次回 5月末公開」と明記。
- 工数: 30分 (レポート執筆) / 5分 (予告文追加)

#### 【課題017】URL ホストの不整合 (with-www / naked) が画面表示の curl 文字列等で混在
- 該当: app/api-docs/page.tsx:63-68 (https://kakomon-ai.jp/api/v1/exams 等)、components/quiz/* / components/motivation/* / app/about/page.tsx:202 など計15箇所
- 現状: canonical は https://www.kakomon-ai.jp、コードベース内に https://kakomon-ai.jp (naked) が混在。
- 問題点: (a) Vercel naked → www 301 redirect 1回分の hop が外部ツールで体感劣化 (b) ブランド一貫性 (c) Public API で示す curl が naked のため、利用者が naked を使い続け、解析時に正規化漏れ。
- 改善案: コードベース全体で SITE_BASE_URL (=https://www.kakomon-ai.jp) を参照する形に統一。ハードコードを排除。
- 工数: 1-2時間 (全置換 + 動作確認)

#### 【課題018】blog タイトル「【2026年最新】」65記事の年次更新ロジック未整備
- 該当: data/blog/generators.ts buildOverviewPost() / buildLastMonthPost() / buildFrequentTopicsPost() / buildPracticePost() / buildAnalysisPost()
- 現状: 各 generator の title に「【2026年最新】」ハードコード。
- 問題点: 2027年1月になると 65 記事すべて古く見える。SEO 上「最新」が虚偽になる。
- 改善案: new Date().getFullYear() で動的差し込み、もしくは年次手動更新の運用化。
- 工数: 30分 (動的化) / 年次1時間 (手動)

#### 【課題019】ホーム情報密度過多 (13試験タイル + 続き + カレンダー + その他)
- 該当: app/page.tsx + HomeExamGrid + LearningCalendar + ContinueFromLast + HomeAuxSection
- 現状: 初回訪問ユーザーの主要動線が "13試験 + 学習カレンダー + 続きから + 補助 details" の 4 セクション混在。
- 問題点: ニールセン10原則「認知負荷最小」に反する。「初心者おすすめ」Badge 2つ程度では誘導弱。
- 改善案: (1) 初学者向け / 中堅 / 上級 で 3 段折り畳み (2) もしくは "あなたは初学者?" → "IP/SG おすすめ" の分岐CTA。
- 工数: 4-6時間 (情報設計 + UI 実装)

#### 【課題020】/stats の "準備中" セクション複数表示問題 (UX harsh review R2 再掲)
- 該当: app/stats/page.tsx 全体
- 現状: GSC 未連携で "Search Console 連携準備中" / PostHog 未連携で複数 Card "連携準備中"。
- 問題点: 透明性の旗印を掲げた公開ダッシュボードで "準備中" 連発は信頼性失墜。
- 改善案: isGscConfigured() / isPosthogStatsConfigured() で該当 Card を return null。
- 工数: 30分

#### 【課題021】api-docs に表示する Public API レート制限値の実装一致確認
- 該当: app/api-docs/page.tsx:53 ("50/日" "1 分 15 リクエスト") vs lib/api/rate-limit.ts
- 確認推奨: 数値の事実一致を pnpm typecheck/build と並行で確認。
- 工数: 15分

#### 【課題022】operator/about ページの "ボランティア有志" 表記の信頼性
- 該当: app/operator/page.tsx:30, app/about/page.tsx:42
- 現状: 個人名・顔写真・経歴なし。GitHub Issues リンクで匿名運営を強調。
- 問題点: E-E-A-T (Experience/Expertise/Authoritativeness/Trustworthiness) の Trust 軸で弱い。Google YMYL (Your Money Your Life) 判定は教育ジャンルでは弱まるが、SEO harsh review R4 で指摘済の Person 構造化データ追加余地あり。
- 改善案: (1) GitHub プロフィールへのリンク追加 (kameking-lab 既知だが運営者ページから直リンクなし) (2) /transparency に運営者ハンドル明示 (3) ATEMPT に Person 構造化データ追加。
- 工数: 30分-2時間

### 観察事項・要確認事項 (優先度: 低)

#### 【課題023】Footer "出典: IPA 情報処理技術者試験" の配置確認 (CLAUDE.md セクション8)
- 該当: components/SiteFooter または app/layout.tsx footer
- 全ページのフッターに表示されているかを CLAUDE.md ルールとして確認。

#### 【課題024】admin/stats:333 "checkout_started" イベント定義の整合性
- 該当: app/admin/stats/page.tsx:333
- Stripe 未実装下で event スキーマだけ定義されている。

#### 【課題025】api/copilot route.ts:146 コメント "Stripe payments (Phase 4)" の維持判断
- 該当: app/api/copilot/route.ts:146
- コードコメントなので公開影響は低、整理判断対象。

#### 【課題026】ContactForm カテゴリ enterprise (法人問い合わせ)
- 該当: app/contact/ContactForm.tsx:12 + app/api/contact/route.ts:27 + tests/e2e/contact-enterprise.spec.ts
- 教育貢献ピボット後に法人問い合わせ受付を維持か要オーナー判断。

#### 【課題027】app/account/api-keys → /settings/api-keys redirect ファイル統合判断
- 該当: app/account/api-keys/page.tsx (redirect 専用)
- next.config.ts:67 で同様の redirect 定義ありで二重定義。

#### 【課題028】lib/seo/sitemap-pagination.ts:5 getIndexableQuestions の名前と実装一致
- 改善案: SEO harsh review C9 でフィルタ追加済を確認 (PR #229 範囲)。
- 検証: ALL_QUESTIONS.filter(!isPlaceholderExplanation) になっているか。

#### 【課題029】components/WelcomeModal.tsx の利用箇所最小
- 該当: 1ファイルでしか参照されない。運用上必要性確認。

#### 【課題030】Footer の各リンク間 py-2 (32px) のタップ間隔
- UX harsh review R8 未対応。py-2.5 (40px) で指の段差確保。

#### 【課題031】PostHog のオプトアウト UI 未実装 (UX harsh review O4 再掲)
- privacy policy 記載のみで UI トグルなし。EU/CCPA 訴求弱。

#### 【課題032】ダークモード切替 Footer のみ (UX harsh review O5 再掲)
- SiteHeader 右上に ThemeToggle 出すと発見性UP。

#### 【課題033】HeroAiDemo の "サンプル" ラベル表示 (UX harsh review R11 再掲)
- aria-hidden=true 済だが視覚にも明示推奨。

### 削除・アーカイブ推奨 (オーナー判断)

#### 【課題034-041】PR #227 即削除推奨 8ルート全件 (本HEADで未対応)
- app/tmp/round7-review/
- app/test/posthog/
- app/test/sentry/
- app/final-review/ (v3 残存)
- app/strategy-discussion/ (v2 残存)
- app/exec-review/
- app/feature-review/
- app/scoring-test/
- 各 logs/ 配下の対応 md ファイル
- 採用判断観点: PR #227 で既に判断済。本レビューで再確認。
- 不採用判断観点: 直近 24 時間以内に再参照する予定がある場合のみ留保。

#### 【課題042-044】PR #227 アーカイブ推奨 3ルート
- app/demo/afternoon/ (午後 AI 採点デモ)
- app/demo/essay-grading/ (論述添削デモ)
- app/launch/ (リリース予告) — 本レビューで #002 として致命的問題に格上げ
- 採用判断観点: demo 系は教育的価値の有無で判断。/launch は #002 で削除推奨。

#### 【課題045】app/sitemap/page.tsx (HTMLサイトマップ)
- 現状: 通常維持。サイトマップは /sitemap.xml が主要。HTML 版は SEO 上の独自価値は薄い。
- 採用判断観点: 残してもブランド毀損なし、ただしメンテ負荷小評価。

#### 【課題046】app/keywords/[keyword] と app/topics/[slug] の重複検証
- 確認: 似た機能 (キーワード一覧 / トピック一覧) が分かれている設計意図確認。
- 採用判断観点: 内部リンク密度向上の意図ならOK。

#### 【課題047】app/glossary/ と app/topics/ の差別化
- 確認: 用語集と分野別ページ。重複していないか確認。

#### 【課題048-049】components/character/CharacterGreeting.tsx, components/motivation/BadgeStrip.tsx
- PR #227 component-deadcode-report で確実デッドコード認定済。削除候補。

---

## 過剰最適化・逆効果リスク

### X1. /[exam]/page.tsx の JSON-LD `competencyRequired` 12分野列挙 (SEO review X1 再掲)
- 該当: app/[exam]/page.tsx
- 現状: schema.org policy "不必要な大量列挙" に近い。
- 推奨: 上位 3-5 分野に絞る。

### X2. SiteHeader ドロップダウンの mouseenter 開閉 (UX review O1 再掲)
- タッチデバイスでハイブリッド挙動。実機検証推奨。

### X3. ホーム JSON-LD の二重 (EducationalOrganization + WebSite + ItemList) 重ね
- 各々妥当だが、ItemList の itemListElement 全試験列挙は過剰最適化リスク微小。

---

## ブランド毀損リスクの再評価

PR #227 brand-risk-report.md は「重大なし」判定。本レビューでは以下を新たに毀損リスク要素として認定:

1. /analytics の公開モックデータ (#001) — 第三者誤認のリスク "中-高"
2. /launch の事実不整合 (#002) — リリース後も "予告" 状態維持で "未ローンチサービス" と誤認されるリスク "中"
3. プライバシーポリシーの Stripe 記述 (#003) — 法的文書としての信頼性低下リスク "中-高"
4. /stats の内部パス露出 (#004) — 技術リテラシー高ユーザーから "粗悪設計" 認知 "低-中"
5. /transparency の月次未更新 (#016) — "透明性" を謳う中での更新停止認知 "低-中"
6. AI解説 disclaimer 11px (#015) — 教育サービスの責任分界曖昧化 "低"

ピボット (PR #100 educational-contribution) の整理漏れが集中的に表面化している。1ヶ月の積み残しではなく、ピボット時点で残った薄皮残骸が時間とともに目立ってきた状況。

---

## 強み (伸ばすべき差別化点)

1. AI コパイロット常駐 + Public API 公開の二段構え — 競合 (siken.com 系) に存在しない独自路線。/api-docs で「学習塾・教育系プロダクト・社内研修など、過去問AI 以外の場所でも利用できます」と明示する Public API は SEO・PR 双方で武器化可能。
2. 教育貢献プロジェクト体裁 — /about, /transparency, /operator で一貫した非営利スタンス。SEO的にも E-E-A-T の Trust 軸を強化する余地大。月次透明性レポート (#016 対応後) を継続できればブランド価値向上。
3. 14,417問規模 + 65記事 blog + 27ファイル essays + 12ファイル e2e — 単体で予備校級。コンテンツ独占性で長期 SEO に有利。

---

## 改善ロードマップ (優先順位順、任意)

ステージA (即時 1-3日):
- 課題001 /analytics 認証化
- 課題003 プライバシーポリシー Stripe 記述削除
- 課題004 /stats 内部パス露出修正
- 課題015 AI解説 disclaimer text-sm 化
- 課題020 /stats 準備中セクション非表示

ステージB (1週間):
- 課題002 /launch 削除 or 改装
- 課題005 /test/sentry production guard
- 課題006 /api-docs noindex
- 課題009 Stripe 残骸全削除
- 課題010 /api/essay-grading 削除 or 統合

ステージC (1-2週間 PR #227 連動):
- 課題007 重複ペア・一時公開8ルート削除
- 課題011, 012, 014 デッドコード削除 (合計 2,900行)
- 課題013 i18n 一式削除

ステージD (1ヶ月):
- 課題008 rate-limit 永続化
- 課題016 /transparency 2026-05 レポート追加
- 課題017 URL ホスト統一
- 課題019 ホーム情報密度整理

---

## 次に投入すべきDispatch候補

1. 緊急ブランド整合性 Dispatch — 課題001 (/analytics 認証), 課題002 (/launch 改装), 課題003 (privacy Stripe削除), 課題004 (/stats 内部パス) を1PR で。所要 2-3時間、ブランド毀損リスク 4件を一掃。
2. PR #227 削除一括実施 Dispatch — 課題007, 034-041, 042-044 と デッドコード 011-014 を段階別 PR 化。所要 3-4時間、コードベース整理 2,900行+ 削減。
3. AI解説責任分界 Dispatch — 課題015 (disclaimer 視認性), 課題016 (transparency 月次更新運用化), 課題022 (operator E-E-A-T 強化) を1PR で。所要 2時間、教育サービスとしての信頼性強化。
4. Rate-limit & コスト管理 Dispatch — 課題008 (Upstash Redis 移行 or Vercel Spend Cap 確認) と AI 月5万円上限の Slack 通知整備。所要 4-8時間。
5. SEO 最終仕上げ Dispatch — 課題017 (URL ホスト統一), 課題006 (api-docs noindex), 課題018 (blog 年次自動更新), 課題028 (sitemap pagination 検証) を1PR で。所要 2時間。

---

レビュー終了 (課題総数 49)
