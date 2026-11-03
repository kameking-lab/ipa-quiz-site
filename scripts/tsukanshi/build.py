"""Rebuild staged 59th exam from retained official pdftotext -layout transcripts.
No generated questions. Whitespace is normalized; tables are transcribed below.
"""
import json,re,pathlib
ROOT=pathlib.Path(__file__).resolve().parents[2]
SRC=ROOT/'reports/tsukanshi-sources'
KEYS=list('アイウエオカキクケコサシスセソ')
notes=json.loads((pathlib.Path(__file__).parent/'explanations-59.json').read_text())
notes['3']['8']='WTO税率6.5％と特恵税率5.2％で算出した税額の差は397,300円です。加算税の計算の基礎となる税額は１万円未満を切り捨てて390,000円とし、10％を乗じて39,000円となります。'
notes['3']['9']='イタリアで生産・直接運送されるため日EU・EPAを検討します。非原産材料は英国の革31,000円で、原産材料割合は(78,440－31,000)÷78,440×100で60％以上です。日EU税率2.2％を用い、課税標準の千円未満を切り捨てた2,518,000円×2.2％の百円未満を切り捨て、55,300円となります。'
word_answers={1:[[1,10,9,12,13],[14,1,13,12,4],[5,10,2,1,6],[13,9,14,12,1],[7,14,6,1,9]],2:[[8,11,14,4,1],[10,6,7,2,12],[6,5,15,11,7],[13,4,5,15,6],[15,4,11,8,3]]}
subjects={1:'通関業法',2:'関税法等',3:'通関実務'}
sessions={1:'tsukan-law',2:'customs-law',3:'tsukan-practical'}
answertext=(SRC/'59-0.txt').read_text().splitlines()
allq=[];transcripts=[]
for s,(lo,hi) in enumerate([(0,34),(34,65),(65,150)],1):
 col='\n'.join(x[lo:hi] for x in answertext)
 col=re.sub('第([０-９]+)問',lambda m:'第'+str(int(m[1]))+'問',col)
 answers={int(m[1]):m[2].split(',') for m in re.finditer(r'第(\d+)問\s+(?:選択式②|択一式|計算式)\s+\d点\s+([\d,]+)',col)}
 text=(SRC/f'59-{s}.txt').read_text()
 text=re.sub(r'―\s*\d+\s*―','',text).replace('\f','\n')
 text=re.sub(r'【[^】]+】[^\n]*','',text)
 matches=list(re.finditer(r'^第\s*([0-9０-９]+)\s*問\s+',text,re.M))
 for i,m in enumerate(matches):
  n=int(m[1]);b=text[m.end():matches[i+1].start() if i+1<len(matches) else len(text)].strip()
  if s==3 and n<3:continue # declaration forms need invoice/booklet workflow
  clean=lambda v:re.sub(r'\s+','',v)
  bank=n<=5 and s<3
  numeric=s==3 and 8<=n<=12
  if bank:
   pos=b.index('①');stem=clean(b[:pos]);choices={str(ord(k)-ord('①')+1):clean(v) for k,v in re.findall(r'([①-⑮])\s*([^①-⑮]+)',b[pos:])}
   assert len(choices)==15
   if s==2 and n==1:
    stem=stem.replace('に（⑵に規定する過納金を除く。）については、より納付すべき税額が確定した関税に係る過納金','により納付すべき税額が確定した関税に係る過納金（⑵に規定する過納金を除く。）については、')
   ans=list(map(str,word_answers[s][n-1]))
  elif numeric:stem=clean(b);choices={};ans=answers[n]
  else:
   starts=list(re.finditer(r'^\s*([1-5１-５])\s+',b,re.M))[:5]
   assert [int(z[1]) for z in starts]==list(range(1,6)),(s,n)
   stem=clean(b[:starts[0].start()]);choices={str(int(z[1])):clean(b[z.end():starts[j+1].start() if j+1<len(starts) else len(b)]) for j,z in enumerate(starts)};ans=answers[n]
  # Retain tables as Markdown, with every printed cell, to preserve relations.
  if s==3 and n==15:
   choices['5']=choices['5'].split('関税率表の部及び類の表題')[0]
   stem+='\n\n|関税率表の部及び類|表題|\n|---|---|\n|第１部|動物（生きているものに限る。）及び動物性生産品|\n|第33類|精油、レジノイド、調製香料及び化粧品類|\n|第54類|人造繊維の長繊維並びに人造繊維の織物及びストリップその他これに類する人造繊維製品|\n|第72類|鉄鋼|\n|第94類|家具、寝具、マットレス、マットレスサポート、クッションその他これらに類する詰物をした物品並びに照明器具（他の類に該当するものを除く。）及びイルミネーションサイン、発光ネームプレートその他これらに類する物品並びにプレハブ建築物|'
  if s==3 and n==16:
   stem=stem.split('関税率表の類物品')[0]
   stem+='\n\n| |関税率表の類|物品|\n|---|---|---|\n|Ａ|第10類（穀物）|ａ．精米／ｂ．殻付きのそば／ｃ．スイートコーン|\n|Ｂ|第15類（動物性、植物性又は微生物性の油脂及びその分解生産物、調製食用脂並びに動物性又は植物性のろう）|ａ．カカオ脂／ｂ．魚の油脂／ｃ．マーガリン|\n|Ｃ|第27類（鉱物性燃料及び鉱物油並びにこれらの蒸留物、歴青物質並びに鉱物性ろう）|ａ．石炭／ｂ．木炭／ｃ．石油アスファルト|\n|Ｄ|第49類（印刷した書籍、新聞、絵画その他の印刷物並びに手書き文書、タイプ文書、設計図及び図案）|ａ．カーボン紙／ｂ．絵本／ｃ．商業用カタログ|\n|Ｅ|第82類（卑金属製の工具、道具、刃物、スプーン及びフォーク並びにこれらの部分品）|ａ．やすり／ｂ．電気かみそりの刃／ｃ．爪やすり|'
  if s==3 and n==8:
   stem=stem.split('（表1）')[0]+'\n\n（表１）\n|品名|課税価格|品名番号|\n|---|---|---|\n|手袋|30,566,942円|6216.00-900|\n\n（表２）実行関税率表（抜粋）\n|番号|統計細分|品名|基本|WTO協定|特恵|\n|---|---|---|---|---|---|\n|6216.00||手袋、ミトン及びミット||||\n| |100 1|剣道用の小手|無税|（6.5%）||\n| |900 2|その他のもの|7.8%|6.5%|5.2%|'
  if s==3 and n==9:
   # source formula printed as a fraction: linearize without changing operands
   stem=stem.replace('FOB価格－VNM原産材料割合（％）＝×100FOB価格','原産材料割合（％）＝（FOB価格－VNM）／FOB価格×100')
   stem=stem.replace('（表1）材料価格イタリアの原産材料である革27,200円英国の原産材料である革31,000円','\n\n（表１）\n|材料|価格|\n|---|---|\n|イタリアの原産材料である革|27,200円|\n|英国の原産材料である革|31,000円|\n\n')
   stem=stem.replace('（表２）税率WTO協定日EU・EPA日英EPAハンドバッグ8.0％2.2％2.0％','\n\n（表２）\n| |WTO協定|日EU・EPA|日英EPA|\n|---|---|---|---|\n|ハンドバッグ|8.0％|2.2％|2.0％|\n\n')
  summary=notes[str(s)][n-1] if s<3 else notes['3'][str(n)]
  transcripts.append(dict(subject=subjects[s],session=sessions[s],number=n,stem=stem,choices=choices,officialAnswers=ans))
  parts=range(5) if bank else [None]
  for part in parts:
   q=dict(id=f'tsukanshi-2025-annual-{sessions[s]}-q{n}'+(f'-{part+1}' if part is not None else ''),exam='tsukanshi',session=sessions[s],year=2025,season='annual',qNumber=n,subject=subjects[s],type='numeric' if numeric else 'multiple-choice',category=subjects[s],topicTags=[subjects[s],'第59回'],difficulty=3,question=stem,explanation=summary+'\n\n※出題時点の法令・制度に基づく独自解説です。その後の法改正は反映していません。',hasImage=False,sourcePdfUrl=f'https://www.customs.go.jp/tsukanshi/59_shiken/20251005tukanshi0{s}.pdf',sourceAnswerUrl='https://www.customs.go.jp/tsukanshi/59_shiken/59shiken_seikai.pdf',sourceAttribution=f'出典：税関 第59回通関士試験（2025年）{subjects[s]} 第{n}問。問題・公式正答を使用し、空白・表組み・解答表示を過去問AIが加工。解説は独自作成で税関とは関係ありません。',license='CUSTOMS-attributed',needsReview=False,lastUpdated='2026-11-03',officialReferenceUrls=['https://www.customs.go.jp/tsukanshi/59_shiken.htm'])
   if numeric:q.update(answer=str(int(ans[0])),officialAnswerNumber=ans[0],numericAnswer=dict(format='integer',unit='円'),isCalculation=True)
   else:
    q['choices']={KEYS[int(k)-1]:v for k,v in choices.items()}
    if bank:
     q.update(part=str(part+1),questionNotice=f'原問の空欄「{"イロハニホ"[part]}」を解答してください。語群①〜⑮は画面で1〜15と表示します。',answer=KEYS[int(ans[part])-1],officialAnswerNumber=ans[part])
     q['explanation']=f'空欄「{"イロハニホ"[part]}」は「{choices[ans[part]]}」（公式番号{ans[part]}）です。'+q['explanation']
    else:
     multi='すべてを選び' in stem
     if not multi:
      q['choices']['カ']='０（該当する記述・組合せがない場合）'
      q['questionNotice']='原文の指示に従い、該当するものがない場合の解答番号0も選択できます。'
     mapped=[KEYS[int(x)-1] if x!='0' else 'カ' for x in ans]
     q.update(answer=mapped if multi else mapped[0],officialAnswerNumber=','.join(ans))
     if multi:q['requiredSelections']=len(ans)
   if not numeric:
    if bank:
     q['choiceExplanations']={key: (f'空欄「{"イロハニホ"[part]}」に入る語句です。' if key==q['answer'] else f'空欄「{"イロハニホ"[part]}」には「{choices[ans[part]]}」を入れます。')+summary for key in q['choices']}
    else:
     correct=q['answer'] if isinstance(q['answer'],list) else [q['answer']]
     q['choiceExplanations']={key:('解答に含める肢です。' if key in correct else '解答に含めない肢です。')+summary for key in q['choices']}
   allq.append(q)
(ROOT/'data/questions/tsukanshi/2025-annual.json').write_text(json.dumps(allq,ensure_ascii=False,indent=2)+'\n')
(SRC/'transcription-59.json').write_text(json.dumps(transcripts,ensure_ascii=False,indent=2)+'\n')
print(f'{len(transcripts)} original questions, {len(allq)} answer units')
