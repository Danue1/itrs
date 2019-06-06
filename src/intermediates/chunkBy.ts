export const chunkBy = <T>(
  items: Iterable<T>,
  f: (item: T, index: number) => boolean
) =>
  function*() {
    let index = 0;
    let cache: T[] = [];
    for (const item of items) {
      if (f(item, index)) {
        yield cache;
        cache = [];
      } else {
        cache.push(item);
      }
      index += 1;
    }
    if (cache.length) {
      yield cache;
    }
  };
