# 学習計画の土台（kp-1）

画面は kp-2 で接続する。DBスキーマ、価格、無料枠、AI呼び出し・採点の判定は変更しない。

## 作成・表示

- `createPacePlan({ id: crypto.randomUUID(), exam, sessionId, examDate, startDate }, questions, nowISO)` → `savePacePlan(plan)`。保存失敗は `false`。`questions` はその資格の演習可能な問題の `{id, exam, year}`。年度・科目等を狭める前の資格全体を渡す。ライブラリ等も同じ形式へ投影できる。
- 日程なし・随時受験で予約日未入力は `examDate: null`。日付を作り出さない。日程の回は `sessionId` に保存する。別の回へ変更するときは新しい計画を作り、分母を撮り直す。
- `listPacePlans()`、`deletePacePlan(id)`。変更時は `updatedAt` も変更する。削除は同期用の印を残すため、古いクラウドの計画が復活しない。
- `getPaceAttempts(createHistoryStore().getAllEntries())` で既存履歴と新しい永続解答を合わせ、`calculatePace(plan, attempts, todayJST)` に渡す。最後の解答のみで定着を判定する。ポイントはメーターに使用しない。
- `passingLineForExam(exam)` は目印と出典、既定値か否か、科目別・IRT等の条件を返す。これは合否予測ではない。`planOutfitForExam(exam)` は未登録なら共通の服。
- `forecastPercent`、`requiredQuestionsPerDay` 等が `null` の場合は数字を表示しない。受験日を過ぎると `daysRemaining < 0`。当日は残りを今日必要な問題数として返す。

## 問題の追加と今日の問題

- 500問以下は全年度、501問以上は収録されている直近5年度。資格ごとの手入力設定を持たない。
- 作成時の問題IDを保存し、問題が追加されても分母を維持する。最初が200問未満なら `refreshThinRange(plan, latestQuestions, todayJST)` を表示前に呼び、返り値が変わったときだけ保存する。月曜に始まる週に最大1回、補充を加え、その週は遅れ判定を猶予する。既存IDを取り除かない。
- `selectTodayQuestions(plan, latestQuestions, attempts, allowance, dueIds, resumeId)` は復習→続き→新問に確認問題約10%を組み込む。後から増えた問題も選ばれる。`allowance` には**既存の無料枠・契約判定後の残り枠**を渡す。この関数に利用制限の判定を移さない。全問正解なら既存の正解問題を確認問題として返す。

## 行動・同期

- 日別の分換算は `dailyLearningPoints(getLearningActions())`、保存先は `LS_KEYS.learningPoints`。同一問題の解答加点は1日1回。解答5秒未満は0、通常3分、記述15分、論述30分、五枠6分。これはサービス内のポイント重みであり、公式試験時間ではない。AI質問2分は同じ問題で累計2回まで、解説読了1分は同じ問題で1日1回まで。
- 通常・ストリームのクイズは `useQuestionActivity` で前面表示中の時間だけ計測する。解説末尾の可視状態と5秒以上の閲覧後の操作を合わせて記録する。タイマー・表示・IntersectionObserver単独では加点しない。AI質問は既存コパイロットで正常な応答を受け取ったとき記録する。
- 他の問題形式の画面には `recordLearningAction({ id: uniqueActionId, questionId, exam, kind, at, activeMs, questionType, correct? })` を使える。記述の自己照合は正解を推測しない。採点されない問題に `correct: true` を渡さない。
- `CloudSyncAutoSync` から新しい計画・行動だけを自動同期。未ログインは端末のみ。既存の `/api/account/study-plan-sync` と `StudyPlan.payload/progress` のJSONを使用。従来計画には混ぜない。学習行動は不変IDで和集合を取り、複数端末の重複を排除する。共有端末で別アカウントのデータは引き継がない。
- 同期リクエストに `includePace: true` がある新しいクライアントだけに、新形式のJSONを返す。従来のクライアントには従来の計画のみを返し、古い画面の互換性を保つ。
- 保存更新イベントは `study-plan:changed`。クラウドマージ時には再送ループを避けて発火しない。ポイント・計画の表示を再取得するタイミングは画面側で管理する。

## 日程

`GET /api/exam-schedule/{exam}` → `{ exam, qualificationIds, source, sessions, unavailableQualificationIds }`。

各回は `id/label/qualificationId/applicationStart/applicationDeadline/examDate/examDateEnd/examPhaseWindows/resultDate/scheduleStatus/sourceUrl/verifiedDate/datePrecision/applicationEstimated/estimateLabel/unannounced`。未確認日付は `null`。`tentative` と `applicationEstimated` の予定情報を表示側に渡す。上流の `missing` は日付を補わず `tentative, unannounced: true` として返す。`ondemand` は予約日を入力する。`source: manual` の場合も手入力で計画作成できる。

中継は固定オリジン＋対応表にあるIDだけを使用し、5秒で打ち切る。上流は1時間キャッシュ。障害・不正JSON・対応なしでは既存の公式日程へ切り替え、申込期間・合格発表は補完しない。代替も無ければ空配列。障害時の応答キャッシュは60秒。

対応表は11/16の調査CSV（次の資格 `kakomon-crosslink-summary.json`＋既存 `tsugino-qualification.ts` の照合済みデータ）から生成。184区分・複数対応を保持。現行の公開crosslinksは古いため、件数を減らさない。

## 拡張の点検

`pnpm exec tsx --tsconfig scripts/tsconfig.question-corpus.json scripts/check-study-plan-policy.ts`。新規区分も現行ホームから検出する。対応なし・合格基準が既定・専用衣装なし・日程の確認から90日以上（確認日なしも含む）を警告する。日程の確認日は対応調査と既存公式データの確認日を参照。CIを失敗させない。
