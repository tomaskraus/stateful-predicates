import type { TPredicate } from './util/predicate';
/**
 * Predicate that returns true since its predicate arguments succeeded. That is, after that, in every next call, this predicate always returns true.
 *
 * @template T The type of input value.
 * @param predicate the predicate argument
 * @returns Predicate that returns true since its predicate arguments succeeded.
 *
 * @see {@link TPredicate}
 */
export declare function trueSince<T>(predicate: TPredicate<T>): TPredicate<T>;
