# 保育士試験 過去問データ化 仕様（サブエージェント向け）

これは kakomon-ai.jp（kameking-lab/ipa-quiz-site）に保育士試験の過去問を追加するプロジェクトの
1科目分の作業指示です。あなたは **1科目・1回分** の転記・法令照合・全肢解説・独立査読を担当します。
統括（別コード追加・データ結線・テスト実行・PR作成）はオーケストレーター側が行うので、あなたは
**あなたの担当科目の出力ファイルだけ** を書いてください。他科目のフォルダ・共有コードファイル
（ipa-quiz-site の `lib/`, `data/questions/index.ts` など）には一切触れないでください。

## 試験の背景

- 実施団体: 一般社団法人全国保育士養成協議会（hoyokyo.or.jp）
- 筆記試験は5肢択一（一部「2つ選びなさい」等の複数選択）。9科目のうち「教育原理」「社会的養護」は
  受験者がどちらか一方を選択する対の科目で、それぞれ10問（他の7科目は20問）。
- 転載条件はページに明記なし（司令塔判断で出典明記の公開扱い）。問題文・選択肢は原文どおり書き写す
  こと（要約・言い換え禁止）。解説は独自作成。

## 入力ファイル

ラウンドと科目番号によって以下のパスにあります（`{ROUND_DIR}` と `{N}` は呼び出し側が指定）。

- 問題PDF: `C:\Users\kanet\AppData\Local\Temp\hoikushi\{ROUND_DIR}\{PDF_PREFIX}{N}{PDF_SUFFIX}.pdf`
- 一次抽出（PyMuPDF `get_text("text")`）: `...\{ROUND_DIR}\subj{N}.passA.txt`
- 二次抽出（PyMuPDF `get_text("blocks")` 再構成）: `...\{ROUND_DIR}\subj{N}.passB.txt`
- 公式正答: `C:\Users\kanet\AppData\Local\Temp\hoikushi\official-answers.json`
  （`{ROUND_KEY}` → 科目名（日本語）→ 問1〜問20 の配列。値は "4" や "1,3" のようなカンマ区切り文字列。
  空欄科目（教育原理・社会的養護の11問目以降）は "-" で、無視してよい）
- 出典URL・PDFのSHA-256: `C:\Users\kanet\AppData\Local\Temp\hoikushi\sources.json`

`passA.txt` と `passB.txt` は同じPDFからの独立した2種類の抽出（文字順の再構成方法が異なる）です。
これを**独立転記の代わりの機械差分**として使い、2つが一致しない箇所は元PDFを
`python -c "import fitz; ..."` で該当ページだけ再抽出するか、`pdftotext -layout` でも試して、
最終的にどちらが正しいかをあなたの判断で裁定してください（数値、否定語、正答の選択肢文言を最優先で
確認）。念のため、あなたの成果物（`final.json`）を書く前に、もう一度 `passA`/`passB` と
最終テキストを目視で突き合わせてください（1字ずつの照合に相当する確認）。

## 出力先

`{OUTPUT_DIR}`（呼び出し側が指定する、あなた専用のフォルダ）に以下を作成してください。

```
{OUTPUT_DIR}/
  transcription/
    notes.md          差分・裁定・表記ゆれの記録
  explanations/
    draft.receipt.json    起稿に使った `claude -p ...` の生出力（1回以上）
    review.receipt.json   査読に使った `claude -p ...` の生出力（1回以上、draftと別セッション）
    rereview<N>.receipt.json  FIXを再査読した場合
  final.json         この科目・このラウンドの最終成果物（下記スキーマ）
  REPORT.md          短い日本語の報告（件数・HOLD件数・査読結果・主な修正点・一次資料URL一覧）
```

## 起稿・査読の方法（前例踏襲）

1. **起稿**: `claude` CLI をBashから非対話で呼び出し、10問前後ずつのバッチで全選択肢の解説案を
   作らせる。例:
   `claude -p "<プロンプト>" --model claude-opus-5-5 --output-format json --dangerously-skip-permissions > explanations/batch1.draft.receipt.json`
   （`--dangerously-skip-permissions` は使えない場合は省略し、権限プロンプトが出ない設定
   （`--allowedTools ""` 等）で実行する。ツールなし・出典URLや法令条文を推測させないこと。
   生JSON出力を receipt として必ず保存する。
2. **査読**: 別の `claude -p` 呼び出し（起稿とは独立したプロセス、WebFetch/WebSearch 許可）で、
   原文・公式正答と解説案を突き合わせ、法令・制度に触れる文は一次資料
   （e-Gov法令検索、こども家庭庁、厚生労働省、文部科学省、全国保育士養成協議会）で確認する。
   判定は問題ごとではなく **主張（文）単位** で PASS / FIX / HOLD。FIXは修正文を提示させる。
