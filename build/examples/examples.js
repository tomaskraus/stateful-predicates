"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const truesince_1 = require("../src/truesince");
const txt = `Begin of a file 
Not so important stuff.

 [footer]  
this is a footer section

some text...`;
const lines = txt.split('\n');
// prettier-ignore
const footerLines = lines.filter((0, truesince_1.trueSince)(s => /\[footer]/i.test(s)));
console.log(footerLines);
//# sourceMappingURL=examples.js.map