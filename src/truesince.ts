import type {PredicateType} from './util/predicate';

/**
 * Predicate that returns true since its predicate arguments succeeded. That is, after that, in every next call, this predicate always returns true.
 *
 * @template T The type of input value.
 * @param predicate the predicate argument
 * @returns Predicate that returns true since its predicate arguments succeeded.
 */
export function trueSince<T>(predicate: PredicateType<T>): PredicateType<T> {
  let success: boolean;
  return function (this: any, value: T, index: number): boolean {
    if (predicate.call(this, value, index)) {
      success = true;
    }
    return success;
  };
}
