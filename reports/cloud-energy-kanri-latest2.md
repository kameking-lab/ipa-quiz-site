# エネルギー管理士 直近2回の取得監査・未公開部分収録

## 作業状況

**依頼全体は未完了。ステージングを維持し、公開登録は0問。** 今回は第47回熱課目Ⅱ問題6・7及び第48回熱課目Ⅱ問題5～7の**5原問74公式解答欄（74演習設問）**を追加した。開始時点で既に47原問639公式解答欄（635演習設問）まで収録されていたため、既存成果を引き継いだ。累計は**52原問713公式解答欄（709演習設問）**。対象全体62原問842解答欄に対し、残る**10原問129解答欄**の本文照合・解説・必要図の整備が未完了。順序不問4ペアを各1演習設問に統合するため、公式解答欄と演習設問の数を区別する。

確認日：2026-11-03 UTC。オーナー決定は依頼記載の2026-11-04 01:30及び06:10を適用。今回の続行指示に従って追加した。

## 対象回・公式根拠

- 第48回（令和8年度）、2026-08-02実施：[当年度標準解答ページ](https://www.eccj.or.jp/mgr1/test/answer.html)。今回も本文の第48回見出しと実施日を公式で再確認。HTMLのtitleには第47回と残っているが、本文は第48回であり、正答PDF表題とも一致する。
- 第47回（令和7年度）、2025-08-03実施：[過去の試験問題](https://www.eccj.or.jp/mgr1/test_past/)。過去問一覧の先頭がこの回であることを今回も公式で再確認。当年度と併せて直近2回と判断した。
- 両回とも必須基礎課目Ⅰ1冊、熱課目Ⅱ～Ⅳ3冊、電気課目Ⅱ～Ⅳ3冊の問題・正答、計28PDFを取得済み。共通課目を熱・電気に重複計上しない。国家試験を対象とし、研修修了試験は対象外。

## 既存成果・追加方式

- 初回に `data/questions`、`lib/qualifications/catalog.ts`、`data/exam-library`、originのclaude/*・qual/*・codex/*計389ブランチと資格・ライブラリ台帳の異なる160 blobを読み取り確認済み。
- `origin/claude/awesome-mayer-10yje5` の旧slug `energy-manager` は本文0問の監査記録のみ。オーナーの明示決定に従い指定slugで収録を継続。
- 今回も389ブランチの問題・ステージング・試験ライブラリを `git ls-tree` で読み取り確認。同slugの成果がある `origin/claude/tender-ptolemy-qj5fkx` は引継ぎ対象の既存47原問で、今回の5原問は未収録だった。既存成果は再作成していない。
- `data/questions/denken3` のJSON＋index方式と `data/qualification-staging/sagyo-ryohoshi` の公開前置場を踏襲。ステージングから問題・出典・公式正答台帳を参照する。
- `ready-to-ingest`・examCodeなしの登録を維持し、公開レジストリ・資格一覧・試験ライブラリ・公開ルートには接続していない。
- 作業開始時に既に変更されていた `components/quiz/NumericAnswerInput.tsx` と `scripts/validate-questions.ts` は今回編集していない。

## 追加数と内容

| 実施回 | 今回追加の原問 | 原問数 | 公式解答欄数 | 選択式 | 数値記入式 |
|---|---|---:|---:|---:|---:|
| 第47回 | 熱課目Ⅱ 問題6 流体工学の基礎 | 1 | 16 | 16 | 0 |
| 第47回 | 熱課目Ⅱ 問題7 伝熱工学の基礎 | 1 | 14 | 11 | 3 |
| 第48回 | 熱課目Ⅱ 問題5 熱力学の基礎 | 1 | 17 | 17 | 0 |
| 第48回 | 熱課目Ⅱ 問題6 流体工学の基礎 | 1 | 15 | 15 | 0 |
| 第48回 | 熱課目Ⅱ 問題7 伝熱工学の基礎 | 1 | 12 | 12 | 0 |
| 今回追加合計 | 未公開 | 5 | 74 | 71 | 3 |

| 実施回 | 累計の収録済み原問 | 原問数 | 公式解答欄数 | 演習設問数 |
|---|---|---:|---:|---:|
| 第47回 | 共通Ⅰ 問題1～3、熱Ⅱ 問題6・7、熱Ⅲ 問題8～10、熱Ⅳ 問題11～18、電気Ⅱ 問題6、電気Ⅲ 問題7・9・10、電気Ⅳ 問題12～16 | 25 | 345 | 343 |
| 第48回 | 共通Ⅰ 問題1～3、熱Ⅱ 問題5～7、熱Ⅲ 問題8～10、熱Ⅳ 問題11～18、電気Ⅱ 問題6、電気Ⅲ 問題7・9・10、電気Ⅳ 問題11～16 | 27 | 368 | 366 |
| 累計 | 未公開部分収録 | 52 | 713 | 709 |

- 新規5原問の本文・全選択肢・数式・単位を公式PDF画像で照合してテキスト化。対応ページは `r07_2.pdf` 8～15ページ、`r08_2.pdf` 6～18ページ（PDF先頭からの番号）。正答は `r07_k_2.pdf` と `r08_k_2.pdf` の抽出本文・既存台帳双方と照合。
- 選択式71欄・全416肢に独自解説を作成。数値記入3欄も計算過程を説明。生成問題・架空の選択肢は含まない。図の選択肢は元図に併せて形状の説明をテキスト化した。
- 必要図10点を公式から切り出し、図を参照する44欄に `hasImage: true` と代替テキストを付与。ベンチュリ、ポンプ、平板放射、向流熱交換器、冷凍サイクル、オリフィス、二重ガラス、温度分布の選択図、有効度線図、凝縮形態を保持した。
- 原問の共通指示、記号定義、前段条件を `originalContent.sharedPassages` に保持。冷媒の飽和・過熱蒸気表と熱交換器の2表をMarkdownのテキスト表で収録した。
- 第47回問題6は管内径43 mm、管長100 m、摩擦係数0.019と水の物性を保持。出口速度ヘッドを含む収支から1.413… m/sを求め、途中を丸めずRe=7.094…×10⁴とした。差圧式は密度差を含む(ρ_C−ρ_W)gHを保持。
- 第47回問題7は反射(1−α)q、自己放射ασT₁⁴、熱伝導k(T₁−T₂)/tを区別。向流熱交換器は交換熱量320 kW、B出口62℃から両端差8 K・20 Kを求め、設問指定の算術平均14 Kを使用して面積6.5 m²とした。対数平均への置換はない。新規数値3欄は整数2、小数第1位1で、既存numeric形式を使用。
- 第48回問題5は状態1が低圧乾き飽和蒸気、3が高圧飽和液、3→4が等エンタルピーであることを図と前提に保持。h₁=400.9、h₃=h₄=275.4、h₂=431.7から熱量と仕事を計算。COPは丸めた選択肢の熱量から逆算せず、125.5/30.8と156.3/30.8で公式4.1・5.1に一致。
- 第48回問題6は単位体積・単位時間のエネルギーと軸動力を区別。流量係数はOCRの誤読を採らず原本の0.85、差圧150 mm H₂O、空気密度1.293を使用し流量0.080 m³/sに一致。
- 第48回問題7は発達した円管層流でNu一定・h∝1/D、二重ガラスの直列抵抗でガラス2枚分の係数2を保持。流量低下による有効度の上昇を交換熱量の絶対量と区別した。

## 正答台帳・除外・残作業

- `official-answers.json` は全14正答PDFの抽出本文及び全62原問842解答欄（第47回426、第48回416）の番号・正答・配点を持つ資料台帳。未収録の本文・解説が完成したという意味ではない。
- 第47回共通問題3・番号2の複数正答（ア又はカ）と、順序不問の4ペアは従来の扱いを維持。順序不問はペア全体一致で採点し、欄ごとの部分点を再現しない。
- 第48回熱問題9・番号7・8は公式のCH₄・CO₂を採用。H₂Oにも赤外線吸収がある旨の既存解説を保持。
- 第48回電気課目Ⅲ問題8・番号8は全員正解。台帳の `all-correct` を維持し、架空の単一正答は設定していない。採点方式対応まで通常演習から除外予定。この1欄は累計713欄に含まれない。
- 今回の新たな除外はなし。取得不能・権利条件による除外もなし。2024年度以前及び研修修了試験は対象外。
- **未収録10原問129解答欄は作成未完了であり、取得不能や権利条件による除外ではない。** 上記全員正解1欄以外の128欄は本文・全肢解説・必要図等の整備が必要。

| 実施回 | 区分 | 未収録原問番号 |
|---|---|---|
| 第47回 | 熱Ⅱ | 4・5 |
| 第47回 | 電気Ⅱ | 4・5 |
| 第47回 | 電気Ⅲ | 8 |
| 第47回 | 電気Ⅳ | 11 |
| 第48回 | 熱Ⅱ | 4 |
| 第48回 | 電気Ⅱ | 4・5 |
| 第48回 | 電気Ⅲ | 8 |

## 取得・転載条件

取得できなかったPDFのURL：**なし**。28本すべて公式から取得済みで、今回も `/tmp/energy-kanri/` の保存PDFを使用。全28本のSHA256が資料台帳と一致することを再確認した。ログイン、CAPTCHA、ボット拒否の迂回なし。

PDFは `/tmp` に保持し、作業ツリーには含めない。全URL・サイズ・SHA256は `data/qualification-staging/energy-kanri/sources.json` と末尾一覧を参照。初回に `origin/ops/source-pdfs-20261104` に `energy-kanri/` がないことを読み取り確認済み。全件取得済みのため代替資料は使用していない。

公式の[過去問ページ](https://www.eccj.or.jp/mgr1/test_past/)に以下の文言があることを今回も再確認した。

> 試験問題は、個人的な利用を目的としたものです。これらの全部又は一部を無断で複製・転写することを固く禁じます。個人利用の範囲を超えて利用される方は、当センター試験部までご一報ください。

オーナーの権利確認済み・収録決定を適用し、この文言を停止・除外理由にはしていない。`ECCJ-owner-approved` は内部のオーナー決定の識別子で、公式の一般向け転載許諾ライセンスを示すものではない。

## 検証

- `pnpm install --frozen-lockfile --store-dir /tmp/energy-kanri/pnpm-store`：成功、lockfile変更なし。
- `pnpm validate:questions`：成功、26,444問、失敗0、既存警告16,808。公開問題レジストリが対象であり、未公開709設問は専用テストで別途検証。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：成功、最終のテスト型修正後も終了コード0。
- 関連テスト：未公開収録・資格拡張・公開資格網羅・ホーム一覧・小数採点・数値入力精度の6ファイル、1,128件成功。
- 専用テストは713公式解答欄の正答一致・52原問の解答番号網羅・709設問の一意性・全肢解説・原文保存・画像存在・全62原問842欄の配点、複数正答/順序不問を確認。今回分は冷媒物性表、流量係数0.85、管摩擦の条件、算術平均指定、放射式、図参照44欄、数値3欄も確認した。
- 上記pnpmコマンドは `COREPACK_HOME=/tmp/energy-kanri/corepack XDG_CACHE_HOME=/tmp/energy-kanri/xdg-cache` を指定。
- `git diff --check`：成功（読み取りのみ）。
- `pnpm build`・デプロイ・codex exec・Git書き込み操作・コミット・push・独立レビューは実施していない。

## 今回の変更ファイル

- `data/questions/energy-kanri/2025-heat-q06.json`
- `data/questions/energy-kanri/2025-heat-q07.json`
- `data/questions/energy-kanri/2026-heat-q05.json`
- `data/questions/energy-kanri/2026-heat-q06.json`
- `data/questions/energy-kanri/2026-heat-q07.json`
- `data/questions/energy-kanri/index.ts`
- `lib/qualifications/catalog.ts`
- `__tests__/questions/energy-kanri-staging.test.ts`
- `public/images/energy-kanri/2025/heat-q06-pump.png`
- `public/images/energy-kanri/2025/heat-q06-venturi.png`
- `public/images/energy-kanri/2025/heat-q07-counterflow.png`
- `public/images/energy-kanri/2025/heat-q07-radiation.png`
- `public/images/energy-kanri/2026/heat-q05-refrigeration-cycle.png`
- `public/images/energy-kanri/2026/heat-q06-orifice.png`
- `public/images/energy-kanri/2026/heat-q07-condensation.png`
- `public/images/energy-kanri/2026/heat-q07-double-glazing.png`
- `public/images/energy-kanri/2026/heat-q07-effectiveness.png`
- `public/images/energy-kanri/2026/heat-q07-temperature-choices.png`
- `reports/cloud-energy-kanri-latest2.md`

## 公式PDF取得一覧

| 年度 | 課目 | 種別 | 公式URL | SHA256 |
|---|---|---|---|---|
| 2026 | common・エネルギー総合管理及び法規 | 正答 | [r08_k_1.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r08/r08_k_1.pdf) | `581b13fb0e339238c3ce545c8fb756ed3c78aff776e38d4f1c41932ef8c27cad` |
| 2026 | common・エネルギー総合管理及び法規 | 問題 | [r08_1.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r08/r08_1.pdf) | `c1622f1621e7198a6bb800985b9fdb34896dd1cb9c50898d095de636845f105a` |
| 2026 | heat・熱と流体の流れの基礎 | 正答 | [r08_k_2.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r08/r08_k_2.pdf) | `fa2cacc75f70d91faaf1592d47d3050e74deb9b3d1d73458ef1cde49f8634dde` |
| 2026 | heat・熱と流体の流れの基礎 | 問題 | [r08_2.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r08/r08_2.pdf) | `cbbd3cd1d6d775ba0178d891a7fa092d8666de986561a7ce2ea4c1a0f8feaf76` |
| 2026 | heat・燃料と燃焼 | 正答 | [r08_k_3.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r08/r08_k_3.pdf) | `afcac10892c241ee25d79c462c123a978f6096f3bc5620b6a9e381a78ac97d80` |
| 2026 | heat・燃料と燃焼 | 問題 | [r08_3.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r08/r08_3.pdf) | `729b0f365375ddfcb7c331163da411d992b656ee2995392de269c9d3dfbe46b5` |
| 2026 | heat・熱利用設備及びその管理 | 正答 | [r08_k_4.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r08/r08_k_4.pdf) | `eb2a3227f5514b7ae1f4d76ac7a4378438923c1c5e8b81c60bcccf3f1842cb36` |
| 2026 | heat・熱利用設備及びその管理 | 問題 | [r08_4.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r08/r08_4.pdf) | `316f218c81827f2e9bdfc6d254a233723e6b8ae6fcc9fe03601ecf948416625f` |
| 2026 | electric・電気の基礎 | 正答 | [r08_k_5.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r08/r08_k_5.pdf) | `ec41c2a30f6e0b9cfaf4bc69629c807c09625880a601ac18e1e165aa7c1c3f36` |
| 2026 | electric・電気の基礎 | 問題 | [r08_5.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r08/r08_5.pdf) | `66c7d1da0626c11850d7342bc11e8cb5a1dbcc70386a3f7d922a46f02e6adbd6` |
| 2026 | electric・電気設備及び機器 | 正答 | [r08_k_6.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r08/r08_k_6.pdf) | `e077b59a3d03035f2d7fa2dbb2a68c3031a32c82d8a9be38d2f5aa6c552be924` |
| 2026 | electric・電気設備及び機器 | 問題 | [r08_6.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r08/r08_6.pdf) | `e3d0d701897ce8ae48ae6665740aff564be84faccbd1e0cc5f1cb67ac9266c33` |
| 2026 | electric・電力応用 | 正答 | [r08_k_7.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r08/r08_k_7.pdf) | `58be4368dce827033e12421d993d1ea7a13a9464c940ebbb229a038cd5a6cc5f` |
| 2026 | electric・電力応用 | 問題 | [r08_7.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r08/r08_7.pdf) | `7c3cfdb26ff5b372f98f9061d03ee4903a51f36aea4b72b875ce10a87908477c` |
| 2025 | common・エネルギー総合管理及び法規 | 正答 | [r07_k_1.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r07/r07_k_1.pdf) | `bcd84c6e13ad6ae268e27e8720a84e39194181ce9f5b6b9ef33d8df1cd68f0f8` |
| 2025 | common・エネルギー総合管理及び法規 | 問題 | [r07_1.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r07/r07_1.pdf) | `7ba51774a5211097b4deb1aa82e1976b3c17da3eadaf520b464efa84132db7eb` |
| 2025 | heat・熱と流体の流れの基礎 | 正答 | [r07_k_2.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r07/r07_k_2.pdf) | `20dec563d986711ddd799c27fc204aa7898d60f293eb0d1ac732d87382797201` |
| 2025 | heat・熱と流体の流れの基礎 | 問題 | [r07_2.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r07/r07_2.pdf) | `bb82aa2728ff2cd58f48024fe56673b965a2ddcb58efbbb6e90cddf94fc29a41` |
| 2025 | heat・燃料と燃焼 | 正答 | [r07_k_3.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r07/r07_k_3.pdf) | `52d723b167f0e576e460134450c24bee17082398e2f6ee7e7a749b3b65ef9d37` |
| 2025 | heat・燃料と燃焼 | 問題 | [r07_3.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r07/r07_3.pdf) | `f093824512b3f43206ad4608f7ed48bfc21f54f6915c90e3c0ef888ccaaf62d1` |
| 2025 | heat・熱利用設備及びその管理 | 正答 | [r07_k_4.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r07/r07_k_4.pdf) | `d347e6c4592864cdcff9665c25738eabd0f8b5c3d47c4e0417b5aa8c05f28adc` |
| 2025 | heat・熱利用設備及びその管理 | 問題 | [r07_4.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r07/r07_4.pdf) | `efddf6295791517422f6f71386c6dd1e8792e069876c4e5c894e1e9b9b2e4992` |
| 2025 | electric・電気の基礎 | 正答 | [r07_k_5.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r07/r07_k_5.pdf) | `541f363eb637444945039da4d2f359512ca84dc4d9d337256f7d828a6a3b09c4` |
| 2025 | electric・電気の基礎 | 問題 | [r07_5.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r07/r07_5.pdf) | `9bc4f11f4abed4aa0146e1c03a7b1676dc5536fd9d5b1046407c5548a7747950` |
| 2025 | electric・電気設備及び機器 | 正答 | [r07_k_6.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r07/r07_k_6.pdf) | `e223970d6b90dd77f29039a81cc2c4a70c524ab5fafa2d665c828278c3a31955` |
| 2025 | electric・電気設備及び機器 | 問題 | [r07_6.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r07/r07_6.pdf) | `a0bd83393a370d17696ee6b82d951125589c6b4b908216b4b458812f8e546f91` |
| 2025 | electric・電力応用 | 正答 | [r07_k_7.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r07/r07_k_7.pdf) | `631eacc6d034d805cab8c3ccff8ef09fc8ff103ce1b701e3a3c321e78331b060` |
| 2025 | electric・電力応用 | 問題 | [r07_7.pdf](https://www.eccj.or.jp/mgr1/test_past/pdf/r07/r07_7.pdf) | `e25e3ae542277f8069766819f1df68c4d3a1e948b62f0055795cc5e6271aead7` |
