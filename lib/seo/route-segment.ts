/**
 * Decode a dynamic route segment without throwing.
 *
 * Routes that render on demand (dynamicParams=true) receive arbitrary input, so
 * a malformed escape such as `%zz` must become a 404, not a 500. Returns
 * undefined when the segment cannot be decoded.
 */
export function decodeRouteSegment(segment: string): string | undefined {
  try {
    return decodeURIComponent(segment);
  } catch {
    return undefined;
  }
}
