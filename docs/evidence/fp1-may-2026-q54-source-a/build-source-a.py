import json,re,hashlib,sys
D='/tmp/claude-0/dl/'
L=open(D+'q.txt',encoding='utf-8').read().split('\n')
def seg(a,b):  # 1-indexed inclusive
    out=[]
    for l in L[a-1:b]:
        s=l.strip()
        if not s or re.search(r'－\d+－',s) or 'ファイナンシャル・プランニング技能検定' in s or '1級・学科' in s or '１級・学科' in s: continue
        out.append(s)
    return ''.join(out)
def sh(p):return hashlib.sha256(open(D+p,'rb').read()).hexdigest()
Q=lambda n,pp,pr:{"physicalPdfPages":pp,"printedPages":pr}
case1=seg(186,194)
cases={}
data={
"schemaVersion":"fp1-source-a/1",
"role":"independent transcription A (not reviewed; NOT for public registry)",
"status":"UNREVIEWED_SOURCE_PACKET",
"exam":{"name":"ファイナンシャル・プランニング技能検定1級 学科試験（応用編）","session":"2026年5月実施（2026-05-24）","publisher":"一般社団法人 金融財政事情研究会 検定センター"},
"sources":{
 "questionPdf":{"url":"https://www.kinzai.or.jp/uploads/lib/question/202605/fp01_g_oyo.pdf","sha256":sh('q.pdf'),"bytes":len(open(D+'q.pdf','rb').read()),"physicalPages":25},
 "answerPdf":{"url":"https://www.kinzai.or.jp/uploads/lib/answer/202605/fp01_g.pdf","sha256":sh('a.pdf'),"bytes":len(open(D+'a.pdf','rb').read()),"physicalPages":6},
 "indexReferer":"https://www.kinzai.or.jp/fp/news-fp/49181.html",
 "reuseConditions":"https://www.kinzai.or.jp/ginou/license_terms.html",
 "retrievedAt":"2026-10-09 (UTC, anonymous GET, browser User-Agent + index Referer)",
 "expectedSha256Match":{"question":sh('q.pdf')=="fd7843fc2082e074bedecb82a9fc11c45f08c0d57de2146ee145c92cd6f2df8d","answer":sh('a.pdf')=="4859c487f5c55957b75658d727351c5221f3d6d995e710d2560a8a7e0a217460"},
 "pageNumberRule":"question PDF: printed page = physical page − 1 (physical 1 is cover; printed numbering begins on physical 2). Answer PDF: printed page = physical page − 1 as well; answer 応用編 begins at physical 2 (printed 1)."},
"attribution":{"text":"出典: 一般社団法人 金融財政事情研究会 ファイナンシャル・プランニング技能検定1級学科試験（2026年5月実施）応用編。本JSONは原典の転記であり、整形（改行の連結・表の構造化・全角/半角は原文のまま保持）を加えている。加工・整形表示の最終文言は reuse conditions に従い root が確定する。","affiliation":"当サイトは金融財政事情研究会と提携・承認関係にない。"},
"transcriptionRules":["全角英数字・記号は原文のまま保持（Ａさん, Ｘ社, 〈 〉, 《 》, ①〜⑧）","PDF改行は連結（スペースなし）、ページ番号・柱は除去","□□□ は原文が伏せた箇所としてそのまま保持","数値入力問題に選択肢を作らない（原典は全問 自由記入）"],
"scope":{"questions":[54,55,56,57,58,59,60],"preservedUntouched":[51,52,53],"outOfScopeButSharedCase":"問60は第4問共通設例（甲土地）を共有。甲土地の概要は問61・62で使用し問60の解答には不要。問61・62は本packet範囲外。"},
"commonCases":[
 {"id":"case-q54-56","covers":[54,55,56],"physicalPdfPages":[7],"printedPages":[6],"text":case1,
  "tables":[
   {"id":"xy-financials","title":"〈Ｘ社とＹ社の財務データ等〉","unit":"百万円","columns":["項目","Ｘ社","Ｙ社"],"rows":[
    ["資産の部合計",295000,360000],["負債の部合計",60000,140000],["純資産の部合計",235000,220000],
    ["内訳:株主資本合計",196000,180000],["内訳:その他の包括利益累計額合計",30000,39000],["内訳:非支配株主持分",9000,1000],
    ["売上高",220000,225000],["売上総利益",74000,68000],["営業利益",25000,15000],["営業外収益",2000,3000],
    ["内訳:受取利息",400,500],["内訳:受取配当金",900,500],["内訳:その他",700,2000],
    ["営業外費用",1800,800],["内訳:支払利息",300,500],["内訳:社債利息",100,100],["内訳:その他",1400,200],
    ["経常利益",25200,17200],["親会社株主に帰属する当期純利益",18000,12200],["配当金総額",6000,4000],
    ["発行済株式総数","30百万株","25百万株"]],
    "note":"『内訳』は営業外収益(受取利息・受取配当金・その他)、営業外費用(支払利息・社債利息・その他)、純資産(株主資本・その他包括利益累計額・非支配株主持分)の内訳。表の見出し行右端の斜線セルは空。"},
   {"id":"fund-returns","title":"〈投資信託Ｓ・投資信託Ｔの予想収益率〉","unit":"%","columns":["シナリオ","生起確率(%)","投資信託Ｓの予想収益率(%)","投資信託Ｔの予想収益率(%)"],"rows":[["シナリオ１",50,4.0,8.8],["シナリオ２",40,6.0,7.6],["シナリオ３",10,9.5,3.1]]}],
  "caveat":"※上記以外の条件は考慮せず、各問に従うこと。"},
 {"id":"case-q57-59","covers":[57,58,59],"physicalPdfPages":[11,12],"printedPages":[10,11],"text":seg(316,324)+"〈Ｘ社の当期における法人税の確定申告に係る資料〉"+seg(326,359),"note":"資料本文は printedページ10〜11 にまたがる（(4)と※は次頁）。"},
 {"id":"case-q60-62","covers":[60,61,62],"physicalPdfPages":[15],"printedPages":[14],"text":seg(463,470),"notesText":seg(496,505),
  "figure":{"title":"〈甲土地の概要〉","description":"長方形の甲土地(400㎡)。東西25m×南北16m(北側8m＋南側8m)。東側に6m市道、南側に6m市道が接する角地。北側遠方に15m県道があり、特定道路から甲土地までの延長距離は56m(図中 56m 寸法線＋省略記号)。北が上(N矢印)。甲土地の北半分(8m)は第二種住居地域(指定建蔽率60%・指定容積率300%・前面道路幅員による容積率制限 4/10・防火地域)、南半分(8m)は第一種低層住居専用地域(指定建蔽率50%・指定容積率100%・前面道路幅員による容積率制限 4/10・準防火地域)。点線が用途地域境界。","verifiedBy":"PDF画像(110dpi)を目視確認","usedByQ60":False}}
]
}
# fix case text for q57-59 : verify lines exist
q={}
q[54]=dict(id="fp1-2026-05-oyo-q54",qNumber=54,type="fill-in-blanks",physicalPdfPages=[8],printedPages=[7],sharedCase="case-q54-56",
 stem=seg(235,258),answerType="mixed-numeric-and-term",
 blanks=[
  {"n":1,"kind":"number","unit":"％","decimals":2,"official":"7.96"},
  {"n":2,"kind":"number","unit":"％","decimals":2,"official":"8.18"},
  {"n":3,"kind":"number","unit":"回","decimals":2,"official":"0.75"},
  {"n":4,"kind":"number","unit":"倍","decimals":2,"official":"1.31"},
  {"n":5,"kind":"number","unit":"％","decimals":2,"official":"32.79"},
  {"n":6,"kind":"term","official":"総還元性向"}],
 rounding="計算結果は表示単位の小数点以下第３位を四捨五入し、小数点以下第２位まで",
 maskedByOriginal="Ｙ社の値(ROE等)・Ｘ社の配当性向など「□□□」で伏せられた値は問われない")
