import { ZENKOU_KEISAN_GIJUTSU_QUESTIONS } from "./zenkou-keisan-gijutsu";
import { KATEI_SHOKUMOTSU_QUESTIONS } from "./katei-shokumotsu";
import { KATEI_HIFUKU_QUESTIONS } from "./katei-hifuku";
import { ZENKOU_JOHO_QUESTIONS } from "./zenkou-joho";
import { KATEI_HOIKU_QUESTIONS } from "./katei-hoiku";
import { KATEI_SHOKU_CHORI_QUESTIONS } from "./katei-shoku-chori";
import { MENTAL_HEALTH_MANAGEMENT_QUESTIONS } from "./mental-health-management";
import { BUILDING_CLEANING_SSW1_QUESTIONS } from "./building-cleaning-ssw1";
import { COURT_STAFF_QUESTIONS } from "./saibansho-ippan-dai";
import { KYOIN_TOKYO_QUESTIONS } from "./kyoin-tokyo";
import { KYOIN_OSAKA_QUESTIONS } from "./kyoin-osaka";
import { CG_CREATOR_BASIC_QUESTIONS } from "./cg-creator-basic";
import { CG_CREATOR_EXPERT_QUESTIONS } from "./cg-creator-expert";
import { CG_ENGINEER_BASIC_QUESTIONS } from "./cg-engineer-basic";
import { CG_ENGINEER_EXPERT_QUESTIONS } from "./cg-engineer-expert";
import { MULTIMEDIA_KENTEI_BASIC_QUESTIONS } from "./multimedia-kentei-basic";
import { MULTIMEDIA_KENTEI_EXPERT_QUESTIONS } from "./multimedia-kentei-expert";
import { G_KENTEI_QUESTIONS } from "./g-kentei";
import { KYOTO_KENTEI3_QUESTIONS } from "./kyoto-kentei3";
import { TOPIK1_QUESTIONS } from "./topik1";
import { APEF4_QUESTIONS } from "./apef4";
import { CHUKEN3_QUESTIONS } from "./chuken3";
import { BIZ_CAREER_LOGISTICS3_QUESTIONS } from "./biz-career-logistics3";
import { QUESTIONS as KHK_HANBAI2_QUESTIONS } from "./khk-hanbai2";
import { QUESTIONS as KIKENBUTSU_OTSU5_QUESTIONS } from "./kikenbutsu-otsu5";
import { QUESTIONS as KIKENBUTSU_OTSU3_QUESTIONS } from "./kikenbutsu-otsu3";
import { QUESTIONS as KHK_HANBAI_QUESTIONS } from "./khk-hanbai";
import { QUESTIONS as SHOBO_SETSUBISHI_OTSU4_QUESTIONS } from "./shobo-setsubishi-otsu4";
import { QUESTIONS as SHOBO_SETSUBISHI_OTSU7_QUESTIONS } from "./shobo-setsubishi-otsu7";
import { QUESTIONS as SHOBO_SETSUBISHI_KOU3_QUESTIONS } from "./shobo-setsubishi-kou3";
import { QUESTIONS as SHOBO_SETSUBISHI_KOU2_QUESTIONS } from "./shobo-setsubishi-kou2";
import { QUESTIONS as SHOBO_SETSUBISHI_KOU5_QUESTIONS } from "./shobo-setsubishi-kou5";
import { QUESTIONS as GESUIDO_3SHU_QUESTIONS } from "./gesuido-3shu";
import { loadAdditionalPapers } from "./additional-papers";
import { appendReplenishedQuestions, publishedQuestions } from "./published";
import { ZENKOU_PC_QUESTIONS } from "./zenkou-pc";
import { CONCRETE_ASSOU1_QUESTIONS } from "./concrete-assou1";

import { ZENSHO_ECO80_QUESTIONS } from "./zensho-eco-80";

import { KOGAI08_QUESTIONS } from "./kogai-08";

import { KOGAI04_QUESTIONS } from "./kogai-04";

import { KOUNIN_PHYSICS_QUESTIONS } from "./kounin-physics";

import { KOUNIN_SCIENCE_QUESTIONS } from "./kounin-science";

import { KOUNIN_CIVICS_QUESTIONS } from "./kounin-civics";

import { KANKEN_1_QUESTIONS } from "./kanken-1";

import { KOUNIN_GEOGRAPHY_QUESTIONS } from "./kounin-geography";

import { AIGAN_KANGOSHI_QUESTIONS } from "./aigan-kangoshi";

import { CONCRETE_ASSOU2_QUESTIONS } from "./concrete-assou2";


import { KAWARABUKI1_QUESTIONS } from "./kawarabuki1";


import { ZENSHO_MARKETING_QUESTIONS } from "./zensho-marketing";


import { KOGAI_11_QUESTIONS } from "./kogai-11";


import { KOGAI_14_QUESTIONS } from "./kogai-14";


import { TECHNICAL_ILLUSTRATION_CAD1_QUESTIONS } from "./technical-illustration-cad1";

import { KOGAI_15_QUESTIONS } from "./kogai-15";

import { KOGAI_12_QUESTIONS } from "./kogai-12";

import { CAREER_GINO_1_QUESTIONS } from "./career-gino-1";


import { KAWARABUKI2_QUESTIONS } from "./kawarabuki2";

import { ZENSHO_ECO_79_QUESTIONS } from "./zensho-eco-79";

import { DEKYO_CHARGE_1_QUESTIONS } from "./dekyo-charge-1";


import { CFP_3_QUESTIONS } from "./cfp-3";

import { DEKYO_CHARGE_2_QUESTIONS } from "./dekyo-charge-2";

import { KOGAI_16_QUESTIONS } from "./kogai-16";

import { BUILDING_CLEANING2_QUESTIONS } from "./building-cleaning2";


import { KOGAI_TAIKI_YUGAI_QUESTIONS } from "./kogai-taiki-yugai";


import { DEKYO_DIGITAL2_QUESTIONS } from "./dekyo-digital2";


import { SAKUI_ROTARY1_QUESTIONS } from "./sakui-rotary1";

import { KOUKU_KANSEIKAN_QUESTIONS } from "./kouku-kanseikan";

import { CFP_REALESTATE_QUESTIONS } from "./cfp-realestate";

import { BUILDING_CLEANING3_QUESTIONS } from "./building-cleaning3";

import { KOGAI_TAIKI_GAIRON_QUESTIONS } from "./kogai-taiki-gairon";

import { EIKEN3_QUESTIONS } from "./eiken3";


import { RESTAURANT_3_QUESTIONS } from "./restaurant-3";


import { KOGAI_06_QUESTIONS } from "./kogai-06";


import { EIKEN4_QUESTIONS } from "./eiken4";

import { NYUKOKU_KEIBIKAN_QUESTIONS } from "./nyukoku-keibikan";


import { CHIZAI3_QUESTIONS } from "./chizai3";


import { DEKYO_CHIEF_2_QUESTIONS } from "./dekyo-chief-2";

import { KOGAI_LARGE_WATER_QUESTIONS } from "./kogai-large-water";

import { DEKYO_CHIEF_SYSTEM_QUESTIONS } from "./dekyo-chief-system";

import { EIKEN5_QUESTIONS } from "./eiken5";


import { RODO_KIJUN_KANTOKUKAN_QUESTIONS } from "./rodo-kijun-kantokukan";


import { CHIZAI1_QUESTIONS } from "./chizai1";


import { KOGAI09_QUESTIONS } from "./kogai-09";


import { WEBDESIGN2_QUESTIONS } from "./webdesign2";


import { GLASS_SEKOU1_QUESTIONS } from "./glass-sekou1";

import { EIKENP1_QUESTIONS } from "./eikenp1";

import { ZENSHO_ECO81_QUESTIONS } from "./zensho-eco-81";

import { KOGAI07_QUESTIONS } from "./kogai-07";

import { WEBDESIGN3_QUESTIONS } from "./webdesign-3";


import { BUILDING_CLEANING_1_QUESTIONS } from "./building-cleaning-1";


import { GIJUTSUSHI1_TEKISEI_QUESTIONS } from "./gijutsushi1-tekisei";


import { JUISHI_QUESTIONS } from "./juishi";


import {DEKYO_DIGITAL1_QUESTIONS, DEKYO_CHARGE_3_QUESTIONS} from "./dekyo-charge-3";

import { KOKUZEI_SENMONKAN_QUESTIONS } from "./kokuzei-senmonkan";


import { SASSHI1_QUESTIONS } from "./sasshi1";


import { EXAM_CODE_ALIASES } from "@/lib/questions/exam-aliases";


import { SASSHI2_QUESTIONS } from "./sasshi2";


import { ENGEI_SOSHOKU3_QUESTIONS } from "./engei-soshoku3";


import { KYOKA_PLASTIC2_QUESTIONS } from "./kyoka-plastic2";


import { CHIKURO2_QUESTIONS } from "./chikuro2";


import { CHIKURO1_QUESTIONS } from "./chikuro1";


import { KAGAKU_BUNSEKI1_QUESTIONS } from "./kagaku-bunseki1";


import { KAGAKU_BUNSEKI3_QUESTIONS } from "./kagaku-bunseki3";


import { FUTSU_SENBAN3_QUESTIONS } from "./futsu-senban3";


import { SHASHUTSU3_QUESTIONS } from "./shashutsu3";


import { KIKAI_KENSA3_QUESTIONS } from "./kikai-kensa3";


import { KIKAI_KENSA1_QUESTIONS } from "./kikai-kensa1";


import { TEKKIN_ZUMEN1_QUESTIONS } from "./tekkin-zumen1";


import { KATAWAKU1_QUESTIONS } from "./katawaku1";


import { TEKKIN_ZUMEN2_QUESTIONS } from "./tekkin-zumen2";


import { KATAWAKU2_QUESTIONS } from "./katawaku2";


import { KOGYO_HOSO1_QUESTIONS } from "./kogyo-hoso1";


import { KIKAI_KENSA2_QUESTIONS } from "./kikai-kensa2";


import { KOGYO_HOSO2_QUESTIONS } from "./kogyo-hoso2";


import { HAIDEN_SEIGYO1_QUESTIONS } from "./haiden-seigyo1";


import { SEQUENCE1_QUESTIONS } from "./sequence1";


import { CHUZO2_QUESTIONS } from "./chuzo2";


import { CHUZO1_QUESTIONS } from "./chuzo1";


import { KAITEN_DENKI2_QUESTIONS } from "./kaiten-denki2";


import { KAITEN_DENKI1_QUESTIONS } from "./kaiten-denki1";


import { SEQUENCE3_QUESTIONS } from "./sequence3";


import { CHUZO3_QUESTIONS } from "./chuzo3";


import { SEQUENCE2_QUESTIONS } from "./sequence2";


import { HAIDEN_SEIGYO3_QUESTIONS } from "./haiden-seigyo3";


import { KENCHIKU_BANKIN2_QUESTIONS } from "./kenchiku-bankin2";


import { KENSETSU_KIKAI_SEIBI1_QUESTIONS } from "./kensetsu-kikai-seibi1";


import { SAKAN3_QUESTIONS } from "./sakan3";


import { ZOEN_GINO3_QUESTIONS } from "./zoen-gino3";


import { SAKAN2_QUESTIONS } from "./sakan2";


import { SAKAN1_QUESTIONS } from "./sakan1";


import { ZOEN_GINO1_QUESTIONS } from "./zoen-gino1";


import { ZOEN_GINO2_QUESTIONS } from "./zoen-gino2";


import { BOUSUI_URETHANE2_QUESTIONS } from "./bousui-urethane2";


import { BOUSUI_FRP2_QUESTIONS } from "./bousui-frp2";


import { PAN_SEIZO1_QUESTIONS } from "./pan-seizo1";


import { PAN_SEIZO2_QUESTIONS } from "./pan-seizo2";


import { KIKAI_SHIAGE1_QUESTIONS } from "./kikai-shiage1";


import { PLANT_HAIKAN_SEIZU1_QUESTIONS } from "./plant-haikan-seizu1";


import { KIKAI_SEIZU3_QUESTIONS } from "./kikai-seizu3";


import { KIKAI_SEIZU_CAD3_QUESTIONS } from "./kikai-seizu-cad3";


import { KIKAI_SEIZU2_QUESTIONS } from "./kikai-seizu2";


import { KIKAI_SEIZU_CAD2_QUESTIONS } from "./kikai-seizu-cad2";


import { KIKAI_SHIAGE3_QUESTIONS } from "./kikai-shiage3";


import { KIKAI_SHIAGE2_QUESTIONS } from "./kikai-shiage2";


