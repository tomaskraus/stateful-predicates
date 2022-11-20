[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

# stateful-predicates

Bunch of (typed) stateful predicate wrappers:

- trueSince
- trueOneAfter
- trueOnChange
- switchOnOff

## Why to use

Bring new power to standard predicates, when using Array.filter or other predicate-demanding methods.

**Example**: We want only lines after (and with) a line that contains a "[footer]" tag.

```ts
import {trueSince} from 'stateful-predicates';

// prettier-ignore
const footerLines = lines.filter(
    trueSince(s => /\[footer]/i.test(s))
  );
```

## Installation

```bash
$ npm install stateful-predicates
```

## Usage

Typescript / ES module:

```ts
import * as SP from 'stateful-predicates';
```

Javascript / CommonJS:

```js
const SP = require('stateful-predicates');
```

## API

### trueOneAfter

```ts
function trueOneAfter<T>(predicate: PredicateType<T>): PredicateType<T>;
```

Predicate that returns true for one element after its predicate argument succeeded.

**Example**:

```ts
const isEven = (x: number) => x % 2 === 0;

const result0 = [3, 2, 5, 7, 4, 1].map(isEven);
console.log('result0:', result0);
//=> result0: [ false, true, false, false, true, false ]
const result1 = [3, 2, 5, 7, 4, 1].map(trueOneAfter(isEven));
console.log('result1:', result1);
//=> result1: [ false, false, true, false, false, true ]
```

`trueOneAfter` is greedy: for several consecutive success-elements, `trueAfterOne` detects the first of them and returns true on the second one, and so on.

`trueOneAfter` returns true as nearly (and as long) as its predicate argument succeeded at previous element:

```ts
const isEven = (x: number) => x % 2 === 0;

const result = [3, 2, 4, 2, 5, 1].map(trueOneAfter(isEven));
console.log(result);
//=> [ false, false, true, true, true, false ]
```
