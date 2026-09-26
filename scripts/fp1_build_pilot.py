"""Build the reviewed FP1 pilot JSON from fp1_extract_pilot.py output."""

import json
import re
import sys
from pathlib import Path


HERE = Path(__file__).resolve().parents[1]
OUTPUT = HERE / "data/questions/fp1/launch.json"
KEYS = {"1": "ア", "2": "イ", "3": "ウ", "4": "エ"}
ANSWERS = {1: "イ", 16: "ア", 20: "ウ", 22: "イ", 48: "イ"}
CATEGORIES = {1: "ライフプランニングと資金計画", 16: "金融資産運用", 20: "金融資産運用", 22: "金融資産運用", 48: "相続・事業承継"}
TAGS = {1: ["年金現価係数", "複利"], 16: ["経済指標", "消費者物価指数"], 20: ["株価指数", "FTSE100"], 22: ["CAPM", "ベータ"], 48: ["配当還元方式", "非上場株式"]}
EXPLANATIONS = {
    1: (
        "前半5年の現在価値は80万円×4.5797＝366.376万円。後半20年の65歳時点の現在価値は120万円×14.8775＝1,785.3万円で、5年分の現価係数0.8626を掛けて60歳時点に戻します。合計は1,906.37578万円で、万円未満を切り上げて1,907万円です。",
        {"ア": "後半20年の受取額を60歳時点に割り引いた額を十分に含めておらず、公式の1,907万円と一致しません。", "イ": "前半5年と後半20年の年金現価を60歳時点で合算し、万円未満を切り上げた1,907万円です。", "ウ": "後半20年の受取額を65歳時点で現在価値にした後、60歳へ5年間割り引く必要があります。2,152万円にはなりません。", "エ": "異なる開始時点の年金現価をそのまま足すことはできません。後半を60歳時点へ割り引くと1,907万円です。"},
        [],
    ),
    16: (
        "消費者物価指数は世帯が購入する財・サービスの価格変化を測り、原材料・中間財・設備機械を直接の対象に含めません。有効求人倍率の公表主体は厚生労働省ですが景気動向指数では一致系列です。鉱工業生産指数は先行ではなく一致系列、短観の業況判断DIは『良い』割合から『悪い』割合を引きます。",
        {"ア": "適切です。総務省のCPIは家計が購入する財・サービスを対象とし、原油などの原材料や中間財、設備機械は含みません。", "イ": "有効求人倍率は内閣府の景気動向指数では一致系列です。先行系列とする部分が誤りです。", "ウ": "鉱工業生産指数は景気動向指数の一致系列です。遅行系列とする部分が誤りです。", "エ": "短観の業況判断DIは『良い』の回答割合から『悪い』の回答割合を差し引いた値です。『良い』の割合のみではありません。"},
        ["https://www.stat.go.jp/data/cpi/4-1.htm", "https://www.esri.cao.go.jp/jp/stat/di/di3.html", "https://www.boj.or.jp/statistics/tk/"],
    ),
    20: (
        "FTSE100はロンドン証券取引所上場の大手100社を対象とする時価総額加重型指数です。TOPIXは東証の全上場銘柄ではなく構成銘柄の選定要件があります。DAXも全銘柄ではありません。ダウ工業株30種は時価総額加重ではなく株価平均型です。",
        {"ア": "TOPIXは各市場の全銘柄を無条件で含む指数ではありません。対象市場・流動性など構成銘柄の選定要件があります。", "イ": "DAXはフランクフルト証券取引所の全上場銘柄ではなく、選定された主要銘柄を対象とします。", "ウ": "適切です。FTSE100はロンドン証券取引所に上場する大手100社を対象とする時価総額加重型指数です。", "エ": "ダウ工業株30種は代表30銘柄の株価平均型指数です。時価総額加重型とする部分が誤りです。"},
        ["https://www.jpx.co.jp/markets/statistics-equities/misc/01.html", "https://www.lseg.com/en/ftse-russell/indices/uk", "https://www.spglobal.com/spdji/en/landing/investment-themes/the-dow/"],
    ),
    22: (
        "ベータは市場全体の変動に対する感応度です。同じ市場を対象としベータがともに1を超える場合、ベータが高い方が市場変動に対する反応が大きくなります。安全資産のベータは0で、ポートフォリオのベータは構成資産の加重平均です。CAPM上の期待収益率との差はジェンセンのアルファで測ります。",
        {"ア": "安全資産のベータは0です。市場ポートフォリオのベータが1です。", "イ": "適切です。同じ市場を基準とするなら、ベータが大きいほど市場変動への感応度が高くなります。", "ウ": "ポートフォリオのベータは各構成資産のベータの構成比率による加重平均であり、必ずそれより小さくなるわけではありません。", "エ": "CAPMが示す期待収益率に対する超過収益はジェンセンのアルファです。トレイナーの測度は超過収益をベータで割る指標です。"},
        ["https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/portfolio-risk-return-part-2"],
    ),
    48: (
        "直前2期の年配当金額の平均は(180万円＋120万円)÷2＝150万円です。1株当たりの年配当額は150万円÷3万株＝50円。資本金等の額は1株当たり1,500万円÷3万株＝500円です。配当還元価額は、50円基準に換算した配当額5円÷10％×(500円÷50円)＝500円です。",
        {"ア": "2期平均の年配当金額と1株当たり資本金等の額から算出すると500円であり、400円ではありません。", "イ": "適切です。2期平均年配当150万円と発行済株式3万株から1株当たり配当50円を求め、配当還元方式で500円となります。", "ウ": "直前期の年配当180万円だけで計算してはいけません。直前2期の平均150万円を用います。", "エ": "配当還元価額は1株当たり資本金等の額500円を単純に2倍する計算ではありません。"},
        ["https://www.nta.go.jp/law/tsutatsu/kihon/sisan/hyoka_new/08/04.htm"],
    ),
}


