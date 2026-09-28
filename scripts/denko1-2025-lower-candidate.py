"""Build isolated 2025 lower Denko1 review candidates and exact PDF row crops.

This script deliberately writes only under docs/evidence/denko1-2025-lower-hold.
It does not import candidates into the public question loader or approve them.
"""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
import sys

import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / "docs/evidence/denko1-2025-lower-hold"
OUTPUT = EVIDENCE / "reviewed-candidate"
MEDIA = OUTPUT / "media"
RAW = ROOT / "data/raw_pdfs/denko1/review/batches"
LABELS = ("イ", "ロ", "ハ", "ニ")
CHOICE_RE = re.compile(r"(?<!\S)([イロハニ])．")


def compact(value: str) -> str:
    return re.sub(r"\s+", "", value.strip()).replace("，", "、")


def extracted_choices(value: str) -> dict[str, str]:
    matches = list(CHOICE_RE.finditer(value))
    if [m.group(1) for m in matches] != list(LABELS):
        raise ValueError(f"Broken choice labels: {value!r}")
    return {
        m.group(1): compact(value[m.end():matches[i + 1].start() if i + 1 < 4 else None])
        for i, m in enumerate(matches)
    }


# Exact reading of typography and figure-only options from official print pages.
# Other prose is whitespace-normalized directly from PDF text and backed by a crop.
QUESTIONS = {
    1: "図のような平行平板キャパシタにおいて、電極間に100 Vの電圧を加えたとき、空気中のキャパシタ内の電界の強さE［V/m］は。ただし、電極間の距離d=1×10⁻³ m、電界は平等電界とする。",
    2: "図のような直流回路において、スイッチSが開いているとき抵抗Rの両端の電圧は36 Vであった。Sを閉じたときのRの両端の電圧［V］は。",
    3: "図のように、角周波数ω=500 rad/s、電圧100 Vの交流電源に、抵抗R=3 ΩとインダクタンスL=8 mHが接続されている。回路に流れる電流I［A］は。",
    4: "図のような交流回路において、10 Ωの抵抗の消費電力［W］は。ただし、ダイオードの電圧降下や電力損失は無視する。交流電源は100 V。",
    5: "図のような三相交流回路において、電源電圧はV［V］、抵抗R=5 Ω、誘導性リアクタンスXL=3 Ωである。回路の全消費電力［W］を示す式は。",
    6: "図のような単相3線式電路において、スイッチAとBを閉じたとき図中の電圧Vは102 Vであった。Aを閉じたままBを開いた場合、Vはどう変化するか。ただし電源電圧は各104 V、電線1線の抵抗は0.2 Ω、各負荷抵抗は10.2 Ωで一定。",
    7: "図のような単相3線式配電線路において、負荷AとBはともに800 W、力率0.8（遅れ）、負荷電圧100 Vである。配電線路の電力損失［W］は。ただし電線1線の抵抗は0.4 Ω、リアクタンスは無視する。",
    8: "図のような配電線路において、抵抗負荷R1に50 A、R2に70 Aの電流が流れる。一次側電流I［A］は。ただし損失と励磁電流は無視する。一次電圧6,000 V、二次は100 V＋100 V。",
    9: "図の低圧屋内幹線からの分岐回路を600 V VVRケーブルで配線する。分岐点から配線用遮断器までの長さaと太さbの組合せとして不適切なものは。ただし幹線遮断器は100 A、VVRの許容電流は原本図の表による。",
    13: "浮動充電方式の直流電源装置の構成図として、正しいものは。",
    16: "図は自然循環ボイラの構成図である。図中の①、②、③の組合せとして正しいものは。",
    17: "全揚程H［m］、揚水量Q［m³/s］の揚水ポンプの電動機入力［kW］を示す式は。ただし電動機効率をηm、ポンプ効率をηpとする。",
    30: "①に示す地絡継電装置付高圧交流負荷開閉器（UGS）に関する記述として、不適切なものは。",
    41: "①で示す機器の動作特性試験に用いるものは。",
    42: "②で示す部分の施工で使用しないものは。",
    43: "③で示すa、b、cの機器について、点検時に停電させるための開路手順として最も不適切なものは。",
    44: "④で示す装置を使用する主な目的は。",
    45: "⑤で示す図記号の器具の名称は。",
    46: "⑥に設置する機器として一般的に使用されるものの図記号は。",
    47: "⑦で示す機器の役割は。",
    48: "⑧で示す機器の名称は。",
    49: "⑨で示す部分に使用するCVTケーブルとして適切なものは。",
    50: "⑩で示す動力制御盤内から電動機に至る配線で必要な電線本数（心線数）は。",
}

