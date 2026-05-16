# refine/content-quality-polish — 作業計画

ベース: cc2a8da (origin/main)
作業ブランチ: refine/content-quality-polish
領域分離: data/questions/afternoon/*-industries.ts + logs/

## 対象範囲

39件 essays 軽微違反 (audit-essays.ts 検出)
+
14件 推奨課題のうち essays 加筆で対応可能なもの

## 違反タイプ別修復方針

### (c) 業種固有制度名 不足 — 25件
- 各 essay 本文中に該当業種の制度名・法令を 2-3件追加挿入
- INDUSTRY_TERMS (scripts/audit-essays.ts) に含まれるキーワードのみ使用
- 業種別に頻出する実在制度を選定 (捏造禁止)
- 加筆量: 50-150字/件

### (f) キャラクター設定 — 11件
- essayA 冒頭 400字以内で組織名と規模情報の両方を明示
- ORG_PATTERN: B社 形式 or [2-10JP]+院/社/庁/市 等
- SIZE_PATTERN: "病床数約X床" "従業員数約X名" "売上高約X億円" 等
- 主に healthcare の T病院 → T中央病院 + 病床数表記の整形

### (b) 設問ウ比率 不足 — 3件
- essayU に 250-400字の段落を追加
- 内容: 評価点の総括 / 今後の展望 / 継続改善計画
- 元の骨子は維持、加筆のみ

### (d) 推進課題パラグラフ — 3件
- 既存段落のうち1-2を「課題」「困難」「リスク」「問題」を含む形に整形
- もしくは新規パラグラフを追加

## 推奨課題14件 (品質系抽出)

レビュー報告書 logs/comprehensive-harsh-review-latest.md より、
本 Dispatch のスコープ (data/questions/afternoon/*-industries.ts) で対応可能な
品質系課題を抽出:

- #015 disclaimer 視認性 → 別Dispatch (components/quiz/ExplanationCard.tsx 領域)
- #016 transparency 月次未追加 → 別Dispatch (app/transparency 領域)
- #017 URL ホスト不整合 → 別Dispatch (app/api-docs 等)
- #018 blog 年次更新 → 別Dispatch (data/blog 領域)
- #022 operator E-E-A-T → 別Dispatch (app/operator 領域)

→ 推奨課題14件のうち data/questions/afternoon/ 領域に該当する品質系は **0件**。

理由: 推奨課題はすべて UI・SEO・運用領域に存在し、
essays コンテンツ加筆では対応不能。
領域分離の原則 (並行Dispatchとの衝突回避) に従い、
本Dispatchでは essays 軽微違反39件のみ完全処理する。

## バッチ計画

バッチ1: (f) healthcare 9件 + (f) retail 1件 + (f) +他重複対応 → AU/PM/SA/SM/ST の healthcare/retail
バッチ2: (c) IT・情報サービス業 9件 → AU/PM/SA/SM/ST の it
バッチ3: (c) finance/telecom/manufacturing/retail/public 16件 → 業種別に集約
バッチ4: (b) essayU 加筆 3件
バッチ5: (d) 課題段落追加 3件

## 完了条件
- 軽微違反39 → 0 を目標 (修復困難項目はその件数を別タスク化推奨として報告)
- 全項目合格率 90% (108/120) 以上
- pnpm typecheck / pnpm lint / pnpm build 全成功
