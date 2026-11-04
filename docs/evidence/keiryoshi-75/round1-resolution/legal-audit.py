"""Resolve legal review findings against the saved historical e-Gov texts.

Run from the repository root. Findings are author review, not a new independent
review. Article hashes bind the exact text reviewed; JIS incorporation is
explicitly distinguished from publicly available statutory text.
"""
import hashlib
import json
from pathlib import Path

E = Path('docs/evidence/keiryoshi-75')
OUT = E / 'round1-resolution'


def walk(n):
    if isinstance(n, dict):
        yield n
        for c in n.get('children', []):
            yield from walk(c)


def flat(n):
    return n if isinstance(n, str) else ''.join(flat(c) for c in n.get('children', []))


sources = {s['name']: s for s in json.loads((E / 'historical-law-sources.json').read_text())}
sources.update({s['name']: s for s in json.loads((OUT / 'additional-sources.json').read_text())})


def anchor(name, number, tag='Article'):
    source = sources[name]
    data = json.loads(Path(source['file']).read_text())
    root = data['law_full_text']
    if tag == 'Article':
        root = next(n for n in walk(root) if n['tag'] == 'MainProvision')
    matches = [n for n in walk(root) if n['tag'] == tag]
    node = next((n for n in matches if n['attr'].get('Num') == str(number)), None)
    if node is None and tag == 'AppdxTable':
        node = matches[int(number)-1]
    assert node is not None, (name, number, tag)
    text = flat(node)
    return dict(source=name, url=source['url'], tag=tag, number=str(number),
                revision=data['revision_info']['law_revision_id'],
                textSha256=hashlib.sha256(text.encode()).hexdigest(), text=text)


rows = []


def add(slug, n, refs, finding, limit=''):
    q = json.loads(Path(f'data/questions/keiryoshi/2024-{slug}.json').read_text())[n-1]
    rows.append(dict(subject=slug, qNumber=n, dateBasis='2024-12-15',
                     anchors=[anchor(*r) for r in refs], finding=finding,
                     explanation=q['explanation'], choiceExplanations=q['choiceExplanations'],
                     scopeLimit=limit, status='rechecked'))


M = 'measurement'
D = 'measurement-decree'
R = 'measurement-rules'
S = 'standard-instrument-rules'
V = 'verification-rules'
houki = [
    ([(M,1),(M,2)], '目的・単位・計量器・標準物質・特定計量器の政令限定を5肢と照合。'),
    ([(M,2)], '取引＝有償無償を問わない物又は役務、証明＝公に又は業務上他人に表明。'),
    ([(M,3),(M,1,'AppdxTable')], '質量kg/g/t、動粘度m²/s、電力Wと電力量J、静電容量Fと電荷Cを区別。'),
    ([(M,3)], '国際度量衡総会・政令。国際法定計量機関総会や省令と区別。'),
    ([(M,15)], '知事又は特定市町村の長。勧告→公表→所定の場合の命令。'),
    ([('commodity-decree',5)], '対象は素干しえび・すじこ・魚肉ハム/ソーセージ。アイスクリームと生鮮/冷蔵海藻は除外。'),
    ([(M,16),(D,18),(D,3,'AppdxTable')], '使用/所持の制限、基準適合証印、装置検査、水道メーター8年。'),
    ([(M,19),(M,21),(M,22),(M,23),(M,25)], '検査主体と代検査の届出先は知事等。数の調査報告・使用公差は正しい。'),
    ([(M,26),(M,28),(M,30),(M,32),(M,33)], '申請による指定、検査員・人数、業務規程認可、休廃止の事前届、年度計画/予算。'),
    ([(M,51),(M,52),(M,42),(M,45),(D,13)], '販売届・変更届・勧告は知事、廃止は事後遅滞なく。対象は非自動はかり等。'),
    ([(M,57)], '製造/修理/輸入、修理委託者への引渡し、輸出時の事前届先は知事。'),
    ([(M,72),(D,18),(D,3,'AppdxTable')], '有効期間対象はガスメーター・ガラス電極式pH指示計。定期検査と区別。'),
    ([(M,76),(M,84)], '承認製造事業者の型式表示は任意。指定製造事業者の自己検査制度と区別。'),
    ([(M,95)], '承認型式、検定公差、検査記録の作成保存。'),
    ([(M,102),(M,103),(M,104),(M,105),(D,25)], '検査主体・構造/器差・証印/成績書・有効期間。譲渡貸渡しには成績書を伴うが相手方限定なし。'),
    ([(M,107),(M,108),(M,110),(M,111),(M,112)], '長さ/質量/面積/体積/熱量（温度でない）、知事への事業規程届、通常登録に4年更新なし。'),
    ([(M,116),(M,118),(M,120),(D,29),(D,5,'AppdxTable')], '知事による検査、計量士による代検査、非自動はかりの周期2年。主任計量者のみでは代検査不可。'),
    ([(M,'121_2')], '認定は大臣又は特定計量証明認定機関。指定計量証明検査機関との混同を排除。'),
    ([(M,'121_3'),(M,'121_4'),(D,'29_3')], '証明書は交付できる（義務でない）、認定更新3年。'),
    ([(M,122)], '計量管理、登録、実務の経験等。主体は大臣。'),
    ([(M,123)], '登録、法に基づく命令の規定、特定計量器の検査、名称使用停止は1年以内。'),
    ([(M,127),(R,74),(D,41),(D,43),(M,129),(M,130),(M,131)], '検査主体は知事又は特定市町村の長（国の事業所も同じ）。指定/適合命令の権限委任と分離。総合解説と肢2を修正。'),
    ([(M,2),(M,134),(M,143),(M,'144_2'),(D,'38_2')], '特定標準器が現示するのは特定の物象量。標準物質の値付けの定義、登録は大臣、更新4年。'),
    ([(M,143),(M,144),(R,82),(R,94)], '登録事業者の大文字JCSSと特定標準器等の小文字jcssを区別。標章の字形は公式PDF原図で照合。'),
    ([(M,9),(M,147),(M,148),(M,173),(M,174)], '非法定単位目盛の計量器の販売/陳列違反は50万円以下罰金。立入検査に犯罪捜査権限なし、拒否等の罰則あり。'),
]
for n, (refs, finding) in enumerate(houki, 1):
    add('houki', n, refs, finding)

