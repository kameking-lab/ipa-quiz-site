"""Pin official science and SDS evidence for the five chemical-properties choices."""

import json
from pathlib import Path


root = Path(__file__).resolve().parents[1]
path = root / "data/exam-library/emkohyo-review/emkohyo-20260217-q01-05-draft.json"
data = json.loads(path.read_text(encoding="utf-8"))
item = data["questions"]["emkohyo-20260217-q5"]

env = "https://www.env.go.jp/air/tech/kyodomoderuhandbookH16.pdf"
fume = "https://jsite.mhlw.go.jp/yamagata-roudoukyoku/taisyou-20201112.html"
aist = "https://unit.aist.go.jp/riss/crm/mainmenu/3-1.html"
nies = "https://www.nies.go.jp/kisplus/dtl/chem/YOT00201"
air = "https://www.env.go.jp/air/osen/manual2/pdf_rev201903/01_chpt1-2-1.pdf"
meeting = "https://www.mhlw.go.jp/content/11305000/001343235.pdf"
mext = "https://www.mext.go.jp/content/1412880_4_1.pdf"
acrylamide = "https://anzeninfo.mhlw.go.jp/anzen/gmsds/79-06-1.html"

item["overlay"]["choices"][0]["reason"] = (
    "この記述は正しい。溶解度が小さく液体と反応しない気体は、溶液が希薄で溶質も化学変化しない"
    "というヘンリーの法則の前提に合う。環境省資料は気体の分圧と液中濃度の比例を示す。"
    "温度一定なら比例定数も一定で、一定量の液体では濃度に比例して溶解質量も変わるため、"
    "気体の圧力と溶解質量が比例する。"
)
item["overlay"]["choices"][1]["reason"] = (
    "この記述は正しい。産総研の用語集は、ヒュームを蒸気の凝固等で生じる固体微粒子で"
    "粒径0.1～1µm、ミストを空気中に浮遊する液体微粒子で粒径5～10µmと定義する。"
    "厚生労働省の溶接ヒューム資料も蒸気が凝固した0.1～1µmの固体粒子と説明しており、"
    "両者を一般的な範囲で比較するとヒュームの方が小さい。"
)
item["overlay"]["choices"][4]["reason"] = (
    "この記述は正しい。国立環境研究所の物性情報はN,N-ジメチルホルムアミドを"
    "『水、多くの有機溶媒に易溶』と記す。厚労省会議資料にも、トルエンに溶かしたDMFと"
    "水系緩衝液に溶かしたDMFの比較実験がある。ここでいう脂溶性は有機溶媒側にも溶ける性質を指し、"
    "水にも有機溶媒にも溶けるという設問の趣旨と一致する。"
)
item["overlay"]["choices"][3]["reason"] = (
    "これが誤り。気体の状態方程式より同温同圧の気体の密度は分子量に比例する。"
    "環境省の測定マニュアルの表では"
    "ジクロロメタン84.9、トルエン92.1なので蒸気密度の大小は設問の前半どおり。"
    "しかし25℃の蒸気圧はジクロロメタン58.0kPa、トルエン3.79kPaで前者の方が大きい。"
    "後半の比較が逆なので、誤っている肢は4である。"
)
item["overlay"]["summary"] = (
    "環境省の物性表ではジクロロメタンの分子量84.9はトルエン92.1より小さいが、"
    "25℃での蒸気圧58.0kPaはトルエン3.79kPaより大きい。蒸気圧の大小を逆にした肢4が誤り。"
)
item["overlay"]["sources"] = [
    {"title": "環境省 ダイオキシン類挙動モデルハンドブック", "url": env},
    {"title": "厚生労働省地方労働局 溶接ヒューム規制", "url": fume},
    {"title": "産業技術総合研究所 詳細リスク評価書のための用語集", "url": aist},
    {"title": "厚生労働省 モデルSDS アクリルアミド", "url": acrylamide},
    {"title": "環境省 有害大気汚染物質測定方法マニュアル 物理的性質表", "url": air},
    {"title": "国立環境研究所 化学物質情報 N,N-ジメチルホルムアミド", "url": nies},
    {"title": "厚生労働省 化学物質管理に関する意見交換会資料", "url": meeting},
    {"title": "文部科学省 理科教材 気体の密度と分子量の比較表", "url": mext},
]
item["sourceEvidence"] = [
    {"url": env, "excerpt": "気相内の溶質の分圧ｐは溶液中の濃度ｃに比例する", "choiceNumbers": [1]},
    {"url": fume, "excerpt": "溶接により生じた蒸気が空気中で凝固した個体の粒子（粒径0.1～1μm程度）", "choiceNumbers": [2]},
    {"url": aist, "excerpt": "金属の蒸気等の気体が空気中で凝固や化学変化を起こし，固体の微粒子として空気中に浮遊しているもの", "choiceNumbers": [2]},
    {"url": aist, "excerpt": "粒径は0.1〜１μmである", "choiceNumbers": [2]},
    {"url": aist, "excerpt": "液体の微細な粒子で空気中に浮遊しているもの", "choiceNumbers": [2]},
    {"url": aist, "excerpt": "粒径は5〜10μmである", "choiceNumbers": [2]},
    {"url": acrylamide, "excerpt": "84.5 ℃", "choiceNumbers": [3]},
    {"url": air, "excerpt": "ジクロロメタン 84.9", "choiceNumbers": [4]},
    {"url": air, "excerpt": "トルエン 92.1", "choiceNumbers": [4]},
    {"url": air, "excerpt": "蒸気圧(kPa)", "choiceNumbers": [4]},
    {"url": air, "excerpt": "58.0 （25℃)", "choiceNumbers": [4]},
    {"url": air, "excerpt": "3.79 （25℃)", "choiceNumbers": [4]},
    {"url": mext, "excerpt": "標準状態における一酸化炭素と二酸化炭素の密度", "choiceNumbers": [4]},
    {"url": nies, "excerpt": "水、多くの有機溶媒に易溶", "choiceNumbers": [5]},
    {"url": meeting, "excerpt": "トルエンに溶かしたものの対象としまして、水溶性の溶剤", "choiceNumbers": [5]},
]
item["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
