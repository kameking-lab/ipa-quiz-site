/** Pure A5 relation model. No route generation, fetching, exam-score fallback or private-bank imports. */
export const RELATION_SCHEMA = 'term-relations/v1';
const kinds = new Set(['keyword', 'blog', 'question', 'glossary']);
const keyOf = resource => JSON.stringify([resource.kind, resource.id]);
const normalize = value => value.normalize('NFKC').toLowerCase();
const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export function safeLocalHref(value) {
  if (!(typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')
    && !/[\\\u0000-\u0020\u007f]/u.test(value) && !/%(?:00|0a|0d|5c)/iu.test(value)
    && !value.split(/[?#]/u)[0].split('/').some(part => part === '.' || part === '..'))) return false;
  try {
    const decoded = decodeURIComponent(value.split(/[?#]/u)[0]);
    return !decoded.startsWith('//') && !/[\\\u0000-\u0020\u007f]/u.test(decoded)
      && !decoded.split('/').some(part => part === '.' || part === '..');
  } catch { return false; }
}
function mention(text, aliases) {
  const normalized = normalize(text);
  for (const alias of aliases) {
    if (typeof alias !== 'string' || alias.length < 2) continue;
    const needle = normalize(alias);
    const pattern = /^[a-z0-9 -]+$/u.test(needle)
      ? new RegExp(`(^|[^a-z0-9])${escape(needle)}(?=$|[^a-z0-9])`, 'u') : null;
    const match = pattern ? pattern.exec(normalized) : null;
    const at = pattern ? (match ? match.index + match[1].length : -1) : normalized.indexOf(needle);
    if (at >= 0) return { alias, normalizedExcerpt: normalized.slice(Math.max(0, at - 30), Math.min(normalized.length, at + needle.length + 50)) };
  }
  return null;
}
function catalog(resources) {
  if (!Array.isArray(resources) || resources.length > 50000) throw new Error('A5 catalog size invalid');
  const result = new Map();
  for (const resource of resources) {
    if (!resource || !kinds.has(resource.kind) || typeof resource.id !== 'string' || !resource.id
      || typeof resource.title !== 'string' || !resource.title.trim() || typeof resource.bodyText !== 'string'
      || resource.bodyText.length > 200000 || resource.visibility !== 'public' || !safeLocalHref(resource.href)) continue;
    const key = keyOf(resource);
    if (result.has(key)) throw new Error('A5 duplicate resource identity');
    // Root-relative links must come from the host's actual URL catalog. Never derive a question route here.
    result.set(key, resource);
  }
  return result;
}
export function createRelationGraph(resources, concepts) {
  const current = catalog(resources);
  if (!Array.isArray(concepts) || concepts.length > 200) throw new Error('A5 concept set invalid');
  const seen = new Set();
  const memberships = [];
  for (const concept of concepts) {
    if (!concept || typeof concept.id !== 'string' || seen.has(concept.id) || !concept.label
      || !Array.isArray(concept.aliases) || !concept.aliases.length) throw new Error('A5 concept identity invalid');
    seen.add(concept.id);
    for (const [key, resource] of current) {
      // A shared exam or broad topic tag is deliberately insufficient. The body itself is the witness.
      const contextWitness = concept.requiredAny?.length ? mention(resource.bodyText, concept.requiredAny) : undefined;
      if (concept.requiredAny?.length && !contextWitness) continue;
      const witness = mention(resource.bodyText, concept.aliases);
      if (witness) memberships.push({ resourceKey: key, conceptId: concept.id, label: concept.label,
        href: resource.href, primary: Boolean(mention(resource.title, concept.aliases)), witness, ...(contextWitness ? { contextWitness } : {}) });
    }
  }
  return { schema: RELATION_SCHEMA, memberships };
}
export function selectTermRelations(graph, resources, origin, limit = 4) {
  const current = catalog(resources);
  const originKey = keyOf(origin ?? {});
  const source = current.get(originKey);
  if (!source) return { status: 'missing-source', items: [] };
  if (!graph || graph.schema !== RELATION_SCHEMA || !Array.isArray(graph.memberships)) return { status: 'no-related', items: [] };
  const requested = Number.isInteger(limit) ? Math.max(0, Math.min(8, limit)) : 4;
  if (!requested) return { status: 'no-related', items: [] };
  // Both witnesses and the exact host-catalog href must still resolve in current data.
  const valid = graph.memberships.filter(entry => {
    const resource = current.get(entry.resourceKey);
    return resource && resource.href === entry.href && typeof entry.witness?.normalizedExcerpt === 'string'
      && normalize(resource.bodyText).includes(entry.witness.normalizedExcerpt)
      && (!entry.contextWitness || normalize(resource.bodyText).includes(entry.contextWitness.normalizedExcerpt));
  });
  const sourceConcepts = new Map(valid.filter(entry => entry.resourceKey === originKey).map(entry => [entry.conceptId, entry]));
  const candidates = new Map();
  for (const entry of valid) {
    const proof = sourceConcepts.get(entry.conceptId);
    if (!proof || entry.resourceKey === originKey) continue;
    const target = current.get(entry.resourceKey);
    const candidate = candidates.get(entry.resourceKey) ?? { kind: target.kind, id: target.id,
      title: target.title, href: target.href, concepts: [], evidence: [], primaryConcepts: 0,
      explicit: source.preferredResourceKeys?.includes(entry.resourceKey) ? 1 : 0 };
    if (!candidate.concepts.includes(entry.label)) {
      candidate.concepts.push(entry.label);
      if (entry.primary) candidate.primaryConcepts++;
      candidate.evidence.push({ conceptId: entry.conceptId, source: proof.witness, target: entry.witness });
    }
    candidates.set(entry.resourceKey, candidate);
  }
  const usedHrefs = new Set();
  const sorted = [...candidates.entries()].sort((a, b) => b[1].explicit - a[1].explicit
    || b[1].primaryConcepts - a[1].primaryConcepts || b[1].concepts.length - a[1].concepts.length
    || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)).map(([, candidate]) => candidate)
    .filter(candidate => {
      if (candidate.href === source.href || usedHrefs.has(candidate.href)) return false;
      usedHrefs.add(candidate.href); return true;
    });
  const reading = sorted.filter(candidate => candidate.kind !== 'question');
  const questions = sorted.filter(candidate => candidate.kind === 'question');
  const selected = [...reading.slice(0, Math.ceil(requested / 2)), ...questions.slice(0, Math.floor(requested / 2))];
  const picked = new Set(selected.map(candidate => candidate.href));
  for (const candidate of sorted) {
    if (selected.length >= requested) break;
    if (!picked.has(candidate.href)) { selected.push(candidate); picked.add(candidate.href); }
  }
  const items = selected.map(candidate => ({ ...candidate,
      reason: `本文で共通して扱う論点：${candidate.concepts.join('・')}` }));
  return { status: items.length ? 'ready' : 'no-related', items };
}
