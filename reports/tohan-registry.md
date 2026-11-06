# tohan（登録販売者）令和6年度追加 — 共有レジストリ差分（親が直列で反映）

W1 ブランチ `qual/w1-20261106` は `data/questions/tohan/` だけを変更した（2024-kansai.json 追加・index.ts で連結）。以下は共有ファイルへの反映案。

## 1. lib/exam-config.ts（tohan）

```diff
 tohan: {
     code: "tohan",
-    nameFull: "登録販売者試験（関西広域連合）",
+    nameFull: "登録販売者試験",
 ...
     seasons: ["kansai"],
-    yearRange: { start: 2025, end: 2025 },
+    yearRange: { start: 2024, end: 2025 },
 },
```
※表示名から地域名（関西広域連合）を外す（オーナー方針）。発行元は各問の出典表記にだけ残る（`sourceAttribution`: 「出典：関西広域連合 令和6年度 登録販売者試験（前半）問1。…」）。

## 2. lib/qualifications/catalog.ts（slug: "tohan-kansai"）

```diff
-    shortName: "登録販売者（関西）",
-    fullName: "登録販売者試験（関西広域連合：滋賀・京都・大阪・兵庫・和歌山・奈良・徳島）",
+    shortName: "登録販売者",
+    fullName: "登録販売者試験",
 ...
-    reuseSummary: "令和7年度（2025年8月23日実施）の全120問と各選択肢の解説を収録。",
+    reuseSummary: "令和6年度（2024年8月31日実施）・令和7年度（2025年8月23日実施）の各120問、計240問と各選択肢の解説を収録。",
 ...
-    remainingWork: ["令和8年度は公式の「正答(例)」のみで確定正答の公表待ち", "他の年度（令和元〜6年度）の追加", "東京都・神奈川県など他ブロックは個別に確認"],
+    remainingWork: ["令和8年度は公式の「正答(例)」のみで確定正答の公表待ち", "他の年度（令和元〜5年度）の追加", "東京都・神奈川県など他ブロックは個別に確認"],
```
（`administrator: "関西広域連合"` と `attributionTemplate` は出典表記なので残す）

## 3. lib/seo/exam-meta.ts

```diff
-    tohan: "登録販売者試験の令和7年度 関西広域連合（滋賀・京都・大阪・兵庫・和歌山・奈良・徳島）の全120問を収録。…",
+    tohan: "登録販売者試験の令和6年度・令和7年度の各120問、計240問を収録。公式正答と、厚生労働省の手引きに沿った全選択肢の解説を確認できます。",
 ...
-    tohan: "登録販売者試験（関西広域連合）",
+    tohan: "登録販売者試験",
 ...
-    tohan: (c, y, k) => `登録販売者試験（関西広域連合・令和7年度）を${c}問・${y}期分・${k}分野収録。…`,
+    tohan: (c, y, k) => `登録販売者試験（令和6・7年度）を${c}問・${y}回分・${k}分野収録。公式正答と、厚生労働省「試験問題の作成に関する手引き」に沿った全選択肢の解説で学べます。`,
```

## 4. lib/utils.ts（任意・地域名を画面から外す場合）

`seasonLabel("kansai")` が「関西広域連合」を返し、`formatYearSeason(2025, "kansai")` は「令和7年度 関西広域連合」になる。地域名を表示から外すなら:

```diff
-    if (season === "kansai")
-        return "関西広域連合";
+    if (season === "kansai")
+        return "";
```
とし、`formatYearSeason` が末尾の空白を残さないこと（`令和7年度`）を確認する。反映時は `__tests__/tohan-kansai-2025.test.ts` の
`expect(formatYearSeason(2025, "kansai")).toBe("令和7年度 関西広域連合");` を新表記に更新する。URL の `2024-kansai` / `2025-kansai` は変えない。

## 5. 不要なもの
- data/questions/index.ts・get-questions.ts・types.ts・home-directory.ts は変更不要（`TOHAN_QUESTIONS` に 2024 年度を連結済み）。
- runtime-pins フィクスチャに tohan の問題数（120）が固定されている場合は 240 に更新する。
