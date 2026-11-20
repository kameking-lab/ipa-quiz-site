import type { Question } from "@/lib/questions/types";

export const ES_QUESTIONS_2022_AUTUMN_PM2: Question[] = [
  {
    "id": "es-2022a-pm2-q1",
    "exam": "es",
    "year": 2022,
    "season": "autumn",
    "session": "pm2",
    "qNumber": 1,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "VR・AR",
      "センサー",
      "画像処理"
    ],
    "difficulty": 4,
    "question": "問1　仮想現実技術を利用したシステムに関する次の記述を読んで，設問に答えよ。",
    "answer": "設問                解答例・解答の要点                 備考\n設問１(1) アバターの腕が3D モデルに近づいたら3D モデルの色を変える。\n       (2) ポリゴン頂点数を減らして，VR ゴーグルの演算処理を軽減できるから\n       (3) VR ゴーグルの測位情報をVR 空間内の座標系に変換し，アバターの顔の向きとし\n      て設定する。\n       (4) 音声の反射，吸音\n設問２(1) 左手は肘を曲げて顔の前にあり，右手は肘を伸ばして前方にある。\n       (2) 1.15\n       (3) 画素1 の右斜め下方向に，2，3，4 の順で配置される。\n       (4) 180\n設問３(1) 展示物Z のCG モデルが，入館者B の奥にあるように表示される。\n       (2) (a) AR グラスの180 度カメラで認識できる境界付近にAR 表示対象物がある場\n        合\n            (b) 構成要素IMU\n         理由   IMU で歩行を検出しているから停止状態への変化が検知できなく\n             なる。\n       (3) 20",
    "modelAnswer": "IPA公式解答例\n\n```text\n設問                解答例・解答の要点                 備考\n設問１(1) アバターの腕が3D モデルに近づいたら3D モデルの色を変える。\n       (2) ポリゴン頂点数を減らして，VR ゴーグルの演算処理を軽減できるから\n       (3) VR ゴーグルの測位情報をVR 空間内の座標系に変換し，アバターの顔の向きとし\n      て設定する。\n       (4) 音声の反射，吸音\n設問２(1) 左手は肘を曲げて顔の前にあり，右手は肘を伸ばして前方にある。\n       (2) 1.15\n       (3) 画素1 の右斜め下方向に，2，3，4 の順で配置される。\n       (4) 180\n設問３(1) 展示物Z のCG モデルが，入館者B の奥にあるように表示される。\n       (2) (a) AR グラスの180 度カメラで認識できる境界付近にAR 表示対象物がある場\n        合\n            (b) 構成要素IMU\n         理由   IMU で歩行を検出しているから停止状態への変化が検知できなく\n             なる。\n       (3) 20\n```",
    "explanation": "設問1：利用者への提示方法と演算処理の負荷を分けて整理する。3Dモデルの色の変化は接近を伝える動作であり、ポリゴン頂点数の削減は描画処理の軽減につながる。測位情報はVR空間の座標系に変換してから、アバターの向きへ反映する。\n\n設問2：腕の姿勢、投影される画素の配置、処理量の計算は、原本の座標系と時間条件を固定して追う。左右の腕の状態を取り違えたり、画素番号の順序を画面上の並びと混同したりしないよう、図と公式解答を対応させる。\n\n設問3：AR表示では、実物とCGの前後関係や、カメラの認識範囲の境界で起こる状態を考える。歩行から停止への変化の検出をIMUが担う条件を踏まえ、構成要素を止めたときに失う検出機能まで理由として書く。\n\n出典：IPA公式問題 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm2_qs.pdf\n公式解答例 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm2_ans.pdf",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p2.webp",
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p3.webp",
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p4.webp",
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p5.webp",
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p6.webp",
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p7.webp",
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p8.webp",
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p9.webp",
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p10.webp",
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p11.webp",
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p12.webp"
    ],
    "imageAltTexts": [
      "2022年秋期 ES 問1 本文・図表・設問（公式PDF 2ページ）",
      "2022年秋期 ES 問1 本文・図表・設問（公式PDF 3ページ）",
      "2022年秋期 ES 問1 本文・図表・設問（公式PDF 4ページ）",
      "2022年秋期 ES 問1 本文・図表・設問（公式PDF 5ページ）",
      "2022年秋期 ES 問1 本文・図表・設問（公式PDF 6ページ）",
      "2022年秋期 ES 問1 本文・図表・設問（公式PDF 7ページ）",
      "2022年秋期 ES 問1 本文・図表・設問（公式PDF 8ページ）",
      "2022年秋期 ES 問1 本文・図表・設問（公式PDF 9ページ）",
      "2022年秋期 ES 問1 本文・図表・設問（公式PDF 10ページ）",
      "2022年秋期 ES 問1 本文・図表・設問（公式PDF 11ページ）",
      "2022年秋期 ES 問1 本文・図表・設問（公式PDF 12ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb8/es-2022a-pm2-q1-answer-1.webp"
    ],
    "answerImageAltTexts": [
      "es-2022a-pm2-q1 IPA公式解答例 1（解答表・図）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  },
  {
    "id": "es-2022a-pm2-q2",
    "exam": "es",
    "year": 2022,
    "season": "autumn",
    "session": "pm2",
    "qNumber": 2,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "自動運転",
      "リアルタイムOS",
      "タスク設計"
    ],
    "difficulty": 4,
    "question": "問2　コミュニティバスの無人自動運転システムに関する次の記述を読んで，設問に答えよ。",
    "answer": "設問                解答例・解答の要点                 備考\n設問１(1) 赤信号で停車，前方の物体で停車，一時停止標識で停車，自車周辺に接近する\n      物体で停車のいずれかが一定時間継続したとき\n       (2) (a)  f センサーユニット\n                 g 制御部\n                 h マッピングユニット\n            (b)  i 推定位置情報\n                 j 物体認識情報\n                 k 駆動モーターの回転数，車体の傾斜\n                 l ハンドルの回転角，ウィンカー情報\n            (c) LIDAR が，自車の左側方近くの自転車を検出した場合\n       (3) (a) 0.04\n            (b) 9\n設問２(1) (a)  a バス制御情報\n                 b  10\n            (b)  c 自車位置情報を5G 通信タスクに通知\n       (2) (a)  d ウィンカー情報\n                 e バス停で停車\n            (b) 目標車速と現在の車速\n       (3) (a) センサータスクが書込み中に，走行制御タスクが読み出す場合\n            (b) タスク名 センサータスク\n         優先度    2\n設問３(1) 28.5\n       (2) メインタスク\n       (3) (a)  m 車両情報の車速がある値以上\n            (b)  n 走行制御タスクから，停車中の理由が走行停止受信で停車の停車中の\n          通知を受けた\n            (c)  o 信号停止の記憶を消去",
    "modelAnswer": "IPA公式解答例\n\n```text\n設問                解答例・解答の要点                 備考\n設問１(1) 赤信号で停車，前方の物体で停車，一時停止標識で停車，自車周辺に接近する\n      物体で停車のいずれかが一定時間継続したとき\n       (2) (a)  f センサーユニット\n                 g 制御部\n                 h マッピングユニット\n            (b)  i 推定位置情報\n                 j 物体認識情報\n                 k 駆動モーターの回転数，車体の傾斜\n                 l ハンドルの回転角，ウィンカー情報\n            (c) LIDAR が，自車の左側方近くの自転車を検出した場合\n       (3) (a) 0.04\n            (b) 9\n設問２(1) (a)  a バス制御情報\n                 b  10\n            (b)  c 自車位置情報を5G 通信タスクに通知\n       (2) (a)  d ウィンカー情報\n                 e バス停で停車\n            (b) 目標車速と現在の車速\n       (3) (a) センサータスクが書込み中に，走行制御タスクが読み出す場合\n            (b) タスク名 センサータスク\n         優先度    2\n設問３(1) 28.5\n       (2) メインタスク\n       (3) (a)  m 車両情報の車速がある値以上\n            (b)  n 走行制御タスクから，停車中の理由が走行停止受信で停車の停車中の\n          通知を受けた\n            (c)  o 信号停止の記憶を消去\n```",
    "explanation": "設問1：センサー、位置推定、制御の各ユニットについて、生成する情報と受け取る情報を対応させる。停車の検出条件は、赤信号、前方物体、一時停止標識、周辺物体など、原本に列挙された理由と継続時間の条件をそろえて読む。\n\n設問2：タスク間の通知内容、実行周期、優先度を原本の処理順に沿って整理する。センサータスクが共有データを書き込んでいる途中で走行制御タスクが読むと、不整合な値を参照する可能性がある。どのタスクの優先度を変更するかを、競合する二つの処理から判断する。\n\n設問3：追加仕様では、既存タスクへの通知と状態の記憶を含めて設計する。走行停止要求の受信、停止中の理由の通知、信号停止の記憶の消去をそれぞれのイベントに対応させ、同じ停止状態でも原因が異なる場合を区別する。\n\n出典：IPA公式問題 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm2_qs.pdf\n公式解答例 https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm2_ans.pdf",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p13.webp",
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p14.webp",
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p15.webp",
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p16.webp",
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p17.webp",
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p18.webp",
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p19.webp",
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p20.webp",
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p21.webp",
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p22.webp",
      "/questions/ipa-plan5-qb8/2022r04a_es_pm2-p23.webp"
    ],
    "imageAltTexts": [
      "2022年秋期 ES 問2 本文・図表・設問（公式PDF 13ページ）",
      "2022年秋期 ES 問2 本文・図表・設問（公式PDF 14ページ）",
      "2022年秋期 ES 問2 本文・図表・設問（公式PDF 15ページ）",
      "2022年秋期 ES 問2 本文・図表・設問（公式PDF 16ページ）",
      "2022年秋期 ES 問2 本文・図表・設問（公式PDF 17ページ）",
      "2022年秋期 ES 問2 本文・図表・設問（公式PDF 18ページ）",
      "2022年秋期 ES 問2 本文・図表・設問（公式PDF 19ページ）",
      "2022年秋期 ES 問2 本文・図表・設問（公式PDF 20ページ）",
      "2022年秋期 ES 問2 本文・図表・設問（公式PDF 21ページ）",
      "2022年秋期 ES 問2 本文・図表・設問（公式PDF 22ページ）",
      "2022年秋期 ES 問2 本文・図表・設問（公式PDF 23ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb8/es-2022a-pm2-q2-answer-1.webp"
    ],
    "answerImageAltTexts": [
      "es-2022a-pm2-q2 IPA公式解答例 1（解答表・図）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  }
];
