export const skipBy = <T>(
  items: Iterable<T>,
  f: (item: T, index: number) => boolean
) =>
  function*() {
    let index = 0;
    for (const item of items) {
      if (f(item, index)) {
        yield item;
        index += 1;
      }
    }
  };
