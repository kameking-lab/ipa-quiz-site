import type { StagedKenchikushiQuestion } from "./types";

export const KENCHIKUSHI2_2025_IV: readonly StagedKenchikushiQuestion[] = [
  {
    "id": "kenchikushi2-2025-annual-IV-q1",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 1,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "工程表",
    "topicTags": [
      "工程表"
    ],
    "difficulty": 3,
    "question": "下に示すネットワーク工程表に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "この工事全体は、最短16日で終了する。",
      "イ": "C作業及びE作業が終了しなければ、G作業は開始できない。",
      "ウ": "C作業、D作業及びE作業は、並行して行うことができる。",
      "エ": "C作業の所要日数を1日延長すると、この工事全体の作業日数は、1日の延長となる。",
      "オ": "G作業の所要日数を1日短縮すると、この工事全体の作業日数は、1日の短縮となる。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。最早時刻を順に求めると終点16日。Cは1日の余裕があるため、所要日数を1日延長しても全体工期は変わらない。クリティカルパスはA-E-G-ダミー-J-K。",
    "choiceExplanations": {
      "ア": "適当。A4日、E2日、G4日、ダミー0日、J4日、K2日の経路が16日で最長となるため、工事全体の最短工期は16日。",
      "イ": "適当。Gの始点にはCからのダミーとEが接続するため、CとEの双方が完了するまでGを開始できない。",
      "ウ": "適当。Cは開始直後、DとEはA完了後に開始できる。Cの4～5日目にDとEを重ねて作業できる。",
      "エ": "不適当。Cは5日、Eまでの経路A-Eは6日なので、Cには1日の余裕がある。Cを6日にしてもGの開始日は変わらず、全体は16日。",
      "オ": "適当。Gを1日短縮するとA-E-G-ダミー-J-Kは15日となり、他の経路も15日以下なので、全体工期も1日短縮できる。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 14,
    "sourcePrintedPage": "施工 13",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/kenchikushi2-2025-IV-q1.png"
    ],
    "imageAltTexts": [
      "工程表。開始からA4日・B2日・C5日。A後にD4日とE2日、BもEの前提。CとE後にG4日、C後にH2日。D後F5日、G後I3日、GとH後J4日。F・I・J完了後K2日で終了。破線矢印は所要0日のダミー。"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q2",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 2,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "材料保管",
    "topicTags": [
      "材料保管"
    ],
    "difficulty": 3,
    "question": "工事現場における材料の保管に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "フラッシュ戸は、屋内に平積みにして保管した。",
      "イ": "板ガラスは、屋内に立置きにして保管した。",
      "ウ": "ALCパネルは、屋内に台木を水平に置き、その上に平積みにして保管した。",
      "エ": "アスファルトルーフィングは、屋内の乾燥した場所に、平積みにして保管した。",
      "オ": "ビニル床シートは、屋内の乾燥した場所に、直射日光を避けて立置きにして保管した。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。アスファルトルーフィングは巻いた状態で立置き保管する。平積みは変形やくっつき等を生じやすいため不適当。",
    "choiceExplanations": {
      "ア": "適当。フラッシュ戸は屋内で平積みにし、支持を適切に設けて反りや変形、損傷を防止する。",
      "イ": "適当。板ガラスは屋内で立置きとし、転倒や小口の損傷を防ぐ支持・養生を行う。",
      "ウ": "適当。ALCパネルは水平に配置した台木上へ平積みし、接地・吸水や曲げ損傷を防止する。",
      "エ": "不適当。アスファルトルーフィングは乾燥した屋内で立置きとする。平積みにすると巻きの変形や付着を生じやすい。",
      "オ": "適当。ビニル床シートは乾燥した屋内で直射日光を避け、巻きを立てて変形・品質劣化を防ぐ。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 14,
    "sourcePrintedPage": "施工 13"
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q3",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 3,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "安全管理",
    "topicTags": [
      "安全管理"
    ],
    "difficulty": 3,
    "question": "工事現場の安全確保に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "架設通路において、墜落の危険のある箇所に、高さ90cmの手摺及び高さ40cmの中桟を設けた。",
      "イ": "スレート葺の屋根の上で作業を行うに当たり、幅24cmの歩み板を設け、防網を張った。",
      "ウ": "単管足場の建地の間隔を、桁行方向1.8m、はり間方向1.5mとした。",
      "エ": "地山の掘削作業については、掘削面の高さが2mであったので、作業主任者を選任した。",
      "オ": "高さ3mの位置に設ける足場の作業床において、床材間の隙間を2cmとした。"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。踏抜きのおそれのあるスレート屋根では幅30 cm以上の歩み板を設ける。24 cmでは不足し、防網を設けても歩み板幅の不足は解消しない。",
    "choiceExplanations": {
      "ア": "適当。架設通路の墜落危険箇所には高さ85 cm以上の手すりと中桟等を設ける。90 cm及び40 cmは条件を満たす。",
      "イ": "不適当。スレート屋根上の踏抜き防止には幅30 cm以上の歩み板が必要。幅24 cmでは不足している。",
      "ウ": "適当。単管足場の建地間隔は桁行1.85 m以下、梁間1.5 m以下。1.8 mと1.5 mはこの範囲内である。",
      "エ": "適当。掘削面の高さ2 m以上の地山掘削では作業主任者を選任する。高さちょうど2 mも対象となる。",
      "オ": "適当。高さ2 m以上の足場作業床で床材間の隙間は3 cm以下とする。2 cmはこの上限を満たす。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 15,
    "sourcePrintedPage": "施工 14",
    "sourceRubies": [
      {
        "base": "摺",
        "reading": "すり"
      }
    ],
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/web/t_doc?dataId=74003000&dataType=0&pageNo=10"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q4",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 4,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "建設廃棄物",
    "topicTags": [
      "建設廃棄物"
    ],
    "difficulty": 3,
    "question": "建築等の工事現場から排出される廃棄物に関する次の記述のうち、「廃棄物の処理及び清掃に関する法律」に照らして、最も不適当なものはどれか。",
    "choices": {
      "ア": "建築物の新築工事に伴って生じた発泡プラスチック系断熱材の廃材は、産業廃棄物に該当する。",
      "イ": "建築物の改装工事に伴って取り外した木製の建具は、産業廃棄物に該当する。",
      "ウ": "場所打ちコンクリート杭の杭頭処理に伴って生じたコンクリートの破片は、産業廃棄物に該当する。",
      "エ": "建築物の解体工事に伴って生じた灯油類の廃油は、特別管理産業廃棄物に該当する。",
      "オ": "建築物の防水工事に伴って生じたアスファルトの使用残さは、特別管理産業廃棄物に該当する。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。アスファルトの使用残さは通常の産業廃棄物であり、それだけで特別管理産業廃棄物にはならない。灯油類の廃油との分類の違いに注意する。",
    "choiceExplanations": {
      "ア": "適当。新築工事から生じる発泡プラスチック断熱材の廃材は、廃プラスチック類として産業廃棄物に該当する。",
      "イ": "適当。建設工事に伴い発生する木くずは産業廃棄物であり、改装で撤去した木製建具も該当する。",
      "ウ": "適当。杭頭処理によるコンクリート片は工作物の新築等に伴うがれき類として産業廃棄物に該当する。",
      "エ": "適当。灯油類の廃油は引火性を有する所定の廃油として、特別管理産業廃棄物の対象になる。",
      "オ": "不適当。防水工事のアスファルト使用残さは通常の産業廃棄物であり、アスファルトという理由で特別管理に分類しない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 15,
    "sourcePrintedPage": "施工 14"
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q5",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 5,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "仮設足場",
    "topicTags": [
      "仮設足場"
    ],
    "difficulty": 3,
    "question": "仮設工事に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "単管足場の壁つなぎの間隔は、垂直方向5.0m、水平方向5.5mとした。",
      "イ": "くさび緊結式足場については、建地の間隔を1.8mとし、建地間の最大積載荷重を500kgと表示した。",
      "ウ": "架設通路を設けるに当たって、勾配が30度を超えるので、階段を設置した。",
      "エ": "枠組足場の水平材を、最上層及び5層以内ごとに設けた。",
      "オ": "はしご道のはしごの上端を、床から80cm突出させた。"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。くさび緊結式足場の一層一スパンの荷重は仕様・載荷条件に従い、通常の基準では連続載荷250 kg、間引き載荷でも400 kg等の制限がある。500 kgとする2は過大。",
    "choiceExplanations": {
      "ア": "適当。単管足場の壁つなぎ間隔は垂直5 m以下・水平5.5 m以下であり、示された間隔は上限以内。",
      "イ": "不適当。通常のくさび緊結式足場の建地間一層一スパンへ500 kgを載せる設定は過大。部材性能・載荷条件に応じた上限内に定める。",
      "ウ": "適当。架設通路は勾配30度を超える場合、階段を設ける。急勾配を単なる斜路として使用しない。",
      "エ": "適当。枠組足場の水平材は最上層と5層以内ごとに設置し、足場の水平剛性と安定性を確保する。",
      "オ": "適当。はしご道の上端は床から60 cm以上突出させる。80 cmは乗り移りに必要な突出長さを満たす。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 15,
    "sourcePrintedPage": "施工 14",
    "officialReferenceUrls": [
      "https://www.mhlw.go.jp/web/t_doc?dataId=74003000&dataType=0&pageNo=10"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q6",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 6,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "木造基礎",
    "topicTags": [
      "木造基礎"
    ],
    "difficulty": 3,
    "question": "木造住宅の基礎工事等に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "ねこ土台を使用するべた基礎の床下防湿措置として、外周部の土台の全周にわたって、1m当たり有効面積50cm²以上の換気孔を設けた。",
      "イ": "アンカーボルトの埋設に当たり、土台継手及び土台仕口箇所の埋設位置は、上木側とした。",
      "ウ": "布基礎の底盤については、厚さを150mmとし、幅を450mmとした。",
      "エ": "布基礎の天端ならしは、遣方を基準にして陸墨を出し、セメント、砂の調合が容積比にして1:3のセメントモルタルを水平に塗り付けた。",
      "オ": "布基礎の床下防湿措置を行うに当たり、床下地面は盛土し、十分に突き固めた後、床下地面全面に厚さ60mmのコンクリートを打設した。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。ねこ土台による床下換気では土台の全周にわたり1 m当たり有効面積75 cm²以上の換気孔を確保する。50 cm²では不足。",
    "choiceExplanations": {
      "ア": "不適当。ねこ土台の換気孔は全周にわたり1 m当たり75 cm²以上が基準。50 cm²以上では必要な有効換気面積を満たさない。",
      "イ": "適当。土台の継手・仕口では上木側にアンカーボルトを設け、上木の浮上りや接合部の外れを防ぐ。",
      "ウ": "適当。布基礎の底盤厚150 mm、幅450 mmは、木造住宅の所定の仕様に適合する寸法である。",
      "エ": "適当。遣方から水平の基準となる陸墨を出し、容積比1:3のセメントモルタルで水平に天端ならしを行う。",
      "オ": "適当。床下地面を盛土・締固めしたうえで全面に60 mmのコンクリートを打つ方法は、床下防湿措置として妥当。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 16,
    "sourcePrintedPage": "施工 15",
    "sourceRubies": [
      {
        "base": "遣方",
        "reading": "やりかた"
      },
      {
        "base": "陸墨",
        "reading": "ろくずみ"
      }
    ],
    "officialReferenceUrls": [
      "https://www.flat35.com/files/a/public/flat35/400354624.pdf"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q7",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 7,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "土工・地業",
    "topicTags": [
      "土工・地業"
    ],
    "difficulty": 3,
    "question": "土工事及び地業工事に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "割栗地業の根切り深さは、割栗石の沈み寸法を見込んで決めた。",
      "イ": "埋戻しにおける締固めは、透水性のよい山砂を用いたので、水締めとした。",
      "ウ": "スクリューウエイト貫入試験(旧スウェーデン式サウンディング試験)による地盤調査を実施し、計測は建築物の四隅付近を含め4点以上で調査を行った。",
      "エ": "比較的良好な地盤に、切込み砂利を用いて砂利地業を行った。",
      "オ": "山留めを親杭横矢板工法としたので、基礎工事までの作業順序は、根切り→砂利地業→山留め→基礎の順で行った。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。親杭横矢板の山留めは掘削に先行・並行して施工する。根切りと砂利地業を完了してから山留めを行う順序は不適当。",
    "choiceExplanations": {
      "ア": "適当。割栗石は締固めで沈むため、その沈み寸法を見込んで根切り深さと地業の仕上がり高さを決める。",
      "イ": "適当。透水性のよい山砂の埋戻しでは、水締めによって砂を締め固めることができる。",
      "ウ": "適当。住宅の地盤調査は四隅付近を含めて4点以上とし、敷地内の地盤のばらつきを確認する計画が妥当。",
      "エ": "適当。比較的良好な地盤では、切込み砂利を敷き均し締め固める砂利地業を行うことができる。",
      "オ": "不適当。親杭を先行して設置し、掘削の進行に合わせて横矢板で土を支える。山留めを砂利地業の後へ回すことはできない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 16,
    "sourcePrintedPage": "施工 15"
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q8",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 8,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "鉄筋加工・継手",
    "topicTags": [
      "鉄筋加工・継手"
    ],
    "difficulty": 3,
    "question": "鉄筋工事に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "鉄筋の加工については、切断は直角切断機で行い、折曲げは手動鉄筋折曲げ機で行った。",
      "イ": "鉄筋の重ね継手部分及び交差部分の要所を、径0.8mmのなまし鉄線を用いて結束した。",
      "ウ": "SD345のD22とD32との継手については、手動ガス圧接とした。",
      "エ": "梁の鉄筋のかぶり厚さは、あばら筋の外側から測定した。",
      "オ": "柱の帯筋を加工するに当たり、見込んでおくべきかぶり厚さは、施工誤差を考慮して、必要な最小かぶり厚さに10mmを加えた数値とした。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。手動ガス圧接で異径鉄筋を継ぐ場合は径差7 mm以下等の適用条件がある。D22とD32の径差は10 mmであり適用範囲外。",
    "choiceExplanations": {
      "ア": "適当。鉄筋の切断は所定の切断機、折曲げは鉄筋折曲げ機を用いて行う。加熱などにより材質を損なわない。",
      "イ": "適当。重ね継手・交差部の要所は径0.8 mm以上のなまし鉄線等で結束する。径0.8 mmは下限を満たす。",
      "ウ": "不適当。D22とD32は径差が10 mmとなり、異径鉄筋の手動ガス圧接の径差7 mm以下の条件を満たさない。",
      "エ": "適当。かぶり厚さはコンクリート表面から最外側の鉄筋表面まで。梁では通常あばら筋外側から測る。",
      "オ": "適当。加工寸法では施工誤差を見込み、最小かぶり厚さに通常10 mmを加えた設計かぶり厚さを用いる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 16,
    "sourcePrintedPage": "施工 15",
    "officialReferenceUrls": [
      "https://jrji.jp/question/index.html"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q9",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 9,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "鉄筋施工・検査",
    "topicTags": [
      "鉄筋施工・検査"
    ],
    "difficulty": 3,
    "question": "鉄筋工事に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "スラブ及び梁の底部のスペーサーは、特記がなかったので、かぶり厚さの範囲に防錆処理が行われている鋼製のものを使用した。",
      "イ": "鉄筋の組立て後、直接、鉄筋の上を歩かないように、スラブや梁に歩み板を置き渡した。",
      "ウ": "ガス圧接継手の外観検査は、圧接箇所の全数について実施した。",
      "エ": "基礎の鉄筋の組立てに当たって、鉄筋のかぶり厚さには、捨てコンクリート部分の厚さを含めなかった。",
      "オ": "鉄筋径が異なるガス圧接継手において、圧接部のふくらみの直径を、細いほうの鉄筋径の1.2倍とした。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。ガス圧接部のふくらみ直径は細いほうの鉄筋径の1.4倍以上。1.2倍では必要寸法を満たさない。",
    "choiceExplanations": {
      "ア": "適当。スラブ・梁底の鋼製スペーサーにはかぶり範囲の防錆処理が必要。処理済みの所定品は使用できる。",
      "イ": "適当。組み立てた鉄筋を直接踏むと位置ずれや変形を生じるため、歩み板を設けて鉄筋を保護する。",
      "ウ": "適当。ガス圧接継手の外観検査は全数について行い、ふくらみの形状・寸法、軸ずれ等を確認する。",
      "エ": "適当。捨てコンクリートは構造体のかぶり厚さに算入しない。基礎本体の表面から必要かぶりを確保する。",
      "オ": "不適当。ふくらみ直径は細いほうの鉄筋径の1.4倍以上が必要。1.2倍では圧接部の形状寸法の基準を満たさない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 17,
    "sourcePrintedPage": "施工 16",
    "sourceRubies": [
      {
        "base": "錆",
        "reading": "せい"
      }
    ],
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/gobuild/content/001888816.pdf"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q10",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 10,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "型枠工事",
    "topicTags": [
      "型枠工事"
    ],
    "difficulty": 3,
    "question": "型枠工事に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "型枠の建込み位置・精度の検査は、スケール、トータルステーション及びレベルで測定し、型枠計画図及び工作図と合致することを確認した。",
      "イ": "型枠に設ける配管用スリーブは、径が200mmで、柱及び梁以外の箇所であり、かつ、開口補強が不要であったので、紙チューブを用いた。",
      "ウ": "せき板に用いる木材は、コンクリート表面の硬化不良を防止するために、長期間、直射日光にさらして、乾燥させたものを使用した。",
      "エ": "上下階の支柱は、平面上において同一位置となるように、垂直に立てた。",
      "オ": "壁に用いるセパレーターの間隔を求めるに当たって、コンクリートの単位体積重量にコンクリートの打込み高さを乗じて、コンクリートの側圧を算出した。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。木材を長期直射日光にさらすと、木材成分の影響等でコンクリート表面の硬化不良を生じるおそれがある。乾燥材ならよいという扱いにはしない。",
    "choiceExplanations": {
      "ア": "適当。型枠の位置・高さ・精度をスケール、測量機器等で検査し、計画図・工作図との整合を確認する。",
      "イ": "適当。径200 mmで柱・梁以外、開口補強を要しない所定の配管スリーブには紙チューブを使用できる。",
      "ウ": "不適当。長期間直射日光にさらした木材はコンクリート表面の硬化不良を起こすおそれがあり、せき板への使用に適さない。",
      "エ": "適当。上下階の支柱を同じ平面位置に垂直に立てることで、上部からの荷重を確実に下階へ伝える。",
      "オ": "適当。側圧を液圧としてコンクリート単位体積重量×打込み高さで算定する方法は、型枠の安全側の設計に用いられる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 17,
    "sourcePrintedPage": "施工 16",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/gobuild/content/001888816.pdf"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q11",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 11,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "コンクリート施工",
    "topicTags": [
      "コンクリート施工"
    ],
    "difficulty": 3,
    "question": "コンクリート工事に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "基礎に打ち込むレディーミクストコンクリートの荷卸ろし地点におけるスランプは、特記がなかったので、15cmとした。",
      "イ": "レディーミクストコンクリートの受入検査において、指定した空気量の値に対して、-1.3%であったので許容した。",
      "ウ": "スラブにおけるコンクリートの鉛直打継ぎの位置は、特記がなかったので、そのスパンの端から1/4付近とした。",
      "エ": "床スラブのコンクリート打込み後、24時間が経過したので、振動を与えないように注意して、床スラブ上において墨出し作業を行った。",
      "オ": "高炉セメントB種を用いたコンクリートの打込み後の湿潤養生期間を、5日間とした。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。高炉セメントB種を用いる場合、通常の湿潤養生期間は7日以上。5日間は普通ポルトランドセメント等の標準値である。",
    "choiceExplanations": {
      "ア": "適当。基礎のレディーミクストコンクリートは特記がなければ通常スランプ15 cmを用いる。柱・梁等の標準値と区別する。",
      "イ": "適当。空気量の許容差は通常指定値に対して±1.5%。−1.3%はこの範囲に入るので受け入れられる。",
      "ウ": "適当。スラブの鉛直打継ぎはスパン中央又は端から1/4付近等に設ける。端から1/4という位置は妥当。",
      "エ": "適当。打込み後少なくとも1日は歩行・作業を避ける。24時間経過後も有害な振動を与えないよう注意して墨出しを行う。",
      "オ": "不適当。高炉セメントB種では湿潤養生7日以上を確保するのが標準であり、5日間では不足する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 18,
    "sourcePrintedPage": "施工 17",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/gobuild/content/001888816.pdf"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q12",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 12,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "鉄骨建方",
    "topicTags": [
      "鉄骨建方"
    ],
    "difficulty": 3,
    "question": "鉄骨工事に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "ナット回転法によるM12(ねじの呼び径)の高力六角ボルトの本締めは、特記がなかったので、一次締付け完了後を起点としてナットを120度回転させて行った。",
      "イ": "高力ボルト接合による組立て後、ボルト孔心が一致せずボルトが挿入できないものは、スプライスプレートを取り替えた。",
      "ウ": "建方の本接合に先立ち、ひずみを修正し、建入れ直しを行った。",
      "エ": "高さ5mの柱の倒れの建方精度については、特記がなかったので、管理許容差が5mm以下であることを確認した。",
      "オ": "敷地が狭く部材の搬入経路が一方向となるので、建方は建逃げ方式を採用した。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。ナット回転法の規定回転量は通常120°だがM12は60°。M12へ120°を適用する1が誤り。",
    "choiceExplanations": {
      "ア": "不適当。M12の規定ナット回転量は一次締付け後60°。他の一般的な径に用いる120°と混同している。",
      "イ": "適当。孔心の不一致でボルトが入らない場合は、必要に応じてスプライスプレートを交換し、無理な挿入や不適切な孔拡大を避ける。",
      "ウ": "適当。本接合を行う前にひずみ修正と建入れ直しを行い、建方精度を確保してから接合部を固定する。",
      "エ": "適当。柱の倒れの管理許容差は高さの1/1,000等によるため、高さ5 mでは5 mm以下となる。",
      "オ": "適当。搬入経路が一方向で狭い現場では、奥側から順に組み立てる建逃げ方式によって作業経路を確保する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 18,
    "sourcePrintedPage": "施工 17",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/gobuild/content/001888816.pdf"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q13",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 13,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "鉄骨溶接",
    "topicTags": [
      "鉄骨溶接"
    ],
    "difficulty": 3,
    "question": "鉄骨工事における溶接に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "柱梁接合部において、鋼製エンドタブの取付けは、裏当て金に組立溶接を行った。",
      "イ": "吸湿の疑いのある溶接棒は、再乾燥させてから使用した。",
      "ウ": "完全溶込み溶接において、初層の溶接で継手部と裏当て金が十分に溶け込むようにした。",
      "エ": "スタッド溶接完了後の検査において、仕上り高さが指定寸法の-3mm、傾きが6度であったので、合格とした。",
      "オ": "作業場所の気温が3°Cであったので、溶接線から100mmまでの範囲の母材部分を加熱して、溶接を行った。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。スタッドの仕上り高さは指定寸法±2 mm、傾きは5°以内が標準。−3 mmかつ6°ではいずれも不合格。",
    "choiceExplanations": {
      "ア": "適当。柱梁接合部の鋼製エンドタブは裏当て金へ組立溶接し、母材の有害な溶接欠陥等を避ける。",
      "イ": "適当。吸湿した溶接棒は気孔や水素の問題を生じるため、規定に従い再乾燥させてから使用する。",
      "ウ": "適当。完全溶込み溶接は初層で継手部・裏当て金へ十分に溶け込ませ、ルート部の欠陥を防ぐ。",
      "エ": "不適当。仕上り高さの標準許容差は±2 mm、傾き5°以内。高さ−3 mm、傾き6°は両方とも許容範囲外。",
      "オ": "適当。気温0～5℃の範囲では、溶接線から100 mm程度の母材範囲を適切に加熱して溶接を行う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 18,
    "sourcePrintedPage": "施工 17",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/gobuild/content/001888816.pdf"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q14",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 14,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "押出成形セメント板",
    "topicTags": [
      "押出成形セメント板"
    ],
    "difficulty": 3,
    "question": "押出成形セメント板工事に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "外壁パネルを縦張り工法で取り付けるに当たり、取付け金物は、パネルの上下端部に、ロッキングできるように取り付けた。",
      "イ": "外壁パネルを横張り工法で取り付けるに当たり、取付け金物は、パネルの左右端部に、スライドできるように取り付けた。",
      "ウ": "外壁パネルを縦張り工法で取り付けるに当たり、パネル相互の目地幅は、特記がなかったので、長辺の目地幅を15mm、短辺の目地幅を10mmとした。",
      "エ": "出隅及び入隅のパネル接合目地は伸縮目地とし、シーリング材を充塡した。",
      "オ": "パネルに損傷があったが、パネルの構造耐力や防水性能などに影響のない軽微なものであったので、補修して使用した。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。標準的なパネルの目地は長辺10 mm以上、短辺15 mm以上。長辺15 mm・短辺10 mmでは短辺が不足する。",
    "choiceExplanations": {
      "ア": "適当。縦張り外壁パネルは上下端の取付け金物をロッキング可能な構成とし、層間変位等に追従させる。",
      "イ": "適当。横張り外壁パネルは左右端の取付け金物をスライド可能にして、躯体の変形に追従させる。",
      "ウ": "不適当。通常の幅900 mm以下のパネルは長辺目地10 mm以上、短辺15 mm以上。短辺10 mmでは標準の必要幅を満たさない。",
      "エ": "適当。出隅・入隅は変形が集中しやすく、伸縮目地としてシーリングを充填し、防水性と追従性を確保する。",
      "オ": "適当。構造耐力や防水性能等に影響しない軽微な損傷であれば、所定の方法で補修して使用できる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 19,
    "sourcePrintedPage": "施工 18",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/gobuild/content/001888816.pdf"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q15",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 15,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "木工事",
    "topicTags": [
      "木工事"
    ],
    "difficulty": 3,
    "question": "木工事に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "敷居の溝の底には、堅木を埋め木した。",
      "イ": "垂木の継手の位置は、母屋上端で乱に配置した。",
      "ウ": "大引の継手は、床束心で突付け継ぎとした。",
      "エ": "構造材に用いる製材の品質は、JASに適合する構造用製材を使用した。",
      "オ": "和室の畳床において、根太の間隔を455mmとした。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。大引の継手は床束心から150 mm程度持ち出した位置で腰掛けあり継ぎ等とし、一体性を確保する。単なる突付け継ぎとする3は不適当。",
    "choiceExplanations": {
      "ア": "適当。敷居溝の底に堅木を埋めると、建具の摺動による摩耗を抑え、滑りや耐久性を改善できる。",
      "イ": "適当。垂木の継手は支持点である母屋上に設け、継手が同じ位置へ集中しないよう乱に配置する。",
      "ウ": "不適当。大引の継手は床束心から150 mm程度持ち出した位置で腰掛けあり継ぎ等により接合する。単なる突付け継ぎでは継手の一体性を確保できない。",
      "エ": "適当。構造材にはJASに適合する構造用製材を用い、強度・品質の条件を満たすものとする。",
      "オ": "適当。和室の畳床の根太間隔455 mmは標準的な配置。床材の種類や厚さ等に応じて適切な間隔を確保する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 19,
    "sourcePrintedPage": "施工 18",
    "sourceRubies": [
      {
        "base": "母屋",
        "reading": "もや"
      }
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q16",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 16,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "木造接合金物",
    "topicTags": [
      "木造接合金物"
    ],
    "difficulty": 3,
    "question": "木造軸組工法における接合金物とその用途との組合せとして、最も不適当なものは、次のうちどれか。",
    "choices": {
      "ア": "短ざく金物 ― 胴差相互の接合",
      "イ": "折曲げ金物 ― 通し柱と胴差の接合",
      "ウ": "ひねり金物 ― 垂木と軒桁の接合",
      "エ": "くら金物 ― 垂木と母屋の接合",
      "オ": "ホールダウン金物(引寄せ金物) ― 上下階の柱相互の接合"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。折曲げ金物は垂木と母屋・軒桁・棟木等の接合に用いる。通し柱と胴差の接合という2の組合せが不適当。",
    "choiceExplanations": {
      "ア": "適当。短ざく金物は胴差相互等の継手を補強し、部材同士の引張力の伝達を確保するために用いる。",
      "イ": "不適当。折曲げ金物は垂木と母屋・軒桁・棟木等を接合する金物。通し柱と胴差の接合に用いるという組合せが異なる。",
      "ウ": "適当。ひねり金物は垂木と軒桁等を緊結し、風による垂木の浮上りや外れを防ぐ。",
      "エ": "適当。くら金物は垂木と母屋等の取合いを補強し、垂木の浮上りやずれを抑える接合金物である。",
      "オ": "適当。ホールダウン金物は柱の引抜き力を伝達し、基礎との接合のほか上下階の柱相互の接合にも用いる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 19,
    "sourcePrintedPage": "施工 18",
    "sourceRubies": [
      {
        "base": "母屋",
        "reading": "もや"
      }
    ],
    "officialReferenceUrls": [
      "https://www.kondotec.co.jp/products/woodenhouse/10808.html"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q17",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 17,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "屋根防水",
    "topicTags": [
      "屋根防水"
    ],
    "difficulty": 3,
    "question": "鉄筋コンクリート造建築物の陸屋根防水工事に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "鋳鉄製ルーフドレンは、コンクリートに打込みとし、水はけよく、床面より下げた位置とした。",
      "イ": "アスファルト防水工事において、一般部分のルーフィング類の張付けに先立ち、出隅、入隅、下地目地部等の増張りを行った。",
      "ウ": "アスファルト防水工事において、アスファルトルーフィング類の継目の重ね幅については、幅方向、長手方向ともに、100mm重ね合わせて張り付けた。",
      "エ": "合成高分子系シート防水工事において、防水下地の屋根スラブとパラペットとが交差する入隅部分は、通りよく直角とした。",
      "オ": "ウレタンゴム系高伸長形塗膜防水工法(密着工法)において、防水材の塗継ぎの重ね幅については50mmとした。"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。ウレタンゴム系高伸長形塗膜防水の塗継ぎ重ね幅は100 mm以上。50 mmは補強布の重ね幅との混同である。",
    "choiceExplanations": {
      "ア": "適当。ルーフドレンはコンクリートに確実に固定し、周囲の床面より下げて排水が集まるようにする。",
      "イ": "適当。出隅・入隅・下地目地等の増張りを一般部のルーフィングより先に行い、弱点部を補強する。",
      "ウ": "適当。アスファルトルーフィングの継目は幅・長手方向とも通常100 mm以上重ね合わせ、連続した防水層を形成する。",
      "エ": "適当。合成高分子シート防水の下地入隅は通りよく直角とする。アスファルト防水の面取り等の仕様と区別する。",
      "オ": "不適当。塗膜防水材の塗継ぎは100 mm以上重ねる。50 mmは補強布の重ね幅で、防水材の塗継ぎ幅としては不足。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 20,
    "sourcePrintedPage": "施工 19",
    "sourceRubies": [
      {
        "base": "陸",
        "reading": "ろく"
      }
    ],
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/gobuild/content/001888816.pdf"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q18",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 18,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "左官・タイル・石",
    "topicTags": [
      "左官・タイル・石"
    ],
    "difficulty": 3,
    "question": "左官工事、タイル工事及び石工事に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "コンクリート下地外壁へのセメントモルタル塗りにおいて、1回の塗厚は6mmとし、全塗厚は18mmとした。",
      "イ": "タイル工事において、張付けモルタルの練り混ぜは機械練りとし、1回に練り混ぜる量は120分以内に張り終える量とした。",
      "ウ": "外壁のタイル張りにおいて、タイルの引張接着強度を確認する試験体の数は、100m²ごと及びその端数につき1個以上、かつ、全体で3個以上とした。",
      "エ": "セメントモルタルによる改良圧着張りにおいて、張付けセメントモルタルの厚さは、下地側を5mm、タイル側を2mmとした。",
      "オ": "外壁乾式工法の石工事において、特記がなかったので、厚さ30mmの石材を用いた。"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "公式正答は2。タイル張付けモルタルの1回の練混ぜ量は60分以内に張り終える量。120分では長すぎ、品質低下を生じる。",
    "choiceExplanations": {
      "ア": "適当。セメントモルタルの1回塗厚は一般に7 mm以下とし、6 mmずつ計18 mmとする塗重ねは妥当。",
      "イ": "不適当。モルタルは原則機械練りとし、1回の量は60分以内に張り終える量とする。120分では長すぎる。",
      "ウ": "適当。外壁タイルの引張接着強度試験体は100 m²ごと及び端数ごとに1個以上、かつ全体3個以上を確保する。",
      "エ": "適当。改良圧着張りは下地側とタイル裏面の両方にモルタルを塗る。下地5 mm・タイル側2 mmは妥当な厚さ。",
      "オ": "適当。外壁乾式石張りでは特記がなければ石材厚30 mmが標準。取付け金物等と併せて安全性を確保する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 20,
    "sourcePrintedPage": "施工 19",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/gobuild/content/001888816.pdf"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q19",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 19,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "塗装",
    "topicTags": [
      "塗装"
    ],
    "difficulty": 3,
    "question": "塗装工事に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "木部のクリヤラッカー塗りの下塗りには、ジンクリッチプライマーを用いた。",
      "イ": "オイルステイン塗りの色調の調整は、所定のシンナーによって行った。",
      "ウ": "屋外の鉄鋼面における中塗り及び上塗りは、アクリルシリコン樹脂エナメル塗りとした。",
      "エ": "屋内のせっこうボード面における中塗り及び上塗りは、合成樹脂エマルションペイント塗りとした。",
      "オ": "冬期におけるコンクリート面への塗装において、コンクリート素地の材齢による乾燥期間の目安を、28日間とした。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。ジンクリッチプライマーは鉄鋼面の防錆に用いる。木部のクリヤラッカー下塗りにはラッカー系ウッドシーラー等を用いる。",
    "choiceExplanations": {
      "ア": "不適当。亜鉛末を含むジンクリッチプライマーは鋼材用の防錆塗料。木部のクリヤラッカー下塗りには適さない。",
      "イ": "適当。オイルステインは所定のシンナーで希釈等を行い、試し塗りで仕上がりを確かめながら色調を調整する。",
      "ウ": "適当。アクリルシリコン樹脂エナメルは耐候性を備え、屋外鉄鋼面の中塗り・上塗りに用いることができる。",
      "エ": "適当。屋内せっこうボード面の中塗り・上塗りには、合成樹脂エマルションペイントを使用できる。",
      "オ": "適当。冬期のコンクリート素地の乾燥期間は材齢28日程度を目安とする。実際の含水状態や施工条件も確認する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 20,
    "sourcePrintedPage": "施工 19",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/gobuild/content/001888816.pdf"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q20",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 20,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "建具・ガラス・内装",
    "topicTags": [
      "建具・ガラス・内装"
    ],
    "difficulty": 3,
    "question": "建具工事、ガラス工事及び内装工事に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "鉄筋コンクリート造建築物の屋外の雨掛り部分に面するアルミニウム製建具枠の取付けにおいて、仮留め用のくさびを残したまま、躯体と枠との間にセメントモルタルを密実に充塡した。",
      "イ": "外部に面する網入り板ガラスの小口処理については、下辺小口及び縦小口下端から1/4の高さまで、防錆テープによる防錆処理を行った。",
      "ウ": "ガラスブロック積みの目地仕上げにおいて、目地モルタルをガラスブロック表面から10～12mmの位置に目地押えを行い、化粧目地モルタルを隙間なく平滑に充塡した。",
      "エ": "全面接着工法によるタイルカーペット敷きにおいて、接着剤を下地面に均一に塗布し、接着剤が乾燥し、十分に粘着性がでた後、隙間なく張り付けた。",
      "オ": "直張り工法でせっこうボードを張付けた後、仕上材に通気性がなかったので、21日間放置し、直張り用接着材が乾燥し、仕上げに支障がないことを確認してから、施工した。"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "公式正答は1。雨掛り部分のアルミ建具枠は、仮留めくさびを撤去してから隙間へモルタルを密実に充填する。くさびを残すと充填不足や漏水原因になる。",
    "choiceExplanations": {
      "ア": "不適当。仮留め用くさびは撤去したうえで躯体と枠との間を密実に充填する。残したままでは欠損や漏水の原因となる。",
      "イ": "適当。外部網入りガラスは下辺及び縦小口の下端から1/4の高さまで防錆処理し、金網の腐食による破損を防ぐ。",
      "ウ": "適当。ガラスブロック表面から10～12 mm控えて目地押えをし、化粧目地モルタルを隙間なく充填して仕上げる。",
      "エ": "適当。タイルカーペットの全面接着では、接着剤を塗布後に適切に乾燥させて粘着性を出してから密着させる。",
      "オ": "適当。非通気性仕上げでは直張り接着材の乾燥に十分な期間を取り、21日放置して乾燥と仕上げへの支障の有無を確認する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 21,
    "sourcePrintedPage": "施工 20",
    "sourceRubies": [
      {
        "base": "錆",
        "reading": "せい"
      }
    ],
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/gobuild/content/001888816.pdf"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q21",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 21,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "住宅設備",
    "topicTags": [
      "住宅設備"
    ],
    "difficulty": 3,
    "question": "住宅における設備工事に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "湿気のある場所に敷設する通信用ケーブル相互の接続箇所には、黒色粘着性ポリエチレン絶縁テープを使用した。",
      "イ": "メタルラス張りの壁に金属製のスイッチボックスを設置するに当たり、スイッチボックスがメタルラスに接しないように木板を用いて絶縁した。",
      "ウ": "手洗器の排水管にPトラップを設け、封水深を40mmとした。",
      "エ": "温水床暖房に用いる埋設方式の放熱管を樹脂管としたので、管の接合は、メカニカル継手とした。",
      "オ": "給湯管は、管の伸縮を妨げないように配管した。"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。排水トラップの封水深は50～100 mmとする。Pトラップの封水深40 mmでは下限に不足する。",
    "choiceExplanations": {
      "ア": "適当。湿気のある場所の通信ケーブル接続部では、所定の黒色粘着性ポリエチレン絶縁テープで絶縁・防湿処理を行う。",
      "イ": "適当。金属ボックスとメタルラスの接触を防ぐ絶縁措置が必要。木板等で隔て、漏電時の危険を抑える。",
      "ウ": "不適当。排水トラップの封水深は50 mm以上100 mm以下。40 mmでは封水保持に必要な深さが不足する。",
      "エ": "適当。温水床暖房の樹脂管の所定の接合にはメカニカル継手を用いる。管種・施工仕様に適合した継手を選ぶ。",
      "オ": "適当。給湯管は温度変化で伸縮するため、支持方法や曲がり部等でその動きを妨げず、配管へ過大な応力を生じさせない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 21,
    "sourcePrintedPage": "施工 20"
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q22",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 22,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "改修",
    "topicTags": [
      "改修"
    ],
    "difficulty": 3,
    "question": "改修工事に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "屋上の防水改修において、既存の露出アスファルト防水層の上に、合成高分子系ルーフィングシートを施工した。",
      "イ": "コンクリート打放し仕上げの外壁改修において、幅1.2mmの挙動のあるひび割れについては、Uカットシール材充塡工法を採用した。",
      "ウ": "軽量鉄骨壁下地におけるそで壁端部の補強は、開口部の垂直方向の補強材と同材を用いて行った。",
      "エ": "せっこうボードを用いた壁面の目地を見せる目透し工法による内装の改修において、テーパー付きせっこうボードを用いた。",
      "オ": "せっこうボード下地に仕上げ用のせっこうボードを張り付けるに当たって、接着剤を主とし、タッカーによるステープルを併用した。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。テーパー付きせっこうボードは目地処理をして平滑に仕上げる用途。目透しでは端部が見えるので、通常はスクエアエッジを用いる。",
    "choiceExplanations": {
      "ア": "適当。既存アスファルト防水の状態を調査し、適切な下地処理・工法を選定したうえで合成高分子系シートを重ねる改修が可能。",
      "イ": "適当。幅1.2 mmで挙動のあるひび割れには、追従性を持つシール材をUカット溝に充填する補修方法が適する。",
      "ウ": "適当。軽量鉄骨のそで壁端部は開口部縦補強材と同材で補強し、端部の変形や仕上げの損傷を防ぐ。",
      "エ": "不適当。目透し仕上げは端部を見せるため通常スクエアエッジを用いる。テーパー付きは継目処理で平滑にする場合の仕様。",
      "オ": "適当。ボード下地への増張りでは接着剤を主とし、タッカーのステープルを併用して接着が安定するまで保持する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 21,
    "sourcePrintedPage": "施工 20"
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q23",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 23,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "施工機械・工法",
    "topicTags": [
      "施工機械・工法"
    ],
    "difficulty": 3,
    "question": "建築工事とそれに用いる工法及び施工機械・器具の組合せとして、最も不適当なものは、次のうちどれか。",
    "choices": {
      "ア": "防水工事／トーチ工法／ガスバーナー",
      "イ": "根切り工事／かま場工法／水中ポンプ",
      "ウ": "タイル工事／密着張り工法／ヴィブラート",
      "エ": "場所打ちコンクリート杭地業工事／リバース工法／トレミー管",
      "オ": "鉄筋工事／ノンスカラップ工法／シヤーカッター"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "公式正答は5。ノンスカラップ工法は鉄骨梁端接合部等の工法で、鉄筋工事の工法ではない。シヤーカッターとの組合せも成立しない。",
    "choiceExplanations": {
      "ア": "適当。トーチ工法はルーフィング裏面をガスバーナーで加熱し、溶融・接着させる防水工法である。",
      "イ": "適当。かま場工法は根切り底の集水部に水を集め、水中ポンプ等で排水する方法である。",
      "ウ": "適当。タイルの密着張りではヴィブラートで振動を与え、タイルとモルタルを十分に密着させる。",
      "エ": "適当。リバース工法の場所打ち杭は、孔内へトレミー管を設置してコンクリートを打ち込む。",
      "オ": "不適当。ノンスカラップは鉄骨工事の接合部に関する工法。鉄筋工事とシヤーカッターの組合せとして掲げるのは誤り。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 22,
    "sourcePrintedPage": "施工 21",
    "imageUrls": [
      "data/qualification-staging/kenchikushi2/assets/kenchikushi2-2025-IV-q23.png"
    ],
    "originalContent": {
      "body": "建築工事とそれに用いる工法及び施工機械・器具の組合せとして、最も不適当なものは、次のうちどれか。",
      "tables": [
        {
          "caption": "建築工事・工法・機械器具（選択肢1～5の順）",
          "rows": [
            [
              "建築工事",
              "工法",
              "施工機械・器具"
            ],
            [
              "防水工事",
              "トーチ工法",
              "ガスバーナー"
            ],
            [
              "根切り工事",
              "かま場工法",
              "水中ポンプ"
            ],
            [
              "タイル工事",
              "密着張り工法",
              "ヴィブラート"
            ],
            [
              "場所打ちコンクリート杭地業工事",
              "リバース工法",
              "トレミー管"
            ],
            [
              "鉄筋工事",
              "ノンスカラップ工法",
              "シヤーカッター"
            ]
          ]
        }
      ]
    },
    "imageAltTexts": [
      "選択肢1～5の順に、防水／トーチ／ガスバーナー、根切り／かま場／水中ポンプ、タイル／密着張り／ヴィブラート、場所打ちコンクリート杭／リバース／トレミー管、鉄筋／ノンスカラップ／シヤーカッター。"
    ]
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q24",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 24,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "建築積算",
    "topicTags": [
      "建築積算"
    ],
    "difficulty": 3,
    "question": "建築積算に関する次の記述のうち、最も不適当なものはどれか。",
    "choices": {
      "ア": "工事費の積算は、建築工事、電気設備工事、機械設備工事及び昇降機設備工事等の工事種別ごとに行う。",
      "イ": "共通仮設費及び現場管理費は、新営工事と改修工事に区分して算定する。",
      "ウ": "現場環境改善費は、共通仮設費率に含まれないため、設計図書等に基づき積み上げにより共通仮設費を算定する。",
      "エ": "直接工事費には、直接仮設の費用は含まれない。",
      "オ": "建設発生土処分費及び発生材処分費を含めて発注する場合は、これらの費用の現場管理費は算定しない。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。直接工事費には直接仮設費を含める。共通仮設費は共通費に属するが、直接仮設と混同しない。",
    "choiceExplanations": {
      "ア": "適当。積算は建築・電気・機械・昇降機等の工事種別ごとに行い、それぞれの数量や単価等から算定する。",
      "イ": "適当。共通仮設費と現場管理費は新営・改修で条件が異なるため、所定の区分と率等を用いて算定する。",
      "ウ": "適当。現場環境改善費は共通仮設費率に含まれないため、設計図書等に基づき必要額を積み上げて共通仮設費に計上する。",
      "エ": "不適当。直接仮設費は各工事に直接必要な仮設として直接工事費に含まれる。共通仮設費との区分を誤っている。",
      "オ": "適当。建設発生土処分費と発生材処分費には現場管理費を算定しない取扱いとし、他の対象額との区分を行う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 22,
    "sourcePrintedPage": "施工 21"
  },
  {
    "id": "kenchikushi2-2025-annual-IV-q25",
    "exam": "kenchikushi2",
    "session": "gakka-IV",
    "year": 2025,
    "season": "annual",
    "qNumber": 25,
    "subject": "学科Ⅳ（建築施工）",
    "type": "multiple-choice",
    "category": "請負契約",
    "topicTags": [
      "請負契約"
    ],
    "difficulty": 3,
    "question": "請負契約に関する次の記述のうち、中央建設業審議会「民間建設工事標準請負契約約款(甲)」(令和4年9月改正)に照らして、最も不適当なものはどれか。",
    "choices": {
      "ア": "発注者は、受注者の求め又は設計図書の作成者の求めにより、設計図書の作成者が行う設計意図を正確に伝えるための質疑応答又は説明の内容を受注者及び監理者に通知する。",
      "イ": "監理者は、設計内容を伝えるため受注者と打ち合わせ、適宜、工事を円滑に遂行するため、必要な時期に説明用図書を受注者に交付する。",
      "ウ": "監理者は、工事が設計図書等のとおりに実施されていないと認めるときは、直ちに受注者に対してその旨を指摘し、工事を設計図書等のとおりに実施するよう求めるとともに発注者に報告する。",
      "エ": "監理者は、設計図書等の定めにより受注者が作成、提出する施工計画について、設計図書等に定められた工期及び品質が確保できないおそれがあると明らかに認められる場合には、発注者に対して助言し、その旨を受注者に報告する。",
      "オ": "監理者は、受注者が契約に定められた指示、検査、試験、立会い、確認、審査、承認、助言、協議等を求めたときは、速やかにこれに応じる。"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "公式正答は4。施工計画で工期・品質の確保に問題が明らかな場合、監理者は受注者へ助言し発注者へ報告する。4は相手を逆にしている。指定は令和4年9月改正約款の第9条第1項第8号（PDF6ページ）。",
    "choiceExplanations": {
      "ア": "適当。発注者は受注者又は設計図書作成者の求めに応じ、設計意図を伝える質疑応答・説明の内容を受注者と監理者へ通知する。",
      "イ": "適当。監理者は受注者と打ち合わせ、工事を円滑に進めるため必要な時期に説明用図書を受注者へ交付する。",
      "ウ": "適当。設計図書等との不一致は直ちに受注者へ指摘して是正を求め、その旨を発注者へ報告する。",
      "エ": "不適当。監理者の助言先は施工計画を作成した受注者、報告先は発注者。選択肢は助言と報告の相手を逆にしている。",
      "オ": "適当。受注者から契約に定める指示・検査・承認・協議等を求められた場合、監理者は速やかに対応する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "needsReview": true,
    "lastUpdated": "2026-11-04",
    "lawReferenceDate": "2025-01-01",
    "publicAllowed": false,
    "license": "JAEIC-owner-provided",
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人建築技術教育普及センター 令和7年二級建築士試験 学科Ⅳ（建築施工）",
    "sourcePage": 23,
    "sourcePrintedPage": "施工 22",
    "officialReferenceUrls": [
      "https://www.mlit.go.jp/tochi_fudousan_kensetsugyo/const/content/001519399.pdf"
    ]
  }
];
