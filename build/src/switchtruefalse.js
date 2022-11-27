"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchTrueFalse = void 0;
/**
 * Returns a predicate(value, index) `P` that fulfills the following:
1.  `P` stays _true_ "on and after" `predicateForTrue` has succeeded on some element
2.  `P` becomes _false_ again "on and after" `predicateForFalse` has succeeded on some element that follows.
    At the beginning, `P` is _false_.
3.  `P` is **reusable**: able to switch _true_/_false_ multiple times.
4.  `P` is **greedy**:

- switches to _true_ on the first of consecutive elements `predicateForTrue` can succeed
- switches to _false_ on the first of consecutive elements `predicateForFalse` can succeed
 *
 * @template T The type of input element.
 * @param predicateForTrue the predicate that, once fulfilled, switches the `predicate P's` state to _true_.
 * @param predicateForFalse the predicate that, once fulfilled, switches the `predicate P's` state to _false_.
 * @returns A Predicate(value, index) that stays _true_ "on and after" `predicateForTrue` has succeeded on some element, and becomes _false_ again "on and after" `predicateForFalse` has succeeded on some element that follows.
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