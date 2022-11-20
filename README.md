[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

# stateful-predicates

Bunch of stateful predicate wrappers. Such as trueSince, trueOnChange, trueOneAfter... Typed.

## Why to use

Bring new power to standard predicates, when using Array.filter or other predicate-demanding methods.

**Example**: We want only lines after (and with) a line that contains a "[footer]" tag.

```ts
import {trueSince} from 'stateful-predicates';

const footerLines = lines.filter(trueSince(s => /\[footer]/i.test(s)));
```
