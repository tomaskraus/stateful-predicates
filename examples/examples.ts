import {trueSince, trueOneAfter, switchTrueFalse} from '../src';

const txt = `Begin of a file 
Not so important stuff.

 [footer]  
this is a footer section

some text...`;

const lines = txt.split('\n');
// prettier-ignore
const footerLinesInclude = lines.filter(
    trueSince(s => /\[footer]/i.test(s))
  );

console.log('footer lines include:', footerLinesInclude);

const footerLines = lines.filter(
  trueSince(trueOneAfter(s => /\[footer]/i.test(s)))
);

console.log('footer lines:', footerLines);

// ------------------------

const isEven = (x: number) => x % 2 === 0;

const result0 = [3, 2, 5, 7, 4, 1].map(isEven);
console.log('result0:', result0);
//=> result0: [ false, true, false, false, true, false ]
const result1 = [3, 2, 5, 7, 4, 1].map(trueOneAfter(isEven));
console.log('result1:', result1);
//=> result1: [ false, false, true, false, false, true ]

// ------------------------

// const isZero = (x: number) => x === 0;
// const isMinusOne = (x: number) => x === -1;

const trueBlocksOfNumbers = [2, 1, 0, 4, 9, -1, 7, 0, 3].filter(
  switchTrueFalse(
    (x: number) => x === 0,
    (x: number) => x === -1
  )
);
console.log(trueBlocksOfNumbers);
//=> [ 0, 4, 9, 0, 3 ]

console.log('----------------');

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
  switchTrueFalse<string>(
    s => /\/\*\*/.test(s), // true at begin-mark
    trueOneAfter(s => /\*\//.test(s)) // false after end-mark
  );

// prettier-ignore
const onlyDocComments = input
  .split('\n')
  .filter(docCommentPredicate())
  .join('\n');
console.log(onlyDocComments);
//=> /**
//    * fn1
//    * not very useful
//    */
//   /**
//    * An increment function
//    * @param x number value
//    * @returns that value incremented by one
//    */
