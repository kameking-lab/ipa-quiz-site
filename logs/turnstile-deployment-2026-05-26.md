# Cloudflare Turnstile デプロイ手順 (2026-05-26)

実機レビュー A-2 / F-5: `/contact` フォームにスパム対策が一切なかった
（Turnstile/reCAPTCHA のウィジェット・script・検証すべて不在）。本フェーズで
既存の `lib/turnstile.ts` + `components/TurnstileWidget.tsx`（死蔵していた）を
`/contact` フォームと `/api/contact` に実配線した。

## 実装状態（コード側・完了）

- `app/contact/ContactForm.tsx`: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` が設定されている時のみ
  Turnstile ウィジェットを描画し、トークンを送信ボディに含める。
- `app/api/contact/route.ts`: `kind: "contact"` 受信時に `verifyTurnstileToken` で検証。
  失敗時は 403。
- **fail-open 設計**: `TURNSTILE_SECRET_KEY` 未設定時は検証をスキップ（`skipped: true, ok: true`）。
  ウィジェットも site key 未設定時は非描画。→ dev / CI / 本番アクティベート前は**従来どおり動作**。

## 本番アクティベーション（社長 / 運用者の作業・1 回のみ）

1. **Cloudflare ダッシュボード** → Turnstile → サイト追加（ドメイン `kakomon-ai.jp`）。
   Widget Mode は「Managed」推奨。
2. 発行された **Site Key** と **Secret Key** を取得。
3. **Vercel** → Project → Settings → Environment Variables に登録:
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` = （公開鍵。Production / Preview）
   - `TURNSTILE_SECRET_KEY` = （秘密鍵。Production / Preview。Sensitive 推奨）
4. 再デプロイ（env 反映のため）。
5. `/contact` を開き、フォーム下部に Turnstile ウィジェットが表示されることを確認。
   ウィジェット未完了で送信すると「スパム対策の確認が完了していません」エラー、
   完了後は正常送信されることを確認。

## CSP 注意

`next.config.ts` の CSP に Turnstile のドメインを追加する必要がある場合がある:
- `script-src` / `frame-src` に `https://challenges.cloudflare.com` を追加。
- 現状 `frame-src https://vercel.live` のみ。アクティベート時に
  `https://challenges.cloudflare.com` を `script-src` と `frame-src` へ追記すること。
  （未追記だとウィジェットの iframe/script が CSP でブロックされる。）

## ロールバック

- env を削除（または空に）すれば fail-open に戻り、ウィジェット非表示・検証スキップで
  従来動作に復帰。コード変更不要。
