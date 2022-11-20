import {trueSince} from '../src/truesince';
import {
  isEqualToThree,
  isIndexEqualThree,
  isIndexEqualThreeAndThisObjectHasMyPropDefined,
  customThis,
} from './helpers';

test('trueSince', () => {
  expect([2, 4, 3, 5, 0, 3, 3].filter(trueSince(isEqualToThree))).toEqual([
    3, 5, 0, 3, 3,
  ]);
});

test('trueSince - index', () => {
  expect([2, 4, 3, 5, 0, 3, 3].filter(trueSince(isIndexEqualThree))).toEqual([
    5, 0, 3, 3,
  ]);
});

test('trueSince proper closure', () => {
  expect([2, 4, 3, 5, 0, 3, 3].filter(trueSince(isEqualToThree))).toEqual([
    3, 5, 0, 3, 3,
  ]);

  expect([2, 4, 1, 5, 0, 1, 1].filter(trueSince(isEqualToThree))).toEqual([]);
});

test('trueSince proper closure - index', () => {
  expect([2, 4, 3, 5, 0, 3, 3].filter(trueSince(isIndexEqualThree))).toEqual([
    5, 0, 3, 3,
  ]);

  expect([2, 4, 1, 10].filter(trueSince(isIndexEqualThree))).toEqual([10]);
});

test('trueSince - shared closure', () => {
  const predicate = trueSince(isEqualToThree);

  expect([2, 4, 3, 5, 0, 3, 3].filter(predicate)).toEqual([3, 5, 0, 3, 3]);

  expect([1, 8, 4, 5].filter(predicate)).toEqual([1, 8, 4, 5]);
});

test('trueSince - this', () => {
  // without explicit this
  expect(
    [2, 4, 3, 5, 0, 3, 3].filter(
      trueSince(isIndexEqualThreeAndThisObjectHasMyPropDefined)
    )
  ).toEqual([]);

  expect(
    [2, 4, 3, 5, 0, 3, 3].filter(
      trueSince(isIndexEqualThreeAndThisObjectHasMyPropDefined),
      customThis
    )
  ).toEqual([5, 0, 3, 3]);
});
