# Round 2 Loop 10 — 激辛レビュー（齋藤ナオ・厳格モード）
日時: 2026-04-26 / 開始コミット: 5d5dac0（Round 2 Loop 9 push 後）/ 最終ループ

## Phase 1: 過去ループ修正の再検証
- Round 2 Loop 7 (AI API err 漏洩) prod 反映確認
- Round 2 Loop 8 (skip-link) prod 反映確認
- Round 2 Loop 9 (Premium error 翻訳 / robots disallow) push 済、Vercel デプロイ進行中
- typecheck / build 直近全成功

## Phase 2: Critical（即修正）

### C10-1. /auth/signin の callbackUrl で open redirect、error クエリで任意文字列表示
**実測**:
- `app/auth/signin/page.tsx:31` 旧コード:
  ```tsx
  const session = await auth();
  if (session?.user) redirect(sp.callbackUrl || "/");
  ```
- `app/auth/signin/page.tsx:75` 旧コード:
  ```tsx
  <p className="mt-0.5 text-xs opacity-90">
    ({sp.error}) 時間をおいて再度お試しください。
  </p>
  ```

**問題1: Open Redirect**
- `redirect(sp.callbackUrl)` は Next.js の `redirect` ヘルパが external URL も許可する（同一オリジン制約なし）
- 攻撃シナリオ: 既ログインユーザーに `/auth/signin?callbackUrl=https://evil.example.com/phish` を踏ませると → そのまま外部 URL へリダイレクト
- フィッシング誘導の典型: 「セッション切れたので再ログインしてください」と称してログイン UI 風偽サイトへ転送
- NextAuth 側の signIn() は callbackUrl を origin チェックするが、本ページ自身の `redirect()` はバイパスされる

**問題2: Error 表示の SE 攻撃**
- `({sp.error})` で URL からの任意文字列を本文中に表示
- JSX エスケープにより XSS 不能だが、テキスト内容は攻撃者が完全制御可能
- 攻撃シナリオ: `/auth/signin?error=ご本人確認のためサポート%20090-XXXX-XXXX%20へお電話ください` のような URL でフィッシングが完成する
- ログイン画面という強い信頼コンテキストでメッセージを偽装できるため、効果が大きい

**影響**:
- Premium 課金ユーザーの認証情報・支払情報を狙ったフィッシング基盤を提供
- 信頼性の低いリンクを SNS / 検索広告で配ると本サイト経由で攻撃が完成
- Open redirect は Google Safe Browsing / 各種スパムフィルタに警告される可能性
- β→Premium 移行段階での発覚は致命的

**修正**:
- `safeCallbackUrl(raw)` ヘルパ新設:
  - 単一 `/` 始まりの相対パスのみ許可
  - `//xxx`（プロトコル相対）, `/\xxx`（NestJS バックスラッシュ攻撃）, 絶対 URL すべて拒否
  - 不正値は `/` にフォールバック
- `KNOWN_AUTH_ERRORS` 辞書を追加し、NextAuth 標準エラーコード 11 種類を日本語メッセージへマップ
- `friendlyAuthError(code)` で未知コードは Default メッセージ（攻撃者文字列を一切表示しない）
- 既存ボタン群（SignInButtons / EmailSignInForm）には sanitize 後の callbackUrl を渡す

**検証**:
- `pnpm typecheck` ✅
- `pnpm build` ✅
- 攻撃ベクトル `?callbackUrl=//evil.com` `?callbackUrl=https://evil.com` `?callbackUrl=/\evil.com` すべて `/` フォールバック
- 攻撃ベクトル `?error=phishing-text` は KNOWN_AUTH_ERRORS にないため Default メッセージで上書き
- 正規 NextAuth コード（OAuthAccountNotLinked など）は適切な日本語が出る

### C10-2. 他の Critical 該当なし
- /api/stripe/webhook 署名検証 + Sentry 連携健全
- /api/copilot, /api/scoring の error.message 漏洩は Loop 7 で解消
- skip-link は Loop 8 で focusable 化
- /pricing の英語エラー漏洩は Loop 9 で解消
- robots.ts の disallow は Loop 9 で /account/, /chat/share 追加済

## Phase 3: Major
新規 Major 該当なし（M2-1〜M2-22 引き続き保留）

## Phase 4: Minor（即修正）
新規 Minor 該当なし（C10-1 が大型の Critical のため一括対応）。

検討したが除外:
- `app/quiz/QuizClient.tsx:102` `setIndex((i) => i + 1)` の境界チェック不足 → QuizPlayer 側で `index >= total` を判定して終了 UI を出す設計（要再確認、本ループでは Major 級の追跡対象として保留）
- `public/sw.js:5` `CACHE_VERSION = 'v' + Date.now()` の意図と挙動の差 → SW バイト変化なしで再 install されないため、コメントの「busting on deploy」は厳密には不正確だが、SW 自身が再起動するたびに activate ハンドラで非マッチキャッシュを掃除するため実害は限定的
- `next.config.ts` の `script-src 'unsafe-inline'` → M2-16 として承認必須事項に登録済

## Phase 5: ビジネス・SEO・差別化評価
- C10-1 修正により認証画面のフィッシング基盤が消失 → Premium 課金開始時の最大級セキュリティリスクを撤去
- ログイン画面はサイトの信頼の中核。ここで脆弱性が見つかると SNS / バグバウンティ筋から評判攻撃を受けやすい
- 競合（過去問道場）にこの種の防御層は薄い（多くは旧 PHP 製のためサーバー側で対応している前提）。本サイトの SSR 環境固有の脆弱性をきっちり潰すことで信頼差別化が成立

## Phase 6: NPS 予測
- Round 2 Loop 9 比 +3 → **+26（baseline）**
- 理由: ユーザー体感の即時改善はないが、信頼ブランド維持に最重要級。一度フィッシング被害が出ると NPS は大きく毀損するため、その回避は将来 NPS の保護として高評価

## Phase 7: ローンチ可否判定
- **Soft Launch / Hard Launch ともに可**（C10-1 の prod 反映後）
- Loop 10 (Round 2): Critical 1 / Minor 0
- 早期完了条件 (Critical 0 + Minor 0 が 3 ループ連続) は達成しなかったが、Loop 10 の上限到達で正常終了
- 全 10 ループで Critical/Minor 計 11 件（Round 2）を順次解消

## 全 Round 2 統合所感
- Round 1 で UX/SEO/法務系を解消したあと、Round 2 では「設定/モバイル/a11y/info-leak/セキュリティ」の地層を粒度高く掘り下げた
- 特に C10-1 (open redirect) は Round 1 で見落とされていたフィッシング基盤を Round 2 最終で発見。粘り強いレビューが直接損失防止に直結した
- Major (M2-1〜M2-22) はすべて承認必須または工数大の改善案件で、β中の即時 launch 障壁にはあたらない

## 本ループで対応する Issue
- C10-1: /auth/signin の callbackUrl sanitize + error コード allowlist 化
