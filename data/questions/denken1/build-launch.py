"""Build the first small set of 2026 first-class electrician questions.

The official paper uses 15 kana choices per original question. We keep every
choice and split each of the three original five-blank questions into five
practice units. Answer strings below were checked against the official answer
sheet, by subject and original question number. Run with --check in CI.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
OFFICIAL = "https://www.shiken.or.jp/chief/upload/20260830_ch_first_"
KANA = "イロハニホヘトチリヌルヲワカヨ"
KEYS = "アイウエオカキクケコサシスセソ"

PAPERS = [
    {
        "subject": "power", "session": "denryoku", "category": "電力", "number": 2,
        "topic": "交流遮断器の故障遮断", "pdf": "q02.pdf", "pages": [6, 7],
        "answers": "チハヲワリ",
        "choices": ["異相地絡故障", "過渡回復点", "電流零点", "ループ電流", "電圧零点", "遠距離線路故障", "インパルス", "アーク", "進み小電流", "コロナ", "誘導電流", "端子短絡故障", "近距離線路故障", "遅れ小電流", "励磁電流"],
        "choiceNotes": ["異なる相で起こる地絡故障", "遮断後の回復電圧の変化を表す語", "交流電流が零になる瞬間", "回線間を循環する電流", "電圧が零になる瞬間", "遮断器から離れた線路の故障", "短時間の衝撃的な電圧・電流", "接点間の放電", "容量性負荷に流れる進み電流", "高電界による部分放電", "電磁誘導で生じる電流", "遮断器端子近傍の短絡故障", "遮断器から数キロメートルの線路故障", "誘導性負荷に流れる遅れ電流", "変圧器などの鉄心を磁化する電流"],
        "question": "次の文章は，交流遮断器の故障遮断と遮断責務に関する記述である。文中の空欄に当てはまる最も適切なものを解答群から選べ。\n\n電力系統に故障が発生すると，保護リレーからの指令により該当する遮断器を開放し，故障点を切り離す。遮断器が故障電流を遮断する場合，［(1)］エネルギーが極小となる［(2)］で遮断が行われる。遮断する電流や遮断後に遮断器の極間にかかる電圧は，電力系統や故障点によって異なるため，これらを踏まえた遮断性能を有する必要がある。特に厳しい遮断責務が要求されるのは，以下のケースである。\n・遮断器の設置箇所近傍で故障が発生し，大きな故障電流を遮断した際に過渡的な高い電圧が発生する［(3)］遮断\n・遮断器から数キロメートル離れた架空送電線で故障が発生し，遮断器と故障点の間の進行波の往復反射により高い急峻な電圧が発生する［(4)］遮断\n・無負荷充電送電線，ケーブル線路，コンデンサバンクなど容量性負荷の回路を遮断し，再点弧すると異常電圧が発生する［(5)］遮断",
        "why": [
            "遮断器の接点間にはアークが生じる。交流では電流零点付近でアークのエネルギーが小さくなり，消弧しやすい。",
            "交流電流が零になる電流零点でアークを消し，接点間の絶縁を回復して故障電流を遮断する。",
            "遮断器の端子に近い短絡故障では大きな電流の遮断後に高い過渡回復電圧がかかる。これは端子短絡故障の遮断責務である。",
            "遮断器から数キロメートルの架空送電線上の短絡では，線路上の進行波の反射によって急峻な回復電圧が生じる。これは近距離線路故障の遮断責務である。",
            "送電線やコンデンサなどの容量性負荷に流れる進み小電流を遮断するとき，再点弧による異常電圧に注意する。",
        ],
        "clue": ["接点間の放電", "交流電流が零になる瞬間", "遮断器端子の近くの短絡", "数キロメートル先の架空送電線故障", "容量性負荷の小電流"],
    },
    {
        "subject": "machinery", "session": "kikai", "category": "機械", "number": 3,
        "topic": "同期モータのトルク", "pdf": "q03.pdf", "pages": [6, 7],
        "answers": "ホカヌチリ",
        "choices": ["コンダクタンス", "巻線界磁同期モータ", "表面磁石同期モータ", "高透磁率鉄心", "電磁力", "電磁鋼板", "かご形誘導モータ", "同期リラクタンスモータ", "埋込磁石同期モータ", "インダクタンス", "ブラシレスDCモータ", "固定子電流", "クーロン力", "希土類磁石", "誘導起電力"],
        "choiceNotes": ["電気の流れやすさを示す量", "回転子に界磁巻線をもつ同期機", "回転子表面に磁石を配置した同期機", "磁束を通しやすい鉄心", "磁界と電流などの相互作用による力", "機器の鉄心に使う薄い鋼板", "かご形回転子の誘導機", "磁気抵抗の差で同期トルクを作る機種", "磁石を回転子内部に埋め込んだ同期機", "磁束と電流の関係を示す量", "電子整流で動く直流モータ", "固定子側の巻線を流れる電流", "静電荷間に働く力", "強い磁束を得られる永久磁石", "磁束変化により生じる電圧"],
        "question": "次の文章は，同期モータに関する記述である。文中の空欄に当てはまる最も適切なものを解答群から選べ。\n\n同期モータを理解するには，マグネットトルクとリラクタンストルクを知る必要がある。マグネットトルクは，固定子電流の回転磁界と磁石の磁束の相互作用によって生じる［(1)］に基づく。特に［(2)］を用いた永久磁石同期モータは，大きな磁束を得られ，電流当たりのトルクが大きい。\n\nリラクタンストルクは回転子構造に起因する。突極性をもつ回転子では，固定子に対する回転子位置によって，固定子から見た［(3)］が変化する。磁束の通りやすい方向へ回転子を回す力がリラクタンストルクとなる。これのみを使う代表例は［(4)］であり，［(2)］を使わず，回転子に巻線をもたない。\n\n二つのトルク発生原理を組み合わせる例として，回転子内部に永久磁石を埋め込み突極性をもたせた［(5)］がある。低速域では磁石によるトルク，高速域ではリラクタンストルクを活用し，トルク密度と効率を高める。",
        "why": [
            "固定子電流の作る回転磁界と磁石の磁束の相互作用による電磁力が，マグネットトルクを生む。",
            "希土類磁石は大きな磁束を得られるため，永久磁石同期モータのトルク密度を高められる。",
            "突極性があると磁路の通りやすさが回転子位置によって変わり，固定子から見たインダクタンスが変化する。",
            "同期リラクタンスモータは磁石や回転子巻線を使わず，回転子の磁気抵抗の位置依存性によるトルクを使う。",
            "埋込磁石同期モータは内部磁石のマグネットトルクに加え，突極性によるリラクタンストルクも使える。",
        ],
        "clue": ["磁束と電流の相互作用による力", "大きな磁束を得る永久磁石", "位置で変わる固定子から見た電気量", "磁石なしで磁気抵抗によるトルクを使う機種", "磁石を回転子内部に埋めた機種"],
    },
    {
        "subject": "law", "session": "houki", "category": "法規", "number": 1,
        "topic": "電気事業法と保安責務", "pdf": "q04.pdf", "pages": [4, 5],
        "answers": "ハヘヲヌリ",
        "choices": ["経済産業大臣", "するように設置", "設置", "利用", "都道府県知事", "するように維持", "運用", "関与する", "主務大臣", "従事する", "保安の業務", "保安の監督", "していることを確認", "業務の監督", "責任を有する"],
        "choiceNotes": ["経済産業行政を担う大臣の職名", "設備を新設する動作を述べる語", "工作物を設ける行為", "設備を使う行為", "都道府県の長", "適合状態を継続して保つ語", "設備を使って稼働させる行為", "関係することを示す語", "法律上の所管大臣", "工事・維持・運用の仕事に携わること", "保安に関わる業務全般", "保安に関する監督", "適合状況を確かめる行為", "業務一般の監督", "責任の有無を表す語"],
        "question": "次の文章は，「電気事業法」に基づく事業用電気工作物の保安の確保に係る関係者の責務についての記述である。文中の空欄に当てはまる最も適切なものを解答群から選べ。\n\na）事業用電気工作物を［(1)］する者は，事業用電気工作物を主務省令で定める技術基準に適合［(2)］しなければならない。\nb）事業用電気工作物（小規模事業用電気工作物を除く。）を［(1)］する者は，その工事，維持及び運用に関する［(3)］をさせるため，主任技術者免状の交付を受けている者のうちから主任技術者を選任しなければならない。\nc）事業用電気工作物の工事，維持又は運用に［(4)］者は，主任技術者がその保安のためにする指示に従わなければならない。\nd）［(5)］は，事業用電気工作物が技術基準に適合していないと認めるときは，設置する者に対して修理，改造，移転，使用の一時停止又は使用制限を命じることができる。",
        "why": [
            "電気事業法の技術基準適合維持義務と主任技術者選任義務を負う主体は，事業用電気工作物を設置する者である。",
            "電気事業法第39条は，設置者が事業用電気工作物を技術基準に適合するように維持する義務を定めている。",
            "電気事業法第43条では，主任技術者に工事，維持及び運用に関する保安の監督をさせるため，設置者が選任する。",
            "電気事業法第43条の指示遵守義務を負うのは，工事，維持又は運用に従事する者である。",
            "電気事業法第40条の技術基準適合命令を出せるのは主務大臣である。",
        ],
        "clue": ["工作物を持ち義務を負う主体の行為", "技術基準に適合した状態を保つ義務", "主任技術者が担う保安上の役割", "工事・維持・運用に携わる人", "技術基準への適合命令を出す行政主体"],
    },
]


def build() -> list[dict]:
    rows = []
    for paper in PAPERS:
        choices = dict(zip(KANA, paper["choices"], strict=True))
        assert len(choices) == 15 and len(set(choices.values())) == 15
        assert len(paper["choiceNotes"]) == 15
        for blank, answer in enumerate(paper["answers"], 1):
            assert answer in choices
            explanation = paper["why"][blank - 1]
            answer_text = choices[answer]
            question = paper["question"] + f"\n\n空欄({blank})に当てはまる最も適切なものを選べ。"
            reasons = {
                k: (f"正しい。{explanation}" if k == answer else
                    f"誤り。『{value}』は{paper['choiceNotes'][KANA.index(k)]}を指す。空欄({blank})は{paper['clue'][blank - 1]}を問うため，ここは『{answer_text}』が入る。")
                for k, value in choices.items()
            }
            to_key = dict(zip(KANA, KEYS, strict=True))
            row = {
                "id": f"denken1-2026-{paper['subject']}-q{paper['number']:02}-{blank}",
                "exam": "denken1", "session": paper["session"], "year": 2026,
                "season": "primary", "fiscalYear": 2026, "examDate": "2026-08-30",
                "subject": paper["subject"], "qNumber": paper["number"], "part": str(blank),
                "officialAnswerNumber": answer, "type": "multiple-choice",
                "category": paper["category"], "topicTags": [paper["category"], paper["topic"]],
                "difficulty": 3, "question": question,
                "choices": {to_key[k]: v for k, v in choices.items()},
                "answer": to_key[answer],
                "explanation": f"{explanation}\n\nよって空欄({blank})の正答は({answer})「{answer_text}」である。",
                "choiceExplanations": {to_key[k]: v for k, v in reasons.items()},
                "explanationCoverage": "full", "hasImage": False,
                "sourcePdfUrl": OFFICIAL + paper["pdf"],
                "sourceAnswerUrl": OFFICIAL + "a01.pdf",
                "sourceAttribution": f"出典：令和8年度第一種電気主任技術者一次試験{paper['category']}科目A問題問{paper['number']}({blank})。問題文を空欄ごとの設問に分けて整形（改変あり）。",
                "officialReferenceUrls": ["https://laws.e-gov.go.jp/law/339AC0000000170?occasion_date=20260401"] if paper["subject"] == "law" else [],
                "license": "ECEE-educational-reuse", "lastUpdated": "2026-09-27",
            }
            if paper["subject"] == "law":
                row["lawReferenceDate"] = "2026-04-01"
            rows.append(row)
    assert len(rows) == 15 and len({r["id"] for r in rows}) == 15
    return rows


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    output = HERE / "launch.json"
    serialized = json.dumps(build(), ensure_ascii=False, indent=2) + "\n"
    if args.check:
        if not output.exists() or output.read_text(encoding="utf-8").replace("\r\n", "\n") != serialized:
            raise SystemExit("denken1 launch.json is stale")
        print("denken1 launch.json: 15 units verified")
    else:
        output.write_text(serialized, encoding="utf-8", newline="\n")
        print("wrote 15 denken1 units")


if __name__ == "__main__":
    main()
