import { Iter } from "./Iter";

export declare global {
  interface Array<T> {
    iter: () => Iter<T>;
  }
}
