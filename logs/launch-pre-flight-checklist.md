# 公開直前チェックリスト — 過去問AI ローンチ

作成日: 2026-05-16
対象URL: https://www.kakomon-ai.jp
ブランチ: chore/launch-readiness (main HEAD: 2094163)

本ファイルは早期アクセス開始（本格的な公開告知）直前に本人が手動実施するチェックリストです。
各項目を確認したら [ ] を [x] に変更してください。

---

## 1.1 技術系チェック

### デプロイ確認

- [ ] Vercel Dashboard でプロダクションデプロイが main HEAD (2094163) と一致している
  確認場所: https://vercel.com/dashboard > ipa-quiz-site > Production Deployment
  期待値: Latest deployment のコミットSHAが 2094163 (または それ以降)

- [ ] Vercel Build ログにエラー/警告ゼロ
  確認場所: Vercel Dashboard > Deployments > 最新の Build Logs

### 主要URL 200確認（ブラウザまたはcurlで確認）

- [ ] / (ホーム)
- [ ] /ap (応用情報トップ)
- [ ] /sc (情報処理安全確保支援士トップ)
- [ ] /ap/q/2025-spring-am/q1 (個別問題ページ例)
- [ ] /essays/sc/2024-spring-pm2/q1 (essays個別ページ例)
- [ ] /stats (学習統計)
- [ ] /blog (ブログ一覧)
- [ ] /blog/kakumon-gakushuu-science (最新ハブ記事)
- [ ] /about (概要・著作権)
- [ ] /transparency (AI透明性開示)
- [ ] /privacy (プライバシーポリシー)
- [ ] /contact (お問い合わせ)
- [ ] /faq (よくある質問)

### 削除済みルートの 404 確認（PR #237 で削除済み）

PR #237 で削除した 8 ルートが正しく 404 を返すこと:
- [ ] /pricing — 404
- [ ] /dashboard — 404
- [ ] /settings — 404
- [ ] (削除対象の残りルートは logs/cleanup-list.md 参照)

### SEO基盤

- [ ] https://www.kakomon-ai.jp/sitemap.xml にアクセスし、XMLが返る
  期待値: 4,136 URL 以上が含まれる (URLCountは sitemap内の <url> タグ数で確認)

- [ ] https://www.kakomon-ai.jp/robots.txt が正常配信される
  確認内容: Disallow: /admin のみ許可制限、User-agent: * が Allow: / になっている
  確認内容: "Stop Claude" / "Stop Anthropic" 等の意図しない拒否ルールがないこと

- [ ] canonical が正しく設定されている（ホームを例に確認）
  確認方法: / を開いて DevTools > Elements で <link rel="canonical" href="https://www.kakomon-ai.jp/" /> を確認

### OGP・動的画像

- [ ] /api/og が正常動作する
  確認URL: https://www.kakomon-ai.jp/api/og?type=home&title=過去問AI
  期待値: 1200x630 の OGP 画像が返る

- [ ] Twitter OGP が Twitter Card Validator で正常表示
  確認ツール: https://cards-dev.twitter.com/validator (URLを入力してプレビュー)
  対象: / と /blog/kakumon-gakushuu-science の 2 URL

### AI・バックエンド機能

- [ ] AI コパイロットが動作する
  確認方法: /ap/q/2025-spring-am/q1 を開き、問題に回答後「解説してください」ボタンを押す
  期待値: ストリーミングでAI解説が返ってくる（5秒以内に最初のトークン）

- [ ] レート制限が動作する（任意確認）
  確認方法: AI コパイロットを 30 回以上送信し、制限メッセージが表示されることを確認
  ※ 本番Vercel KV が設定済みの場合のみ確認すること

### 監視・ログ基盤

- [ ] PostHog イベント送信確認
  確認方法: ブラウザ DevTools > Network タブを開き、app.posthog.com へのリクエストを確認
  期待値: pageview イベントが送信されている

- [ ] Sentry DSN が設定されている
  確認方法: Vercel Dashboard > Settings > Environment Variables で SENTRY_DSN が設定済み
  または: 存在するはずのないURLを開いて 404 エラーがSentryに届くか確認

