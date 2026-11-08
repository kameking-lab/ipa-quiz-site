# W2 自動車整備5科目 前年度回 — 共有レジストリ差分（親が直列で反映）

W2 は共有レジストリを編集していない。データ側（`data/questions/automotive/index.ts`）は追加済みで、
`getAutomotiveQuestions()` 経由で既に新しい回が配信される。以下は表示・範囲・説明文を整えるための差分。

## 1. lib/exam-config.ts — yearRange の開始年（令和6年度第2回 = year 2024）

```diff
 "jidosha-1-small-written": {
-    seasons: ["first", "second"], yearRange: { start: 2025, end: 2026 },
+    seasons: ["first", "second"], yearRange: { start: 2024, end: 2026 },
 "jidosha-2-chassis": {
-    seasons: ["first", "second"], yearRange: { start: 2025, end: 2026 },
+    seasons: ["first", "second"], yearRange: { start: 2024, end: 2026 },
 "jidosha-3-motorcycle": {
-    seasons: ["first", "second"], yearRange: { start: 2025, end: 2026 },
+    seasons: ["first", "second"], yearRange: { start: 2024, end: 2026 },
 "jidosha-electrical": {
-    seasons: ["first", "second"], yearRange: { start: 2025, end: 2026 },
+    seasons: ["first", "second"], yearRange: { start: 2024, end: 2026 },
```
`jidosha-2-motorcycle` は追加回が year 2025 / first なので変更不要。expectedQuestions・categories も変更不要。

## 2. lib/questions/source-label.ts — 回ラベル（registry 指定外だが W2 の ownFiles 外のため親で反映）

```diff
 if (q.exam?.startsWith("jidosha-")) {
     if (q.year === 2026 && q.season === "first")
         return "令和8年度第1回（2026年10月4日実施）";
     if (q.year === 2025 && q.season === "second")
         return "令和7年度第2回（2026年3月22日実施）";
+    if (q.year === 2025 && q.season === "first")
+        return "令和7年度第1回（2025年10月5日実施）";
+    if (q.year === 2024 && q.season === "second")
+        return "令和6年度第2回（2025年3月23日実施）";
 }
```

## 3. lib/questions/pool-server.ts — findQuestionById の自動車ID正規表現

新IDは `jidosha-2024-second-…` と `jidosha-2025-first-2-motorcycle-…`。現行の正規表現に一致しないため、
全問題の横断検索フォールバックで解決している（動作はするが遅い）。

```diff
-  const automotive = /^jidosha-(?:2025-second|2026-first)-(1-small-written|…|electrical)-q\d+$/.exec(id);
+  const automotive = /^jidosha-(?:20\d{2}-(?:first|second))-(1-small-written|2-gasoline|2-diesel|2-chassis|2-motorcycle|3-chassis|3-gasoline|3-diesel|3-motorcycle|body|electrical)-q\d+$/.exec(id);
```

## 4. lib/seo/exam-meta.ts — 説明文

```diff
-    "jidosha-1-small-written": "50原問中50問を部分収録。令和8年度第1回・令和7年度第2回の開催科目を対象に、…",
+    "jidosha-1-small-written": "100原問中100問を収録。令和7年度第2回・令和6年度第2回の2回分について、公式正答・全肢解説・必要図を確認できます。",
-    "jidosha-2-chassis": "30原問中30問を部分収録。…",
+    "jidosha-2-chassis": "60原問中60問を収録。令和7年度第2回・令和6年度第2回の2回分について、公式正答・全肢解説・必要図を確認できます。",
-    "jidosha-2-motorcycle": "40原問中40問を部分収録。…",
+    "jidosha-2-motorcycle": "80原問中80問を収録。令和8年度第1回・令和7年度第1回の2回分について、公式正答・全肢解説・必要図を確認できます。",
-    "jidosha-3-motorcycle": "30原問中30問を部分収録。…",
+    "jidosha-3-motorcycle": "60原問中60問を収録。令和7年度第2回・令和6年度第2回の2回分について、公式正答・全肢解説・必要図を確認できます。",
-    "jidosha-electrical": "40原問中40問を部分収録。…",
+    "jidosha-electrical": "80原問中80問を収録。令和7年度第2回・令和6年度第2回の2回分について、公式正答・全肢解説・必要図を確認できます。",
```

## 5. lib/qualifications/catalog.ts — reuseSummary（5件）

```diff
 slug: "jidosha-1-small-written"
-    reuseSummary: "令和8年度第1回・令和7年度第2回の開催科目から、保存50原問中50問を部分収録。…科目ごとの直近2回を揃えたものではありません。…",
+    reuseSummary: "令和7年度第2回・令和6年度第2回の2回分、100原問を収録。公式問題・正答と全選択肢の解説、必要な原図を確認できます。法令は各試験日時点です。解説は独自作成です。",
 slug: "jidosha-2-chassis"            → "令和7年度第2回・令和6年度第2回の2回分、60原問を収録。（以下同文）"
 slug: "jidosha-2-motorcycle"         → "令和8年度第1回・令和7年度第1回の2回分、80原問を収録。（以下同文）"
 slug: "jidosha-3-motorcycle"         → "令和7年度第2回・令和6年度第2回の2回分、60原問を収録。（以下同文）"
 slug: "jidosha-electrical"           → "令和7年度第2回・令和6年度第2回の2回分、80原問を収録。（以下同文）"
```
（以下同文）= 「公式問題・正答と全選択肢の解説、必要な原図を確認できます。法令は各試験日時点です。解説は独自作成です。」

## 6. 件数ピン

- 自動車全体の配信数: 608 → 798（+190）。`getHomeDirectory()` の automotive totalQuestions は自動算出（`__tests__/automotive-release.test.ts` は更新済み）。
- `__tests__/fixtures` に jidosha 系の件数ピンは無い（W2 で確認済み・編集なし）。
- 資格別: 1-small-written 100 / 2-chassis 60 / 2-motorcycle 80 / 3-motorcycle 60 / electrical 80。
- `data/questions/index.ts`・`lib/questions/get-questions.ts`・`lib/questions/types.ts`・`lib/home/home-directory.ts`・`lib/utils.ts` は変更不要。
