# 解説プレースホルダー監査 — 2026-05-17 (Final Batch 開始時点)

## サマリー
- main: `09a0207 fix(data): fill 150 AP explanation placeholders (batch 2, 246 -> 96) (#262)` 取込済
- ブランチ: `refine/explanation-fill-final`
- 厳密判定 (audit-questions.ts): **placeholder-explanation 96 件**
- 緩判定 (find-placeholder-explanations.ts, length<50 含む): 551 件
- 本タスクの対象は厳密判定の 96 件 (placeholder 0 件達成目標)

## 試験区分別
| 区分 | 件数 |
| --- | --- |
| ap | 96 |
| 他 | 0 |

## 年度×時期ヒートマップ
| 年度/時期 | 件数 | 画像あり | 画像なし |
| --- | --- | --- | --- |
| 2017-autumn | 6 | (要確認) | (要確認) |
| 2018-autumn | 17 | (要確認) | (要確認) |
| 2019-spring | 15 | (要確認) | (要確認) |
| 2021-spring | 58 | (要確認) | (要確認) |
| **合計** | **96** | 45 | 51 |

## 図表依存内訳
- hasImage=true: **45 件** (--include-images で生成、図表非依存の選択肢解析中心)
- hasImage=false: **51 件**

## 検出パターン (audit-questions.ts §PLACEHOLDER_PATTERNS)
- `^正解は[アイウエ]です[。.]\s*$` — 正解のみ
- `解説は準備中`
- `AIコパイロット` 誘導文
- `^\s*TODO\s*$`
- `Placeholder`
- `準備中です`

## 致命傷 (critical) ステータス
- 0 件 (placeholder は opportunity 扱い)

## 次フェーズ
- Phase 1: `pnpm regen:explanations -- --include-images` で 96 件全件再生成
- 推定コスト: 約 $0.04 (Gemini 2.5 Flash-Lite, 96 req × 平均 800 in + 400 out token)
