import type { RelationResource } from './model.mjs';
export interface CuratedEdge {
 id:string;source:Pick<RelationResource,'kind'|'id'>;target:Pick<RelationResource,'kind'|'id'>;
 relation:'same-concept'|'prerequisite'|'next-step'|'contrast';placement:string;
 group:string;groupTitle:string;groupOrder:number;order:number;targetLabel:string;
 reason:string;prerequisite:string;sourceEvidence:string;targetEvidence:string;expectedTargetHref:string;reusedAcrossSteps?:boolean;
}
export interface CuratedResult {status:'ready'|'missing-source'|'no-related';groups:Array<{
 id:string;title:string;order:number;items:Array<{id:string;kind:RelationResource['kind'];resourceId:string;href:string;title:string;
 relation:CuratedEdge['relation'];reason:string;prerequisite:string;order:number;reusedAcrossSteps:boolean}>}>;
 omitted:Array<{id:string;reason:string}>}
export function selectCuratedRelations(resources:readonly RelationResource[],edges:readonly CuratedEdge[],origin:Pick<RelationResource,'kind'|'id'>,placement?:string):CuratedResult;
