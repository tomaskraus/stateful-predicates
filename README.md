[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

# stateful-predicate

Bunch of stateful predicate wrappers. Such as trueSince, trueOnChange, trueOneAfter... Typed.

Bring new power to standard predicates, when using Array.filter or other predicate-demanding methods.

Example: We want all lines after a line with "[footer]" tag.

```ts
import {trueSince} from 'stateful-predicates';

const footerLines = lines.filter(trueSince(s => /\[footer]/i.test(s)));
```
