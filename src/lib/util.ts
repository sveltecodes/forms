/**
 * Check if two values are deeply equal.
 * @param {any} a The first value.
 * @param {any} b The second value.
 * @returns {boolean} True if the values are deeply equal, false otherwise.
 */
export const deepEqual = (a: any, b: any): boolean => {
  // Check if both values are the same truthy/falsy value
  if (a == b) return true;

  // Check if both are objects (but not null)
  if (a && typeof a === 'object' && b && typeof b === 'object') {
    // Check if they have the same constructor (ensures comparing similar types)
    if (a.constructor !== b.constructor) return false;

    // Get all keys from both objects
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    // Check if they have the same number of keys
    if (keysA.length !== keysB.length) return false;

    // Recursively compare each property
    for (const key of keysA) {
      if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
    }

    return true;
  }

  // If they are not the same reference/primitive and not both objects, they are not equal
  return false;
}