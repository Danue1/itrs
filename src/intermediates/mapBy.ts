export const mapBy = <T, N>(
  items: Iterable<T>,
  f: (item: T, index: number) => N
) =>
  function*() {
    let index = 0;
    for (const item of items) {
      yield f(item, index);
      index += 1;
    }
  };
