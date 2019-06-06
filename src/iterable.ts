export const iterable = <T>(next: () => IterableIterator<T>) =>
  new Iterable(next);

class Iterable<T> {
  public constructor(private readonly next: () => IterableIterator<T>) {}

  public [Symbol.iterator]() {
    return this.next();
  }
}
