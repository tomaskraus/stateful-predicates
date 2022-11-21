const SP = require('../build/src/truesince');

const trueSince = SP.trueSince;

const txt = `Begin of a file 
Not so important stuff.

 [footer]  
this is a footer section

some text 4...`;

const lines = txt.split('\n');
// prettier-ignore
const footerLines = lines.filter(
    SP.trueSince(s => /\[footer]/i.test(s))
  );

console.log(footerLines);

const isEqualToThree = x => x === 3;

const res = [2, 4, 3, 5, 0, 3, 3].filter(trueSince(isEqualToThree));
console.log(res);
//=> [ 3, 5, 0, 3, 3 ]
