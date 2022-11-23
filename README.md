[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

# stateful-predicates

Bunch of (typed) stateful predicate wrappers:

- trueSince
- trueOneAfter
- switchTrueFalse
- trueOnChange

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

### TPredicate

Entire `stateful-predicates` library is about predicates:

```ts
type TPredicate<T> = (value: T, index: number) => boolean;
```

Predicate is a function, that accepts some value and returns a boolean value, based on its condition.

It's something you can pass as callback to [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) or [RxJS](https://rxjs.dev/api/operators/takeWhile) operators.

Almost every function of `stateful-predicates` library accepts a `PredicateType` argument and returns another `PredicateType` value.

### trueSince

```ts
function trueSince<T>(predicate: TPredicate<T>): TPredicate<T>;
```

Returns a predicate that returns true since its predicate arguments succeeded.  
That is, after that, in every next call, this predicate always returns true.

**Example**:

```ts
const isEqualToThree = x => x === 3;

const res = [2, 4, 3, 5, 0, 3, 3].filter(trueSince(isEqualToThree));
console.log(res);
//=> [ 3, 5, 0, 3, 3 ]
```

### trueOneAfter

```ts
function trueOneAfter<T>(predicate: TPredicate<T>): TPredicate<T>;
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

### switchTrueFalse

```ts
function switchTrueFalse<T>(
  predicateForTrue: TPredicate<T>,
  predicateForFalse: TPredicate<T>
): TPredicate<T>;
```

Predicate that stays true "on and after" `predicateForTrue` is successful.  
Is false at the beginning, and become false again "on and after" `predicateForFalse` is successful.  
`switchTrueFalse` is able to switch multiple times.

**Example**:

```ts
const trueBlocksOfNumbers = [2, 1, 0, 4, 9, -1, 7, 0, 3].filter(
  switchTrueFalse(
    (x: number) => x === 0,
    (x: number) => x === -1
  )
);
console.log(trueBlocksOfNumbers);
//=> [ 0, 4, 9, 0, 3 ]
```
