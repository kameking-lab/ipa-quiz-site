# 問題データ品質レポート

生成日: 2026-10-11
総問題数: **500**
平均品質スコア: **77 / 100**

## 試験区分別サマリー

| 試験 | 総数 | OK | NG | WARN | 平均スコア |
|------|------|----|----|------|------------|
| judo-seifukushi | 500 | 500 | 0 | 478 | 77 ████████░░ |

## 検証結果

- ✅ OK: 500
- ❌ FAIL: 0
- ⚠️ WARN: 478

## スコア算出ルール

| チェック項目 | 減点 |
|-------------|------|
| 問題文 < 10文字 | −20 |
| topicTags が空 | −15 |
| 解説 < 30文字（要確認） | −30 |
| 解説 < 50文字 | −20 |
| 不安言い回し検出（～かもしれません等） | −15 |
| hasImage=true で imageUrls なし | −10 |
| multiple-choice に choices なし | −25 |
| 選択肢に空文字あり | −10 |
| needsReview フラグあり | −20 |

## エラー一覧 (最大50件)

（なし）

## 警告一覧 (最大100件)

- `judo-seifukushi-2025-annual-am-q1`: question < 10文字
- `judo-seifukushi-2025-annual-am-q1`: explanation < 50文字 (37字)
- `judo-seifukushi-2025-annual-am-q2`: explanation < 50文字 (42字)
- `judo-seifukushi-2025-annual-am-q3`: explanation < 50文字 (42字)
- `judo-seifukushi-2025-annual-am-q4`: explanation < 50文字 (47字)
- `judo-seifukushi-2025-annual-am-q5`: explanation < 50文字 (41字)
- `judo-seifukushi-2025-annual-am-q6`: explanation < 50文字 (36字)
- `judo-seifukushi-2025-annual-am-q7`: explanation < 50文字 (36字)
- `judo-seifukushi-2025-annual-am-q8`: explanation < 50文字 (31字)
- `judo-seifukushi-2025-annual-am-q9`: explanation < 50文字 (34字)
- `judo-seifukushi-2025-annual-am-q10`: explanation < 30文字 (28字) — 要確認
- `judo-seifukushi-2025-annual-am-q11`: explanation < 50文字 (34字)
- `judo-seifukushi-2025-annual-am-q12`: explanation < 50文字 (32字)
- `judo-seifukushi-2025-annual-am-q13`: explanation < 50文字 (41字)
- `judo-seifukushi-2025-annual-am-q14`: explanation < 30文字 (21字) — 要確認
- `judo-seifukushi-2025-annual-am-q15`: explanation < 30文字 (29字) — 要確認
- `judo-seifukushi-2025-annual-am-q16`: explanation < 50文字 (30字)
- `judo-seifukushi-2025-annual-am-q17`: explanation < 50文字 (33字)
- `judo-seifukushi-2025-annual-am-q18`: explanation < 50文字 (34字)
- `judo-seifukushi-2025-annual-am-q19`: explanation < 30文字 (28字) — 要確認
- `judo-seifukushi-2025-annual-am-q20`: explanation < 50文字 (42字)
- `judo-seifukushi-2025-annual-am-q21`: explanation < 30文字 (26字) — 要確認
- `judo-seifukushi-2025-annual-am-q22`: explanation < 50文字 (31字)
- `judo-seifukushi-2025-annual-am-q23`: explanation < 50文字 (31字)
- `judo-seifukushi-2025-annual-am-q24`: explanation < 50文字 (37字)
- `judo-seifukushi-2025-annual-am-q25`: explanation < 50文字 (40字)
- `judo-seifukushi-2025-annual-am-q26`: explanation < 50文字 (32字)
- `judo-seifukushi-2025-annual-am-q27`: explanation < 50文字 (32字)
- `judo-seifukushi-2025-annual-am-q28`: explanation < 50文字 (33字)
- `judo-seifukushi-2025-annual-am-q29`: explanation < 50文字 (40字)
- `judo-seifukushi-2025-annual-am-q30`: explanation < 50文字 (36字)
- `judo-seifukushi-2025-annual-am-q31`: explanation < 50文字 (34字)
- `judo-seifukushi-2025-annual-am-q32`: explanation < 50文字 (41字)
- `judo-seifukushi-2025-annual-am-q33`: explanation < 30文字 (25字) — 要確認
- `judo-seifukushi-2025-annual-am-q34`: explanation < 50文字 (34字)
- `judo-seifukushi-2025-annual-am-q35`: explanation < 30文字 (24字) — 要確認
- `judo-seifukushi-2025-annual-am-q36`: explanation < 30文字 (28字) — 要確認
- `judo-seifukushi-2025-annual-am-q37`: explanation < 50文字 (34字)
- `judo-seifukushi-2025-annual-am-q38`: explanation < 50文字 (43字)
- `judo-seifukushi-2025-annual-am-q39`: explanation < 30文字 (26字) — 要確認
- `judo-seifukushi-2025-annual-am-q40`: explanation < 50文字 (30字)
- `judo-seifukushi-2025-annual-am-q41`: question < 10文字
- `judo-seifukushi-2025-annual-am-q41`: explanation < 50文字 (39字)
- `judo-seifukushi-2025-annual-am-q42`: explanation < 50文字 (35字)
- `judo-seifukushi-2025-annual-am-q43`: explanation < 50文字 (33字)
- `judo-seifukushi-2025-annual-am-q44`: explanation < 50文字 (39字)
- `judo-seifukushi-2025-annual-am-q45`: explanation < 50文字 (37字)
- `judo-seifukushi-2025-annual-am-q46`: explanation < 50文字 (43字)
- `judo-seifukushi-2025-annual-am-q47`: explanation < 50文字 (34字)
- `judo-seifukushi-2025-annual-am-q48`: explanation < 50文字 (32字)
- `judo-seifukushi-2025-annual-am-q49`: explanation < 50文字 (40字)
- `judo-seifukushi-2025-annual-am-q50`: explanation < 50文字 (38字)
- `judo-seifukushi-2025-annual-am-q51`: explanation < 50文字 (34字)
- `judo-seifukushi-2025-annual-am-q52`: explanation < 30文字 (27字) — 要確認
- `judo-seifukushi-2025-annual-am-q53`: explanation < 30文字 (23字) — 要確認
- `judo-seifukushi-2025-annual-am-q54`: explanation < 30文字 (26字) — 要確認
- `judo-seifukushi-2025-annual-am-q55`: explanation < 30文字 (28字) — 要確認
- `judo-seifukushi-2025-annual-am-q56`: explanation < 30文字 (22字) — 要確認
- `judo-seifukushi-2025-annual-am-q57`: explanation < 30文字 (23字) — 要確認
- `judo-seifukushi-2025-annual-am-q58`: explanation < 50文字 (31字)
- `judo-seifukushi-2025-annual-am-q59`: explanation < 30文字 (24字) — 要確認
- `judo-seifukushi-2025-annual-am-q60`: explanation < 30文字 (26字) — 要確認
- `judo-seifukushi-2025-annual-am-q61`: explanation < 30文字 (27字) — 要確認
- `judo-seifukushi-2025-annual-am-q62`: explanation < 50文字 (31字)
- `judo-seifukushi-2025-annual-am-q63`: explanation < 30文字 (25字) — 要確認
- `judo-seifukushi-2025-annual-am-q64`: explanation < 50文字 (31字)
- `judo-seifukushi-2025-annual-am-q65`: explanation < 30文字 (28字) — 要確認
- `judo-seifukushi-2025-annual-am-q66`: explanation < 30文字 (28字) — 要確認
- `judo-seifukushi-2025-annual-am-q67`: explanation < 30文字 (29字) — 要確認
- `judo-seifukushi-2025-annual-am-q68`: explanation < 30文字 (27字) — 要確認
- `judo-seifukushi-2025-annual-am-q69`: explanation < 50文字 (31字)
- `judo-seifukushi-2025-annual-am-q70`: explanation < 30文字 (27字) — 要確認
- `judo-seifukushi-2025-annual-am-q71`: explanation < 30文字 (19字) — 要確認
- `judo-seifukushi-2025-annual-am-q72`: explanation < 30文字 (18字) — 要確認
- `judo-seifukushi-2025-annual-am-q73`: explanation < 30文字 (29字) — 要確認
- `judo-seifukushi-2025-annual-am-q74`: explanation < 30文字 (26字) — 要確認
- `judo-seifukushi-2025-annual-am-q75`: explanation < 30文字 (28字) — 要確認
- `judo-seifukushi-2025-annual-am-q76`: explanation < 30文字 (22字) — 要確認
- `judo-seifukushi-2025-annual-am-q77`: explanation < 30文字 (28字) — 要確認
- `judo-seifukushi-2025-annual-am-q78`: explanation < 30文字 (22字) — 要確認
- `judo-seifukushi-2025-annual-am-q79`: explanation < 50文字 (37字)
- `judo-seifukushi-2025-annual-am-q80`: explanation < 30文字 (27字) — 要確認
- `judo-seifukushi-2025-annual-am-q81`: explanation < 50文字 (30字)
- `judo-seifukushi-2025-annual-am-q82`: explanation < 50文字 (30字)
- `judo-seifukushi-2025-annual-am-q84`: explanation < 50文字 (30字)
- `judo-seifukushi-2025-annual-am-q85`: explanation < 50文字 (31字)
- `judo-seifukushi-2025-annual-am-q86`: explanation < 50文字 (30字)
- `judo-seifukushi-2025-annual-am-q87`: explanation < 30文字 (26字) — 要確認
- `judo-seifukushi-2025-annual-am-q88`: explanation < 30文字 (25字) — 要確認
- `judo-seifukushi-2025-annual-am-q89`: explanation < 50文字 (37字)
- `judo-seifukushi-2025-annual-am-q90`: explanation < 30文字 (26字) — 要確認
- `judo-seifukushi-2025-annual-am-q91`: explanation < 50文字 (34字)
- `judo-seifukushi-2025-annual-am-q92`: explanation < 50文字 (31字)
- `judo-seifukushi-2025-annual-am-q93`: explanation < 50文字 (48字)
- `judo-seifukushi-2025-annual-am-q94`: question < 10文字
- `judo-seifukushi-2025-annual-am-q94`: explanation < 50文字 (34字)
- `judo-seifukushi-2025-annual-am-q95`: explanation < 50文字 (31字)
- `judo-seifukushi-2025-annual-am-q96`: explanation < 50文字 (33字)
- `judo-seifukushi-2025-annual-am-q97`: explanation < 50文字 (39字)
- `judo-seifukushi-2025-annual-am-q98`: explanation < 50文字 (30字)