import { NAISO_CARPET2_QUESTIONS } from "./naiso-carpet2";


import { NAISO_PLASTIC1_QUESTIONS } from "./naiso-plastic1";


import { NAISO_PLASTIC2_QUESTIONS } from "./naiso-plastic2";


import { NAISO_KOSEI2_QUESTIONS } from "./naiso-kosei2";


import { KINZOKU_PRESS1_QUESTIONS } from "./kinzoku-press1";


import { PLANT_HAIKAN2_QUESTIONS } from "./plant-haikan2";


import { HAIKAN_KENCHIKU3_QUESTIONS } from "./haikan-kenchiku3";


import { PLANT_HAIKAN1_QUESTIONS } from "./plant-haikan1";


import { KINZOKU_PRESS2_QUESTIONS } from "./kinzoku-press2";


import { TEKKIN_ZUMEN3_QUESTIONS } from "./tekkin-zumen3";


import { KATAWAKU3_QUESTIONS } from "./katawaku3";


import { KYOKA_PLASTIC1_QUESTIONS } from "./kyoka-plastic1";


import { ENGEI_SOSHOKU1_QUESTIONS } from "./engei-soshoku1";


import { FLOWER3_QUESTIONS } from "./flower3";


import { INSATSU2_QUESTIONS } from "./insatsu2";


import { INSATSU1_QUESTIONS } from "./insatsu1";


import { FLOWER1_QUESTIONS } from "./flower1";


import { FLOWER2_QUESTIONS } from "./flower2";


import { KAGU3_QUESTIONS } from "./kagu3";


import { KAGU1_QUESTIONS } from "./kagu1";


import { KAGU2_QUESTIONS } from "./kagu2";


import { MEKKI1_QUESTIONS } from "./mekki1";


import { MEKKI3_QUESTIONS } from "./mekki3";


import { TEKKO1_QUESTIONS } from "./tekko1";


import { TEKKO2_QUESTIONS } from "./tekko2";


import { KOJO_BANKIN1_QUESTIONS } from "./kojo-bankin1";


import { KENCHIKU_BANKIN1_QUESTIONS } from "./kenchiku-bankin1";


import { KINZOKU_NETSUSHORI3_QUESTIONS } from "./kinzoku-netsushori3";


import { KOJO_BANKIN3_QUESTIONS } from "./kojo-bankin3";


import { KOJO_BANKIN2_QUESTIONS } from "./kojo-bankin2";


import { MEKKI2_QUESTIONS } from "./mekki2";

import { DIECAST1_QUESTIONS } from "./diecast1";


import { TETSUDO_SHARYO1_QUESTIONS } from "./tetsudo-sharyo1";

import { ENGEI_SOSHOKU2_QUESTIONS } from "./engei-soshoku2";

import { FUTSU_SENBAN1_QUESTIONS } from "./futsu-senban1";


import { SHASHUTSU1_QUESTIONS } from "./shashutsu1";

import { TEKKIN3_QUESTIONS } from "./tekkin3";


import { TEKKIN2_QUESTIONS } from "./tekkin2";

import { KIKAI_SEIZU_TEGAKI1_QUESTIONS } from "./kikai-seizu-tegaki1";

import { REITO_SEKO2_QUESTIONS } from "./reito-seko2";


import { REITO_SEKO1_QUESTIONS } from "./reito-seko1";


import { KUUKIATSU_KUMITATE2_QUESTIONS } from "./kuukiatsu-kumitate2";


import { KUUKIATSU_KUMITATE1_QUESTIONS } from "./kuukiatsu-kumitate1";


import { HENATSUKI_KUMITATE2_QUESTIONS } from "./henatsuki-kumitate2";


import { HENATSUKI_KUMITATE1_QUESTIONS } from "./henatsuki-kumitate1";

import { KIKAI_SEIZU_CAD1_QUESTIONS } from "./kikai-seizu-cad1";

import { PLANT_HAIKAN_SEIZU2_QUESTIONS } from "./plant-haikan-seizu2";

import { REITO_SEKO3_QUESTIONS } from "./reito-seko3";

import { NETSUZETSUEN2_QUESTIONS } from "./netsuzetsuen2";


import { HISESHOKU_JOKYO1_QUESTIONS } from "./hiseshoku-jokyo1";


import { TATEGU1_QUESTIONS } from "./tategu1";


import { SHOHIN_SOSHOKU1_QUESTIONS } from "./shohin-soshoku1";


import { KOGAKU_GLASS1_QUESTIONS } from "./kogaku-glass1";


import { SANGYO_SHARYO1_QUESTIONS } from "./sangyo-sharyo1";


import { YOGASHI1_QUESTIONS } from "./yogashi1";


import { BLOCK_KENCHIKU3_QUESTIONS } from "./block-kenchiku3";


import { BLOCK_KENCHIKU1_QUESTIONS } from "./block-kenchiku1";


import { SHUZO1_QUESTIONS } from "./shuzo1";


import { FRAISE1_QUESTIONS } from "./fraise1";


import { FRAISE2_QUESTIONS } from "./fraise2";


import { FRAISE3_QUESTIONS } from "./fraise3";

import { BOUSUI_FRP1_QUESTIONS } from "./bousui-frp1";

import { NAISO_CARPET1_QUESTIONS } from "./naiso-carpet1";

import { SHASHUTSU2_QUESTIONS } from "./shashutsu2";

import { KAGAKU_BUNSEKI2_QUESTIONS } from "./kagaku-bunseki2";

import { KINZOKU_NETSUSHORI1_QUESTIONS } from "./kinzoku-netsushori1";

import { DENSHI_KIKI_KUMITATE3_QUESTIONS } from "./denshi-kiki-kumitate3";


import { DENSHI_KIKI_KUMITATE1_QUESTIONS } from "./denshi-kiki-kumitate1";


import { FUJIN_KODOMOFUKU2_QUESTIONS } from "./fujin-kodomofuku2";


import { FUJIN_KODOMOFUKU1_QUESTIONS } from "./fujin-kodomofuku1";


import { TOSO1_QUESTIONS } from "./toso1";


import { DENSHI_KIKI_KUMITATE2_QUESTIONS } from "./denshi-kiki-kumitate2";

import { KENCHIKU_BANKIN_DUCT2_QUESTIONS } from "./kenchiku-bankin-duct2";


import { KINZOKU_NETSUSHORI2_QUESTIONS } from "./kinzoku-netsushori2";

import { KENSETSU_KIKAI_SEIBI2_QUESTIONS } from "./kensetsu-kikai-seibi2";


import { HYOSO1_QUESTIONS } from "./hyoso1";


import { TAIRU2_QUESTIONS } from "./tairu2";


import { SEKIZAI1_QUESTIONS } from "./sekizai1";


import { HYOSO2_QUESTIONS } from "./hyoso2";


import { SHOHIN_SOSHOKU3_QUESTIONS } from "./shohin-soshoku3";


import { SHASHIN1_QUESTIONS } from "./shashin1";


import { SESSAKU_KENSAKU1_QUESTIONS } from "./sessaku-kensaku1";


import { TATAMI1_QUESTIONS } from "./tatami1";

import { FUNMATSU_YAKIN1_QUESTIONS } from "./funmatsu-yakin1";


import { NUNOHAKU1_QUESTIONS } from "./nunohaku1";


import { KIKINZOKU_SOSHIN1_QUESTIONS } from "./kikinzoku-soshin1";


import { SHASHIN3_QUESTIONS } from "./shashin3";


import { KIKINZOKU_SOSHIN3_QUESTIONS } from "./kikinzoku-soshin3";


import { KIKINZOKU_SOSHIN2_QUESTIONS } from "./kikinzoku-soshin2";


import { TOBI1_QUESTIONS } from "./tobi1";


import { TOBI3_QUESTIONS } from "./tobi3";


import { KENCHIKU_DAIKU1_QUESTIONS } from "./kenchiku-daiku1";


import { KENCHIKU_DAIKU3_QUESTIONS } from "./kenchiku-daiku3";


import { KENCHIKU_DAIKU2_QUESTIONS } from "./kenchiku-daiku2";


import { SHASHIN2_QUESTIONS } from "./shashin2";


import { TOSO2_QUESTIONS } from "./toso2";


import { QUESTIONS as KIKAI_HOZEN_DENKI1_QUESTIONS } from "./kikai-hozen-denki1";


import { QUESTIONS as KIKAI_HOZEN_SETSUBI1_QUESTIONS } from "./kikai-hozen-setsubi1";


import { KIKAI_HOZEN_DENKI3_QUESTIONS } from "./kikai-hozen-denki3";


import { KIKAI_HOZEN3_QUESTIONS } from "./kikai-hozen3";


import { TOBI2_QUESTIONS } from "./tobi2";


import { QUESTIONS as KIKENBUTSU_OTSU4 } from "./kikenbutsu-otsu4";


import { QUESTIONS as UNKO_KANRISHA_KAMOTSU } from "./unko-kanrisha-kamotsu";


import { QUESTIONS as SHOBO_SETSUBISHI_OTSU6 } from "./shobo-setsubishi-otsu6";


import { QUESTIONS as SHOBO_SETSUBISHI_KOU4 } from "./shobo-setsubishi-kou4";


import { QUESTIONS as KIKENBUTSU_HEI } from "./kikenbutsu-hei";


import { QUESTIONS as KIKENBUTSU_KOU } from "./kikenbutsu-kou";


import { QUESTIONS as SHOBO_SETSUBISHI_KOU1 } from "./shobo-setsubishi-kou1";


import { QUESTIONS as UNKO_KANRISHA_RYOKAKU } from "./unko-kanrisha-ryokaku";


import { QUESTIONS as BATCH3_0 } from "./benrishi";


import { QUESTIONS as BATCH3_1 } from "./sokuryoshi";


import { QUESTIONS as BATCH3_2 } from "./dokugeki-chiba";


import { QUESTIONS as BATCH3_3 } from "./jokaso-setsubishi";


import { QUESTIONS as BATCH3_4 } from "./chiiki-ryoko";


import { QUESTIONS as BATCH3_5 } from "./junkango-kansai";


import { QUESTIONS as BATCH3_6 } from "./kukaku-seiri";


import { QUESTIONS as BATCH3_7 } from "./dojo-osen";


import { QUESTIONS as BATCH3_8 } from "./kenchikushi2";


import { QUESTIONS as BATCH3_9 } from "./mokuzo-kenchikushi";


import { SEKOU_1KENCHIKU_QUESTIONS } from "./sekou-1kenchiku";


import { PUBLIC_KHK_KAGAKU_QUESTIONS } from "./khk-kagaku/public";


import { KENCHIKUSHI1_QUESTIONS } from "./kenchikushi1";


import { BATCH1_QUESTIONS } from "./batch1";


import { REFORM_MGR_QUESTIONS } from "./reform-mgr";


import { SHOHI_SODAN_QUESTIONS } from "./shohi-sodan";


import type { ExamCode, Question } from "@/lib/questions/types";


import { isPracticeReadyQuestion } from "@/lib/questions/filter";


import { CHOSASHI_QUESTIONS } from "./chosashi";


import { AP_QUESTIONS } from "./ap";


import { IP_QUESTIONS } from "./ip";


import { SG_QUESTIONS } from "./sg";


import { FE_QUESTIONS } from "./fe";


import { SC_QUESTIONS } from "./sc";


import { NW_QUESTIONS } from "./nw";


import { DB_QUESTIONS } from "./db";


import { ST_QUESTIONS } from "./st";


import { SA_QUESTIONS } from "./sa";


import { PM_QUESTIONS } from "./pm";


import { ES_QUESTIONS } from "./es";


import { SM_QUESTIONS } from "./sm";


import { AU_QUESTIONS } from "./au";


import { FP2_QUESTIONS } from "./fp2";


import { FP1_QUESTIONS } from "./fp1";


import { FP3_QUESTIONS } from "./fp3";


import { DENKO2_PRACTICE_QUESTIONS } from "./denko2";


import { DENKO1_QUESTIONS } from "./denko1";


import { CIVIL2_QUESTIONS } from "./civil2";


import { KANKOJI2_QUESTIONS } from "./kankoji2";


import { ZOEN2_QUESTIONS } from "./zoen2";


import { ZOEN1_QUESTIONS } from "./zoen1";


import { TSUSHIN2_QUESTIONS } from "./tsushin2";


import { TSUSHIN1_QUESTIONS } from "./tsushin1";


import { ZENSHO_ECO_78_QUESTIONS } from "./zensho-eco-78";


import { DEKYO_CHARGE_5_QUESTIONS } from "./dekyo-charge-5";


