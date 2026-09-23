"""Apply source-image verifications to flagged practical explanations."""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CORRECTIONS = ROOT / "docs/evidence/fp2-two-year/practical-corrections"
QUESTIONS = ROOT / "data/questions/fp2/practical-2024-2025.json"


def update(edition: str, batch: str, number: int, *, explanation: str | None = None,
           choices: dict[str, str] | None = None, source: str) -> None:
    path = CORRECTIONS / f"{edition}-{batch}.json"
    rows = json.loads(path.read_text(encoding="utf-8"))
    row = next(item for item in rows if item["number"] == number)
    if explanation is not None:
        row["explanation"] = explanation
    if choices is not None:
        row["choiceExplanations"] = choices
    row["cleared"] = True
    row["remainingConcern"] = ""
    row["manualVerification"] = source
    path.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    path = CORRECTIONS / "202405-q31-36.json"
    rows = json.loads(path.read_text(encoding="utf-8"))
    q31 = next(row for row in rows if row["number"] == 31)
    q31_explanation = q31["explanation"].split("なお、選択肢1・2が適切かどうかは")[0]
    if "選択肢1は菜々美さん（2017年6月3日生）" not in q31_explanation:
        q31_explanation += (
        "選択肢1は菜々美さん（2017年6月3日生）が2032年2月3日に満14歳8ヵ月となり、"
        "その直後の12月1日（2032年、15歳になった年）に学資祝金を受け取るため適切。"
        "選択肢2は大雅さんを被保険者とする学資保険Dが18歳満期のため適切。"
        )
    q31_choices = dict(q31["choiceExplanations"])
    q31_choices["1"] = "適切。設例で菜々美さんは2017年6月3日生、学資保険Cの被保険者。満14歳8ヵ月は2032年2月3日で、直後の12月1日は15歳になる2032年。契約者の孝義さんに支払われる。"
    q31_choices["2"] = "適切。設例で学資保険Dの被保険者は大雅さん、18歳満期、契約者は孝義さん。18歳まで生存した場合に満期祝金が支払われる。"
    update("202405", "q31-36", 31, explanation=q31_explanation, choices=q31_choices,
           source="Official 202405 PDF pp.26-27: family DOBs and C/D policy definitions; public/fp2/practical/202405/case-q29-p26-1-20260923.webp")

    q36 = next(row for row in rows if row["number"] == 36)
    q36_explanation = q36["explanation"].split("保険料関係の10万円は、")[0]
    if "源泉徴収票の内訳は生命保険料控除8万円" not in q36_explanation:
        q36_explanation += "源泉徴収票の内訳は生命保険料控除8万円と地震保険料控除2万円で計10万円。住宅借入金等特別控除10万円は所得控除ではなく税額控除なので含めない。"
    update("202405", "q31-36", 36, explanation=q36_explanation,
           source="Official 202405 PDF p.34 withholding slip; public/fp2/practical/202405/q36-1.webp: social insurance 140万円, life 8万円, earthquake 2万円, mortgage tax credit 10万円")

    q40_explanation = (
        "公式解答は3（43,900円）。支給開始前の継続12ヵ月の標準報酬月額の平均は"
        "（380,000円×6ヵ月＋410,000円×6ヵ月）÷12＝395,000円。"
        "395,000円÷30＝13,166.66…円を10円未満四捨五入して13,170円、"
        "その3分の2は8,780円／日。原典の勤務表では2月10日〜12日の連続した休業3日で待期が完成し、"
        "13日は出勤、14日〜18日の休業5日が支給対象。公休日である17日・18日も含む。"
        "8,780円×5日＝43,900円。"
    )
    q40_choices = {
        "1": "17,560円は8,780円×2日。原典の勤務表では待期後の14日〜18日の休業5日が支給対象であり、2日と数えるのは3日不足するため誤り。",
        "2": "26,340円は8,780円×3日。14日〜16日の平日だけを数え、17日・18日の公休日を除いている。待期後の公休日も対象なので誤り。",
        "3": "正しい。10日〜12日の3日で待期完成、13日出勤、14日〜18日の5休業日（公休日を含む）が対象で、8,780円×5日＝43,900円。",
        "4": "70,240円は8,780円×8日。10日〜12日の待期3日と14日〜18日の支給対象5日を合算している。待期3日は支給されないため誤り。",
    }
    update("202405", "q37-40", 40, explanation=q40_explanation, choices=q40_choices,
           source="Official 202405 PDF p.37 calendar; public/fp2/practical/202405/q40-1.webp: 10-12休業, 13出勤, 14-18休業")

    update("202409", "q07-12", 7,
           source="Official 202409 PDF p.8 figure; public/fp2/practical/202409/q07-complete-zoning-20260923.webp: one 6m road, 150㎡/50㎡ zones")
    update("202501", "q07-12", 7,
           source="Official 202501 PDF p.8 figure; public/fp2/practical/202501/q07-complete-lot-20260923.webp: two 4m/5m roads, 150㎡ lot")

    p19_24 = CORRECTIONS / "202501-q19-24.json"
    rows19 = json.loads(p19_24.read_text(encoding="utf-8"))
    q19 = next(row for row in rows19 if row["number"] == 19)
    explanation19 = q19["explanation"].replace(
        "この解説は、親族関係図で「父がすでに死亡し、母が存命」となっている場合を前提にしています。この前提は公式解答および(ウ)の設問文と整合します。",
        "原典の親族関係図では父がすでに死亡し、母が存命です。",
    )
    update("202501", "q19-24", 19, explanation=explanation19,
           source="Official 202501 PDF family diagram; public/fp2/practical/202501/q19-1.webp: father deceased, mother surviving")
    update("202501", "q19-24", 22,
           source="Canonical 202501 Q22 body trimmed at end of choice 4; Q23/Q24 family and cashflow moved to shared context")
    q24 = next(row for row in rows19 if row["number"] == 24)
    explanation24 = q24["explanation"].replace(
        "この解説は、空欄(イ)が基本生活費の行の2028年(基準年から4年後)の列にあるという前提で計算しています。",
        "原典のキャッシュフロー表で空欄(イ)は基本生活費の2028年（基準年から4年後）の列にあります。",
    )
    update("202501", "q19-24", 24, explanation=explanation24,
           source="Official 202501 cashflow chart; public/fp2/practical/202501/q23-q24-cashflow-20260923.webp: (イ) at 2028 basic living costs")

    p202409_19 = CORRECTIONS / "202409-q19-24.json"
    rows_202409_19 = json.loads(p202409_19.read_text(encoding="utf-8"))
    q22 = next(row for row in rows_202409_19 if row["number"] == 22)
    explanation22 = q22["explanation"].replace(
        "【前提】この解説は、次の関係を前提にしている。",
        "【原典の親族関係図】次の関係を確認できる。",
    ).replace("なお、親族関係図の「(すでに死亡)」が誰に付いているかは、図で確認できていない。", "")
    update("202409", "q19-24", 22, explanation=explanation22,
           source="Official 202409 family diagram; public/fp2/practical/202409/q22-1.webp: both parents and sister deceased, nephew and niece shown")
    q24_202409 = next(row for row in rows_202409_19 if row["number"] == 24)
    explanation24_202409 = q24_202409["explanation"].replace(
        "空欄(ア)は、基準年から4年後(2027年)の基本生活費であることを前提にしている。",
        "原典の表で空欄(ア)は基準年から4年後（2027年）の基本生活費の列にある。",
    )
    update("202409", "q19-24", 24, explanation=explanation24_202409,
           source="Official 202409 cashflow table; public/fp2/practical/202409/q24-q25-cashflow-20260923.webp: (ア) 2027 basic living costs")

    update("202409", "q25-30", 25,
           explanation="公式模範解答は793万円。原典の表で空欄(イ)は2026年の金融資産残高。前年2025年末残高686万円に運用率1%を掛け、2026年の年間収支を加える。2026年は収入合計1,066万円、支出合計966万円なので年間収支100万円。686×1.01＋(1,066－966)＝792.86万円。計算途中は丸めず、最後に万円未満を四捨五入して793万円。",
           source="Official 202409 cashflow table; public/fp2/practical/202409/q24-q25-cashflow-20260923.webp: 2025 balance686, 2026 income1066/expense966, 1% growth")

    p202409_31 = CORRECTIONS / "202409-q31-36.json"
    rows_202409_31 = json.loads(p202409_31.read_text(encoding="utf-8"))
    q32 = next(row for row in rows_202409_31 if row["number"] == 32)
    explanation32 = q32["explanation"].replace(
        "【参考（逆算）】公式解答から逆算すると、手取り年収は850万円と考えられる。この場合の計算は次のとおり。",
        "【設例の収入】真治さん480万円と亜紀さん370万円の手取り年収合計は850万円。計算は次のとおり。",
    ).replace("ただし、850万円という手取り年収は設例本文で確認できていない。", "")
    update("202409", "q31-36", 32, explanation=explanation32,
           source="Official 202409 shared case p.26: take-home incomes 480万円 and 370万円, total 850万円")
    q33 = next(row for row in rows_202409_31 if row["number"] == 33)
    explanation33 = q33["explanation"].replace("（Q34の設定）", "（設例の生年月日1987年2月13日による）")
    choices33 = dict(q33["choiceExplanations"])
    choices33["4"] = "不適切。設例では亜紀さんは会社員（正社員）で手取り給与年収370万円。自ら勤務先の健康保険に加入する立場で、収入も被扶養者の年収要件130万円未満を超える。真治さんの被扶養者にはできない。"
    update("202409", "q31-36", 33, explanation=explanation33, choices=choices33,
           source="Official 202409 shared case p.26: husband DOB 1987-02-13, wife full-time employee with take-home annual salary 370万円")

    update("202409", "q37-40", 37,
           explanation="公式模範解答は3（4,900万円）。原典の保険一覧では、裕介さんのがん死亡で支払われるのは定期保険A 1,000万円、終身保険B 300万円、終身保険E 300万円の計1,600万円。Bの災害割増特約300万円はがん死亡には適用しない。現金・預貯金は裕介さん2,460万円＋倫子さん370万円＝2,830万円、株式・投資信託は1,250万円＋200万円＝1,450万円。裕介さん死亡後も続く妻被保険者の終身保険C・Dの解約返戻金は180万円＋150万円＝330万円。死亡により消滅するB・Eの返戻金は加えない。合計は1,600＋2,830＋1,450＋330＝6,210万円。事業用借入1,310万円を返済すると4,900万円。住宅ローン620万円は団体信用生命保険で弁済されるため、死亡保険金等から二重に差し引かない。賃貸アパート敷金30万円も設問の指定により除外する。",
           choices={
               "1": "4,280万円は正しい4,900万円から住宅ローン620万円をもう一度差し引いた金額。住宅ローンには団体信用生命保険が付いており、死亡時に弁済されるため二重計上になる。",
               "2": "4,880万円は原典の死亡保険金1,600万円、金融資産4,610万円、事業用借入1,310万円を用いた正しい計算4,900万円より20万円少ない。資料の金額を再確認すると一致しないため誤り。",
               "3": "正しい。死亡保険金1,600万円＋現預金2,830万円＋株式等1,450万円＋存続する保険の返戻金330万円－事業用借入1,310万円＝4,900万円。",
               "4": "5,200万円は正しい4,900万円に災害割増特約300万円を加えた金額。設問はがん死亡であり、災害割増特約は支払われないため誤り。",
           },
           source="Official 202409 PDF pp.32-33; public/fp2/practical/202409/case-q36-p33-1-20260923.webp: insurance A-E and debt/cash asset tables")

    update("202501", "q31-36", 34,
           explanation="公式模範解答は（ア）2・（イ）5・（ウ）8。（ア）原典の出勤表では1月15日は休業、16日は出勤で連続した待期がいったん途切れる。17日の休業と18・19日の公休日（労務不能）で連続3日の待期が完成し、4日目の20日の休業から支給開始。よって1月20日（語群2）。19日は待期3日目なので支給開始ではなく、23日まで待つ必要もない。（イ）1日当たりの額は支給開始前12ヵ月の標準報酬月額平均×1/30×2/3（語群5）。（ウ）支給期間は開始日から通算して最長1年6ヵ月（語群8）。",
           source="Official 202501 PDF p.31; public/fp2/practical/202501/q34-complete-calendar-20260923.webp: 15休業, 16出勤, 17休業, 18-19公休日, 20-23休業")

    p202501_37 = CORRECTIONS / "202501-q37-40.json"
    rows_202501_37 = json.loads(p202501_37.read_text(encoding="utf-8"))
    q39 = next(row for row in rows_202501_37 if row["number"] == 39)
    explanation39 = q39["explanation"]
    if "設例の生年月日" not in explanation39:
        explanation39 = (
            "設例の生年月日では照之さんは1967年6月27日生、孝子さんは1968年10月18日生、"
            "子は2000年・2004年生。照之さんが65歳になる2032年6月に孝子さんは63歳で、"
            "子は18歳到達年度末を過ぎている。"
        ) + explanation39
    update("202501", "q37-40", 39, explanation=explanation39,
           source="Official 202501 PDF p.32 family birth dates; data/questions/fp2/practical-shared-context-2024-2025.json 202501 Q39")

    update("202505", "q07-12", 8,
           source="Official 202505 PDF p.4; public/fp2/practical/202505/q08-complete-lot-20260923.webp: corner lot along 6m and 10m roads")
    update("202505", "q13-18", 17,
           source="Official 202505 PDF fire premium table; public/fp2/practical/202505/q17-1.webp: 4,110円 is merged across 茨城・埼玉・千葉 row for ロ構造")

    q23_202505 = (
        "公式解答は（ア）×・（イ）○・（ウ）×。原典の親族図では父母とも存命、"
        "姉、配偶者、相続放棄した子が描かれ、子の子は描かれていない。"
        "相続放棄は代襲原因ではなく、その子は初めから相続人でなかったとみなされる（民法939条）。"
        "直系卑属の相続人がいないため、第2順位の父母と配偶者が相続人になる。"
        "（ア）配偶者と直系尊属の場合、配偶者の法定相続分は2/3であり3/4ではないので×。"
        "（イ）姉は第3順位で相続人にならず、兄弟姉妹にはそもそも遺留分がないため○。"
        "（ウ）父の法定相続分は直系尊属全体1/3の半分で1/6、個別的遺留分は1/2×1/6＝1/12。"
        "1/8という記述は誤りなので×。"
    )
    update("202505", "q19-24", 23, explanation=q23_202505,
           choices={
               "ア": "×。子は放棄しており、配偶者と存命の父母が相続人。配偶者の法定相続分は2/3で、兄弟姉妹と相続する場合の3/4ではない。",
               "イ": "○。姉は直系尊属が存命のため相続人ではない。兄弟姉妹には遺留分も認められない。",
               "ウ": "×。父母はともに存命。父の法定相続分1/6に総体的遺留分1/2を掛けて個別的遺留分は1/12。1/8ではない。",
           },
           source="Official 202505 family diagram; public/fp2/practical/202505/q23-1.webp: both parents alive, child renounced, no grandchild shown")
    update("202505", "q25-30", 28,
           explanation="公式模範解答は464万円。原典のキャッシュフロー表では空欄（ア）が給与収入（本人）の3年後の列にある。基準年の450万円に年1％の変動率を3年分複利で掛け、450×1.01³＝463.63545万円。計算途中は丸めず、最後に万円未満を四捨五入して464万円。",
           source="Official 202505 cashflow table; public/fp2/practical/202505/q28-1.webp: (ア) in 3-years-later column")

    data = json.loads(QUESTIONS.read_text(encoding="utf-8"))
    for edition, number, marker in [
        ("202501", 22, "\n\n<永井家の家族データ>"),
        ("202405", 34, "\n\n<設例>"),
        ("202409", 23, "\n\n<露木家の家族データ>"),
        ("202501", 34, "\n\n<設例>"),
    ]:
        row = data[edition]["questions"][number - 1]
        if marker in row["body"]:
            row["body"] = row["body"].split(marker, 1)[0].rstrip() + "\n"
    QUESTIONS.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
