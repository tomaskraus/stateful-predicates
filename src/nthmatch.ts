import type {TPredicate} from './util/predicate';

/**
 * Returns predicate(value, index) `P`, that:
 * - returns _true_ if its `innerPredicate` has succeeded `n` times
 * @template T The type of input element
 * @param n the number of elements `innerPredicate` must match
 * @param innerPredicate inner predicate
 * @returns `predicate(value, index)`, that returns _true_ if its `innerPredicate` has succeeded `n` times
 * @example
 *
 * ```ts
const isEven = x => x % 2 === 0;
const secondMatchingElem = [2, 3, 5, 4, 8, 5, -8].filter(nthMatch(2, isEven));
console.log(secondMatchingElem);
//=> [ 4 ]
 * ```
 *
 * @see {@link TPredicate}
 */
export function nthMatch<T>(
  n: number,
  innerPredicate: TPredicate<T>
): TPredicate<T> {
  if (n < 1) {
    throw new Error(
      `Invalid n: [${n}]! nth-match number value must be positive.`
    );
  }
  let matchCounter = 0;
  return function (this: any, value: T, index: number): boolean {
    if (innerPredicate.call(this, value, index)) {
      matchCounter++;
      if (matchCounter === n) {
        return true;
      }
    }
    return false;
  };
}
