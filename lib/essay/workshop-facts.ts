const clauseBreak = /[。！？；;\n]|[、,]\s*(?=ただし|一方|しかし|[^、。]{1,12}(?:が|は)[^、。]*(?:承認|決裁|了承|承諾|認め))/u;

const roles = [
  /スポンサー|事業責任者/u,
  /経理|財務/u,
  /物流|倉庫/u,
  /受注/u,
  /委託先|委託会社|外部ベンダー/u,
  /監査部門|監査担当/u,
  /法務/u,
  /調達部門|購買部門/u,
  /経営層|役員|取締役/u,
];
const costActions = [
  /(?:対象)?範囲.{0,3}(?:変更|見直|縮小)|(?:今回の)?対象外/u,
  /予算.{0,3}(?:追加|増額)|増額.{0,3}予算/u,
  /専用.{0,6}画面|分析用?画面|照合結果画面|(?:分析|照合).{0,6}画面/u,
  /削減|減額|費用.{0,5}(?:抑|削|減)/u,
];
const approval = /承認|決裁|了承|承諾|認め/u;
const authorized = /(?:承認|決裁|了承|承諾)(?:済み?|した|された|が下りた|を(?:得た|受けた|もらった))|認め(?:た|られた|てもらった)/u;
const unconfirmedApproval = /未(?:承認|決裁|了承|承諾)|(?:承認|決裁|了承|承諾)(?:前|待ち|予定|依頼中|申請中|(?:を|は|が)?(?:なし|ない|せず|しな|されていな|を得ていな|得[られ]*な|得ず|見送|保留|未確認))|認め(?:ない|られな|ていない)|(?:承認|決裁|了承|承諾).{0,10}(?:かは不明|かは未確認|か分から|の有無は不明|事実はな|わけではな)/u;
const proposedApproval = /(?:承認|決裁|了承|承諾)(?:され(?:た|れば)|した|を得た)(?:後|場合|なら)|(?:承認|決裁|了承|承諾).{0,12}(?:予定|つもり|見込|申請|とすれば|と仮定)/u;

function approvals(text: string, shortAnswer = false) {
  return text.split(clauseBreak).flatMap((clause) => {
    const confirmed = authorized.test(clause) || (shortAnswer && /(?:承認|決裁|了承|承諾)\s*$/u.test(clause));
    if (!confirmed || unconfirmedApproval.test(clause) || proposedApproval.test(clause)) return [];
    const verb = clause.search(approval);
    const before = clause.slice(0, verb);
    const receiver = /^(?:承認|決裁|了承|承諾)(?:を(?:得|受け|もら)|され)/u.test(clause.slice(verb));
    const direct = /(?:^|[、,を]|について)([^、,\sがはを]{1,24})(?:が|は)/u;
    const indirect = /(?:^|[、,をは])([^、,\sがはを]{1,24}?)(?:から|に|の$)/u;
    const actor = receiver
      ? before.split("について").at(-1)?.match(indirect)?.[1]
      : before.match(direct)?.[1];
    const actions = costActions.filter((pattern) => pattern.test(clause));
    return [{ actor: actor && !costActions.some((pattern) => pattern.test(actor))
      ? roles.find((pattern) => pattern.test(actor)) ?? actor : undefined, actions }];
  });
}

export function hasConfirmedCostApproval(answer: string) {
  return approvals(answer, true).some(({ actor, actions }) => actor && actions.length > 0);
}

export function isGroundedCostApproval(text: string, answers: readonly string[]) {
  const claims = approvals(text).filter(({ actions }) => actions.length > 0);
  const sources = answers.flatMap((answer) => approvals(answer, true));
  return claims.length > 0 && claims.every(({ actor, actions }) => actor &&
    sources.some((source) => actor === source.actor &&
      actions.every((action) => source.actions.includes(action))));
}

export function hasUnsupportedCostApproval(body: string, answers: readonly string[]) {
  return body.split(clauseBreak).some((part) =>
    approval.test(part) && costActions.some((pattern) => pattern.test(part)) &&
    approvals(part).length > 0 && !isGroundedCostApproval(part, answers));
}

export function hasUnsupportedWorkshopActor(body: string, answers: readonly string[]) {
  return roles.some((pattern) => pattern.test(body) && !answers.some((answer) => pattern.test(answer)));
}
