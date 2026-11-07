/**
 * A category containing one question repeats the individual question's discovery
 * path without offering a comparison or collection. Keep it usable in navigation,
 * but advertise the explained question and broader collections to Search instead.
 * This is our editorial choice, not a Google minimum question/word count.
 */
export function isIndexableCategoryCollection(questionCount: number): boolean {
  return questionCount > 1;
}
