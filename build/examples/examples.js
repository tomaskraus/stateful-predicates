"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const txt = `Begin of a file 
Not so important stuff.

 [footer]  
this is a footer section

some text...`;
const lines = txt.split('\n');
// prettier-ignore
const footerLinesInclude = lines.filter((0, src_1.trueSince)(s => /\[footer]/i.test(s)));
console.log('footer lines include:', footerLinesInclude);
const footerLines = lines.filter((0, src_1.trueSince)((0, src_1.trueOneAfter)(s => /\[footer]/i.test(s))));
console.log('footer lines:', footerLines);
// ------------------------
const isEven = (x) => x % 2 === 0;
const result0 = [3, 2, 5, 7, 4, 1].map(isEven);
console.log('result0:', result0);
//=> result0: [ false, true, false, false, true, false ]
const result1 = [3, 2, 5, 7, 4, 1].map((0, src_1.trueOneAfter)(isEven));
console.log('result1:', result1);
//=> result1: [ false, false, true, false, false, true ]
//# sourceMappingURL=examples.js.map