q[55]=dict(id="fp1-2026-05-oyo-q55",qNumber=55,type="calculation",physicalPdfPages=[8],printedPages=[7],sharedCase="case-q54-56",
 stem=seg(260,271),answerType="numeric-with-calculation-process",
 blanks=[{"n":1,"kind":"number","unit":"％","decimals":2,"official":"8.92"},{"n":2,"kind":"number","unit":"倍","decimals":2,"official":"26.67"}],
 rounding="〈答〉は表示単位の小数点以下第３位を四捨五入し、小数点以下第２位まで",calcProcessRequired=True)
q[56]=dict(id="fp1-2026-05-oyo-q56",qNumber=56,type="fill-in-blanks",physicalPdfPages=[9],printedPages=[8],sharedCase="case-q54-56",
 stem=seg(273,302),answerType="mixed-numeric-and-term",
 blanks=[{"n":1,"kind":"number","unit":"％","decimals":2,"official":"5.35"},{"n":2,"kind":"number","unit":"％","decimals":2,"official":"1.67"},{"n":3,"kind":"number","unit":"％","decimals":2,"official":"31.25"},{"n":4,"kind":"number","unit":"％","decimals":2,"official":"0.64"},{"n":5,"kind":"term","official":"相関係数"}],
 rounding="計算結果は表示単位の小数点以下第３位を四捨五入し、小数点以下第２位まで",
 maskedByOriginal="投資信託Ｔの組入比率は「□□□」で伏せ（68.75%相当は非公表・問われない）")
