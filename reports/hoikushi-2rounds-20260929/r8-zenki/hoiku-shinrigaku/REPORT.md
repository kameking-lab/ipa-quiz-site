# REPORT — 令和8年度前期・地域限定保育士試験「保育の心理学」（r8-zenki / hoiku-shinrigaku）

## 収録数
- `final.json` に **20問** すべて収録（`expectedQuestions: 20` と一致）。
- HOLD: **0件**（図・写真・楽譜・グラフに依存する設問はなし。全問が文章・選択肢・組み合わせ表のみ）。
- PARTIAL_HOLD: **0件**（正答が一意でない、複数解釈が成立しうる設問は見当たらなかった）。
- 全20問で `officialAnswer` が `official-answers.json` の `r8-zenki` → `保育の心理学` の該当行と
  完全一致することをスクリプトで検証済み。
- 全20問で `choices.length === choiceExplanations.length`、HOLD以外の全問で
  `choiceExplanations` の全要素が非空であることを検証済み。
- `final.json` の `question`/`choices` 全文が `subj6.passA.txt`（元PDFのテキスト）に一字一句
  一致することをスクリプトで再確認済み（正規表現による空白除去後の文字列一致チェック）。

## passA / passB 差分
- `subj6.passA.txt`（424行）と `subj6.passB.txt`（771行、行間の空行が多いだけ）を全文読み合わせた。
  本文・選択肢・組み合わせ表・語群の文字列は**一字一句完全に一致**しており、機械差分はゼロ件だった。
  元PDFの追加ページ再抽出は不要と判断。

## 査読結果
- 起稿（`claude -p`、ツールなし・別プロセス）→ 独立査読（`claude -p`、WebSearch/WebFetch許可・
  起稿とは別セッション）→ FIXが出た文のみ再査読（`claude -p`、WebSearch/WebFetch許可・さらに
  別セッション）という3段階を実施。
- 第1回査読（問1〜10 / 問11〜20を2バッチ）で **FIX 5件**（すべて問13・問14）:
  - 問13 選択肢4: 「夫婦と未婚の子のみの世帯」が増加しているとした起稿の記述を、
    厚生労働省「2023（令和5）年国民生活基礎調査の概況」の実数（1989年1,547.8万世帯→2023年
    1,351.6万世帯、39.3%→24.8%）で裏付け、実際には**減少**していることを明記する形に修正。
  - 問14 選択肢1・2・5: 選択肢Ａ（父子家庭の悩みで「しつけ」が最多）が「令和3年度全国ひとり親
    世帯等調査」の実際の結果（母子・父子とも「教育・進学」が最多）と合わないこと、選択肢Ｃ
    （保護者の意向より保育所の判断を優先）が就学支援の考え方と逆であることを一次資料で確認し、
    解説文を精緻化。
  - 問14 選択肢4: ステップファミリー・要保護児童対策地域協議会の説明を一次資料（法務省・
    こども家庭庁資料）で確認し、法令・制度への言及に
    「※出題時点の法令・制度に基づく解説です。」の注記を追加（`lawSensitive: true`）。
  - それ以外の全問・全選択肢（95件）は初回査読で **PASS**。
- 上記FIX 5件を**別セッションの再査読**（`explanations/rereview1.receipt.json`）で再確認し、
  全5件とも一次資料URLの再検証つきで **PASS** となった（再FIXなし。最大3回のうち1回で収束）。
- 最終的に、`final.json` の全20問・全100選択肢の `choiceExplanations` はすべて査読PASS（初回PASS
  95件＋再査読PASS 5件）となったものを採用。`reviewStatus` はすべて `"PASS"`。

## 主な修正点（起稿→査読での変更）
1. 問13④：世帯数の増減方向を一次資料の実数で裏付け（増加→実際は減少と明記）。
2. 問14①②⑤：厚生労働省調査・保護者意向尊重の原則との整合を一次資料で確認し、解説の論拠を具体化。
3. 問14④：制度説明（ステップファミリー、要保護児童対策地域協議会）に一次資料の裏付けを追加し、
   `lawSensitive: true` と出題時点注記を付与。
4. 心理学理論の人物帰属（例: ストレンジ・シチュエーション法の開発者はボウルビィではなく
   エインズワース、臨界期はワトソンではなくローレンツの刷り込み研究に由来 等）は、起稿段階から
   すでに正しく整理されており、査読でも矛盾なしと確認（原文選択肢自体が誤った人物帰属を含む
   ひっかけ問題であるため、officialAnswerとも整合）。

