"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nthMatch = void 0;
/**
 * Returns predicate(value, index) `P`, that:
 * - returns _true_ if its `parentPredicate` has succeeded `n` times
 * @template T The type of input element
 * @param n the number of elements `parent predicate` must match
 * @param parentPredicate parent predicate
 * @returns `predicate(value, index)`, that returns _true_ if its `parentPredicate` has succeeded `n` times
 * @example
 *
 * ```ts
const isEven = x => x % 2 === 0;
const secondMatchingElem = [2, 3, 5, 4, 8, 5, -8].filter(nthMatch(2, isEven));
console.log(secondMatchingElem);
//=> [ 4 ]
 * ```
 *
 * @see {@link TPredicate}
 */
function nthMatch(n, parentPredicate) {
    if (n < 1) {
        throw new Error(`Invalid n: [${n}]! nth-match number value must be positive.`);
    }
    let matchCounter = 0;
    return function (value, index) {
        if (parentPredicate.call(this, value, index)) {
            matchCounter++;
            if (matchCounter === n) {
                return true;
            }
        }
        return false;
    };
}
exports.nthMatch = nthMatch;
//# sourceMappingURL=nthmatch.js.map