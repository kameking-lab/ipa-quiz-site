# AP問題 大量追加 Dispatch 成果確認レポート
作成日時: 2026-05-07

## 1. 現状サマリー

| 項目 | 状況 |
|------|------|
| 取得済み回数 | 5回（2023春〜2025春） |
| 取得済み問題数 | 400問（80問×5回） |
| 未取得回数 | 27回 |
| プレースホルダー | **0件**（全問にexplanationあり） |
| 本番HTTP | 200 OK / 400問表示 |
| Dispatch成果 | **未実行 or 完了なし**（このworktreeに変更なし） |

---

## 2. 取得済み年度

| ファイル | 問題数 | explanation |
|----------|--------|-------------|
| 2023-spring.ts | 80問 | 80問 ✅ |
| 2023-autumn.ts | 80問 | 80問 ✅ |
| 2024-spring.ts | 80問 | 80問 ✅ |
| 2024-autumn.ts | 80問 | 80問 ✅ |
| 2025-spring.ts | 80問 | 80問 ✅ |

---

## 3. 未取得年度（27回分）

AP試験全32回（2009春〜2025春、2020春COVID中止）のうち未取得：

```
2009-spring, 2009-autumn
2010-spring, 2010-autumn
2011-spring, 2011-autumn
2012-spring, 2012-autumn
2013-spring, 2013-autumn
2014-spring, 2014-autumn
2015-spring, 2015-autumn
2016-spring, 2016-autumn
2017-spring, 2017-autumn
2018-spring, 2018-autumn
2019-spring, 2019-autumn
2020-autumn（2020春はCOVID中止）
2021-spring, 2021-autumn
2022-spring, 2022-autumn
```

追加されれば +2,160問（27回×80問）→ 合計2,560問になる見込み。

---

## 4. Dispatch ブランチ確認

- **現ブランチ**: `claude/epic-wing-11f7ec`
- **HEAD**: `c4ca4e4` (feat(domain): ipa-quiz-site.vercel.app → kakomon-ai.jp に全置換)
- **main HEAD**: `5dedb3c`（この worktree は main から分岐後、変更なし）
- `claude/pr-a-ap-coverage` ブランチ：AP問題は未追加、スクリプト系削除が主

---

## 5. 他試験比較（問題数）

| 試験 | 問題数 | カバレッジ |
|------|--------|----------|
| IP   | 2,398問 | 多年度対応 |
| FE   | 1,747問 | 2009〜2024 |
| SC   | 1,735問 | 多年度対応 |
| AP   | 400問  | **2023〜2025のみ** ← 要拡充 |
| SG   | 442問  | - |

---

## 6. 品質メモ

- 2025春 q1（論理式問題）の explanation に矛盾表現あり：
  「問題の指示によりエが正解とされていますが、一般的な論理学の解釈ではRの真偽にかかわらず真とはなりません」
  → explanation の信頼性確認が必要

---

## 7. 結論・次アクション

**AP問題大量追加 Dispatch は未実行**（worktreeにデータ追加なし）。

次ステップ候補：
1. `pnpm parse:pdfs --exam=ap --year=2009 --season=spring` 〜 2022秋 まで逐次実行
2. `lib/exam-config.ts` の yearRange は2009〜2025で設定済みのためパーサーは動作可能
3. GEMINI_API_KEY が必要（コスト: 27回分 × 数十円 ≒ 1,000円前後）

