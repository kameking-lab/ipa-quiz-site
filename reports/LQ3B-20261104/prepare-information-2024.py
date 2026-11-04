"""Corrected against all 21 R6 information PDF pages; diagrams retained."""
import json
import re
from pathlib import Path

ROOT=Path(__file__).resolve().parent
lines=(ROOT/'2024-16-sorted.txt').read_text(encoding='utf8').splitlines()
text=''.join(x for x in lines if not re.search(r'^===|【16】|令和6年度|Ⅲ次の35',x))
text=text.replace('Ⅲー341台','Ⅲー34 1台')
parts=re.split(r'Ⅲ[ー－−一]\s*(\d+)\s*',text)
questions={}
for i in range(1,len(parts),2):
    n,body=int(parts[i]),parts[i+1]
    for old,new in [('ブッシュダウン','プッシュダウン'),('ハイバーバイサ','ハイパーバイザ'),
      ('wⅲd。ws','Windows'),('FieldProgrammabIeGateArray','Field Programmable Gate Array'),
      ('staticRandomAccessMemory','Static Random Access Memory'),('Look—UpTable','Look-Up Table'),
      ('GraphicsProcessingUnit','Graphics Processing Unit'),('一一種','一種'),('不揮発かっ','不揮発かつ'),
      ('ファンクションプロック','ファンクションブロック'),('もった','もった'),
      ('AdvancedDriver—Assistancesystem','Advanced Driver-Assistance System'),
      ('保っこと','保つこと'),('見積りエ数','見積り工数'),('EnterpriseResourcePIanning','Enterprise Resource Planning'),
      ('いっ，','いつ，'),('sub日。w','subflow'),('LongTermEvolution','Long Term Evolution'),
      ('SP800ー63Bー4','SP800-63B-4'),('Uⅲc。de','Unicode'),('プロックリスト','ブロックリスト'),
      ('web','Web'),('サー.バ','サーバ'),('バケット','パケット'),
      ('c。。kie','Cookie'),('C。。kie','Cookie'),('D。main','Domain'),('プラウザ','ブラウザ'),(',','，')]:
        body=body.replace(old,new)
    chunks=re.split(r'[①②③④⑤]',body)
    if len(chunks)==6:questions[n]=dict(text=chunks[0],choices=chunks[1:])
