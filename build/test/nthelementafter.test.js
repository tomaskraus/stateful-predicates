"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nthelementafter_1 = require("../src/nthelementafter");
const helpers_1 = require("./helpers");
test('nthElementAfter', () => {
    expect([2, 4, 3, 5, 0].map((0, nthelementafter_1.nthElementAfter)(1, helpers_1.isEqualToThree))).toEqual([
        false,
        false,
        false,
        true,
        false,
    ]);
});
test('nthElementAfter - offset > 1', () => {
    expect([2, 4, 3, 5, 0].map((0, nthelementafter_1.nthElementAfter)(2, helpers_1.isEqualToThree))).toEqual([
        false,
        false,
        false,
        false,
        true,
    ]);
});
test('nthElementAfter - zero offset', () => {
    expect([2, 4, 3, 5, 0].map((0, nthelementafter_1.nthElementAfter)(0, helpers_1.isEqualToThree))).toEqual([
        false,
        false,
        true,
        false,
        false,
    ]);
});
test('nthElementAfter - invalid offset', () => {
    expect(() => [2, 4, 3, 5, 0].map((0, nthelementafter_1.nthElementAfter)(-1, helpers_1.isEqualToThree))).toThrowError(/invalid/i);
});
test('nthElementAfter - no match', () => {
    expect([2, 4, 6, 5, 0].map((0, nthelementafter_1.nthElementAfter)(1, helpers_1.isEqualToThree))).toEqual([
        false,
        false,
        false,
        false,
        false,
    ]);
});
test('nthElementAfter - more isolated matches', () => {
    expect([3, 4, 6, 3, 0, 7].map((0, nthelementafter_1.nthElementAfter)(2, helpers_1.isEqualToThree))).toEqual([
        false,
        false,
        true,
        false,
        false,
        true,
    ]);
});
test('nthElementAfter - potential match is eaten at the offset end', () => {
    expect([3, 4, 3, 0, 7].map((0, nthelementafter_1.nthElementAfter)(2, helpers_1.isEqualToThree))).toEqual([
        false,
        false,
        true,
        false,
        false,
    ]);
});
test('nthElementAfter - more isolated matches - offset=1', () => {
    expect([3, 4, 6, 3, 0, 7].map((0, nthelementafter_1.nthElementAfter)(1, helpers_1.isEqualToThree))).toEqual([
        false,
        true,
        false,
        false,
        true,
        false,
    ]);
});
test('nthElementAfter - greedy behavior', () => {
    // starts from the first. Does not detect those matches within the active offset.
    expect([2, 3, 3, 3, 0, 4, 6, 8].map((0, nthelementafter_1.nthElementAfter)(3, helpers_1.isEqualToThree))).toEqual([false, false, false, false, true, false, false, false]);
});
test('nthElementAfter - greedy behavior - offset=1', () => {
    // is ready to detect elements again as soon as it is more than `offset` elements after its last detected element.
    expect([3, 2, 2, 2, 5, 1].map((0, nthelementafter_1.nthElementAfter)(1, x => x === 2))).toEqual([
        false,
        false,
        true,
        false,
        true,
        false,
    ]);
});
// --------------------------------------------------------------
test('nthElementAfter - index', () => {
    expect([2, 4, 3, 5, 0, 2].map((0, nthelementafter_1.nthElementAfter)(1, helpers_1.isIndexEqualThree))).toEqual([false, false, false, false, true, false]);
});
test('nthElementAfter - proper closure', () => {
    expect([2, 4, 3, 5, 0].map((0, nthelementafter_1.nthElementAfter)(1, helpers_1.isEqualToThree))).toEqual([
        false,
        false,
        false,
        true,
        false,
    ]);
    expect([3, 5, 0].map((0, nthelementafter_1.nthElementAfter)(1, helpers_1.isEqualToThree))).toEqual([
        false,
        true,
        false,
    ]);
});
test('nthElementAfter - proper closure - index', () => {
    expect([2, 4, 3, 5, 0].map((0, nthelementafter_1.nthElementAfter)(1, helpers_1.isIndexEqualThree))).toEqual([
        false,
        false,
        false,
        false,
        true,
    ]);
    expect([3, 5, 0, 1, 2, 4].map((0, nthelementafter_1.nthElementAfter)(1, helpers_1.isIndexEqualThree))).toEqual([false, false, false, false, true, false]);
});
test('nthElementAfter - this', () => {
    // without explicit this
    expect([2, 4, 3, 5, 0, 3, 3].map((0, nthelementafter_1.nthElementAfter)(1, helpers_1.isIndexEqualThreeAndThisObjectHasMyPropDefined))).toEqual([false, false, false, false, false, false, false]);
    expect([2, 4, 3, 5, 0, 3, 3].map((0, nthelementafter_1.nthElementAfter)(1, helpers_1.isIndexEqualThreeAndThisObjectHasMyPropDefined), helpers_1.customThis)).toEqual([false, false, false, false, true, false, false]);
});
//# sourceMappingURL=nthelementafter.test.js.map