"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onchange_1 = require("../src/onchange");
const helpers_1 = require("./helpers");
test('onChange', () => {
    expect([2, 3, 3, 3, 4, 3, 5, -8].map((0, onchange_1.onChange)(helpers_1.isEqualToThree))).toEqual([
        false,
        true,
        false,
        false,
        true,
        true,
        true,
        false,
    ]);
});
test('onChange - at the beginning', () => {
    expect([3, 3, 3, 4, 3, 5, -8].map((0, onchange_1.onChange)(helpers_1.isEqualToThree))).toEqual([
        true,
        false,
        false,
        true,
        true,
        true,
        false,
    ]);
});
test('onChange - isolated', () => {
    expect([5, 7, 3, 4, 6, 3, -8].map((0, onchange_1.onChange)(helpers_1.isEqualToThree))).toEqual([
        false,
        false,
        true,
        true,
        false,
        true,
        true,
    ]);
});
test('onChange - no match', () => {
    expect([2, 4, 6, 5, 0].map((0, onchange_1.onChange)(helpers_1.isEqualToThree))).toEqual([
        false,
        false,
        false,
        false,
        false,
    ]);
});
// --------------------------------------------------------------
test('onChange - index', () => {
    expect([2, 4, 3, 5, 0, 2].map((0, onchange_1.onChange)(helpers_1.isIndexEqualThree))).toEqual([
        false,
        false,
        false,
        true,
        true,
        false,
    ]);
});
test('onChange - proper closure', () => {
    expect([2, 4, 3].map((0, onchange_1.onChange)(helpers_1.isEqualToThree))).toEqual([false, false, true]);
    expect([3, 5, 0].map((0, onchange_1.onChange)(helpers_1.isEqualToThree))).toEqual([true, true, false]);
});
test('onChange - this', () => {
    // without explicit this
    expect([2, 4, 3, 5, 0, 3, 3].map((0, onchange_1.onChange)(helpers_1.isIndexEqualThreeAndThisObjectHasMyPropDefined))).toEqual([false, false, false, false, false, false, false]);
    expect([2, 4, 3, 5, 0, 3, 3].map((0, onchange_1.onChange)(helpers_1.isIndexEqualThreeAndThisObjectHasMyPropDefined), helpers_1.customThis)).toEqual([false, false, false, true, true, false, false]);
});
//# sourceMappingURL=onchange.test.js.map