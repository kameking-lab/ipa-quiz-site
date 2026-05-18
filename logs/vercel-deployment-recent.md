# Vercel 直近デプロイ状態ログ

調査日時: 2026-05-18

## Production デプロイ履歴（直近5件）

1. ipa-quiz-site-7xg3pccof (READY / Production)
   - 作成: 2026-05-17T15:32 UTC (1779031524)
   - main HEAD: 194eb4f (PR #288 merge)
   - 備考: 現在の本番稼働デプロイ。正常動作中。

2. ipa-quiz-site-opndts0si (ERROR / Production)
   - 作成: 2026-05-17T14:47 UTC (1779029256)
   - 備考: recovery workflow の API トリガー。VERCEL_TOKEN API 経由で発火したが ERROR。
     ログ未確認だがレートリセット直後の transient error と推定。

3. ipa-quiz-site-f462pj4i2 (ERROR / Production)
   - 作成: 2026-05-17T13:36 UTC (1779024960)
   - 備考: API payload に repoId が欠如していた PR #286 時代のデプロイ。API エラーで失敗。

4. ipa-quiz-site-oa3e3kbek (ERROR / Production)
   - 作成: 2026-05-17T13:21 UTC (1779024102)
   - 備考: 同上。recovery workflow の修正前。

5. ipa-quiz-site-pb7pd80z4 (ERROR / Production)
   - 作成: 2026-05-17T08:42 UTC (1779007372)
   - 備考: dynamicParams=false による BUILD FAILURE (SSG で動的ルートが 404)。
     commit 141d9c4 が原因。PR #288 で revert 済み。

## アカウント状態

- plan: hobby
- status: active
- softBlock: null
- 現在ブロックなし。デプロイ正常動作中。

## 直近 Preview デプロイ (本日 May 18)

- ipa-quiz-site-cmiyey674: Ready / Preview (13h前)
- ipa-quiz-site-gze1vzgxx: Ready / Preview (13h前)
- いずれも正常。recovery workflow の schedule run によるもの。
