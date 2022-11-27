![build](https://github.com/tomaskraus/stateful-predicates/actions/workflows/node.js.yml/badge.svg)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

# stateful-predicates

Bunch of (typed) stateful predicate wrappers:

- [switchTrueFalse](#switchtruefalse)
- [nthElementAfter](#nthelementafter)
- [nthMatch](#nthmatch)
- [onChange](#onchange)

## Why to use

Bring new power to standard predicates, when using Array.filter or other predicate-demanding methods.

**Example**: Get an inside of a block documetation comment:

```ts
import {switchTrueFalse, nthElementAfter} from 'stateful-predicates';

// prettier-ignore
const linesInsideADocBlockComment = lines.filter(
    switchTrueFalse(
      nthElementAfter(1, s => /\/\*\*/i.test(s)),   // start to "return true" one line after a `/**`
      s => /\*\//i.test(s)                        // start to "return false" on a line with `*/`
    )
  );
```

see a [complete example](#complete-example)

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

Almost every function of `stateful-predicates` library accepts at least one `TPredicate` argument and returns another `TPredicate` value.

### switchTrueFalse

```ts
function switchTrueFalse<T>(
  predicateForTrue: TPredicate<T>,
  predicateForFalse: TPredicate<T>
): TPredicate<T>;
```

Returns a predicate(value, index) `P` that:

1.  Stays _true_ "on and after" `predicateForTrue` is successful on its `value`/`index` arguments
2.  Becomes _false_ again "on and after" `predicateForFalse` is successful on its `value`/`index` arguments
    At the beginning, that predicate is false.
3.  Is **reusable**: able to switch _true_/_false_ multiple times.
4.  Is **greedy**:

- switches to _true_ on the first of consecutive elements `predicateForTrue` can match
- switches to _false_ on the first of consecutive elements `predicateForFalse` can match

**Example**:

```ts
const elementsBetweenZeroAndMinusOne = [2, 1, 0, 0, 5, 9, -1, -1, 7].filter(
  switchTrueFalse(
    x => x === 0,
    x => x === -1
  )
);
console.log(elementsBetweenZeroAndMinusOne);
//=> [ 0, 0, 5, 9 ]
```

### nthElementAfter

```ts
function nthElementAfter<T>(
  offset: number,
  parentPredicate: TPredicate<T>
): TPredicate<T>;
```

Returns predicate(value, index) `P`, that:

- returns _true_ if its `parentPredicate` has succeeded at element `offset` number of elements before.

**Example**:

```ts
const isThree = (x: number) => x === 3;
const secondElemsAfter3 = [2, 3, 0, 7, 4, 3, 5, -8].filter(
  nthElementAfter(2, isThree)
);
console.log(secondElemsAfter3);
//=> [ 7, -8 ]
```

- `P` is **greedy**: tries to match as soon as possible. If there are more elements within the "`offset` range" `parentPredicate` could match, they are not recognized.
- `P` is **repeatable**: is ready to detect elements again as soon as it is at least `offset` elements after its last detected element.

```ts
const result = [3, 2, 2, 2, 5, 1].map(nthElementAfter(1, x => x === 2));
console.log(result);
//=> [ false, false, true, false, true, false ]
```

### nthMatch

```ts
function nthMatch<T>(n: number, parentPredicate: TPredicate<T>): TPredicate<T>;
```

Returns predicate(value, index) `P`, that:

- returns _true_ if its `parentPredicate` has succeeded exactly on `n` elements

**Example**:

```ts
const isEven = x => x % 2 === 0;
const secondMatchingElem = [2, 3, 5, 4, 8, 5, -8].filter(nthMatch(2, isEven));
console.log(secondMatchingElem);
//=> [ 4 ]`
```

### onChange

```ts
function onChange<T>(parentPredicate: TPredicate<T>): TPredicate<T>;
```

Returns predicate(value, index) `P`, that:

- returns _true_ whenever its `parentPredicate` changes value - i.e. result of `parent predicate` differs from `P`'s internal state.

At the begin, the internal state of `P` is _false_.

**Example**:

```ts
const isThree = (x: number) => x === 3;
const changes = [2, 3, 3, 3, 4, 3, 5, -8].map(onChange(isThree));
console.log(changes);
//=> [ false, true, false, false, true, true, true, false ]
```

## Complete Example

Show only documentation comments from _TypeScript_ input text:

```ts
import {switchTrueFalse, nthElementAfter} from 'stateful-predicates';

const input = `
  /** 
   * fn1
   * not very useful
   */
  function greaterThanOne(x: number): boolean {
    return x > 1;
  }

  /**
   * An increment function
   * @param x number value
   * @returns that value incremented by one
   */
  const inc = (x: number) => ++x;`;

const docCommentPredicate = () =>
  switchTrueFalse<string>(
    s => /\/\*\*/.test(s), // true at begin-mark
    nthElementAfter(1, s => /\*\//.test(s)) // false after end-mark
  );

// prettier-ignore
const onlyDocComments = input
  .split('\n')
  .filter(docCommentPredicate())
  .join('\n');
console.log(onlyDocComments);
//=> /**
//    * fn1
//    * not very useful
//    */
//   /**
//    * An increment function
//    * @param x number value
//    * @returns that value incremented by one
//    */
```
