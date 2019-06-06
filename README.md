# itrs

ES6 Iteration Protocol based Functional Programming Library

Want you have a pretty document? [Please, PR it](https://github.com/Danue1/itrs/pulls).

# usage

## forEach

```typescript
import { itrs } from "itrs";

const items = [3, 6, 5, 7, 3, 0];
for (const item of itrs(items).filter(item => item % 2 === 0)) {
  console.log(item);
}
// 6
// 3
```

## toArray

```typescript
import { itrs } from "itrs";

const items = [3, 6, 5, 7, 3, 0];
const result = itrs(items)
  .map(item => item * 2)
  .toArray();
console.log(result); // [6, 12, 10, 14, 6, 0]
```

## chunk

```typescript
import { itrs } from "itrs";

const items = [3, 6, 5, 7, 3, 0];
for (const item of itrs(items).chunk(2)) {
  console.log(item);
}
// [3, 6]
// [5, 7]
// [3, 0]
```

## infinite

```typescript
import { itrs } from "itrs";

for (const index of itrs.range(1, 5)) {
  console.log(index);
}
// 1
// 2
// 3
// 4
```
