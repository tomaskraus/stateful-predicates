import {trueSince} from '../src/truesince';

const txt = `Begin of a file 
Not so important stuff.

 [footer]  
this is a footer section

some text...`;

const lines = txt.split('\n');
const footerLines = lines.filter(trueSince(s => /\[footer]/i.test(s)));

console.log(footerLines);
