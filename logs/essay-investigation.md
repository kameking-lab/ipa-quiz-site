# 業種別合格答案 Phase 1 調査結果

## 調査日: 2026-05-07

## 1. 既存 essay インフラ (app/essay/)

### ルート構造
- `app/essay/page.tsx` — 論述添削トップページ
- `app/essay/[exam]/` — `page.tsx` は**存在しない**（[questionId]ディレクトリのみ）
- `app/essay/[exam]/[questionId]/page.tsx` — 各問の論述エディタ

### lib
- `lib/essay/types.ts` — EssayQuestion, Industry 型定義
- `lib/essay/load.ts` — ESSAY_EXAM_CODES = ["st","sa","pm","sm","au"]（SC未含む）

### data
- `data/questions/essay/` — st.ts, sa.ts, pm.ts, sm.ts, au.ts, index.ts

## 2. 業種バリアント既存実装 (data/questions/afternoon/)

### 対象試験
- ST, SA, PM, SM, AU に `{year-season}-industries.ts` あり
- SC には industries ファイル**なし**

### IndustryVariant 型（lib/afternoon/types.ts）
- industryId: manufacturing | construction | finance | retail | telecom | public
- essayA / essayI / essayU の3セクション構造
- **注: ユーザー指定5業種 (it/finance/construction/healthcare/public) とは異なる**

## 3. SC 既存データ

- `data/questions/afternoon/sc/2024-spring.ts` — SC午後I（記述式）のみ
- SC午後II問題データ**なし**
- `data/questions/afternoon/sc/index.ts` — 2024春のみ

## 4. 新機能の対象パス

- データ: `data/essays/sc/{year-season}/pm2/{qnum}/{industry}.ts` → **新規作成**
- UI: `app/essays/[exam]/page.tsx` → **新規作成**（`app/essay/`とは別）
- UI: `app/essays/[exam]/[yearSeason]/[section]/[qnum]/page.tsx` → **新規作成**
- lib: `lib/essays/types.ts`, `lib/essays/load.ts` → **新規作成**

## 5. リンク現状

`app/[exam]/page.tsx` L405:
```tsx
<Link href={`/essay/${code}#sample-answers`}>業種別 合格答案サンプル</Link>
```
→ Phase 2-D で `/essays/${code}` に変更

## 6. SC pm2 問題テーマ（作成方針）

| 年度 | テーマ |
|------|--------|
| 2023春 | 内部不正対策とアクセス制御設計 |
| 2024春 | クラウドサービス利用時のセキュリティ設計 |
| 2025春 | ゼロトラストアーキテクチャの設計と実装 |

## 7. 生成規模

- 3年度 × 1問 × 5業種 = **15 答案ファイル**
- 各 2000-2400字、序論(200-300)→本論(1500)→結論(300-500)
- 5業種: it / finance / construction / healthcare / public