def normalize(text: str) -> str:
    # PDF line wraps insert spaces inside Japanese words. Their removal is disclosed.
    return text.replace(" ", "")


def main() -> None:
    extracted = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8-sig"))
    rows = []
    for source in extracted:
        number = source["qNumber"]
        explanation, per_choice, refs = EXPLANATIONS[number]
        question = normalize(source["question"])
        if number == 1:
            extracted_coefficients = re.findall(r"\d+\.\d+", source["question"])
            expected_coefficients = [
                "1.1593", "0.8626", "5.3091", "0.1884", "4.5797", "0.2184",
                "1.5580", "0.6419", "18.5989", "0.0538", "11.9379", "0.0838",
                "1.8061", "0.5537", "26.8704", "0.0372", "14.8775", "0.0672",
            ]
            if extracted_coefficients != expected_coefficients:
                raise ValueError("Q1 coefficient table differs from the official extraction")
            question = question.split("〈年３％の各種係数〉")[0] + (
                "\n〈年３％の各種係数〉\n"
                "|年数|終価係数|現価係数|年金終価係数|減債基金係数|年金現価係数|資本回収係数|\n"
                "|---|---:|---:|---:|---:|---:|---:|\n"
                "|５年|1.1593|0.8626|5.3091|0.1884|4.5797|0.2184|\n"
                "|15年|1.5580|0.6419|18.5989|0.0538|11.9379|0.0838|\n"
                "|20年|1.8061|0.5537|26.8704|0.0372|14.8775|0.0672|"
            )
        if number == 48:
            question = question.replace("。〈Ｘ社の配当金額等のデータ〉", "。\n〈Ｘ社の配当金額等のデータ〉\n")
            question = question.replace("・直前", "\n・直前")
        row = {
            "id": f"fp1-2026-may-gakka-q{number}", "exam": "fp1", "session": "gakka",
            "year": 2026, "season": "may", "qNumber": number, "examDate": "2026-05-24",
            "type": "multiple-choice", "category": CATEGORIES[number], "topicTags": TAGS[number],
            "difficulty": 4, "question": question,
            "choices": {KEYS[key]: normalize(value) for key, value in source["choices"].items()},
            "answer": ANSWERS[number], "officialAnswerNumber": str({v: k for k, v in KEYS.items()}[ANSWERS[number]]),
            "explanation": explanation, "choiceExplanations": per_choice, "explanationCoverage": "full",
            "hasImage": False,
            "sourcePdfUrl": "https://www.kinzai.or.jp/fp/news-fp/50260.html",
            "sourceAnswerUrl": "https://www.kinzai.or.jp/fp/news-fp/50274.html",
            "sourceAttribution": "出典：一般社団法人金融財政事情研究会 ファイナンシャル・プランニング技能検定1級 学科試験 基礎編（2026年5月）。改行・空白を整形し、選択肢番号1～4をア～エへ変更。",
            "officialReferenceUrls": refs, "license": "KINZAI-reuse-with-attribution",
            "lawReferenceDate": "2025-10-01", "lastUpdated": "2026-09-27",
        }
        rows.append(row)
    if [row["qNumber"] for row in rows] != sorted(ANSWERS):
        raise ValueError("The pilot must contain exactly questions 1, 16, 20, 22, 48")
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(rows)} questions to {OUTPUT}")


if __name__ == "__main__":
    main()
