# GSC / 検索キャッシュ再取得手順 (2026-05-26)

実機レビュー B-4 / F-6: Google スニペットが旧値「14,402問」を表示し続けている
（現行 HTML は published 基準の 12,653 問）。これは **Google 側のキャッシュ未更新**で、
コードは既に単一情報源（`lib/constants/question-counts.ts`）に統一済み。反映には再クロールが必要。

## 公称問題数の確定値（2026-05-26 時点）

- `TOTAL_QUESTIONS_PUBLISHED` = **12,653**（= `getIndexableQuestions().length`、sitemap と同一）
- 表示ラベル = 「12,000問超」（published を 1,000 単位で切り下げ）
- `TOTAL_QUESTIONS_RAW` = 14,402（内部参照のみ・表示禁止。placeholder 1,742 + needsReview 10 を含む）
- 全 displayed カウント（ホーム / 各試験カード / カテゴリ / sitemap）が published 基準に統一され、合算が 12,653 に一致する。

## 再クロール手順（社長 or 運用者の作業）

1. **Google Search Console** にログイン（プロパティ: `https://www.kakomon-ai.jp`）。
2. **サイトマップ** メニュー → `https://www.kakomon-ai.jp/sitemap.xml` を再送信
   （「再テスト」または削除→再追加）。
3. **URL 検査** で主要ページを個別に「インデックス登録をリクエスト」:
   - `/`（ホーム。スニペットの問題数を更新させる）
   - `/search`、`/ap`、`/ip`、`/fe` など主要 LP
   - 代表的な `/q/*` を数件（リッチリザルト再評価のため）
4. **リッチリザルトテスト**（search.google.com/test/rich-results）で
   `/q/*` の QAPage が単独で認識されることを確認。
5. 反映には通常 数日〜数週間。スニペットの「14,402問」は再クロール後に「12,000問超」へ更新される。

## IndexNow（Bing/Yandex 即時通知）

- 既存手順 `logs/bing-sitemap-resubmit-procedure.md` に従い、主要 URL を IndexNow で送信すると
  Bing 側は即時に再取得される。`INDEXNOW_KEY` / `INDEXNOW_ADMIN_TOKEN` は本番 env に登録済み前提。

## 注意

- コード側の対応は完了。これ以上のコード変更で Google スニペットは変わらない（クロール待ち）。
- 数値を再度変えると（問題追加など）published 値も自動追従するため、手動更新は不要。
