const {trueSince} = require('../build/src/truesince');

const txt = `Begin of a file 
Not so important stuff.

 [footer]  
this is a footer section

some text 3...`;

const lines = txt.split('\n');
// prettier-ignore
const footerLines = lines.filter(
    trueSince(s => /\[footer]/i.test(s))
  );

console.log(footerLines);
