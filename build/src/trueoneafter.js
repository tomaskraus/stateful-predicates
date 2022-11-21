"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trueOneAfter = void 0;
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
function trueOneAfter(predicate) {
    let previousResult = false;
    return function (value, index) {
        const currentResult = previousResult;
        previousResult = predicate.call(this, value, index);
        return currentResult;
    };
}
exports.trueOneAfter = trueOneAfter;
//# sourceMappingURL=trueoneafter.js.map