q[57]=dict(id="fp1-2026-05-oyo-q57",qNumber=57,type="fill-in-blanks",physicalPdfPages=[12],printedPages=[11],sharedCase="case-q57-59",
 stem=seg(363,367),
 conditions=["設例に示されている数値等以外の事項については考慮しないものとする。","所得の金額の計算上、選択すべき複数の方法がある場合は、所得の金額が最も低くなる方法を選択すること。"],
 table={"title":"〈略式別表四（所得の金額の計算に関する明細書）〉","unit":"円","rows":[
  ["当期利益の額",16756640,None],
  ["加算","損金経理をした納税充当金","blank①"],["加算","減価償却の償却超過額","blank②"],["加算","退職給付費用の損金不算入額","blank③"],["加算","小計","＊＊＊(伏せ)"],
  ["減算","減価償却超過額の当期認容額","blank④"],["減算","納税充当金から支出した事業税等の金額",840000],["減算","受取配当等の益金不算入額","blank⑤"],["減算","退職給付引当金の当期認容額","blank⑥"],["減算","小計","＊＊＊(伏せ)"],
  ["仮計","＊＊＊(伏せ)"],["法人税額から控除される所得税額（注）","blank⑦"],["合計","＊＊＊(伏せ)"],["欠損金等の当期控除額",0],["所得金額又は欠損金額","blank⑧"]],
  "footnote":"（注）法人税額から控除される復興特別所得税額を含む。"},
 answerType="numeric-yen",
 blanks=[{"n":i+1,"kind":"number","unit":"円","decimals":0,"official":v} for i,v in enumerate(["4,600,000","1,500,000","4,200,000","400,000","80,000","9,400,000","163,360","16,500,000"])],
 note="解答単位は円（原典〈答〉表記は（円））。")
q[58]=dict(id="fp1-2026-05-oyo-q58",qNumber=58,type="calculation",physicalPdfPages=[13],printedPages=[12],sharedCase="case-q57-59",
 stem=seg(400,402),
 table={"title":"〈資料〉普通法人における法人税の税率表","header":["資本金または出資金区分","課税所得金額の区分","税率(2025年4月1日以後開始事業年度)"],"rows":[["資本金または出資金100,000千円超の法人および一定の法人","所得金額","23.2％"],["その他の法人","年8,000千円以下の所得金額からなる部分の金額","15％"],["その他の法人","年8,000千円超の所得金額からなる部分の金額","23.2％"]]},
 answerType="numeric-yen-with-calculation-process",calcProcessRequired=True,
 blanks=[{"n":1,"kind":"number","unit":"円","decimals":0,"official":"2,758,600"}],
 rounding="〈答〉は100円未満を切り捨てて円単位",
 officialProcess="8,000,000円×15％＋(16,500,000円－8,000,000円)×23.2％＝3,172,000円 → 3,172,000円－250,000円－163,360円＝2,758,600円（100円未満切捨て）")
