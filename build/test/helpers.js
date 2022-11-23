"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIndexEqualThreeAndThisObjectHasMyPropDefined = exports.customThis = exports.isMinusOne = exports.isZero = exports.isIndexEqualThree = exports.isEqualToThree = void 0;
const isEqualToThree = (x) => x === 3;
exports.isEqualToThree = isEqualToThree;
const isIndexEqualThree = (_, index) => index === 3;
exports.isIndexEqualThree = isIndexEqualThree;
const isZero = (x) => x === 0;
exports.isZero = isZero;
const isMinusOne = (x) => x === -1;
exports.isMinusOne = isMinusOne;
exports.customThis = {
    myProp: 'hereIAm',
};
function isIndexEqualThreeAndThisObjectHasMyPropDefined(_, index) {
    if (this) {
        return index === 3 && this['myProp'] === 'hereIAm';
    }
    return false;
}
exports.isIndexEqualThreeAndThisObjectHasMyPropDefined = isIndexEqualThreeAndThisObjectHasMyPropDefined;
//# sourceMappingURL=helpers.js.map