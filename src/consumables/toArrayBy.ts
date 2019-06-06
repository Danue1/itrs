export const toArrayBy = <T, I>(
  items: Iterable<T>,
  f: (item: T, index: number) => I
) => {
  let index = 0;
  const result: I[] = [];
  for (const item of items) {
    result.push(f(item, index));
    index += 1;
  }
  return result;
};
