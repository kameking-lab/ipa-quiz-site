const normalize = value => value.normalize('NFKC').toLocaleLowerCase('ja').replace(/[ァ-ヶ]/gu, c => String.fromCharCode(c.charCodeAt(0)-0x60));
export function filterGlossaryGroups(groups, query) {
 const tokens=normalize(query).trim().split(/\s+/u).filter(Boolean);
 return groups.map(group=>({...group,terms:group.terms.filter(term=>{
  const text=normalize([term.term,term.reading,term.english??''].join(' '));
  return tokens.every(token=>text.includes(token));
 })})).filter(group=>group.terms.length>0);
}
