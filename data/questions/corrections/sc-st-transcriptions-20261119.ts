import type { Question } from "@/lib/questions/types";

type Transcription = Partial<Pick<Question,
  "question" | "choices" | "explanation" | "hasImage" | "imageUrls" |
  "choiceImageUrls" | "sourceAnswerUrl" | "lastUpdated"
>>;

// 問題冊子に照合した図表と転記の復元。
export const SC_ST_TRANSCRIPTIONS: Record<string, Transcription> = {
  "sc-2009h-am1-q1": {
    "question": "(1＋α)ⁿの計算を、1＋n×αで近似計算ができる条件として、適切なものはどれか。",
    "choices": {
      "ア": "|α|が1に比べて非常に小さい。",
      "イ": "|α|がnに比べて非常に大きい。",
      "ウ": "|α÷n|が1よりも大きい。",
      "エ": "|n×α|が1よりも大きい。"
    },
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000009bhl-att/2009h21h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2009a-am1-q3": {
    "question": "n個の要素x₁、x₂、…、xₙから成る連結リストに対して、新たな要素xₙ₊₁の末尾への追加に要する時間をf(n)とし、末尾の要素xₙの削除に要する時間をg(n)とする。nが非常に大きいとき、実装方法1と実装方法2におけるg(n)／f(n)の挙動として、適切なものはどれか。",
    "imageUrls": [
      "/questions/ipa-20261119/sc-2009a-am1-q3.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f3yi-att/2009h21a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2009a-am1-q8": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2009a-am1-q8.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f3yi-att/2009h21a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2009a-am1-q13": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2009a-am1-q13.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f3yi-att/2009h21a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2010h-am2-q18": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2010h-am2-q18.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000004n2z-att/2010h22h_sc_am2_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2011a-am2-q10": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2011a-am2-q10.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000003ojp-att/2011h23a_sc_am2_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2012h-am1-q7": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2012h-am1-q7.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000038er-att/2012h24h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2013h-am2-q4": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2013h-am2-q4.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002e6g-att/2013h25h_sc_am2_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2013a-am1-q3": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2013a-am1-q3.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2013a-am1-q6": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2013a-am1-q6.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2013a-am1-q16": {
    "question": "E-R図の解釈として、適切なものはどれか。ここで、両端に「＊」の付いた線は多対多の関連を表し、自己参照は除くものとする。",
    "imageUrls": [
      "/questions/ipa-20261119/sc-2013a-am1-q16.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2013a-am1-q17": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2013a-am1-q17.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2013a-am1-q18": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2013a-am1-q18.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2013a-am2-q23": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2013a-am2-q23.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_sc_am2_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2014h-am1-q2": {
    "question": "表は、入力記号の集合が{0, 1}、状態集合が{a, b, c, d}である有限オートマトンの状態遷移表である。長さ3以上の任意のビット列を左（上位ビット）から順に読み込んで最後が110で終わっているものを受理するには、どの状態を受理状態とすればよいか。\n\n| 現在の状態 | 入力0 | 入力1 |\n|---|---|---|\n| a | a | b |\n| b | c | d |\n| c | a | b |\n| d | c | d |",
    "hasImage": false,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000001dzu-att/2014h26h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2014h-am1-q4": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2014h-am1-q4.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000001dzu-att/2014h26h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2014h-am1-q7": {
    "question": "NAND素子を用いた次の組合せ回路の出力Zを表す式はどれか。ここで、論理式中の「・」は論理積、「＋」は論理和、「¬」は否定を表す。",
    "choices": {
      "ア": "X・Y",
      "イ": "X＋Y",
      "ウ": "¬(X・Y)",
      "エ": "¬(X＋Y)"
    },
    "imageUrls": [
      "/questions/ipa-20261119/sc-2014h-am1-q7.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000001dzu-att/2014h26h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2014h-am1-q8": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2014h-am1-q8.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000001dzu-att/2014h26h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2014h-am1-q9": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2014h-am1-q9.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000001dzu-att/2014h26h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2014a-am1-q3": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2014a-am1-q3.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2014a-am1-q7": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2014a-am1-q7.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2015h-am1-q7": {
    "choices": {
      "ア": "各入力の組のANDを取り、その3出力をORでまとめる。",
      "イ": "各入力の組のXORを取り、その3出力をORでまとめる。",
      "ウ": "各入力の組のORを取り、その3出力のANDを反転する。",
      "エ": "各入力の組のXORを取り、その3出力のANDを反転する。"
    },
    "imageUrls": [
      "/questions/ipa-20261119/sc-2015h-am1-q7.png"
    ],
    "hasImage": true,
    "choiceImageUrls": {
      "ア": "/questions/ipa-20261119/sc-2015h-am1-q7-1.png",
      "イ": "/questions/ipa-20261119/sc-2015h-am1-q7-2.png",
      "ウ": "/questions/ipa-20261119/sc-2015h-am1-q7-3.png",
      "エ": "/questions/ipa-20261119/sc-2015h-am1-q7-4.png"
    },
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000f52-att/2015h27h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2015h-am1-q14": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2015h-am1-q14.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000f52-att/2015h27h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2015h-am1-q18": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2015h-am1-q18.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000f52-att/2015h27h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2015a-am1-q3": {
    "choices": {
      "ア": "aとi",
      "イ": "bとr",
      "ウ": "cとl",
      "エ": "dとx"
    },
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2015a-am1-q7": {
    "choices": {
      "ア": "1／2⁴",
      "イ": "1／2⁶",
      "ウ": "1／2⁸",
      "エ": "1／2¹⁰"
    },
    "imageUrls": [
      "/questions/ipa-20261119/sc-2015a-am1-q7.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2015a-am1-q10": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2015a-am1-q10.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2015a-am1-q11": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2015a-am1-q11.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2015a-am1-q19": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2015a-am1-q19.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2015a-am1-q29": {
    "question": "経営会議で来期の景気動向を議論したところ、景気は悪化する、横ばいである、好転するという三つの意見に完全に分かれてしまった。来期の投資計画について、積極的投資、継続的投資、消極的投資のいずれかに決定しなければならない。表の予想利益については意見が一致した。意思決定に関する記述のうち、適切なものはどれか。\n\n予想利益（万円）\n\n| 投資計画 ＼ 景気動向 | 悪化 | 横ばい | 好転 |\n|---|---:|---:|---:|\n| 積極的投資 | 50 | 150 | 500 |\n| 継続的投資 | 100 | 200 | 300 |\n| 消極的投資 | 400 | 250 | 200 |",
    "hasImage": false,
    "explanation": "マクシミン原理で各投資案を単独で比べると、最小利益は積極的投資50万円、継続的投資100万円、消極的投資200万円です。最小利益が最大の消極的投資を選ぶエが公式正答です。なお、投資案を確率的に選んで最悪時の期待利益を最大化する設定では、積極的投資12.5％と消極的投資87.5％を組み合わせるアも成立します。",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2016h-am1-q3": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2016h-am1-q3.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gn5o-att/2016h28h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2016a-am1-q1": {
    "question": "0≦x≦1の範囲で単調に増加する連続関数f(x)がf(0)＜0≦f(1)を満たすときに、区間内でf(x)＝0であるxの値を近似的に求めるアルゴリズムにおいて、(2)は何回実行されるか。\n\n【アルゴリズム】\n\n1. x₀←0、x₁←1とする。\n2. x←(x₀＋x₁)÷2とする。\n3. x₁−x＜0.001ならばxの値を近似値として終了する。\n4. f(x)≧0ならばx₁←xとして、そうでなければx₀←xとする。\n5. (2)に戻る。",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2016a-am1-q2": {
    "question": "表は、入力記号の集合が{0, 1}、状態集合が{a, b, c, d}である有限オートマトンの状態遷移表である。長さ3以上の任意のビット列を左（上位ビット）から順に読み込んで最後が110で終わっているものを受理するには、どの状態を受理状態とすればよいか。\n\n| 現在の状態 | 入力0 | 入力1 |\n|---|---|---|\n| a | a | b |\n| b | c | d |\n| c | a | b |\n| d | c | d |",
    "hasImage": false,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2016a-am1-q10": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2016a-am1-q10.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2016a-am1-q19": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2016a-am1-q19.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2016a-am1-q20": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2016a-am1-q20.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2016a-am1-q28": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2016a-am1-q28.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2016a-am1-q29": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2016a-am1-q29.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2017h-am1-q1": {
    "question": "(1＋α)ⁿの計算を、1＋n×αで近似計算ができる条件として、適切なものはどれか。",
    "choices": {
      "ア": "|α|が1に比べて非常に小さい。",
      "イ": "|α|がnに比べて非常に大きい。",
      "ウ": "|α÷n|が1よりも大きい。",
      "エ": "|n×α|が1よりも大きい。"
    },
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2017h-am1-q3": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2017h-am1-q3.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2017h-am1-q6": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2017h-am1-q6.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2017h-am1-q7": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2017h-am1-q7.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2017h-am1-q8": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2017h-am1-q8.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2017h-am1-q18": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2017h-am1-q18.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2018h-am1-q5": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2018h-am1-q5.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2018h-am1-q7": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2018h-am1-q7.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2018h-am1-q8": {
    "choices": {
      "ア": "Aの子はB、C1、D。リーフはB、C1、C2、Dの順に相互につながる。",
      "イ": "Aの子はB、C1、C2、D。リーフはB、C1、C2、Dの順に相互につながる。",
      "ウ": "Aの子はB、C1、D、C2。リーフはB、C1、D、C2の順に相互につながる。",
      "エ": "Aの子はB、C1、D。B、C1、Dが順に相互につながり、C1とC2も相互につながる。"
    },
    "imageUrls": [
      "/questions/ipa-20261119/sc-2018h-am1-q8.png"
    ],
    "hasImage": true,
    "choiceImageUrls": {
      "ア": "/questions/ipa-20261119/sc-2018h-am1-q8-1.png",
      "イ": "/questions/ipa-20261119/sc-2018h-am1-q8-2.png",
      "ウ": "/questions/ipa-20261119/sc-2018h-am1-q8-3.png",
      "エ": "/questions/ipa-20261119/sc-2018h-am1-q8-4.png"
    },
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2018h-am1-q28": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2018h-am1-q28.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2018a-am1-q3": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2018a-am1-q3.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2018a-am1-q20": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2018a-am1-q20.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2018a-am1-q28": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2018a-am1-q28.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2018a-am2-q10": {
    "question": "JIS X 9401:2016（情報技術―クラウドコンピューティング―概要及び用語）の定義によるクラウドサービス区分の一つであり、クラウドサービスカスタマの責任者が表中の項番1と2の責務を負い、クラウドサービスプロバイダが項番3～5の責務を負うものはどれか。",
    "imageUrls": [
      "/questions/ipa-20261119/sc-2018a-am2-q10.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sc_am2_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2018a-am2-q18": {
    "choices": {
      "ア": "要求元→要求先：SYN／要求先→要求元：SYN＋ACK／要求元→要求先：ACK",
      "イ": "要求元→要求先：SYN／要求先→要求元：ACK、SYN／要求元→要求先：ACK、SYN／要求先→要求元：ACK",
      "ウ": "要求元→要求先：SYN、SYN、SYN／要求先→要求元：ACK",
      "エ": "要求元→要求先：SYN／要求先→要求元：ACK、の順序で3回繰り返す。"
    },
    "choiceImageUrls": {
      "ア": "/questions/ipa-20261119/sc-2018a-am2-q18-1.png",
      "イ": "/questions/ipa-20261119/sc-2018a-am2-q18-2.png",
      "ウ": "/questions/ipa-20261119/sc-2018a-am2-q18-3.png",
      "エ": "/questions/ipa-20261119/sc-2018a-am2-q18-4.png"
    },
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sc_am2_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2018a-am2-q25": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2018a-am2-q25.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_sc_am2_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2010a-am1-q8": {
    "choices": {
      "ア": "論理和（OR）回路",
      "イ": "論理積（AND）回路",
      "ウ": "排他的論理和（XOR）回路",
      "エ": "否定論理和（NOR）回路"
    },
    "imageUrls": [
      "/questions/ipa-20261119/sc-2010a-am1-q8.png"
    ],
    "hasImage": true,
    "choiceImageUrls": {
      "ア": "/questions/ipa-20261119/sc-2010a-am1-q8-1.png",
      "イ": "/questions/ipa-20261119/sc-2010a-am1-q8-2.png",
      "ウ": "/questions/ipa-20261119/sc-2010a-am1-q8-3.png",
      "エ": "/questions/ipa-20261119/sc-2010a-am1-q8-4.png"
    },
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000004d6f-att/2010h22a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2010a-am1-q12": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2010a-am1-q12.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000004d6f-att/2010h22a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2010a-am1-q19": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2010a-am1-q19.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000004d6f-att/2010h22a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "st-2011a-am1-q29": {
    "question": "経営会議で来期の景気動向を議論したところ、景気は悪化する、横ばいである、好転するという三つの意見に完全に分かれてしまった。来期の投資計画について、積極的投資、継続的投資、消極的投資のいずれかに決定しなければならない。表の予想利益については意見が一致した。意思決定に関する記述のうち、適切なものはどれか。\n\n予想利益（万円）\n\n| 投資計画 ＼ 景気動向 | 悪化 | 横ばい | 好転 |\n|---|---:|---:|---:|\n| 積極的投資 | 50 | 150 | 500 |\n| 継続的投資 | 100 | 200 | 300 |\n| 消極的投資 | 400 | 250 | 200 |",
    "hasImage": false,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000003ojp-att/2011h23a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2011a-am1-q8": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2011a-am1-q8.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000003ojp-att/2011h23a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2011a-am1-q10": {
    "question": "価格設定年月日にNULLを含む“商品”表に対して、次の問合せを行った。この検索結果の行数は幾つか。\n\n```sql\nSELECT 商品コード FROM 商品 WHERE 価格設定年月日<'2011-12-01'\n```\n\n| 商品コード | 商品名 | 価格 | 価格設定年月日 |\n|---|---|---:|---|\n| S001 | ボールペン | 150 | 2009-12-31 |\n| S002 | 消しゴム | 80 | 2008-03-31 |\n| S003 | 蛍光ペン | 0 | NULL |\n| S004 | 定規 | 300 | 2011-12-01 |",
    "hasImage": false,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000003ojp-att/2011h23a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2011a-am1-q25": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2011a-am1-q25.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000003ojp-att/2011h23a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2011a-am1-q29": {
    "question": "経営会議で来期の景気動向を議論したところ、景気は悪化する、横ばいである、好転するという三つの意見に完全に分かれてしまった。来期の投資計画について、積極的投資、継続的投資、消極的投資のいずれかに決定しなければならない。表の予想利益については意見が一致した。意思決定に関する記述のうち、適切なものはどれか。\n\n予想利益（万円）\n\n| 投資計画 ＼ 景気動向 | 悪化 | 横ばい | 好転 |\n|---|---:|---:|---:|\n| 積極的投資 | 50 | 150 | 500 |\n| 継続的投資 | 100 | 200 | 300 |\n| 消極的投資 | 400 | 250 | 200 |",
    "hasImage": false,
    "explanation": "マクシミン原理で各投資案を単独で比べると、最小利益は積極的投資50万円、継続的投資100万円、消極的投資200万円です。最小利益が最大の消極的投資を選ぶエが公式正答です。なお、投資案を確率的に選んで最悪時の期待利益を最大化する設定では、積極的投資12.5％と消極的投資87.5％を組み合わせるアも成立します。",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000003ojp-att/2011h23a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2012a-am1-q1": {
    "question": "全体集合S内に異なる部分集合AとBがあるとき、(¬A)∩(¬B)に等しいものはどれか。ここで、A∪BはAとBの和集合、A∩BはAとBの積集合、¬AはSにおけるAの補集合、A−BはAからBを除いた差集合を表す。",
    "choices": {
      "ア": "(¬A)−B",
      "イ": "((¬A)∪(¬B))−(A∩B)",
      "ウ": "(S−A)∪(S−B)",
      "エ": "S−(A∩B)"
    },
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "st-2013h-am1-q29": {
    "question": "経営会議で来期の景気動向を議論したところ、景気は悪化する、横ばいである、好転するという三つの意見に完全に分かれてしまった。来期の投資計画について、積極的投資、継続的投資、消極的投資のいずれかに決定しなければならない。表の予想利益については意見が一致した。意思決定に関する記述のうち、適切なものはどれか。\n\n予想利益（万円）\n\n| 投資計画 ＼ 景気動向 | 悪化 | 横ばい | 好転 |\n|---|---:|---:|---:|\n| 積極的投資 | 50 | 150 | 500 |\n| 継続的投資 | 100 | 200 | 300 |\n| 消極的投資 | 400 | 250 | 200 |",
    "hasImage": false,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002e6g-att/2013h25h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2013h-am1-q3": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2013h-am1-q3.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002e6g-att/2013h25h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2013h-am1-q7": {
    "question": "メインプログラムを実行した後、メインプログラムの変数X、Yの値は幾つになるか。ここで、仮引数Xは値呼出し（call by value）、仮引数Yは参照呼出し（call by reference）であるとする。\n\nメインプログラム\n\n```text\nX=2;\nY=2;\nadd(X,Y);\n```\n\n手続 add(X,Y)\n\n```text\nX=X+Y;\nY=X+Y;\nreturn;\n```",
    "choices": {
      "ア": "X＝2、Y＝4",
      "イ": "X＝2、Y＝6",
      "ウ": "X＝4、Y＝2",
      "エ": "X＝4、Y＝6"
    },
    "hasImage": false,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002e6g-att/2013h25h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2013h-am1-q23": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2013h-am1-q23.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002e6g-att/2013h25h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2013h-am1-q29": {
    "question": "経営会議で来期の景気動向を議論したところ、景気は悪化する、横ばいである、好転するという三つの意見に完全に分かれてしまった。来期の投資計画について、積極的投資、継続的投資、消極的投資のいずれかに決定しなければならない。表の予想利益については意見が一致した。意思決定に関する記述のうち、適切なものはどれか。\n\n予想利益（万円）\n\n| 投資計画 ＼ 景気動向 | 悪化 | 横ばい | 好転 |\n|---|---:|---:|---:|\n| 積極的投資 | 50 | 150 | 500 |\n| 継続的投資 | 100 | 200 | 300 |\n| 消極的投資 | 400 | 250 | 200 |",
    "hasImage": false,
    "explanation": "マクシミン原理で各投資案を単独で比べると、最小利益は積極的投資50万円、継続的投資100万円、消極的投資200万円です。最小利益が最大の消極的投資を選ぶエが公式正答です。なお、投資案を確率的に選んで最悪時の期待利益を最大化する設定では、積極的投資12.5％と消極的投資87.5％を組み合わせるアも成立します。",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002e6g-att/2013h25h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2014a-am2-q21": {
    "question": "トランザクションA～Dに関する待ちグラフのうち、デッドロックが発生しているものはどれか。ここで、待ちグラフの矢印は、X→Yのとき、トランザクションXはトランザクションYがロックしている資源のアンロックを待っていることを表す。",
    "choices": {
      "ア": "B→A、C→B、D→A、D→C",
      "イ": "A→C、A→D、B→A、C→B、C→D",
      "ウ": "A→B、A→C、A→D",
      "エ": "A→C、B→C、D→C"
    },
    "hasImage": false,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_sc_am2_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2016h-am2-q21": {
    "explanation": "IPAの公式正答はアです。掲載のSQL文と選択肢には原本の引用符が一部欠けています。入力値をSQL文に文字列として連結すると構文が変わるおそれがあるため、実装ではプレースホルダを使い、値をバインドします。",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gn5o-att/2016h28h_sc_am2_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2019h-am1-q7": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2019h-am1-q7.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000ddiw-att/2019h31h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2019h-am1-q11": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2019h-am1-q11.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000ddiw-att/2019h31h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2019h-am1-q19": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2019h-am1-q19.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000ddiw-att/2019h31h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2019a-am1-q1": {
    "question": "全体集合S内に異なる部分集合AとBがあるとき、(¬A)∩(¬B)に等しいものはどれか。ここで、A∪BはAとBの和集合、A∩BはAとBの積集合、¬AはSにおけるAの補集合、A−BはAからBを除いた差集合を表す。",
    "choices": {
      "ア": "(¬A)−B",
      "イ": "((¬A)∪(¬B))−(A∩B)",
      "ウ": "(S−A)∪(S−B)",
      "エ": "S−(A∩B)"
    },
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2019a-am1-q19": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2019a-am1-q19.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2019a-am2-q22": {
    "question": "次の仕様で動作する装置がある。未完成の状態遷移図を完成させるために、追加すべき遷移はどれか。\n\n【仕様】\n\n- レディでStartボタンが押された場合、運転開始して低速運転に遷移する。\n- 低速運転でUpボタンが押された場合、加速して高速運転に遷移する。\n- 低速運転でDownボタンが押された場合、運転休止して一時停止に遷移する。\n- 高速運転でDownボタンが押された場合、減速して低速運転に遷移する。\n- 一時停止でUpボタンが押された場合、運転再開して低速運転に遷移する。\n- レディ以外の状態でStopボタンが押された場合、運転停止してレディに遷移する。",
    "imageUrls": [
      "/questions/ipa-20261119/sc-2019a-am2-q22.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_sc_am2_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2020a-am2-q11": {
    "question": "JIS X 9401:2016（情報技術―クラウドコンピューティング―概要及び用語）の定義によるクラウドサービス区分の一つであり、クラウドサービスカスタマが表中の項番1と2の責務を負い、クラウドサービスプロバイダが項番3～5の責務を負うものはどれか。\n\n| 項番 | 責務 |\n|---:|---|\n| 1 | アプリケーションソフトウェアに対して、データ利用時のアクセス制御と暗号化の設定を行う。 |\n| 2 | アプリケーションソフトウェアに対して、セキュアプログラミングとソースコードの脆弱性診断を行う。 |\n| 3 | DBMSに対して、修正プログラム適用と権限設定を行う。 |\n| 4 | OSに対して、修正プログラム適用と権限設定を行う。 |\n| 5 | ハードウェアに対して、アクセス制御と物理セキュリティ確保を行う。 |",
    "hasImage": false,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000d05l-att/2020r02o_sc_am2_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2020a-am2-q24": {
    "question": "新システムの開発を計画している。提案された4案の中で、TCO（総所有費用）が最小のものはどれか。ここで、このシステムは開発後、3年間使用されるものとする。\n\n単位：百万円\n\n| 費用 | A案 | B案 | C案 | D案 |\n|---|---:|---:|---:|---:|\n| ハードウェア導入費用 | 30 | 30 | 40 | 40 |\n| システム開発費用 | 30 | 50 | 30 | 40 |\n| 導入教育費用 | 5 | 5 | 5 | 5 |\n| ネットワーク通信費用／年 | 20 | 20 | 15 | 15 |\n| 保守費用／年 | 6 | 5 | 5 | 5 |\n| システム運用費用／年 | 6 | 4 | 6 | 4 |",
    "hasImage": false,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000d05l-att/2020r02o_sc_am2_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2021h-am1-q19": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2021h-am1-q19.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000d5ru-att/2021r03h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2021h-am1-q26": {
    "question": "プロダクトポートフォリオマネジメント（PPM）マトリックスのa、bに入れる語句の適切な組合せはどれか。\n\n| a ＼ b | 高 | 低 |\n|---|---|---|\n| 高 | 花形 | 問題児 |\n| 低 | 金のなる木 | 負け犬 |",
    "hasImage": false,
    "choices": {
      "ア": "a：売上高利益率、b：市場占有率",
      "イ": "a：市場成長率、b：売上高利益率",
      "ウ": "a：市場成長率、b：市場占有率",
      "エ": "a：市場占有率、b：市場成長率"
    },
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000d5ru-att/2021r03h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2021a-am2-q12": {
    "question": "外部から侵入されたサーバ及びそのサーバに接続されていた記憶媒体を調査対象としてディジタルフォレンジックスを行うことになった。このとき、稼働状態にある調査対象のサーバ、記憶媒体などから表に示すa～dを証拠として保全する。保全の順序のうち、揮発性の観点から最も適切なものはどれか。\n\n| 記号 | 証拠として保全するもの |\n|---|---|\n| a | 遠隔にあるログサーバに記録された調査対象サーバのアクセスログ |\n| b | 調査対象サーバにインストールされていた会計ソフトのインストール用CD |\n| c | 調査対象サーバのハードディスク上の表計算ファイル |\n| d | 調査対象サーバのルーティングテーブルの状態 |",
    "hasImage": false,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_sc_am2_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2021a-am2-q21": {
    "question": "次の表において、“在庫”表の製品番号に参照制約が定義されているとき、その参照制約によって拒否される可能性がある操作はどれか。\n\n| 表 | 列 |\n|---|---|\n| 在庫 | 在庫管理番号（主キー）、製品番号（外部キー）、在庫量 |\n| 製品 | 製品番号（主キー）、製品名、型、単価 |",
    "hasImage": false,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_sc_am2_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2022h-am1-q16": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2022h-am1-q16.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2022a-am2-q21": {
    "question": "表Rと表Sに対して、次のSQL文を実行した結果はどれか。\n\n表R\n\n| X | Y |\n|---|---:|\n| A001 | 10 |\n| A002 | 20 |\n| A003 | 30 |\n| A005 | 50 |\n\n表S\n\n| X | Z |\n|---|---:|\n| A002 | 20 |\n| A003 | 30 |\n| A004 | 40 |\n\n```sql\nSELECT R.X AS A, R.Y AS B, S.X AS C, S.Z AS D\nFROM R LEFT OUTER JOIN S ON R.X = S.X\n```",
    "hasImage": false,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_sc_am2_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2022a-am2-q22": {
    "imageUrls": [
      "/questions/ipa-20261119/sc-2022a-am2-q22.png"
    ],
    "hasImage": true,
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_sc_am2_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2023h-am1-q2": {
    "choices": {
      "ア": "60を頂点とする左右対称の曲線。60から右の点線までの幅は10。",
      "イ": "60を頂点とする左右対称の曲線。点線55と65の間の幅は10。",
      "ウ": "10付近と60付近に頂点がある曲線。",
      "エ": "60を頂点とし、左側の裾が長い曲線。左の点線から60までの幅は10。"
    },
    "choiceImageUrls": {
      "ア": "/questions/ipa-20261119/sc-2023h-am1-q2-1.png",
      "イ": "/questions/ipa-20261119/sc-2023h-am1-q2-2.png",
      "ウ": "/questions/ipa-20261119/sc-2023h-am1-q2-3.png",
      "エ": "/questions/ipa-20261119/sc-2023h-am1-q2-4.png"
    },
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
  "sc-2023h-am1-q6": {
    "choices": {
      "ア": "データの個数とともに探索時間が増え、曲線の傾きが大きくなる。",
      "イ": "データの個数とともに探索時間が増える右上がりの直線。",
      "ウ": "データの個数とともに探索時間が増え、曲線の傾きが小さくなる。",
      "エ": "データの個数が増えても探索時間が一定の水平な直線。"
    },
    "choiceImageUrls": {
      "ア": "/questions/ipa-20261119/sc-2023h-am1-q6-1.png",
      "イ": "/questions/ipa-20261119/sc-2023h-am1-q6-2.png",
      "ウ": "/questions/ipa-20261119/sc-2023h-am1-q6-3.png",
      "エ": "/questions/ipa-20261119/sc-2023h-am1-q6-4.png"
    },
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05h_koudo_am1_ans.pdf",
    "lastUpdated": "2026-11-19"
  },
};
