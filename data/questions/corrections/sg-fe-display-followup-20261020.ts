// Preserve official blank positions and text equivalents of original figures.
import type { Question } from "@/lib/questions/types";

export const SG_FE_DISPLAY_FOLLOWUP: Record<string, Partial<Question>> = {
  "fe-2024cbt-kamoku-a-q3": {
    "question": "CPU内にキャッシュメモリをもち主記憶に接続する構成で、次のアクセス時間表のようにキャッシュメモリと主記憶のアクセス時間だけが異なり、他の条件は同じ2種類のCPU XとYがある。あるプログラムをCPU XとYでそれぞれ実行したところ、両者の処理時間が等しかった。このとき、キャッシュメモリのヒット率は幾らか。ここで、CPU以外の処理による影響はないものとする。\n\n構成: CPU内にキャッシュメモリ(256kバイト)があり、主記憶(256Mバイト)に接続。アクセス時間（単位: ナノ秒）:\n\n| CPU | キャッシュメモリ | 主記憶 |\n| :-- | --: | --: |\n| X | 40 | 400 |\n| Y | 20 | 580 |"
  },
  "fe-2025cbt-kamoku-b-q3": {
    "question": "問3 次のプログラム中の a と b に入れる正しい答えの組合せを,解答群の中から選べ。ここで,配列の要素番号は1から始まる。\n関数 push は、引数で与えられた整数をスタックに格納する。格納できた場合は true を返し、格納できなかった場合は false を返す。\n関数 pop は,スタックから値を取り出して返す。スタックが空のときは未定義の値を返す。\nスタックを,要素数が4である大域の整数型の配列 stack, 及び次に値を格納する位置を示す大域の変数 stackPos で表現する。スタックの初期状態は次のとおりである。\n\n| 要素番号 | 1 | 2 | 3 | 4 |\n| :-- | --: | --: | :-- | :-- |\n| stackの値 | 4 | 3 | 未定義の値 | 未定義の値 |\n\nstackPosの初期値は3であり、次に値を格納する位置を指す。\nプログラムでは,配列の領域外を参照してはならないものとする。\n[プログラム]\n大域:整数型: stackPos ← 3\n大域:整数型の配列: stack ← {4,3,未定義の値,未定義の値}\n○論理型:push(整数型: inputData)\nif (stackPos ≦ stackの要素数)\n stack[ a ] ← inputData\n stackPos ← stackPos + 1\n return true\nelse\n return false\nendif\n\n○整数型:pop()\n整数型:popData ← 未定義の値\nif (stackPos > 1)\n stackPos ← b\n popData ← stack[stackPos]\n stack[stackPos] ← 未定義の値\nendif\nreturn popData"
  },
  "fe-2024cbt-kamoku-b-q1": {
    "question": "次のプログラム中の［空欄］に入れる正しい答えを,解答群の中から選べ。\n関数 maximum は,異なる三つの整数を引数で受け取り,そのうちの最大値を返す。\n〔プログラム〕\n○整数型:maximum(整数型:x,整数型:y,整数型:z)\nif (［空欄］)\nreturn x\nelseif (y > z)\nreturn y\nelse\nreturn z\nendif"
  },
  "fe-2024cbt-kamoku-b-q2": {
    "question": "次のプログラム中の［空欄］に入れる正しい答えを,解答群の中から選べ。\n関数 convDecimal は,引数として与えられた,“0”と“1”だけから成る,1 文字以上の文字列を,符号なしの2進数と解釈したときの整数値を返す。例えば,引数として“10010”を与えると 18 が返る。\n関数 convDecimal が利用する関数 int は,引数で与えられた文字が“0”なら整数値0を返し、“1”なら整数値1を返す。\n[プログラム]\n○整数型:convDecimal(文字列型:binary)\n整数型:i, length, result ← 0\nlength ← binaryの文字数\nfor(iを1から length まで 1 ずつ増やす)\nresult ← ［空欄］\nendfor\nreturn result"
  },
  "fe-2024cbt-kamoku-b-q3": {
    "question": "次のプログラム中の［空欄］に入れる正しい答えを,解答群の中から選べ。ここで,配列の要素番号は1から始まる。\n図1に示すグラフの頂点には,1から順に整数で番号が付けられている。グラフは無向グラフであり,各頂点間には高々一つの辺がある。一つの辺は両端の頂点の番号を要素にもつ要素数2の整数型の配列で表現できる。例えば,{1,3}は頂点 1 と頂点3を端点とする辺を表す。グラフ全体は,グラフに含まれる辺を表す要素数2の配列を全て格納した配列(以下,辺の配列という)で表現できる。辺の配列の要素数はグラフの辺の個数と等しい。図1のグラフは整数型配列の配列{{1,3}, {1,4}, {3,4}, {2, 4}, {4,5}}と表現できる。\n関数 edgesToMatrix は,引数 edgeList で辺の配列を,引数 nodeNum でグラフの頂点の個数をそれぞれ受け取り、隣接行列を表す整数型の二次元配列を返す。\n[プログラム]\n○整数型の二次元配列: edgesToMatrix(整数型配列の配列: edgeList,\n整数型: nodeNum)\n整数型の二次元配列: adjMatrix ← {nodeNum行nodeNum列の 0}\n整数型:i, u, v\nfor(iを1から edgeListの要素数 まで 1 ずつ増やす)\nu← edgeList[i][1]\nv← edgeList[i][2]\n［空欄］\nendfor\nreturn adjMatrix\n\n〔原紙図1・図2の内容〕辺は{1,3}、{1,4}、{3,4}、{2,4}、{4,5}。隣接行列は頂点数と同じ行数・列数の正方行列で、頂点iとjを結ぶ辺があれば(i,j)=1、それ以外は0とする。対角成分は全て0で、無向グラフでは対称行列となる。図2の各行は順に(0,0,1,1,0)、(0,0,0,1,0)、(1,0,0,1,0)、(1,1,1,0,1)、(0,0,0,1,0)。"
  },
  "fe-2024cbt-kamoku-b-q4": {
    "question": "次の記述中の［空欄］に入れる正しい答えを,解答群の中から選べ。ここで,配列の要素番号は1から始まる。\n関数 merge は,昇順に整列された整数型の配列 data1 及び data2 を受け取り,これらを併合してできる昇順に整列された整数型の配列を返す。\n関数 merge を merge({2, 3},{1,4})として呼び出すと, /*** α ***/ の行は［空欄］。\n[プログラム]\n○整数型の配列: merge(整数型の配列:data1, 整数型の配列:data2)\n整数型:n1 ← data1の要素数\n整数型:n2 ← data2の要素数\n整数型の配列: work ← {(n1 + n2)個の 未定義の値}\n整数型:i←1\n整数型:j←1\n整数型:k←1\nwhile((i ≤ n1) and (j ≤ n2))\nif (data1[i] ≤ data2[j])\nwork[k] ← data1[i]\ni←i+1\nelse\nwork[k] ← data2[j]\nj←j+1\nendif\nk←k+1\nendwhile\nwhile (i ≤ n1)\nwork[k] ← data1[i]\ni←i+1\nk←k+1\nendwhile\nwhile (j ≤ n2)\nwork[k] ← data2[j] /*** α ***/\nj←j+1\nk←k+1\nendwhile\nreturn work"
  }
};
