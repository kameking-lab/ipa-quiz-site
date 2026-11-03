# OT13 recovered-source explanation handoff

11採点対象原問の全55肢解説と、公式採点除外2問の説明を完成し、作業療法士registryへ接続したdraft PR用差分です。原問・5肢・正答セルは先行回収済みSOURCE-PACKETSを再利用し、元画像37点（うち選択肢25点）を改変せず保持しています。

| canonical site year | Official sitting | Session | Gradable original numbers | Official exclusion |
| --- | --- | --- | --- | --- |
| 2024 | Round 60 / actual exam 2025 | AM | 2, 6, 9 | — |
| 2024 | Round 60 / actual exam 2025 | PM | 1, 2, 4, 6, 7, 8, 9 | 98 |
| 2025 | Round 61 / actual exam 2026 | AM | 72 | 42 |

既存サイトの年度別名を保持し、実施年はSOURCE-EVIDENCEへ別に記録しています。元稿commit `a70278c43e7dd93a0c4f97b23b2faec556ff27fd`の11原問・55肢解説と、公式除外2問のデータは再生成せず同一に保持しました（SOURCE-IMMUTABILITY参照）。AM6とPM1は2肢選択です。PM98・AM42は公式通知に従う採点除外で、空欄正答を維持し、臨床上の正誤を補作していません。

## Integration paths

- `data/qualification-staging/sagyo-ryohoshi/ot13-recovered/questions.ts`: existing `Question` interfaceに型適合する11原問・55肢解説。
- `data/qualification-staging/sagyo-ryohoshi/ot13-recovered/excluded.ts`: 通常の`Question`と分離した公式採点除外2原問。
- `public/questions/sagyo-ryohoshi/ot13-recovered/`: 原図37点。
- `__tests__/questions/sagyo-ot13-recovered.test.ts`: 原文・公式解答・画像ハッシュ・採点除外・static/lazy/SEO登録を検査する18テスト。
- `__tests__/questions/sagyo-ot13-routes.test.tsx`: 原図、複数選択、11静的route、除外2問404、hub表示を検査する5テスト。
- 本ディレクトリのJSON: 原典URL/SHA、クリップ範囲、限定3問レビュー、機械重複排除、検証結果。

本branchの登録は299→310問（午前144・午後166）、登録増分11問です。本番公開増分は0です。資格全体の残問を解消したという報告ではありません。この13原問の担当範囲では原典不足・解説未完は0です。

`data/questions/sagyo-ryohoshi/index.ts`へ11原問の接続を実装済みです。static・lazy・SEOの集合に同じ310問が入り、除外2問は採点プール・問題routeから除外されます。既存の年度・session・問番号・canonical IDを保持しています。件数、画像付きの11原問、原典回収を完了したHOLDだけを明示IDで既存テストへ反映し、過去のHOLD証跡を変更していません。本番merge/deployは統合主担当が行います。

## Review and verification

原稿段階の4ファイル27テストに続き、registry接続後は関連6ファイル34テストとroute/UI5テスト、strict TypeScript、変更TS/TSXファイルのESLint（警告0）、diff checkが成功しました。Question validatorは310件ok・fail0・既存警告7件、追加11問の警告0です。ホスト上の全体buildは多重起動せず、draft PRの既存CIへ委ねます。全量高モデル二重査読や掲載権利の認定は主張していません。

PM7の80cm開口部と120cm廊下は、一般的に通行不能とは断定しません。PM4は側弯との関連を一次研究で確認し、重量差・筋の不均衡を証明済みの原因とは扱いません。PM6は背部到達の完成動作と、現時点の残存機能を使う段階的訓練を区別しています。
