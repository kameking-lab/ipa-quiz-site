# Phase 5: ブランド棄損情報スキャン報告

調査対象: HEAD 37e85b7
スキャン日: 2026-05-16


## 5.1 公開すべきでない情報

優先度: High

1. app/stats/page.tsx:121
   - 公開 stats ページに内部開発用ファイルパスを露出:
     `セットアップ手順: <code>logs/gsc-setup-guide.md</code>`
   - ユーザー向け本番UIに開発者向け運用文書のパスが表示される
   - 推奨アクション: 当該文言を削除またはユーザー向け案内に書き換え
   - ブランド棄損度: 中 (技術リテラシー高のユーザーは違和感を持つ)

2. app/admin/moderation/page.tsx:34
   - モックデータに架空PII含む:
     「鈴木さんの携帯 08012345678 と taro@example.com に共有しました。マイナンバー 123412345678 も含めて削除をお願いします」
   - BasicAuth 保護下の admin 領域内
   - 判定: モデレーション機能のテストデータとして許容、ただし要レビュー

3. console.log 残存 (app/ 配下):
   - app/api/email/route.ts:89 — `console.log("[email] mock send", ...)` (環境変数で切替されるモック送信)
   - app/api/contact/route.ts:87 — 構造化ログ(PII マスク後の Datadog 取り込み想定、コメント明記)
   - app/api/question-feedback/route.ts:42 — `console.log("[question-feedback]", JSON.stringify(payload))`
     - これは feedback ペイロードを生 JSON でログ出力。PII マスクが入っているか要確認
   - app/error.tsx, app/global-error.tsx — エラーバウンダリの error 出力(正当)

   推奨: question-feedback の PII マスク適用確認、必要に応じてマスキング追加

4. app/api/email/route.ts:86
   - フォールバック送信元: `noreply@ipa-quiz.example.com`
   - RESEND_FROM_EMAIL 未設定時に存在しないドメインから送信される構成
   - 推奨: フォールバックを安全側 (本番では send_mail を無効化) に変更

5. 個人名 / 社内固有名詞:
   - app/operator/page.tsx, app/error.tsx, app/privacy/page.tsx で GitHub Issues リンク (kameking-lab/ipa-quiz-site) を公開
   - 判定: 公開リポジトリへの誘導で意図的、ブランド棄損なし


## 5.2 PR #100 (educational-contribution ピボット) の残骸

優先度: High

教育貢献プロジェクト・ボランティア有志運営の体裁にピボットしたが、Stripe / enterprise / paid 関連の文言が複数箇所に残存:

1. app/launch/page.tsx:67
   - フェーズ4ロードマップに「Stripe 決済(月300円 Premium)」「法人チームプラン」「論文添削AI」
   - launch ページ全体が削除推奨ルートのため、Phase 1 と同時解消

2. app/privacy/page.tsx:83-85, 141
   - 「プレミアムプラン等の有料機能をご利用の際は、決済情報を Stripe が直接処理します」
   - 「当社サーバーには Stripe 顧客 ID と契約状態のみを保存」
   - 「第三者 Cookie の発行はありません(Stripe Checkout への遷移時を除く)」
   - 判定: 現在 Stripe 未実装の状態で「ご利用の際は」と書かれており、ユーザーに混乱を与える可能性
   - 推奨: プライバシーポリシーから Stripe 関連記述を一旦削除、フェーズ4実装時に再追加

3. app/admin/stats/page.tsx:333
   - 「Stripe Checkout 起動」イベント定義
   - admin 内部画面なので公開リスクは低、ただし整合性のため削除推奨

4. app/analytics/page.tsx:194
   - 「プレミアム課金状況: Stripe Dashboard(フェーズ4実装後)」
   - 内部ダッシュボード、許容

5. app/api/copilot/route.ts:146
   - コメント: `// unlocked once Stripe payments are implemented (Phase 4).`
   - コード内コメント、許容範囲

6. app/contact/ContactForm.tsx:12, app/api/contact/route.ts:27
   - お問い合わせカテゴリに `enterprise = "企業での活用ご相談"`
   - 教育貢献ピボット後も法人問い合わせ受付は維持か要オーナー確認
   - 判定: 意図的に残存しているなら維持、ピボットで完全削除予定なら除去

7. tests/e2e/contact-enterprise.spec.ts
   - PAID_MODE env で切り替え、教育貢献モードでは 404 を期待するテストあり
   - 判定: 切り替え可能性を保持した設計、許容


## 5.3 i18n dead infrastructure

優先度: Medium (ブランド棄損ではないが運用上のリスク)

- lib/i18n/I18nProvider.tsx が app/layout.tsx で配線済み
- useI18n / useTranslation / I18nProvider の利用は app/ 配下ゼロ
- messages/ja.json, en.json, zh.json (合計 13KB) が完全未参照
- 判定: 多言語対応の設計だけが残った dead infrastructure
- リスク: ユーザーは多言語対応に気付かない、開発者は混乱
- 推奨: 削除またはコメントで「将来実装予定」明記


## 5.4 誤情報・古い情報

優先度: Medium

1. ハードコード問題数 12,000問 (app/launch/page.tsx)
   - 実態 14,417問との乖離 (Phase 3 参照)
   - launch/ 削除と同時に解消

2. 公開フッター「正式リリース予告」(app/launch/page.tsx:78)
   - 2026-05-16 時点で既にリリース当月、状態未更新

3. IPA著作権・引用の整合:
   - app/about/page.tsx で出典明記確認済
   - 各問題ページの sourcePdfUrl も維持されている(PR #221 audit 済み)
   - 判定: 著作権ルール遵守


## 5.5 倫理・法的リスク

優先度: Low (大きな問題なし)

- IPA 著作権関連は適切に運用
- プライバシーポリシー記述は概ね整合、ただし Stripe 記述の早期記載が誤情報リスク
- 個人情報マスキング: lib/feedback/pii-masker.ts に PII マスク実装あり、app/api/contact/route.ts で使用確認済


## 件数サマリ

- 内部ファイルパス公開露出: 1件 (app/stats/page.tsx:121)
- console.log 残存・要レビュー: 1件 (app/api/question-feedback/route.ts:42)
- メール送信フォールバック設定リスク: 1件 (app/api/email/route.ts:86)
- Stripe 記述残骸: 6箇所 (launch, privacy, admin/stats, analytics, copilot, contact)
- 法人問い合わせカテゴリ整合性: 1件 (要オーナー確認)
- i18n dead infrastructure: 1セット (lib + messages)
- 問題数ハードコード不整合: 2箇所 (launch/ 内)
- 状態未更新の「予告」表記: 1箇所 (launch)


## 段階別アクション提案(削除実施は別ディスパッチ)

段階1 (High Priority):
- app/stats/page.tsx:121 の内部パス露出を即修正
- app/api/email/route.ts:86 の本番フォールバック挙動を確認
- app/api/question-feedback/route.ts:42 の PII マスキング確認

段階2 (Brand Cleanup):
- app/launch/ 削除(問題数・状態・Stripe 関連を一括解消)
- app/privacy/page.tsx の Stripe 関連記述を一時削除(フェーズ4 実装時に再追加)
- app/admin/stats/page.tsx の checkout_started イベント定義削除

段階3 (Owner Decision):
- 法人問い合わせ enterprise カテゴリの維持判断
- i18n 一式の削除または将来実装宣言

段階4 (Verification):
- IPA 著作権・引用範囲の定期レビュー
- プライバシーポリシーの定期見直し
