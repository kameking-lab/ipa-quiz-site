import "server-only";
import { cache } from "react";
import { KEYWORD_PAGES } from "@/data/keywords";
import { GLOSSARY } from "@/data/glossary";
import { getAllBlogPosts } from "@/data/blog";
import { canonicalBlogSlug } from "@/lib/blog/article-aliases";
import { getAllQuestions } from "@/lib/questions/load";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { questionPagePath } from "@/lib/seo/question-url";
import { getQuestionCanonicalRepresentative } from "@/lib/seo/question-canonical";
import { createPublicRelationResources } from "./catalog.mjs";
import { selectCuratedRelations, type CuratedEdge } from "./curated.mjs";
import type { RelationResource } from "./model.mjs";
import authored from "./curated-data.json";

const edges = authored as readonly CuratedEdge[];
const questionIds = new Set(edges.flatMap(edge => [edge.source, edge.target])
  .filter(resource => resource.kind === "question").map(resource => resource.id));
const origins = new Set(edges.map(edge => JSON.stringify([edge.source.kind, edge.source.id])));

// Use current application admission and URL rules. The author fixture is never imported.
const resources = cache(() => {
  const all = getAllQuestions();
  return createPublicRelationResources({
    keywords: KEYWORD_PAGES, glossary: GLOSSARY, posts: getAllBlogPosts(),
    questions: all.filter(question => questionIds.has(question.id)),
    canLinkQuestion: isPracticeReadyQuestion,
    questionHref: questionPagePath,
    canonicalQuestion: (_subset, question) => getQuestionCanonicalRepresentative(all, question),
    canonicalBlogSlug,
  }).resources;
});

export function currentLearningRelations(origin: Pick<RelationResource, "kind" | "id">, placement?: string) {
  if (!origins.has(JSON.stringify([origin.kind, origin.id]))) return null;
  return selectCuratedRelations(resources(), edges, origin, placement);
}
