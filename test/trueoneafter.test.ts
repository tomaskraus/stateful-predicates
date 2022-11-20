import {trueOneAfter} from '../src/trueoneafter';
import {
  isEqualToThree,
  isIndexEqualThree,
  isIndexEqualThreeAndThisObjectHasMyPropDefined,
  customThis,
} from './helpers';

test('trueOneAfter', () => {
  expect([2, 4, 3, 5, 0].map(trueOneAfter(isEqualToThree))).toEqual([
    false,
    false,
    false,
    true,
    false,
  ]);
});

test('trueOneAfter - index', () => {
  expect([2, 4, 3, 5, 0, 2].map(trueOneAfter(isIndexEqualThree))).toEqual([
    false,
    false,
    false,
    false,
    true,
    false,
  ]);
});

test('trueOneAfter - proper closure', () => {
  expect([2, 4, 3, 5, 0].map(trueOneAfter(isEqualToThree))).toEqual([
    false,
    false,
    false,
    true,
    false,
  ]);

  expect([3, 5, 0].map(trueOneAfter(isEqualToThree))).toEqual([
    false,
    true,
    false,
  ]);
});

test('trueOneAfter - proper closure - index', () => {
  expect([2, 4, 3, 5, 0].map(trueOneAfter(isIndexEqualThree))).toEqual([
    false,
    false,
    false,
    false,
    true,
  ]);

  expect([3, 5, 0, 1, 2, 4].map(trueOneAfter(isIndexEqualThree))).toEqual([
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
  expect(
    [2, 4, 3, 5, 0, 3, 3].map(
      trueOneAfter(isIndexEqualThreeAndThisObjectHasMyPropDefined)
    )
  ).toEqual([false, false, false, false, false, false, false]);

  expect(
    [2, 4, 3, 5, 0, 3, 3].map(
      trueOneAfter(isIndexEqualThreeAndThisObjectHasMyPropDefined),
      customThis
    )
  ).toEqual([false, false, false, false, true, false, false]);
});

// --------------------------------------------------------------

test('trueOneAfter - no match', () => {
  expect([2, 4, 6, 5, 0].map(trueOneAfter(isEqualToThree))).toEqual([
    false,
    false,
    false,
    false,
    false,
  ]);
});

test('trueOneAfter - more isolated matches', () => {
  expect([3, 4, 6, 3, 0, 7].map(trueOneAfter(isEqualToThree))).toEqual([
    false,
    true,
    false,
    false,
    true,
    false,
  ]);
});

test('trueOneAfter - greedy behavior', () => {
  expect([2, 3, 3, 3, 0, 4].map(trueOneAfter(isEqualToThree))).toEqual([
    false,
    false,
    true,
    true,
    true,
    false,
  ]);
});