import { KAIGO_QUESTIONS } from "./kaigo";


import { CIVIL1_QUESTIONS } from "./civil1";


import { SHAKAI_QUESTIONS } from "./shakai";


import { SEISHIN_QUESTIONS } from "./seishin";


import { TOHAN_QUESTIONS } from "./tohan";


import { KANRI_QUESTIONS } from "./kanri";


import {DENKEN3_YEAR_PAPERS, DENKEN3_PRACTICE_QUESTIONS, ALL_DENKEN3_QUESTIONS} from "./denken3";


import {DENKEN2_PRACTICE_QUESTIONS} from "./denken2";


import { ALL_DENKEN1_QUESTIONS } from "./denken1";


import { TAKKEN_QUESTIONS } from "./takken";


import { isExamPublished } from "@/lib/qualifications/catalog";


import { KANTEISHI_QUESTIONS } from "./kanteishi";


import { KAIKEISHI_QUESTIONS } from "./kaikeishi";


import { EISEI1_QUESTIONS } from "./eisei1";


import { EISEI2_QUESTIONS } from "./eisei2";


import { SOUKAN_QUESTIONS } from "./soukan";


import { HOIKUSHI_QUESTIONS } from "./hoikushi";


import { MANKAN_QUESTIONS } from "./mankan";


import { KASHIKIN_QUESTIONS } from "./kashikin";


import { SHAROUSHI_QUESTIONS } from "./sharoushi";


import { CHUSHO_KIGYO_SHINDANSHI_QUESTIONS } from "./chusho-kigyo-shindanshi";


import { KANGOSHI_QUESTIONS } from "./kangoshi";


import { YAKUZAISHI_QUESTIONS } from "./yakuzaishi";


import { AHAKI_ANMA_QUESTIONS, AHAKI_HARI_KYUU_QUESTIONS } from "./ahaki";


import { HOKENSHI_QUESTIONS } from "./hokenshi";


import { JOSANSHI_QUESTIONS } from "./josanshi";


import { RIGAKU_RYOHOUSHI_QUESTIONS } from "./rigaku-ryohoshi";


import { SAGYO_RYOHOSHI_QUESTIONS } from "./sagyo-ryohoshi";


import { GENGO_CHOKAKUSHI_QUESTIONS } from "./gengo-chokakushi";


import { SHINO_KUNRENSHI_QUESTIONS } from "./shino-kunrenshi";


import { RINSHO_KOGISHI_QUESTIONS } from "./rinsho-kogishi";


import { JUDO_SEIFUKUSHI_QUESTIONS } from "./judo-seifukushi";


import { GAS_KOU_QUESTIONS } from "./gas/kou";


import { GAS_OTSU_QUESTIONS } from "./gas/otsu";


import { GAS_HEI_QUESTIONS } from "./gas/hei";


import { RINSHO_KENSAGISHI_QUESTIONS } from "./rinsho-kensagishi";


import { SHINRYO_HOSHASENGISHI_QUESTIONS } from "./shinryo-hoshasengishi";


import { EIKENP2_QUESTIONS } from "./eikenp2";


import { EIKEN1_QUESTIONS } from "./eiken1";


import { ZENSHO_ECO_77_QUESTIONS } from "./zensho-eco-77";


import { LITERAS_QUESTIONS } from "./literas";


import { KOGAI_01_QUESTIONS } from "./kogai-01";


import { CFP_QUESTIONS } from "./cfp";

import { KOGAI_18_QUESTIONS } from "./kogai-18";


import { KOGAI_13_QUESTIONS } from "./kogai-13";

import { QUESTIONS as RESTAURANT_1_QUESTIONS } from "./restaurant-1";


import { QUESTIONS as CFP_SOUZOKU_QUESTIONS } from "./cfp-souzoku";


import { QUESTIONS as KOGAI_TAIKI_TOKURON_QUESTIONS } from "./kogai-taiki-tokuron";


import { QUESTIONS as TELECOM_CHIEF_DENSO_QUESTIONS } from "./telecom-chief-denso";


import { EIKEN2_QUESTIONS } from "./eiken2";

import { RESTAURANT_2_QUESTIONS } from "./restaurant-2";

import { KOGAI_17_QUESTIONS } from "./kogai-17";

import { DEKYO_CHIEF_3_QUESTIONS } from "./dekyo-chief-3";

import { KANKEN_J1_QUESTIONS } from "./kanken-j1";

import { KANKEN_4_QUESTIONS } from "./kanken-4";

import { KOUNIN_QUESTIONS } from "./kounin";

import { KANKEN_6_QUESTIONS } from "./kanken-6";


import { KANKEN_10_QUESTIONS } from "./kanken-10";

import { KANKEN_9_QUESTIONS } from "./kanken-9";


import { EJU_QUESTIONS } from "./eju";


import { ZENSHO_ENGLISH_QUESTIONS } from "./zensho-english";


import { KANKEN_J2_QUESTIONS } from "./kanken-j2";

import { ZENSHO_BIDO_QUESTIONS } from "./zensho-bido";


import { KANKEN_7_QUESTIONS } from "./kanken-7";


import { KANKEN_8_QUESTIONS } from "./kanken-8";

import { QUESTIONS as ZENSHO_INFO_QUESTIONS } from "./zensho-info";

import { KANKEN_2_QUESTIONS } from "./kanken-2";


import { KANKEN_5_QUESTIONS } from "./kanken-5";


import { ZENSHO_BOKI_QUESTIONS } from "./zensho-boki";

import { JLPT_N5_QUESTIONS } from "./jlpt-n5";

import { JLPT_N3_QUESTIONS } from "./jlpt-n3";

import { SUKEN_JUN1_QUESTIONS } from "./suken-jun1";

import { SUKEN_11_QUESTIONS } from "./suken-11";

import { ZENSHO_CALC_1_QUESTIONS } from "./zensho-calc-1";


import { ZENSHO_BOKI_2_QUESTIONS } from "./zensho-boki-2";


import { ZENSHO_CALC_QUESTIONS } from "./zensho-calc";


import { KANKEN_3_QUESTIONS } from "./kanken-3";


import { SUKEN_QUESTIONS } from "./suken";

import { GIJUTSUSHI1_KISO_QUESTIONS } from "./gijutsushi1-kiso";


import { JLPT_QUESTIONS } from "./jlpt";

import { QUESTIONS as CAREER_GINO_2_QUESTIONS } from "./career-gino-2";

import { GIJUTSUSHI1_KENSETSU_QUESTIONS } from "./gijutsushi1-kensetsu";


import { KOKKA_SOGO_DAI_QUESTIONS } from "./kokka-sogo-dai";


import { KOKKA_IPPAN_DAI_QUESTIONS } from "./kokka-ippan-dai";


import { KOKKA_SOGO_IN_QUESTIONS } from "./kokka-sogo-in";


import { TOUKEI1_QUESTIONS } from "./toukei1";


import { BOUEKI_C_QUESTIONS } from "./boueki-c";


import { SERVICE2_QUESTIONS } from "./service2";


import { APEF3_QUESTIONS } from "./apef3";


import { KOKU_HOAN_DAIGAKKO_QUESTIONS } from "./koku-hoan-daigakko";


import { CFP_5_QUESTIONS } from "./cfp-5";


import { ZENSHO_BC_QUESTIONS } from "./zensho-bc";


import { ISHI_QUESTIONS } from "./ishi";


import { SHIKA_ISHI_QUESTIONS } from "./shika-ishi";


import { RIYOSHI_QUESTIONS } from "./riyoshi";


import { RIKU_TOKU_KOKUNAI_QUESTIONS } from "./riku-toku-kokunai";


import { KAI_TOKU2_QUESTIONS } from "./kai-toku2";


import { KAI_TOKU3_QUESTIONS } from "./kai-toku3";


import { KOKU_TOKU_QUESTIONS } from "./koku-toku";


import { LAND_SPECIAL1_QUESTIONS } from "./land-special1";


import { RIKU_TECH1_QUESTIONS } from "./riku-tech1";


import { MARITIME4_QUESTIONS } from "./maritime4";


import { AVIATION_COMM_QUESTIONS } from "./aviation-comm";


import { AMATEUR1_QUESTIONS } from "./amateur1";


import { RIKU_TECH2_QUESTIONS } from "./riku-tech2";


import { AMATEUR2_QUESTIONS } from "./amateur2";


import { MARITIME_RADAR_QUESTIONS } from "./maritime-radar";


import { MARITIME_SPECIAL1_QUESTIONS } from "./maritime-special1";


import { MARITIME1_QUESTIONS } from "./maritime1";


import { MARITIME2_QUESTIONS } from "./maritime2";


import { GENERAL1_QUESTIONS } from "./general1";


import { GENERAL2_QUESTIONS } from "./general2";


import { GENERAL3_QUESTIONS } from "./general3";


import { MARITIME3_QUESTIONS } from "./maritime3";


import { LAND_SPECIAL2_QUESTIONS } from "./land-special2";


import { LAND_SPECIAL3_QUESTIONS } from "./land-special3";


import { CHIZAI2_QUESTIONS } from "./chizai2";


import { KISHO_QUESTIONS } from "./kisho";


import { KENCHIKU_SETSUBISHI_STUDY_QUESTIONS } from "./kenchiku-setsubishi";


import { getAutomotiveQuestions } from "./automotive";


import { BIYOSHI_QUESTIONS } from "./biyoshi";


import { QUESTIONS as OT1_QUESTIONS } from "./kikenbutsu-otsu1";


import { QUESTIONS as OT2_QUESTIONS } from "./kikenbutsu-otsu2";


import { QUESTIONS as OT6_QUESTIONS } from "./kikenbutsu-otsu6";


import { JOKASO_CANDIDATES } from "./jokaso";


import { IJI_SHUZEN_QUESTIONS } from "./iji-shuzen";


import { DENKI1_QUESTIONS } from "./denki1";


import { SHUWA_QUESTIONS } from "./shuwa";

import {JOBPASS3_QUESTIONS, QUESTIONS as NEW_JOBPASS3} from "./jobpass3";


import { JKEN_KATSUYO1_QUESTIONS } from "./jken-katsuyo1";


import { JKEN_KATSUYO2_QUESTIONS } from "./jken-katsuyo2";


import { JKEN_KATSUYO3_QUESTIONS } from "./jken-katsuyo3";

import { ZENSHO_FINANCIAL_STATEMENT_QUESTIONS } from "./zensho-financial-statement-analysis";


import { JKEN_SYSTEM_QUESTIONS } from "./jken-system";


import { JOBPASS_QUESTIONS } from "./jobpass";


import { SHINRISHI_QUESTIONS } from "./shinrishi";


import { KHK_REITO_1_QUESTIONS } from "./khk-reito-1";


import { KHK_REITO_2_QUESTIONS } from "./khk-reito-2";


import { KHK_REITO_3_QUESTIONS } from "./khk-reito-3";


import { SEKOU_KENCHIKU2_QUESTIONS } from "./sekou-kenchiku2";


import { DENKI2_QUESTIONS } from "./denki2";


import { KANKOJI1_QUESTIONS } from "./kankoji1";


import { YAMAGUCHI_CHORI_QUESTIONS } from "./yamaguchi-chori";


import { YAMAGUCHI_SEIKA_QUESTIONS } from "./yamaguchi-seika";


import { YAMAGUCHI_FUGU_QUESTIONS } from "./yamaguchi-fugu";


import { getKeiryoshiCandidates } from "./keiryoshi";


import { KENKI2_QUESTIONS } from "./kenki2";


import { KENKI1_QUESTIONS } from "./kenki1";


import { GYOSEI_QUESTIONS } from "./gyosei";


import { SHIHOSHOSHI_BATCH1_QUESTIONS } from "./shihoshoshi";


import { CAREER_CONSULTANT_QUESTIONS } from "./career-consultant";


import { KANRI_EIYOSHI_QUESTIONS } from "./kanri-eiyoshi";


import { SOGO_RYOKO_QUESTIONS } from "./sogo-ryoko";


import { SHIHO_TANTO_QUESTIONS } from "./shiho-tanto";


import { YOBI_TANTO_QUESTIONS } from "./yobi-tanto";


import { SOKURYOSHIHO_QUESTIONS } from "./sokuryoshiho";


import { CAREMANAGER_QUESTIONS } from "./caremanager";

import { QUESTIONS as KIKAI_HOZEN1_QUESTIONS } from "./kikai-hozen1";


import { DIECAST2_QUESTIONS } from "./diecast2";

import { TETSUDO_SHARYO2_QUESTIONS } from "./tetsudo-sharyo2";


