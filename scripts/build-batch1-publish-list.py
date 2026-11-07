"""Build the publish list from the frozen INT1 rows and independently fixed expectations."""
from pathlib import Path
from urllib.parse import quote
import json

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / 'reports/int1b-20261104'
DEST = Path('C:/Users/kanet/Documents/Codex/2026-11-02/task-2')
snapshot = json.loads((ROOT/'reports/int1-20261104/candidate-snapshot.json').read_text(encoding='utf-8-sig'))
audit = json.loads((REPORT/'count-audit.json').read_text(encoding='utf8'))
inventory = json.loads((REPORT/'source-inventory.json').read_text(encoding='utf8'))
by_code = {r['code']: r for r in audit['rows']}
refs = {r['ref']: r['commit'] for r in inventory}
expectations = {'chintai':99, 'kyusui':119, 'sekou-kenchiku2':100, 'denki1':178, 'denki2':124,
 'kankoji1':73,'shuwa':160,'jken-katsuyo1':85,'jken-katsuyo2':101,'jken-katsuyo3':93,
 'reform-mgr':100,'shohi-sodan':320,'yamaguchi-chori':120,'yamaguchi-seika':132,'yamaguchi-fugu':200,
 'keiryoshi':100,'keiryoshi-nodo':100,'keiryoshi-soon':100,'kenki1':112,'kenki2':304,
 'hoshasen-1':537,'hoshasen-2':279,'jokaso':160,'iji-shuzen':94,'gyosei':112,'shinrishi':308,
 'shihoshoshi':129,'kenchiku-setsubishi':209,'chizai2':160,'kisho':60,'biru-kan':360,
 'gijutsushi1-kikai':158,'biyoshi':106,'tsushin2':129,'kikenbutsu-otsu1':10,'kikenbutsu-otsu2':10,
 'kikenbutsu-otsu6':10,'khk-reito-1':80,'khk-reito-2':80,'khk-reito-3':70,
 'khk-kikai-kou':80,'khk-kikai-otsu':100,'energy-kanri':837}
auto_codes=['jidosha-1-small-written','jidosha-2-gasoline','jidosha-2-diesel','jidosha-2-chassis',
 'jidosha-2-motorcycle','jidosha-3-chassis','jidosha-3-gasoline','jidosha-3-diesel','jidosha-3-motorcycle','jidosha-body','jidosha-electrical']
expectations.update(dict(zip(auto_codes,[50,79,80,30,40,60,60,60,30,79,40],strict=True)))
job_codes={'chintai':['chintai'],'kyusui':['kyusui'],'sekou-2kenchiku':['sekou-kenchiku2'],
 'sekou-1denki':['denki1'],'sekou-2denki':['denki2'],'sekou-1kankoji':['kankoji1'],
 'shuwa':['shuwa'],'reform-mgr':['reform-mgr'],'shohi-sodan':['shohi-sodan'],'jokaso':['jokaso'],
 'iji-shuzen':['iji-shuzen'],'gyosei-finish':['gyosei'],'shinrishi-finish':['shinrishi'],
 'shihoshoshi-finish':['shihoshoshi'],'khk-reito':['khk-reito-1','khk-reito-2','khk-reito-3'],
 'khk-kikai':['khk-kikai-kou','khk-kikai-otsu']}
job_refs={'chintai':'qual/chintai-20261104','kyusui':'qual/kyusui-review-20261104',
 'sekou-2kenchiku':'origin/claude/blissful-rubin-pks6ce','sekou-1denki':'qual/sekou-1denki-20261104',
 'sekou-2denki':'origin/claude/loving-brahmagupta-79ljqk','sekou-1kankoji':'origin/claude/bold-dirac-ypnxox',
 'shuwa':'qual/shuwa-20261104','reform-mgr':'qual/shohi-sodan-20261104','shohi-sodan':'qual/shohi-sodan-20261104',
 'yamaguchi-shoku':'origin/claude/lucid-johnson-etmru0','keiryoshi':'origin/claude/vibrant-allen-nla4zw',
 'kenki':'origin/claude/affectionate-archimedes-cu6mem','hoshasen':'qual/hoshasen-20261104',
 'jokaso':'qual/jokaso-review-20261104','iji-shuzen':'qual/iji-shuzen-review-20261104',
 'gyosei-finish':'origin/claude/adoring-galileo-yaitzr','shinrishi-finish':'qual/shinrishi-review-20261104',
 'shihoshoshi-finish':'origin/claude/happy-goodall-cx5z2g','lq1c/lq1d':'qual/LQ1D-20261104',
 'lq4b':'qual/lq4b-integration-20261104','lq5':'qual/LQ5-20261104',
 'khk-reito':'qual/khk-reito-20261104','khk-kikai':'origin/claude/jolly-goodall-wlxnzx'}
