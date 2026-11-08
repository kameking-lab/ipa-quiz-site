# 獣医師国家試験（juishi）・未公開ステージング

W6（2026-11-06）。農林水産省が公開している「試験問題及び正答値」から、直近2回ぶんの
**必須問題・学説試験 問題A・問題B** を収録した未公開データ。

- 公式索引: https://www.maff.go.jp/j/syouan/tikusui/zyui/shiken/shiken.html （2026-11-06 に通常GETで確認）
- 第77回（令和7年度）: 試験日 2026-02-17／18、問題PDF shiken-140〜144、正答値 shiken-146
- 第76回（令和6年度）: 試験日 2025-02-12／13、問題PDF shiken-126〜130、正答値 shiken-131

`manifest.json` の `publicAllowed` と各問の `publicAllowed` は常に `false`。
ExamCode・公開レジストリ・通常ローダー・public ディレクトリには接続していない。
権利・転載条件の確認は未了で、オーナー決定（2026-11-04）に従い作業は止めず、公開判断は保留する。

## 収録と除外

| 回 | 必須 | 問題A | 問題B | 実地C | 実地D | 収録 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 第77回 | 50 | 79 | 80 | 0 | 0 | 209 |
| 第76回 | 50 | 79 | 80 | 0 | 0 | 209 |

- **実地試験（問題C・D、各回120問）は収録していない。** 問題文が別冊の図・表・写真を参照するが、
  別冊は公式ページに掲載されておらず、図なしでは問題として成立しないため。除外理由は
  `source-audit.json` の `excluded` に1問ずつ記録した（計240問）。
- **採点除外の問は収録していない。** 第77回 問題A 問37、第76回 問題A 問65 の2問。
  公式正答値PDFに「採点除外」と記載があり、正答が公表されていない。
- 公式正答値で2つの番号が示された問（計8問）は `acceptedAnswerNumbers` に両方を保持し、
  `scoring: "any-of-accepted"` とした。公式がどちらも正答としたことを解説にも明記している。

## データの作り方

- 公式PDFのテキスト層を PyMuPDF 1.28.0 で抽出し、問番号・選択肢1〜5・課題（症例文）を機械的に分割した。
  上付き・下付き文字はフォントサイズとフラグから復元している（Ca²⁺、NOₓ、PGF₂α など）。
- 原本PDFはコミットしない。URL・HTTPステータス・バイト数・ページ数・SHA-256・取得時刻は
  `manifest.json` と `source-audit.json` に保持し、再取得で照合できる。
- 正答は公式「正答値」PDFの表から抽出し、`official-answers.json` を単一の正本とした。
  各問の `acceptedAnswerNumbers` はこのファイルと一致することを検証スクリプトで確認する。
- 解説は全問・全選択肢に独自作成。a〜e の記述を組み合わせる問は `statementExplanations` に
  記述ごとの正誤と理由を持たせ、`choiceExplanations` では各組合せの可否を述べる。
- 法令・制度・統計に関わる問は `lawRelated: true` とし、解説末尾に出題時点を明記した。
  公式資料に法令基準日の明示がないため `lawReferenceDate` は `null`、`legalContextDate` に試験日を入れている。

## 検証

```powershell
pnpm tsx scripts/validate-juishi.ts
```

スキーマ、ID形式、回と年度の対応、公式正答との一致（複数正答の保持を含む）、
除外問が混入していないこと、各セクションの「収録＋除外＝公式問題数」、
転記テキストのSHA-256、全肢解説の存在を確認する。

共有レジストリ（`lib/exam-config.ts`、`lib/qualifications/catalog.ts`、`data/questions/index.ts` など）は
このブランチでは編集していない。反映に必要な差分は `reports/juishi-registry.md` に記載した。