import { KIKAI_HOZEN_QUESTIONS } from "./kikai-hozen";


import { TSUKANSHI_QUESTIONS } from "./tsukanshi";

import { EIKENP2PLUS_QUESTIONS } from "./eikenp2plus";

export const QUESTIONS_BY_EXAM: Partial<Record<ExamCode, Question[]>> = {
  ...(isExamPublished("zenkou-pc") ? { "zenkou-pc": ZENKOU_PC_QUESTIONS } : {}),
  ...(isExamPublished("kogai-18") ? { "kogai-18": KOGAI_18_QUESTIONS } : {}),
  ...(isExamPublished("kogai-13") ? { "kogai-13": KOGAI_13_QUESTIONS } : {}),
  ...(isExamPublished("concrete-assou1") ? { "concrete-assou1": CONCRETE_ASSOU1_QUESTIONS } : {}),
  ...(isExamPublished("zensho-eco-80") ? { "zensho-eco-80": ZENSHO_ECO80_QUESTIONS } : {}),
  ...(isExamPublished("kogai-08") ? { "kogai-08": KOGAI08_QUESTIONS } : {}),
  ...(isExamPublished("kogai-04") ? { "kogai-04": KOGAI04_QUESTIONS } : {}),
  ...(isExamPublished("kounin-physics") ? { "kounin-physics": KOUNIN_PHYSICS_QUESTIONS } : {}),
  ...(isExamPublished("kounin-science") ? { "kounin-science": KOUNIN_SCIENCE_QUESTIONS } : {}),
  ...(isExamPublished("kounin-civics") ? { "kounin-civics": KOUNIN_CIVICS_QUESTIONS } : {}),
  ...(isExamPublished("kanken-1") ? { "kanken-1": KANKEN_1_QUESTIONS } : {}),
  ...(isExamPublished("kounin-geography") ? { "kounin-geography": KOUNIN_GEOGRAPHY_QUESTIONS } : {}),
  ...(isExamPublished("aigan-kangoshi") ? { "aigan-kangoshi": AIGAN_KANGOSHI_QUESTIONS } : {}),
  ...(isExamPublished("concrete-assou2") ? { "concrete-assou2": CONCRETE_ASSOU2_QUESTIONS } : {}),
  ...(isExamPublished("kawarabuki1") ? { "kawarabuki1": KAWARABUKI1_QUESTIONS } : {}),
  ...(isExamPublished("zensho-marketing") ? { "zensho-marketing": ZENSHO_MARKETING_QUESTIONS } : {}),
  ...(isExamPublished("kogai-11") ? { "kogai-11": KOGAI_11_QUESTIONS } : {}),
  ...(isExamPublished("kogai-14") ? { "kogai-14": KOGAI_14_QUESTIONS } : {}),
  ...(isExamPublished("cfp-3") ? { "cfp-3": CFP_3_QUESTIONS } : {}),
  ...(isExamPublished("dekyo-charge-2") ? { "dekyo-charge-2": DEKYO_CHARGE_2_QUESTIONS } : {}),
  ...(isExamPublished("kogai-16") ? { "kogai-16": KOGAI_16_QUESTIONS } : {}),
  ...(isExamPublished("building-cleaning2") ? { "building-cleaning2": BUILDING_CLEANING2_QUESTIONS } : {}),
  ...(isExamPublished("kogai-taiki-yugai") ? { "kogai-taiki-yugai": KOGAI_TAIKI_YUGAI_QUESTIONS } : {}),
  ...(isExamPublished("dekyo-digital2") ? { "dekyo-digital2": DEKYO_DIGITAL2_QUESTIONS } : {}),
  ...(isExamPublished("sakui-rotary1") ? { "sakui-rotary1": SAKUI_ROTARY1_QUESTIONS } : {}),
  ...(isExamPublished("kouku-kanseikan") ? { "kouku-kanseikan": KOUKU_KANSEIKAN_QUESTIONS } : {}),
  ...(isExamPublished("cfp-realestate") ? { "cfp-realestate": CFP_REALESTATE_QUESTIONS } : {}),
  ...(isExamPublished("building-cleaning3") ? { "building-cleaning3": BUILDING_CLEANING3_QUESTIONS } : {}),
  ...(isExamPublished("kogai-taiki-gairon") ? { "kogai-taiki-gairon": KOGAI_TAIKI_GAIRON_QUESTIONS } : {}),
  ...(isExamPublished("eiken2") ? { eiken2: EIKEN2_QUESTIONS } : {}),
  ...(isExamPublished("restaurant-2") ? { "restaurant-2": RESTAURANT_2_QUESTIONS } : {}),
  ...(isExamPublished("kogai-17") ? { "kogai-17": KOGAI_17_QUESTIONS } : {}),
  ...(isExamPublished("dekyo-chief-3") ? { "dekyo-chief-3": DEKYO_CHIEF_3_QUESTIONS } : {}),
  ...(isExamPublished("eiken3") ? { eiken3: EIKEN3_QUESTIONS } : {}),
  ...(isExamPublished("restaurant-3") ? { "restaurant-3": RESTAURANT_3_QUESTIONS } : {}),
  ...(isExamPublished("chizai3") ? { chizai3: CHIZAI3_QUESTIONS } : {}),
  ...(isExamPublished("dekyo-chief-2") ? { "dekyo-chief-2": DEKYO_CHIEF_2_QUESTIONS } : {}),
  ...(isExamPublished("kogai-06") ? { "kogai-06": KOGAI_06_QUESTIONS } : {}),
  ...(isExamPublished("eiken4") ? { eiken4: EIKEN4_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("nyukoku-keibikan") ? { "nyukoku-keibikan": NYUKOKU_KEIBIKAN_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("chizai3") ? { chizai3: CHIZAI3_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("kogai-large-water") ? { "kogai-large-water": KOGAI_LARGE_WATER_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("dekyo-chief-system") ? { "dekyo-chief-system": DEKYO_CHIEF_SYSTEM_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("eiken5") ? { eiken5: EIKEN5_QUESTIONS } : {}),
  ...(isExamPublished("rodo-kijun-kantokukan") ? { "rodo-kijun-kantokukan": RODO_KIJUN_KANTOKUKAN_QUESTIONS } : {}),
  ...(isExamPublished("chizai1") ? { chizai1: CHIZAI1_QUESTIONS } : {}),
  ...(isExamPublished("kogai-09") ? { "kogai-09": KOGAI09_QUESTIONS } : {}),
  ...(isExamPublished("webdesign2") ? { webdesign2: WEBDESIGN2_QUESTIONS } : {}),
  ...(isExamPublished("glass-sekou1") ? { "glass-sekou1": GLASS_SEKOU1_QUESTIONS } : {}),
  ...(isExamPublished("eikenp1") ? { "eikenp1": EIKENP1_QUESTIONS } : {}),
  ...(isExamPublished("zensho-eco-81") ? { "zensho-eco-81": ZENSHO_ECO81_QUESTIONS } : {}),
  ...(isExamPublished("kogai-07") ? { "kogai-07": KOGAI07_QUESTIONS } : {}),
  ...(isExamPublished("webdesign-3") ? { "webdesign-3": WEBDESIGN3_QUESTIONS } : {}),
  ...(isExamPublished("kokka-ippan-dai") ? { "kokka-ippan-dai": KOKKA_IPPAN_DAI_QUESTIONS } : {}),
  ...(isExamPublished("kokka-sogo-in") ? { "kokka-sogo-in": KOKKA_SOGO_IN_QUESTIONS } : {}),
  ...(isExamPublished("technical-illustration-cad1") ? { "technical-illustration-cad1": TECHNICAL_ILLUSTRATION_CAD1_QUESTIONS } : {}),
  ...(isExamPublished("kawarabuki2") ? { "kawarabuki2": KAWARABUKI2_QUESTIONS } : {}),
  ...(isExamPublished("zensho-eco-79") ? { "zensho-eco-79": ZENSHO_ECO_79_QUESTIONS } : {}),
  ...(isExamPublished("career-gino-1") ? { "career-gino-1": CAREER_GINO_1_QUESTIONS } : {}),
  ...(isExamPublished("kogai-12") ? { "kogai-12": KOGAI_12_QUESTIONS } : {}),
  ...(isExamPublished("kogai-15") ? { "kogai-15": KOGAI_15_QUESTIONS } : {}),
  ...(isExamPublished("dekyo-charge-1") ? { "dekyo-charge-1": DEKYO_CHARGE_1_QUESTIONS } : {}),
  ...(isExamPublished("toukei1") ? { "toukei1": TOUKEI1_QUESTIONS } : {}),
  ...(isExamPublished("restaurant-1") ? { "restaurant-1": RESTAURANT_1_QUESTIONS } : {}),
  ...(isExamPublished("kogai-taiki-tokuron") ? { "kogai-taiki-tokuron": KOGAI_TAIKI_TOKURON_QUESTIONS } : {}),
  ...(isExamPublished("cfp-souzoku") ? { "cfp-souzoku": CFP_SOUZOKU_QUESTIONS } : {}),
  ...(isExamPublished("telecom-chief-denso") ? { "telecom-chief-denso": TELECOM_CHIEF_DENSO_QUESTIONS } : {}),
  ...(isExamPublished("kanken-j1") ? { "kanken-j1": KANKEN_J1_QUESTIONS } : {}),
  ...(isExamPublished("kanken-4") ? { "kanken-4": KANKEN_4_QUESTIONS } : {}),
  ...(isExamPublished("kounin") ? { "kounin": KOUNIN_QUESTIONS } : {}),
  ...(isExamPublished("kanken-10") ? { "kanken-10": KANKEN_10_QUESTIONS } : {}),
  ...(isExamPublished("kanken-9") ? { "kanken-9": KANKEN_9_QUESTIONS } : {}),
  ...(isExamPublished("eju") ? { "eju": EJU_QUESTIONS } : {}),
  ...(isExamPublished("zensho-english") ? { "zensho-english": ZENSHO_ENGLISH_QUESTIONS } : {}),
  ...(isExamPublished("kanken-j2") ? { "kanken-j2": KANKEN_J2_QUESTIONS } : {}),
  ...(isExamPublished("zensho-bido") ? { "zensho-bido": ZENSHO_BIDO_QUESTIONS } : {}),
  ...(isExamPublished("kanken-6") ? { "kanken-6": KANKEN_6_QUESTIONS } : {}),
  ...(isExamPublished("kanken-7") ? { "kanken-7": KANKEN_7_QUESTIONS } : {}),
  ...(isExamPublished("kanken-8") ? { "kanken-8": KANKEN_8_QUESTIONS } : {}),
  ...(isExamPublished("zensho-info") ? { "zensho-info": ZENSHO_INFO_QUESTIONS } : {}),
  ...(isExamPublished("kanken-2") ? { "kanken-2": KANKEN_2_QUESTIONS } : {}),
  ...(isExamPublished("kanken-5") ? { "kanken-5": KANKEN_5_QUESTIONS } : {}),
  ...(isExamPublished("zensho-boki") ? { "zensho-boki": ZENSHO_BOKI_QUESTIONS } : {}),
  ...(isExamPublished("jlpt-n5") ? { "jlpt-n5": JLPT_N5_QUESTIONS } : {}),
  ...(isExamPublished("jlpt-n3") ? { "jlpt-n3": JLPT_N3_QUESTIONS } : {}),
  ...(isExamPublished("suken-jun1") ? { "suken-jun1": SUKEN_JUN1_QUESTIONS } : {}),
  ...(isExamPublished("suken-11") ? { "suken-11": SUKEN_11_QUESTIONS } : {}),
  ...(isExamPublished("zensho-calc-1") ? { "zensho-calc-1": ZENSHO_CALC_1_QUESTIONS } : {}),
  ...(isExamPublished("zensho-boki-2") ? { "zensho-boki-2": ZENSHO_BOKI_2_QUESTIONS } : {}),
  ...(isExamPublished("zensho-calc") ? { "zensho-calc": ZENSHO_CALC_QUESTIONS } : {}),
  ...(isExamPublished("suken") ? { "suken": SUKEN_QUESTIONS } : {}),
  ...(isExamPublished("eiken1") ? { eiken1: EIKEN1_QUESTIONS } : {}),
  ...(isExamPublished("gijutsushi1-kiso") ? { "gijutsushi1-kiso": GIJUTSUSHI1_KISO_QUESTIONS } : {}),
  ...(isExamPublished("jlpt") ? { "jlpt": JLPT_QUESTIONS } : {}),
  ...(isExamPublished("career-gino-2") ? { "career-gino-2": CAREER_GINO_2_QUESTIONS } : {}),
  ...(isExamPublished("gijutsushi1-kensetsu") ? { "gijutsushi1-kensetsu": GIJUTSUSHI1_KENSETSU_QUESTIONS } : {}),
  ...(isExamPublished("eikenp2") ? { eikenp2: EIKENP2_QUESTIONS } : {}),
  ...(isExamPublished("dekyo-charge-3") ? { "dekyo-charge-3": DEKYO_CHARGE_3_QUESTIONS } : {}),
  ...(isExamPublished("zensho-eco-77") ? { "zensho-eco-77": ZENSHO_ECO_77_QUESTIONS } : {}),
  ...(isExamPublished("literas") ? { literas: LITERAS_QUESTIONS } : {}),
  ...(isExamPublished("cfp") ? { cfp: CFP_QUESTIONS } : {}),
  ...(isExamPublished("kokka-sogo-dai") ? { "kokka-sogo-dai": KOKKA_SOGO_DAI_QUESTIONS } : {}),
  ...(isExamPublished("boueki-c") ? { "boueki-c": BOUEKI_C_QUESTIONS } : {}),
  ...(isExamPublished("service2") ? { service2: SERVICE2_QUESTIONS } : {}),
  ...(isExamPublished("apef3") ? { apef3: APEF3_QUESTIONS } : {}),
  ...(isExamPublished("eiken1") ? { "eiken1": EIKEN1_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("zensho-eco-77") ? { "zensho-eco-77": ZENSHO_ECO_77_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("kanken-3") ? { "kanken-3": KANKEN_3_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("suken") ? { "suken": SUKEN_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("zensho-calc") ? { "zensho-calc": ZENSHO_CALC_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("zensho-english") ? { "zensho-english": ZENSHO_ENGLISH_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("kounin") ? { "kounin": KOUNIN_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("zensho-bc") ? { "zensho-bc": ZENSHO_BC_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("ishi") ? { ishi: ISHI_QUESTIONS } : {}),
  ...(isExamPublished("building-cleaning-1") ? { "building-cleaning-1": BUILDING_CLEANING_1_QUESTIONS } : {}),
  ...(isExamPublished("gijutsushi1-tekisei") ? { "gijutsushi1-tekisei": GIJUTSUSHI1_TEKISEI_QUESTIONS } : {}),
  ...(isExamPublished("juishi") ? { "juishi": JUISHI_QUESTIONS } : {}),
  ...(isExamPublished("koku-hoan-daigakko") ? { "koku-hoan-daigakko": KOKU_HOAN_DAIGAKKO_QUESTIONS } : {}),
  ...(isExamPublished("cfp-5") ? { "cfp-5": CFP_5_QUESTIONS } : {}),
  ...(isExamPublished("kogai-01") ? { "kogai-01": KOGAI_01_QUESTIONS } : {}),
  ...(isExamPublished("cfp") ? { "cfp": CFP_QUESTIONS } : {}),

  ...(isExamPublished("eiken1") ? { "eiken1": EIKEN1_QUESTIONS } : {}),
  ...(isExamPublished("ishi") ? { "ishi": ISHI_QUESTIONS } : {}),
  ...(isExamPublished("dekyo-charge-3") ? { "dekyo-charge-3": DEKYO_DIGITAL1_QUESTIONS } : {}),
  ...(isExamPublished("zensho-eco-78") ? { "zensho-eco-78": ZENSHO_ECO_78_QUESTIONS } : {}),
  ...(isExamPublished("dekyo-charge-5") ? { "dekyo-charge-5": DEKYO_CHARGE_5_QUESTIONS } : {}),
  ...(isExamPublished("eikenp2plus") ? { "eikenp2plus": EIKENP2PLUS_QUESTIONS } : {}),
  ...(isExamPublished("kokuzei-senmonkan") ? { "kokuzei-senmonkan": KOKUZEI_SENMONKAN_QUESTIONS } : {}),




  ...(isExamPublished("jobpass3") ? { "jobpass3": NEW_JOBPASS3 } : {}),
  ...(isExamPublished("fujin-kodomofuku2") ? { "fujin-kodomofuku2": FUJIN_KODOMOFUKU2_QUESTIONS } : {}),
  ...(isExamPublished("fujin-kodomofuku1") ? { "fujin-kodomofuku1": FUJIN_KODOMOFUKU1_QUESTIONS } : {}),
  ...(isExamPublished("toso1") ? { "toso1": TOSO1_QUESTIONS } : {}),
  ...(isExamPublished("kojo-bankin1") ? { "kojo-bankin1": KOJO_BANKIN1_QUESTIONS } : {}),
  ...(isExamPublished("kenchiku-bankin1") ? { "kenchiku-bankin1": KENCHIKU_BANKIN1_QUESTIONS } : {}),
  ...(isExamPublished("kinzoku-netsushori3") ? { "kinzoku-netsushori3": KINZOKU_NETSUSHORI3_QUESTIONS } : {}),
  ...(isExamPublished("kojo-bankin3") ? { "kojo-bankin3": KOJO_BANKIN3_QUESTIONS } : {}),
  ...(isExamPublished("kojo-bankin2") ? { "kojo-bankin2": KOJO_BANKIN2_QUESTIONS } : {}),
  ...(isExamPublished("mekki2") ? { "mekki2": MEKKI2_QUESTIONS } : {}),
  ...(isExamPublished("flower1") ? { "flower1": FLOWER1_QUESTIONS } : {}),
  ...(isExamPublished("flower3") ? { "flower3": FLOWER3_QUESTIONS } : {}),
  ...(isExamPublished("kagu3") ? { "kagu3": KAGU3_QUESTIONS } : {}),
  ...(isExamPublished("diecast1") ? { "diecast1": DIECAST1_QUESTIONS } : {}),
  ...(isExamPublished("tetsudo-sharyo1") ? { "tetsudo-sharyo1": TETSUDO_SHARYO1_QUESTIONS } : {}),
  ...(isExamPublished("insatsu2") ? { "insatsu2": INSATSU2_QUESTIONS } : {}),
  ...(isExamPublished("insatsu1") ? { "insatsu1": INSATSU1_QUESTIONS } : {}),
  ...(isExamPublished("engei-soshoku2") ? { "engei-soshoku2": ENGEI_SOSHOKU2_QUESTIONS } : {}),
  ...(isExamPublished("sasshi1") ? { "sasshi1": SASSHI1_QUESTIONS } : {}),
  ...(isExamPublished("kyoka-plastic2") ? { "kyoka-plastic2": KYOKA_PLASTIC2_QUESTIONS } : {}),
  ...(isExamPublished("kyoka-plastic1") ? { "kyoka-plastic1": KYOKA_PLASTIC1_QUESTIONS } : {}),
  ...(isExamPublished("kagaku-bunseki3") ? { "kagaku-bunseki3": KAGAKU_BUNSEKI3_QUESTIONS } : {}),
  ...(isExamPublished("kagaku-bunseki1") ? { "kagaku-bunseki1": KAGAKU_BUNSEKI1_QUESTIONS } : {}),
  ...(isExamPublished("chikuro1") ? { "chikuro1": CHIKURO1_QUESTIONS } : {}),
  ...(isExamPublished("futsu-senban1") ? { "futsu-senban1": FUTSU_SENBAN1_QUESTIONS } : {}),
  ...(isExamPublished("shashutsu1") ? { "shashutsu1": SHASHUTSU1_QUESTIONS } : {}),
  ...(isExamPublished("katawaku2") ? { "katawaku2": KATAWAKU2_QUESTIONS } : {}),
  ...(isExamPublished("tekkin3") ? { "tekkin3": TEKKIN3_QUESTIONS } : {}),
  ...(isExamPublished("tekkin2") ? { "tekkin2": TEKKIN2_QUESTIONS } : {}),
  ...(isExamPublished("pan-seizo1") ? { "pan-seizo1": PAN_SEIZO1_QUESTIONS } : {}),
  ...(isExamPublished("pan-seizo2") ? { "pan-seizo2": PAN_SEIZO2_QUESTIONS } : {}),
  ...(isExamPublished("kikai-shiage1") ? { "kikai-shiage1": KIKAI_SHIAGE1_QUESTIONS } : {}),
  ...(isExamPublished("kikai-seizu-tegaki1") ? { "kikai-seizu-tegaki1": KIKAI_SEIZU_TEGAKI1_QUESTIONS } : {}),
  ...(isExamPublished("sequence1") ? { "sequence1": SEQUENCE1_QUESTIONS } : {}),
  ...(isExamPublished("reito-seko2") ? { "reito-seko2": REITO_SEKO2_QUESTIONS } : {}),
  ...(isExamPublished("reito-seko1") ? { "reito-seko1": REITO_SEKO1_QUESTIONS } : {}),
  ...(isExamPublished("kuukiatsu-kumitate2") ? { "kuukiatsu-kumitate2": KUUKIATSU_KUMITATE2_QUESTIONS } : {}),
  ...(isExamPublished("kuukiatsu-kumitate1") ? { "kuukiatsu-kumitate1": KUUKIATSU_KUMITATE1_QUESTIONS } : {}),
  ...(isExamPublished("henatsuki-kumitate2") ? { "henatsuki-kumitate2": HENATSUKI_KUMITATE2_QUESTIONS } : {}),
  ...(isExamPublished("henatsuki-kumitate1") ? { "henatsuki-kumitate1": HENATSUKI_KUMITATE1_QUESTIONS } : {}),
  ...(isExamPublished("sequence3") ? { "sequence3": SEQUENCE3_QUESTIONS } : {}),
  ...(isExamPublished("sequence2") ? { "sequence2": SEQUENCE2_QUESTIONS } : {}),
  ...(isExamPublished("zoen-gino1") ? { "zoen-gino1": ZOEN_GINO1_QUESTIONS } : {}),
  ...(isExamPublished("sakan1") ? { "sakan1": SAKAN1_QUESTIONS } : {}),
  ...(isExamPublished("sakan3") ? { "sakan3": SAKAN3_QUESTIONS } : {}),
  ...(isExamPublished("sakan2") ? { "sakan2": SAKAN2_QUESTIONS } : {}),
  ...(isExamPublished("kikai-seizu-cad1") ? { "kikai-seizu-cad1": KIKAI_SEIZU_CAD1_QUESTIONS } : {}),
  ...(isExamPublished("kikai-seizu-cad3") ? { "kikai-seizu-cad3": KIKAI_SEIZU_CAD3_QUESTIONS } : {}),
  ...(isExamPublished("plant-haikan-seizu2") ? { "plant-haikan-seizu2": PLANT_HAIKAN_SEIZU2_QUESTIONS } : {}),
  ...(isExamPublished("kikai-shiage2") ? { "kikai-shiage2": KIKAI_SHIAGE2_QUESTIONS } : {}),
  ...(isExamPublished("kikai-shiage3") ? { "kikai-shiage3": KIKAI_SHIAGE3_QUESTIONS } : {}),
  ...(isExamPublished("zoen-gino2") ? { "zoen-gino2": ZOEN_GINO2_QUESTIONS } : {}),
  ...(isExamPublished("zoen-gino3") ? { "zoen-gino3": ZOEN_GINO3_QUESTIONS } : {}),
  ...(isExamPublished("chuzo3") ? { "chuzo3": CHUZO3_QUESTIONS } : {}),
  ...(isExamPublished("reito-seko3") ? { "reito-seko3": REITO_SEKO3_QUESTIONS } : {}),
  ...(isExamPublished("chuzo2") ? { "chuzo2": CHUZO2_QUESTIONS } : {}),
  ...(isExamPublished("chuzo1") ? { "chuzo1": CHUZO1_QUESTIONS } : {}),
  ...(isExamPublished("netsuzetsuen2") ? { "netsuzetsuen2": NETSUZETSUEN2_QUESTIONS } : {}),
  ...(isExamPublished("hiseshoku-jokyo1") ? { "hiseshoku-jokyo1": HISESHOKU_JOKYO1_QUESTIONS } : {}),
  ...(isExamPublished("tategu1") ? { "tategu1": TATEGU1_QUESTIONS } : {}),
  ...(isExamPublished("shohin-soshoku1") ? { "shohin-soshoku1": SHOHIN_SOSHOKU1_QUESTIONS } : {}),
  ...(isExamPublished("kogaku-glass1") ? { "kogaku-glass1": KOGAKU_GLASS1_QUESTIONS } : {}),
  ...(isExamPublished("sangyo-sharyo1") ? { "sangyo-sharyo1": SANGYO_SHARYO1_QUESTIONS } : {}),
  ...(isExamPublished("yogashi1") ? { "yogashi1": YOGASHI1_QUESTIONS } : {}),
  ...(isExamPublished("block-kenchiku3") ? { "block-kenchiku3": BLOCK_KENCHIKU3_QUESTIONS } : {}),
  ...(isExamPublished("block-kenchiku1") ? { "block-kenchiku1": BLOCK_KENCHIKU1_QUESTIONS } : {}),
  ...(isExamPublished("shuzo1") ? { "shuzo1": SHUZO1_QUESTIONS } : {}),
  ...(isExamPublished("fraise1") ? { "fraise1": FRAISE1_QUESTIONS } : {}),
  ...(isExamPublished("fraise2") ? { "fraise2": FRAISE2_QUESTIONS } : {}),
  ...(isExamPublished("fraise3") ? { "fraise3": FRAISE3_QUESTIONS } : {}),
  ...(isExamPublished("kikai-kensa1") ? { "kikai-kensa1": KIKAI_KENSA1_QUESTIONS } : {}),
  ...(isExamPublished("kikai-kensa2") ? { "kikai-kensa2": KIKAI_KENSA2_QUESTIONS } : {}),
  ...(isExamPublished("kogyo-hoso2") ? { "kogyo-hoso2": KOGYO_HOSO2_QUESTIONS } : {}),
  ...(isExamPublished("katawaku1") ? { "katawaku1": KATAWAKU1_QUESTIONS } : {}),
  ...(isExamPublished("katawaku3") ? { "katawaku3": KATAWAKU3_QUESTIONS } : {}),
  ...(isExamPublished("tekkin-zumen1") ? { "tekkin-zumen1": TEKKIN_ZUMEN1_QUESTIONS } : {}),
  ...(isExamPublished("tekkin-zumen2") ? { "tekkin-zumen2": TEKKIN_ZUMEN2_QUESTIONS } : {}),
  ...(isExamPublished("tekkin-zumen3") ? { "tekkin-zumen3": TEKKIN_ZUMEN3_QUESTIONS } : {}),
  ...(isExamPublished("kinzoku-press1") ? { "kinzoku-press1": KINZOKU_PRESS1_QUESTIONS } : {}),
  ...(isExamPublished("kinzoku-press2") ? { "kinzoku-press2": KINZOKU_PRESS2_QUESTIONS } : {}),
  ...(isExamPublished("haikan-kenchiku3") ? { "haikan-kenchiku3": HAIKAN_KENCHIKU3_QUESTIONS } : {}),
  ...(isExamPublished("bousui-frp1") ? { "bousui-frp1": BOUSUI_FRP1_QUESTIONS } : {}),
  ...(isExamPublished("bousui-frp2") ? { "bousui-frp2": BOUSUI_FRP2_QUESTIONS } : {}),
  ...(isExamPublished("naiso-carpet1") ? { "naiso-carpet1": NAISO_CARPET1_QUESTIONS } : {}),
  ...(isExamPublished("shashutsu2") ? { "shashutsu2": SHASHUTSU2_QUESTIONS } : {}),
  ...(isExamPublished("kikai-kensa3") ? { "kikai-kensa3": KIKAI_KENSA3_QUESTIONS } : {}),
  ...(isExamPublished("kagaku-bunseki2") ? { "kagaku-bunseki2": KAGAKU_BUNSEKI2_QUESTIONS } : {}),
  ...(isExamPublished("engei-soshoku1") ? { "engei-soshoku1": ENGEI_SOSHOKU1_QUESTIONS } : {}),
  ...(isExamPublished("engei-soshoku3") ? { "engei-soshoku3": ENGEI_SOSHOKU3_QUESTIONS } : {}),
  ...(isExamPublished("kagu1") ? { "kagu1": KAGU1_QUESTIONS } : {}),
  ...(isExamPublished("kagu2") ? { "kagu2": KAGU2_QUESTIONS } : {}),
  ...(isExamPublished("mekki3") ? { "mekki3": MEKKI3_QUESTIONS } : {}),
  ...(isExamPublished("mekki1") ? { "mekki1": MEKKI1_QUESTIONS } : {}),
  ...(isExamPublished("kinzoku-netsushori1") ? { "kinzoku-netsushori1": KINZOKU_NETSUSHORI1_QUESTIONS } : {}),
  ...(isExamPublished("tekko1") ? { "tekko1": TEKKO1_QUESTIONS } : {}),
  ...(isExamPublished("denshi-kiki-kumitate1") ? { "denshi-kiki-kumitate1": DENSHI_KIKI_KUMITATE1_QUESTIONS } : {}),
  ...(isExamPublished("denshi-kiki-kumitate3") ? { "denshi-kiki-kumitate3": DENSHI_KIKI_KUMITATE3_QUESTIONS } : {}),
  ...(isExamPublished("toso2") ? { "toso2": TOSO2_QUESTIONS } : {}),
  ...(isExamPublished("kikai-hozen-denki1") ? { "kikai-hozen-denki1": KIKAI_HOZEN_DENKI1_QUESTIONS } : {}),
  ...(isExamPublished("kikai-hozen-setsubi1") ? { "kikai-hozen-setsubi1": KIKAI_HOZEN_SETSUBI1_QUESTIONS } : {}),
  ...(isExamPublished("kikai-hozen-denki3") ? { "kikai-hozen-denki3": KIKAI_HOZEN_DENKI3_QUESTIONS } : {}),
  ...(isExamPublished("kikai-hozen3") ? { "kikai-hozen3": KIKAI_HOZEN3_QUESTIONS } : {}),
  ...(isExamPublished("unko-kanrisha-ryokaku") ? { "unko-kanrisha-ryokaku": UNKO_KANRISHA_RYOKAKU.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("shobo-setsubishi-kou1") ? { "shobo-setsubishi-kou1": SHOBO_SETSUBISHI_KOU1.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("kikenbutsu-kou") ? { "kikenbutsu-kou": KIKENBUTSU_KOU.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("kikenbutsu-hei") ? { "kikenbutsu-hei": KIKENBUTSU_HEI.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("shobo-setsubishi-kou4") ? { "shobo-setsubishi-kou4": SHOBO_SETSUBISHI_KOU4.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("shobo-setsubishi-otsu6") ? { "shobo-setsubishi-otsu6": SHOBO_SETSUBISHI_OTSU6.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("unko-kanrisha-kamotsu") ? { "unko-kanrisha-kamotsu": UNKO_KANRISHA_KAMOTSU.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("kikenbutsu-otsu4") ? { "kikenbutsu-otsu4": KIKENBUTSU_OTSU4.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("benrishi") ? { "benrishi": BATCH3_0.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("sokuryoshi") ? { "sokuryoshi": BATCH3_1.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("dokugeki-chiba") ? { "dokugeki-chiba": BATCH3_2.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("jokaso-setsubishi") ? { "jokaso-setsubishi": BATCH3_3.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("chiiki-ryoko") ? { "chiiki-ryoko": BATCH3_4.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("junkango-kansai") ? { "junkango-kansai": BATCH3_5.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("kukaku-seiri") ? { "kukaku-seiri": BATCH3_6.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("dojo-osen") ? { "dojo-osen": BATCH3_7.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("kenchikushi2") ? { "kenchikushi2": BATCH3_8.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("mokuzo-kenchikushi") ? { "mokuzo-kenchikushi": BATCH3_9.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("sekou-1kenchiku") ? { "sekou-1kenchiku": SEKOU_1KENCHIKU_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("khk-kagaku") ? { "khk-kagaku": PUBLIC_KHK_KAGAKU_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("kenchikushi1") ? { kenchikushi1: KENCHIKUSHI1_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  "reform-mgr": REFORM_MGR_QUESTIONS,
  "shohi-sodan": SHOHI_SODAN_QUESTIONS,
  ...(isExamPublished("chintai") ? { "chintai": BATCH1_QUESTIONS["chintai"]!.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("kyusui") ? { "kyusui": BATCH1_QUESTIONS["kyusui"]!.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("biru-kan") ? { "biru-kan": BATCH1_QUESTIONS["biru-kan"]!.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("gijutsushi1-kikai") ? { "gijutsushi1-kikai": BATCH1_QUESTIONS["gijutsushi1-kikai"]!.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("hoshasen-1") ? { "hoshasen-1": BATCH1_QUESTIONS["hoshasen-1"]!.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("hoshasen-2") ? { "hoshasen-2": BATCH1_QUESTIONS["hoshasen-2"]!.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("khk-kikai-kou") ? { "khk-kikai-kou": BATCH1_QUESTIONS["khk-kikai-kou"]!.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("khk-kikai-otsu") ? { "khk-kikai-otsu": BATCH1_QUESTIONS["khk-kikai-otsu"]!.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("energy-kanri") ? { "energy-kanri": BATCH1_QUESTIONS["energy-kanri"]!.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("kanteishi") ? { kanteishi: KANTEISHI_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("kaikeishi") ? { kaikeishi: KAIKEISHI_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("riku-tech2") ? { "riku-tech2": RIKU_TECH2_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("amateur2") ? { "amateur2": AMATEUR2_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("maritime-radar") ? { "maritime-radar": MARITIME_RADAR_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("amateur1") ? { "amateur1": AMATEUR1_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("maritime-special1") ? { "maritime-special1": MARITIME_SPECIAL1_QUESTIONS } : {}),
  ...(isExamPublished("aviation-comm") ? { "aviation-comm": AVIATION_COMM_QUESTIONS } : {}),
  ...(isExamPublished("riku-toku-kokunai") ? { "riku-toku-kokunai": RIKU_TOKU_KOKUNAI_QUESTIONS } : {}),
  ...(isExamPublished("kai-toku2") ? { "kai-toku2": KAI_TOKU2_QUESTIONS } : {}),
  ...(isExamPublished("kai-toku3") ? { "kai-toku3": KAI_TOKU3_QUESTIONS } : {}),
  ...(isExamPublished("koku-toku") ? { "koku-toku": KOKU_TOKU_QUESTIONS } : {}),
  ...(isExamPublished("land-special1") ? { "land-special1": LAND_SPECIAL1_QUESTIONS } : {}),
  ...(isExamPublished("riku-tech1") ? { "riku-tech1": RIKU_TECH1_QUESTIONS } : {}),
  ...(isExamPublished("maritime4") ? { "maritime4": MARITIME4_QUESTIONS } : {}),
  ...(isExamPublished("maritime1") ? { "maritime1": MARITIME1_QUESTIONS } : {}),
  ...(isExamPublished("maritime2") ? { "maritime2": MARITIME2_QUESTIONS } : {}),
  ...(isExamPublished("general1") ? { "general1": GENERAL1_QUESTIONS } : {}),
  ...(isExamPublished("general2") ? { "general2": GENERAL2_QUESTIONS } : {}),
  ...(isExamPublished("general3") ? { "general3": GENERAL3_QUESTIONS } : {}),
  ...(isExamPublished("maritime3") ? { "maritime3": MARITIME3_QUESTIONS } : {}),
  ...(isExamPublished("land-special2") ? { "land-special2": LAND_SPECIAL2_QUESTIONS } : {}),
  ...(isExamPublished("land-special3") ? { "land-special3": LAND_SPECIAL3_QUESTIONS } : {}),
  ...(isExamPublished("chosashi") ? { chosashi: CHOSASHI_QUESTIONS } : {}),
  ...(isExamPublished("riyoshi") ? { riyoshi: RIYOSHI_QUESTIONS } : {}),
  ap: AP_QUESTIONS,
  ip: IP_QUESTIONS,
  sg: SG_QUESTIONS,
  fe: FE_QUESTIONS,
  sc: SC_QUESTIONS,
  nw: NW_QUESTIONS,
  db: DB_QUESTIONS,
  st: ST_QUESTIONS,
  sa: SA_QUESTIONS,
  pm: PM_QUESTIONS,
  es: ES_QUESTIONS,
  sm: SM_QUESTIONS,
  au: AU_QUESTIONS,
  fp2: FP2_QUESTIONS,
  fp1: FP1_QUESTIONS,
  fp3: FP3_QUESTIONS,
  denken3: DENKEN3_YEAR_PAPERS,
  ...(isExamPublished("denken2") ? { denken2: DENKEN2_PRACTICE_QUESTIONS } : {}),

  ...(isExamPublished("denken1") ? { denken1: ALL_DENKEN1_QUESTIONS } : {}),
  takken: TAKKEN_QUESTIONS,
  // The official FAQ asks users to notify the examination center. Keep the
// reviewed pilot out of all public counts/routes until that receipt exists.
  ...(isExamPublished("denko2") ? { denko2: DENKO2_PRACTICE_QUESTIONS } : {}),
  ...(isExamPublished("denko1") ? { denko1: DENKO1_QUESTIONS } : {}),
  ...(isExamPublished("civil2") ? { civil2: CIVIL2_QUESTIONS } : {}),
  ...(isExamPublished("kankoji2") ? { kankoji2: KANKOJI2_QUESTIONS } : {}),
  ...(isExamPublished("zoen2") ? { zoen2: ZOEN2_QUESTIONS } : {}),
  ...(isExamPublished("zoen1") ? { zoen1: ZOEN1_QUESTIONS } : {}),
  ...(isExamPublished("tsushin2") ? { tsushin2: TSUSHIN2_QUESTIONS } : {}),
  ...(isExamPublished("tsushin1") ? { tsushin1: TSUSHIN1_QUESTIONS } : {}),
  ...(isExamPublished("kaigo") ? { kaigo: KAIGO_QUESTIONS } : {}),
  ...(isExamPublished("civil1") ? { civil1: CIVIL1_QUESTIONS } : {}),
  ...(isExamPublished("shakai") ? { shakai: SHAKAI_QUESTIONS } : {}),
  ...(isExamPublished("seishin") ? { seishin: SEISHIN_QUESTIONS } : {}),
  ...(isExamPublished("tohan") ? { tohan: TOHAN_QUESTIONS } : {}),
  ...(isExamPublished("kanri") ? { kanri: KANRI_QUESTIONS } : {}),
  ...(isExamPublished("eisei1") ? { eisei1: EISEI1_QUESTIONS } : {}),
  ...(isExamPublished("eisei2") ? { eisei2: EISEI2_QUESTIONS } : {}),
  ...(isExamPublished("soukan") ? { soukan: SOUKAN_QUESTIONS } : {}),
  ...(isExamPublished("hoikushi") ? { hoikushi: HOIKUSHI_QUESTIONS } : {}),
  ...(isExamPublished("mankan") ? { mankan: MANKAN_QUESTIONS } : {}),
  ...(isExamPublished("kashikin") ? { kashikin: KASHIKIN_QUESTIONS } : {}),
  ...(isExamPublished("sharoushi") ? { sharoushi: SHAROUSHI_QUESTIONS } : {}),
  ...(isExamPublished("chusho-kigyo-shindanshi") ? { "chusho-kigyo-shindanshi": CHUSHO_KIGYO_SHINDANSHI_QUESTIONS } : {}),
  ...(isExamPublished("kangoshi") ? { kangoshi: KANGOSHI_QUESTIONS } : {}),
  ...(isExamPublished("yakuzaishi") ? { yakuzaishi: YAKUZAISHI_QUESTIONS } : {}),
  ...(isExamPublished("ahaki-anma") ? { "ahaki-anma": AHAKI_ANMA_QUESTIONS } : {}),
  ...(isExamPublished("ahaki-hari-kyu") ? { "ahaki-hari-kyu": AHAKI_HARI_KYUU_QUESTIONS } : {}),
  ...(isExamPublished("hokenshi") ? { hokenshi: HOKENSHI_QUESTIONS } : {}),
  ...(isExamPublished("josanshi") ? { josanshi: JOSANSHI_QUESTIONS } : {}),
  ...(isExamPublished("rigaku-ryohoshi") ? { "rigaku-ryohoshi": RIGAKU_RYOHOUSHI_QUESTIONS } : {}),
  ...(isExamPublished("sagyo-ryohoshi") ? { "sagyo-ryohoshi": SAGYO_RYOHOSHI_QUESTIONS } : {}),
  ...(isExamPublished("gengo-chokakushi") ? { "gengo-chokakushi": GENGO_CHOKAKUSHI_QUESTIONS } : {}),
  ...(isExamPublished("shino-kunrenshi") ? { "shino-kunrenshi": SHINO_KUNRENSHI_QUESTIONS } : {}),
  ...(isExamPublished("rinsho-kogishi") ? { "rinsho-kogishi": RINSHO_KOGISHI_QUESTIONS } : {}),
  ...(isExamPublished("judo-seifukushi") ? { "judo-seifukushi": JUDO_SEIFUKUSHI_QUESTIONS } : {}),
  ...(isExamPublished("gas-kou") ? { "gas-kou": GAS_KOU_QUESTIONS } : {}),
  ...(isExamPublished("gas-otsu") ? { "gas-otsu": GAS_OTSU_QUESTIONS } : {}),
  ...(isExamPublished("gas-hei") ? { "gas-hei": GAS_HEI_QUESTIONS } : {}),
  ...(isExamPublished("rinsho-kensagishi") ? { "rinsho-kensagishi": RINSHO_KENSAGISHI_QUESTIONS } : {}),
  ...(isExamPublished("shinryo-hoshasengishi") ? { "shinryo-hoshasengishi": SHINRYO_HOSHASENGISHI_QUESTIONS } : {}),
  ...(isExamPublished("shika-ishi") ? { "shika-ishi": SHIKA_ISHI_QUESTIONS } : {}),
  ...(isExamPublished("kenchiku-setsubishi") ? { "kenchiku-setsubishi": KENCHIKU_SETSUBISHI_STUDY_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("chizai2") ? { chizai2: CHIZAI2_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("kisho") ? { kisho: KISHO_QUESTIONS } : {}),
  ...(isExamPublished("jidosha-1-small-written") ? { "jidosha-1-small-written": getAutomotiveQuestions("jidosha-1-small-written") } : {}),
  ...(isExamPublished("jidosha-2-gasoline") ? { "jidosha-2-gasoline": getAutomotiveQuestions("jidosha-2-gasoline") } : {}),
  ...(isExamPublished("jidosha-2-diesel") ? { "jidosha-2-diesel": getAutomotiveQuestions("jidosha-2-diesel") } : {}),
  ...(isExamPublished("jidosha-2-chassis") ? { "jidosha-2-chassis": getAutomotiveQuestions("jidosha-2-chassis") } : {}),
  ...(isExamPublished("jidosha-2-motorcycle") ? { "jidosha-2-motorcycle": getAutomotiveQuestions("jidosha-2-motorcycle") } : {}),
  ...(isExamPublished("jidosha-3-chassis") ? { "jidosha-3-chassis": getAutomotiveQuestions("jidosha-3-chassis") } : {}),
  ...(isExamPublished("jidosha-3-gasoline") ? { "jidosha-3-gasoline": getAutomotiveQuestions("jidosha-3-gasoline") } : {}),
  ...(isExamPublished("jidosha-3-diesel") ? { "jidosha-3-diesel": getAutomotiveQuestions("jidosha-3-diesel") } : {}),
  ...(isExamPublished("jidosha-3-motorcycle") ? { "jidosha-3-motorcycle": getAutomotiveQuestions("jidosha-3-motorcycle") } : {}),
  ...(isExamPublished("jidosha-body") ? { "jidosha-body": getAutomotiveQuestions("jidosha-body") } : {}),
  ...(isExamPublished("jidosha-electrical") ? { "jidosha-electrical": getAutomotiveQuestions("jidosha-electrical") } : {}),
  biyoshi: BIYOSHI_QUESTIONS,
  "kikenbutsu-otsu1": OT1_QUESTIONS,
  "kikenbutsu-otsu2": OT2_QUESTIONS,
  "kikenbutsu-otsu6": OT6_QUESTIONS,
  ...(isExamPublished("jokaso") ? { jokaso: JOKASO_CANDIDATES.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("iji-shuzen") ? { "iji-shuzen": IJI_SHUZEN_QUESTIONS } : {}),
  ...(isExamPublished("denki1") ? { denki1: DENKI1_QUESTIONS } : {}),
  ...(isExamPublished("shuwa") ? { shuwa: SHUWA_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("jken-katsuyo3") ? { "jken-katsuyo3": JKEN_KATSUYO3_QUESTIONS } : {}),
  ...(isExamPublished("jken-katsuyo2") ? { "jken-katsuyo2": JKEN_KATSUYO2_QUESTIONS } : {}),
  ...(isExamPublished("jobpass3") ? { jobpass3: JOBPASS3_QUESTIONS } : {}),
  ...(isExamPublished("jken-katsuyo1") ? { "jken-katsuyo1": JKEN_KATSUYO1_QUESTIONS } : {}),
  ...(isExamPublished("jobpass") ? { "jobpass": JOBPASS_QUESTIONS } : {}),
  ...(isExamPublished("jobpass3") ? { "jobpass3": JOBPASS3_QUESTIONS } : {}),
  ...(isExamPublished("zensho-financial-statement-analysis") ? { "zensho-financial-statement-analysis": ZENSHO_FINANCIAL_STATEMENT_QUESTIONS } : {}),
  ...(isExamPublished("jken-system") ? { "jken-system": JKEN_SYSTEM_QUESTIONS } : {}),
  ...(isExamPublished("jobpass") ? { jobpass: JOBPASS_QUESTIONS } : {}),
  ...(isExamPublished("shinrishi") ? { shinrishi: SHINRISHI_QUESTIONS } : {}),
  ...(isExamPublished("khk-reito-3") ? { "khk-reito-3": KHK_REITO_3_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("khk-reito-2") ? { "khk-reito-2": KHK_REITO_2_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("khk-reito-1") ? { "khk-reito-1": KHK_REITO_1_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("sekou-kenchiku2") ? { "sekou-kenchiku2": SEKOU_KENCHIKU2_QUESTIONS } : {}),
  ...(isExamPublished("denki2") ? { denki2: DENKI2_QUESTIONS } : {}),
  ...(isExamPublished("kankoji1") ? { kankoji1: KANKOJI1_QUESTIONS } : {}),
  ...(isExamPublished("yamaguchi-chori") ? { "yamaguchi-chori": YAMAGUCHI_CHORI_QUESTIONS } : {}),
  ...(isExamPublished("yamaguchi-seika") ? { "yamaguchi-seika": YAMAGUCHI_SEIKA_QUESTIONS } : {}),
  ...(isExamPublished("yamaguchi-fugu") ? { "yamaguchi-fugu": YAMAGUCHI_FUGU_QUESTIONS } : {}),
  ...(isExamPublished("keiryoshi") ? { "keiryoshi": getKeiryoshiCandidates("keiryoshi") } : {}),
  ...(isExamPublished("keiryoshi-nodo") ? { "keiryoshi-nodo": getKeiryoshiCandidates("keiryoshi-nodo") } : {}),
  ...(isExamPublished("keiryoshi-soon") ? { "keiryoshi-soon": getKeiryoshiCandidates("keiryoshi-soon") } : {}),
  ...(isExamPublished("kenki2") ? { kenki2: KENKI2_QUESTIONS } : {}),
  ...(isExamPublished("kenki1") ? { kenki1: KENKI1_QUESTIONS } : {}),
  ...(isExamPublished("gyosei") ? { gyosei: GYOSEI_QUESTIONS } : {}),
  ...(isExamPublished("shihoshoshi") ? { shihoshoshi: SHIHOSHOSHI_BATCH1_QUESTIONS } : {}),
  ...(isExamPublished("career-consultant") ? { "career-consultant": CAREER_CONSULTANT_QUESTIONS } : {}),
  ...(isExamPublished("kanri-eiyoshi") ? { "kanri-eiyoshi": KANRI_EIYOSHI_QUESTIONS } : {}),
  ...(isExamPublished("sogo-ryoko") ? { "sogo-ryoko": SOGO_RYOKO_QUESTIONS } : {}),
  ...(isExamPublished("shiho-tanto") ? { "shiho-tanto": SHIHO_TANTO_QUESTIONS } : {}),
  ...(isExamPublished("yobi-tanto") ? { "yobi-tanto": YOBI_TANTO_QUESTIONS } : {}),
  ...(isExamPublished("sokuryoshiho") ? { "sokuryoshiho": SOKURYOSHIHO_QUESTIONS } : {}),
  ...(isExamPublished("caremanager") ? { "caremanager": CAREMANAGER_QUESTIONS } : {}),
  ...(isExamPublished("tekko2") ? { "tekko2": TEKKO2_QUESTIONS } : {}),
  ...(isExamPublished("denshi-kiki-kumitate2") ? { "denshi-kiki-kumitate2": DENSHI_KIKI_KUMITATE2_QUESTIONS } : {}),
  ...(isExamPublished("kenchiku-bankin-duct2") ? { "kenchiku-bankin-duct2": KENCHIKU_BANKIN_DUCT2_QUESTIONS } : {}),
  ...(isExamPublished("kinzoku-netsushori2") ? { "kinzoku-netsushori2": KINZOKU_NETSUSHORI2_QUESTIONS } : {}),
  ...(isExamPublished("sasshi2") ? { "sasshi2": SASSHI2_QUESTIONS } : {}),
  ...(isExamPublished("chikuro2") ? { "chikuro2": CHIKURO2_QUESTIONS } : {}),
  ...(isExamPublished("futsu-senban3") ? { "futsu-senban3": FUTSU_SENBAN3_QUESTIONS } : {}),
  ...(isExamPublished("shashutsu3") ? { "shashutsu3": SHASHUTSU3_QUESTIONS } : {}),
  ...(isExamPublished("kogyo-hoso1") ? { "kogyo-hoso1": KOGYO_HOSO1_QUESTIONS } : {}),
  ...(isExamPublished("haiden-seigyo1") ? { "haiden-seigyo1": HAIDEN_SEIGYO1_QUESTIONS } : {}),
  ...(isExamPublished("kaiten-denki2") ? { "kaiten-denki2": KAITEN_DENKI2_QUESTIONS } : {}),
  ...(isExamPublished("kaiten-denki1") ? { "kaiten-denki1": KAITEN_DENKI1_QUESTIONS } : {}),
  ...(isExamPublished("haiden-seigyo3") ? { "haiden-seigyo3": HAIDEN_SEIGYO3_QUESTIONS } : {}),
  ...(isExamPublished("kenchiku-bankin2") ? { "kenchiku-bankin2": KENCHIKU_BANKIN2_QUESTIONS } : {}),
  ...(isExamPublished("kensetsu-kikai-seibi1") ? { "kensetsu-kikai-seibi1": KENSETSU_KIKAI_SEIBI1_QUESTIONS } : {}),
  ...(isExamPublished("bousui-urethane2") ? { "bousui-urethane2": BOUSUI_URETHANE2_QUESTIONS } : {}),
  ...(isExamPublished("plant-haikan-seizu1") ? { "plant-haikan-seizu1": PLANT_HAIKAN_SEIZU1_QUESTIONS } : {}),
  ...(isExamPublished("kikai-seizu3") ? { "kikai-seizu3": KIKAI_SEIZU3_QUESTIONS } : {}),
  ...(isExamPublished("kikai-seizu2") ? { "kikai-seizu2": KIKAI_SEIZU2_QUESTIONS } : {}),
  ...(isExamPublished("kikai-seizu-cad2") ? { "kikai-seizu-cad2": KIKAI_SEIZU_CAD2_QUESTIONS } : {}),
  ...(isExamPublished("naiso-carpet2") ? { "naiso-carpet2": NAISO_CARPET2_QUESTIONS } : {}),
  ...(isExamPublished("naiso-plastic1") ? { "naiso-plastic1": NAISO_PLASTIC1_QUESTIONS } : {}),
  ...(isExamPublished("naiso-plastic2") ? { "naiso-plastic2": NAISO_PLASTIC2_QUESTIONS } : {}),
  ...(isExamPublished("naiso-kosei2") ? { "naiso-kosei2": NAISO_KOSEI2_QUESTIONS } : {}),
  ...(isExamPublished("plant-haikan2") ? { "plant-haikan2": PLANT_HAIKAN2_QUESTIONS } : {}),
  ...(isExamPublished("plant-haikan1") ? { "plant-haikan1": PLANT_HAIKAN1_QUESTIONS } : {}),
  ...(isExamPublished("flower2") ? { "flower2": FLOWER2_QUESTIONS } : {}),
  ...(isExamPublished("kensetsu-kikai-seibi2") ? { "kensetsu-kikai-seibi2": KENSETSU_KIKAI_SEIBI2_QUESTIONS } : {}),
  ...(isExamPublished("hyoso1") ? { "hyoso1": HYOSO1_QUESTIONS } : {}),
  ...(isExamPublished("tairu2") ? { "tairu2": TAIRU2_QUESTIONS } : {}),
  ...(isExamPublished("sekizai1") ? { "sekizai1": SEKIZAI1_QUESTIONS } : {}),
  ...(isExamPublished("hyoso2") ? { "hyoso2": HYOSO2_QUESTIONS } : {}),
  ...(isExamPublished("shohin-soshoku3") ? { "shohin-soshoku3": SHOHIN_SOSHOKU3_QUESTIONS } : {}),
  ...(isExamPublished("shashin1") ? { "shashin1": SHASHIN1_QUESTIONS } : {}),
  ...(isExamPublished("sessaku-kensaku1") ? { "sessaku-kensaku1": SESSAKU_KENSAKU1_QUESTIONS } : {}),
  ...(isExamPublished("tatami1") ? { "tatami1": TATAMI1_QUESTIONS } : {}),
  ...(isExamPublished("funmatsu-yakin1") ? { "funmatsu-yakin1": FUNMATSU_YAKIN1_QUESTIONS } : {}),
  ...(isExamPublished("nunohaku1") ? { "nunohaku1": NUNOHAKU1_QUESTIONS } : {}),
  ...(isExamPublished("kikinzoku-soshin1") ? { "kikinzoku-soshin1": KIKINZOKU_SOSHIN1_QUESTIONS } : {}),
  ...(isExamPublished("shashin3") ? { "shashin3": SHASHIN3_QUESTIONS } : {}),
  ...(isExamPublished("kikinzoku-soshin3") ? { "kikinzoku-soshin3": KIKINZOKU_SOSHIN3_QUESTIONS } : {}),
  ...(isExamPublished("kikinzoku-soshin2") ? { "kikinzoku-soshin2": KIKINZOKU_SOSHIN2_QUESTIONS } : {}),
  ...(isExamPublished("tobi1") ? { "tobi1": TOBI1_QUESTIONS } : {}),
  ...(isExamPublished("tobi3") ? { "tobi3": TOBI3_QUESTIONS } : {}),
  ...(isExamPublished("kenchiku-daiku1") ? { "kenchiku-daiku1": KENCHIKU_DAIKU1_QUESTIONS } : {}),
  ...(isExamPublished("kenchiku-daiku3") ? { "kenchiku-daiku3": KENCHIKU_DAIKU3_QUESTIONS } : {}),
  ...(isExamPublished("kenchiku-daiku2") ? { "kenchiku-daiku2": KENCHIKU_DAIKU2_QUESTIONS } : {}),
  ...(isExamPublished("shashin2") ? { "shashin2": SHASHIN2_QUESTIONS } : {}),
  ...(isExamPublished("kikai-hozen1") ? { "kikai-hozen1": KIKAI_HOZEN1_QUESTIONS } : {}),
  ...(isExamPublished("diecast2") ? { "diecast2": DIECAST2_QUESTIONS } : {}),
  ...(isExamPublished("tetsudo-sharyo2") ? { "tetsudo-sharyo2": TETSUDO_SHARYO2_QUESTIONS } : {}),
  ...(isExamPublished("kikai-hozen") ? { "kikai-hozen": KIKAI_HOZEN_QUESTIONS } : {}),
  ...(isExamPublished("tobi2") ? { "tobi2": TOBI2_QUESTIONS } : {}),
  ...(isExamPublished("tsukanshi") ? { "tsukanshi": TSUKANSHI_QUESTIONS } : {}),
  ...(isExamPublished("zenkou-keisan-gijutsu") ? { "zenkou-keisan-gijutsu": ZENKOU_KEISAN_GIJUTSU_QUESTIONS } : {}),
  ...(isExamPublished("katei-shokumotsu") ? { "katei-shokumotsu": KATEI_SHOKUMOTSU_QUESTIONS } : {}),
  ...(isExamPublished("katei-hifuku") ? { "katei-hifuku": KATEI_HIFUKU_QUESTIONS } : {}),
  ...(isExamPublished("zenkou-joho") ? { "zenkou-joho": ZENKOU_JOHO_QUESTIONS } : {}),
  ...(isExamPublished("katei-hoiku") ? { "katei-hoiku": KATEI_HOIKU_QUESTIONS } : {}),
  ...(isExamPublished("katei-shoku-chori") ? { "katei-shoku-chori": KATEI_SHOKU_CHORI_QUESTIONS } : {}),
  ...(isExamPublished("mental-health-management") ? { "mental-health-management": MENTAL_HEALTH_MANAGEMENT_QUESTIONS } : {}),
  ...(isExamPublished("building-cleaning-ssw1") ? { "building-cleaning-ssw1": BUILDING_CLEANING_SSW1_QUESTIONS } : {}),
  ...(isExamPublished("saibansho-ippan-dai") ? { "saibansho-ippan-dai": COURT_STAFF_QUESTIONS } : {}),
  ...(isExamPublished("kyoin-tokyo") ? { "kyoin-tokyo": KYOIN_TOKYO_QUESTIONS } : {}),
  ...(isExamPublished("kyoin-osaka") ? { "kyoin-osaka": KYOIN_OSAKA_QUESTIONS } : {}),
  ...(isExamPublished("cg-creator-basic") ? { "cg-creator-basic": CG_CREATOR_BASIC_QUESTIONS } : {}),
  ...(isExamPublished("cg-creator-expert") ? { "cg-creator-expert": CG_CREATOR_EXPERT_QUESTIONS } : {}),
  ...(isExamPublished("cg-engineer-basic") ? { "cg-engineer-basic": CG_ENGINEER_BASIC_QUESTIONS } : {}),
  ...(isExamPublished("cg-engineer-expert") ? { "cg-engineer-expert": CG_ENGINEER_EXPERT_QUESTIONS } : {}),
  ...(isExamPublished("multimedia-kentei-basic") ? { "multimedia-kentei-basic": MULTIMEDIA_KENTEI_BASIC_QUESTIONS } : {}),
  ...(isExamPublished("multimedia-kentei-expert") ? { "multimedia-kentei-expert": MULTIMEDIA_KENTEI_EXPERT_QUESTIONS } : {}),
  ...(isExamPublished("g-kentei") ? { "g-kentei": G_KENTEI_QUESTIONS } : {}),
  ...(isExamPublished("kyoto-kentei3") ? { "kyoto-kentei3": KYOTO_KENTEI3_QUESTIONS } : {}),
  ...(isExamPublished("topik1") ? { "topik1": TOPIK1_QUESTIONS } : {}),
  ...(isExamPublished("apef4") ? { "apef4": APEF4_QUESTIONS } : {}),
  ...(isExamPublished("chuken3") ? { "chuken3": CHUKEN3_QUESTIONS } : {}),
  ...(isExamPublished("biz-career-logistics3") ? { "biz-career-logistics3": BIZ_CAREER_LOGISTICS3_QUESTIONS } : {}),
  ...(isExamPublished("khk-hanbai2") ? { "khk-hanbai2": KHK_HANBAI2_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("kikenbutsu-otsu5") ? { "kikenbutsu-otsu5": KIKENBUTSU_OTSU5_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("kikenbutsu-otsu3") ? { "kikenbutsu-otsu3": KIKENBUTSU_OTSU3_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("khk-hanbai") ? { "khk-hanbai": KHK_HANBAI_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("shobo-setsubishi-otsu4") ? { "shobo-setsubishi-otsu4": SHOBO_SETSUBISHI_OTSU4_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("shobo-setsubishi-otsu7") ? { "shobo-setsubishi-otsu7": SHOBO_SETSUBISHI_OTSU7_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("shobo-setsubishi-kou3") ? { "shobo-setsubishi-kou3": SHOBO_SETSUBISHI_KOU3_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("shobo-setsubishi-kou2") ? { "shobo-setsubishi-kou2": SHOBO_SETSUBISHI_KOU2_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("shobo-setsubishi-kou5") ? { "shobo-setsubishi-kou5": SHOBO_SETSUBISHI_KOU5_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
  ...(isExamPublished("gesuido-3shu") ? { "gesuido-3shu": GESUIDO_3SHU_QUESTIONS.filter(isPracticeReadyQuestion) } : {}),
};

for (const exam of Object.keys(QUESTIONS_BY_EXAM) as ExamCode[]) {
  const questions = QUESTIONS_BY_EXAM[exam];
  if (!questions) continue;
  const additional = loadAdditionalPapers(exam);
  QUESTIONS_BY_EXAM[exam] = publishedQuestions(additional ? appendReplenishedQuestions(questions, [additional]) : questions);
}

// Compatibility lookups do not add a second copy to the enumerable registry.

for (const [alias, canonical] of Object.entries(EXAM_CODE_ALIASES)) {

  Object.defineProperty(QUESTIONS_BY_EXAM, alias, {

    enumerable: false,

    get: () => QUESTIONS_BY_EXAM[canonical],

  });

}

export const ALL_QUESTIONS: Question[] = (

  Object.values(QUESTIONS_BY_EXAM) as Question[][]

).flat();
