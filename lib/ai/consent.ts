"use client";
export const AI_CONSENT_KEY = "kakomon:ai-consent:20261103";
export const AI_CONSENT_NOTICE = "Google Geminiへ、入力した質問・会話履歴・答案・業種・問題と解答状況を送信し、解説・添削・採点を生成します。氏名、連絡先、勤務先の秘密などは入力しないでください。送信内容に個人情報が含まれる場合もGoogleへ送られます。プライバシーポリシーを確認のうえ、この送信を許可しますか？";
export function requestAiConsent(): boolean {
  if (typeof window === "undefined") return false;
  try { if (localStorage.getItem(AI_CONSENT_KEY) === "allowed") return true; } catch { /* Ask again if persistence is unavailable. */ }
  if (!window.confirm(AI_CONSENT_NOTICE)) return false;
  try { localStorage.setItem(AI_CONSENT_KEY, "allowed"); } catch { /* Consent applies to this send only. */ }
  return true;
}
export function revokeAiConsent() { localStorage.removeItem(AI_CONSENT_KEY); }
