"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nthmatch_1 = require("../src/nthmatch");
const helpers_1 = require("./helpers");
test('nthMatch n=1', () => {
    expect([2, 4, 3, 5, 3].map((0, nthmatch_1.nthMatch)(1, helpers_1.isEqualToThree))).toEqual([
        false,
        false,
        true,
        false,
        false,
    ]);
});
test('nthMatch', () => {
    expect([2, 4, 3, 5, 3].map((0, nthmatch_1.nthMatch)(2, helpers_1.isEqualToThree))).toEqual([
        false,
        false,
        false,
        false,
        true,
    ]);
});
test('nthMatch - invalid n', () => {
    expect(() => [2, 4, 3, 5, 0].map((0, nthmatch_1.nthMatch)(0, helpers_1.isEqualToThree))).toThrowError(/invalid/i);
});
test('nthMatch - no match', () => {
    expect([2, 4, 6, 5, 0].map((0, nthmatch_1.nthMatch)(1, helpers_1.isEqualToThree))).toEqual([
        false,
        false,
        false,
        false,
        false,
    ]);
});
// --------------------------------------------------------------
test('nthMatch - index', () => {
    expect([2, 4, 3, 5, 0, 2].map((0, nthmatch_1.nthMatch)(1, helpers_1.isIndexEqualThree))).toEqual([
        false,
        false,
        false,
        true,
        false,
        false,
    ]);
});
test('nthMatch - proper closure', () => {
    expect([2, 4, 3, 5, 0].map((0, nthmatch_1.nthMatch)(1, helpers_1.isEqualToThree))).toEqual([
        false,
        false,
        true,
        false,
        false,
    ]);
    expect([3, 5, 3].map((0, nthmatch_1.nthMatch)(2, helpers_1.isEqualToThree))).toEqual([
        false,
        false,
        true,
    ]);
});
test('nthMatch - this', () => {
    // without explicit this
    expect([2, 4, 3, 5, 0, 3, 3].map((0, nthmatch_1.nthMatch)(1, helpers_1.isIndexEqualThreeAndThisObjectHasMyPropDefined))).toEqual([false, false, false, false, false, false, false]);
    expect([2, 4, 3, 5, 0, 3, 3].map((0, nthmatch_1.nthMatch)(1, helpers_1.isIndexEqualThreeAndThisObjectHasMyPropDefined), helpers_1.customThis)).toEqual([false, false, false, true, false, false, false]);
});
//# sourceMappingURL=nthmatch.test.js.map