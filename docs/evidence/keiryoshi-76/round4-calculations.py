"""Independent numerical recomputation for source-data review; stdlib only."""
import math,json
from pathlib import Path
E=Path('docs/evidence/keiryoshi-76');qs={(q['subject'],q['qNumber']):q for p in Path('data/questions/keiryoshi').glob('*.json') for q in json.loads(p.read_text())}
# Source conditions -> calculation -> nearest offered value (choices in official order).
cases=[
('一基',2,'200−max(143,170)',200-max(143,170),[0,27,30,57,113]),
('一基',3,'(4³＋3³) mod 6',(4**3+3**3)%6,[1,2,3,4,5]),
('一基',4,'ceil(−100(1−2×0.301−0.845))',math.ceil(-100*(1-2*.301-.845)),[45,46,47,48,49]),
('一基',8,'a=3,b=2,c=4; a+b+c',3+2+4,[4,6,8,9,10]),
('一基',11,'C(4,2)/C(6,3)',math.comb(4,2)/math.comb(6,3),[2/5,1/3,3/10,1/4,1/5]),
('一基',12,'2×1/2',2*.5,[5/4,1,3/4,1/2,1/4]),
('一基',19,'t(1/2−1/30)=1',1/(1/2-1/30),[1,2,3,4,5]),
('一基',21,'hc/(5.1eV) [nm]',6.6e-34*3e8/(5.1*1.6e-19)*1e9,[24,120,240,480,960]),
('一基',24,'800×90/3600',800*90/3600,[20,410,1200,32000,72000]),
('環物',8,'mg cosB; cosB=(13²+15²−7²)/(2×13×15)',10*(13**2+15**2-7**2)/(2*13*15),[7*math.sqrt(3)/13,13*math.sqrt(3)/15,13/3,115/13,26/3]),
('環物',9,'5×(10+1×2)/3',5*(10+2)/3,[5,10,15,20,25]),
('環物',11,'λ/v=4/(3/6)',4/(3/6),[2,4,6,8,10]),
('環物',13,'100(340−16)/(340+9); source emission-time correction also rounds to93',100*(340-16)/(340+9),[87,90,93,100,103]),
('環物',14,'coincident x=6.6k mm within ±10',2*math.floor(10/6.6)+1,[1,2,3,4,5]),
('環物',18,'400(0.1/3.2)^(2/5)−273',400*(.1/3.2)**.4-273,[-173,-73,-23,27,127]),
('環物',19,'0.9×150(100−T)=2100(T−20)',(.9*150*100+2100*20)/(.9*150+2100),[25,30,35,40,45]),
('環物',23,'(U−1)+U/2+(U−4)/3=0; I=U/2',((1+4/3)/(1+1/2+1/3))/2,[-10/11,-3/11,3/5,7/11,12/13]),
('環化',6,'12/log10(2)',12/.30,[20,30,40,50,60]),
('環化',7,'0.10×0.008/(2×0.020)',.10*.008/(2*.020),[.01,.02,.04,.06,.08]),
('環化',9,'1228+178+159+590+1145−2×328',1228+178+159+590+1145-2*328,[188,516,1500,2644,2972]),
('環化',15,'58.7×0.10×600/(2×96500)',58.7*.1*600/(2*96500),[.018,.027,.036,.054,.091]),
('環化',17,'14+log10(0.0050)',14+math.log10(.005),[10.7,11.2,11.7,12.3,12.8]),
('環化',22,'1080/18 ÷ ((122.4−0.9×16)/18) ×0.9',1080/18/((122.4-.9*16)/18)*.9,[.9,1,9,10,54]),
('環濃',2,'0.60×17/0.28/0.90',.60*17/.28/.90,[.41,36,41,24,.36]),
('環濃',12,'sqrt((.01/1.73)^2+(.01/(100×1.73))^2)',math.hypot(.01/1.73,.01/100/1.73),[.020,.017,.010,.0083,.0058]),
('環濃',18,'1.17×.300/58.5×10×170/10.5×100',1.17*.3/58.5*10*170/10.5*100,[100,99,98,97,96]),
('環音',5,'10log10(10^7+10^6.7)',10*math.log10(10**7+10**6.7),[68,70,72,74,76]),
('環音',7,'A corrections [−16.1,−8.6,−3.2,0,+1.2,+1.0]; energy sum',10*math.log10(sum(10**((a+b)/10) for a,b in zip([85,88,79,73,72,60],[-16.1,-8.6,-3.2,0,1.2,1.0]))),[67,72,77,82,87]),
('環音',8,'90+10log10(4/(100×.05/.95))',90+10*math.log10(4/(100*.05/.95)),[83,85,87,89,91]),
('環音',10,'20log10(.002/(20μPa×10^4))',20*math.log10(.002/(20e-6*10**4)),[-20,-34,-40,-74,-92]),
('環音',17,'(40×9.8/.001)/(2π×7)^2−40',(40*9.8/.001)/(2*math.pi*7)**2-40,[163,250,326,996,9960]),
('環音',21,'3×1.3e6/(2π×100)^2',3*1.3e6/(2*math.pi*100)**2,[4.2,10,26,420,1000]),
('環音',22,'80+10log10(.9/4+.1/2)',80+10*math.log10(.9/4+.1/2),[72,75,78,80,82]),
('環音',23,'20log10(.02/1e−5)−6',20*math.log10(.02/1e-5)-6,[60,63,66,69,72]),
('計質',2,'sqrt(1.1²+1.6²+5.7²+10²+21²)',math.sqrt(sum(x*x for x in [1.1,1.6,5.7,10,21])),[7.9,24,39,48,580]),
('計質',5,'12+13×.05',12+13*.05,[10.65,12.65,30.65,38,38.65]),
('計質',7,'13/1',13/1,[2,6.5,9.8,13,26]),
('計質',10,'sqrt((2/1.41)^2−1)/10',math.sqrt((2/1.41)**2-1)/10,[.01,.1,1,10,100]),
('計質',14,'sqrt((0.1mV/1V)^2+(0.1mΩ/1Ω)^2)×1A [mA]',math.hypot(.0001,.0001)*1000,[.01,.1,.14,.2,1000]),
('計質',16,'50×9.794/9.804',50*9.794/9.804,[50.10,50.05,50,49.95,49.90]),
]
rows=[]
for subject,n,formula,value,offered in cases:
 q=qs[subject,n];idx=min(range(5),key=lambda i:abs(offered[i]-value));assert q['officialAnswerNumber']==str(idx+1),(subject,n,value)
 rows.append(dict(subject=subject,qNumber=n,calculation=formula,value=value,choiceValues=offered,dataChoices=q['choices'],nearestChoiceNumber=idx+1,officialAnswerNumber=q['officialAnswerNumber'],pass_=True))
# Substitution checks for the sign-sensitive matrix question, independent of key.
q=qs['一基',9];matrix=json.loads(q['choices']['オ'].replace('−','-'));assert [matrix[i][0] for i in range(2)]==[1,-1];assert [-matrix[i][0]+matrix[i][1] for i in range(2)]==[-3,4]
# Four-bit complement and overflow, including each distractor's 3-column tuple.
q=qs['管理',19];target=['1011','0111','0010'];assert q['choices']['ア'].split('/')==target;assert (int('0101',2)+int(target[0],2))&15==0;assert (int(target[1],2)+int(target[0],2))&15==int(target[2],2)
result=dict(scope='40 independent numerical recomputations + matrix substitution + binary arithmetic. Other symbolic/qualitative questions are manually reviewed; this is not a claim that executable checks prove all 1000 explanations.',numericalChecks=len(rows),matrixQuestion='一基9',binaryQuestion='管理19',calculations=rows)
(E/'round4-calculations.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print('PASS',len(rows),'numerical + matrix + binary')
