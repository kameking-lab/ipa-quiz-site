import { safeLocalHref } from './model.mjs';
const key = value => JSON.stringify([value.kind,value.id]);
const normalized = text => text.normalize('NFKC').replace(/\s+/gu,'').toLowerCase();
/** Only authored explicit edges can render. Lexical discovery output is never a fallback. */
export function selectCuratedRelations(resources, edges, origin, placement) {
  const map = new Map();
  for (const resource of resources) {
    if (resource.visibility !== 'public' || !safeLocalHref(resource.href)) continue;
    const identity=key(resource);if(map.has(identity))throw Error('A5 duplicate current identity');map.set(identity,resource);
  }
  const source=map.get(key(origin));
  if(!source)return {status:'missing-source',groups:[],omitted:[]};
  const groups=new Map(),seen=new Set(),omitted=[];
  const allowed=new Set(['same-concept','prerequisite','next-step','contrast']);
  for(const edge of edges){
    if(key(edge.source)!==key(origin)||(placement&&edge.placement!==placement))continue;
    const target=map.get(key(edge.target));
    if(!target){omitted.push({id:edge.id,reason:'target-not-admitted-or-missing'});continue;}
    if(key(edge.target)===key(origin)||target.href===source.href||!allowed.has(edge.relation)
      ||!edge.reason||!edge.prerequisite||!edge.sourceEvidence||!edge.targetEvidence
      ||target.href!==edge.expectedTargetHref
      ||!normalized(source.bodyText).includes(normalized(edge.sourceEvidence))
      ||!normalized(target.bodyText).includes(normalized(edge.targetEvidence))){
      omitted.push({id:edge.id,reason:'explicit-evidence-or-target-changed'});continue;
    }
    const identity=JSON.stringify([edge.group,target.href]);if(seen.has(identity))continue;seen.add(identity);
    const group=groups.get(edge.group)??{id:edge.group,title:edge.groupTitle,order:edge.groupOrder,items:[]};
    group.items.push({id:edge.id,kind:target.kind,resourceId:target.id,href:target.href,
      title:edge.targetLabel,relation:edge.relation,reason:edge.reason,prerequisite:edge.prerequisite,
      order:edge.order,reusedAcrossSteps:edge.reusedAcrossSteps??false});groups.set(edge.group,group);
  }
  const result=[...groups.values()].sort((a,b)=>a.order-b.order).map(g=>({...g,items:g.items.sort((a,b)=>a.order-b.order)}));
  return {status:result.length?'ready':'no-related',groups:result,omitted};
}
