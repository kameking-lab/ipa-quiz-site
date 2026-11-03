"""Apply explicit second-round explanation repairs, then freeze a new review packet."""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
QA = ROOT / 'data/qualification-staging/automotive/latest-two/qa'
packet_path = QA / 'lq1c-candidates.json'
packet = json.loads(packet_path.read_text(encoding='utf-8'))
patches = {
    'jidosha-2026-first-body-q10': {
        'explanation': '不適切なのは(1)。フードのアウタ・パネルとインナ・パネルの周縁を接合する加工はヘミング加工であり、ビーディング加工ではない。ビーディングは鋼板にビード（溝状の凹凸）を設けて剛性を高める加工である。',
        'choiceExplanations.ア': '不適切。フードの外板と内板の周縁を折り返して接合するのはヘミング加工。「ビーディング加工」が誤りである。接着剤や充てん剤を用いること自体を誤りとしない。',
    },
    'jidosha-2026-first-body-q22': {
        'explanation': '不適切なのは(2)。コ型（チャンネル型）断面補強は、サイド・メンバと同じ形状のチャンネル型補強板を、その外側又は内側に取り付ける方法である。フランジ部だけに上向き又は下向きに取り付けるという説明は異なる。',
        'choiceExplanations.イ': '不適切。チャンネル型の補強板をサイド・メンバの外側又は内側に取り付ける。フランジ部へ上向き・下向きに付ける方法という説明が誤り。',
    },
    'jidosha-2026-first-body-q24': {
        'choiceExplanations.イ': '不適切。標準炎から酸素を増すと過酸化炎となり、炎心は短く鋭くなる。「白点は丸く」が誤りである。',
        'choiceExplanations.ウ': '不適切。標準炎ではアセチレンと酸素をおおむね1対1で供給し、溶接に用いる炎心先端付近の温度は約3,200℃となる。この設問では「約2,800℃」が誤りであり、1対1という供給比自体を誤りとしない。',
    },
    'jidosha-2025-second-1-small-written-q09': {
        'explanation': '公式正答は(2)。新しいデータを次々に表示し、古いデータを送りながら連続表示するのはROLL（ロール）の説明。RUNは波形の取り込み・測定を進める状態である。SCRLは取り込み済み波形の表示位置を移動する操作で、ROLLと区別する。',
        'choiceExplanations.イ': '不適切。記述しているのはROLL（ロール）表示。RUNは測定・取り込みを進める状態であり、この表示方式の名称ではない。SCRLによる表示部分の移動とも区別する。',
        'choiceExplanations.ウ': 'この試験で扱うAUTO掃引では、トリガが得られない場合にも掃引して基線を表示する。50Hz以下では同期できないという数値は対象教材の機器条件であり、すべてのオシロスコープに共通する限界ではない。低周波での同期可否は機種・掃引時間・トリガ設定で異なる。',
    },
    'jidosha-2025-second-1-small-written-q48': {
        'choiceExplanations.ア': '不適切。確認条件は「昼間」ではなく「夜間」である。夜間、後方150mから走行用前照灯で照射し、反射光を照射位置から確認できることが基準。「150m」「走行用前照灯」は正しい。',
    },
    'jidosha-2025-second-1-small-written-q19': {
        'choices.ア': '(1) 風切音：高速走行時に発生する「ザー音」。振動周波数の目安は500Hz～5kHz。振動源はボデー外部の風の乱れ、ドアすき間などからの室内空気の出入り。',
    },
    'jidosha-2025-second-3-gasoline-q01': {
        'choiceExplanations.イ': 'カム・リフトは、カムの最大半径とベース・サークルの半径との差である。カム山の全高を測った値から求める場合は、ベース・サークルの直径を差し引く。半径と直径を混同しない。',
    },
    'jidosha-2025-second-3-diesel-q25': {
        'choiceExplanations.ウ': '不適切。1シリンダ当たり2～3回測定し、その平均値を基準とする。各回の測定では圧力計の最大指示値を読むが、繰り返した2～3回の中の最大値だけを採るのではない。回数ではなく、複数回の測定値のまとめ方が誤りである。',
    },
    'jidosha-2026-first-2-diesel-q01': {
        'explanation': '適切なのは(1)。空気過剰率が大きいジーゼル・エンジンではCOの発生が少ない。SOFは未燃燃料や潤滑油に由来する可溶性有機成分、NOxは主に高温下で窒素と酸素が反応して生じる。プレ噴射はメーン噴射に先立って着火遅れを短縮し、PMや燃焼騒音を低減するための噴射である。',
        'choiceExplanations.エ': '不適切。この設問の分割噴射の区分では、プレ噴射はメーン噴射に近接して先行し、着火遅れを短縮してPMや燃焼騒音を低減する。大きく進角したパイロット噴射と区別する。「HCの排出を低減する」をプレ噴射の目的とする説明が誤りであり、運転条件によるHCへの影響まで一律に否定するものではない。',
    },
    'jidosha-2026-first-2-diesel-q12': {
        'explanation': '公式の不適切肢は(2)。両ホイールを結ぶ回転軸の径方向の支持にはジャーナル・ベアリングが用いられ、軸方向荷重はスラスト・ベアリングが受け持つ。径方向支持用の軸受をスラスト・ベアリングとする説明を区別する。ターボにスラスト・ベアリングが使用されないという意味ではない。',
        'choiceExplanations.イ': '不適切肢として指定されている。ホイールを結ぶ軸の径方向の支持はジャーナル・ベアリング、軸方向荷重の支持はスラスト・ベアリングの役割である。両者は共存し得るため、「スラスト・ベアリングは一切使われない」「原文がスラストだけと断定した」とは説明しない。',
    },
    'jidosha-2026-first-2-diesel-q15': {
        'choiceExplanations.イ': 'この設問で扱う電熱式インテーク・エア・ヒータは、エンジン冷却水温度に応じて予熱時間を制御し、吸気通路のヒータで吸入空気を暖める。ここでは「吸入空気温度に応じて」とした点が不適切。ただし他機種では吸気温度を入力に用いる制御もあり、全機種に共通する否定ではない。',
    },
    'jidosha-2026-first-3-gasoline-q05': {
        'choiceExplanations.イ': '試験では適切な記述として扱われている。エチレン・グリコール系の冷却液は濃度に応じて凍結温度が変化し、60％付近では低い凍結温度になる。ただし「濃度60％なら全製品で厳密に最小」とは一般化できず、濃度の基準や製品の配合によって異なる。実際の希釈は製品指定の濃度と凍結温度表に従う。',
    },
    'jidosha-2026-first-3-diesel-q15': {
        'choiceExplanations.ア': '試験では着火点250～350℃・やや黄色味という一般的性状の記述として適切に扱われている。ただし軽油は混合物で、着火点は組成や測定条件により異なる。例えばENEOS軽油のSDSには自然発火点約240℃とあり、250～350℃をすべての軽油の保証値とはしない。取扱い時は使用する製品のSDSを確認する。',
    },
}

