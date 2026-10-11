# OT13 recovered-source explanation handoff

11採点対象原問の全55肢解説と、公式採点除外2問の説明を完成したローカル統合候補です。原問・5肢・正答セルは先行回収済みSOURCE-PACKETSを再利用し、元画像37点（うち選択肢25点）を改変せず保持しています。

| canonical site year | Official sitting | Session | Gradable original numbers | Official exclusion |
| --- | --- | --- | --- | --- |
| 2024 | Round 60 / actual exam 2025 | AM | 2, 6, 9 | — |
| 2024 | Round 60 / actual exam 2025 | PM | 1, 2, 4, 6, 7, 8, 9 | 98 |
| 2025 | Round 61 / actual exam 2026 | AM | 72 | 42 |

既存サイトの年度別名を保持し、実施年はSOURCE-EVIDENCEへ別に記録しています。AM6とPM1は2肢選択です。PM98・AM42は公式通知に従う採点除外で、空欄正答を維持し、臨床上の正誤を補作していません。

## Integration paths

- `data/qualification-staging/sagyo-ryohoshi/ot13-recovered/questions.ts`: existing `Question` interfaceに型適合する11原問・55肢解説。
- `data/qualification-staging/sagyo-ryohoshi/ot13-recovered/excluded.ts`: 通常の`Question`と分離した公式採点除外2原問。
- `public/questions/sagyo-ryohoshi/ot13-recovered/`: 原図37点。
- `__tests__/questions/sagyo-ot13-recovered.test.ts`: 原文・公式解答・画像ハッシュ・採点除外・未登録を検査する18テスト。
- 本ディレクトリのJSON: 原典URL/SHA、クリップ範囲、限定3問レビュー、機械重複排除、検証結果。

公開登録は299問のまま、今回の公開増分は0です。資格全体の残問を解消したという報告ではありません。この13原問の担当範囲では原典不足・解説未完は0です。

主担当は予約・公開条件を統合した後、`OT13_RECOVERED_QUESTIONS`だけを作業療法士のregistryへ加えてください。除外2問を採点プールへ入れないでください。既存の年度・session・問番号・canonical IDを変更しないでください。登録時は本テストの未登録検査と、既存の件数・AM図なし・HOLDリストに関する期待値を、実際の統合後集合に合わせて更新します。

## Review and verification

4ファイル27テスト、strict TypeScript、変更4TSファイルのESLint（警告0）、diff checkが成功しました。全体buildは共有ホストの待ち順を守るため起動せず、統合主担当へ委ねます。全量高モデル二重査読や掲載権利の認定は主張していません。

PM7の80cm開口部と120cm廊下は、一般的に通行不能とは断定しません。PM4は側弯との関連を一次研究で確認し、重量差・筋の不均衡を証明済みの原因とは扱いません。PM6は背部到達の完成動作と、現時点の残存機能を使う段階的訓練を区別しています。
