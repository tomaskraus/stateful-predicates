![build](https://github.com/tomaskraus/stateful-predicates/actions/workflows/node.js.yml/badge.svg)
[![codecov](https://codecov.io/gh/tomaskraus/stateful-predicates/branch/main/graph/badge.svg?token=MDg1JIIPnx)](https://codecov.io/gh/tomaskraus/stateful-predicates)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

# stateful-predicates

Carefully selected, minimalistic collection of predicate wrappers.  
`stateful-predicates ` bring new power to standard _predicates_, required by [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), [RxJS](https://rxjs.dev/api/operators/takeWhile) or other methods/libraries that use predicates.

Predicate list:

- [switchTrueFalse](#switchtruefalse)
- [nthElementAfter](#nthelementafter)
- [nthMatch](#nthmatch)
- [onChange](#onchange)

**Example**: Get an inside of a block documetation comment:

```ts
import {switchTrueFalse, nthElementAfter} from 'stateful-predicates';

// prettier-ignore
const linesInsideADocBlockComment = lines.filter(
    switchTrueFalse(
      nthElementAfter(1,        // start to "return true" one line after a `/**`
        s => /\/\*\*/i.test(s)
      ),  
      s => /\*\//i.test(s)      // start to "return false" on a line with `*/`
    )
  );
```

see a [complete example](#complete-example)

`stateful-predicates` library is all about [predicates](#tpredicate) applied to **elements** of some **list**. That list is typically an [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#iterables).  
When a _predicate_ is applied to an _element_, that _predicate_ can either **succeed** on that _element_ (i.e. **match** that _element_), or not.

## Why to use

- No state variable mess as it uses _closures_ to preserve the state.
- Functional programming friendly.
- Typed. With `d.ts` for Javascript.
- Well tested. 100% code coverage.

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

Returns a predicate(value, index) `P` that fulfills the following:

1.  `P` stays _true_ "on and after" `predicateForTrue` has succeeded on some element
2.  `P` becomes _false_ again "on and after" `predicateForFalse` has succeeded on some element that follows.  
    At the beginning, `P` is _false_.
3.  `P` is **reusable**: able to switch _true_/_false_ multiple times.
4.  `P` is **greedy**:

- switches to _true_ on the first of consecutive elements `predicateForTrue` can succeed
- switches to _false_ on the first of consecutive elements `predicateForFalse` can succeed

**Example**:

```ts
const elementsEnclosedByZeroAndMinusOne = [2, 1, 0, 0, 5, 9, -1, -1, 7].filter(
  switchTrueFalse(
    x => x === 0,
    x => x === -1
  )
);
console.log(elementsEnclosedByZeroAndMinusOne);
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

- returns _true_ if its `parentPredicate` has "succeeded at element" `offset` number of elements before.

**Example**:

```ts
const isThree = (x: number) => x === 3;
const secondElemsAfter3 = [2, 3, 0, 7, 4, 3, 5, -8].filter(
  nthElementAfter(2, isThree)
);
console.log(secondElemsAfter3);
//=> [ 7, -8 ]
```

It kind of shifts (or delays) the succesful element evaluation.

- `P` is **greedy**: tries to succeed as soon as possible. If there are more elements within the "`offset` range" `parentPredicate` could succeed, they are not recognized.
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

- returns _true_ if its `parentPredicate` has succeeded `n` times

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

Show only documentation comments from a source code input text:

```ts
import {switchTrueFalse, nthElementAfter} from 'stateful-predicates';

const input = `
  /** 
   * greaterThanOne
   * @param x number value
   * @returns true if x is greater than one, false otherwise
   */
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
    s => /\/\*\*/.test(s), // true at '/**' (begin-mark)
    nthElementAfter(1, s => /\*\//.test(s)) // false after '*/' (end-mark)
  );

// prettier-ignore
const onlyDocComments = input
  .split('\n')
  .filter(docCommentPredicate())
  .join('\n');
console.log(onlyDocComments);
//=> /**
//    * greaterThanOne
//    * @param x number value
//    * @returns true if x is greater than one, false otherwise
//    */
//   /**
//    * An increment function
//    * @param x number value
//    * @returns that value incremented by one
//    */
```
