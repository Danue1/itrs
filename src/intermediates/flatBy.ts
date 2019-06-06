export const flatBy = <T, I>(
  items: Iterable<T>,
  f: (item: T, index: number) => I
) =>
  function*() {
    let index = 0;
    for (const item of items) {
      const nextItem = f(item, index);
      yield* Array.isArray(nextItem) ? nextItem : [nextItem];
      index += 1;
    }
  };