for n, refs, finding in [
    (1,[('environment-basic',i) for i in (6,7,8,9)],'責務の主体は国・地方公共団体・事業者・国民の順。'),
    (2,[('noise-regulation',6),('noise-rules',4)],'市町村長への30日前届、配置図と附近見取図。定款/登記事項証明書は添付書類でない。'),
    (3,[('noise-regulation',11)],'全部譲受/借受・相続等の承継、承継後30日以内に市町村長へ届出。'),
    (4,[('vibration-regulation',1)],'目的は生活環境保全と国民の健康保護。事業活動/建設工事/道路交通を区別。'),
    (5,[('vibration-regulation',4)],'町村による条例の自然的・社会的条件、環境大臣の範囲。')]:
    add('kanbutsu',n,refs,finding)
for n, refs, finding in [
    (1,[('environment-basic',15)],'政府の環境基本計画の4空欄はいずれも環境の保全。'),
    (2,[('air-pollution',4)],'上乗せの対象はばいじん・有害物質。いおう酸化物を含めない。'),
    (3,[('air-pollution',13)],'ばい煙量又はばい煙濃度、排出口、排出基準、排出禁止。環境基準との混同を排除。'),
    (4,[('water-pollution',2),('water-decree',2),('water-decree',3)],'銅/SS/BOD/COD/pHは生活環境項目、鉛は健康に係る有害物質。'),
    (5,[('water-pollution',5)],'知事への届出事項の種類・構造・使用方法・処理方法。事故時の措置は列挙にない。')]:
    add('kanka',n,refs,finding)
add('kanno',14,[('odor-rules',5)],'環境大臣が定める方法。環境省告示9号別表第2のGCは炎光光度検出器。告示HTMLの該当文も確認。')
add('kanon',12,[(M,46),(M,49),(R,10),(R,11)],'軽微修理・簡易修理・証印除去を区別。新機能追加は原状回復の修理の範囲外。', '法令が参照するJIS C1516附属書全文はe-Gov本文に含まれない。既存technical-source-review.jsonのMETI改正資料を併用。')
add('kanon',15,[], '環境省告示：原則連続7日間、暗騒音より10dB以上、A/SLOW、屋外代表地点、7～19時の加算補正なし。環境省告示HTMLと照合。')
add('kanon',22,[('vibration-rules',2,'AppdxTable')], '道路境界、鉛直特性、5秒間隔100個、80%レンジ上端。度数展開のL10=52dBを数値監査でも確認。')
add('kanon',25,[(S,4),(S,391),(S,392)],'基準サーボ式ピックアップ、質量700g以下、感度の安定性。動電式/圧電型と区別。')
jis_limit = 'e-Gov本文はJISを引用して定めるため数表・試験方法の全文は含まれない。法令参照先と原問/公式正答を照合し、数値は再計算又は既存一次資料確認を併用。JIS全文をe-Govで検証済みとは扱わない。'
for n, refs, finding in [
    (20,[(V,204)],'自動捕捉式はかりはJIS B7607を引用。試験荷重1kg以下のXカテゴリ60回（検定機関資料も照合済み）。'),
    (21,[(V,204)],'非自動はかりの器差検定法はJIS B7611-2。表示は重力比で1.996×9.807/9.797=1.998037…kg。'),
    (22,[(V,183)],'非自動はかりの構造検定法はJIS B7611-2。移動荷重の始端・中央・終端を原図と照合。'),
    (23,[(V,182)],'非自動はかり検定公差はJIS B7611-2。500e=5t、2000e=20t、±5/10/15kgを計算。'),
    (24,[(V,392)],'自動車等給油メーター器差検定法はJIS B8572-1:2008。使用最大流量の6/10以上、調節不可は1流量。')]:
    add('keishitsu',n,refs,finding,jis_limit)
add('keishitsu',25,[(S,83)],'板状2mgは三角形。線状2mgの四角形と区別。5mgの五角形/六角形も条文表と一致。')

assert len(rows) == 46
all_ids = {(p.stem.removeprefix('2024-'), q['qNumber'])
           for p in Path('data/questions/keiryoshi').glob('2024-*.json')
           for q in json.loads(p.read_text())}
covered = {(r['subject'],r['qNumber']) for r in rows}
assert len(all_ids) == 200 and len(covered) == 46
result = dict(basis='令和6年12月の施行法令。e-Gov APIはasof=2024-12-15で取得。',
              checkedQuestions=200, statutoryOrDelegatedStandardQuestions=46,
              noStatutoryCitationQuestions=154, rows=rows,
              noticeSources=[sources['odor-notice'],sources['aircraft-notice']],
              caveat='法令と問題PDFに含まれる意図的な誤肢は修正しない。JIS本文の取得限界は各行に明記。')
(OUT/'legal-audit.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print('200 questions classified; 46 legal/standard questions rechecked against primary sources')
