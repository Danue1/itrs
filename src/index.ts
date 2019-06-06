import { iter } from "./Iter";

Array.prototype.iter = function() {
  return iter(this);
};
