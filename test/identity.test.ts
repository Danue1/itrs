import { expect } from "chai";

import { identity } from "../src/identity";

describe("identity", () => {
  it("must be same value if call by value", () => {
    const items = [-1, 0, 1, false, true, "", "foo"];
    for (const item of items) {
      expect(item).to.be.equals(identity(item));
    }
  });

  it("must be same reference if call by reference", () => {
    const items = [{}, { foo: "bar" }, [], [1, 2, 3], new Set(), new Map()];
    for (const item of items) {
      expect(item).to.be.equals(item);
    }
  });
});
