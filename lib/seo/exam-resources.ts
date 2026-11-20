import type { ExamCode } from "@/lib/questions/types";


/**
 * 各試験区分の IPA 公式リソース。
 * 出典: IPA 情報処理技術者試験 公式ページ（https://www.ipa.go.jp/shiken/）。
 * 公式情報を直接掲載することで E-E-A-T（権威性）を補強する。
 */
export interface ExamOfficialLinks {

  /** IPA 公式の試験概要ページ */

  overview: string;

  /** シラバス（出題範囲） PDF / ページ */

  syllabus: string;

  /** 過去問題の公開ページ */

  pastQuestions: string;

}


const IPA_BASE = "https://www.ipa.go.jp/shiken";


export const EXAM_OFFICIAL_LINKS = {
  "concrete-assou2": { overview: "https://www.kentei.javada.or.jp/list02.html?v1=%E4%BB%A4%E5%92%8C7%E5%B9%B4%E5%BA%A6&v2=%E5%BE%8C%E6%9C%9F&v3=B50&v4=%E3%82%B3%E3%83%B3%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%88%E5%9C%A7%E9%80%81%E6%96%BD%E5%B7%A5%EF%BC%88%E3%82%B3%E3%83%B3%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%88%E5%9C%A7%E9%80%81%E5%B7%A5%E4%BA%8B%E4%BD%9C%E6%A5%AD%EF%BC%89", syllabus: "https://www.kentei.javada.or.jp/list02.html?v1=%E4%BB%A4%E5%92%8C7%E5%B9%B4%E5%BA%A6&v2=%E5%BE%8C%E6%9C%9F&v3=B50&v4=%E3%82%B3%E3%83%B3%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%88%E5%9C%A7%E9%80%81%E6%96%BD%E5%B7%A5%EF%BC%88%E3%82%B3%E3%83%B3%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%88%E5%9C%A7%E9%80%81%E5%B7%A5%E4%BA%8B%E4%BD%9C%E6%A5%AD%EF%BC%89", pastQuestions: "https://www.kentei.javada.or.jp/list02.html?v1=%E4%BB%A4%E5%92%8C7%E5%B9%B4%E5%BA%A6&v2=%E5%BE%8C%E6%9C%9F&v3=B50&v4=%E3%82%B3%E3%83%B3%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%88%E5%9C%A7%E9%80%81%E6%96%BD%E5%B7%A5%EF%BC%88%E3%82%B3%E3%83%B3%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%88%E5%9C%A7%E9%80%81%E5%B7%A5%E4%BA%8B%E4%BD%9C%E6%A5%AD%EF%BC%89" },
  "kawarabuki1": { overview: "https://www.kentei.javada.or.jp/list02.html?v1=%E4%BB%A4%E5%92%8C7%E5%B9%B4%E5%BA%A6&v2=%E5%BE%8C%E6%9C%9F&v3=B43&v4=%E3%81%8B%E3%82%8F%E3%82%89%E3%81%B6%E3%81%8D%EF%BC%88%E3%81%8B%E3%82%8F%E3%82%89%E3%81%B6%E3%81%8D%E4%BD%9C%E6%A5%AD%EF%BC%89", syllabus: "https://www.kentei.javada.or.jp/list02.html?v1=%E4%BB%A4%E5%92%8C7%E5%B9%B4%E5%BA%A6&v2=%E5%BE%8C%E6%9C%9F&v3=B43&v4=%E3%81%8B%E3%82%8F%E3%82%89%E3%81%B6%E3%81%8D%EF%BC%88%E3%81%8B%E3%82%8F%E3%82%89%E3%81%B6%E3%81%8D%E4%BD%9C%E6%A5%AD%EF%BC%89", pastQuestions: "https://www.kentei.javada.or.jp/list02.html?v1=%E4%BB%A4%E5%92%8C7%E5%B9%B4%E5%BA%A6&v2=%E5%BE%8C%E6%9C%9F&v3=B43&v4=%E3%81%8B%E3%82%8F%E3%82%89%E3%81%B6%E3%81%8D%EF%BC%88%E3%81%8B%E3%82%8F%E3%82%89%E3%81%B6%E3%81%8D%E4%BD%9C%E6%A5%AD%EF%BC%89" },
  "zensho-marketing": { overview: "https://zensho.or.jp/examination/pastexams/economics/", syllabus: "https://zensho.or.jp/examination/pastexams/economics/", pastQuestions: "https://zensho.or.jp/examination/pastexams/economics/" },
  "kogai-11": {"overview": "https://www.jemai.or.jp/polconman/examination/past.html", "syllabus": "https://www.jemai.or.jp/polconman/examination/past.html", "pastQuestions": "https://www.jemai.or.jp/polconman/examination/past.html"},
  "kogai-14": {"overview": "https://www.jemai.or.jp/polconman/examination/past.html", "syllabus": "https://www.jemai.or.jp/polconman/examination/past.html", "pastQuestions": "https://www.jemai.or.jp/polconman/examination/past.html"},
  "cfp-souzoku": {"overview": "https://www.jafp.or.jp/aim/cfp/cfp_exam/mohan.shtml", "syllabus": "https://www.jafp.or.jp/aim/cfp/cfp_exam/mohan.shtml", "pastQuestions": "https://www.jafp.or.jp/aim/cfp/cfp_exam/mohan.shtml"},
  "kogai-taiki-tokuron": {"overview": "https://www.jemai.or.jp/polconman/examination/past.html", "syllabus": "https://www.jemai.or.jp/polconman/examination/past.html", "pastQuestions": "https://www.jemai.or.jp/polconman/examination/past.html"},
  "telecom-chief-denso": {"overview": "https://www.dekyo.or.jp/shiken/chief/exam", "syllabus": "https://www.dekyo.or.jp/shiken/chief/exam", "pastQuestions": "https://www.dekyo.or.jp/shiken/chief/exam"},
  "gijutsushi1-kensetsu": { overview: "https://www.engineer.or.jp/c_categories/index02021.html", syllabus: "https://www.engineer.or.jp/c_categories/index02021.html", pastQuestions: "https://www.engineer.or.jp/c_categories/index02021.html" },
  "kogai-18": {"overview": "https://www.jemai.or.jp/polconman/examination/past.html", "syllabus": "https://www.jemai.or.jp/polconman/examination/past.html", "pastQuestions": "https://www.jemai.or.jp/polconman/examination/past.html"},
  "kogai-13": {"overview": "https://www.jemai.or.jp/polconman/examination/past.html", "syllabus": "https://www.jemai.or.jp/polconman/examination/past.html", "pastQuestions": "https://www.jemai.or.jp/polconman/examination/past.html"},
  "concrete-assou1": {"overview": "https://www.kentei.javada.or.jp/", "syllabus": "https://www.kentei.javada.or.jp/", "pastQuestions": "https://www.kentei.javada.or.jp/"},
  "zensho-eco-80": {"overview": "https://zensho.or.jp/examination/pastexams/economics/", "syllabus": "https://zensho.or.jp/examination/pastexams/economics/", "pastQuestions": "https://zensho.or.jp/examination/pastexams/economics/"},
  "kogai-08": {"overview": "https://www.jemai.or.jp/polconman/examination/past.html", "syllabus": "https://www.jemai.or.jp/polconman/examination/past.html", "pastQuestions": "https://www.jemai.or.jp/polconman/examination/past.html"},
  "kogai-04": {"overview": "https://www.jemai.or.jp/polconman/examination/past.html", "syllabus": "https://www.jemai.or.jp/polconman/examination/past.html", "pastQuestions": "https://www.jemai.or.jp/polconman/examination/past.html"},
  "aigan-kangoshi": {"overview": "https://www.ccrvn.jp/aigan.shiken.mondai.kakoshiken.html", "syllabus": "https://www.ccrvn.jp/aigan.shiken.mondai.kakoshiken.html", "pastQuestions": "https://www.ccrvn.jp/aigan.shiken.mondai.kakoshiken.html"},
  "cfp-3": {"overview": "https://www.jafp.or.jp/aim/cfp/cfp_exam/mohan.shtml", "syllabus": "https://www.jafp.or.jp/aim/cfp/cfp_exam/mohan.shtml", "pastQuestions": "https://www.jafp.or.jp/aim/cfp/cfp_exam/mohan.shtml"},
  "dekyo-charge-2": {"overview": "https://www.dekyo.or.jp/shiken/charge/exam", "syllabus": "https://www.dekyo.or.jp/shiken/charge/exam", "pastQuestions": "https://www.dekyo.or.jp/shiken/charge/exam"},
  "kogai-16": {"overview": "https://www.jemai.or.jp/polconman/examination/past.html", "syllabus": "https://www.jemai.or.jp/polconman/examination/past.html", "pastQuestions": "https://www.jemai.or.jp/polconman/examination/past.html"},
  "building-cleaning2": {"overview": "https://www.j-bma.or.jp/qualification-training/building-cleaning", "syllabus": "https://www.j-bma.or.jp/qualification-training/building-cleaning", "pastQuestions": "https://www.j-bma.or.jp/qualification-training/building-cleaning"},
  "kogai-taiki-yugai": {"overview": "https://www.jemai.or.jp/polconman/examination/past.html", "syllabus": "https://www.jemai.or.jp/polconman/examination/past.html", "pastQuestions": "https://www.jemai.or.jp/polconman/examination/past.html"},
  "dekyo-digital2": {"overview": "https://www.dekyo.or.jp/shiken/charge/exam", "syllabus": "https://www.dekyo.or.jp/shiken/charge/exam", "pastQuestions": "https://www.dekyo.or.jp/shiken/charge/exam"},
  "sakui-rotary1": {"overview": "https://www.kentei.javada.or.jp/", "syllabus": "https://www.kentei.javada.or.jp/", "pastQuestions": "https://www.kentei.javada.or.jp/"},
  "kouku-kanseikan": {"overview": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_24.html", "syllabus": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_24.html", "pastQuestions": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_24.html"},
  "cfp-realestate": {"overview": "https://www.jafp.or.jp/aim/cfp/cfp_exam/", "syllabus": "https://www.jafp.or.jp/aim/cfp/cfp_exam/mohan.shtml", "pastQuestions": "https://www.jafp.or.jp/aim/cfp/cfp_exam/mohan.shtml"},
  "building-cleaning3": {"overview": "https://www.j-bma.or.jp/qualification-training/building-cleaning", "syllabus": "https://www.j-bma.or.jp/qualification-training/building-cleaning", "pastQuestions": "https://www.j-bma.or.jp/qualification-training/building-cleaning"},
  "kogai-taiki-gairon": {"overview": "https://www.jemai.or.jp/polconman/examination/past.html", "syllabus": "https://www.jemai.or.jp/polconman/examination/past.html", "pastQuestions": "https://www.jemai.or.jp/polconman/examination/past.html"},
  "kogai-17": {"overview": "https://www.jemai.or.jp/polconman/examination/past.html", "syllabus": "https://www.jemai.or.jp/polconman/examination/past.html", "pastQuestions": "https://www.jemai.or.jp/polconman/examination/past.html"},
  "dekyo-chief-3": {"overview": "https://www.dekyo.or.jp/shiken/chief/exam", "syllabus": "https://www.dekyo.or.jp/shiken/chief/exam", "pastQuestions": "https://www.dekyo.or.jp/shiken/chief/exam"},
  eiken3: { overview: "https://www.eiken.or.jp/eiken/exam/grade_3/", syllabus: "https://www.eiken.or.jp/eiken/exam/grade_3/", pastQuestions: "https://www.eiken.or.jp/eiken/exam/grade_3/" },
  "restaurant-3": {"overview": "https://hrs.or.jp/restaurant/certificate/index.html", "syllabus": "https://hrs.or.jp/restaurant/certificate/index.html", "pastQuestions": "https://hrs.or.jp/restaurant/certificate/index.html"},
  eiken4: {"overview": "https://www.eiken.or.jp/eiken/exam/grade_4/", "syllabus": "https://www.eiken.or.jp/eiken/exam/grade_4/", "pastQuestions": "https://www.eiken.or.jp/eiken/exam/grade_4/"},
  "nyukoku-keibikan": {"overview": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_27.html", "syllabus": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_27.html", "pastQuestions": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_27.html"},
  chizai3: {"overview": "https://www.kentei-info-ip-edu.org/gakushujoho/kakomon/", "syllabus": "https://www.kentei-info-ip-edu.org/gakushujoho/kakomon/", "pastQuestions": "https://www.kentei-info-ip-edu.org/gakushujoho/kakomon/"},
  "dekyo-chief-2": {"overview": "https://www.dekyo.or.jp/shiken/chief/exam", "syllabus": "https://www.dekyo.or.jp/shiken/chief/exam", "pastQuestions": "https://www.dekyo.or.jp/shiken/chief/exam"},
  "kogai-06": {"overview": "https://www.jemai.or.jp/polconman/examination/past.html", "syllabus": "https://www.jemai.or.jp/polconman/examination/past.html", "pastQuestions": "https://www.jemai.or.jp/polconman/examination/past.html"},
  "kogai-large-water": {"overview": "https://www.jemai.or.jp/polconman/examination/past.html", "syllabus": "https://www.jemai.or.jp/polconman/examination/past.html", "pastQuestions": "https://www.jemai.or.jp/polconman/examination/past.html"},
  "dekyo-chief-system": { overview: "https://www.dekyo.or.jp/shiken/chief/exam", syllabus: "https://www.dekyo.or.jp/shiken/chief/exam", pastQuestions: "https://www.dekyo.or.jp/shiken/chief/exam" },
  eiken5: { overview: "https://www.eiken.or.jp/eiken/exam/grade_5/", syllabus: "https://www.eiken.or.jp/eiken/exam/grade_5/", pastQuestions: "https://www.eiken.or.jp/eiken/exam/grade_5/" },
  "rodo-kijun-kantokukan": { overview: "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_23.html", syllabus: "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_23.html", pastQuestions: "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_23.html" },
  chizai1: { overview: "https://www.kentei-info-ip-edu.org/gakushujoho/kakomon/", syllabus: "https://www.kentei-info-ip-edu.org/gakushujoho/kakomon/", pastQuestions: "https://www.kentei-info-ip-edu.org/gakushujoho/kakomon/" },
  "kogai-09": { overview: "https://www.jemai.or.jp/polconman/examination/past.html", syllabus: "https://www.jemai.or.jp/polconman/examination/past.html", pastQuestions: "https://www.jemai.or.jp/polconman/examination/past.html" },
  webdesign2: { overview: "https://www.webdesign.gr.jp/measures/publication/", syllabus: "https://www.webdesign.gr.jp/measures/publication/", pastQuestions: "https://www.webdesign.gr.jp/measures/publication/" },
  "glass-sekou1": {"overview":"https://www.kentei.javada.or.jp/list02.html?v1=%E4%BB%A4%E5%92%8C7%E5%B9%B4%E5%BA%A6&v2=%E5%BE%8C%E6%9C%9F&v3=B56&v4=%E3%82%AC%E3%83%A9%E3%82%B9%E6%96%BD%E5%B7%A5%EF%BC%88%E3%82%AC%E3%83%A9%E3%82%B9%E5%B7%A5%E4%BA%8B%E4%BD%9C%E6%A5%AD%EF%BC%89","syllabus":"https://www.kentei.javada.or.jp/list02.html?v1=%E4%BB%A4%E5%92%8C7%E5%B9%B4%E5%BA%A6&v2=%E5%BE%8C%E6%9C%9F&v3=B56&v4=%E3%82%AC%E3%83%A9%E3%82%B9%E6%96%BD%E5%B7%A5%EF%BC%88%E3%82%AC%E3%83%A9%E3%82%B9%E5%B7%A5%E4%BA%8B%E4%BD%9C%E6%A5%AD%EF%BC%89","pastQuestions":"https://www.kentei.javada.or.jp/list02.html?v1=%E4%BB%A4%E5%92%8C7%E5%B9%B4%E5%BA%A6&v2=%E5%BE%8C%E6%9C%9F&v3=B56&v4=%E3%82%AC%E3%83%A9%E3%82%B9%E6%96%BD%E5%B7%A5%EF%BC%88%E3%82%AC%E3%83%A9%E3%82%B9%E5%B7%A5%E4%BA%8B%E4%BD%9C%E6%A5%AD%EF%BC%89"},
  "eikenp1": {"overview":"https://www.eiken.or.jp/eiken/exam/grade_p1/","syllabus":"https://www.eiken.or.jp/eiken/exam/grade_p1/","pastQuestions":"https://www.eiken.or.jp/eiken/exam/grade_p1/"},
  "zensho-eco-81": {"overview":"https://zensho.or.jp/examination/pastexams/economics/","syllabus":"https://zensho.or.jp/examination/pastexams/economics/","pastQuestions":"https://zensho.or.jp/examination/pastexams/economics/"},
  "kogai-07": {"overview":"https://www.jemai.or.jp/polconman/examination/past.html","syllabus":"https://www.jemai.or.jp/polconman/examination/past.html","pastQuestions":"https://www.jemai.or.jp/polconman/examination/past.html"},
  "webdesign-3": {"overview":"https://www.webdesign.gr.jp/measures/publication/","syllabus":"https://www.webdesign.gr.jp/measures/publication/","pastQuestions":"https://www.webdesign.gr.jp/measures/publication/"},
  "kokka-ippan-dai": {"overview": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_15.html", "syllabus": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_15.html", "pastQuestions": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_15.html"},
  "kokka-sogo-in": {"overview": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_11.html", "syllabus": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_11.html", "pastQuestions": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_11.html"},
  "technical-illustration-cad1": {"overview": "https://www.kentei.javada.or.jp/list02.html?v1=%E4%BB%A4%E5%92%8C7%E5%B9%B4%E5%BA%A6&v2=%E5%BE%8C%E6%9C%9F&v3=B58&v4=%E3%83%86%E3%82%AF%E3%83%8B%E3%82%AB%E3%83%AB%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%EF%BC%88%E3%83%86%E3%82%AF%E3%83%8B%E3%82%AB%E3%83%AB%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%EF%BC%A3%EF%BC%A1%EF%BC%A4%E4%BD%9C%E6%A5%AD%EF%BC%89", "syllabus": "https://www.kentei.javada.or.jp/list02.html?v1=%E4%BB%A4%E5%92%8C7%E5%B9%B4%E5%BA%A6&v2=%E5%BE%8C%E6%9C%9F&v3=B58&v4=%E3%83%86%E3%82%AF%E3%83%8B%E3%82%AB%E3%83%AB%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%EF%BC%88%E3%83%86%E3%82%AF%E3%83%8B%E3%82%AB%E3%83%AB%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%EF%BC%A3%EF%BC%A1%EF%BC%A4%E4%BD%9C%E6%A5%AD%EF%BC%89", "pastQuestions": "https://www.kentei.javada.or.jp/list02.html?v1=%E4%BB%A4%E5%92%8C7%E5%B9%B4%E5%BA%A6&v2=%E5%BE%8C%E6%9C%9F&v3=B58&v4=%E3%83%86%E3%82%AF%E3%83%8B%E3%82%AB%E3%83%AB%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%EF%BC%88%E3%83%86%E3%82%AF%E3%83%8B%E3%82%AB%E3%83%AB%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%EF%BC%A3%EF%BC%A1%EF%BC%A4%E4%BD%9C%E6%A5%AD%EF%BC%89"},
  "kawarabuki2": {"overview": "https://www.kentei.javada.or.jp/", "syllabus": "https://www.kentei.javada.or.jp/", "pastQuestions": "https://www.kentei.javada.or.jp/"},
  "zensho-eco-79": {"overview": "https://zensho.or.jp/examination/pastexams/economics/", "syllabus": "https://zensho.or.jp/examination/pastexams/economics/", "pastQuestions": "https://zensho.or.jp/examination/pastexams/economics/"},
  "career-gino-1": {"overview": "https://www.career-kentei.org/about/learninfo/", "syllabus": "https://www.career-kentei.org/about/learninfo/", "pastQuestions": "https://www.career-kentei.org/about/learninfo/"},
  "kogai-12": { overview: "https://www.jemai.or.jp/polconman/", syllabus: "https://www.jemai.or.jp/polconman/examination/past.html", pastQuestions: "https://www.jemai.or.jp/polconman/examination/past.html" },
  "kogai-15": { overview: "https://www.jemai.or.jp/polconman/", syllabus: "https://www.jemai.or.jp/polconman/examination/past.html", pastQuestions: "https://www.jemai.or.jp/polconman/examination/past.html" },
  "dekyo-charge-1": { overview: "https://www.dekyo.or.jp/shiken/charge/", syllabus: "https://www.dekyo.or.jp/shiken/charge/exam", pastQuestions: "https://www.dekyo.or.jp/shiken/charge/exam" },
  "toukei1": {"overview": "https://www.toukei-kentei.jp/preparation/kakomon/", "syllabus": "https://www.toukei-kentei.jp/preparation/kakomon/", "pastQuestions": "https://www.toukei-kentei.jp/preparation/kakomon/"},
  "zensho-eco-77": { overview: "https://zensho.or.jp/examination/economics/", syllabus: "https://zensho.or.jp/examination/economics/", pastQuestions: "https://zensho.or.jp/examination/pastexams/economics/" },
  eikenp2: { overview: "https://www.eiken.or.jp/eiken/exam/grade_p2/", syllabus: "https://www.eiken.or.jp/eiken/exam/grade_p2/", pastQuestions: "https://www.eiken.or.jp/eiken/exam/grade_p2/" },
  literas: {"overview": "https://literas.benesse.ne.jp/", "syllabus": "https://literas.benesse.ne.jp/power.html", "pastQuestions": "https://literas.benesse.ne.jp/image.html"},
  cfp: {"overview": "https://www.jafp.or.jp/aim/cfp/cfp_exam/", "syllabus": "https://www.jafp.or.jp/aim/cfp/cfp_exam/step05.shtml", "pastQuestions": "https://www.jafp.or.jp/aim/cfp/cfp_exam/mohan.shtml"},
  "kokka-sogo-dai": {"overview": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_13.html", "syllabus": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_13.html", "pastQuestions": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_13.html"},
  "boueki-c": { overview: "https://www.boujitsu.com/introduction/questionstrend/qt-c/c2", syllabus: "https://www.boujitsu.com/introduction/questionstrend/qt-c/c2", pastQuestions: "https://www.boujitsu.com/introduction/questionstrend/qt-c/c2" },
  service2: { overview: "https://jitsumu-ginou-kentei.jp/SV/example", syllabus: "https://jitsumu-ginou-kentei.jp/SV/example", pastQuestions: "https://jitsumu-ginou-kentei.jp/SV/example" },
  apef3: {

    overview: "https://apefdapf.org/dapf/presentation/exemples",

    syllabus: "https://apefdapf.org/dapf/presentation/exemples",

    pastQuestions: "https://apefdapf.org/dapf/presentation/exemples",

  },
  ishi: {

    overview: "https://www.mhlw.go.jp/kouseiroudoushou/shikaku_shiken/ishi/",

    syllabus: "https://www.mhlw.go.jp/kouseiroudoushou/shikaku_shiken/ishi/",

    pastQuestions: "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/tp260424-01.html",

  },
  "kokuzei-senmonkan": { overview: "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_21.html", syllabus: "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_21.html", pastQuestions: "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_21.html" },
  "kenchiku-setsubishi": { overview: "https://www.jaeic.or.jp/shiken/bmee/", syllabus: "https://www.jaeic.or.jp/shiken/bmee/", pastQuestions: "https://www.jaeic.or.jp/shiken/bmee/bmee-mondai.html" },
  denki1: { overview: "https://www.fcip-shiken.jp/den1/index.html", syllabus: "https://www.fcip-shiken.jp/den1/index.html", pastQuestions: "https://www.fcip-shiken.jp/about/index.html" },
  denki2: { overview: "https://www.fcip-shiken.jp/den2/index.html", syllabus: "https://www.fcip-shiken.jp/den2/index.html", pastQuestions: "https://www.fcip-shiken.jp/about/index.html" },
  "riku-tech2": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  "amateur2": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  "maritime-radar": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  "amateur1": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  "maritime-special1": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  "aviation-comm": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  "maritime1": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  "maritime2": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  "general1": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  "general2": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  "general3": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  "maritime3": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  "land-special2": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  "land-special3": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  "riku-tech1": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  "maritime4": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  "riku-toku-kokunai": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  "land-special1": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  "koku-toku": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  "kai-toku2": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  "kai-toku3": { overview: "https://www.nichimu.or.jp/kshiken/siken/index.html", syllabus: "https://www.nichimu.or.jp/kshiken/siken/index.html", pastQuestions: "https://www.nichimu.or.jp/kshiken/siken/index.html" },
  ip: {

    overview: `${IPA_BASE}/kubun/ip.html`,

    syllabus: `${IPA_BASE}/syllabus/index.html`,

    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,

  },
  sg: {

    overview: `${IPA_BASE}/kubun/sg.html`,

    syllabus: `${IPA_BASE}/syllabus/index.html`,

    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,

  },
  fe: {

    overview: `${IPA_BASE}/kubun/fe.html`,

    syllabus: `${IPA_BASE}/syllabus/index.html`,

    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,

  },
  ap: {

    overview: `${IPA_BASE}/kubun/ap.html`,

    syllabus: `${IPA_BASE}/syllabus/index.html`,

    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,

  },
  st: {

    overview: `${IPA_BASE}/kubun/st.html`,

    syllabus: `${IPA_BASE}/syllabus/index.html`,

    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,

  },
  sa: {

    overview: `${IPA_BASE}/kubun/sa.html`,

    syllabus: `${IPA_BASE}/syllabus/index.html`,

    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,

  },
  pm: {

    overview: `${IPA_BASE}/kubun/pm.html`,

    syllabus: `${IPA_BASE}/syllabus/index.html`,

    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,

  },
  nw: {

    overview: `${IPA_BASE}/kubun/nw.html`,

    syllabus: `${IPA_BASE}/syllabus/index.html`,

    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,

  },
  db: {

    overview: `${IPA_BASE}/kubun/db.html`,

    syllabus: `${IPA_BASE}/syllabus/index.html`,

    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,

  },
  es: {

    overview: `${IPA_BASE}/kubun/es.html`,

    syllabus: `${IPA_BASE}/syllabus/index.html`,

    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,

  },
  sc: {

    overview: `${IPA_BASE}/kubun/sc.html`,

    syllabus: `${IPA_BASE}/syllabus/index.html`,

    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,

  },
  sm: {

    overview: `${IPA_BASE}/kubun/sm.html`,

    syllabus: `${IPA_BASE}/syllabus/index.html`,

    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,

  },
  au: {

    overview: `${IPA_BASE}/kubun/au.html`,

    syllabus: `${IPA_BASE}/syllabus/index.html`,

    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,

  },
} as unknown as Record<ExamCode, ExamOfficialLinks>;


export interface RoadmapStep {

  /** 開始時点（試験まで N ヶ月前） */

  monthsBefore: number;

  /** ステップ名 */

  title: string;

  /** ステップでやること */

  body: string;

}


/**
 * 試験区分ごとの学習ロードマップ。
 * 期間と進捗の目安は IPA 統計の合格者像と一般的な学習ペースから推定。
 */
export const EXAM_ROADMAP = {

  ip: [

    { monthsBefore: 3, title: "基礎用語の網羅", body: "テクノロジ・マネジメント・ストラテジ各分野の用語をひととおり眺める。" },

    { monthsBefore: 2, title: "過去問演習スタート", body: "1日 30 問ペースで過去問を解き、誤答ノートを作る。" },

    { monthsBefore: 1, title: "弱点分野の集中対策", body: "正答率の低い分野に絞って 3 周。CBT 模試で本番形式に慣れる。" },

    { monthsBefore: 0, title: "総仕上げ", body: "直近 3 期分を通しで解いて時間配分を確定。" },

  ],

  sg: [

    { monthsBefore: 3, title: "情報セキュリティ全体像", body: "暗号・認証・組織のセキュリティ管理の基礎用語を体系化。" },

    { monthsBefore: 2, title: "科目 A 過去問演習", body: "知識問題を1日 20 問ペースで反復し、用語の抜けを潰す。" },

    { monthsBefore: 1, title: "科目 B 事例演習", body: "セキュリティ事故事例の長文問題に慣れ、設問パターンを掴む。" },

    { monthsBefore: 0, title: "総仕上げ", body: "通しで模試を 2-3 回解き、本番のペース配分を確認。" },

  ],

  fe: [

    { monthsBefore: 6, title: "テクノロジ系基礎固め", body: "アルゴリズム・データ構造・ネットワーク・DB の基礎を教科書で一巡。" },

    { monthsBefore: 4, title: "科目 A 演習", body: "過去問道場相当の量を解き、頻出分野を可視化。" },

    { monthsBefore: 2, title: "科目 B 擬似言語対策", body: "擬似言語のトレースを毎日継続。情報セキュリティの長文問題も並行。" },

    { monthsBefore: 1, title: "総仕上げ", body: "本番形式の模試を 2-3 回。時間配分とミスパターンを確定。" },

  ],

  ap: [

    { monthsBefore: 6, title: "全分野インプット", body: "教科書を 1 周し、各分野のキーワードを索引化。" },

    { monthsBefore: 4, title: "午前過去問 5 期分", body: "午前を 5 期分解き、正答率を分野別に記録。" },

    { monthsBefore: 2, title: "午後選択分野の絞り込み", body: "選択 5 問を 7 分野程度に絞り込み記述演習。" },

    { monthsBefore: 1, title: "午後通し演習", body: "150 分通しで午後を解く。時間配分・記述量の感覚を作る。" },

    { monthsBefore: 0, title: "弱点補強と直近年度", body: "直近 2 期分を通しで解き、誤答ノートを最終確認。" },

  ],

  st: [

    { monthsBefore: 6, title: "経営戦略・IT 戦略の体系", body: "BSC・SWOT・5 フォースなど主要フレームワークを整理。" },

    { monthsBefore: 4, title: "午前 II 演習", body: "高度共通午前 I と午前 II 過去問を反復。" },

    { monthsBefore: 2, title: "論述事例の蓄積", body: "業務事例 5-10 件を「課題→施策→効果」の形でストック。" },

    { monthsBefore: 1, title: "論文添削", body: "過去問の設問ごとの字数指定と制限時間を守って論述し、週1回は書き直す。" },

    { monthsBefore: 0, title: "総仕上げ", body: "直近の論述問題を 2-3 本書き上げ、構成パターンを完成。" },

  ],

  sa: [

    { monthsBefore: 6, title: "アーキ設計の基礎", body: "システム要件・方式設計・移行設計の論点を整理。" },

    { monthsBefore: 4, title: "午前 II 演習", body: "高度共通午前 I と午前 II 過去問を反復。" },

    { monthsBefore: 2, title: "午後 I の記述演習", body: "200-300 字の解答を粒度別に書き分ける訓練。" },

    { monthsBefore: 1, title: "午後 II 論文", body: "業務事例を中心に、設問ごとの字数指定に合わせた論述の構成を練習。" },

    { monthsBefore: 0, title: "総仕上げ", body: "直近 2 期分を通しで解き、論文骨子を最終調整。" },

  ],

  pm: [

    { monthsBefore: 6, title: "PMBOK と IPA 用語の対応", body: "10 知識エリアと IPA 出題用語の対応表を作る。" },

    { monthsBefore: 4, title: "午前 II 演習", body: "計算問題（EVM・PERT・スケジューリング）を中心に反復。" },

    { monthsBefore: 2, title: "午後 I 記述", body: "リスク・進捗・品質管理のテーマで設問パターンに慣れる。" },

    { monthsBefore: 1, title: "午後 II 論文", body: "PJ ごとの課題と対応のセットを 5 件以上作成。" },

    { monthsBefore: 0, title: "総仕上げ", body: "直近の論文問題を 2 本仕上げ、業務事例の差し替え方を訓練。" },

  ],

  nw: [

    { monthsBefore: 6, title: "TCP/IP と主要プロトコル", body: "L2-L7 までの代表プロトコルの挙動を本で深掘り。" },

    { monthsBefore: 4, title: "午前 II 演習", body: "サブネット計算・ルーティング・DNS など計算系を徹底反復。" },

    { monthsBefore: 2, title: "午後 I パケット演習", body: "Wireshark などで実機キャプチャを読みながら過去問を解く。" },

    { monthsBefore: 1, title: "午後 II 設計問題", body: "VLAN/冗長/セキュリティの設計問題を 5 期分解き構成パターンを記憶。" },

    { monthsBefore: 0, title: "総仕上げ", body: "直近 2 期分を通しで解き、出題傾向の最新動向を確認。" },

  ],

  db: [

    { monthsBefore: 6, title: "正規化と SQL 基礎", body: "3NF までの正規化と SQL 基本操作を反復。" },

    { monthsBefore: 4, title: "午前 II 演習", body: "ロック・トランザクション・分散 DB の論点を厚めに。" },

    { monthsBefore: 2, title: "午後 I の SQL 記述", body: "SQL 記述問題を毎日 2-3 問解く。" },

    { monthsBefore: 1, title: "午後 II 設計問題", body: "概念-論理-物理設計を一気通貫で記述する練習。" },

    { monthsBefore: 0, title: "総仕上げ", body: "直近 2 期分を通しで解き、ER 図・SQL の出力速度を上げる。" },

  ],

  es: [

    { monthsBefore: 6, title: "組込み基礎", body: "RTOS・割込み・タスクスケジューリングの基礎を整理。" },

    { monthsBefore: 4, title: "午前 II 演習", body: "計測・制御・通信の出題を反復。" },

    { monthsBefore: 2, title: "午後 I 記述", body: "状態遷移図・タイミング図の読み書きを徹底。" },

    { monthsBefore: 1, title: "午後 II 設計問題", body: "システム設計・性能設計の長文に慣れる。" },

    { monthsBefore: 0, title: "総仕上げ", body: "直近 2 期分を通しで解き出題傾向を確認。" },

  ],

  sc: [

    { monthsBefore: 4, title: "セキュリティ全体像", body: "脅威・脆弱性・対策技術の体系を整理。" },

    { monthsBefore: 3, title: "午前 II 演習", body: "暗号・認証・脆弱性管理を反復。" },

    { monthsBefore: 2, title: "午後 記述演習（基礎）", body: "インシデント対応・脆弱性診断のシナリオ問題に慣れる。" },

    { monthsBefore: 1, title: "午後 記述演習（実践）", body: "システム構築 / 運用での具体的な対策設計の長文記述問題に取組む。" },

    { monthsBefore: 0, title: "総仕上げ", body: "最新の脅威動向（OWASP Top 10 など）と直近年度を確認。" },

  ],

  sm: [

    { monthsBefore: 4, title: "ITIL 基礎", body: "ITIL 4 のサービスバリューシステムと 34 プラクティスを概観。" },

    { monthsBefore: 3, title: "午前 II 演習", body: "サービス継続・キャパシティ・セキュリティ管理を反復。" },

    { monthsBefore: 2, title: "午後 I 記述", body: "インシデント・問題・変更管理の事例問題に慣れる。" },

    { monthsBefore: 1, title: "午後 II 論文", body: "ITSM 改善活動の業務事例を 5 件以上作成。" },

    { monthsBefore: 0, title: "総仕上げ", body: "直近 2 期分の論文を仕上げ、構成パターンを確定。" },

  ],

  au: [

    { monthsBefore: 4, title: "監査基準と内部統制", body: "システム監査基準・管理基準・COSO/COBIT を整理。" },

    { monthsBefore: 3, title: "午前 II 演習", body: "監査手続・監査証拠・監査調書の出題を反復。" },

    { monthsBefore: 2, title: "午後 I 記述", body: "監査対象システムごとの事例問題に慣れる。" },

    { monthsBefore: 1, title: "午後 II 論文", body: "監査計画-実施-報告の論文骨子を複数パターン用意。" },

    { monthsBefore: 0, title: "総仕上げ", body: "直近 2 期分の論文を仕上げ、監査人視点の表現を磨く。" },

  ],

} as unknown as Record<ExamCode, RoadmapStep[]>;
