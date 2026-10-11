# 造園1 第一次2026 補充8

基準HEAD `84409046b4e0bbd05b55082fd1b97abf4bf316c3`（PR696）。新規A25/A26/A32/A33/B9、5原問・20肢理由・保存稿再利用0。公式正答4/2/3/4/1。2026収録A29/B16=45/65、未収録20。2025原問404 HOLD65は未制作。2回完備の主張なし。requested model `gpt-6.1-sol`、実体receipt `null`。

既存問題JSON変更・削除0。原文と公式正答は機械投影。A26は図の4行の名称と形状を原ページ画像で確認し、原問図のまま保存。

## 原典

- `zoen1-2026-a.pdf` SHA256 `fd2af674b3049915a085ec0c1e5d0a2360549f7cfed0e3fea23be346b9e4f0da`。
- `zoen1-2026-b.pdf` SHA256 `f3b0df0c1a8cc7feeb2b659faa7854a0ff1bf41e01b365fe47127b671756a06d`。
- `zoen1-2026-answers.pdf` SHA256 `6faa5bee113cde6b5c4665ddcfcde223bae90a11083348c813e1f530f6d81a7d`。

原問A25/A26 PDF11、A32/A33 PDF15、B9 PDF7を実画像確認。A26文字抽出は図ラベルが混入するため、設問本文のみ原問から転記し機械照合。4選択肢は原図番号と原図名称を表示。

## 技術一次資料

- [日本造園学会 日本庭園のこころとわざ2024報告](https://researchpromotion.jila-zouen.org/wp-content/uploads/2025/05/2024_nihonteien_seikahoukoku.pdf)。PDF246/248/250/253（244/246/248/251）。A25の踏分石・客石・砂雪隠。 保存 `jila-garden-2024.pdf` SHA256 `b709df1ce1e99f459badf7be5c801a7e74f09e005dcc76b13075880f8eb091b7`。
- [表千家 不審菴 用語集 中柱](https://www.omotesenke.jp/cgi-bin/result.cgi?id=418)。A25(1)：点前座と客座の間、炉の隅。 保存 `omote-nakabashira.html` SHA256 `8dec7609fa1c18f16b8b0a6647f746e18d9799f291fffa80f1b42a44e8350b50`。
- [表千家 不審菴 用語集 雪隠](https://www.omotesenke.jp/cgi-bin/result.cgi?id=407)。A25(4)：外露地下腹雪隠、内露地砂雪隠。 保存 `omote-sechin.html` SHA256 `ed813896cdfc363de79d689b50d832507f3f1153bcedb5b5e1f9b55006a8c729`。
- [環境省 再生可能エネルギー導入ポテンシャル調査](https://www.env.go.jp/earth/report/h26-05/full.pdf)。PDF41（22）参考図3.1-1。A26の切妻/越屋根/入母屋/寄棟。参考図の転載ではなく原問図から形状を識別。 保存 `env-roofs.pdf` SHA256 `4a483cb62803c91aaaa8206d67aed578c2d7d1fb134153ba1f2d73e4474d9dfb`。
- [農水省 施工管理概要](https://www.maff.go.jp/j/nousin/seko/kyotu_siyosyo/k_tebiki/attach/pdf/index-18.pdf)。PDF8～10。A32施工計画/資材/施工管理/安全組織の区分。 保存 `maff-management.pdf` SHA256 `848bb44385306d1dc6fb128c28e0257b16f5d66ec60c40aaa8da35599b84b511`。
- [国交省 安全施工技術指針 R8.3](https://www.qsr.mlit.go.jp/content/000001824.pdf)。PDF9～10（1～2）工程資機材労務・必要人員、PDF50（42）経路交通量と環境影響、PDF90（82）通学路/歩行者。A32。 保存 `mlit-safety-r8.pdf` SHA256 `38ade991cc1a6a930be8de27bbd154d1fc86e912e311e663f09e4096abdbfd40`。
- [国交省 施工管理基準 R8.3](https://www.mlit.go.jp/tec/content/001990185.pdf)。PDF2：施工と並行し迅速に管理して結果を施工へ反映。A32(4)。 保存 `mlit-quality-r8.pdf` SHA256 `ae9d1ba85098f4bd913021ad4e354b85010d3c28930cf9480611859343e18b41`。
- [JICA かんがい農業土木用機器材ガイド 建設機械編 part2](https://openjicareport.jica.go.jp/pdf/10090157_02.pdf)。PDF5（16）レーキ、PDF20～22（31～33）油圧ショベルの位置決め/土質別バケット。A33(2)(3)。 保存 `jica-machines-part2.pdf` SHA256 `ed576b7a758e1e4caddbc234b3f50d9ba41f1316a91062ffafd4a6e9735db426`。
- [JICA 同ガイド part3](https://openjicareport.jica.go.jp/pdf/10090157_03.pdf)。PDF12（72）静的圧力ローラ・基層/仕上転圧、PDF14（74）土質適応図、PDF15（75）振動の砂への効果、PDF18（78）振動コンパクタ。A33(1)(4)。 保存 `jica-machines.pdf` SHA256 `4b556ee549ef388086c53ce137cc272848521f547193cefd52dfcd740892eb17`。
- [国交省 山形河川国道事務所 建設用語](https://www.thr.mlit.go.jp/yamagata/word/ra.html)。レーキドーザの抜根、ロードローラの転圧。A33。 保存 `yamagata-machines.html` SHA256 `81f4f0b155709dc9d1fecf1257577495908c0bce6e4f68dc92a8e050dc7275d3`。
- [堺市 R7工事積算基準別冊](https://www.city.sakai.lg.jp/kurashi/doro/doboku/gijutsukanri/df_filename_kizyunsyo.files/R7bessatu.pdf)。PDF22～23（17～18）JIS石材表。B9割石二方1.2、板石15cm未満/幅厚3倍。 保存 `sakai-stone-r7.pdf` SHA256 `6904e51793c062e600651791611301b147cfa77975fad79457d93043365c677c`。

図 `public/images/questions/zoen1/2026-september-a-q26-diagram.png`：原PDF11 crop `[78.0, 275.0, 405.0, 700.0]` SHA256 `ca530cdf05fdf498e300385d2f1d40a3b13e7c0959220ea17ca7f00b520acbfa`。視点A/Bと全4肢を実画像確認。

A32の1～2割は人数計画の区分判定に必要な設問条件として保持し、法定割増しや一律の推奨値とは主張しない。A33(4)は敷均し一貫の誤りをまず指摘し、土質適応は振動と静圧の方式を区別する。

focused audit/validator/Vitest/typecheck/lintを実行。full local buildなし、必須CI build・独立review・mergeはroot担当。