3. FIXが出たら、その文だけ別セッションで再査読し、全て PASS になるまで繰り返す（最大3回）。
4. 最終的に PASS した文だけを `final.json` に採用する。

法令基準日: 問題冊子に基準日の明記はないので、**当該回の実施年月**（R8前期=令和8年10月、
R7後期=令和7年12月時点、正確な試験日は `sources.json` に無ければ hoyokyo.or.jp を確認）を基準日と
みなし、`lawReferenceDate` に設定する。基準日以降の法改正・指針改定に触れる問題には
`explanation` に「※出題時点の法令・制度に基づく解説です。」の注記を付ける（`lawSensitive: true`）。

## HOLD / PARTIAL_HOLD 基準

- 図・写真・楽譜・グラフに依存し、テキスト（Markdown表可）で忠実に再現できない設問は **HOLD**
  （`hold: true`, `holdReason` に理由）。表形式のデータ（数値表など）はMarkdown表に書き起こせれば
  HOLDにしなくてよい。画像アセットの抽出・保存は行わず、HOLDで処理すること（統括側の範囲外）。
- 公式正答が一意でない、または複数の解釈が成立しうる設問は **PARTIAL_HOLD**
  （`partialHold: true`, `partialHoldReason`）。今回のPDF・HTMLには正答訂正の記載は見当たらないが、
  念のため各設問で確認すること。
- HOLD/PARTIAL_HOLDの問題も `final.json` の配列には残し、`hold`/`partialHold` を立てて
  `choiceExplanations` は可能な範囲でよい（空でも可）。件数は `REPORT.md` に明記する。

## `final.json` スキーマ

```jsonc
{
  "round": "r8-zenki",              // または "r7-kouki"
  "subjectSlug": "hoiku-genri",     // 呼び出し側指定のスラッグ（変更しない）
  "subjectName": "保育原理",
  "expectedQuestions": 20,          // 呼び出し側指定（10 or 20）
  "sourcePdfUrl": "...",            // sources.json から
  "sourceAnswerUrl": "...",         // sources.json の answerPageUrl
  "examLabel": "令和8年度前期・地域限定保育士試験",
  "lawReferenceDate": "2026-10-24", // その回の筆記試験日（sources.json/hoyokyo.or.jpで確認）
  "questions": [
    {
      "number": 1,
      "question": "問1の本文。原文どおり。A〜E等の記述がある場合は箇条書きや表として含める。",
      "choices": ["選択肢1の文言", "選択肢2の文言", "選択肢3の文言", "選択肢4の文言", "選択肢5の文言"],
      "officialAnswer": [4],          // official-answers.json の値をパースした整数配列（1始まり）
      "requiredSelections": 1,        // 選ぶ数。official-answersが "2,4" なら2、通常1
      "choiceExplanations": ["...", "...", "...", "...", "..."],  // 各選択肢が正しい/誤りである理由。choicesと同じ長さ・同じ順
      "topicTags": ["保育所保育指針", "職員の資質向上"],
      "lawSensitive": false,
      "hold": false,
      "holdReason": null,
      "partialHold": false,
      "partialHoldReason": null,
      "reviewStatus": "PASS",         // 全文PASSなら"PASS"、一部未解決なら"FIX_PENDING"
      "evidenceUrls": ["https://laws.e-gov.go.jp/law/..."]  // 法令等に触れた場合の一次資料
    }
  ]
}
```

- `choices`/`choiceExplanations` は原則5要素。ただし原文が4肢以下ならその数に合わせる。
- 「組み合わせ」形式（Ａ〜Ｅの○×や語句を1〜5の組み合わせから選ぶ）の場合、`question` に
  Ａ〜Ｅの記述を含め、`choices` は「（組み合わせ）」欄の1〜5をそのまま
  （例: "Ａ○ Ｂ○ Ｃ○ Ｄ×"）にする。`choiceExplanations` はその組み合わせがなぜ正しい/誤りかを
  Ａ〜Ｅそれぞれの記述の正誤に触れて説明する。
- 複数選択（「2つ選びなさい」等）の場合、`choices` は独立した5つの記述（原文の1〜5）、
  `officialAnswer` は正解番号の配列（例: [2,4]）、`requiredSelections` は選ぶ数（例: 2）。

## 検証してから final.json を書くこと

- `questions.length === expectedQuestions`
- 全問で `officialAnswer` が `official-answers.json` の該当行と一致する
- HOLD以外の全問で `choiceExplanations` の全要素が非空
- `choices.length === choiceExplanations.length`
- 数字・法令名・組織名など、原文にない情報を解説が新たに作っていないか（特に年号・条文番号）

作業が終わったら `REPORT.md` に短く日本語で: 収録数、HOLD/PARTIAL_HOLD件数、査読PASS件数、
主な修正点、参照した一次資料URL一覧、使ったclaude CLIの呼び出し回数、を書いてください。