backup = QA / 'lq1c-candidates-initial.json'
if not backup.exists():
    backup.write_bytes(packet_path.read_bytes())
delta = []
for q in packet['writtenOriginals']:
    if q['id'] not in patches:
        continue
    before = hashlib.sha256(json.dumps(q, ensure_ascii=False, separators=(',', ':')).encode()).hexdigest()
    for field, replacement in patches[q['id']].items():
        target = q
        keys = field.split('.')
        for key in keys[:-1]:
            target = target[key]
        target[keys[-1]] = replacement
    after = hashlib.sha256(json.dumps(q, ensure_ascii=False, separators=(',', ':')).encode()).hexdigest()
    delta.append({'id': q['id'], 'beforeSha256': before, 'afterSha256': after, 'fields': patches[q['id']]})
packet['bindings'] = [{'id': q['id'], 'candidateSha256': hashlib.sha256(json.dumps(q, ensure_ascii=False, separators=(',', ':')).encode()).hexdigest()} for q in packet['writtenOriginals']]
packet_path.write_text(json.dumps(packet, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
(QA/'lq1c-revision1-delta.json').write_text(json.dumps(delta, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
(QA/'lq1c-revision1-ids.json').write_text(json.dumps(list(patches), indent=2)+'\n', encoding='utf-8')
print(json.dumps({'revised': len(delta)}))
