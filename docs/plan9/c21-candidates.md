# PLAN9-C21 新規収録候補

依頼に添付された収録済み一覧と `data/questions/` を照合した。受験者数は実受験者の公表値を使用し、複数回・複数級の合算は延べ人数とした。複数段階の試験では、重複計上を避けるため原則として一次の人数を用いた。

## 受験者数順

| 資格 | 年間受験者 | 公式掲載URLと公開範囲 |
| --- | ---: | --- |
| 韓国語能力試験（TOPIK） | 41,059人（2023年、日本） | 国立国際教育院の公開試験画面に実施問題と採点用の正答を掲載。2022～2026年の掲載は第83・91・96・102回。 [既出問題一覧](https://www.topik.go.kr/TWSTDY/TWSTDY0080.do)、[第102回 TOPIK I 読解](https://www.topik.go.kr/TWSTDY/TWSTDY0090.do?sGrade=1&sNo=102&sType=r)、[韓国教育財団の受験者数](https://www.kref.or.jp/topik/about/) |
| ビジネス・キャリア検定 | 27,072人（2025年度、前後期合計） | 公式一覧の4回に加え、2023年度後期と2024年度前期も実施回別の公式ページから取得できた。中央職業能力開発協会の事業案内では技能検定と別の試験として掲載。 [過去の問題例及び解答](https://www.javada.or.jp/jigyou/gino/business/gakusyu.html#mondai)、[2023年度後期](https://www.javada.or.jp/jigyou/gino/business/sample_test_r05l.html)、[2024年度前期](https://www.javada.or.jp/jigyou/gino/business/sample_test_r06e.html)、[2025年度前期結果](https://www.javada.or.jp/jigyou/gino/business/result_r7e.pdf)、[2025年度後期結果](https://www.javada.or.jp/jigyou/gino/business/result_r7l.pdf) |
| 中国語検定試験（中検） | 14,489人（2025年、一次試験3回合計） | 第109～118回の問題・正答を掲載。リスニング原稿は別ページ。 [日本中国語検定協会の試験問題・解答](https://www.chuken.gr.jp/tcp/test.html)、[第114回結果](https://www.chuken.gr.jp/tcp/data/results/114)、[第115回結果](https://www.chuken.gr.jp/tcp/data/results/115)、[第116回結果](https://www.chuken.gr.jp/tcp/data/results/116) |
| 実用フランス語技能検定（仏検、3級を除く） | 11,637人（2025年度、3級を除く一次試験合計） | フランス語教育振興協会は2011・2015年度の実施問題と正解例を公開。3級は収録済み一覧の `apef3` と重複するため対象外。 [2011年度](https://apefdapf.org/dapf/presentation/exemples2011)、[2015年度](https://apefdapf.org/dapf/presentation/exemples)、[2025年度結果](https://apefdapf.org/dapf/presentation/statistiques/resultats2025) |
| 国内旅行業務取扱管理者 | 10,982人（2026年度） | 2022・2023年度の実施問題の公式URLを確認。2024年度以降はCBTの出題例。調査時は公式一覧とPDFの直接取得がメンテナンス画面へ転送された。 [公式一覧](https://www.anta.or.jp/exam/shiken/kakomon.html)、[2023年度問題](https://www.anta.or.jp/exam/shiken/pdf/R05mondai.pdf)、[2023年度正答](https://www.anta.or.jp/exam/shiken/pdf/R05kaitou_2.pdf)、[2026年度結果](https://www.anta.or.jp/exam/shiken/pdf/R08exam_jissijyokyo.pdf) |
| 京都・観光文化検定試験（京都検定） | 6,506人（2025年度、第26・27回合計） | 京都商工会議所の公式PDFに、出題回が明記された3級の問題10問と正答を掲載。過去問チャレンジの別の30問は、確認したリンク先の正答欄が空だった。最近の回は問題冊子の郵送案内を確認した。 [公式PDF](https://www.kyotokentei.ne.jp/news/docs/syokuinmeisikaitou.pdf)、[過去問チャレンジ](https://www.kyotokentei.ne.jp/about/question.html)、[解答欄の例](https://www.kyotokentei.ne.jp/about/pickup_explan.php?q=3&id=1059)、[第27回の問題冊子案内](https://www.kyotokentei.ne.jp/news/124745.html)、[受験者数](https://www.kyotokentei.ne.jp/about/past_data.html) |

## 収録結果

| 収録対象 | 実施回 | 問数 | 収録範囲 |
| --- | --- | ---: | --- |
| TOPIK I | 2022年第83回、2023年第91回、2024年第96回、2025年第102回 | 160 | 読解40問ずつ。2026年の過去問は公式一覧に掲載がなく、聞き取りは公式音声に依存するため今回の出題範囲外。TOPIK IIは未収録。 |
| ビジネス・キャリア検定 3級ロジスティクス管理 | 2023年度後期、2024・2025年度前後期、2026年度前期 | 240 | 単一の試験区分で2025年度の受験者数が最多の区分を選定。同区分の実受験者は2,255人。2022年度と2023年度前期は問題・正答がそろわなかった。 |
| 中国語検定 3級 | 2023～2026年の第109～118回 | 605 | 2025年の3級実受験者は4,224人。公式一覧の3級全10回を収録。リスニングは公式原稿を使った読解形式。 |
| 仏検 4級 | 2011・2015年度秋季 | 112 | 2025年度の4級実受験者は3,758人。公式公開の4級全2回を収録。聞き取りは公式原稿を使った読解形式で、公開音声も参照可能。 |
| 京都検定 3級 | 2018～2022年度の第15・16・17・19・20・21回 | 10 | 2025年度の3級実受験者は3,655人。公式PDFの10問。問題番号は抜粋内の収録順。 |

収録対象は上記の級・区分。他の級や分野の公式問題は未収録。

## 公式原本の組み合わせを確認できなかった主な試験

| 資格 | 確認結果 |
| --- | --- |
| 日商簿記 | 1級は試験問題と講評、2・3級は実問題の一部をサンプルとして公開している。1級の公式正答は確認できず、2・3級の模範解答は外部の教育機関が掲載している。[日本商工会議所・1級](https://www.kentei.ne.jp/bookkeeping/class1/1qkako)、[2・3級サンプル](https://www.kentei.ne.jp/bookkeeping/sample) |
| 証券外務員 | 公式サイトで試験概要と出題範囲を確認した。実施問題と正答の一般公開は確認できなかった。 [日本証券業協会・外務員資格試験](https://www.jsda.or.jp/gaimuin/shiken.html)、[外務員必携](https://www.jsda.or.jp/gaimuin/hikkei.html) |
| 税理士 | 国税庁は試験問題、答案用紙、出題のポイントを掲載している。公式正答は確認できなかった。[国税庁の税理士試験情報](https://www.nta.go.jp/taxes/zeirishi/news.htm) |
| 建設業経理士 | 実施機関による公開資料は問題と記入前の解答用紙。 |
| 秘書検定・ハングル能力検定・日本語検定 | 正答表、模範解答、サンプルの公開は確認できた。回を特定できる公式の問題原本と正答の組み合わせは確認できなかった。[秘書検定](https://jitsumu-ginou-kentei.jp/HS/)、[ハングル能力検定](https://hangul.or.jp/siken-top/pastexam/)、[日本語検定](https://www.nihongokentei.jp/result/resultnk/info.html) |
| ビジネス実務法務検定・ビジネス会計検定・リテールマーケティング（販売士）検定 | 公式のサンプルや市販教材とは別に、実施回の問題原本と正答を公開するページは確認できなかった。[ビジネス実務法務検定](https://kentei.tokyo-cci.or.jp/houmu/)、[ビジネス会計検定](https://www.b-accounting.jp/)、[販売士](https://www.kentei.ne.jp/retailsales) |
| 生命保険・損害保険の募集人試験 | 一般に閲覧できる公式の問題原本と正答の組み合わせは確認できなかった。[生命保険協会](https://www.seiho.or.jp/exam/)、[日本損害保険協会](https://www.sonpo-dairiten.jp/faq/cbt/0011.html) |
| 全国通訳案内士 | 2025年度は3,987人。直近5年度の筆記問題は公開されているが、年度別ページで問題と対応する公式正答は確認できなかった。[問題一覧](https://www.jnto.go.jp/projects/visitor-support/interpreter-guide-exams/past-exam-archives/)、[2025年度結果](https://www.jnto.go.jp/final_guide_gokakusha_2025.pdf) |
| 法学検定 | 公式の講評と統計公表先を確認したが、個別年度のページは調査時に取得できなかった。[講評一覧](https://www.shojihomu.or.jp/hougaku/list/hougaku_feedback) |
