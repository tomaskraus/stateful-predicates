"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onChange = void 0;
/**
 * Returns predicate(value, index) `P`, that:
 * - returns _true_ whenever its `parentPredicate` changes value - i.e. result of `parent predicate` differs from `P`'s internal state.
 *
 * At the begin, the internal state of `P` is _false_.
 * @template T The type of input element
 * @param parentPredicate predicate
 * @returns `predicate(value, index)`, that returns _true_ whenever its `parentPredicate` changes value.
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
function onChange(parentPredicate) {
    let state = false;
    return function (value, index) {
        const result = parentPredicate.call(this, value, index);
        if (!state && result) {
            state = true;
            return true;
        }
        if (state && !result) {
            state = false;
            return true;
        }
        return false;
    };
}
exports.onChange = onChange;
//# sourceMappingURL=onchange.js.map