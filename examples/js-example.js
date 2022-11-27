const {
  nthElementAfter,
  switchTrueFalse,
  nthMatch,
  onChange,
} = require('../build/src');

const input = `
  /** 
   * fn1
   * not very useful
   */
  function greaterThanOne(x: number): boolean {
    return x > 1;
  }

  /**
   * An increment function
   * @param x number value
   * @returns that value incremented by one
   */
  const inc = (x: number) => ++x;`;

const docCommentPredicate = () =>
  switchTrueFalse(
    s => /\/\*\*/.test(s), // true at begin-mark
    nthElementAfter(1, s => /\*\//.test(s))
  ); // false after end-mark

// prettier-ignore
const onlyDocComments = input
  .split('\n')
  .filter(docCommentPredicate())
  .join('\n');
console.log(onlyDocComments);

// -------------------------------------

const isZero = x => x === 0;
const isMinusOne = x => x === -1;

const elementsBetweenZeroAndMinusOne = [2, 1, 0, 0, 5, 9, -1, -1, 7].filter(
  switchTrueFalse(
    x => x === 0,
    x => x === -1
  )
);
console.log(elementsBetweenZeroAndMinusOne);
//=> [ 0, 0, 5, 9 ]

const trueBlocksOfNumbersExcl = [2, 1, 0, 4, 9, -1, 7, 0, 3].filter(
  switchTrueFalse(nthElementAfter(1, isZero), isMinusOne)
);
console.log(trueBlocksOfNumbersExcl);
//=> [ 4, 9, 3 ]

const elemsAfterZeros = [3, 0, 15, 0, 0, 4].filter(
  nthElementAfter(1, x => x === 0)
);
console.log(elemsAfterZeros);
//=> [ 15, 0 ]

const result = [3, 2, 2, 2, 5, 1].map(nthElementAfter(1, x => x === 2));
console.log(result);
//=> [ false, false, true, false, true, false ]

const isThree = x => x === 3;
const secondElemsAfter3 = [2, 3, 0, 7, 4, 3, 5, -8].filter(
  nthElementAfter(2, isThree)
);
console.log(secondElemsAfter3);

const changes = [2, 3, 3, 3, 4, 3, 5, -8].map(onChange(isThree));
console.log(changes);
//=> [ false, true, false, false, true, true, true, false ]

const isEven = x => x % 2 === 0;
const secondMatchingElem = [2, 3, 5, 4, 8, 5, -8].filter(nthMatch(2, isEven));
console.log(secondMatchingElem);
//=> [ 4 ]
