"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const txt = `Begin of a file 
/** 
Not so important stuff.

 [footer]  
this is a footer section
 */  
some text...`;
const lines = txt.split('\n');
// prettier-ignore
const linesInsideABlockComment = lines.filter((0, src_1.switchTrueFalse)((0, src_1.nthElementAfter)(1, s => /\/\*\*/i.test(s)), // start to "return true" one line after a `/*`
// start to "return true" one line after a `/*`
s => /\*\//i.test(s) // start to "return false" on a line with `*/`
));
console.log('Inside of a comment:', linesInsideABlockComment);
// ------------------------
const isEven = (x) => x % 2 === 0;
const result0 = [2, 3, 5, 7, 4, 1].map(isEven);
console.log('result0:', result0);
//=> result0: [ false, true, false, false, true, false ]
const isThree = (x) => x === 3;
const result1 = [2, 3, 0, 7, 4, 3, 5, -8].filter((0, src_1.nthElementAfter)(2, isThree));
console.log('result1:', result1);
//=> result1: [ 7, -8 ]
// ------------------------
// const isZero = (x: number) => x === 0;
// const isMinusOne = (x: number) => x === -1;
const trueBlocksOfNumbers = [2, 1, 0, 4, 9, -1, 7, 0, 3].filter((0, src_1.switchTrueFalse)((x) => x === 0, (x) => x === -1));
console.log(trueBlocksOfNumbers);
//=> [ 0, 4, 9, 0, 3 ]
console.log('----------------');
const input = `
  /** 
   * greaterThanOne
   * @param x number value
   * @returns true if x is greater than one, false otherwise
   */
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
const docCommentPredicate = () => (0, src_1.switchTrueFalse)(s => /\/\*\*/.test(s), // true at '/**' (begin-mark)
(0, src_1.nthElementAfter)(1, s => /\*\//.test(s)) // false after '*/' (end-mark)
);
// prettier-ignore
const onlyDocComments = input
    .split('\n')
    .filter(docCommentPredicate())
    .join('\n');
console.log(onlyDocComments);
//=> /**
//    * greaterThanOne
//    * @param x number value
//    * @returns true if x is greater than one, false otherwise
//    */
//   /**
//    * An increment function
//    * @param x number value
//    * @returns that value incremented by one
//    */
//# sourceMappingURL=examples.js.map