### 管理機能

- [ ] /admin/funnel が Basic Auth で保護されアクセスできる
  確認方法: /admin/funnel を開き、ブラウザの Basic Auth ダイアログが表示される
  ログイン後: ファネルデータが表示される

- [ ] /admin/api-usage が Basic Auth で保護されアクセスできる

---

## 1.2 コンテンツ系チェック

### 試験区分

- [ ] 13 試験区分すべてがホーム画面から選択可能
  確認対象: IP / SG / FE / AP / ST / SA / PM / NW / DB / ES / SC / SM / AU

- [ ] 各試験区分トップページが正常表示（AP と SC を代表として確認）

### essays

- [ ] /essays/sc (情報処理安全確保支援士 午後II) が表示される
- [ ] 業種切替タブ（金融/医療/製造/流通/サービス/官公庁/情報通信/その他）が動作する
- [ ] essays の各解答本文にプレースホルダ文字列が残っていないこと
  確認: 「TODO」「PLACEHOLDER」「[業種名]」等の文字列がないこと

### ブログ

- [ ] /blog で記事一覧が 80 本以上表示される（PR #241 で 80 本超を生成済み）
- [ ] ハブ記事 5 本が /blog 一覧に表示される
  確認: 「過去問演習の科学」「応用情報合格後」「IPA試験と他のIT資格」「13区分共通」「参考書ガイド」

### 法的・ポリシーページ

- [ ] /privacy が最新の内容（2026年版）を表示している
- [ ] /transparency が PR #235 の最新内容（AI開示・編集プロセス）を表示している
- [ ] /about に「出典: IPA 情報処理技術者試験」の表記がある
- [ ] 全フッターに IPA 出典表記がある

---

## 1.3 SEO系チェック

### GSC

- [ ] GSC でプロパティ https://www.kakomon-ai.jp/ が「確認済み」状態
  確認場所: https://search.google.com/search-console

- [ ] sitemap.xml が GSC に登録済み
  確認場所: GSC > サイトマップ > https://www.kakomon-ai.jp/sitemap.xml のステータスが「成功」

- [ ] 最優先 8 URL の個別 URL 検査申請を済ませた（logs/gsc-inspection-targets-final.md 参照）

### Bing Webmaster Tools

- [ ] https://www.bing.com/webmasters でプロパティが確認済み
- [ ] sitemap.xml を Bing Webmaster Tools に提出済み

### IndexNow

- [ ] IndexNow 4,136 URL の一括申請が完了している
  確認: logs/indexnow-final-submit.md を参照
  注意: 2026-05-17 20:55 JST 以降に残りの申請が完了予定

### 構造化データ

- [ ] 主要ページの schema.org 構造化データが Google リッチリザルトテストで通る
  確認ツール: https://search.google.com/test/rich-results
  対象: /ap/q/2025-spring-am/q1（個別問題ページ）

---

## 1.4 運用系チェック

### 環境変数（機密確認）

- [ ] Vercel の Environment Variables に機密値（APIキー等）が平文で表示されていない
  確認場所: Vercel Dashboard > Settings > Environment Variables
  確認方法: Variable 名だけが見えて値が隠蔽されていることを確認
  特に: GEMINI_API_KEY / POSTHOG_API_KEY / ADMIN_PASSWORD / KV_REST_API_TOKEN

- [ ] .env.local が .gitignore されていることを確認済み
  確認方法: git status / git ls-files | grep .env で .env ファイルが追跡されていないこと

### その他運用

- [ ] 障害時の連絡手段を確認（本人のスマートフォン・PC にアクセスできる状態）
- [ ] Vercel の通知設定でデプロイ失敗時のメール通知が有効
  確認場所: Vercel > Settings > Notifications

---

## チェックリスト完了基準

上記すべての [ ] が [x] になったら公開告知を開始してよい。

未完了項目がある場合は、その項目の対処を優先すること。
特に 1.1 技術系と 1.3 SEO系は告知前に必ず完了させること。