CHOICES = {
    1: ("1×10²", "1×10³", "1×10⁴", "1×10⁵"),
    5: ("3V²/5", "V²/3", "V²/5", "V²"),
    9: ("a：2 m、b：直径2.0 mm", "a：5 m、b：断面積5.5 mm²", "a：7 m、b：断面積8 mm²", "a：10 m、b：断面積14 mm²"),
    13: ("蓄電池が整流器と負荷の直列経路にある構成図", "負荷が整流器の交流側にある構成図", "蓄電池が交流電源側に接続された構成図", "整流器の直流出力に蓄電池と負荷を並列接続した構成図"),
    17: ("9.8QH/(ηpηm)", "9.8ηpηm/(QH)", "9.8Hηpηm/Q", "9.8QHηpηm"),
    20: ("過電流継電器・高圧柱上気中開閉器", "地絡継電器・高圧真空遮断器", "地絡方向継電器・高圧柱上気中開閉器", "過電流継電器・高圧真空遮断器"),
    25: ("金属系あと施工アンカーの写真", "ボルト締めの電線接続金具の写真", "圧着スリーブの写真", "差込形コネクタの写真"),
    30: ("波及事故を防止するため、一般送配電事業者の地絡保護継電装置と動作協調をとる必要がある。", "電路に地絡が生じた場合、自動的に電路を遮断する機能を内蔵している。", "短絡事故を遮断する能力を有する必要がある。", "定格短時間耐電流は、系統（受電点）の短絡電流以上のものを選定する。"),
    36: ("電力計・電力量計", "電力量計・無効電力量計", "無効電力量計・最大需要電力計", "最大需要電力計・電力計"),
    41: ("漏えい電流・動作時間の試験器の写真", "V・A・φの計器を持つ地絡継電器試験器の写真", "mA・kV計器を持つ試験器の写真", "11 kV・5 kVAと表示された耐電圧試験用機器の写真"),
    42: ("ラチェット式工具の写真", "黄色グリップのE形リングスリーブ用圧着工具の写真", "ケーブル外装・絶縁体処理工具の写真", "ケーブル切断・外装処理工具の写真"),
    43: ("b→a→c", "c→b→a", "a→b→c", "c→a→b"),
    46: ("電磁接触器と避雷器の図記号", "交流遮断器と避雷器の図記号", "負荷開閉器と避雷器の図記号", "断路器と避雷器の図記号"),
    49: ("三心を共通外装に収め、各心に半導電層・銅シールドがある断面図", "架橋ポリエチレン絶縁・ビニルシースの単心CVケーブル3本をより合わせた断面図", "各心に半導電層・銅シールドを持つ高圧ケーブルの断面図", "ビニル絶縁の三心を共通シースに収めた断面図"),
}

# Pixel boxes of the four original figure-only choices within each exact row crop.
# The full row crops remain the comparison evidence; these have the choice labels
# retained so that final QA can compare correspondence before public editing.
CHOICE_CROP_BOXES = {
    13: [(425, 0, 610, 315), (610, 0, 800, 315), (800, 0, 985, 315), (985, 0, 1160, 315)],
    25: [(425, 0, 795, 225), (795, 0, 1160, 225), (425, 225, 795, 445), (795, 225, 1160, 445)],
    41: [(370, 0, 775, 370), (775, 0, 1160, 370), (370, 370, 775, 725), (775, 370, 1160, 725)],
    42: [(370, 0, 775, 260), (775, 0, 1160, 260), (370, 260, 775, 500), (775, 260, 1160, 500)],
    46: [(370, 0, 565, 300), (565, 0, 760, 300), (760, 0, 955, 300), (955, 0, 1160, 300)],
    49: [(370, 0, 760, 280), (760, 0, 1160, 280), (370, 280, 760, 550), (760, 280, 1160, 550)],
}


def load_questions() -> list[dict]:
    rows: list[dict] = []
    for path in sorted(RAW.glob("20251005-q*.json")):
        payload = json.loads(path.read_text(encoding="utf-8"))
        rows.extend(payload["questions"])
    if [r["number"] for r in rows] != list(range(1, 51)):
        raise ValueError("Expected one official extraction for each Q1-Q50")
    return rows


def load_reasons() -> dict[int, dict]:
    result = {}
    for path in EVIDENCE.glob("reason-draft-q*.json"):
        payload = json.loads(path.read_text(encoding="utf-8"))
        for item in payload["questions"]:
            number = item["number"]
            if number in result:
                raise ValueError(f"Duplicate reason draft Q{number}")
            result[number] = item
    if set(result) != set(range(1, 51)):
        raise ValueError("Expected all 50 explanation drafts")
    return result


def crop(pdf: fitz.Document, page_number: int, rect: fitz.Rect, dest: Path) -> None:
    page = pdf[page_number - 1]
    clip = rect & page.rect
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), clip=clip, alpha=False)
    pix.save(dest)


