"""Recalculate EM 2026 numeric items pinned to their official row images.

This proves the chosen numerical option only. The five separate reasons and
government-source review remain required before publication.
"""

from hashlib import sha256
import json
from math import pi, sqrt
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PAPERS = ROOT / "data/exam-library/papers"
OUT = ROOT / "docs/evidence/emkohyo-choice-sources/EM2026-simple-calculation-spotchecks-20260924.json"


def main() -> None:
    specs = [
        {"id": "emkohyo-EM20261808-q19",
         "operands": ["100 µg", "1.00 L", "39.1", "52.0", "16.0"],
         "formula": "(100 ug/mL * 1000 mL / 1000 ug/mg) * (2*39.1+2*52.0+7*16.0)/(2*52.0)",
         "value": 100 * (2*39.1+2*52.0+7*16.0)/(2*52.0),
         "unit": "mg K2Cr2O7", "printedChoices": [93.5, 141, 187, 283, 374]},
        {"id": "emkohyo-EM20261805-q14",
         "operands": ["142 秒", "194 秒", "4 秒", "6 秒"],
         "formula": "2 * (194 s - 142 s) / (4 s + 6 s)",
         "value": 2*(194-142)/(4+6), "unit": "resolution",
         "printedChoices": [0.5, 1, 5, 10, 15]},
        {"id": "emkohyo-EM20261804-q14",
         "operands": ["2.0 × 10-５", "1.0 × 10-５", "50 ％"],
         "formula": "100 * sqrt(0.50) (Beer-Lambert: half concentration halves absorbance)",
         "value": 100*sqrt(0.5), "unit": "% transmittance",
         "printedChoices": [80, 70, 60, 40, 30]},
        {"id": "emkohyo-EM20261807-q6",
         "operands": ["5000", "9000", "同じ"],
         "formula": "sqrt(N_A / N_B) = sqrt(5000 / 9000), equal retention time",
         "value": sqrt(5000/9000), "unit": "W_B/W_A",
         "printedChoices": [0.38, 0.56, 0.75, 1.34, 1.80]},
        {"id": "emkohyo-EM20261806-q3",
         "operands": ["2.65", "10.0 µm", "18.0 ℃", "0.01138", "0.01006", "980"],
         "formula": "eta18=0.01138+(0.01006-0.01138)*3/5; rho18=0.99913+(0.99823-0.99913)*3/5; t=10 cm*18*eta18/((2.65-rho18)*980*(10 um in cm)^2)",
         "value": 10*18*(.01138+(.01006-.01138)*3/5)
                  / ((2.65-(.99913+(.99823-.99913)*3/5))*980*(.001)**2),
         "unit": "seconds", "printedChoices": [1120, 1150, 1180, 1210, 1240],
         "displayedChoiceLabels": ["18分40秒", "19分10秒", "19分40秒", "20分10秒", "20分40秒"]},
        {"id": "emkohyo-20260217-4-q4",
         "operands": ["5.0L", "25℃", "1.0気圧", "二酸化炭素"],
         "formula": "C + O2 -> CO2; n_after=n_before and T,V unchanged, so P_after=P_before",
         "value": 1.0, "unit": "atmosphere",
         "printedChoices": [0.5, 1.0, 1.5, 2.0, 2.5]},
        {"id": "emkohyo-EM20261803-q17",
         "operands": ["2.0 × 10-５", "2.3 s-１", "35 ％", "60", "85 ％"],
         "formula": "2.3 s^-1 / ((2.0e-5/100) Bq/cm3 * 60 L/min *1000 cm3/L *0.35*0.85)",
         "value": 2.3 / ((2e-5/100)*60*1000*.35*.85),
         "unit": "minutes", "printedChoices": [57, 79, 8*60, 11*60, 644*60],
         "displayedChoiceLabels": ["57分", "79分", "8時間", "11時間", "644時間"]},
        {"id": "emkohyo-EM20261805-q19",
         "operands": ["1750.0", "2 mL", "0.1 L", "88.1", "90%"],
         "formula": "(1750 ug/mL*2 mL/0.90)/(0.1 L/min*6 h*60 min/h) * 24.4654 L/mol /88.1 g/mol",
         "value": (1750*2/.90)/(.1*6*60)*24.46540369703822/88.1,
         "unit": "ppm", "printedChoices": [3, 15, 30, 60, 120]},
        {"id": "emkohyo-EM20261807-q11",
         "operands": ["25mL", "1700", "0.25µg", "5300", "1.0L", "10分間"],
         "formula": "(1700/5300)*(0.25 ug/mL)*25 mL/(1.0 L/min*10 min/1000 L/m3)/1000 ug/mg",
         "value": (1700/5300)*.25*25/(1.0*10/1000)/1000,
         "unit": "mg/m3", "printedChoices": [.1, .2, .4, .6, .8]},
        {"id": "emkohyo-EM20261806-q18",
         "operands": ["20 mm", "1.26 mg", "280 cps", "1.25", "7000 cps"],
         "formula": "((280 cps/7000 cps)*1 mg/cm2)*pi*(20 mm/2 in cm)^2*1.25/1.26 mg*100",
         "value": (280/7000)*pi*(20/20)**2*1.25/1.26*100,
         "unit": "% quartz", "printedChoices": [3.2, 4.0, 7.6, 10.0, 12.5]},
        {"id": "emkohyo-EM20261807-q14",
         "operands": ["体積２ L", "1 g", "20 ℃", "53", "58", "142", "15 kPa", "59 kPa", "54 kPa"],
         "formula": "P_i=min((1 g/M_i)*R*T/(2 L), saturation pressure_i), T=293.15 K",
         "value": {name: min((1/mass)*8.314462618*293.15/2, saturation)
                   for name, mass, saturation in (("A",53,15), ("B",58,59), ("C",142,54))},
         "unit": "kPa", "choiceOrders": ["ACB", "BAC", "BCA", "CAB", "CBA"]},
    ]
    for spec in specs:
        paper = spec["id"].rsplit("-q", 1)[0]
        rows = json.loads((PAPERS / f"{paper}.json").read_text(encoding="utf-8"))
        row = next(item for item in rows if item["id"] == spec["id"])
        if any(operand not in row["text"] for operand in spec.pop("operands")):
            raise ValueError(f"Official operands changed: {spec['id']}")
        if "choiceOrders" in spec:
            order = "".join(sorted(spec["value"], key=lambda name: spec["value"][name], reverse=True))
            spec["computedOrder"] = order
            spec["nearestChoice"] = spec["choiceOrders"].index(order) + 1
        else:
            spec["nearestChoice"] = min(range(1, 6), key=lambda n: abs(spec["value"] - spec["printedChoices"][n-1]))
        spec["officialChoice"] = row["correctChoice"]
        if spec["nearestChoice"] != spec["officialChoice"]:
            raise ValueError(f"Arithmetic differs from official answer: {spec['id']}")
        spec["rowTextSha256"] = sha256(row["text"].encode("utf-8")).hexdigest()
        spec["officialImageSha256"] = {
            image: sha256((ROOT / "public" / image.lstrip("/")).read_bytes()).hexdigest()
            for image in row["images"]
        }
    OUT.write_text(json.dumps({"questions": specs,
                               "acceptance": "arithmetic only; direct five-choice government-source review pending"},
                              ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{OUT}: {len(specs)}/{len(specs)} numeric answers match official key")


if __name__ == "__main__":
    main()
