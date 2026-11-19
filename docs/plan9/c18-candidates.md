# PLAN9-C18 新規資格候補

2026年11月19日時点。収録済み一覧と `data/questions/` を照合し、問題と正答の両方が公式に公開されている新規資格を、年間受験者数の降順に掲載する。年度内の複数回・種目・級を合算した数は延べ数。

| 順位 | 資格・検定 | 年間受験者数 | 試験実施機関の問題・正答 |
| --- | --- | ---: | --- |
| 1 | 全国高等学校家庭科保育技術検定 | [91,849件（2025年度、種目・級別の合計）](https://www.katei-ed.or.jp/custom_contents/cms_rwd/linkfile/hoiku_goukakurituR7.pdf) | [全国高等学校家庭科教育振興会、第41〜50回（2021〜2025年度）](https://www.katei-ed.or.jp/past.html)。音楽・リズム表現、造形表現、言語表現、家庭看護の準1級（旧2級）・1級に問題と解答がある。 |
| 2 | 全国高等学校家庭科食物調理技術検定 | [58,490件（2025年度、級別の合計）](https://www.katei-ed.or.jp/custom_contents/cms_rwd/linkfile/hishoku_goukakurituR7.pdf) | [全国高等学校家庭科教育振興会、第53〜62回（2021〜2025年度）](https://www.katei-ed.or.jp/past.html)。2級（旧3級）・準1級（旧2級）・1級に問題と解答がある。 |
| 3 | メンタルヘルス・マネジメント検定試験 | [39,097件（2025年度、第39・40回公開試験の実受験者の合計）](https://www.mental-health.ne.jp/data/) | [大阪商工会議所の公式パンフレット](https://www.mental-health.ne.jp/procedure/pdf/mentalhealth2026_A4.pdf)に第35回の問題と正解を抜粋掲載。[公開試験結果](https://www.mental-health.ne.jp/data/)には選択問題の模範解答を掲載。 |
| 4 | ビルクリーニング分野特定技能1号評価試験 | [8,573件（2025年度、国内3,029・海外5,544）](https://www.moj.go.jp/isa/content/001472215.pdf) | 全国ビルメンテナンス協会の2019年判断試験 [問題](https://cdn.j-bma.or.jp/wp-content/uploads/2019/12/2019tokutei_mondai_v2.pdf)・[正解](https://cdn.j-bma.or.jp/wp-content/uploads/2019/12/2019tokutei_kaitou.pdf)。現行のCBTは[サンプル問題](https://www.j-bma.or.jp/qualification-training/zairyu-1go)を掲載。 |

## 選外

| 資格・検定 | 理由 |
| --- | --- |
| 調理師・製菓衛生師・ふぐ処理師 | 山口県版が収録済み。都道府県が異なる同一資格も収録済みとして扱う。調理師は[2025年度全国18,600人](https://www.mhlw.go.jp/stf/newpage_11843.html)。 |
| 保育士・社会福祉士・介護福祉士・精神保健福祉士・介護支援専門員・公認心理師・管理栄養士・衛生管理者・美容師・理容師 | 収録済み。 |
| 作業環境測定士・労働衛生コンサルタント | 手元補充分に科目別の `library:emkohyo`・`library:cskohyo` がある。[安全衛生技術試験協会の統計](https://www.exam.or.jp/h_gokakuritsu/)。 |
| 介護分野特定技能評価試験、外食業・飲食料品製造業の特定技能評価試験 | 公式サイトでは例題・教材・実施結果を確認。実施回の問題・正答の組を確認できず。[厚生労働省](https://www.mhlw.go.jp/stf/newpage_000117702.html)、[外国人食品産業技能評価機構](https://otaff.or.jp/tokutei/) |
| 福祉住環境コーディネーター | [2025年度18,195人](https://kentei.tokyo-cci.or.jp/fukushi/about/data.html)。[1級の公表問題](https://kentei.tokyo-cci.or.jp/assets/20251214_fukushi1st-02.pdf)の公式正答を確認できず。2・3級は問題例。 |
| ネイリスト技能検定・JNAジェルネイル技能検定・日本化粧品検定 | 本試験と正答の公開原本の組を確認できず。ネイリスト技能検定は公式の書籍に過去問を掲載。[JNEC](https://www.nail-kentei.or.jp/about/)、[JNA](https://nail.or.jp/kentei/g_kentei.html)、[日本化粧品検定協会](https://cosme-ken.org/page-faq/faq36/) |
| 食生活アドバイザー・食品表示検定・ソムリエ／ワインエキスパート | 模範解答、問題例、試験案内をそれぞれ確認。実施回の問題・正答の組を確認できず。[FLAネットワーク協会](https://flanet.jp/juken/mohan.html)、[食品表示検定協会](https://www.shokuhyo.jp/)、[日本ソムリエ協会](https://www.sommelier.jp/exam) |
| 臨床心理士・心理学検定 | 実施回の問題・正答の組を確認できず。[日本臨床心理士資格認定協会](https://fjcbcp.or.jp/)、[日本心理学諸学会連合](https://jupaken.jp/about/history.html) |
| 健康食品管理士／食の安全管理士・クリーニング師 | 問題の公表を確認。年間約3,000人以上と確認できる全国の実受験者数が見つからず。[日本食品安全協会](https://www.jafsra.or.jp/flow/index4.html)、[愛媛県の学科問題・正答](https://www.pref.ehime.jp/page/55585.html) |
| 職業能力開発協会の技能検定各職種 | 対象外。 |

## 収録状況

| 資格・検定 | 収録済み | 公開原本がある未収録分 |
| --- | --- | --- |
| 保育技術検定 | 2025年度 第49回78問・第50回78問、2024年度 第47回78問・第48回79問 | 2021〜2023年度 第41〜46回。画像PDFからの転記、公式解答との照合、全肢解説の作成が未完了。 |
| 食物調理技術検定 | 2025年度 第61回57問・第62回59問、2024年度 第59回57問・第60回59問 | 2021〜2023年度 第53〜58回。画像PDFからの転記、公式解答との照合、全肢解説の作成が未完了。 |
| メンタルヘルス・マネジメント検定試験 | 2019〜2023年度の第27・29・31・33・35回。I・II・III種の公式公開抜粋を各年度3問、計15問。 | 収録したのは問題と正解がそろう直近5公表年度の抜粋。各回の残りの問題本文は公式公開を確認できず。 |
| ビルクリーニング分野特定技能1号評価試験 | 2019年 判断試験17問 | そのほかの実施回は、問題と正答の組を確認できず。 |

家庭科の実技や下位級は、公式の筆記問題と解答がそろう範囲に含まれない。問数は、独立した枝問を1問とし、複数選択を求める1設問はまとめて1問と数えた。
