export const chain = <T>(
  previousIterable: Iterable<T>,
  nextIterable: Iterable<T>
) =>
  function*() {
    yield* previousIterable;
    yield* nextIterable;
  };
