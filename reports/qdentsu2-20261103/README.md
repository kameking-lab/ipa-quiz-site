# qdentsu2 採用・受入票

対象は2級電気通信工事施工管理技術検定の**第一次検定**、2025年度後期と2026年度前期の別個の2開催。各65原問、合計130教材・520肢解説・16図。受験時に解答する40問と教材65問を区別する。2026年度後期は2026-11-15予定で、2026-11-03時点では未実施。第二次検定の完成は主張しない。

既存固定制作物18 JSONと16図をハッシュ照合して再利用した。基点の5問に125問を追加し、2026前期問9のコンパイラ解説を原問の翻訳処理の範囲に訂正した。既存固定版では同問のインタプリタ解説も「1命令ごと」に合わせて改善済みであり、それを維持する。原問題文・選択肢・公式正答は変更していない。

`ACCEPTANCE.json` は原典PDF4本、採用JSON18本、図16点、全130問の番号・原典URL・物理ページ・正答・原文と選択肢のハッシュ・原稿全体ハッシュ・例外を対応づける。`sha256` は検査時の実バイト、`normalizedLfSha256` はGitの改行変換を考慮したテキスト同一性の検査値。問題単位のハッシュ生成方法も票内に記載した。PDF原本・抽出草稿は新規コミットに含めない。

2025後期問21は、IPv6の/64境界について原文の限定が足りないため参照専用。公式正答4を保持し、通常採点129問、参照1問とする。共有のID判定・保存拒否を維持し、通常出題プールから除外する。参照ページは `/q/tsushin2/2025-late/gakka/q21`。原問と4肢・公式正答・仕様上の注意を表示し、回答操作を設けない。

## 検査の再現

```powershell
pnpm exec tsx scripts/validate-questions.ts --exam=tsushin2
pnpm exec tsx scripts/verify-two-round-coverage.ts --exam=tsushin2 --expected-per-round=65 --round=2025-late --round=2026-early
pnpm exec vitest run __tests__/questions/tsushin2-two-rounds.test.ts __tests__/components/tsushin2-study.test.tsx __tests__/questions/jctc-first-wave.test.ts __tests__/storage/history-store.test.ts __tests__/components/QuizPlayer.completion.test.tsx __tests__/components/QuestionAnswerCard.test.tsx __tests__/lib/spaced-repetition.test.ts --maxWorkers=1
pnpm exec tsc --noEmit
pnpm build
# 資格専用worktree・資格専用ローカルserver・新規ブラウザcontextで実施する。
# 起動時に実キー/DB/Redis/個人セッション情報を渡さない。
node scripts/verify-tsushin2-browser.mjs http://127.0.0.1:3198 <証跡保存先>
```

検査結果と採用コミットの結合は、本人指定の `C:/Users/kanet/Documents/Codex/2026-11-02/task-2/qdentsu2-report.md` と同階層の `qdentsu2-evidence/` に保存する。ブラウザ検査後は当該サーバーを停止し、このworktreeの `.next` を削除する。

## 再利用した受入と限界

- 既存固定原稿：`qual10-telecom2-private-finish/outputs/qual10-review-packet/candidate-overlay`。
- 内容受入：同作業の `outputs/final-private-closure-20261101/FINAL-RECEIPT.json`。全原問・全肢の新規再制作、全件の再査読は行わず、同版の受入を再利用した。
- 原典正答は一時領域の公式PDFから問題番号行と解答行を独立解析し、130問すべて照合した。原典4本のSHA-256は準備票と一致。
- 既存の通常保存HOLD票を合格証拠には転用しない。今回の隔離検証結果を別記する。
- 法令基準日の明示値は既存原稿にない。推測した日付を加えていない。解説の法令内容は同版受入の再利用範囲であり、全肢の新規法令監査とは区別する。
- 権利は今回の本人指示どおり取得済みとして扱う。各問の出典・加工表示と既存licenseラベルを維持し、新たな独立許諾認定や公開承認とは扱わない。
- push・PR・デプロイ・本番DB書込み・実キーによるAI生成は実施しない。本番読戻しはこのローカル受入に含めない。
