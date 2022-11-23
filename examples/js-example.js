const {trueSince, trueOneAfter, switchTrueFalse} = require('../build/src');

const txt = `Begin of a file 
Not so important stuff.

 [footer]  
this is a footer section

some text 4...`;

const lines = txt.split('\n');
// prettier-ignore
const footerLines = lines.filter(
    trueSince(s => /\[footer]/i.test(s))
  );

console.log(footerLines);

const isEqualToThree = x => x === 3;

const res = [2, 4, 3, 5, 0, 3, 3].filter(trueSince(isEqualToThree));
console.log(res);
//=> [ 3, 5, 0, 3, 3 ]

const isZero = x => x === 0;
const isMinusOne = x => x === -1;

const trueBlocksOfNumbers = [2, 1, 0, 4, 9, -1, 7, 0, 3].filter(
  switchTrueFalse(isZero, isMinusOne)
);
console.log(trueBlocksOfNumbers);
//=> [ 0, 4, 9, 0, 3 ]
const trueBlocksOfNumbersExcl = [2, 1, 0, 4, 9, -1, 7, 0, 3].filter(
  switchTrueFalse(trueOneAfter(isZero), isMinusOne)
);
console.log(trueBlocksOfNumbersExcl);
//=> [ 4, 9, 3 ]
