import type { RelationResource } from './model.mjs';
import type { KeywordPage } from '@/data/keywords';
import type { BlogPost } from '@/data/blog/types';
import type { Question } from '@/lib/questions/types';
import type { GlossaryTerm } from '@/data/glossary';
export function createPublicRelationResources(input: {
  keywords: readonly KeywordPage[]; posts: readonly BlogPost[]; questions: readonly Question[]; glossary?: readonly GlossaryTerm[];
  canLinkQuestion: (question: Question) => boolean;
  questionHref: (question: Question) => string;
  canonicalQuestion: (pool: readonly Question[], question: Question) => Question;
  canonicalBlogSlug: (slug: string) => string;
}): { resources: RelationResource[]; omitted: Array<{kind:string;id:string;reason:string}> };
