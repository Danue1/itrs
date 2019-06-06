export const takeBy = <T>(
  items: Iterable<T>,
  f: (item: T, index: number) => boolean
) =>
  function*() {
    let index = 0;
    for (const item of items) {
      if (f(item, index)) {
        break;
      }
      yield item;
      index += 1;
    }
  };
