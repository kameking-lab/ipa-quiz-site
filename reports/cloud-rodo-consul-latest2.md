# 労働安全・労働衛生コンサルタント／作業環境測定士 直近2回監査

確認日: 2026-11-03。現在の `claude/loving-goodall-df47l4` ブランチのみを使用。

## 追加方式の確認

- `data/questions/eisei1`・`eisei2`: 原文・選択肢・公式正答・独自解説・問別出典URLをJSONに保持し `index.ts` から公開する。
- `lib/qualifications/catalog.ts` を公開判定の台帳として使用。`live` 以外は通常の資格一覧・演習・資格ルートに公開しない。
- 登録箇所は `lib/questions/types.ts`、`lib/exam-config.ts`、`data/questions/index.ts`、`lib/questions/get-questions.ts`。公開前候補も `scripts/validate-questions.ts` から検証する。
- 別系統の `data/exam-library` と `/e-learning/exams/qualifications/*` には対象3資格の既存コンテンツがある。今回の新規資格収録と区別し、既存公開内容は変更しない。
- [リンク条件](https://www.exam.or.jp/h_link/)はリンク許可の説明であり、転載の包括許諾とは扱わない。確認した公表一覧と取得PDFのテキストに転載・複製禁止の明記は見つからなかった。著作権の放棄を意味しない。

## 労働安全コンサルタント

追加 **0問**。資格単位で除外し、非公開の判断台帳のみ登録。

[公式公表一覧](https://www.exam.or.jp/cskohyo/)の掲載2回は **令和7年10月21日（2025-10-21）・令和6年10月22日（2024-10-22）実施分**。2026年度を推測で直近回に含めない。

掲載科目は産業安全一般・産業安全関係法令・機械安全・電気安全・化学安全・土木安全・建築安全。PDF全14冊を取得確認。例: [2025年産業安全一般](https://www.exam.or.jp/wp-content/uploads/2025/11/CS20251901.pdf)、[2024年産業安全一般](https://www.exam.or.jp/wp-content/uploads/2024/12/CS20241901.pdf)。

除外理由: [資格紹介](https://www.exam.or.jp/introduction/h_shokaiconsul/)・[公式FAQ](https://www.exam.or.jp/faq04/)では筆記と口述の双方がある一方、公表一覧には筆記科目だけが掲載され、口述問題の掲載はない。「公式に全問が公開されていない資格は問題本文を収録しない」を資格全体に適用した判断である。筆記の問題が欠落しているという意味ではない。また公式一覧は記述式に正答の記載がないことを明記する。これを独自の正答で補完しない。

検証: `pnpm install` 後、`pnpm validate:questions`・`pnpm typecheck`・既存安全衛生ハブ／資格登録関連テストを実施（結果は末尾に記録）。ビルド・デプロイ・PR作成は実施しない。

## 労働衛生コンサルタント

追加 **0問**。資格単位で除外し、非公開の判断台帳のみ登録。

[公式公表一覧](https://www.exam.or.jp/cskohyo/)の掲載2回は **令和7年10月21日（2025-10-21）・令和6年10月22日（2024-10-22）実施分**。

掲載科目は労働衛生一般・労働衛生関係法令・健康管理・労働衛生工学。PDF全8冊を取得確認。例: [2025年労働衛生一般](https://www.exam.or.jp/wp-content/uploads/2025/11/CS20251908.pdf)、[2024年労働衛生一般](https://www.exam.or.jp/wp-content/uploads/2024/12/CS20241908.pdf)。

除外理由: 労働安全コンサルタントと同じく、筆記・口述のうち公表一覧にあるのは筆記問題だけで、口述問題の掲載はない。ユーザー指定の全問公開条件を資格全体に適用。健康管理・労働衛生工学の記述式には公式正答がなく、独自解答を公式正答として登録しない。筆記の択一問題自体が未公開という意味ではない。
