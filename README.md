# iter

# usage

## forEach

```typescript
import "iter";

const items = [3, 6, 5, 7, 3, 0];
for (const item of items.iter().filter(item => item % 2 === 0)) {
  console.log(item);
}
// 6
// 3
```

## toArray

```typescript
import "iter";

const items = [3, 6, 5, 7, 3, 0];
const result = items
  .iter()
  .map(item => item * 2)
  .toArray();
console.log(result); // [6, 12, 10, 14, 6, 0]
```

## chunk

```typescript
import "iter";

const items = [3, 6, 5, 7, 3, 0];
for (const item of items.chunk(2)) {
  console.log(item);
}
// [3, 6]
// [5, 7]
// [3, 0]
```

## infinite

```typescript
import { iter } from "iter";

for (const index of iter.range(1, 5)) {
  console.log(index);
}
// 1
// 2
// 3
// 4
```
