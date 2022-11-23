/**
 * A predicate type. Predicate is a function, that accepts some value and returns a boolean value, based on its condition.
 *
 * @template T The type of input value.
 * @param value A value provided for the condition. It is meant to be a value's order in some sequence, such as a value's index for the value in an array.
 * @param index A numerical value provided for the condition.
 *
 * @returns True, if value (and index) meet the predicate's condition.
 */
export type TPredicate<T> = (value: T, index: number) => boolean;
