"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchTrueFalse = void 0;
/**
 * Returns a predicate(value, index) `P` that:
 * 1. Stays _true_ "on and after" `predicateForTrue` is successful on its `value`/`index` arguments
 * 2. Becomes _false_ again "on and after" `predicateForFalse` is successful on its `value`/`index` arguments
 * At the beginning, that predicate is false.
 * 3. Is **reusable**: able to switch _true_/_false_ multiple times.
 * 4. Is **greedy**:
 *   - switches to _true_ on the first of consecutive elements `predicateForTrue` can match
 *   - switches to _false_ on the first of consecutive elements `predicateForFalse` can match
 *
 *
 * @template T The type of input element.
 * @param predicateForTrue the predicate argument for switching `predicate P's` state to true, once fulfilled.
 * @param predicateForFalse the predicate argument for switching `predicate P's` state to false, once fulfilled.
 * @returns A Predicate(value, index) that stays _true_ "on and after" `predicateForTrue` is successful on its value/index arguments, and becomes _false_ again "on and after" `predicateForFalse` is successful on its value/index arguments.
 *
 * @see {@link TPredicate}
 *
 * @example
 * ```ts
const elementsBetweenZeroAndMinusOne = [2, 1, 0, 0, 5, 9, -1, -1, 7].filter(
  switchTrueFalse(
    x => x === 0,
    x => x === -1
  )
);
console.log(elementsBetweenZeroAndMinusOne);
//=> [ 0, 0, 5, 9 ]
 * ```
 */
function switchTrueFalse(predicateForTrue, predicateForFalse) {
    let state = false;
    return function (value, index) {
        if (!state && predicateForTrue.call(this, value, index)) {
            state = true;
            return state;
        }
        if (state && predicateForFalse.call(this, value, index)) {
            state = false;
            return state;
        }
        return state;
    };
}
exports.switchTrueFalse = switchTrueFalse;
//# sourceMappingURL=switchtruefalse.js.map