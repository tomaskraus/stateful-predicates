import type { TPredicate } from './util/predicate';
/**
 * Returns predicate(value, index) `P`, that:
 * - returns _true_ whenever its `innerPredicate` changes value - i.e. result of `innerPredicate` differs from `P`'s internal state.
 *
 * At the begin, the internal state of `P` is _false_.
 * @template T The type of input element
 * @param innerPredicate predicate
 * @returns `predicate(value, index)`, that returns _true_ whenever its `innerPredicate` changes value.
 *
 * @example
 *
 * ```ts
const isThree = (x: number) => x === 3;
const changes = [2, 3, 3, 3, 4, 3, 5, -8].map(onChange(isThree));
console.log(changes);
//=> [ false, true, false, false, true, true, true, false ]
 * ```
 *
 * @see {@link TPredicate}
 */
export declare function onChange<T>(innerPredicate: TPredicate<T>): TPredicate<T>;
