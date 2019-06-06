export const windows = <T>(items: Iterable<T>, size: number) =>
  function*() {
    let cache: T[] = [];
    for (const item of items) {
      cache = cache.slice(1, size);
      cache.push(item);
      if (cache.length === size) {
        yield cache;
      }
    }
  };
