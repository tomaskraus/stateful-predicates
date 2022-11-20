"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIndexEqualThreeAndThisObjectHasMyPropDefined = exports.customThis = exports.isIndexEqualThree = exports.isEqualToThree = void 0;
const isEqualToThree = (x) => x === 3;
exports.isEqualToThree = isEqualToThree;
const isIndexEqualThree = (_, index) => index === 3;
exports.isIndexEqualThree = isIndexEqualThree;
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