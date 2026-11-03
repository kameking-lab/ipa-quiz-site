import { AuthorizedContent } from "../../shared/AuthorizedContent";
import { AccountDeletionClient } from "../../../app/account/delete/AccountDeletionClient";
import { requestAiConsent } from "../../../lib/ai/consent";
import {createRoot} from "react-dom/client";
import {downloads} from "../../src/downloads";
import {NativeTools} from "../../src/NativeTools";
import config from "../../config/public.json";
import {PACKAGE_TYPE,type PurchasesPackage} from "@revenuecat/purchases-capacitor";
import {Membership} from "../../src/purchases";
import type {CatalogEntry,MobileEntitlement} from "../../shared/contracts";
import {QualificationActions} from "../../src/QualificationActions";
import {confirmedSchedules,qualificationTargets} from "../../shared/qualification-schedules";
import {addQualificationEvent,openQualificationUrl} from "../../src/qualification-platform";
import "../../src/native.css";
type StoreScenario="cancelled"|"pending"|"changed-price"|"no-restorable-purchase";
declare global { interface Window {mobileTest:{showContent:()=>void;showDeletion:()=>void;aiConsent:()=>boolean;seed:(questions:Array<{id:string}>,entry:CatalogEntry,access:MobileEntitlement)=>Promise<void>;invalidate:()=>Promise<void>;showMembership:()=>void;mockStore:(scenario:StoreScenario)=>void;storeCalls:()=>{purchases:number;restores:number};showQualification:(scenario:"saved"|"cancelled"|"unconfirmed"|"app-installed")=>void;qualificationCalls:()=>{universal:string[];browser:string[];editors:number;fetches:number}}} }
const calls={purchases:0,restores:0};
let storeScenario:StoreScenario="no-restorable-purchase",offerings=0;
function mockStore(scenario:StoreScenario) {
  storeScenario=scenario;offerings=0;
}
// Inject a mock at the SDK adapter boundary; the Capacitor proxy deliberately
// ignores property overrides, so mutating Purchases itself is not a mock.
const sdk={
    isConfigured:async()=>({isConfigured:false}),isAnonymous:async()=>({isAnonymous:false}),configure:async()=>{},logIn:async()=>{},logOut:async()=>{},
    getOfferings:async()=>{
      offerings++;
      const price=storeScenario==="changed-price"&&offerings>1?1200:980;
      const item={identifier:"monthly",packageType:PACKAGE_TYPE.MONTHLY,product:{identifier:"mock.monthly",price,priceString:`¥${price}`,currencyCode:"JPY",subscriptionPeriod:"P1M"}} as PurchasesPackage;
      return {all:{main:{availablePackages:[item]}}};
    },
    purchasePackage:async()=>{calls.purchases++;throw {code:storeScenario==="pending"?"20":"1"};},
    restorePurchases:async()=>{calls.restores++;return {};},
};
const membership=new Membership(sdk as unknown as ConstructorParameters<typeof Membership>[0]);
const qualificationCalls={universal:[] as string[],browser:[] as string[],editors:0,fetches:0};
function showQualification(scenario:"saved"|"cancelled"|"unconfirmed"|"app-installed") {
  const target=qualificationTargets("kaigo")[0];
  const request=async()=>{
    qualificationCalls.fetches++;
    return confirmedSchedules({items:[{id:target.id,publicationStatus:"active",scheduleClock:{schedules:[{id:"mock-session",qualificationId:target.id,sessionLabel:"2099年",status:"published",cadence:"fixed",timezone:"Asia/Tokyo",estimatedEventTypes:scenario==="unconfirmed"?["exam","application_deadline"]:[],officialUrl:"https://source.example/exam",sourceVerifiedAt:"2026-11-03",sourceValidUntil:"2099-01-01",examStartAt:"2099-01-31",applicationDeadlineAt:"2098-12-01"}]}}]},target);
  };
  const native={openUniversalLink:async({url}:{url:string})=>{qualificationCalls.universal.push(url);return {opened:scenario==="app-installed"};},presentCalendar:async()=>{qualificationCalls.editors++;return {saved:scenario==="saved"};}};
  const browser={open:async({url}:{url:string})=>{qualificationCalls.browser.push(url);}} as unknown as Parameters<typeof openQualificationUrl>[2];
  createRoot(document.getElementById("root")!).render(<QualificationActions target={target} service={{fetch:request,add:(event,t)=>addQualificationEvent(event,t,request,native),open:url=>openQualificationUrl(url,native,browser),source:async url=>{qualificationCalls.browser.push(url);}}}/>);
}
window.mobileTest={showContent:()=>createRoot(document.getElementById("root")!).render(<AuthorizedContent items={Array.from({length:11},(_,i)=>({id:`mock-${i+1}`,title:`??${i+1}`}))}/>),showDeletion:()=>createRoot(document.getElementById("root")!).render(<AccountDeletionClient/>),aiConsent:requestAiConsent,async seed(questions,entry,access){await downloads.updateRights(access,config.leasePublicKey);await downloads.download(entry.code,async()=>Response.json({entry,questions,nextOffset:null,entitlement:access}),()=>{},new AbortController().signal);},invalidate:()=>downloads.invalidate(),showMembership:()=>createRoot(document.getElementById("root")!).render(<NativeTools membershipOnly membership={membership}/>),mockStore,storeCalls:()=>({...calls}),showQualification,qualificationCalls:()=>({...qualificationCalls})};
