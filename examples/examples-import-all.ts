import * as S from '../src/truesince';

const txt = `Begin of a file 
Not so important stuff.

 [footer]  
this is a footer section

some text 0...`;

const lines = txt.split('\n');
// prettier-ignore
const footerLines = lines.filter(
    S.trueSince(s => /\[footer]/i.test(s))
  );

console.log(footerLines);
