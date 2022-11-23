"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const switchtruefalse_1 = require("../src/switchtruefalse");
const helpers_1 = require("./helpers");
const truesince_1 = require("../src/truesince");
test('switchTrueFalse', () => {
    expect([2, 0, 3, -1, 1].map((0, switchtruefalse_1.switchTrueFalse)(helpers_1.isZero, helpers_1.isMinusOne))).toEqual([
        false,
        true,
        true,
        false,
        false,
    ]);
});
test('switchTrueFalse - index', () => {
    expect([2, 4, 3, 5, -1, 2].map((0, switchtruefalse_1.switchTrueFalse)(helpers_1.isIndexEqualThree, helpers_1.isMinusOne))).toEqual([false, false, false, true, false, false]);
});
test('switchTrueFalse - proper closure', () => {
    expect([0, 4, 3, 5, -1].map((0, switchtruefalse_1.switchTrueFalse)(helpers_1.isZero, helpers_1.isMinusOne))).toEqual([
        true,
        true,
        true,
        true,
        false,
    ]);
    expect([3, 0, 0].map((0, switchtruefalse_1.switchTrueFalse)(helpers_1.isZero, helpers_1.isMinusOne))).toEqual([
        false,
        true,
        true,
    ]);
});
test('switchTrueFalse - proper closure - index', () => {
    expect([0, 4, 3, 5, 0].map((0, switchtruefalse_1.switchTrueFalse)(helpers_1.isZero, helpers_1.isIndexEqualThree))).toEqual([true, true, true, false, true]);
    expect([3, 2, 0, 6, 2].map((0, switchtruefalse_1.switchTrueFalse)(helpers_1.isZero, helpers_1.isIndexEqualThree))).toEqual([false, false, true, false, false]);
});
test('switchTrueFalse - shared closure - index', () => {
    const sharedPpredicate = (0, switchtruefalse_1.switchTrueFalse)(helpers_1.isZero, helpers_1.isIndexEqualThree);
    expect([0, 4, 3, 5, 0].map(sharedPpredicate)).toEqual([
        true,
        true,
        true,
        false,
        true,
    ]);
    expect([3, 2, 3, 6, 2].map(sharedPpredicate)).toEqual([
        true,
        true,
        true,
        false,
        false,
    ]);
});
test('switchTrueFalse - this', () => {
    // without explicit this
    expect([2, 4, 3, 5, 2, 3, -1, 2].map((0, switchtruefalse_1.switchTrueFalse)(helpers_1.isIndexEqualThreeAndThisObjectHasMyPropDefined, helpers_1.isMinusOne))).toEqual([false, false, false, false, false, false, false, false]);
    expect([2, 4, 3, 5, 2, 3, -1, 2].map((0, switchtruefalse_1.switchTrueFalse)(helpers_1.isIndexEqualThreeAndThisObjectHasMyPropDefined, helpers_1.isMinusOne), helpers_1.customThis)).toEqual([false, false, false, true, true, true, false, false]);
});
// --------------------------------------------------------------
test('switchTrueFalse - full match', () => {
    expect([0, 4, 6, 5].map((0, switchtruefalse_1.switchTrueFalse)(helpers_1.isZero, helpers_1.isMinusOne))).toEqual([
        true,
        true,
        true,
        true,
    ]);
});
test('switchTrueFalse - only false match', () => {
    expect([3, -1, 6, 5].map((0, switchtruefalse_1.switchTrueFalse)(helpers_1.isZero, helpers_1.isMinusOne))).toEqual([
        false,
        false,
        false,
        false,
    ]);
});
test('switchTrueFalse - no match', () => {
    expect([2, 4, 6, 5].map((0, switchtruefalse_1.switchTrueFalse)(helpers_1.isZero, helpers_1.isMinusOne))).toEqual([
        false,
        false,
        false,
        false,
    ]);
});
test('switchTrueFalse - more isolated matches', () => {
    expect([3, 0, 6, -1, 2, 0, -1, 3].map((0, switchtruefalse_1.switchTrueFalse)(helpers_1.isZero, helpers_1.isMinusOne))).toEqual([false, true, true, false, false, true, false, false]);
});
test('switchTrueFalse - adjacent matches', () => {
    expect([3, 0, 6, -1, 0, -1, 3].map((0, switchtruefalse_1.switchTrueFalse)(helpers_1.isZero, helpers_1.isMinusOne))).toEqual([false, true, true, false, true, false, false]);
});
test('switchTrueFalse - greedy behavior', () => {
    expect([3, 0, 0, 2, 0, -1, -1, 2, -1].map((0, switchtruefalse_1.switchTrueFalse)(helpers_1.isZero, helpers_1.isMinusOne))).toEqual([false, true, true, true, true, false, false, false, false]);
});
test('switchTrueFalse - alternates output if both predicates are the same', () => {
    expect([0, 0, 0, 2, 0, 0].map((0, switchtruefalse_1.switchTrueFalse)(helpers_1.isZero, helpers_1.isZero))).toEqual([
        true,
        false,
        true,
        true,
        false,
        true,
    ]);
});
// ---------------------------------------------
test('switchTrueFalse - trueSince emulation - index', () => {
    function trueSince2(predicate) {
        return (0, switchtruefalse_1.switchTrueFalse)(predicate, () => false);
    }
    const nums = [2, 4, 3, 5, 0, 3, 3];
    expect(nums.filter(trueSince2(helpers_1.isIndexEqualThree))).toEqual(nums.filter((0, truesince_1.trueSince)(helpers_1.isIndexEqualThree)));
});
//# sourceMappingURL=switchTrueFalse.test.js.map