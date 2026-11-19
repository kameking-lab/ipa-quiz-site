import type { Question } from "@/lib/questions/types";

export const KENCHIKUSHI2_2019_GAKKA_III: Question[] = [
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q01",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "断面の図心",
    "topicTags": [
      "構造",
      "断面の図心"
    ],
    "difficulty": 3,
    "question": "断面の図心（公式問題の問1）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "断面を長方形に分け、各部分の面積で図心座標を重み付けする。全断面の図心は x₀=15 mm、y₀=35 mm。",
    "choiceExplanations": {
      "ア": "y₀に上側の部分の断面一次モーメントが反映されていない。",
      "イ": "両軸の断面一次モーメントを全断面積で割った値と一致する。",
      "ウ": "y₀は40 mmではなく35 mm。",
      "エ": "x₀は20 mmではなく15 mm。",
      "オ": "x₀、y₀ともに断面一次モーメントから得られる値と異なる。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q01.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問1の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=2",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q02",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "単純梁の最大曲げ応力度",
    "topicTags": [
      "構造",
      "単純梁の最大曲げ応力度"
    ],
    "difficulty": 3,
    "question": "単純梁の最大曲げ応力度（公式問題の問2）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "集中荷重位置の曲げモーメントは20 kN·m。断面係数100×200²÷6 mm³で割ると30 N/mm²となる。",
    "choiceExplanations": {
      "ア": "M/Zの値と一致する。",
      "イ": "曲げモーメント20 kN·mからは得られない。",
      "ウ": "断面係数を半分にしたときの値で、図の断面と異なる。",
      "エ": "図の荷重位置と支点反力による最大曲げモーメントを超える。",
      "オ": "断面係数と最大曲げモーメントの組合せが異なる。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q02.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問2の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=2",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q03",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "曲げモーメント図と荷重",
    "topicTags": [
      "構造",
      "曲げモーメント図と荷重"
    ],
    "difficulty": 3,
    "question": "曲げモーメント図と荷重（公式問題の問3）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "左端区間と右端区間の曲げモーメント図の傾きから反力は8/3 kN、10/3 kN。合計6 kNがP+2Pに等しいのでP=2 kN。",
    "choiceExplanations": {
      "ア": "合計荷重が3 kNになり、合成反力6 kNと合わない。",
      "イ": "合計荷重3Pが反力の合計6 kNと一致する。",
      "ウ": "合計荷重9 kNではつり合わない。",
      "エ": "合計荷重12 kNではつり合わない。",
      "オ": "合計荷重15 kNではつり合わない。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q03.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問3の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=3",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q04",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "静定ラーメンの反力とせん断力",
    "topicTags": [
      "構造",
      "静定ラーメンの反力とせん断力"
    ],
    "difficulty": 3,
    "question": "静定ラーメンの反力とせん断力（公式問題の問4）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "水平力によるモーメント60×6を支点間距離8 mで割る。Aは下向き、Bは上向きに45 kNで、Cのせん断力の絶対値は45 kN。",
    "choiceExplanations": {
      "ア": "反力は合うが、Cのせん断力が0ではない。",
      "イ": "反力の符号とCのせん断力が一致する。",
      "ウ": "反力の符号が逆で、せん断力も異なる。",
      "エ": "Cのせん断力は合うが、反力の符号が逆。",
      "オ": "鉛直荷重がないので鉛直反力の和は0となる。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q04.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問4の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=4",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q05",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "静定トラスの零部材",
    "topicTags": [
      "構造",
      "静定トラスの零部材"
    ],
    "difficulty": 3,
    "question": "静定トラスの零部材（公式問題の問5）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "自由端側から節点ごとに鉛直・水平成分をつり合わせると、軸方向力が0の部材はAに3本、Bに1本、Cに2本ある。",
    "choiceExplanations": {
      "ア": "AとBの本数が逆方向にずれている。",
      "イ": "Bには零部材が1本ある。",
      "ウ": "Bは一致するが、AとCを1本ずつ少なく数えている。",
      "エ": "三つのトラスの本数と一致する。",
      "オ": "Bを1本多く数えている。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q05.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問5の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=5",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q06",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "柱の座屈長さ",
    "topicTags": [
      "構造",
      "柱の座屈長さ"
    ],
    "difficulty": 3,
    "question": "柱の座屈長さ（公式問題の問6）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "両端ピン、ピン・固定、途中に水平支持のある両端ピンについて、支持条件に応じた有効長さを比較するとA、B、Cの順。",
    "choiceExplanations": {
      "ア": "図の柱長さを支持条件で補正した順序と一致する。",
      "イ": "AとBは同じ座屈長さにならない。",
      "ウ": "BよりAの座屈長さが大きい。",
      "エ": "Aが最小になる組合せではない。",
      "オ": "中央の拘束を持つCはBより短い。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q06.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問6の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=5",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q07",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "地上部分の地震力",
    "topicTags": [
      "構造",
      "地上部分の地震力"
    ],
    "difficulty": 3,
    "question": "地上部分の地震力（公式問題の問7）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "地表面粗度区分は風速の高さ方向の分布に関係する。地震力では重さや振動特性、地盤条件を確認する。",
    "choiceExplanations": {
      "ア": "高さは建築物の固有周期などに関わる。",
      "イ": "積載荷重は地震時に考慮する重量に関わる。",
      "ウ": "構造種別は振動特性に関わる。",
      "エ": "地盤周期は地盤と建物の応答に関わる。",
      "オ": "地表面粗度区分は主に風圧力の指標。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q07.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問7の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=6",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q08",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "積雪荷重と風圧力",
    "topicTags": [
      "構造",
      "積雪荷重と風圧力"
    ],
    "difficulty": 3,
    "question": "積雪荷重と風圧力（公式問題の問8）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "公式正答は3。多雪区域の積雪荷重を組み合わせる場合は、長期計算用と地震時用で係数を区別する。",
    "choiceExplanations": {
      "ア": "倉庫業を営む倉庫の積載荷重の下限の扱い。",
      "イ": "吹きだまり等により積雪が偏る場合を考慮する。",
      "ウ": "地震時の算定に0.7を使うとした点が不適当。",
      "エ": "構造体と外装材の風圧力は算定を区別する。",
      "オ": "風上側の開口から入る圧力は内圧を高める。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q08.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問8の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=6",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q09",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "地盤と基礎の用語",
    "topicTags": [
      "構造",
      "地盤と基礎の用語"
    ],
    "difficulty": 3,
    "question": "地盤と基礎の用語（公式問題の問9）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "砂質地盤で上向きの浸透流により砂粒が噴き上がる現象はボイリング。ヒービングは掘削底などの地盤の盛り上がりをいう。",
    "choiceExplanations": {
      "ア": "地盤が杭に対して沈下すると下向きの摩擦が生じる。",
      "イ": "砂粒が水とともに噴き上がる説明はボイリング。",
      "ウ": "排水を伴う粘性土の体積減少が圧密。",
      "エ": "有効応力が落ち、せん断抵抗が失われる現象。",
      "オ": "基礎底から地盤へ荷重を伝える形式。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q09.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問9の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=6",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q10",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "木造の開口部材",
    "topicTags": [
      "構造",
      "木造の開口部材"
    ],
    "difficulty": 3,
    "question": "木造の開口部材（公式問題の問10）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "まぐさは開口上部を支える水平材。襖や障子の上端を案内する溝がある水平材は鴨居。",
    "choiceExplanations": {
      "ア": "妻側の斜めの板材を破風板という。",
      "イ": "溝を設けない鴨居状・敷居状の材が無目。",
      "ウ": "振れ隅木では平面上の角度が45度とならない。",
      "エ": "説明は鴨居に対応する。",
      "オ": "床縁を納める化粧材が上がり框。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q10.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問10の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=7",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q11",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "木質構造のボルト接合",
    "topicTags": [
      "構造",
      "木質構造のボルト接合"
    ],
    "difficulty": 3,
    "question": "木質構造のボルト接合（公式問題の問11）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "ボルトの間隔は繊維方向に対する荷重方向に応じて取る。割裂などの破壊を防ぐため、加力方向を無視できない。",
    "choiceExplanations": {
      "ア": "接合部の降伏に先立つ木材の脆性破壊を避ける。",
      "イ": "釘頭のめり込みは合板の抵抗と変形性能を下げる。",
      "ウ": "ドリフトピン接合では降伏後の耐力上昇を見込みにくい。",
      "エ": "加力方向の違いを考慮して間隔を決める。",
      "オ": "ねじ部は釘に比べて変形性が小さい。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q11.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問11の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=7",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q12",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "木材の曲げと横座屈",
    "topicTags": [
      "構造",
      "木材の曲げと横座屈"
    ],
    "difficulty": 3,
    "question": "木材の曲げと横座屈（公式問題の問12）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "幅が狭く、せいが大きい曲げ材では横方向への変形やねじりが起きやすい。材幅が大きいほど横座屈しやすいという記述は逆。",
    "choiceExplanations": {
      "ア": "材せいに比べて幅が小さい断面で横座屈に注意する。",
      "イ": "引張側の切欠きは応力集中を招くため深さに制限を設ける。",
      "ウ": "継手の変形と偏心による二次応力も考慮する。",
      "エ": "継手は応力の小さい位置が望ましい。",
      "オ": "水平構面の剛性は力の伝達に関わる。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q12.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問12の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=7",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q13",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "壁式鉄筋コンクリート造の耐力壁",
    "topicTags": [
      "構造",
      "壁式鉄筋コンクリート造の耐力壁"
    ],
    "difficulty": 3,
    "question": "壁式鉄筋コンクリート造の耐力壁（公式問題の問13）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "壁量に算入する壁には長さだけでなく高さに対する長さの要件もある。高さ200 cmに対して長さ45 cmの壁を算入する扱いが不適当。",
    "choiceExplanations": {
      "ア": "18 N/mm²はこの設問の設計基準強度として適合する。",
      "イ": "階高3 mで壁厚15 cmとする組合せ。",
      "ウ": "長さ45 cmはこの高さに対して不足する。",
      "エ": "基礎梁の部材どうしを緊結し一体化する。",
      "オ": "構造計算で安全を確認したケースとして扱う。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q13.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問13の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=8",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q14",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "鉄筋の定着と付着",
    "topicTags": [
      "構造",
      "鉄筋の定着と付着"
    ],
    "difficulty": 3,
    "question": "鉄筋の定着と付着（公式問題の問14）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "梁主筋と梁のコンクリートの間の力の伝達が付着。主筋端部が柱から引き抜けないようにするのが定着。",
    "choiceExplanations": {
      "ア": "軸圧縮力が大きいほど柱の変形能力は下がりやすい。",
      "イ": "両側のスラブの有効幅を考慮して梁剛性を評価する。",
      "ウ": "付着と定着の用語が入れ替わっている。",
      "エ": "たわみや振動を確認する場合を除いた梁せいの扱い。",
      "オ": "曲げ引張側のコンクリートは断面算定で一般に無視する。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q14.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問14の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=8",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q15",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "柱梁接合部の帯筋",
    "topicTags": [
      "構造",
      "柱梁接合部の帯筋"
    ],
    "difficulty": 3,
    "question": "柱梁接合部の帯筋（公式問題の問15）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "柱梁接合部内の帯筋は、柱の隣接部分との間隔の関係だけでなく、接合部に適用される間隔の上限も満たす必要がある。",
    "choiceExplanations": {
      "ア": "この設問では上限を200 mmとした記述が不適当。",
      "イ": "短辺方向に主な曲げが生じるので鉄筋量が多い。",
      "ウ": "太径鉄筋は重ね継手を原則避ける。",
      "エ": "圧縮側にも鉄筋を入れ、たわみの抑制や靱性の確保を図る。",
      "オ": "大きな径差がある鉄筋のガス圧接は原則避ける。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q15.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問15の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=8",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q16",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "鉄骨部材の局部座屈",
    "topicTags": [
      "構造",
      "鉄骨部材の局部座屈"
    ],
    "difficulty": 3,
    "question": "鉄骨部材の局部座屈（公式問題の問16）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "板が幅に比べて薄いほど局部座屈しやすい。幅厚比や径厚比が大きいと座屈しにくいという説明は逆。",
    "choiceExplanations": {
      "ア": "根巻き部は柱脚の応力を伝達できる高さとする。",
      "イ": "引張側のボルト孔を控除した断面を用いる。",
      "ウ": "細長比の制限は圧縮材の全体座屈を抑える。",
      "エ": "幅厚比・径厚比が大きいほど薄肉で局部座屈しやすい。",
      "オ": "集中荷重付近はスチフナとウェブ有効幅を圧縮材として扱う。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q16.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問16の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=9",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q17",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "鉄骨接合と隅肉溶接",
    "topicTags": [
      "構造",
      "鉄骨接合と隅肉溶接"
    ],
    "difficulty": 3,
    "question": "鉄骨接合と隅肉溶接（公式問題の問17）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "等脚の隅肉溶接ののど厚は、直角二等辺三角形の斜辺までの高さに相当する。一般に隅肉サイズの約0.707倍。",
    "choiceExplanations": {
      "ア": "小さな応力でも継手の設計用曲げには下限がある。",
      "イ": "高力ボルトを先に施工するときに併用耐力を考慮できる。",
      "ウ": "隅肉溶接を角で回し、終端を処理する。",
      "エ": "のど厚は一般にサイズの1/2ではない。",
      "オ": "浮き錆を除いた赤錆面を摩擦面として扱う。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q17.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問17の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=9",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q18",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "木造の火打材と構造計画",
    "topicTags": [
      "構造",
      "木造の火打材と構造計画"
    ],
    "difficulty": 3,
    "question": "木造の火打材と構造計画（公式問題の問18）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "ウ",
    "officialAnswerNumber": "3",
    "explanation": "火打材は床組・小屋梁組の平面内の変形を抑え、水平力の伝達を助ける。鉛直荷重による曲げたわみの抑制を目的とする記述が不適当。",
    "choiceExplanations": {
      "ア": "小梁の曲げ剛性を確保してスラブの損傷を抑える。",
      "イ": "ピロティ階の曲げ降伏を計画し、床構面も強化する。",
      "ウ": "火打材の主な目的は平面内の変形防止。",
      "エ": "耐力壁より先に接合部が破壊しないことを確かめる。",
      "オ": "筋かい接合部の破断に先立って軸部が降伏するようにする。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q18.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問18の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=10",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q19",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "耐震設計の剛性率",
    "topicTags": [
      "構造",
      "耐震設計の剛性率"
    ],
    "difficulty": 3,
    "question": "耐震設計の剛性率（公式問題の問19）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "剛性率が小さい階は他の階に比べて変形しやすく、損傷が集中しやすい。大きいほど損傷しやすいとする点が誤り。",
    "choiceExplanations": {
      "ア": "強度を確保する方法と変形能力を高める方法がある。",
      "イ": "稀な大地震時の倒壊防止は耐震設計の目標。",
      "ウ": "剛性が一定なら質量が大きいほど固有周期は長い。",
      "エ": "偏心率が大きいほどねじれや損傷の片寄りに注意する。",
      "オ": "剛性率が小さい階で変形が集中しやすい。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q19.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問19の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=10",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q20",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "木材の木裏と木表",
    "topicTags": [
      "構造",
      "木材の木裏と木表"
    ],
    "difficulty": 3,
    "question": "木材の木裏と木表（公式問題の問20）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "板の樹皮側は木表、樹心側は木裏と呼ぶ。木裏を樹皮側とした説明が誤り。",
    "choiceExplanations": {
      "ア": "樹皮側は木表。",
      "イ": "木目が材の端や側面で途切れる状態が目切れ。",
      "ウ": "樹皮側の丸みが残る状態が丸身。",
      "エ": "死節の周囲では組織の連続性がない。",
      "オ": "辺材は幹の外側の部分。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q20.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問20の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=11",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q21",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "コンクリートの各種強度",
    "topicTags": [
      "構造",
      "コンクリートの各種強度"
    ],
    "difficulty": 3,
    "question": "コンクリートの各種強度（公式問題の問21）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "イ",
    "officialAnswerNumber": "2",
    "explanation": "品質基準強度は設計基準強度と耐久設計基準強度を比較して設定する。設計基準強度が品質基準強度より大きいという記述が不適当。",
    "choiceExplanations": {
      "ア": "調合強度はばらつきなどを見込んで高めに設定する。",
      "イ": "設計基準強度は品質基準強度を超えない。",
      "ウ": "長期の計画供用期間では耐久性により配慮する。",
      "エ": "圧縮強度が高いほどヤング係数も一般に大きい。",
      "オ": "コンクリートは曲げより圧縮に強い。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q21.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問21の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=11",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q22",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "コンクリートの細骨材率",
    "topicTags": [
      "構造",
      "コンクリートの細骨材率"
    ],
    "difficulty": 3,
    "question": "コンクリートの細骨材率（公式問題の問22）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "細骨材率は全骨材の絶対容積に占める細骨材の絶対容積の比。表から290÷(290+390)×100で約42.6％となる。",
    "choiceExplanations": {
      "ア": "表乾の質量を絶対容積で割る。",
      "イ": "単位水量180をセメント質量300で割る。",
      "ウ": "1 m³から材料の絶対容積の合計を引いた分が空気量。",
      "エ": "全材料の質量を合計した値。",
      "オ": "質量比ではなく絶対容積比を用いる。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q22.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問22の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=12",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q23",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "鋼材の比重と弾性",
    "topicTags": [
      "構造",
      "鋼材の比重と弾性"
    ],
    "difficulty": 3,
    "question": "鋼材の比重と弾性（公式問題の問23）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "ア",
    "officialAnswerNumber": "1",
    "explanation": "鋼材の密度はおよそ7.85 g/cm³、アルミニウム材はおよそ2.7 g/cm³。比は約3であり、1.5ではない。",
    "choiceExplanations": {
      "ア": "比重の比を小さく見積もっている。",
      "イ": "応力をヤング係数で割って得るひずみを材長に掛けると約5 mm。",
      "ウ": "黒皮は熱間圧延で生じる酸化皮膜。",
      "エ": "SD345の数字が降伏点の下限を表す。",
      "オ": "鋼種による強度の違いとヤング係数の扱いを区別する。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q23.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問23の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=12",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q24",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "建築用の高分子材料",
    "topicTags": [
      "構造",
      "建築用の高分子材料"
    ],
    "difficulty": 3,
    "question": "建築用の高分子材料（公式問題の問24）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "エ",
    "officialAnswerNumber": "4",
    "explanation": "押出法ポリスチレンフォームの主な利点は断熱性。耐火性が高いことを採用理由とする記述が不適当。",
    "choiceExplanations": {
      "ア": "積層ゴムは鉛直荷重を支えながら水平に変形する。",
      "イ": "硬質塩化ビニルは配管・雨樋の材料に用いられる。",
      "ウ": "接着性と収縮の小ささをひび割れ補修に生かす。",
      "エ": "断熱材の性能と耐火性能を混同している。",
      "オ": "微量の水分によって速く硬化する接着剤。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q24.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問24の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=13",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "kenchikushi2-2019-annual-gakka-III-q25",
    "exam": "kenchikushi2",
    "year": 2019,
    "season": "annual",
    "session": "gakka-III",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "建築材料とガラス",
    "topicTags": [
      "構造",
      "建築材料とガラス"
    ],
    "difficulty": 3,
    "question": "建築材料とガラス（公式問題の問25）",
    "choices": {
      "ア": "原本の選択肢 1",
      "イ": "原本の選択肢 2",
      "ウ": "原本の選択肢 3",
      "エ": "原本の選択肢 4",
      "オ": "原本の選択肢 5"
    },
    "answer": "オ",
    "officialAnswerNumber": "5",
    "explanation": "合わせガラスはガラスの間に中間膜を挟む。中空層に面した低放射膜で断熱性を高める説明はLow-E複層ガラスに対応する。",
    "choiceExplanations": {
      "ア": "異種金属の接触では鋼側の腐食に注意する。",
      "イ": "ALCは独立気泡が多く断熱性のある材料。",
      "ウ": "せっこうボードは耐火性を生かす一方、水や衝撃に注意する。",
      "エ": "しっくいは空気に接して硬化する。",
      "オ": "合わせガラスとLow-E複層ガラスを取り違えている。"
    },
    "hasImage": true,
    "imageUrls": [
      "/questions/kenchikushi2/2019-annual-gakka-III/q25.webp"
    ],
    "imageAltTexts": [
      "公式問題の構造 問25の本文・図表・選択肢"
    ],
    "sourcePdfUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gakka3_4.pdf#page=13",
    "sourceAnswerUrl": "https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2019-1st-gokakukijun.pdf",
    "sourceAttribution": "出典：公益財団法人 建築技術教育普及センター 令和元年二級建築士試験 学科（建築構造）。",
    "license": "JAEIC-owner-approved-staging",
    "lastUpdated": "2026-11-19"
  }
];
