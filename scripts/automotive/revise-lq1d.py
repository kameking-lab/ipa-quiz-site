"""Apply the bounded LQ1D explanation corrections, preserving every other candidate."""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
QA = ROOT / 'data/qualification-staging/automotive/latest-two/qa'

def canonical(value):
    return hashlib.sha256(json.dumps(value, ensure_ascii=False, separators=(',', ':')).encode()).hexdigest()

def apply_revision(name, patches):
    target = QA / (name + '-delta.json')
    if target.exists():
        raise SystemExit('Frozen revision already exists: ' + str(target))
    packet_path = QA / 'lq1c-candidates.json'
    packet = json.loads(packet_path.read_text(encoding='utf-8'))
    changes = []
    for q in packet['writtenOriginals']:
        if q['id'] not in patches:
            continue
        before = canonical(q)
        patch = patches[q['id']]
        q.update(patch)
        changes.append({'id': q['id'], 'beforeSha256': before, 'afterSha256': canonical(q), 'fields': patch})
    assert len(changes) == len(patches)
    packet['bindings'] = [{'id': q['id'], 'candidateSha256': canonical(q)} for q in packet['writtenOriginals']]
    packet_path.write_text(json.dumps(packet, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    target.write_text(json.dumps(changes, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps([{k: v for k, v in row.items() if k != 'fields'} for row in changes]))

if __name__ == '__main__':
    apply_revision('lq1d-revision1', {
        'jidosha-2026-first-2-gasoline-q31': {
            'explanation': '正答は(2)。本問の整備士教材の3分類では、ラジアルはボール型・ニードル・ローラ型・シリンドリカル・ローラ型、アンギュラはボール型・テーパ・ローラ型に分ける。(2)はラジアルの例にテーパ型を入れた点が誤りで、シリンドリカル型に直す。公論出版の多言語用語集の図（印刷224ページ）でもこの対応を確認できる。一方、NSKなどの一般的な製品分類ではテーパ型もラジアル軸受に含まれ、径方向と一方向の軸方向の荷重を受け、変速機での採用例もある。教材の分類を、荷重を受けられない・変速機には使えないという意味に取り違えない。',
            'choiceExplanations': {
                'ア': '適切。Mはメートルねじ、10は呼び径（おねじの外径）10mm、1.25はピッチ1.25mmを表す。外径とピッチを混同しない。',
                'イ': '不適切。本問のラジアル・スラスト・アンギュラという3分類では、テーパ・ローラ型は径方向と軸方向の荷重を受けるアンギュラに対応する。ラジアルの種類を列挙する本肢では「テーパ・ローラ型」を「シリンドリカル・ローラ型」に直す（公論出版の多言語用語集、印刷224ページ、016-05・016-08）。これは教材の分類の区別であり、NSKのラジアル軸受分類やテーパ型の変速機用途を否定するものではない。',
                'ウ': '適切。半割り形の軸受面が軸と直角のラジアル荷重を受け、つば部が軸と平行なスラスト荷重を受けるため、両方向の力を支持できる。',
                'エ': '適切。セルフロッキング・ナットは、樹脂部や金属部の変形など、ナット自体に設けた戻り止め構造で緩みを防ぐ。溝付きナットと割りピンを組み合わせる方式とは区別する。'
            },
            'needsReview': False,
            'reviewNotes': [],
            'officialReferenceUrls': [
                'https://www.kouronpub-onlineshop.com/html/template/default/assets/pdf/eightlanguage2022.pdf#page=6',
                'https://tsk.or.jp/image/multi/pdf/auto_mechanic_exam_preparation_anser%26comment.pdf#page=18',
                'https://www.nsk.com/jp-ja/products/roller-bearings/tapered-roller-bearings/',
                'https://www.nsk.com/jp-ja/products/automotive/manual-transmissions/'
            ]
        }
    })