## 参照した一次資料URL（主なもの）
- 厚生労働省「2023（令和5）年国民生活基礎調査の概況」
  https://www.mhlw.go.jp/toukei/saikin/hw/k-tyosa/k-tyosa23/dl/02.pdf
- こども家庭庁「令和3年度全国ひとり親世帯等調査結果報告」関連資料
  https://www.cfa.go.jp/policies/hitori-oya/reserch_single-parent_households
  https://www.cfa.go.jp/assets/contents/node/basic_page/field_ref_resources/f1dc19f2-79dc-49bf-a774-21607026a21d/9ff012a5/20230725_councils_shingikai_hinkon_hitorioya_6TseCaln_05.pdf
- 障害のある子どもの就学支援（こども家庭庁資料）
  https://www.cfa.go.jp/assets/contents/node/basic_page/field_ref_resources/e4b817c9-5282-4ccc-b0d5-ce15d7b5018c/36b55701/20231016_policies_hoiku_66.pdf
- 法務省 資料（ステップファミリー等）
  https://www.moj.go.jp/content/001388754.pdf 、 https://www.moj.go.jp/content/001361535.pdf
- 要保護児童対策地域協議会（厚生労働省）
  https://www.mhlw.go.jp/web/t_doc?dataId=00010450&dataType=0&pageNo=1
- 文部科学省 スタートカリキュラム／幼小接続関連資料
  https://www.mext.go.jp/b_menu/shingi/chukyo/chukyo3/064/siryo/attach/1365782.htm
  https://www.nier.go.jp/kaihatsu/pdf/startcurriculum_mini.pdf
- 発達心理学の学説・人物確認（各問ごとの詳細は `final.json` 各問の `evidenceUrls` を参照）:
  APA、Wikipedia（英語版）、J-STAGE、Kotobank、大学紀要（名古屋大学OCW等）ほか。
  ※心理学理論は法令ではないため、教科書的な信頼できる専門サイト・学術リポジトリを一次資料として
  用いた（`e-Gov`法令検索の対象になるのは問13・14の統計調査・児童福祉制度に関する部分のみ）。

## `claude` CLI 呼び出し回数
合計 **5回**（すべて非対話・別プロセス、モデルは `claude-opus-4-1` 指定＝実行時 `claude-opus-5-5`
に解決）:
1. `explanations/draft-batch1.receipt.json` — 起稿（問1〜10、`--allowedTools ""`）
2. `explanations/draft-batch2.receipt.json` — 起稿（問11〜20、`--allowedTools ""`）
3. `explanations/review-batch1.receipt.json` — 独立査読（問1〜10、`--allowedTools "WebSearch,WebFetch"`、
   Web検索13回）
4. `explanations/review-batch2.receipt.json` — 独立査読（問11〜20、`--allowedTools "WebSearch,WebFetch"`、
   Web検索11回）
5. `explanations/rereview1.receipt.json` — FIX 5件の再査読（`--allowedTools "WebSearch,WebFetch"`、
   Web検索5回）

いずれも `is_error: false` で正常終了。起稿と査読は別プロセス・別セッション（`session_id` が
すべて異なる）で実行し、査読は起稿の結果を鵜呑みにせずWebSearch/WebFetchで一次資料を確認した。

## 安全上の指示への準拠確認（コーディネーター確認依頼分）
- 5回すべての `claude -p` 呼び出しで `--dangerously-skip-permissions` / `--permission-mode
  bypassPermissions` 等の全許可オプションは**一度も使用していない**（起稿=`--allowedTools ""`、
  査読・再査読=`--allowedTools "WebSearch,WebFetch"` のみ。permission-modeは既定のまま）。
- 5件全ての receipt（`draft-batch1/2`, `review-batch1/2`, `rereview1`）の `permission_denials`
  欄はいずれも空配列 `[]` であり、許可外ツールの呼び出しが試みられて拒否された形跡はない。
- `modelUsage` を確認したところ、起稿2回（`draft-batch1/2`）は `webSearchRequests: 0`（ツール
  なしで指示通り作成）、査読・再査読3回（`review-batch1/2`, `rereview1`）は合計29回の
  WebSearch実行（13＋11＋5）があり、許可された `WebSearch`/`WebFetch` の範囲内で一次資料確認が
  行われたことを確認した。許可外ツール（Bash、Edit、Write等）の使用・拒否ログは見当たらない。

## 人間の判断が必要な点
特になし。本科目（保育の心理学・r8-zenki）はHOLD/PARTIAL_HOLDともに0件で、全問査読PASSに到達した。
安全上の指示（bypass禁止・allowedTools限定）にも当初から準拠していたことを確認済み。
