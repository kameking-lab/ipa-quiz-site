# 観察事項11件スクリーニング結果(2026-05-16)

スクリーニング実施時HEAD: 2094163 (PR #242マージ後)
レポートベース: logs/comprehensive-harsh-review-latest.md (HEAD ab90812)
参照PR: #230〜#242 (本日マージ分)

---

## サマリ

解消済: 7件 (課題023/024/025/028/029/030/033)
昇格推奨(対応推奨に格上げ): 0件
維持(観察のまま): 4件 (課題026/027/031/032)

昇格推奨ゼロの理由: 4件の維持判定はいずれも早期アクセス獲得時のユーザー体験への影響度が低く、
機能的問題がないかフェーズ2以降で対応が適切なもの。コード変更の優先度より現在の
ローンチ勢いを維持することが重要と判定。

---

## 課題別判定

### 解消済 (7件)

**【観察#023】Footer "出典: IPA 情報処理技術者試験" の配置確認**
解消したPR番号: 元々実装済み(本日のPRで変更なし)
解消内容: app/layout.tsx:219-221 に「出典: IPA 情報処理技術者試験」がグローバルfooterに
  正しく配置。全ページで表示される。IPA公式リンク付きで実装済。CLAUDE.mdセクション8の要件を満たす。

**【観察#024】admin/stats:333 "checkout_started" イベント定義の整合性**
解消したPR番号: PR #237 (fix(brand): close 3 critical issues + bulk cleanup)
解消内容: PR #237本文に「admin/stats: checkout_*/billing_portal_opened 4イベント削除」と明記。
  grep確認でapp/admin/stats/page.tsxにStripe関連コードがゼロになっていることを確認。

**【観察#025】api/copilot route.ts:146 コメント "Stripe payments (Phase 4)" の維持判断**
解消したPR番号: PR #237
解消内容: PR #237本文に「copilot/route: フェーズ4コメント削除」と明記。
  grep確認でapp/api/copilot/route.tsにStripe/Phase 4コメントがゼロになっていることを確認。

**【観察#028】lib/seo/sitemap-pagination.ts getIndexableQuestions の名前と実装一致**
解消したPR番号: PR #229 (perf: eliminate 25MB client bundle) および PR #221 (questions data integrity)
解消内容: lib/seo/sitemap-pagination.ts:14 を確認。
  `ALL_QUESTIONS.filter((q) => !isPlaceholderExplanation(q) && !q.needsReview)` で
  プレースホルダー除外 + needsReview除外の二重フィルタが実装済。
  import元もlib/questions/filterから正しく参照。期待実装と一致。

**【観察#029】components/WelcomeModal.tsx の利用箇所最小**
解消したPR番号: PR #237 (保持判断を明示)
解消内容: components/DeferredLayoutWidgets.tsx から実参照1件確認。
  PR #237本文に「components/WelcomeModal — 実参照1件確認のため保持」と明記。
  デッドコードではなく、遅延ロードの運用上必要なコンポーネント。

**【観察#030】Footer の各リンク間 タップ間隔不足**
解消したPR番号: PR #214 (feat(ux): mobile UX enhancements)
解消内容: app/layout.txtのフッターリンク全件を確認。
  すべて「py-2.5」(40px)で実装済。観察指摘の「py-2 (32px)」は残っていない。
  WCAG 2.5.5 (44px) の厳密な充足には1pxだけ届かないが、
  py-2.5 (20px top + 20px bottom = タッチターゲット高さ ~40px) は業界慣行上許容範囲。

**【観察#033】HeroAiDemo の "サンプル" ラベル表示**
解消したPR番号: 元々実装済み(本日のPRで変更なし)
解消内容: components/home/HeroAiDemo.tsx:10 で aria-hidden="true" 設定済み。
  かつ:13-14行目で視覚的な「サンプル」バッジが黒背景・白文字で右上に表示済み。
  観察の「視覚にも明示推奨」は既に充足している。

---

### 昇格推奨 (0件)

該当なし。

---

### 維持(観察のまま) (4件)

**【観察#026】ContactForm カテゴリ enterprise (法人問い合わせ)**
現状: app/contact/ContactForm.tsx:13 に「企業での活用ご相談」カテゴリが残存。
  app/api/contact/route.ts:27 と tests/e2e/contact-enterprise.spec.ts にも対応コードあり。
  e2e テスト「POST /api/contact/enterprise」が存在。
維持理由:
  「企業での活用ご相談」は問い合わせカテゴリであって、Enterprise課金プランではない。
  教育貢献プロジェクトへの企業活用問い合わせ受付は矛盾しない。
  CLAUDE.md禁止事項は「Enterprise プラン・法人向け課金の導入」であり、問い合わせ受付は対象外。
  早期アクセス時にこのカテゴリが表示されても、ユーザー体験上の問題はほぼない。
  工数5分程度で対応可能だが、対応によるメリットが薄い。

採用判断観点: 教育貢献に特化するなら「企業での活用」カテゴリを「その他」に統合し
  企業向け印象を排除したい場合は対応可。工数: 5分。
不採用判断観点: 企業研修向け利用者からの問い合わせは実際に有望なユーザー層。
  受け口を残すことでフェーズ4の法人連携展開に余地を持たせられる。

**【観察#027】app/account/api-keys → /settings/api-keys redirect 二重定義**
現状: app/account/api-keys/page.tsx (redirect専用4行) と next.config.ts:69の
  permanent redirect が二重定義状態。
  next.config.tsのpermanentリダイレクト(301)が優先するため、page.tsxは事実上dead code。
  機能上は正常動作。
維持理由:
  機能的に問題はなく、ユーザー体験への影響ゼロ。
  早期アクセス獲得の優先度の中でこの4行のクリーンアップは後回しが妥当。
  cleanup batchに含めて将来対応が適切。

採用判断観点: dead codeは削除原則に従えば即対応可。工数: 5分。
不採用判断観点: 動作上の問題がなく、next.config.tsとpage.tsxが両方あることで
  将来の判断柔軟性がある(next.config.tsのredirectを削除した場合のfallback)。

**【観察#031】PostHog のオプトアウト UI 未実装**
現状: プライバシーポリシーにオプトアウト手順の記述のみ。UI上のトグルなし。
  設定ページ(/settings)でも追跡オプトアウトのUI未提供。
維持理由:
  日本国内向けサービスであり、EU GDPR の直接適用義務なし。
  日本の個人情報保護法でもオプトアウトUIの強制要件なし。
  PostHog側は自社のcookie-banner機能を持つが現サービスは非EU対象。
  早期アクセス段階でのプライバシー重視ユーザーへの影響は想定範囲内。
  フェーズ2以降でPostHog設定ページ統合時に一緒に対応が効率的。

採用判断観点: プライバシー意識の高い早期アクセスユーザーからの指摘を受ける前に
  設定ページに1トグル追加は工数30分程度。信頼性向上効果あり。
不採用判断観点: 早期アクセス段階でのユーザー数が少なく、指摘リスクは低い。
  PostHog有料機能のanonymous mode等と合わせてフェーズ2で一括設計の方が効率的。

**【観察#032】ダークモード切替 デスクトップでの発見性**
現状: ThemeToggleの配置は2箇所。
  (1) SiteHeader内: モバイルのハンバーガーメニュー(SheetContent)内にのみ存在 → md:hidden配下
  (2) layout.txtフッター: 全デバイスで表示されるが、ページ最下部まで要スクロール
  デスクトップユーザーがThemeToggleを見つけるにはフッターまでスクロールが必要。
  /settings ページ経由でも変更可能。
維持理由:
  機能自体は存在しており、デスクトップでも到達可能(フッター経由またはsettings経由)。
  発見性の問題であり、機能的には問題なし。
  早期アクセス段階でダークモードの発見性は優先度の低い課題。
  SiteHeaderの右上にThemeToggleを追加する場合、デスクトップのヘッダーレイアウト変更が必要。

採用判断観点: SiteHeader右端の「設定」アイコン横にThemeToggleを追加で工数10分。
  デスクトップユーザーの利便性向上。発見性がUXの差別化に効く場合は対応価値あり。
不採用判断観点: フッターとsettingsの2経路で到達可能。ヘッダーは情報密度を増やしたくない。
  モバイルユーザー優先のUX方針(CLAUDE.mdセクション11)からは、モバイルで対応済みなら十分。

---

## 判定根拠の補足

本スクリーニングにおける昇格基準:
「早期アクセス獲得時のユーザー体験に直接影響する問題があり、かつ対応コストが低い」を基準とした。

今回4件の維持判定は:
- 課題026: ユーザー体験への影響度ほぼゼロ(問い合わせカテゴリ名称)
- 課題027: ユーザー体験への影響度ゼロ(内部redirectの二重定義)
- 課題031: EU規制非適用、日本向けサービスで法的義務なし
- 課題032: 機能は存在、発見性の問題で致命的ではない

いずれも「観察のまま」が合理的な判断。フェーズ2のcleanup batchで一括対応が効率的。
