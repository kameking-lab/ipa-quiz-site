"""Rebuild the complete before/after difference register from preserved baseline.
No differences are suppressed: both unchanged and corrected differences are listed.
"""
import json,hashlib,difflib,runpy,re
from pathlib import Path
from collections import Counter
E=Path('docs/evidence/keiryoshi-76');norm=runpy.run_path(str(E/'full-text-audit.py'))['norm']
audit=json.loads((E/'full-text-audit.json').read_text());baseline={(q['subject'],q['qNumber']):q for q in json.loads((E/'text-before-corrections.json').read_text())}
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def diff(a,b):return [dict(operation=t,source=a[i:j],data=b[k:l],sourceOffset=i,dataOffset=k) for t,i,j,k,l in difflib.SequenceMatcher(None,a,b,autojunk=False).get_opcodes() if t!='equal']
specific={
('法規',8):'公式の末尾脚注（検定証印等・型式承認の定義）を本文末へ移動。全語句を保持。',
('法規',17):'公式の3列の表は「／」で列を区切る。脚注を本文末へ移動。今回、原文にない「濃度計は、」を削除。',
('法規',25):'拘禁刑への変更に関する公式末尾注記を本文末へ移動。全語句を保持。',
('一基',6):'PDFのベクトル記号の文字対応が抽出不能。矢印記号を「ベクトル」の語と a・b で表す。画像に原図を保持。',
('一基',18):'公式の「波長」「速さ」の2列を選択肢の「／」の前後で示す。⻑はPDFの字形対応で、表示文字は長。',
('環化',4):'抽出だけに現れる余分な「ア」はPDF5ページのレンダリングでは不可視。可視原文は「もって（エ）」であり、余分なアを転記しない。',
('環化',9):'公式の図はPNGに保持。熱化学表はMarkdownの3列へ移し、分数・イオン価数・添字を線形文字に転記。',
('環化',20):'製法と確認法の2列の表を選択肢内「／」で区切る。pdftotextは列の最初の行を横に読んでから各継続行を読むため語順差が出る。行・列を公式どおり保持。',
('環濃',1):'PDF冒頭の「以下の表は、」の抽出順が逆転。可視の通常の読み順に復元。4列の表はMarkdown、選択肢の3列は「／」で区切る。',
('環濃',20):'PDFの行の右半分が先に抽出される。可視の本文順序を保持。',
('管理',10):'公式の4列の分散分析表をMarkdownに転記。今回、表題「表 一元配置の分散分析表」を復元。a・nの条件は可視の行順、添字と分数は線形記法。',
('管理',15):'PDF16ページで本文・選択肢4のMの右下にiが付くことをレンダリングで確認。今回、平置きMiをMᵢへ復元。',
('管理',16):'PDFの重なったテキスト層で本文・脚注・表の行が二重抽出される（レンダリングで確認）。本文は1回ずつ転記し、表の3列は「／」で区切る。因子の水準をUnicode添字で表示。原図をPNGに保持。',
('管理',19):'「である。」が表の先頭のNより前に抽出される。本文の通常の読み順に戻し、3列の表を「／」で区切る。本文9か所のNの右下のcはN_cの添字記法で保持し、公式の上下位置は追加画像にも保持。',
('計質',5):'原文中の下矢印は図形として抽出されないため「↓」に転記。スケールの数値・目盛りは原図PNGに保持。',
('計質',16):'A市・B市の重力加速度は本文と日本地図内ラベルの両方に印刷されている。抽出重複ではない。本文は本文として保持し、地図とその全ラベルは追加登録したkeishitsu-q16.pngに保持。',
('計質',18):'PDFの本文・端子ラベルが二重抽出される。可視本文を1回ずつ転記。全5肢は図をPNGに保持し「図nの端子間接続」という選択用の代替文を追加。',
('計質',19):'質量・密度の添字（Mₛ・Mᵣ・ρₐ・ρₛ・ρᵣ）と分数・括弧を表示可能な線形記法で転記。PDFの分数や大型括弧は文字対応・読み順が崩れる。今回「式はどれか。」の句点を復元。',
('計質',20):'全5肢はグラフ自体をPNGに保持。「図n:…」は各境界と公差を説明する選択用代替文。二重抽出された軸数値は文字列へ二重転記しない。',
('計質',21):'PDF本文・式のテキスト層が重なり二重抽出される。1回ずつ転記。Δ・分数・複数字添字を線形化し、壊れたσ等の文字対応を可視字形に復元。',
('計質',23):'今回「正しいものはどれか」に復元。A₁等の添字と3行の記号定義を読点で区切って列挙。W・Pの欄の改行を読点・句点に置換。原図をPNGに保持。分数・括弧は線形記法。',
}
figures={(f['subject'],f['qNumber']):f['image'] for f in json.loads((E/'figure-crops.json').read_text())}
diagram_choices={('環化',11),('環化',13),('環物',22)}
records=[];changes=[]
for row in audit['fields']:
 key=(row['subject'],row['qNumber']);field=row['field'];old=baseline[key]['question'] if field=='question' else baseline[key]['choices'][field]
 before=diff(row['normalizedSource'],norm(old));after=row['differences']
 if old!=row['data']:changes.append(dict(subject=key[0],qNumber=key[1],field=field,before=old,after=row['data']))
 if not before and not after:continue
 notes=[]
 if key in specific:notes.append(specific[key])
 if key in diagram_choices and field!='question':notes.append('公式選択肢は図。PNGに全選択肢を保持し、データの文章は選択用に追加した代替文（化学構造・波形の説明）。公式の本文の引用ではない。')
 if key in figures:notes.append('図のラベル・数値・キャプションは画像 '+figures[key]+' に保持。本文に重ねて転記していない。画像包含はfigure-pixel-audit.jsonで全画素照合。')
 if '**' in row['data'] or '【' in row['data']:notes.append('公式の下線を太字または【】に置換し、設問内にも加工注記を付す。対象範囲はtypography-review.json参照。')
 if field!='question' and '／' in row['data']:notes.append('公式の表の列間空白を「／」に置換。これは数式内の除算の追加ではない。')
 combined=row['normalizedSource']+row['data']
 if re.search('[𝑀-𝟿�\x00⎧⎩⎨⎜]|[₀-₟⁰-ⁿ]|[_∫√]',combined):notes.append('数学・化学の文字対応崩れ、重複字形、上下位置と2次元式の読み順を、Unicode上下付き・_添字・/分数・括弧・根号等の線形表記に復元。これらは一次差分の正規化では吸収せず全て列記する。')
 if not notes:notes.append('空白・全半角・約物以外の抽出差（数式の上下配置・数字の読み順・表の列区切り等）を下記差分のとおり記録。可視の原文に合わせた表示表現を保持。')
 records.append(dict(subject=key[0],qNumber=key[1],field=field,pdfPage=key[1]+1,source=row['source'],before=old,after=row['data'],beforeDifferences=before,afterDifferences=after,disposition='corrected' if old!=row['data'] else 'documented-representation-or-extraction',notes=notes))
