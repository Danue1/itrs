import { Option } from "../types";

export const scanBy = <T, S>(
  items: Iterable<T>,
  initialState: S,
  f: (state: S, item: T, index: number) => Option<S>
) =>
  function*() {
    let index = 0;
    for (const item of items) {
      const result = f(initialState, item, index);
      if (result.type === "None") {
        break;
      }
      initialState = result.value;
      yield initialState;
      index += 1;
    }
  };
