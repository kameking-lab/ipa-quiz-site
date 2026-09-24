# 電験三種の証跡を別チェックアウトで検証する

`docs/evidence/denken3/input/` は、既存の厳格査読receiptが固定した公式頁・一次資料と、source manifestの公式PDFを同一バイトで保存する。receipt内の元パスは変更しない。`denken3_cli.evidence_file` が元パスまたはこの追跡ミラーをSHA-256で照合する。生応答は既存の `docs/evidence/denken3/raw/` を照合し、成功した `claude-opus-5-5` のresultイベントまで確認する。両ミラーは `.gitattributes` で改行変換を禁止する。

検証コマンド:

```bash
python scripts/test_denken3_portability.py
python scripts/denken3-validate.py --local-pdfs --partial
python scripts/denken3-strict-status.py
python scripts/denken3-strict-status.py --require-complete
```

2026-09-24時点のPR #511 head `f58fbe6e` 由来の候補は316/320、追跡証跡で再検証できる厳格PASSは292/320。最後のコマンドは公開ゲートとして失敗する。残28単位は、候補がない4単位（2025上期法規問1、上期理論問12、下期法規問4、下期電力問1）と、既存候補に固定された参考資料または公式頁の原バイトがこの作業環境にない24単位。後者は2024下期法規4、2025上期法規8、2025下期法規12。候補・正答・図・既存のsource/candidate/evidence SHAを変更して数合わせしない。
