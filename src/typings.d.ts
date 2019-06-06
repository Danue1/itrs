import { itrs } from "./itrs";

export declare global {
  interface Array<T> {
    iter: () => itrs<T>;
  }
}
