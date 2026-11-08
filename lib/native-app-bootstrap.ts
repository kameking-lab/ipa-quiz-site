/**
 * Runs in <head> before the first paint. In the iOS app, Capacitor's bridge is
 * injected at document start, so `window.Capacitor` already exists here.
 * Marking <html> now (instead of in NativeAppHost's effect after hydration)
 * applies the status-bar padding and the reserved native-bar slot up front, so
 * the page no longer jumps ~170px down a moment after it appears — which used
 * to turn a quick tap on a choice into a tap on whatever slid under the finger.
 */
export const NATIVE_APP_BOOTSTRAP_SCRIPT =
  '(function(){try{var c=window.Capacitor;if(c&&typeof c.isNativePlatform==="function"&&c.isNativePlatform())document.documentElement.classList.add("native-app");}catch(e){}})();';
