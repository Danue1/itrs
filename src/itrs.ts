import { Option, Some } from "./types";
import { identity } from "./identity";
import {
  mapBy,
  filterBy,
  filterMapBy,
  takeBy,
  chain,
  chunkBy,
  scanBy,
  flatBy,
  skipBy,
  windows
} from "./intermediates";
import { toArrayBy } from "./consumables";

export const itrs = <T>(items: Iterable<T>) =>
  __itrs(function*() {
    yield* items;
  });

itrs.generate = <T>(f: (index: number) => T) =>
  __itrs(function*() {
    let index = 0;
    while (true) {
      yield f(index);
      index += 1;
    }
  });

itrs.range = (start: number, end: number, step = 1) =>
  __itrs(function*() {
    start = Math.floor(start);
    end = Math.floor(end);

    while (true) {
      yield start;
      start += step;
      if (start > end) {
        break;
      }
    }
  });

const __itrs = <T>(items: () => IterableIterator<T>) => new Itrs(items());

export class BaseItrs<T> {
  public constructor(protected readonly items: IterableIterator<T>) {}

  public *[Symbol.iterator]() {
    yield* this.items;
  }
}

export class IntermediatableItrs<T> extends BaseItrs<T> {
  public scanBy<S>(
    initialItem: S,
    f: (previous: S, item: T, index: number) => Option<S>
  ) {
    return __itrs(scanBy(this.items, initialItem, f));
  }

  public mapBy<N>(f: (item: T, index: number) => N) {
    return __itrs(mapBy(this.items, f));
  }

  public filterBy(f: (item: T, index: number) => boolean) {
    return __itrs(filterBy(this.items, f));
  }

  public filterMap(f: (item: T, index: number) => Option<T>) {
    return __itrs(filterMapBy(this.items, f));
  }

  public flat() {
    return this.flatBy(identity);
  }

  public flatBy<I>(f: (item: T, index: number) => I) {
    return __itrs(flatBy(this.items, f));
  }

  public take(size: number) {
    return this.takeBy((_, index) => index === size);
  }

  public takeBy(f: (item: T, index: number) => boolean) {
    return __itrs(takeBy(this.items, f));
  }

  public skip(item: T) {
    return this.skipBy(current => current === item);
  }

  public skipBy(f: (item: T, index: number) => boolean) {
    return __itrs(skipBy(this.items, f));
  }

  public step(count: number) {
    return this.skipBy((_, index) => index % count === 0);
  }

  public stepBy(count: number, f: (item: T, index: number) => number) {
    return this.skipBy((item, index) => f(item, index) % count === 0);
  }

  public chunk(size: number) {
    console.assert(size > 1);
    return this.chunkBy((_, index) => index % size === size - 1);
  }

  public chunkBy(f: (item: T, index: number) => boolean) {
    return __itrs(chunkBy(this.items, f));
  }

  public windows(size: number) {
    return windows(this.items, size);
  }

  public fold<S>(initialState: S, f: (state: S, item: T, index: number) => S) {
    return this.scanBy(initialState, (state: S, item: T, index: number) =>
      Some(f(state, item, index))
    );
  }

  public enumerate() {
    return __itrs(mapBy(this.items, (item, index) => [item, index]));
  }

  public debug() {
    return this.debugBy(item => console.log(item));
  }

  public debugBy(f: (item: T, index: number) => void) {
    return __itrs(mapBy(this.items, (item, index) => (f(item, index), item)));
  }

  public chain(iterator: Iterable<T>) {
    return __itrs(chain(this.items, iterator));
  }
}

export class ConsumableItrs<T> extends IntermediatableItrs<T> {
  public toArray() {
    return toArrayBy(this, identity);
  }

  public toArrayBy<I>(f: (item: T, index: number) => I) {
    return toArrayBy(this, f);
  }

  public toMap<K>(keyF: (item: T) => K) {
    return this.toMapBy(keyF, identity);
  }

  public toMapBy<K, V>(keyF: (item: T) => K, valueF: (item: T) => V) {
    const map = new Map();
    for (const item of this) {
      map.set(keyF(item), valueF(item));
    }
  }

  public count() {
    return this.countBy(() => true);
  }

  public countBy(f: (item: T) => boolean) {
    let count = 0;
    for (const item of this) {
      if (f(item)) {
        count += 1;
      }
    }
    return count;
  }

  public sum() {
    return this.sumBy(item => +item);
  }

  public sumBy(f: (item: T) => number) {
    let result = 0;
    for (const item of this) {
      result += f(item);
    }
    return result;
  }

  public max() {
    return this.maxBy((a, b) => +a - +b);
  }

  public maxBy(f: (a: T, b: T) => number) {
    let result: null | T = null;
    for (const item of this) {
      if (result === null || f(result, item) > 0) {
        result = item;
      }
    }
    return result;
  }

  public min() {
    return this.minBy((a, b) => +a - +b);
  }

  public minBy(f: (a: T, b: T) => number) {
    let result: null | T = null;
    for (const item of this) {
      if (result === null || f(result, item) < 0) {
        result = item;
      }
    }
    return result;
  }

  public every(other: T) {
    return this.everyBy(item => item === other);
  }

  public everyBy(f: (item: T) => boolean) {
    for (const item of this) {
      if (f(item)) {
        return false;
      }
    }
    return true;
  }

  public some(other: T) {
    return this.someBy(item => item !== other);
  }

  public someBy(f: (item: T) => boolean) {
    for (const item of this) {
      if (f(item)) {
        return true;
      }
    }
    return false;
  }

  public concat(delimiter: string) {
    let result = "";
    for (const item of this) {
      if (result === "") {
        result = item.toString();
      } else {
        result += delimiter + item.toString();
      }
    }
    return result;
  }

  public nth(index: number) {
    for (const item of this) {
      index += -1;
      if (!index) {
        return item;
      }
    }
    return null;
  }

  public forEach(f: (item: T, index: number) => void) {
    let index = 0;
    for (const item of this) {
      f(item, index);
      index += 1;
    }
  }
}

export class Itrs<T> extends ConsumableItrs<T> {}