questions[1]['text']='データ数nの配列をソートするアルゴリズムにおいて，時間計算量がO(n log n)となる場合として，最も適切なものはどれか。'
questions[2]=dict(text='情報システムの脆弱性に対するオープンで包括的，汎用的な評価手法の確立と普及を目指して開発され，脆弱性の深刻度を同一の基準の下で定量的に比較しているものとして，次のうち最も適切なものはどれか。',choices=['Japan Vulnerability Notes (JVN)','Common Vulnerabilities and Exposures (CVE)','Domain Keys Identified Mail (DKIM)','Common Vulnerability Scoring System (CVSS)','Japan Computer Emergency Response Team Coordination Center (JPCERT/CC)'])
questions[3]=dict(text='情報源記号A，B，C，D，Eをそれぞれ0.12，0.3，0.05，0.45，0.08の確率で発生する無記憶5元情報源に対する2元ハフマン符号として，最も適切なものはどれか。ただし，例えばAを100と符号化することをA→100と書くことにする。',choices=['A→100，B→11，C→1010，D→0，E→1011','A→100，B→00，C→1110，D→0，E→1011','A→100，B→110，C→111，D→00，E→01','A→110，B→101，C→111，D→000，E→100','A→110，B→1110，C→0，D→1111，E→10'])
questions[4]['choices'][3]='任意のチューリング機械Mと任意の記号列σに対して，Mがσを入力として行う計算が停止するか否かを判定する万能チューリング機械を必ず構成できる。'
questions[5]=dict(text='下図は，探索対象のグラフ（木構造）を表している。開始ノードSから始めて，目的ノードGを深さ優先探索と幅優先探索で探したとき，調べるノードの個数はそれぞれいくつか。ただし，あるノードからその先のノードを調べる際には，左側の枝から先に調べるものとし，ノードの個数には開始ノード及び目的ノードを含めることにする。',choices=['深さ優先探索12，幅優先探索11','深さ優先探索13，幅優先探索11','深さ優先探索14，幅優先探索11','深さ優先探索13，幅優先探索12','深さ優先探索14，幅優先探索12'],hasFigure=True)
questions[6]=dict(text="次のPythonプログラムを実行したときに出力される結果として，最も適切なものはどれか。\n\nx = 3\nbit = 1 << x\nmask = 1 << 7\n\nfor i in range(8):\n    if bit & mask == 0:\n        print(0, end='')\n    else:\n        print(1, end='')\n    mask = mask >> 1\nprint()",choices=['00001000','00010000','10000000','00010001','01010101'])
questions[7]=dict(text='オブジェクト指向プログラミングについて，次の(a)～(c)の説明が表す概念の組合せとして，最も適切なものはどれか。\n(a) クラスBがクラスAのフィールドやメソッドを内包して利用できること\n(b) データの構造とデータへの操作をひとまとめにすること\n(c) 同じメソッド名をクラスによって異なるふるまいで実行させること',choices=['a：汎化／b：カプセル化／c：抽象化','a：継承／b：カプセル化／c：ポリモーフィズム','a：汎化／b：クラス／c：ポリモーフィズム','a：継承／b：情報隠蔽／c：抽象化','a：汎化／b：情報隠蔽／c：ポリモーフィズム'])
questions[8]['text']='メインメモリに接続された，キャッシュメモリを内蔵したCPUがある。キャッシュメモリのアクセスタイムは20ナノ秒，メインメモリのアクセスタイムは120ナノ秒である。また，キャッシュのヒット率は80％である。\nここで，アクセスタイムが180ナノ秒であるようなメインメモリに変えるが，CPUのキャッシュメモリについてもアクセスタイムが何倍か速いものに変えることで，平均アクセスタイムを維持することを考える。最低限必要な倍率として，最も近い値はどれか。'
questions[9]['choices'][0]='フラッシュメモリは書き換え回数に限度があるため，FPGAのメモリには採用されない。'
questions[10]['choices'][0]='GPUは，コア数やアーキテクチャが変わっても同じプログラムを実行できるように開発されている。'
questions[11]['choices'][0]='さまざまな場面をあらかじめ想定して経験させ，考え得る全てのルールを搭載することで，自動運転機能を搭載した自動車は，自分でよりよい答えを導き出して運転する。'
questions[14]=dict(text='基本論理演算のAND（論理積），OR（論理和），NOT（否定）を用いて構成した次の式のうち，排他的論理和（XOR）と同等の式として，最も適切なものはどれか。\nなお，aとbとの論理積を(a∩b)，論理和を(a∪b)，aの否定を¬aと表現する。',choices=['¬(a∩(a∪b))','(a∩b)∪(a∩b)','(a∪b)∩(a∪b)','(a∩¬b)∪(¬a∩b)','(a∪¬b)∩(¬a∪b)'])
questions[15]=dict(text='循環的複雑度（M）は，プログラムの制御フローをグラフと見なし，以下の式により算出される。Eはグラフのエッジ数，Nはグラフのノード数，Pは連結されたコンポーネント数である。\nM = E − N ＋ 2P\n下図はC言語（左側）で書かれたプログラムの制御フロー（右側）を表したものである。単独モジュールの循環的複雑度を計算する場合，Pの値は1となる。下図のプログラムの循環的複雑度として，最も適切なものはどれか。',choices=['1','2','3','4','5'],hasFigure=True)
questions[16]=dict(text='次の図は自動販売機における投入金額に応じた販売ランプの点灯と消灯，販売，残高確認を行う状態遷移図を表している。(A)～(C)に入る組合せとして，最も適切なものはどれか。',choices=['A：残高≧価格／B：残高＜価格／C：残高≧価格','A：残高≦価格／B：残高＜価格／C：残高≧価格','A：残高＞価格／B：残高≦価格／C：残高＞価格','A：残高＜価格／B：残高＜価格／C：残高≧価格','A：残高≧価格／B：残高≦価格／C：残高＞価格'],hasFigure=True)
questions[17]=dict(text='次の表は，あるシステム開発における作業，先行作業，作業時間（日）の計画である。この表からPERT図を作成してクリティカル・パスを特定した。このシステム開発におけるクリティカル・パスは何日か。\n作業／先行作業／作業日数（日）\nA／なし／6\nB／なし／8\nC／B／7\nD／A／6\nE／A／9\nF／D／5\nG／C，E，F／4',choices=['18日','19日','20日','21日','22日'])
questions[18]['text']='次の図はあるソフトウェア開発における不良摘出状況管理図で，点線に示すのは当初予定のテスト消化残件数と累積バグ件数である。予定どおりにテストが進んでいない場合，テスト消化の実績の方向はAかBのどちらかになり，検出累積バグ数の実績の方向はCかDのどちらかになることがある。ここで，時刻Xにおけるテスト消化の実績と検出累積バグ数の実績の方向がBとDの組合せとなった場合の状況を表す説明として，最も適切なものはどれか。'
questions[18]['hasFigure']=True
questions[20]['text']='次のソースコードはC言語で書かれたプログラムの一部である。レビューにて「プログラム中のモジュールAとBの関係性は低いため，結合関係を弱くするリファクタリングをすべき」と指摘があった。レビューの結果を反映するために，最も適切な修正案はどれか。'
questions[20]['choices']=[x.replace('s-time','s_time').replace('e-time','e_time').replace('etime','e_time').replace('c-minutes','c_minutes').replace('custom-malloc','custom_malloc') for x in questions[20]['choices']]
questions[20]['choices'][3]=questions[20]['choices'][3].removesuffix('ー')
questions[20]['hasFigure']=True
questions[21]=dict(text='次の流れ図において，ステートメントカバレッジ（命令網羅）が100％となる最小のテストケース数として，最も適切なものはどれか。なお，とりうる経路は，流れに逆らわないもの全てとする。',choices=['1','2','3','4','5'],hasFigure=True)
# The causal-loop answer choices are themselves diagrams, preserved as original.
questions[24]={}
questions[25]['choices'][2]=questions[25]['choices'][2].replace('いっ','いつ')
questions[25]['choices'][2]=questions[25]['choices'][2].replace('いつた情報','いった情報')
questions[25]['choices'][3]='基幹情報システムといい，販売，経理・会計，人事，生産，在庫などの業務をカバーする情報システムである。ワンファクト・ワンプレースというコンセプトで，企業の世界中のサイトから同じ情報を共有できる。'
questions[26]['text']='UMLクラス図で示した下図のデータモデルに関する次の記述のうち，最も適切なものはどれか。ここで，ステレオタイプ<<Entity>>は，まだ属性を規定しない段階の，概念的なデータであることを意味する。'
questions[26]['hasFigure']=True
questions[27]=dict(text='データベースのテーブルの正規形のうち，第1正規形，第2正規形，第3正規形の中で，第3正規形のみに要求される条件として，次のうち最も適切なものはどれか。',choices=['テーブルのキー以外のすべての属性が，キーに対し完全従属である。','テーブルのキー以外のすべての属性が，キーに対し推移従属していない。','テーブルの定義域が単純，繰り返し項目を含まない。','キー項目にナル値（NULL）を含まない。','キー項目に一意性制約がある。'])
questions[28]['choices'][4]='データベースの二重更新や更新中の不正な情報の伝播が生じないように1つのジョブがあるデータを更新する際に，他のジョブが同一データをアクセスしないように排除すること。'
questions[30]=dict(text='RFC 4291で定義されるIPv6（Internet Protocol version 6）のアドレス表記に関して，次のうち最も適切なものはどれか。',choices=['2001:0000:0d38:6ab8:3457:bbbb','2001::d38:6ab8:3457:7bbbb','2001::d38:6ab8::bbbb','2001:d38:6ab8:bbbb','2001:d38::bbbb'])
questions[31]=dict(text='次のうち，10.0.144.0/20のサブネット内の端末に割り振ることができるIPアドレスで最大アドレスとして，最も適切なものはどれか。',choices=['10.0.0.254','10.0.144.254','10.0.159.254','10.0.255.254','10.255.255.254'])
questions[34]['text']='1台のファイアウォールで，外部セグメント，DMZ，内部ネットワークの3つのセグメントに分割されたネットワークにおいて，個人情報を扱うDBサーバと一般公開するWebサーバで構成されるシステムによってユーザ向けのサービスをインターネットで公開する。このとき，インターネットからの不正アクセスからDBサーバのデータを保護するためのサーバの設置方法に関する次の記述のうち，最も適切なものはどれか。\nなお，このファイアウォールは，外部セグメントとDMZとの間，及びDMZと内部ネットワークとの間の通信では特定のプロトコルだけを許可し，外部セグメントと内部ネットワークとの間の通信は許可しないものとする。'
questions[35]['choices'][4]=questions[35]['choices'][4].replace('Webブラウザ','Webブラウザ')
questions[32]['sources']=[dict(title='NIST SP800-63B-4 第2公開草案（2024年8月・設問当時）',url='https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-63B-4.2pd.pdf')]
questions[6]['hasFigure']=True
questions[11]['sources']=[dict(title='NHTSA 運転自動化レベル（2022年・Level 0の一時的支援）',url='https://www.nhtsa.gov/sites/nhtsa.gov/files/2022-03/Levels_of_Automation_Static_022822-v4-tag.pdf')]
assert set(questions)==set(range(1,36)),set(range(1,36))-set(questions)
reasons=json.loads((ROOT/'information-2024-reasons.json').read_text(encoding='utf8'))
for q in reasons:q.update(questions[q['number']])
(ROOT/'manuscripts/pe-first-information-2024.json').write_text(json.dumps(reasons,ensure_ascii=False,indent=2)+'\n',encoding='utf8',newline='\n')
print('Prepared 35 questions; diagram answers remain in official images.')
