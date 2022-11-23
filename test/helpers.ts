export const isEqualToThree = (x: number) => x === 3;

export const isIndexEqualThree = (_: unknown, index: number) => index === 3;

export const isZero = (x: number) => x === 0;
export const isMinusOne = (x: number) => x === -1;

export const customThis = {
  myProp: 'hereIAm',
};

export function isIndexEqualThreeAndThisObjectHasMyPropDefined(
  _: unknown,
  index: number
) {
  if (this) {
    return index === 3 && this['myProp'] === 'hereIAm';
  }
  return false;
}
