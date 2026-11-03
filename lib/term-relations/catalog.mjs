/** Host adapter, built only from the current host's actual catalogs and predicates. */
import { safeLocalHref } from './model.mjs';
const IPA = new Set(['ip','sg','fe','ap','sc','nw','db','es','st','sa','pm','sm','au']);
const slugSafe = value => typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(value);
export function createPublicRelationResources({ keywords, posts, questions, glossary = [], canLinkQuestion,
  questionHref, canonicalQuestion, canonicalBlogSlug }) {
  if (![keywords,posts,questions,glossary].every(Array.isArray)
    || ![canLinkQuestion,questionHref,canonicalQuestion,canonicalBlogSlug].every(f => typeof f === 'function')) {
    throw new Error('A5 actual catalog functions are required');
  }
  const resources = []; const ids = new Set(); const omitted = [];
  function add(resource) {
    const key = JSON.stringify([resource.kind,resource.id]);
    if (ids.has(key)) { omitted.push({kind:resource.kind,id:resource.id,reason:'duplicate-identity'}); return; }
    ids.add(key);resources.push(resource);
  }
  for (const term of glossary) {
    if (typeof term.term !== 'string' || typeof term.short !== 'string' || typeof term.detail !== 'string') continue;
    add({kind:'glossary',id:term.term,title:term.term,href:'/glossary#term-'+encodeURIComponent(term.term),
      bodyText:term.short+'\n'+term.detail,visibility:'public'});
  }
  for (const page of keywords) {
    if (!slugSafe(page.slug) || typeof page.title !== 'string' || !Array.isArray(page.body)
      || page.body.some(p => typeof p !== 'string')) continue;
    add({kind:'keyword',id:page.slug,title:page.title,href:`/keywords/${page.slug}`,
      bodyText:page.body.join('\n'),visibility:'public',
      preferredResourceKeys:page.relatedBlogSlug?[JSON.stringify(['blog',canonicalBlogSlug(page.relatedBlogSlug)])]:[]});
  }
  const postIds = new Set(posts.map(p=>p.slug));
  for (const post of posts) {
    const slug = canonicalBlogSlug(post.slug);
    if (!slugSafe(slug) || !postIds.has(slug) || typeof post.body !== 'string' || typeof post.title !== 'string') continue;
    if (slug !== post.slug) continue; // Existing canonical post owns its content and identity.
    add({kind:'blog',id:post.slug,title:post.title,href:`/blog/${slug}`,bodyText:post.body,visibility:'public',
      preferredResourceKeys:(post.relatedSlugs??[]).map(id=>JSON.stringify(['blog',canonicalBlogSlug(id)]))});
  }
  for (const question of questions) {
    if (!IPA.has(question.exam) || question.license !== 'IPA-public' || question.needsReview || !canLinkQuestion(question)) {
      omitted.push({kind:'question',id:question.id,reason:'outside-public-ready-IPA'});continue;
    }
    const canonical = canonicalQuestion(questions, question);
    if (!canonical || canonical.id !== question.id) { omitted.push({kind:'question',id:question.id,reason:'existing-canonical-duplicate'});continue; }
    const href = questionHref(question);
    if (!safeLocalHref(href)) { omitted.push({kind:'question',id:question.id,reason:'invalid-host-url'});continue; }
    add({kind:'question',id:question.id,
      title:`${question.exam.toUpperCase()} ${question.year} ${question.season} ${question.session} 問${question.qNumber}${question.part ?? ''}`,
      href,bodyText:[question.question,...Object.values(question.choices ?? {}),question.explanation].join('\n'),visibility:'public'});
  }
  return { resources, omitted };
}
