import {switchTrueFalse} from '../src/switchtruefalse';
import {
  isZero,
  isMinusOne,
  isIndexEqualThree,
  isIndexEqualThreeAndThisObjectHasMyPropDefined,
  customThis,
} from './helpers';

import {trueSince} from '../src/truesince';
import type {TPredicate} from './util/predicate';

test('switchTrueFalse', () => {
  expect([2, 0, 3, -1, 1].map(switchTrueFalse(isZero, isMinusOne))).toEqual([
    false,
    true,
    true,
    false,
    false,
  ]);
});

test('switchTrueFalse - index', () => {
  expect(
    [2, 4, 3, 5, -1, 2].map(switchTrueFalse(isIndexEqualThree, isMinusOne))
  ).toEqual([false, false, false, true, false, false]);
});

test('switchTrueFalse - proper closure', () => {
  expect([0, 4, 3, 5, -1].map(switchTrueFalse(isZero, isMinusOne))).toEqual([
    true,
    true,
    true,
    true,
    false,
  ]);

  expect([3, 0, 0].map(switchTrueFalse(isZero, isMinusOne))).toEqual([
    false,
    true,
    true,
  ]);
});

test('switchTrueFalse - proper closure - index', () => {
  expect(
    [0, 4, 3, 5, 0].map(switchTrueFalse(isZero, isIndexEqualThree))
  ).toEqual([true, true, true, false, true]);

  expect(
    [3, 2, 0, 6, 2].map(switchTrueFalse(isZero, isIndexEqualThree))
  ).toEqual([false, false, true, false, false]);
});

test('switchTrueFalse - shared closure - index', () => {
  const sharedPpredicate = switchTrueFalse(isZero, isIndexEqualThree);
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
  expect(
    [2, 4, 3, 5, 2, 3, -1, 2].map(
      switchTrueFalse(
        isIndexEqualThreeAndThisObjectHasMyPropDefined,
        isMinusOne
      )
    )
  ).toEqual([false, false, false, false, false, false, false, false]);

  expect(
    [2, 4, 3, 5, 2, 3, -1, 2].map(
      switchTrueFalse(
        isIndexEqualThreeAndThisObjectHasMyPropDefined,
        isMinusOne
      ),
      customThis
    )
  ).toEqual([false, false, false, true, true, true, false, false]);
});

// --------------------------------------------------------------

test('switchTrueFalse - full match', () => {
  expect([0, 4, 6, 5].map(switchTrueFalse(isZero, isMinusOne))).toEqual([
    true,
    true,
    true,
    true,
  ]);
});

test('switchTrueFalse - only false match', () => {
  expect([3, -1, 6, 5].map(switchTrueFalse(isZero, isMinusOne))).toEqual([
    false,
    false,
    false,
    false,
  ]);
});

test('switchTrueFalse - no match', () => {
  expect([2, 4, 6, 5].map(switchTrueFalse(isZero, isMinusOne))).toEqual([
    false,
    false,
    false,
    false,
  ]);
});

test('switchTrueFalse - more isolated matches', () => {
  expect(
    [3, 0, 6, -1, 2, 0, -1, 3].map(switchTrueFalse(isZero, isMinusOne))
  ).toEqual([false, true, true, false, false, true, false, false]);
});

test('switchTrueFalse - adjacent matches', () => {
  expect(
    [3, 0, 6, -1, 0, -1, 3].map(switchTrueFalse(isZero, isMinusOne))
  ).toEqual([false, true, true, false, true, false, false]);
});

test('switchTrueFalse - greedy behavior', () => {
  expect(
    [3, 0, 0, 2, 0, -1, -1, 2, -1].map(switchTrueFalse(isZero, isMinusOne))
  ).toEqual([false, true, true, true, true, false, false, false, false]);
});

test('switchTrueFalse - alternates output if both predicates are the same', () => {
  expect([0, 0, 0, 2, 0, 0].map(switchTrueFalse(isZero, isZero))).toEqual([
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
  function trueSince2<T>(predicate: TPredicate<T>) {
    return switchTrueFalse(predicate, () => false);
  }
  const nums = [2, 4, 3, 5, 0, 3, 3];
  expect(nums.filter(trueSince2(isIndexEqualThree))).toEqual(
    nums.filter(trueSince(isIndexEqualThree))
  );
});