q[59]=dict(id="fp1-2026-05-oyo-q59",qNumber=59,type="fill-in-blanks",physicalPdfPages=[14],printedPages=[13],sharedCase="case-q57-59",
 stem=seg(423,457),answerType="numeric",
 blanks=[{"n":1,"kind":"number","unit":"万円","decimals":0,"official":"160"},{"n":2,"kind":"number","unit":"万円","decimals":0,"official":"3,000"},{"n":3,"kind":"number","unit":"％","decimals":0,"official":"30"},{"n":4,"kind":"number","unit":"％","decimals":0,"official":"7"},{"n":5,"kind":"number","unit":"％","decimals":0,"official":"20"},{"n":6,"kind":"number","unit":"年間","decimals":0,"official":"1"}],
 note="空欄⑤は本文に2回出現（同一の値20％）。原典の測定工具の下限『120万円以上』は本文に明記されており空欄ではない。")
q[60]=dict(id="fp1-2026-05-oyo-q60",qNumber=60,type="fill-in-blanks",physicalPdfPages=[16],printedPages=[15],sharedCase="case-q60-62",
 stem=seg(511,550),answerType="mixed-numeric-and-term",
 blanks=[{"n":1,"kind":"number","unit":"万円","decimals":0,"official":"1,200"},{"n":2,"kind":"number","unit":"％","decimals":0,"official":"3"},{"n":3,"kind":"number","unit":"％","decimals":1,"official":"0.4"},{"n":4,"kind":"term","unit":"区","official":"甲"},{"n":5,"kind":"number","unit":"年","decimals":0,"official":"2"},{"n":6,"kind":"number","unit":"年","decimals":0,"official":"1"},{"n":7,"kind":"number","unit":"カ月","decimals":0,"official":"6"}],
 maskedByOriginal="認定長期優良住宅の控除額は「□□□」で伏せ（問われない）",
 note="空欄⑥は本文に4回出現（同一値1年）。公式答は『甲（区）』『１（年間）』等、単位語付きの表記。")
ans_loc={54:3,55:3,56:3,57:4,58:4,59:4,60:5}
for n,v in q.items():
    v["officialAnswerLocator"]={"answerPdfPhysicalPage":ans_loc[n]+1,"answerPdfPrintedPage":ans_loc[n]}
    v["officialAnswerRaw"]={54:"〈答〉 ① 7.96（％） ② 8.18（％） ③ 0.75（回） ④ 1.31（倍） ⑤ 32.79（％） ⑥ 総還元性向",
     55:"① 8.92（％）（25,000百万円＋400百万円＋900百万円）÷295,000百万円×100＝8.92％ ② 26.67（倍） (15,000百万円＋500百万円＋500百万円)÷(500百万円＋100百万円)＝26.67倍",
     56:"〈答〉 ① 5.35（％） ② 1.67（％） ③ 31.25（％） ④ 0.64（％） ⑤ 相関係数",
     57:"〈答〉 ① 4,600,000（円） ② 1,500,000（円） ③ 4,200,000（円） ④ 400,000（円） ⑤ 80,000（円） ⑥ 9,400,000（円） ⑦ 163,360（円） ⑧ 16,500,000（円）",
     58:"〈答〉 2,758,600（円）",
     59:"〈答〉 ① 160（万円） ② 3,000（万円） ③ 30（％） ④ ７（％） ⑤ 20（％） ⑥ １（年間）",
     60:"〈答〉 ① 1,200（万円） ② ３（％） ③ 0.4（％） ④ 甲（区） ⑤ ２（年） ⑥ １（年） ⑦ ６（カ月）"}[n]
    v["choices"]=None
    v["choicesNote"]="原典に選択肢なし（自由記入）。人工選択肢は作らない。"
    v["license"]="出典: 金融財政事情研究会（reuse conditions 参照）"
data["questions"]=[q[k] for k in sorted(q)]
json.dump(data,open('/home/user/ipa-quiz-site/docs/evidence/fp1-may-2026-q54-source-a/source-a.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
for k in (54,57,59,60): print(k,q[k]['stem'][:60],'...',q[k]['stem'][-40:])
print(data['commonCases'][1]['text'][:200]); print(data['commonCases'][1]['text'][-150:]); print(data['commonCases'][2]['text'][-120:])
