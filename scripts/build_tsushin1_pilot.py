"""Build the reviewed 2026 1級電気通信 pilot from official source extracts."""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

from extract_tsushin1_pilot import EVIDENCE, OUTPUT, SELECTED, extract


ROOT = Path(__file__).resolve().parents[1]
DESTINATION = ROOT / "data/questions/tsushin1/2026-september.json"
URL_ROOT = "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907e_"

# The page's two answer tables each begin with No.1-15. These arrays are read
# afresh from the official PDF and checked against the selected-answer ledger.
OFFICIAL_SELECTED = {
    "mondai-a": {5: 4, 8: 1, 11: 1, 12: 3, 13: 4, 14: 3, 15: 1, 16: 2},
    "mondai-b": {1: 3, 5: 2, 6: 3, 9: 1},
}

EDITORIAL = {
    "mondai-a": {
        5: ("電気通信技術", "情報量", "平均情報量は H＝－Σp log₂p です。0.5 の項は0.5 bit、0.25 の項は各0.5 bitで、合計1.5 bitです。", ["情報量は負にはなりません。計算結果の符号が逆です。", "0.13 bitは各事象の確率を重み付けした合計ではありません。", "0.13 bitにはなりません。各確率の対数を重み付けして加えます。", "0.5＋0.5＋0.5＝1.5 bitで適当です。"], []),
        8: ("電気通信技術", "2の補数", "8ビットの10010100は最上位ビットが1なので負数です。ビット反転して1を足すと01101100＝108となり、表す値は－108です。", ["ビット反転して1を足すと108なので、符号を付けた－108が正解です。", "反転後の値や符号を取り違えると－76になります。", "01101100は108であり、－40ではありません。", "計算した絶対値は108であり、－20ではありません。"], []),
        11: ("電気通信技術", "QAM", "16 QAMは直交する二つの搬送波成分について、それぞれ4段階の振幅を組み合わせて16状態を作ります。二つの4値PSK信号の合成とする選択肢1が不適当です。", ["直交する二成分の4段階の振幅の組合せで16状態を表します。4値PSKを二つ合成する説明は不適当です。", "QAMは直交する搬送波成分の振幅を変え、合成後の振幅と位相を変化させます。", "安定した受信レベルでは、16 QAMの信号点配置は16 PSKより大きな最小距離を取りやすく、誤り率に有利です。", "64 QAMは1シンボルに6 bit、16 QAMは4 bitを載せます。"], []),
        12: ("電気通信技術", "スペクトル拡散", "直接スペクトル拡散では信号の電力を広い帯域へ分散するので、通常は単位周波数当たりの電力スペクトル密度が小さくなります。大きくなるとする選択肢3が不適当です。", ["送信前に帯域を広げ、受信側で逆拡散する説明です。", "周波数ホッピングは送受信で遷移系列と時刻を合わせる必要があります。", "帯域を広げると電力スペクトル密度は通常低下します。『大きくなる』が誤りです。", "多元接続では相互相関の小さい符号を割り当てて利用者間の干渉を抑えます。"], ["https://tohoku.repo.nii.ac.jp/record/71442/files/150325-Miyake-5070-1.pdf"]),
        13: ("電気通信技術", "多重化", "WDMは光信号を異なる波長に分けて同じ光ファイバに重ねます。『同じ波長』とする選択肢4が不適当です。", ["OFDMは直交するサブキャリアを重ねて周波数利用効率を高めます。", "TDMは時間を分けて複数チャネルを伝送します。", "CDMは異なる符号を用いてチャネルを区別します。", "WDMは波長ごとにチャネルを分けるため、同じ波長ではありません。"], []),
        14: ("電気通信技術", "誤り制御", "インタリーブは送信順序を入れ替え、受信側で元に戻すことで連続するバースト誤りを分散します。誤り訂正符号と組み合わせると訂正しやすくなり、選択肢3が適当です。", ["水平垂直パリティで単一ビット誤りを特定できますが、任意の2ビット誤りまで訂正できるわけではありません。", "ARQは誤り検出後に再送を要求するため、再送制御と遅延が生じます。", "連続誤りを分散させ、誤り訂正符号の効果を高めます。", "FECで訂正できる誤りの数には符号の性能による限界があります。"], []),
        15: ("電気通信技術", "CPU", "CPUは主記憶から読み出した命令を内部のレジスタに取り込み、解読して実行します。選択肢1が適当です。", ["命令を内部レジスタに取り込み順に実行する説明です。", "命令の種類を示すのはオペコード部で、オペランド部は対象データやアドレスを指定します。", "CPIは命令当たりの平均クロック数です。1秒当たり百万命令はMIPSです。", "パイプライン処理は命令の処理段階を重ねる手法で、複数CPUへの分散処理とは異なります。"], []),
        16: ("電気通信技術", "ソフトウェア", "CPU処理やメモリの基本管理はOSの役割です。ミドルウェアはOSとアプリケーションの間で共通機能を提供するため、選択肢2が不適当です。", ["OSやミドルウェアはシステムソフトウェアに分類されます。", "CPUやメモリの基本管理を主に提供するのはOSです。", "特定の用途を担うアプリケーションの説明です。", "OSは基本機能とアプリケーション向け機能を提供します。"], []),
    },
    "mondai-b": {
        1: ("施工管理法", "公共工事契約", "公共工事標準請負契約約款では、現場代理人の権限から請負代金額の変更、請求・受領、契約解除などを除いています。これらを行使できるとする選択肢3が不適当です。", ["監督員の指示・承諾は原則として書面によります。", "搬入した工事材料の現場外搬出には原則として監督員の承諾が必要です。", "請負代金額の変更、請求・受領、契約解除は現場代理人の通常権限から除かれます。", "現場代理人と監理技術者等・専門技術者は兼務できます。"], ["https://www.mlit.go.jp/totikensangyo/const/1_6_bt_000092.html"]),
        5: ("施工管理法", "建設業法", "建設業法上の工事現場の標識には商号、代表者、一般・特定の別などを記します。設計者の氏名は標識の法定記載事項ではないため、選択肢2が正解です。", ["商号又は名称は標識に記載します。", "設計者の氏名は工事現場の建設業許可標識の記載事項ではありません。", "一般建設業又は特定建設業の別を記載します。", "代表者の氏名を記載します。"], ["https://www.mlit.go.jp/tochi_fudousan_kensetsugyo/const/content/all-data_R0704.pdf"]),
        6: ("施工管理法", "労働条件の明示", "労働条件の書面明示事項には就業場所・業務、始業と終業の時刻、退職に関する事項などがあります。福利厚生一般はこの設問の法定書面明示事項ではないため、選択肢3が正解です。", ["就業場所と従事する業務は明示事項です。", "始業・終業時刻は明示事項です。", "福利厚生一般は、ここで問われる書面明示の必須事項ではありません。", "退職に関する事項は明示事項です。"], ["https://www.mhlw.go.jp/bunya/roudoukijun/faq_kijyunhou_4.html"]),
        9: ("施工管理法", "統括安全衛生責任者", "統括安全衛生責任者は協議組織の運営、作業間の連絡調整、作業場所の巡視などを統括します。品質管理計画の作成・指導は列挙された安全衛生上の職務ではなく、選択肢1が正解です。", ["品質管理計画は、法令で列挙された統括安全衛生責任者の職務ではありません。", "協議組織の設置・運営は職務です。", "作業間の連絡・調整は職務です。", "作業場所の巡視は職務です。"], ["https://anzeninfo.mhlw.go.jp/yougo/yougo101_1.html"]),
    },
}


