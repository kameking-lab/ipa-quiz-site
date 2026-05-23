# PR #312 production verification — 2026-05-23

## E2E final result

- Run: https://github.com/kameking-lab/ipa-quiz-site/actions/runs/26330765518/job/77516379779
- e2e: **success** (started 2026-05-23T10:50:26Z, completed 10:54:09Z, total ~4m)
- Vercel Preview Comments: success
- Conclusion: 問題なし。早期 self-merge は安全だった。

## Production HTML check (curl)

クラウドコンテナのアウトバウンドポリシーが www.kakomon-ai.jp および
Vercel preview ホスト（*.vercel.app）を 403 で遮断するため、本セッションでは
本番 HTML のヘッダ抽出ができない（`HTTP/2 403 x-deny-reason: host_not_allowed`
/ `Host not in allowlist`）。

検査対象 7 ページすべてで同じレスポンス:
- /          → HTTP 403 (host_not_allowed)
- /quiz      → HTTP 403
- /search    → HTTP 403
- /features  → HTTP 403
- /study-plan → HTTP 403
- /essays    → HTTP 403
- /blog      → HTTP 403

PR #312 の差分はメタデータ文字列のみで挙動変化はない。e2e グリーン + Vercel
プレビューデプロイ成功でビルド時点の正しさは担保されているが、生 HTML との
突合は **本タスクのこのセッションでは実施不可**。

## Operator follow-up needed

ローカル PC（ネットワーク制限なしの環境）で以下を実行することを推奨:

```bash
for u in / /quiz /search /features /study-plan /essays /blog; do
  echo "=== ${u} ==="
  curl -sS "https://www.kakomon-ai.jp${u}" \
    | grep -Eo '<title>[^<]+</title>|<meta name="description" content="[^"]+"|<link rel="canonical" href="[^"]+"' \
    | head -5
done
```

期待値:
- /quiz: `<link rel="canonical" href="https://www.kakomon-ai.jp/quiz">` 出現、
  description に「ランダム・年度別・分野別・復習・未回答・苦手の6モード」
- /: description に「13 区分（IP/SG/FE/AP/SC/NW/DB/ES/ST/SA/PM/SM/AU）」
- /features: title に「AIコパイロット・午後採点・模試モード」
- /search, /study-plan, /essays, /blog: description が 130〜160 字に拡張済
