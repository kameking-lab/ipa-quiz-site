export interface SearchableTerm { term:string; reading:string; english?:string }
export interface SearchableGroup<T extends SearchableTerm> { id:string;label:string;terms:T[] }
export function filterGlossaryGroups<T extends SearchableTerm>(groups:SearchableGroup<T>[],query:string):SearchableGroup<T>[];
