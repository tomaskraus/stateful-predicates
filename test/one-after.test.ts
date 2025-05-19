import {oneAfter} from '../src/one-after';
import {
  isEqualToThree,
  isIndexEqualThree,
  isIndexEqualThreeAndThisObjectHasMyPropDefined,
  customThis,
} from './helpers';

test('oneAfter', () => {
  expect([2, 4, 3, 5, 0].map(oneAfter(isEqualToThree))).toEqual([
    false,
    false,
    false,
    true,
    false,
  ]);
});

test('oneAfter - no match', () => {
  expect([2, 4, 6, 5, 0].map(oneAfter(isEqualToThree))).toEqual([
    false,
    false,
    false,
    false,
    false,
  ]);
});

test('oneAfter - more isolated matches', () => {
  expect([3, 4, 6, 3, 0, 7].map(oneAfter(isEqualToThree))).toEqual([
    false,
    true,
    false,
    false,
    true,
    false,
  ]);
});

test('oneAfter - consecutive inner matches result in consecutive oneAfter matches', () => {
  expect([1, 3, 3, 1, 1, 1].map(oneAfter(isEqualToThree))).toEqual([
    false,
    false,
    true,
    true,
    false,
    false,
  ]);
});

// --------------------------------------------------------------

test('oneAfter - index', () => {
  expect([2, 4, 3, 5, 0, 2].map(oneAfter(isIndexEqualThree))).toEqual([
    false,
    false,
    false,
    false,
    true,
    false,
  ]);
});

test('oneAfter - proper closure', () => {
  expect([2, 4, 3, 5, 0].map(oneAfter(isEqualToThree))).toEqual([
    false,
    false,
    false,
    true,
    false,
  ]);

  expect([3, 5, 0].map(oneAfter(isEqualToThree))).toEqual([false, true, false]);
});

test('oneAfter - proper closure - index', () => {
  expect([2, 4, 3, 5, 0].map(oneAfter(isIndexEqualThree))).toEqual([
    false,
    false,
    false,
    false,
    true,
  ]);

  expect([3, 5, 0, 1, 2, 4].map(oneAfter(isIndexEqualThree))).toEqual([
    false,
    false,
    false,
    false,
    true,
    false,
  ]);
});

test('oneAfter - this', () => {
  // without explicit this
  expect(
    [2, 4, 3, 5, 0, 3, 3].map(
      oneAfter(isIndexEqualThreeAndThisObjectHasMyPropDefined)
    )
  ).toEqual([false, false, false, false, false, false, false]);

  expect(
    [2, 4, 3, 5, 0, 3, 3].map(
      oneAfter(isIndexEqualThreeAndThisObjectHasMyPropDefined),
      customThis
    )
  ).toEqual([false, false, false, false, true, false, false]);
});
