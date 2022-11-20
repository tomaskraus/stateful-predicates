"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trueSince = void 0;
/**
 * Predicate that returns true since its predicate arguments succeeded. That is, after that, in every next call, this predicate always returns true.
 *
 * @template T The type of input value.
 * @param predicate the predicate argument
 * @returns Predicate that returns true since its predicate arguments succeeded.
 */
function trueSince(predicate) {
    let success;
    return function (value, index) {
        if (predicate.call(this, value, index)) {
            success = true;
        }
        return success;
    };
}
exports.trueSince = trueSince;
//# sourceMappingURL=truesince.js.map