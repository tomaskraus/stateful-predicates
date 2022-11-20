"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trueoneafter_1 = require("../src/trueoneafter");
const helpers_1 = require("./helpers");
test('trueOneAfter', () => {
    expect([2, 4, 3, 5, 0].map((0, trueoneafter_1.trueOneAfter)(helpers_1.isEqualToThree))).toEqual([
        false,
        false,
        false,
        true,
        false,
    ]);
});
test('trueOneAfter - index', () => {
    expect([2, 4, 3, 5, 0, 2].map((0, trueoneafter_1.trueOneAfter)(helpers_1.isIndexEqualThree))).toEqual([
        false,
        false,
        false,
        false,
        true,
        false,
    ]);
});
test('trueOneAfter - proper closure', () => {
    expect([2, 4, 3, 5, 0].map((0, trueoneafter_1.trueOneAfter)(helpers_1.isEqualToThree))).toEqual([
        false,
        false,
        false,
        true,
        false,
    ]);
    expect([3, 5, 0].map((0, trueoneafter_1.trueOneAfter)(helpers_1.isEqualToThree))).toEqual([
        false,
        true,
        false,
    ]);
});
test('trueOneAfter - proper closure - index', () => {
    expect([2, 4, 3, 5, 0].map((0, trueoneafter_1.trueOneAfter)(helpers_1.isIndexEqualThree))).toEqual([
        false,
        false,
        false,
        false,
        true,
    ]);
    expect([3, 5, 0, 1, 2, 4].map((0, trueoneafter_1.trueOneAfter)(helpers_1.isIndexEqualThree))).toEqual([
        false,
        false,
        false,
        false,
        true,
        false,
    ]);
});
test('trueOneAfter - this', () => {
    // without explicit this
    expect([2, 4, 3, 5, 0, 3, 3].map((0, trueoneafter_1.trueOneAfter)(helpers_1.isIndexEqualThreeAndThisObjectHasMyPropDefined))).toEqual([false, false, false, false, false, false, false]);
    expect([2, 4, 3, 5, 0, 3, 3].map((0, trueoneafter_1.trueOneAfter)(helpers_1.isIndexEqualThreeAndThisObjectHasMyPropDefined), helpers_1.customThis)).toEqual([false, false, false, false, true, false, false]);
});
// --------------------------------------------------------------
test('trueOneAfter - no match', () => {
    expect([2, 4, 6, 5, 0].map((0, trueoneafter_1.trueOneAfter)(helpers_1.isEqualToThree))).toEqual([
        false,
        false,
        false,
        false,
        false,
    ]);
});
test('trueOneAfter - more isolated matches', () => {
    expect([3, 4, 6, 3, 0, 7].map((0, trueoneafter_1.trueOneAfter)(helpers_1.isEqualToThree))).toEqual([
        false,
        true,
        false,
        false,
        true,
        false,
    ]);
});
test('trueOneAfter - greedy behavior', () => {
    expect([2, 3, 3, 3, 0, 4].map((0, trueoneafter_1.trueOneAfter)(helpers_1.isEqualToThree))).toEqual([
        false,
        false,
        true,
        true,
        true,
        false,
    ]);
});
//# sourceMappingURL=trueoneafter.test.js.map