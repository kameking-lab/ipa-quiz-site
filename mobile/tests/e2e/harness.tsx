import {createRoot} from "react-dom/client";
import {downloads} from "../../src/downloads";
import {NativeTools} from "../../src/NativeTools";
import config from "../../config/public.json";
import {PACKAGE_TYPE,type PurchasesPackage} from "@revenuecat/purchases-capacitor";
import {Membership} from "../../src/purchases";
import type {CatalogEntry,MobileEntitlement} from "../../shared/contracts";
type StoreScenario="cancelled"|"pending"|"changed-price"|"no-restorable-purchase";
declare global { interface Window {mobileTest:{seed:(questions:Array<{id:string}>,entry:CatalogEntry,access:MobileEntitlement)=>Promise<void>;invalidate:()=>Promise<void>;showMembership:()=>void;mockStore:(scenario:StoreScenario)=>void;storeCalls:()=>{purchases:number;restores:number}}} }
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
window.mobileTest={async seed(questions,entry,access){await downloads.updateRights(access,config.leasePublicKey);await downloads.download(entry.code,async()=>Response.json({entry,questions,nextOffset:null,entitlement:access}),()=>{},new AbortController().signal);},invalidate:()=>downloads.invalidate(),showMembership:()=>createRoot(document.getElementById("root")!).render(<NativeTools membershipOnly membership={membership}/>),mockStore,storeCalls:()=>({...calls})};