result=dict(checkedAt='2026-11-03',auditSha256=sha(E/'full-text-audit.json'),baselineSha256=sha(E/'text-before-corrections.json'),scope='200 questions + 1000 choices; every field has a source region and is compared, including empty text for structural drawings',limits='Raw normalized text equality is not claimed. All residual differences are explicit; PDF mapping/reading-order artifacts and intentional display conversions are retained as annotated differences. This is not an automatic semantic proof of formulas or explanations.',summary=dict(fieldsCompared=1200,beforeDifferentFields=sum(bool(r['beforeDifferences']) for r in records),afterDifferentFields=sum(bool(r['afterDifferences']) for r in records),changedFields=len(changes),changedQuestions=len({(c['subject'],c['qNumber']) for c in changes}),unparsedFields=0),corrections=changes,differences=records)
(E/'text-difference-review.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(result['summary'],ensure_ascii=False))
# A readable exhaustive register: no sampling and no truncation of differing strings.
lines=['# 第76回計量士・全本文／全選択肢差分台帳','', '空白・全半角・約物だけを正規化。数学記号・添字・語句・表の区切りは正規化で消さない。原文と変更前後の全文はJSONに保存。各行の左が公式抽出、右が修正後データ。空文字は∅。差分が残る行も理由を明示し、原文一致を偽装しない。','', '| 科目・問・欄 | 修正後の全差分（公式 → データ） | 処置・注記 |','|---|---|---|']
def esc(s):return s.replace('|','\\|').replace('\n',' ').replace('\x00','\\0') or '∅'
for r in records:
 chunks='; '.join(esc(d['source'])+' → '+esc(d['data']) for d in r['afterDifferences']) or '差分解消'
 lines.append('| '+f"{r['subject']}問{r['qNumber']} {r['field']}"+' | '+chunks+' | '+' '.join(r['notes'])+' |')
(E/'text-differences.md').write_text('\n'.join(lines)+'\n')
