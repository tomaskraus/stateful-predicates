"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const truesince_1 = require("../src/truesince");
const helpers_1 = require("./helpers");
test('trueSince', () => {
    expect([2, 4, 3, 5, 0, 3, 3].filter((0, truesince_1.trueSince)(helpers_1.isEqualToThree))).toEqual([
        3, 5, 0, 3, 3,
    ]);
});
test('trueSince - index', () => {
    expect([2, 4, 3, 5, 0, 3, 3].filter((0, truesince_1.trueSince)(helpers_1.isIndexEqualThree))).toEqual([
        5, 0, 3, 3,
    ]);
});
test('trueSince proper closure', () => {
    expect([2, 4, 3, 5, 0, 3, 3].filter((0, truesince_1.trueSince)(helpers_1.isEqualToThree))).toEqual([
        3, 5, 0, 3, 3,
    ]);
    expect([2, 4, 1, 5, 0, 1, 1].filter((0, truesince_1.trueSince)(helpers_1.isEqualToThree))).toEqual([]);
});
test('trueSince proper closure - index', () => {
    expect([2, 4, 3, 5, 0, 3, 3].filter((0, truesince_1.trueSince)(helpers_1.isIndexEqualThree))).toEqual([
        5, 0, 3, 3,
    ]);
    expect([2, 4, 1, 10].filter((0, truesince_1.trueSince)(helpers_1.isIndexEqualThree))).toEqual([10]);
});
test('trueSince - shared closure', () => {
    const predicate = (0, truesince_1.trueSince)(helpers_1.isEqualToThree);
    expect([2, 4, 3, 5, 0, 3, 3].filter(predicate)).toEqual([3, 5, 0, 3, 3]);
    expect([1, 8, 4, 5].filter(predicate)).toEqual([1, 8, 4, 5]);
});
test('trueSince - this', () => {
    // without explicit this
    expect([2, 4, 3, 5, 0, 3, 3].filter((0, truesince_1.trueSince)(helpers_1.isIndexEqualThreeAndThisObjectHasMyPropDefined))).toEqual([]);
    expect([2, 4, 3, 5, 0, 3, 3].filter((0, truesince_1.trueSince)(helpers_1.isIndexEqualThreeAndThisObjectHasMyPropDefined), helpers_1.customThis)).toEqual([5, 0, 3, 3]);
});
//# sourceMappingURL=truesince.test.js.map