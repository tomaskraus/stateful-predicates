import type { TPredicate } from './util/predicate';
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
export declare function nthMatch<T>(n: number, innerPredicate: TPredicate<T>): TPredicate<T>;
