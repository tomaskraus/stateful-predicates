import {nthMatch} from '../src/nthmatch';
import {
  isEqualToThree,
  isIndexEqualThree,
  isIndexEqualThreeAndThisObjectHasMyPropDefined,
  customThis,
} from './helpers';

test('nthMatch n=1', () => {
  expect([2, 4, 3, 5, 3].map(nthMatch(1, isEqualToThree))).toEqual([
    false,
    false,
    true,
    false,
    false,
  ]);
});

test('nthMatch', () => {
  expect([2, 4, 3, 5, 3].map(nthMatch(2, isEqualToThree))).toEqual([
    false,
    false,
    false,
    false,
    true,
  ]);
});

test('nthMatch - invalid n', () => {
  expect(() => [2, 4, 3, 5, 0].map(nthMatch(0, isEqualToThree))).toThrowError(
    /invalid/i
  );
});

test('nthMatch - no match', () => {
  expect([2, 4, 6, 5, 0].map(nthMatch(1, isEqualToThree))).toEqual([
    false,
    false,
    false,
    false,
    false,
  ]);
});

// --------------------------------------------------------------

test('nthMatch - index', () => {
  expect([2, 4, 3, 5, 0, 2].map(nthMatch(1, isIndexEqualThree))).toEqual([
    false,
    false,
    false,
    true,
    false,
    false,
  ]);
});

test('nthMatch - proper closure', () => {
  expect([2, 4, 3, 5, 0].map(nthMatch(1, isEqualToThree))).toEqual([
    false,
    false,
    true,
    false,
    false,
  ]);

  expect([3, 5, 3].map(nthMatch(2, isEqualToThree))).toEqual([
    false,
    false,
    true,
  ]);
});

test('nthMatch - this', () => {
  // without explicit this
  expect(
    [2, 4, 3, 5, 0, 3, 3].map(
      nthMatch(1, isIndexEqualThreeAndThisObjectHasMyPropDefined)
    )
  ).toEqual([false, false, false, false, false, false, false]);

  expect(
    [2, 4, 3, 5, 0, 3, 3].map(
      nthMatch(1, isIndexEqualThreeAndThisObjectHasMyPropDefined),
      customThis
    )
  ).toEqual([false, false, false, true, false, false, false]);
});
