import type {TPredicate} from './util/predicate';

/**
 * Returns predicate(value, index) `P`, that:
 * - returns _true_ if its `parentPredicate` has succeeded at previous element, i.e element with index-1.
 * @template T The type of input element
 * @param parentPredicate predicate
 * @returns `predicate(value, index)` that returns _true_ if its `parentPredicate` has succeeded one element before.
 *
 * @example
 *
 * ```ts
const isThree = (x: number) => x === 3;
const result = [2, 3, 3, 0].map(
  oneAfter(isThree)
);
console.log(result);
//=> [ false, false, true, true ]
 * ```
 * It kind of shifts (or delays) the succesful element evaluation.
 *
 * @see {@link TPredicate}
 */
export function oneAfter<T>(parentPredicate: TPredicate<T>): TPredicate<T> {
  let lastResult = false;
  return function (this: any, value: T, index: number): boolean {
    const mem = lastResult;
    lastResult = parentPredicate.call(this, value, index);
    return mem;
  };
}
