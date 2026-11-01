export interface RelationResource {
  kind: 'keyword' | 'blog' | 'question' | 'glossary'; id: string; title: string;
  /** Actual host catalog URL; no inferred /question/<id> template. */
  href: string; bodyText: string; visibility: 'public' | 'private' | 'disabled'; preferredResourceKeys?: readonly string[];
}
export interface RelationConcept { id: string; label: string; aliases: readonly string[]; requiredAny?: readonly string[] }
export interface RelationWitness { alias: string; normalizedExcerpt: string }
export interface RelationGraph { schema: 'term-relations/v1'; memberships: Array<{
  resourceKey: string; conceptId: string; label: string; href: string; primary: boolean; witness: RelationWitness; contextWitness?: RelationWitness;
}> }
export interface RelationItem {
  kind: RelationResource['kind']; id: string; title: string; href: string; concepts: string[];
  evidence: Array<{conceptId: string; source: RelationWitness; target: RelationWitness}>;
  reason: string;
}
export interface RelationResult { status: 'missing-source' | 'no-related' | 'ready'; items: RelationItem[] }
export const RELATION_SCHEMA: 'term-relations/v1';
export function safeLocalHref(value: unknown): boolean;
export function createRelationGraph(resources: readonly RelationResource[], concepts: readonly RelationConcept[]): RelationGraph;
export function selectTermRelations(graph: RelationGraph, resources: readonly RelationResource[], origin: Pick<RelationResource,'kind'|'id'>, limit?: number): RelationResult;
