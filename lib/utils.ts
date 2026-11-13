import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export const EXAM_LABELS: Record<string, string> = {
  "sasshi1": "サッシ施工技能士 1級",
  "sasshi2": "サッシ施工技能士 2級",
  "engei-soshoku3": "園芸装飾技能士 3級",
  "kyoka-plastic2": "強化プラスチック成形技能士 2級",
  "chikuro2": "築炉技能士 2級",
  "chikuro1": "築炉技能士 1級",
  "kagaku-bunseki1": "化学分析技能士 1級",
  "kagaku-bunseki3": "化学分析技能士 3級",
  "futsu-senban3": "機械加工技能士 3級（普通旋盤作業）",
  "shashutsu3": "プラスチック成形技能士 3級（射出成形作業）",
  "kikai-kensa3": "機械検査技能士 3級",
  "kikai-kensa1": "機械検査技能士 1級",
  "katawaku1": "型枠施工技能士 1級",
  "katawaku2": "型枠施工技能士 2級",
  "kogyo-hoso1": "工業包装技能士 1級",
  "kikai-kensa2": "機械検査技能士 2級",
  "kogyo-hoso2": "工業包装技能士 2級",
  "haiden-seigyo1": "電気機器組立て技能士 1級",
  "haiden-seigyo3": "電気機器組立て技能士 3級",
  "kenchiku-bankin2": "建築板金技能士 2級",
  "kensetsu-kikai-seibi1": "建設機械整備技能士 1級",
  "sakan3": "左官技能士 3級",
  "sakan2": "左官技能士 2級",
  "bousui-urethane2": "防水施工技能士 2級（ウレタン）",
  "naiso-kosei2": "内装仕上げ施工技能士 2級（鋼製下地）",
  "kinzoku-press2": "金属プレス加工技能士 2級",
  "tekkin-zumen3": "鉄筋施工技能士 3級",
  "katawaku3": "型枠施工技能士 3級",
  "kyoka-plastic1": "強化プラスチック成形技能士 1級",
  "engei-soshoku1": "園芸装飾技能士 1級",
  "flower3": "フラワー装飾技能士 3級",
  "insatsu2": "印刷技能士 2級",
  "insatsu1": "印刷技能士 1級",
  "flower1": "フラワー装飾技能士 1級",
  "flower2": "フラワー装飾技能士 2級",
  "fujin-kodomofuku2": "婦人子供服製造技能士 2級",
  "fujin-kodomofuku1": "婦人子供服製造技能士 1級",
  "toso1": "塗装技能士 1級",
  "benrishi": "弁理士（短答式）",
  "sokuryoshi": "測量士",
  "dokugeki-chiba": "毒物劇物取扱者",
  "jokaso-setsubishi": "浄化槽設備士（学科）",
  "chiiki-ryoko": "地域限定旅行業務取扱管理者",
  "junkango-kansai": "准看護師",
  "kukaku-seiri": "土地区画整理士（学科）",
  "dojo-osen": "土壌汚染調査技術管理者",
  "kenchikushi2": "二級建築士（学科）",
  "mokuzo-kenchikushi": "木造建築士（学科）",

  "sekou-1kenchiku": "1級建築施工管理（第一次）",
  "khk-kagaku": "高圧ガス製造保安責任者（化学）",
  kenchikushi1: "一級建築士（学科）",
    shihoshoshi: "司法書士",
    "chintai": "賃貸不動産経営管理士",
    "kyusui": "給水装置工事主任技術者",
    "biru-kan": "建築物環境衛生管理技術者",
    "gijutsushi1-kikai": "技術士第一次試験・機械部門",
    "hoshasen-1": "第一種放射線取扱主任者",
    "hoshasen-2": "第二種放射線取扱主任者",
    "khk-kikai-kou": "高圧ガス製造保安責任者 甲種機械",
    "khk-kikai-otsu": "高圧ガス製造保安責任者 乙種機械",
    "energy-kanri": "エネルギー管理士",
    "reform-mgr": "マンションリフォームマネジャー",
    "shohi-sodan": "消費生活相談員",
    "biyoshi": "美容師",
    "kikenbutsu-otsu1": "危険物取扱者 乙種第1類",
    "kikenbutsu-otsu2": "危険物取扱者 乙種第2類",
    "kikenbutsu-otsu6": "危険物取扱者 乙種第6類",
    kanteishi: "不動産鑑定士",
    kaikeishi: "公認会計士",
    "riku-tech2": "第二級陸上無線技術士",
    "amateur2": "第二級アマチュア無線技士",
    "maritime-radar": "レーダー級海上特殊無線技士",
    "amateur1": "第一級アマチュア無線技士",
    "maritime-special1": "第一級海上特殊無線技士",
    "aviation-comm": "航空無線通信士",
    "riku-toku-kokunai": "国内電信級陸上特殊無線技士",
    "koku-toku": "航空特殊無線技士",
    "land-special1": "第一級陸上特殊無線技士",
    "riku-tech1": "第一級陸上無線技術士",
    "maritime4": "第四級海上無線通信士",
    "maritime2": "第二級海上無線通信士",
    "maritime1": "第一級海上無線通信士",
    "general1": "第一級総合無線通信士",
    "general2": "第二級総合無線通信士",
    "general3": "第三級総合無線通信士",
    "maritime3": "第三級海上無線通信士",
    "land-special2": "第二級陸上特殊無線技士",
    "land-special3": "第三級陸上特殊無線技士",
    "kai-toku2": "第二級海上特殊無線技士",
    "kai-toku3": "第三級海上特殊無線技士",
    chosashi: "土地家屋調査士",
    riyoshi: "理容師",
    ip: "ITパスポート",
    sg: "情報セキュリティマネジメント",
    fe: "基本情報技術者",
    ap: "応用情報技術者",
    st: "ITストラテジスト",
    sa: "システムアーキテクト",
    pm: "プロジェクトマネージャ",
    nw: "ネットワークスペシャリスト",
    db: "データベーススペシャリスト",
    es: "エンベデッドシステムスペシャリスト",
    sc: "情報処理安全確保支援士",
    sm: "ITサービスマネージャ",
    au: "システム監査技術者",
    fp2: "2級FP技能検定",
    fp1: "1級FP技能検定",
    fp3: "3級FP技能検定",
    denken3: "第三種電気主任技術者",
    denken2: "第二種電気主任技術者",
    denken1: "第一種電気主任技術者",
    denko2: "第二種電気工事士",
    denko1: "第一種電気工事士",
    takken: "宅地建物取引士",
    civil2: "2級土木施工管理技士",
    kankoji2: "2級管工事施工管理技士",
    zoen2: "2級造園施工管理技士",
    zoen1: "1級造園施工管理技士",
    tsushin2: "2級電気通信工事施工管理技士",
    tsushin1: "1級電気通信工事施工管理技士",
    kaigo: "介護福祉士",
    civil1: "1級土木施工管理技士",
    shakai: "社会福祉士",
    seishin: "精神保健福祉士",
    tohan: "登録販売者",
    kanri: "管理業務主任者",
    eisei1: "第一種衛生管理者",
    eisei2: "第二種衛生管理者",
    soukan: "技術士 総合技術監理部門",
    hoikushi: "保育士試験",
    mankan: "マンション管理士",
    kashikin: "貸金業務取扱主任者",
    sharoushi: "社会保険労務士",
    "chusho-kigyo-shindanshi": "中小企業診断士",
    kangoshi: "看護師",
    yakuzaishi: "薬剤師",
    "rigaku-ryohoshi": "理学療法士",
    hokenshi: "保健師",
    josanshi: "助産師",
    "sagyo-ryohoshi": "作業療法士",
  "gengo-chokakushi": "言語聴覚士",
    "shino-kunrenshi": "視能訓練士",
    "rinsho-kogishi": "臨床工学技士",
    "judo-seifukushi": "柔道整復師",
    "gas-kou": "ガス主任技術者 甲種",
    "gas-otsu": "ガス主任技術者 乙種",
    "gas-hei": "ガス主任技術者 丙種",
    "rinsho-kensagishi": "臨床検査技師",
    "shinryo-hoshasengishi": "診療放射線技師",
    "shika-ishi": "歯科医師",
    "ahaki-anma": "あん摩マッサージ指圧師",
    "ahaki-hari-kyu": "はり師・きゅう師",
    "kenchiku-setsubishi": "建築設備士",
    chizai2: "知的財産管理技能検定2級",
    kisho: "気象予報士",
    "jidosha-1-small-written": "一級小型自動車整備士（筆記）",
    "jidosha-2-gasoline": "二級ガソリン自動車整備士",
    "jidosha-2-diesel": "二級ジーゼル自動車整備士",
    "jidosha-2-chassis": "二級自動車シャシ整備士",
    "jidosha-2-motorcycle": "二級二輪自動車整備士",
    "jidosha-3-chassis": "三級自動車シャシ整備士",
    "jidosha-3-gasoline": "三級自動車ガソリン・エンジン整備士",
    "jidosha-3-diesel": "三級自動車ジーゼル・エンジン整備士",
    "jidosha-3-motorcycle": "三級二輪自動車整備士",
    "jidosha-body": "自動車車体整備士",
    "jidosha-electrical": "自動車電気装置整備士",
    jokaso: "浄化槽管理士",
    "iji-shuzen": "マンション維持修繕技術者",
    denki1: "1級電気工事施工管理（第一次検定）",
    shuwa: "手話通訳士",
    "jken-katsuyo1": "J検 情報活用1級",
    "jken-katsuyo2": "J検 情報活用2級",
    "jken-katsuyo3": "J検 情報活用3級",
    "jken-system": "J検 情報システム",
    shinrishi: "公認心理師",
    "khk-reito-3": "第三種冷凍機械",
    "khk-reito-2": "第二種冷凍機械",
    "khk-reito-1": "第一種冷凍機械",
    "sekou-kenchiku2": "2級建築施工管理（第一次検定）",
    denki2: "2級電気工事施工管理（第一次検定）",
    kankoji1: "1級管工事施工管理技士",
    "yamaguchi-chori": "調理師",
    "yamaguchi-seika": "製菓衛生師",
    "yamaguchi-fugu": "ふぐ処理師（学科）",
    "keiryoshi": "一般計量士",
    "keiryoshi-nodo": "環境計量士（濃度関係）",
    "keiryoshi-soon": "環境計量士（騒音・振動関係）",
    kenki2: "2級建設機械施工管理（第一次）",
    kenki1: "1級建設機械施工管理（第一次）",
    gyosei: "行政書士",
    "career-consultant": "キャリアコンサルタント（学科）",
    "kanri-eiyoshi": "管理栄養士",
    "sogo-ryoko": "総合旅行業務取扱管理者",
    "shiho-tanto": "司法試験（短答）",
    "yobi-tanto": "予備試験（短答）",
    "sokuryoshiho": "測量士補",
    "caremanager": "ケアマネ試験",
    "denshi-kiki-kumitate1": "電子機器組立て技能士 1級",
    "denshi-kiki-kumitate3": "電子機器組立て技能士 3級",
    "tekko2": "鉄工技能士 2級",
    "tekko1": "鉄工技能士 1級",
    "denshi-kiki-kumitate2": "電子機器組立て技能士 2級",
    "kinzoku-netsushori1": "金属熱処理技能士 1級",
    "kojo-bankin1": "工場板金技能士 1級",
    "kinzoku-netsushori2": "金属熱処理技能士 2級",
  "mekki3": "めっき技能士 3級",
  "mekki1": "めっき技能士 1級",
    "kinzoku-netsushori3": "金属熱処理技能士 3級",
    "kojo-bankin3": "工場板金技能士 3級",
    "kojo-bankin2": "工場板金技能士 2級",
    "kensetsu-kikai-seibi2": "建設機械整備技能士 2級",
    "hyoso1": "表装技能士 1級",
    "tairu2": "タイル張り技能士 2級",
    "sekizai1": "石材施工技能士 1級",
    "hyoso2": "表装技能士 2級",
    "shohin-soshoku3": "商品装飾展示技能士 3級",
    "shashin1": "写真技能士 1級",
    "sessaku-kensaku1": "切削工具研削技能士 1級",
    "tatami1": "畳製作技能士 1級",
    "fraise1": "機械加工技能士 1級（フライス盤作業）",
    "fraise2": "機械加工技能士 2級（フライス盤作業）",
    "fraise3": "機械加工技能士 3級（フライス盤作業）",
    "funmatsu-yakin1": "粉末冶金技能士 1級",
    "nunohaku1": "布はく縫製技能士 1級",
    "kikinzoku-soshin1": "貴金属装身具製作技能士 1級",
    "shashin3": "写真技能士 3級",
    "kikinzoku-soshin3": "貴金属装身具製作技能士 3級",
    "kikinzoku-soshin2": "貴金属装身具製作技能士 2級",
    "tobi1": "とび技能士 1級",
    "tobi3": "とび技能士 3級",
    "kenchiku-daiku1": "建築大工技能士 1級",
    "kenchiku-daiku3": "建築大工技能士 3級",
    "kenchiku-daiku2": "建築大工技能士 2級",
    "shashin2": "写真技能士 2級",
    "kikai-hozen-denki3": "機械保全技能士 3級（電気系）",
    "kikai-hozen-denki1": "機械保全技能士 1級（電気系）",
    "kikai-hozen-setsubi1": "機械保全技能士 1級（設備診断）",
    "kikai-hozen3": "機械保全技能士 3級（機械系）",
    "kikai-hozen1": "機械保全技能士 1級（機械系）",
    "kikai-hozen": "機械保全技能士 2級",
    "tsukanshi": "通関士"
};
export function examLabel(exam: string): string {
    return EXAM_LABELS[exam] ?? exam.toUpperCase();
}
export function seasonLabel(season: string): string {
    if (season === "round1")
        return "第I回";
    if (season === "round2")
        return "第II回";
    if (season === "spring")
        return "春期";
    if (season === "autumn")
        return "秋期";
    if (season === "cbt")
        return "CBT";
    if (season === "published")
        return "公表問題";
    if (season === "first")
        return "上期";
    if (season === "early")
        return "前期";
    if (season === "second")
        return "下期";
    if (season === "may")
        return "5月試験";
    if (season === "september")
        return "9月試験";
    if (season === "january")
        return "1月試験";
    if (season === "february")
        return "2月試験";
    if (season === "june")
        return "6月試験";
    if (season === "october")
        return "10月試験";
    if (season === "late")
        return "後期";
    if (season === "annual")
        return "";
    if (season === "july")
        return "7月試験";
    if (season === "august")
        return "8月試験";
    if (season === "march")
        return "3月試験";
    if (season === "primary")
        return "一次試験";
    if (season === "kansai")
        return "年1回";
    return season;
}
export function formatYearSeason(year: number, season: string): string {
    if (["may", "september", "january", "february", "june", "august", "march", "october"].includes(season))
        return `${year}年${seasonLabel(season)}`;
    if (season === "published")
        return `${year}年公表問題`;
    if (season === "round1" || season === "round2")
        return `令和${year - 2018}年試験 ${seasonLabel(season)}`;
    const reiwa = year - 2018;
    const era = reiwa >= 1 ? `令和${reiwa}年度` : `${year}年度`;
    // 年1回の国家試験（介護福祉士等）は年度だけで回を特定する。
    if (season === "annual" || season === "kansai")
        return era;
    return `${era} ${seasonLabel(season)}`;
}
