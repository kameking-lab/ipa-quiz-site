# エネルギー管理士 直近2回の取得監査・未公開部分収録

## 作業状況

**依頼全体は未完了。ステージングを維持し、公開登録は0問。** 今回は8原問・111公式解答欄（111演習設問）を追加した。開始時点では続行指示の4原問から既に16原問208公式解答欄（204演習設問）へ進んでいたため、その既存成果を再作成せず引き継いだ。累計は**24原問319公式解答欄（315演習設問）**。対象全体62原問842解答欄に対し、残る**38原問523解答欄**の本文照合・全肢解説・必要図の作成が未完了。既存の順序不問4ペアは各2欄を1演習設問に統合するため、公式解答欄数と演習設問数を区別する。

確認日：2026-11-03 UTC。オーナー決定は依頼記載の2026-11-04 01:30及び06:10を適用。今回の明示的な続行指示に従って既存成果へ追加した。

## 対象回・公式根拠

- 第48回（令和8年度）、2026-08-02実施：[当年度標準解答ページ](https://www.eccj.or.jp/mgr1/test/answer.html)。今回も本文の第48回見出しと実施日を公式で再確認。HTMLのtitleには第47回と残っているが、本文は第48回であり、正答PDF表題とも一致する。
- 第47回（令和7年度）、2025-08-03実施：[過去の試験問題](https://www.eccj.or.jp/mgr1/test_past/)。今回も過去問一覧の先頭がこの回であることを公式で再確認。当年度と併せて直近2回と判断し、2024年度以前へ置き換えていない。
- 両回とも必須基礎課目Ⅰ1冊、熱課目Ⅱ～Ⅳ3冊、電気課目Ⅱ～Ⅳ3冊の問題・正答、計28PDFを取得済み。共通課目を熱・電気の両方に重複計上しない。国家試験を対象とし、研修修了試験は対象外。

## 既存成果・追加方式

- 初回に `data/questions`、`lib/qualifications/catalog.ts`、`data/exam-library`、originのclaude/*・qual/*・codex/*計389ブランチと資格・ライブラリ台帳の異なる160 blobを読み取り確認済み。
- `origin/claude/awesome-mayer-10yje5` の台帳に旧slug `energy-manager`、報告に同じ2回の監査記録（20b793c5、db84c57f）があるが、本文0問・転載条件による保留のみだった。オーナーの明示決定に従い、指定slug `energy-kanri` の収録を継続。
- 今回も389ブランチの同slug・旧slugの問題／ステージングのパスを読み取り確認。既存16原問等の20 blobは `origin/claude/tender-ptolemy-qj5fkx` にある引継ぎ対象だった。今回の8原問と同じ本文の既存成果はなく、16原問は再作成せず継承した。fetchやGitへの書き込みはしていない。
- `data/questions/denken3` のJSON＋index方式、`data/qualification-staging/sagyo-ryohoshi` の公開前置場を踏襲。問題・出典・公式正答台帳はステージングから参照。
- 登録・ルーティング・資格一覧・公開ゲートは既存方式を維持。`ready-to-ingest`・examCodeなしの台帳エントリとし、公開問題レジストリ／公開資格一覧／公表試験ライブラリには接続していない。

## 追加数と内容

| 実施回 | 今回追加の区分・原問 | 原問数 | 公式解答欄数 | 演習設問数 |
|---|---|---:|---:|---:|
| 第47回 | 熱課目Ⅳ 問題12 計測及び制御 | 1 | 13 | 13 |
| 第47回 | 電気課目Ⅳ 問題14 電気化学（選択問題） | 1 | 13 | 13 |
| 第47回 | 電気課目Ⅳ 問題16 空気調和（選択問題） | 1 | 16 | 16 |
| 第48回 | 熱課目Ⅳ 問題12 計測及び制御 | 1 | 15 | 15 |
| 第48回 | 熱課目Ⅳ 問題13 ボイラ・蒸気輸送配管 | 1 | 13 | 13 |
| 第48回 | 電気課目Ⅳ 問題14 電気化学（選択問題） | 1 | 15 | 15 |
| 第48回 | 電気課目Ⅳ 問題15 照明（選択問題） | 1 | 12 | 12 |
| 第48回 | 電気課目Ⅳ 問題16 空気調和（選択問題） | 1 | 14 | 14 |
| 今回追加合計 | 未公開 | 8 | 111 | 111 |

| 実施回 | 累計の収録済み原問 | 原問数 | 公式解答欄数 | 演習設問数 |
|---|---|---:|---:|---:|
| 第47回 | 共通Ⅰ 問題2・3、熱Ⅲ 問題8・9、熱Ⅳ 問題11・12・14・17、電気Ⅱ 問題6、電気Ⅳ 問題14・16 | 11 | 144 | 142 |
| 第48回 | 共通Ⅰ 問題2・3、熱Ⅲ 問題8・9、熱Ⅳ 問題11・12・13・14・17、電気Ⅱ 問題6、電気Ⅳ 問題14・15・16 | 13 | 175 | 173 |
| 累計 | 未公開部分収録 | 24 | 319 | 315 |

- 今回の8原問は、問題PDFの画像と本文・全選択肢・数式・数値・単位を照合してテキスト化。使用ページは第47回 `r07_4.pdf` 6～8ページ、`r07_7.pdf` 16～17・22～25ページ、第48回 `r08_4.pdf` 6～13ページ、`r08_7.pdf` 18～29ページ。
- 原問番号と解答番号を分離し、大問共通指示・後続設問の計算条件・前段の説明は `originalContent.sharedPassages` に保持。電気課目Ⅳの「問題13～16の4問題中2問題を選択」の指示も保持する。
- 第48回熱問題13のボイラ運転条件表・飽和表、第47回電気問題16の機械換気分類表は、行・列・空欄番号・単位・数値を保持したMarkdown表で収録。後続設問にも必要な前段の計算条件を保持した。
- 第47回熱問題12の温水タンク制御図、第48回熱問題12の制御系構成図・P動作の定常偏差図・ステップ応答図を公式PDFから切り出して追加。全4点の図中ラベル、軸、曲線、数値、L/T/X/Yの表示が欠けていないことを画像で確認。依存する18設問は `hasImage: true` と画像URL・代替テキストを持つ。本文や選択肢をページ画像だけで代用していない。既存の熱電対図も維持。
- 新規全111解答欄の正答・番号順を公式正答台帳と照合。対応する正答PDF `r07_k_4.pdf`・`r08_k_4.pdf`・`r07_k_7.pdf`・`r08_k_7.pdf` の抽出本文でも確認。累計319欄は専用テストでも一致を確認した。
- 全選択肢に独自解説を追加。計算設問では式・換算・丸めの根拠を説明した。法令・規制・政策が関わる第47回電気問題16解答15～16、第48回電気問題15解答4、第48回電気問題16解答8～9は、本文注記・解説で出題時点を明示。JISに関わる説明も出題時点の規定として記載。原問にない基準日を推測して設定していない。
- 類題・生成問題は含めない。未収録原問を空データや推測本文で補っていない。

## 正答台帳・採点上の注意・除外

- `official-answers.json` は全14正答PDFの抽出本文と全62原問842解答欄（第47回426、第48回416）の番号・正答・配点を保持する資料台帳であり、全問の本文・解説が完成したという意味ではない。数値欄A～J等は選択式解答欄と区別し、原問ごとの配点合計を正答表の所定配点と照合済み。今回の追加は全て選択式であり、数値記入の採点実装は進めていない。
- 第47回共通問題3・解答番号2はア又はカを個別に正解とする既存の `answer: ["ア", "カ"]` を維持。2肢同時選択とは区別する。
- 順序不問指定の4ペア（第47回熱問題9の6・7、熱問題17の10・11、第48回熱問題9の1・2及び7・8）は `requiredSelections: 2` の1演習設問に統合。公式指定の2肢を順不同で選ぶ形式。演習用にはペア全体の一致を採点し、公式試験の欄ごとの部分点を再現する実装ではない。
- 第48回熱問題9・解答番号7・8は公式正答のCH₄・CO₂を採用。H₂Oにも赤外線吸収があることは既存の解説と `choiceFactTruth` に保持し、H₂Oに吸収がないという誤った説明はしない。
- 第48回電気課目Ⅲ問題8・解答番号8は、公式に「解答群に唯一の正答が存在しないため、当小問においては受験者全員を正解といたします。」とされる。資料台帳は `all-correct` とし、架空の単一正答を設定しない。通常演習からは採点方式対応まで除外予定。この欄は累計319解答欄に含まれない。
- 今回の新たな除外はなし。取得不能・公式非公開による除外もなし。対象外は2024年度以前及び研修修了試験。**未収録38原問523解答欄は作成未完了であり、取得不能や権利条件による除外ではない。** 上記全員正解1欄以外の522欄には通常の本文・解説整備が必要。

未収録の原問（後続作業用）：

| 実施回 | 区分 | 未収録原問番号 |
|---|---|---|
| 第47回 | 共通Ⅰ | 1 |
| 第47回 | 熱Ⅱ | 4・5・6・7 |
| 第47回 | 熱Ⅲ | 10 |
| 第47回 | 熱Ⅳ | 13・15・16・18 |
| 第47回 | 電気Ⅱ | 4・5 |
| 第47回 | 電気Ⅲ | 7・8・9・10 |
| 第47回 | 電気Ⅳ | 11・12・13・15 |
| 第48回 | 共通Ⅰ | 1 |
| 第48回 | 熱Ⅱ | 4・5・6・7 |
| 第48回 | 熱Ⅲ | 10 |
| 第48回 | 熱Ⅳ | 15・16・18 |
| 第48回 | 電気Ⅱ | 4・5 |
| 第48回 | 電気Ⅲ | 7・8・9・10 |
| 第48回 | 電気Ⅳ | 11・12・13 |

## 取得・転載条件

取得できなかったPDFのURL：**なし**。28本すべて公式から取得済みで、今回も `/tmp/energy-kanri/` の保存PDFを使用。全28本のSHA256とサイズが既存資料台帳と一致することを再確認した。ログイン、CAPTCHA、ボット拒否の迂回なし。

PDFは `/tmp/energy-kanri/` に置き、作業ツリーに含めない。全URL・サイズ・SHA256は `data/qualification-staging/energy-kanri/sources.json` と末尾一覧を参照。初回に `origin/ops/source-pdfs-20261104` に `energy-kanri/` がないことを読み取り確認済み。全件取得済みのため代替資料は使用していない。

公式の[過去問ページ](https://www.eccj.or.jp/mgr1/test_past/)の転載条件の記録（今回も同文言を再確認）：

> 試験問題は、個人的な利用を目的としたものです。これらの全部又は一部を無断で複製・転写することを固く禁じます。個人利用の範囲を超えて利用される方は、当センター試験部までご一報ください。

オーナーの権利確認済み・収録決定を適用し、この文言を停止・除外理由にはしていない。`ECCJ-owner-approved` は内部のオーナー決定の識別子であり、公式の一般向け転載許諾ライセンスがあるとの主張ではない。

## 検証

- `pnpm install --frozen-lockfile --store-dir /tmp/energy-kanri/pnpm-store`：成功。Corepack・pnpmキャッシュも `/tmp/energy-kanri/` に指定。lockfile変更なし。
- `pnpm validate:questions`：成功、26,444問、失敗0、既存警告16,808。対象は公開問題レジストリのため、未公開315演習設問は専用テストで別途確認。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：成功。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm exec vitest run __tests__/questions/energy-kanri-staging.test.ts __tests__/questions/qualification-expansion.test.ts __tests__/questions/live-qualification-coverage.test.ts __tests__/lib/home-directory.test.ts`：4ファイル、1,091件成功。
- 専用テストで319公式解答欄の正答一致・全解答番号の網羅・315演習設問の一意性・全肢解説・原文保存・共通指示・図の存在・全62原問842欄の配点・複数正答と順序不問の区別を確認。今回、制御図依存18設問、計算の前提表・ガラス球の光度、換気分類表、出題時点の注記を検証対象に追加。既存の熱電対図用テストは問題11に限定し、新規問題12と混同しないよう修正した。
- `git diff --check`：成功（読み取りのみ）。
- `pnpm build`・デプロイ・codex exec・Git書き込み操作・コミット・push・独立レビューは実施していない。

## 今回の変更ファイル

- `data/questions/energy-kanri/2025-electric-q14.json`（新規13設問）
- `data/questions/energy-kanri/2025-electric-q16.json`（新規16設問）
- `data/questions/energy-kanri/2025-heat-q12.json`（新規13設問）
- `data/questions/energy-kanri/2026-electric-q14.json`（新規15設問）
- `data/questions/energy-kanri/2026-electric-q15.json`（新規12設問）
- `data/questions/energy-kanri/2026-electric-q16.json`（新規14設問）
- `data/questions/energy-kanri/2026-heat-q12.json`（新規15設問）
- `data/questions/energy-kanri/2026-heat-q13.json`（新規13設問）
- `data/questions/energy-kanri/index.ts`
- `public/images/energy-kanri/2025/heat-q12-tank.png`
- `public/images/energy-kanri/2026/heat-q12-feedback.png`
- `public/images/energy-kanri/2026/heat-q12-offset.png`
- `public/images/energy-kanri/2026/heat-q12-step-response.png`
- `lib/qualifications/catalog.ts`
- `__tests__/questions/energy-kanri-staging.test.ts`
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
