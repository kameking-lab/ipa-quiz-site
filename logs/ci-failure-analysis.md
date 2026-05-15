# CI Failure Analysis — Run 25914234874

## Summary

PR #196 (`security/rotate-basic-auth-v2`) の E2E CI が 4 テスト失敗。

## Root Cause: Secret 未登録状態での CI 実行

| 項目 | 時刻 (UTC) |
|------|------------|
| CI run 25914234874 開始 | 2026-05-15 10:58:07Z |
| ADMIN_BASIC_USER secret 登録 | 2026-05-15 11:32:09Z |
| ADMIN_BASIC_PASS secret 登録 | 2026-05-15 11:32:10Z |

CI が Secrets 登録の **34分前** に実行されたため、env var が空文字列として CI に渡された。

## 失敗テスト詳細

### テスト 1 〜 3: `Expected 401, Received 503`

`middleware.ts:40-45` の設計により、`ADMIN_BASIC_USER` または `ADMIN_BASIC_PASS` が未設定の場合に
意図的に 503 を返す（設定ミス通知用）。secrets が空だったため全リクエストが 503 になった。

```
/admin/stats without credentials → Expected 401, Got 503
/admin/metrics without credentials → Expected 401, Got 503
/admin/stats with wrong credentials → Expected 401, Got 503
```

### テスト 4: `ADMIN_BASIC_USER and ADMIN_BASIC_PASS must be set`

`tests/e2e/admin-auth.spec.ts:25-27` のガード節が env var 未設定を検知してテスト自体を失敗させた。

## 修正方針

コード修正は不要。secrets が登録された状態で CI を再実行するだけで全テスト通過する見込み。

- `e2e.yml` の参照構文 `${{ secrets.ADMIN_BASIC_USER }}` は正しい
- `middleware.ts` の 503 挙動は仕様通り（misconfiguration signal）
- E2E テストコードに問題なし

## 対応: 空コミット push で CI 再起動

```
commit d684097 "ci: trigger E2E after secrets propagation"
branch: security/rotate-basic-auth-v2
pushed: 2026-05-15 ~13:xx UTC
```

## 期待結果

secrets 登録済み状態での CI 実行:
- テスト 1〜3: middleware が user/pass を持つ → 未認証リクエストに 401 を返す → PASS
- テスト 4: env var 読み取り成功 → 有効な認証情報で 200 → PASS
