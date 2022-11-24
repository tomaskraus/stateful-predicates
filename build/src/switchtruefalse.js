"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchTrueFalse = void 0;
/* exported trueSince */
/**
 * Returns a predicate(value, index) that:
 * 1. stays true "on and after" `predicateForTrue` is successful on its value/index arguments
 * 2. become false again "on and after" `predicateForFalse` is successful on its value/index arguments
 * At the beginning, that predicate is false.
 *
 * `switchTrueFalse` is able to switch multiple times.
 *
 * @example
 * ```ts
 * const trueBlocksOfNumbers = [2, 1, 0, 4, 9, -1, 7, 0, 3].filter(
 *   switchTrueFalse(
 *     (x: number) => x === 0,
 *     (x: number) => x === -1
 *   )
 * );
 * console.log(trueBlocksOfNumbers);
 * //=> [ 0, 4, 9, 0, 3 ]
 * ```
 *
 * @template T The type of input element.
 * @param predicateForTrue the predicate argument for switching the `switchTrueFalse` state to true, once fulfilled.
 * @param predicateForTrue the predicate argument for switching the `switchTrueFalse` state to false, once fulfilled.
 * @returns A Predicate(value, index) that stays true "on and after" `predicateForTrue` is successful on its value/index arguments, and become false again "on and after" `predicateForFalse` is successful on its value/index arguments.
 *
 * @see {@link TPredicate}
 * @see {@link trueSince}
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