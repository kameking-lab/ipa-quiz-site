# shakai（社会福祉士）第37回追加 — 共有レジストリ差分（親が直列で反映）

W1 ブランチは `data/questions/shakai/`（2024-annual.json 追加・index.ts）と関連テストだけを変更した。
第37回は共通科目81問（第27回精神保健福祉士と同一問題の `seishin/2024-annual.json` を共有、保留4・69・76は出さない）＋専門科目45問＝126問。

## 1. lib/exam-config.ts（shakai）

```diff
     seasons: ["annual"],
-    yearRange: { start: 2025, end: 2025 },
+    yearRange: { start: 2024, end: 2025 },
```
（`sessions` の expectedQuestions 84/45 は1回分の定数なので変更不要）

## 2. lib/qualifications/catalog.ts（slug: "shakai"）

```diff
-    reuseSummary: "第38回（令和7年度）の全129問（共通科目84問・専門科目45問）と全選択肢の解説を収録。",
-    remainingWork: ["第37回・第36回の追加", "法改正で成立しなくなった問題の失効管理"],
+    reuseSummary: "第38回（令和7年度）の全129問と第37回（令和6年度）の126問（共通科目81問・専門科目45問）を、全選択肢の解説付きで収録。",
+    remainingWork: ["第37回 共通科目 問題4・69・76（一次資料で5肢を確定できず保留）", "第36回は旧カリキュラムのため対象外", "法改正で成立しなくなった問題の失効管理"],
```

## 3. lib/seo/exam-meta.ts

```diff
-    shakai: "社会福祉士国家試験の第38回（令和7年度）全129問（共通科目84問・専門科目45問）を収録。…",
+    shakai: "社会福祉士国家試験の第37回・第38回（令和6・7年度）を収録。「2つ選びなさい」の問題も2肢そろえて採点し、公式問題・正答と全選択肢の学習用解説を確認できます。",
 ...
-    shakai: (c, y, k) => `社会福祉士国家試験の第38回（令和7年度）を${c}問・${y}回分・${k}科目で収録。…`,
+    shakai: (c, y, k) => `社会福祉士国家試験の第37回・第38回（令和6・7年度）を${c}問・${y}回分・${k}科目で収録。共通科目・専門科目とも公式問題・正答と全選択肢の学習用解説を確認でき、「2つ選びなさい」は2肢そろえて採点します。`,
```

## 4. その他
- data/questions/index.ts・get-questions.ts は `SHAKAI_QUESTIONS` を使っており変更不要。
- 第37回の共通科目は社会福祉士側が正規URLになる（`getQuestionCanonicalRepresentative` の shakai 優先）。`__tests__/sssc-seishin27-official.test.ts` を同ブランチで更新済み。
- runtime-pins フィクスチャに shakai の問題数（129）が固定されている場合は 255 に更新する。
