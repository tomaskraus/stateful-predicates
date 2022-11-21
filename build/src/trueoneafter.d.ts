import type { PredicateType } from './util/predicate';
/**
 * Predicate that returns true for one element after its predicate argument succeeded.
 *
 * `trueOneAfter` is greedy: for several consecutive success-elements, trueAfterOne detects the first of them and returns true on the second one, and so on.
 *
 * @example
 * Returns true as nearly (and as long) as its predicate argument succeeded at previous element:
 * ```ts
 * const isEven = (x: number) => x % 2 === 0;
 *
 * const result = [3, 2, 4, 2, 5, 1].map(trueOneAfter(isEven));
 * console.log(result);
 * //=> [ false, false, true, true, true, false ]
 * ```
 *
 * @template T The type of input element.
 * @param predicate the predicate argument
 * @returns Predicate that returns true for one element after its predicate argument succeeded.
 *
 * @see {@link PredicateType}
 */
export declare function trueOneAfter<T>(predicate: PredicateType<T>): PredicateType<T>;
