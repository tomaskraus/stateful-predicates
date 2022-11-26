import * as SP from '../src';

const txt = `Begin of a file 
/** 
Not so important stuff.

 [footer]  
this is a footer section
 */  
some text...`;

const lines = txt.split('\n');
// prettier-ignore
const linesInsideABlockComment = lines.filter(
  SP.switchTrueFalse(
    SP.nthElementAfter(1, s => /\/\*/i.test(s)),   // start to "return true" one line after a `/*`
    s => /\*\//i.test(s)                        // start to "return false" on a line with `*/`
  )
);

console.log(linesInsideABlockComment);