rows=[]
auto_index=0
for number, row in enumerate(snapshot['rows'],1):
    job, name = row['job'], row['qual']
    native = None
    session = None
    source_ref = job_refs.get(job)
    codes = job_codes.get(job)
    if job == 'lq1c/lq1d':
        codes=[auto_codes[auto_index]]; auto_index+=1
    elif job.startswith('lq3'):
        native=[p for p in audit['pe'] if p['subject']==name]
        if len(native)!=2: raise ValueError(f'Missing native qualification: {name}')
        codes=[];source_ref='qual/LQ3D-20261104'
    elif job == 'jken-katsuyo':
        grade=next(g for g in [1,2,3] if f'{g}級' in name)
        codes=[f'jken-katsuyo{grade}'];source_ref=f'qual/jken-katsuyo{grade}-review-20261104'
    elif job == 'jken-system':
        codes=['jken-system'];source_ref='qual/jken-system-review-20261104'
        session='jken-programming' if 'プログラミング' in name else 'jken-design' if 'デザイン' in name else 'jken-basic'
    elif job == 'yamaguchi-shoku':
        codes=['yamaguchi-fugu' if 'ふぐ' in name else 'yamaguchi-seika' if '製菓' in name else 'yamaguchi-chori']
    elif job == 'keiryoshi':
        codes=['keiryoshi-nodo' if '濃度' in name else 'keiryoshi-soon' if '騒音' in name else 'keiryoshi']
    elif job == 'kenki': codes=['kenki1' if name.startswith('1') else 'kenki2']
    elif job == 'hoshasen': codes=['hoshasen-1' if '第一種' in name else 'hoshasen-2']
    elif job == 'lq4b':
        codes=[{'建築設備士':'kenchiku-setsubishi','知的財産管理技能検定2級':'chizai2','気象予報士':'kisho',
                '建築物環境衛生管理技術者':'biru-kan','技術士第一次試験・機械部門':'gijutsushi1-kikai'}[name]]
        if codes[0]=='gijutsushi1-kikai':source_ref='qual/LQ4E-20261104'
    elif job == 'lq5':
        codes=['biyoshi' if '美容師' in name else 'tsushin2' if '電気通信' in name else f'kikenbutsu-otsu{next(n for n in [1,2,6] if str(n) in name)}']
    if codes is None or source_ref is None: raise ValueError(f'Unmapped row: {row}')
    actual=sum(p['scored'] for p in native) if native else sum(sum(n for key,n in by_code[c]['periodCounts'].items() if not session or key.endswith('/'+session)) for c in codes)
    if native: expected=69 if '情報工学' in name else 70
    elif session:
        expected=0
        for f in (ROOT/'data/questions/jken-system').glob('*.json'):
            packet=json.loads(f.read_text(encoding='utf8'))
            if packet['session']==session:expected+=sum(len(q['slots']) for q in packet['questions'])
    else:expected=sum(expectations[c] for c in codes)
    if actual!=expected:raise ValueError(f'{name}: expected {expected}, actual {actual}')
    note=''
    if native:note='2024・2025年度の専門科目各35原問。情報工学2025問25は参照専用のまま（採点対象69問）。' if '情報工学' in name else '2024・2025年度の専門科目各35原問。'
    else:note=' ／ '.join(by_code[c]['summary'] for c in codes)
    if codes==['kisho']:note+=' 実技18原問・237回答欄は別readerで手動照合（学科60問とは別集計）。'
    if codes==['tsushin2']:note='2025後期・2026前期130原問を保存。2025後期問21は参照専用のまま通常採点対象外、129問を演習。'
    if codes==['shihoshoshi']:note='固定台帳どおり129問を演習。第3回レビュー時点の保留10問はすべて今回の公開・採点から除外。後続の第4回レビュー成果による5問の追加解除はバッチ1へ反映しません。'
    if codes==['hoshasen-1']:note='264原問を537演習設問へ展開。公式全員正解1欄は通常採点対象外。全文・全肢解説・必要図を保持。'
    if codes==['hoshasen-2']:note='149原問を279演習設問へ展開。2026年化学問9の保留を維持。'
    rows.append(dict(number=number,name=name,codes=codes,session=session,expected=expected,actual=actual,
                     nativePapers=[p['id'] for p in native] if native else [],note=note,
                     sourceRef=source_ref,sourceCommit=refs[source_ref]))
assert len(rows)==71
extra=dict(name='エネルギー管理士',codes=['energy-kanri'],expected=837,actual=by_code['energy-kanri']['practiceCount'],
           sourceRef='qual/energy-kanri-20261104',sourceCommit=refs['qual/energy-kanri-20261104'],
           note=by_code['energy-kanri']['summary'])
assert extra['actual']==extra['expected']
result=dict(candidateRows=71,optionalRows=[extra],rows=rows)
(REPORT/'release-scope.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
lines=['# 公開バッチ1 公開予定リスト','',
       '対象：`release/batch1-20261105`。ローカル統合候補であり、公開・デプロイ済みという意味ではありません。',
       '', 'INT1の固定71行をすべて照合し、任意追加のエネルギー管理士1行を含めます。iOSブランチ全体とiOSパッチは対象外。',
       '', '「演習設問」は採点・出題可能な件数。原問と解答欄を分けて扱う資格、公式全員正解、保留、参考専用は注記します。',
       '', '| # | 資格 | 演習設問 | 収録回・範囲・除外 | 成果コミット |','|---|---|---:|---|---|']
for r in rows:
    lines.append(f'| {r["number"]} | {r["name"]} | {r["actual"]} | {r["note"].replace("|","／")} | `{r["sourceCommit"][:9]}` |')
lines += [f'| 追加 | エネルギー管理士 | {extra["actual"]} | {extra["note"]} | `{extra["sourceCommit"][:9]}` |','',
          'J検情報システムの3行は同じ公開資格内の別科目です。高圧ガス冷凍の1行は3資格、高圧ガス機械の1行は2資格へ接続しています。',
          '', '技術士18部門の原稿はLQ3・LQ3B/C/Dの受入を継承。表のLQ3Dコミットだけでなく、統合HEADは `qual/LQ3-20261104` の固定成果も祖先として保持します。',
          '', '機械照合の正本：`reports/int1b-20261104/release-scope.json` と `count-audit.json`。期待件数との差は全行0。']
text='\n'.join(lines)+'\n'
(REPORT/'batch1-publish-list.md').write_text(text,encoding='utf8')
(DEST/'batch1-publish-list.md').write_text(text,encoding='utf8')
print('71 required rows + 1 optional row: all expected counts match')
