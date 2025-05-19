"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneAfter = void 0;
/**
 * Returns predicate(value, index) `P`, that:
 * - returns _true_ if its `innerPredicate` has succeeded at previous element, i.e element with index-1.
 * @template T The type of input element
 * @param innerPredicate predicate
 * @returns `predicate(value, index)` that returns _true_ if its `innerPredicate` has succeeded one element before.
 *
 * @example
 *
 * ```ts
const isThree = (x: number) => x === 3;
const result = [2, 3, 3, 0].map(
  oneAfter(isThree)
);
console.log(result);
//=> [ false, false, true, true ]
 * ```
 * It kind of shifts (or delays) the succesful element evaluation.
 *
 * @see {@link TPredicate}
 */
function oneAfter(innerPredicate) {
    let lastResult = false;
    return function (value, index) {
        const mem = lastResult;
        lastResult = innerPredicate.call(this, value, index);
        return mem;
    };
}
exports.oneAfter = oneAfter;
//# sourceMappingURL=one-after.js.map