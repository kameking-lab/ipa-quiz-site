# 令和8年度 1級土木施工管理技術検定 第一次検定（2026-07-05実施）

## 状態

- 収録: 試験問題A No.1〜66（66/66）、試験問題B No.1〜35 のうち34問（No.7のみ保留）。計100問。
- 公式正答との照合: 101/101（保留中のB7も番号・正答を照合済み）。収録100問の4肢理由: 100/100。
- 保留: 問題B No.7。安衛法31条（注文者の講ずべき措置）の読み方により、公式正答(1)以外に(2)または(3)も正しいと読める余地があり、公式の解釈を一次資料で確認できないため全肢解説を確定できない。推測で解説を作らず未収録とした（Opus査読もHOLD、独立QCも保留妥当と判定）。
- 公式図を別画像で表示: 問題A No.1〜5・No.39、問題B No.3・No.6・No.32 の9問（SHA-256を `figures-ledger.json` とテストで固定）。
- URL: `/civil1/2026-july`、`/q/civil1/2026-july/mondai-a/qN`、`/q/civil1/2026-july/mondai-b/qN`。問題Aと問題Bは同じ番号を使うため、演習区分を「問題A」「問題B」に分けた。
- 年度一覧は公式区分（問題A 必須1〜5／12問選択6〜20／10問選択21〜54／8問選択55〜66、問題B 必須1〜20／応用能力21〜35）の見出しとページ内ジャンプで表示。

## 一次資料

- [試験問題A](https://www.jctc.jp/wjctcp/wp-content/uploads/2026/07/20260706d_mondaia.pdf) SHA-256 `a0835f57e998d5e00235fb40e3fda329cbcf3f9d7daca90a30f323dcd5a6d302`（29ページ）
- [試験問題B](https://www.jctc.jp/wjctcp/wp-content/uploads/2026/07/20260706d_mondaib.pdf) SHA-256 `6e8ee05d9773b4be548d34ace43ce5043445bcebeadbd3a8e6298e15800f495f`（20ページ）
- [正答肢](https://www.jctc.jp/wjctcp/wp-content/uploads/2026/07/20260706d_seitou.pdf) SHA-256 `aebeaf4a0fbb5f758afa9952d128b35a961119ea5dafb44923e1ec78187c6e46`
- 取得: 2026-09-26 19:08 JST（https://www.jctc.jp/mondai/ の「令和8年度 1級土木施工管理技術検定『第一次検定』」から）。PDFは作業フォルダ外のローカルキャッシュに保持し、このPRでは問題データ・原典URL・ハッシュ・抽出記録・モデルreceiptを追跡する。

## 文字起こしと照合

- `extract.py` はルビ（7.5pt未満）を除いた本文行を抽出、`segment.py` が問番号ごとに分割し、正答肢PDFの表を問題A 66問・問題B 35問に対応付ける（番号の欠番・重複でエラー）。
- 全49ページを画像で確認。PDFの小さな上付き・下付き文字（cm³、m³、Na₂O、m²、Cl⁻、N/mm²、ρt・ρd、MB、L²、√）と、空欄・組合せ・図の問題は `overrides.json` に原図から直した文面を記録（A1〜A5、A11、A24、A39、A63、B3、B6、B15、B16、B21、B23、B26、B29、B32〜B34）。原本の表記（例: B15「対摩耗性」、A56「越える」、A65(4)の文言）はそのまま残した。
- `source-transcription.json` が採録台帳。公開データは `data/questions/civil1/2026-july-{a,b}.json`。

## モデル査読と解説

- `opus-{a1..a6,b1..b3}-*.json` は `claude-opus-5-5`（firstParty）を明示したCLI実応答。receipt の `modelUsage` が `claude-opus-5-5` 単独であることを採用条件にしている（`build_data.py`）。
- 作成者（Opus 5.5）が全100問の4肢理由を読み、次を修正して再査読（`opus-fix1-*`、`notes-fix1.txt`）:
  - A2: 圧密を「短時間」の現象とした記述を削除。
  - A29: 初回はHOLD。(4)の不適当箇所を、砂防えん堤設計資料（鳥取県「土石流・流木対策えん堤」3.6 基礎の設計: パイピングには堤底幅の拡大・止水壁・カットオフ）で確認し、水抜き暗渠が挙げられていない点を根拠に再査読してPASS。参照URLを問題データに添付。
- A51 は、巻込鋼管が既設管の曲がり部に比較的容易に対応できることを日本水道協会系資料（JWRC Q&A 03-79）で確認し、参照URLを添付。

## 独立QC

- `QC-SONNET.md`: Sonnet サブエージェントが公式PDFのSHAを再計算し、正答を全数（99/99、B7除く）照合、26問（26%）の本文・選択肢・正答・全肢解説・図を原本画像と突合。判定 PASS（NG 0）。

## 検証

- `tsc --noEmit`: PASS
- `validate-questions --exam=civil1`: 100件 ok、fail 0、warn 0。全体 15,848件 fail 0。
- 対象Vitest（civil1・get-questions・question-jsonld・kankoji2）PASS。