def official_answer_rows() -> list[list[int]]:
    import fitz

    pdf = EVIDENCE / "input/tsushin1-2026-answers.pdf"
    lines = fitz.open(pdf)[0].get_text().splitlines()
    rows = []
    for index, line in enumerate(lines):
        if line != "解答":
            continue
        values = []
        for value in lines[index + 1:]:
            if not re.fullmatch(r"[1-4]", value):
                break
            values.append(int(value))
        rows.append(values)
    if [len(row) for row in rows] != [15, 15, 15, 10, 15, 15, 5]:
        raise ValueError(f"Unexpected answer table structure: {[len(row) for row in rows]}")
    return rows


def main() -> None:
    source = json.loads(OUTPUT.read_text(encoding="utf-8"))
    rows = official_answer_rows()
    answer_lookup = {
        "mondai-a": {i + 1: answer for i, answer in enumerate(sum(rows[:4], []))},
        "mondai-b": {i + 1: answer for i, answer in enumerate(sum(rows[4:], []))},
    }
    papers = []
    for session, numbers in SELECTED.items():
        extracted = extract(session, numbers)
        if extracted != source[session]:
            raise ValueError(f"Official question extract changed for {session}")
        suffix = "a" if session == "mondai-a" else "b"
        items = []
        for item in source[session]["questions"]:
            number = item["number"]
            answer = answer_lookup[session][number]
            if answer != OFFICIAL_SELECTED[session][number]:
                raise ValueError(f"Answer ledger mismatch for {session} No.{number}")
            category, topic, explanation, choices, references = EDITORIAL[session][number]
            items.append({**item, "officialAnswerNumbers": [answer], "category": category, "topic": topic,
                          "officialReferenceUrls": references, "explanation": explanation,
                          "choiceExplanations": choices})
        papers.append({"session": session, "paper": suffix.upper(),
                       "officialQuestionCount": 55 if suffix == "a" else 35,
                       "publishedCount": len(items), "questionUrl": URL_ROOT + f"mondai{suffix}.pdf",
                       "questionSha256": source[session]["questionPdfSha256"], "questions": items})
    answer_pdf = EVIDENCE / "input/tsushin1-2026-answers.pdf"
    result = {"exam": "tsushin1", "year": 2026, "season": "september",
              "answerUrl": URL_ROOT + "seitou.pdf", "answerSha256": hashlib.sha256(answer_pdf.read_bytes()).hexdigest(),
              "papers": papers}
    DESTINATION.parent.mkdir(parents=True, exist_ok=True)
    DESTINATION.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Built {sum(len(paper['questions']) for paper in papers)} verified questions: {DESTINATION}")


if __name__ == "__main__":
    main()
