# 電験三種の証跡を別チェックアウトで検証する

`docs/evidence/denken3/input/` は、既存の厳格査読receiptが固定した公式頁・一次資料と、source manifestの公式PDFを同一バイトで保存する。receipt内の元パスは変更しない。`denken3_cli.evidence_file` が元パスまたはこの追跡ミラーをSHA-256で照合する。生応答は既存の `docs/evidence/denken3/raw/` を照合し、成功した `claude-opus-5-5` のresultイベントまで確認する。両ミラーは `.gitattributes` で改行変換を禁止する。

検証コマンド:

```bash
python scripts/test_denken3_portability.py
python scripts/denken3-validate.py --local-pdfs --partial
python scripts/denken3-strict-status.py
python scripts/denken3-strict-status.py --require-complete
```

PR #511 head `f58fbe6e` 由来の候補は316/320。最初の移植で厳格PASSは292/320となり、さらに e-Gov公式API v2 から2025-04-01施行版4法令のJSONを再取得して既存SHAと完全一致を確認した結果、2026-09-24時点で **300/320** になった。公開ゲートは失敗する。

残20単位は次の通り。候補がない4単位の公式入力は `MISSING_CANDIDATE_INPUTS.json` にまとめた。公式問題・解答PDFのSHA、該当原頁の画像・SHA、PDF文字抽出、過去の未受入草稿を示す。画像を直接確認し、2025上期法規問1は本文と選択肢が2頁に分かれ、上期理論問12には電極・ヒータ・電源極性の図がある。ここでは候補もPASSも作成しない。

- 候補なし4: 2025上期法規問1、上期理論問12、下期法規問4、下期電力問1。
- 固定証拠の原バイト欠落16: 2024下期法規問12(a)(b)・問13(a)(b)の4、2025上期法規問4・6・7・8・9の5、2025下期法規問6・7・9・12(a)(b)・13(a)(b)の7。各単位の候補・既存PASS receipt・不足パスとSHAは `MISSING_PINNED_INPUTS.json` に固定した。

原バイトの探索範囲はGit履歴、既存追跡資料、2024/2025の別作業ツリー、公式URL。e-Govの4件は完全一致で回収できた。経済産業省の2024-10-22版・2025-11-20版の公式PDF直URLは通常のHTTPアクセスで403となり、原PDFを回収できていない。2023-12-26版PDF自体は追跡済みだが、既存receiptの一部頁画像と現環境での再描画結果はSHAが異なる。2025下期法規PDF第20頁も再描画画像とreceiptのSHAが異なる。異なるバイトを固定SHAの代わりに置かない。

次にOpus 5.5が見る最小単位は候補なし4件。固定原バイトを回収できない16件は、新しい公式資料のバイトと施行版を固定し直したうえで現候補を独立再審査するキューに置く。全16件が再固定を要する場合、Opus査読は合計20単位となる。いずれも独立PASS・実生応答・全肢理由・公式正答・原図が揃うまでHOLD。

## 2026-09-24 追記（Linux継続セッション）

- `MISSING_PINNED_INPUTS.json` の16単位に必要な固定入力（経済産業省 解釈 2023-12-26／2024-10-22／2025-11-20版PDF・頁画像、2025下期法規原頁ほか）は、本セッションの私有ツリーにSHA一致のバイトがあったため `input/` に49件追加した。回復不能は0件。
- `MISSING_CANDIDATE_INPUTS.json` の候補なし4単位のうち、2025上期法規問1・上期理論問12は Opus 5.5 の草稿・独立査読・厳格査読でPASSし受入。2025下期法規問4・電力問1は一次資料不足で HOLD（STATUS.md 参照）。
- 私有ツリーを退避した追跡ファイルのみの状態で `denken3-strict-status.py` は strictPass 318/320・passRawNotInCheckout 0、`denken3-validate.py --local-pdfs --partial` は 318/320、`test_denken3_portability.py` は OK。