def build(question_pdf: Path) -> None:
    pdf = fitz.open(question_pdf)
    if hashlib.sha256(question_pdf.read_bytes()).hexdigest() != "635c811dbee7dd6c5605c856a8250285a4c99ef80a0609793600cb0d011ef451":
        raise ValueError("Unexpected official PDF hash")
    rows = load_questions()
    drafts = load_reasons()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    MEDIA.mkdir(parents=True, exist_ok=True)
    crop(pdf, 10, fitz.Rect(70, 75, 655, 900), MEDIA / "shared-q30-34.png")
    crop(pdf, 13, fitz.Rect(135, 135, 565, 880), MEDIA / "shared-q41-50.png")
    candidates = []
    for row in rows:
        number = row["number"]
        draft = drafts[number]
        raw_choices = extracted_choices(row["choicesRaw"])
        choices = dict(zip(LABELS, CHOICES[number])) if number in CHOICES else raw_choices
        if number == 39:
            choices["ハ"] = "定格静電容量100 μFの進相コンデンサ"
        if number == 30:
            choices["イ"] = choices["イ"].removeprefix("荷")
        if number == 34:
            choices["イ"] = choices["イ"].removeprefix("に")
        question = QUESTIONS.get(number, compact(row["questionRaw"]))
        if number == 39:
            question = question.replace("100F", "100 μF")
        reasons = draft["choices"]
        if set(choices) != set(LABELS) or set(reasons) != set(LABELS) or row["officialAnswer"] != draft["answer"]:
            raise ValueError(f"Incomplete or conflicting Q{number}")
        image = f"media/q{number:02}.png"
        top, bottom = row["rowY"]
        crop(pdf, row["page"], fitz.Rect(87, max(78, top - 3), 680, min(930, bottom + 3)), MEDIA / f"q{number:02}.png")
        shared = "media/shared-q30-34.png" if 30 <= number <= 34 else "media/shared-q41-50.png" if 41 <= number <= 50 else None
        candidate = {
            "number": number,
            "question": question,
            "choices": choices,
            "officialAnswer": row["officialAnswer"],
            "explanation": draft.get("calculation") or draft.get("principle") or draft.get("reason") or "",
            "choiceExplanations": reasons,
            "reviewedFromCrop": image,
            "imageUrls": [shared, image] if shared else [image],
            "sourcePage": row["page"],
            "sourceAttribution": f"出典：令和7年度下期第一種電気工事士学科試験 問{number}（電気技術者試験センター）。設問の改行・空白と表記を整え、図のみの選択肢は識別用の説明を追加。原本図版を切り出した。",
            "sourceQuestionPdfUrl": "https://www.shiken.or.jp/construction/upload/20251005_co_first_q01.pdf",
            "sourceAnswerPdfUrl": "https://www.shiken.or.jp/construction/upload/20251005_co_first_a01.pdf",
            "publicationStatus": "HOLD",
            "normalizationStatus": "CANDIDATE_PENDING_FINAL_QA",
        }
        if draft.get("regulationSource"):
            candidate["officialReferenceUrls"] = [draft["regulationSource"]]
            candidate["lawReferenceDate"] = "2024-10-22"
        if number in CHOICE_CROP_BOXES:
            with Image.open(MEDIA / f"q{number:02}.png") as source:
                choice_paths = {}
                for label, bounds in zip(LABELS, CHOICE_CROP_BOXES[number]):
                    suffix = {"イ": "i", "ロ": "ro", "ハ": "ha", "ニ": "ni"}[label]
                    path = f"media/q{number:02}-{suffix}.png"
                    source.crop(bounds).save(OUTPUT / path)
                    choice_paths[label] = path
                candidate["choiceImageUrls"] = choice_paths
        if not candidate["explanation"]:
            raise ValueError(f"Missing overall explanation Q{number}")
        candidates.append(candidate)
    for start in range(1, 51, 10):
        path = OUTPUT / f"20251005-q{start:02}-{start + 9:02}.json"
        path.write_text(json.dumps(candidates[start - 1:start + 9], ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (OUTPUT / "MANIFEST.json").write_text(json.dumps({
        "publicationStatus": "HOLD",
        "questionCount": 50,
        "choiceCount": 200,
        "publicApprovalCount": 0,
        "sourceQuestionPdfSha256": "635c811dbee7dd6c5605c856a8250285a4c99ef80a0609793600cb0d011ef451",
        "sourceAnswerPdfSha256": "f377a1db85db4544c7c0d5b443cb7d6c139ba90f87826523eb6444625c8c8a56",
        "note": "Media paths are evidence-relative. Crops preserve original figures, photos, formulae and typography. Candidate text and image rights require final QA before any public loader or APPROVED change."
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"questions": 50, "choices": 200, "images": 76, "status": "HOLD"}))


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit(f"Usage: python {Path(__file__).name} OFFICIAL_QUESTION.pdf")
    build(Path(sys.argv[1]))
