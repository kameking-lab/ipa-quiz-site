# 造園1 第一次 2026 補充7

基準HEAD: `699240af03793bb4f27b9c5bd4090fab71144cae`（PR693）。新規5原問、20肢理由、保存稿再利用0。2026 A25/B15、合計40/65。2025原問404 HOLD65問は未制作。2回完備の主張なし。requested model `gpt-6.1-sol`、実体receipt `null`。

ID: A23/A31/B1/B4/B10。公式正答: 2/1/1/3/2。既存問題JSON変更・削除0。

## 原典

- `zoen1-2026-a.pdf` SHA256 `fd2af674b3049915a085ec0c1e5d0a2360549f7cfed0e3fea23be346b9e4f0da`。
- `zoen1-2026-b.pdf` SHA256 `f3b0df0c1a8cc7feeb2b659faa7854a0ff1bf41e01b365fe47127b671756a06d`。
- `zoen1-2026-answers.pdf` SHA256 `6faa5bee113cde6b5c4665ddcfcde223bae90a11083348c813e1f530f6d81a7d`。

原問ページはA23 PDF10、A31 PDF14、B1 PDF2、B4 PDF4、B10 PDF7。各ページの画像を閲覧。A31/B4の選択肢は原図を保持し、ボタンラベルは図（1）～図（4）と表示。原本の数値・正答変更なし。B10のCl⁻・m³・mm²を原ページから復元し表をMarkdownへ機械投影。

## 技術一次資料

- [中部地方整備局 設計要領 第4章土工](https://www.cbr.mlit.go.jp/road/sekkeiyouryou/pdf/cb004_dokou_v201503.pdf)。PDF15（4-13）表4-Ⅲ-6。A23のもたれ式条件・重力式高さ。 ローカル保存 `cbr-retaining.pdf` SHA256 `3bcc493ab7a1387c756eeb3efd94965819337ca8cac60912515f104223984b3c`。
- [農水省 手引き 第1章施工管理概要](https://www.maff.go.jp/j/nousin/seko/kyotu_siyosyo/k_tebiki/attach/pdf/index-18.pdf)。PDF1 図1-2及び本文。A31の3曲線。 ローカル保存 `maff-management.pdf` SHA256 `848bb44385306d1dc6fb128c28e0257b16f5d66ec60c40aaa8da35599b84b511`。
- [農水省 手引き 第2章工程管理](https://www.maff.go.jp/j/nousin/seko/kyotu_siyosyo/k_tebiki/attach/pdf/index-12.pdf)。PDF1（11）労務の集中平準化、PDF4～5（14～15）曲線式・最長経路。B1/B4の方法根拠、設問の具体計算は原図から独立計算。 ローカル保存 `maff-schedule.pdf` SHA256 `a7dacfeacfae4600c9ed2f9cf76f6c598ee89e2b8a2accc35aeb61eb46c043ab`。
- [国交省 土木工事施工管理基準 令和8年3月](https://www.mlit.go.jp/tec/content/001990185.pdf)。PDF216～217（Ⅱ-3～4）普通コンクリートの85%・3回平均・スランプ±2.5cm・塩化物0.3kg/m³・空気量許容差±1.5%。 ローカル保存 `mlit-quality-r8.pdf` SHA256 `ae9d1ba85098f4bd913021ad4e354b85010d3c28930cf9480611859343e18b41`。
- [三重県建設資材試験センター 公開相談Q&A](https://www.testcenter-mie.or.jp/sodan.html)。材料No.7 普通コンクリート空気量4.5±1.5%。 ローカル保存 `mie-concrete.html` SHA256 `7fcd961c41d7d483702bdaa2990db39ff2a43247ce42cbc5544bb2d7f6448afd`。

## 図・計算証跡

- `public/images/questions/zoen1/2026-september-a-q31-diagram.png` 原PDF14ページ crop `[75, 65, 515, 775]`、SHA256 `18b72f88930e2df981dee6b5842909e3189d7d88000727ff9a61723fa89a7d4d`。全4肢・軸・ダミー・日数を実画像確認。
- `public/images/questions/zoen1/2026-september-b-q1-diagram.png` 原PDF2ページ crop `[110, 215, 445, 385]`、SHA256 `322ab7ab75789d8e3324d98b7aebde1461dda4f98e86ee30fd54c5558d6b00fa`。全4肢・軸・ダミー・日数を実画像確認。
- `public/images/questions/zoen1/2026-september-b-q4-diagram.png` 原PDF4ページ crop `[80.0, 115.0, 485.0, 550.0]`、SHA256 `75f4b1389c203217027538f8998d4e62a6bdf323d558aeeb0621f0a8917ad211`。全4肢・軸・ダミー・日数を実画像確認。

B1: critical B→E→dummy→H=10日。A(開始0,日数1,人数2),B(0,3,4),C(1,2,2),D(5,4,3),E(3,5,3),F(3,2,3),G(8,1,2),H(8,2,1)。総55人日、日別6/6/6/6/6/6/6/6/6/1。下限ceil(55/10)=6、実現ピーク6。最短工期を保持する通常のネットワーク配員計画。

B10: 強度各回>=17.85、平均21.1667>=21。スランプ許容9.5～14.5、第1回15のみ超過。塩化物全て<=0.30、空気全て3～6。

focused audit/validator/Vitest/typecheck/lintを実行。full local buildなし、PRの必須CI buildへ。独立reviewとmergeはroot担当。
