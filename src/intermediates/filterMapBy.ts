import { Option } from "../types";

export const filterMapBy = <T, I>(
  items: Iterable<T>,
  f: (item: T, index: number) => Option<I>
) =>
  function*() {
    let index = 0;
    for (const item of items) {
      const result = f(item, index);
      if (result.type === "Some") {
        index += 1;
        yield result.value;
      }
    }
  };
