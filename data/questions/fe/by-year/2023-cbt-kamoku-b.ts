import type { Question } from "@/lib/questions/types";

export const FE_QUESTIONS_2023_CBT_KAMOKU_B: Question[] = [
  {
    "id": "fe-2023cbt-kamoku-b-q1",
    "exam": "fe",
    "year": 2023,
    "season": "cbt",
    "session": "kamoku-b",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "アルゴリズムとプログラミング",
    "topicTags": [
      "素数",
      "繰返し処理",
      "剰余"
    ],
    "difficulty": 3,
    "question": "次のプログラム中の［a］と［b］に入れる正しい答えの組合せを，解答群の中から選べ。ここで，配列の要素番号は1から始まる。\n\n関数findPrimeNumbersは，引数で与えられた整数以下の，全ての素数だけを格納した配列を返す関数である。ここで，引数に与える整数は2以上である。\n\n〔プログラム〕\n```text\n○整数型の配列: findPrimeNumbers(整数型: maxNum)\n  整数型の配列: pnList ← {}  // 要素数0の配列\n  整数型: i, j\n  論理型: divideFlag\n  for (i を 2 から ［a］ まで 1 ずつ増やす)\n    divideFlag ← true\n    /* iの正の平方根の整数部分が2未満のときは，繰返し処理を実行しない */\n    for (j を 2 から iの正の平方根の整数部分 まで 1 ずつ増やす)  // α\n      if (［b］)\n        divideFlag ← false\n        αの行から始まる繰返し処理を終了する\n      endif\n    endfor\n    if (divideFlag が true と等しい)\n      pnListの末尾 に iの値 を追加する\n    endif\n  endfor\n  return pnList\n```",
    "choices": {
      "ア": "a：maxNum ／ b：i ÷ j の余り が 0 と等しい",
      "イ": "a：maxNum ／ b：i ÷ j の商 が 1 と等しくない",
      "ウ": "a：maxNum ＋ 1 ／ b：i ÷ j の余り が 0 と等しい",
      "エ": "a：maxNum ＋ 1 ／ b：i ÷ j の商 が 1 と等しくない"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "調べる整数は2以上maxNum以下なので、外側の繰返しの上限aはmaxNumとなる。maxNum＋1にすると、引数で指定した上限を超える数まで調べてしまう。\n\n整数iが2以上の整数jで割り切れるときは素数ではない。その判定は商の値ではなく、余りが0かどうかで行う。割り切れた時点でdivideFlagをfalseにして内側の繰返しを終了し、約数が見つからなかったiだけをpnListへ追加する。したがって組合せはアである。\n\niが合成数なら、平方根以下に少なくとも一つの約数がある。この性質により、内側の繰返しをiの正の平方根の整数部分までに制限できる。\n\n出典：IPA公式問題 https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_qs.pdf\n公式解答例 https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_ans.pdf",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p2.webp",
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p3.webp",
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p4.webp"
    ],
    "imageAltTexts": [
      "2023年度 基本情報技術者 科目B 問1 擬似言語の共通記述形式（公式PDF 2ページ）",
      "2023年度 基本情報技術者 科目B 問1 擬似言語の共通記述形式（公式PDF 3ページ）",
      "2023年度 基本情報技術者 科目B 問1 問題・プログラム・解答群（公式PDF 4ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  },
  {
    "id": "fe-2023cbt-kamoku-b-q2",
    "exam": "fe",
    "year": 2023,
    "season": "cbt",
    "session": "kamoku-b",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "アルゴリズムとプログラミング",
    "topicTags": [
      "手続呼出し",
      "トレース"
    ],
    "difficulty": 3,
    "question": "次の記述中の空欄に入れる正しい答えを，解答群の中から選べ。\n\n次のプログラムにおいて，手続proc2を呼び出すと，空欄の順に出力される。\n\n〔プログラム〕\n```text\n○proc1()\n  \"A\" を出力する\n  proc3()\n\n○proc2()\n  proc3()\n  \"B\" を出力する\n  proc1()\n\n○proc3()\n  \"C\" を出力する\n```",
    "choices": {
      "ア": "“A”，“B”，“B”，“C”",
      "イ": "“A”，“C”",
      "ウ": "“A”，“C”，“B”，“C”",
      "エ": "“B”，“A”，“B”，“C”",
      "オ": "“B”，“C”，“B”，“A”",
      "カ": "“C”，“B”",
      "キ": "“C”，“B”，“A”",
      "ク": "“C”，“B”，“A”，“C”"
    },
    "answer": "ク",
    "officialAnswerNumber": "ク",
    "explanation": "proc2の先頭ではproc3を呼び出すので、最初の出力はCになる。proc3が終了するとproc2へ戻り、次の命令でBを出力する。\n\n続いてproc1を呼び出す。proc1はAを出力した後、さらにproc3を呼び出すため、最後にもう一度Cを出力する。全体の出力順はC、B、A、Cとなり、正解はクである。\n\n手続の定義が並んでいる順番ではなく、呼出しが実行された順番で追うことが大切である。キは最後のproc3の呼出しを見落とした並びであり、カはproc1の実行を含んでいない。\n\n出典：IPA公式問題 https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_qs.pdf\n公式解答例 https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_ans.pdf",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p2.webp",
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p3.webp",
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p5.webp"
    ],
    "imageAltTexts": [
      "2023年度 基本情報技術者 科目B 問2 擬似言語の共通記述形式（公式PDF 2ページ）",
      "2023年度 基本情報技術者 科目B 問2 擬似言語の共通記述形式（公式PDF 3ページ）",
      "2023年度 基本情報技術者 科目B 問2 問題・プログラム・解答群（公式PDF 5ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  },
  {
    "id": "fe-2023cbt-kamoku-b-q3",
    "exam": "fe",
    "year": 2023,
    "season": "cbt",
    "session": "kamoku-b",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "アルゴリズムとプログラミング",
    "topicTags": [
      "クイックソート",
      "再帰",
      "トレース"
    ],
    "difficulty": 3,
    "question": "次の記述中の空欄に入れる正しい答えを，解答群の中から選べ。ここで，配列の要素番号は1から始まる。\n\n次の手続sortは，大域の整数型の配列dataの，引数firstで与えられた要素番号から引数lastで与えられた要素番号までの要素を昇順に整列する。ここで，first ＜ lastとする。手続sortをsort(1, 5)として呼び出すと，/*** α ***/ の行を最初に実行したときの出力は空欄となる。\n\n〔プログラム〕\n```text\n大域: 整数型の配列: data ← {2, 1, 3, 5, 4}\n\n○sort(整数型: first, 整数型: last)\n  整数型: pivot, i, j\n  pivot ← data[(first ＋ last) ÷ 2 の商]\n  i ← first\n  j ← last\n  while (true)\n    while (data[i] ＜ pivot)\n      i ← i ＋ 1\n    endwhile\n    while (pivot ＜ data[j])\n      j ← j － 1\n    endwhile\n    if (i ≧ j)\n      繰返し処理を終了する\n    endif\n    data[i]とdata[j]の値を入れ替える\n    i ← i ＋ 1\n    j ← j － 1\n  endwhile\n  dataの全要素の値を要素番号の順に空白区切りで出力する  /*** α ***/\n  if (first ＜ i － 1)\n    sort(first, i － 1)\n  endif\n  if (j ＋ 1 ＜ last)\n    sort(j ＋ 1, last)\n  endif\n```",
    "choices": {
      "ア": "1 2 3 4 5",
      "イ": "1 2 3 5 4",
      "ウ": "2 1 3 4 5",
      "エ": "2 1 3 5 4"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "最初の呼出しではpivotはdata[3]の3である。左側の走査は2、1を通過してi＝3で止まり、右側の走査は4、5を通過してj＝3で止まる。ここでi≧jが成立するので、値の交換を行わずに繰返しを終了する。\n\nαの出力は、この分割処理の直後、再帰呼出しの前に実行される。その時点では配列は初期状態の2、1、3、5、4のままなので、正解はエとなる。\n\nアは整列がすべて完了した後の並びである。イやウのように片側だけを整列した状態も、この最初の出力より後に現れる。問われている観測時点を、再帰の前後で取り違えないようにする。\n\n出典：IPA公式問題 https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_qs.pdf\n公式解答例 https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_ans.pdf",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p2.webp",
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p3.webp",
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p6.webp",
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p7.webp"
    ],
    "imageAltTexts": [
      "2023年度 基本情報技術者 科目B 問3 擬似言語の共通記述形式（公式PDF 2ページ）",
      "2023年度 基本情報技術者 科目B 問3 擬似言語の共通記述形式（公式PDF 3ページ）",
      "2023年度 基本情報技術者 科目B 問3 問題・プログラム・解答群（公式PDF 6ページ）",
      "2023年度 基本情報技術者 科目B 問3 問題・プログラム・解答群（公式PDF 7ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  },
  {
    "id": "fe-2023cbt-kamoku-b-q4",
    "exam": "fe",
    "year": 2023,
    "season": "cbt",
    "session": "kamoku-b",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "アルゴリズムとプログラミング",
    "topicTags": [
      "ハッシュ法",
      "衝突処理",
      "剰余"
    ],
    "difficulty": 3,
    "question": "次の記述中の空欄に入れる正しい答えを，解答群の中から選べ。ここで，配列の要素番号は1から始まる。\n\n関数addは，引数で指定された正の整数valueを大域の整数型の配列hashArrayに格納する。格納できた場合はtrueを返し，格納できなかった場合はfalseを返す。ここで，整数valueをhashArrayのどの要素に格納すべきかを，関数calcHash1及びcalcHash2を利用して決める。\n\n手続testは，関数addを呼び出して，hashArrayに正の整数を格納する。手続testの処理が終了した直後のhashArrayの内容は，空欄である。\n\n〔プログラム〕\n```text\n大域: 整数型の配列: hashArray\n\n○論理型: add(整数型: value)\n  整数型: i ← calcHash1(value)\n  if (hashArray[i] ＝ －1)\n    hashArray[i] ← value\n    return true\n  else\n    i ← calcHash2(value)\n    if (hashArray[i] ＝ －1)\n      hashArray[i] ← value\n      return true\n    endif\n  endif\n  return false\n\n○整数型: calcHash1(整数型: value)\n  return (value mod hashArrayの要素数) ＋ 1\n\n○整数型: calcHash2(整数型: value)\n  return ((value ＋ 3) mod hashArrayの要素数) ＋ 1\n\n○test()\n  hashArray ← {5個の －1}\n  add(3)\n  add(18)\n  add(11)\n```",
    "choices": {
      "ア": "{－1, 3, －1, 18, 11}",
      "イ": "{－1, 11, －1, 3, －1}",
      "ウ": "{－1, 11, －1, 18, －1}",
      "エ": "{－1, 18, －1, 3, 11}",
      "オ": "{－1, 18, 11, 3, －1}"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "配列の要素数は5なので、3の第1候補は(3 mod 5)＋1＝4となり、hashArray[4]へ3を格納する。18の第1候補も4だが既に使用されているため、第2候補の((18＋3) mod 5)＋1＝2へ18を格納する。\n\n11の第1候補は(11 mod 5)＋1＝2で、ここも既に使用されている。そこで第2候補の((11＋3) mod 5)＋1＝5へ11を格納する。最終状態は{－1, 18, －1, 3, 11}となり、正解はエである。\n\n衝突時には次の空き要素を順に探すのではなく、calcHash2が返す位置だけを調べる。この手続固有の衝突処理を、一般的な線形探索と混同しないことがポイントになる。\n\n出典：IPA公式問題 https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_qs.pdf\n公式解答例 https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_ans.pdf",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p2.webp",
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p3.webp",
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p8.webp",
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p9.webp"
    ],
    "imageAltTexts": [
      "2023年度 基本情報技術者 科目B 問4 擬似言語の共通記述形式（公式PDF 2ページ）",
      "2023年度 基本情報技術者 科目B 問4 擬似言語の共通記述形式（公式PDF 3ページ）",
      "2023年度 基本情報技術者 科目B 問4 問題・プログラム・解答群（公式PDF 8ページ）",
      "2023年度 基本情報技術者 科目B 問4 問題・プログラム・解答群（公式PDF 9ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  },
  {
    "id": "fe-2023cbt-kamoku-b-q5",
    "exam": "fe",
    "year": 2023,
    "season": "cbt",
    "session": "kamoku-b",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "アルゴリズムとプログラミング",
    "topicTags": [
      "コサイン類似度",
      "ベクトル",
      "アルゴリズム"
    ],
    "difficulty": 3,
    "question": "次のプログラム中の［a］と［b］に入れる正しい答えの組合せを，解答群の中から選べ。ここで，配列の要素番号は1から始まる。\n\nコサイン類似度は，二つのベクトルの向きの類似性を測る尺度である。関数calcCosineSimilarityは，いずれも要素数がn（n≧1）である実数型の配列vector1とvector2を受け取り，二つの配列のコサイン類似度を返す。配列vector1が{a1, a2, …, an}，配列vector2が{b1, b2, …, bn}のとき，コサイン類似度は次の数式で計算される。ここで，配列vector1と配列vector2のいずれも，全ての要素に0が格納されていることはないものとする。\n\n（a1b1 ＋ a2b2 ＋ … ＋ anbn）÷（√（a1の2乗 ＋ a2の2乗 ＋ … ＋ anの2乗）× √（b1の2乗 ＋ b2の2乗 ＋ … ＋ bnの2乗））\n\n〔プログラム〕\n```text\n○実数型: calcCosineSimilarity(実数型の配列: vector1,\n                            実数型の配列: vector2)\n  実数型: similarity, numerator, denominator, temp ← 0\n  整数型: i\n  numerator ← 0\n  for (i を 1 から vector1の要素数 まで 1 ずつ増やす)\n    numerator ← numerator ＋ ［a］\n  endfor\n  for (i を 1 から vector1の要素数 まで 1 ずつ増やす)\n    temp ← temp ＋ vector1[i]の2乗\n  endfor\n  denominator ← tempの正の平方根\n  temp ← 0\n  for (i を 1 から vector2の要素数 まで 1 ずつ増やす)\n    temp ← temp ＋ vector2[i]の2乗\n  endfor\n  denominator ← ［b］\n  similarity ← numerator ÷ denominator\n  return similarity\n```",
    "choices": {
      "ア": "a：(vector1[i] × vector2[i])の正の平方根 ／ b：denominator × (tempの正の平方根)",
      "イ": "a：(vector1[i] × vector2[i])の正の平方根 ／ b：denominator ＋ (tempの正の平方根)",
      "ウ": "a：(vector1[i] × vector2[i])の正の平方根 ／ b：tempの正の平方根",
      "エ": "a：vector1[i] × vector2[i] ／ b：denominator × (tempの正の平方根)",
      "オ": "a：vector1[i] × vector2[i] ／ b：denominator ＋ (tempの正の平方根)",
      "カ": "a：vector1[i] × vector2[i] ／ b：tempの正の平方根",
      "キ": "a：vector1[i]の2乗 ／ b：denominator × (tempの正の平方根)",
      "ク": "a：vector1[i]の2乗 ／ b：denominator ＋ (tempの正の平方根)",
      "ケ": "a：vector1[i]の2乗 ／ b：tempの正の平方根"
    },
    "answer": "エ",
    "officialAnswerNumber": "エ",
    "explanation": "分子numeratorには、同じ位置にある二つのベクトルの成分の積を合計する。したがってaはvector1[i] × vector2[i]である。各積の平方根を取ったり、片方の成分の2乗だけを足したりすると内積にはならない。\n\n最初の平方根の計算後、denominatorにはvector1の長さが入っている。続く繰返しでtempにvector2の各成分の2乗和を求めるので、bは既存のdenominatorとtempの正の平方根との積になる。分母で二つの長さを足したり、片方だけで上書きしたりしてはいけない。\n\nこの二つを満たす選択肢はエである。変数に途中で何が格納されているかを、内積、各ベクトルの長さ、長さの積の順に対応させると判断できる。\n\n出典：IPA公式問題 https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_qs.pdf\n公式解答例 https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_ans.pdf",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p2.webp",
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p3.webp",
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p10.webp",
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p11.webp"
    ],
    "imageAltTexts": [
      "2023年度 基本情報技術者 科目B 問5 擬似言語の共通記述形式（公式PDF 2ページ）",
      "2023年度 基本情報技術者 科目B 問5 擬似言語の共通記述形式（公式PDF 3ページ）",
      "2023年度 基本情報技術者 科目B 問5 問題・プログラム・解答群（公式PDF 10ページ）",
      "2023年度 基本情報技術者 科目B 問5 問題・プログラム・解答群（公式PDF 11ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  },
  {
    "id": "fe-2023cbt-kamoku-b-q6",
    "exam": "fe",
    "year": 2023,
    "season": "cbt",
    "session": "kamoku-b",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "情報セキュリティ",
    "topicTags": [
      "フィッシング",
      "委託先管理",
      "情報セキュリティ"
    ],
    "difficulty": 3,
    "question": "問６  A 社は，放送会社や運輸会社向けに広告制作ビジネスを展開している。A 社は，人\n\n  事業務の効率化を図るべく，人事業務の委託を検討することにした。A 社が委託する\n\n  業務（以下，B 業務という）を図1 に示す。\n\n\n\n  ・採用予定者から郵送されてくる入社時の誓約書，前職の源泉徴収票などの書類をPDF フ\n   ァイルに変換し，ファイルサーバに格納する。\n  （省略）\n\n                    図1  B 業務\n\n\n\n   委託先候補のC 社は，B 業務について，次のようにA 社に提案した。\n\n   ・B 業務だけに従事する専任の従業員を割り当てる。\n\n   ・B 業務では，図2 の複合機のスキャン機能を使用する。\n\n\n\n  ・スキャン機能を使用する際は，従業員ごとに付与した利用者ID とパスワードをパネルに入\n   力する。\n  ・スキャンしたデータをPDF ファイルに変換する。\n   ・PDF ファイルを従業員ごとに異なる鍵で暗号化して，電子メールに添付する。\n  ・スキャンを実行した本人宛てに電子メールを送信する。\n   ・PDF ファイルが大きい場合は，PDF ファイルを添付する代わりに，自社の社内ネットワーク\n   上に設置したサーバ（以下，B サーバという）1)に自動的に保存し，保存先のURL を電子メ\n   ールの本文に記載して送信する。\n\n   注1)  B サーバにアクセスする際は，従業員ごとの利用者ID とパスワードが必要になる。\n\n             図2 複合機のスキャン機能（抜粋）\n\n\n\n      A 社は，C 社と業務委託契約を締結する前に，秘密保持契約を締結した。その後，C\n\n  社に質問表を送付し，回答を受けて，業務委託での情報セキュリティリスクの評価を\n\n  実施した。その結果，図3 の発見があった。\n\n\n\n  ・複合機のスキャン機能では，電子メールの差出人アドレス，件名，本文及び添付ファイル\n   名を初期設定1)の状態で使用しており，誰がスキャンを実行しても同じである。\n  ・複合機のスキャン機能の初期設定情報はベンダーのWeb サイトで公開されており，誰でも\n   閲覧できる。\n   注1)  複合機の初期設定はC 社の情報システム部だけが変更可能である。\n\n                   図3 発見事項\n\nそこで，A 社では，初期設定の状態のままではA 社にとって情報セキュリティリス\n\n クがあり，初期設定から変更するという対策が必要であると評価した。\n\n\n\n設問 対策が必要であるとA 社が評価した情報セキュリティリスクはどれか。解答群の\n\n  うち，最も適切なものを選べ。",
    "choices": {
      "ア": "B業務に従事する従業員が，攻撃者からの電子メールを複合機からのものと信じて本文中にあるURLをクリックし，フィッシングサイトに誘導される。その結果，A社の採用予定者の個人情報が漏えいする。",
      "イ": "B業務に従事する従業員が，複合機から送信される電子メールをスパムメールと誤認し，電子メールを削除する。その結果，再スキャンが必要となり，B業務が遅延する。",
      "ウ": "攻撃者が，複合機から送信される電子メールを盗聴し，添付ファイルを暗号化して身代金を要求する。その結果，A社が復号鍵を受け取るために多額の身代金を支払うことになる。",
      "エ": "攻撃者が，複合機から送信される電子メールを盗聴し，本文に記載されているURLを使ってBサーバにアクセスする。その結果，A社の採用予定者の個人情報が漏えいする。"
    },
    "answer": "ア",
    "officialAnswerNumber": "ア",
    "explanation": "複合機が送るメールの差出人、件名、本文、添付ファイル名が共通の初期設定で、その内容が公開されている。このため、攻撃者は通常の通知に似せたメールを作りやすく、従業員が偽のURLからフィッシングサイトへ誘導されるリスクがある。該当するのはアである。\n\nイの削除による業務遅延は、初期設定情報を攻撃者が利用して生じる個人情報漏えいのリスクを説明していない。ウの身代金要求は、公開されたメールの初期設定から導かれる攻撃ではない。\n\nエは、URLを知るだけでBサーバへアクセスできることを前提にしているが、原本では従業員ごとの利用者IDとパスワードが必要とされている。本文に示された認証条件を落とさず、攻撃者がどの情報を悪用できるかを考える。\n\n出典：IPA公式問題 https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_qs.pdf\n公式解答例 https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_ans.pdf",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p2.webp",
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p3.webp",
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p12.webp",
      "/questions/ipa-plan5-qb8/2023r05_fe_kamoku_b-p13.webp"
    ],
    "imageAltTexts": [
      "2023年度 基本情報技術者 科目B 問6 擬似言語の共通記述形式（公式PDF 2ページ）",
      "2023年度 基本情報技術者 科目B 問6 擬似言語の共通記述形式（公式PDF 3ページ）",
      "2023年度 基本情報技術者 科目B 問6 問題・プログラム・解答群（公式PDF 12ページ）",
      "2023年度 基本情報技術者 科目B 問6 問題・プログラム・解答群（公式PDF 13ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  }
];
