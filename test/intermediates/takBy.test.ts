import { expect } from "chai";

import { identity } from "../../src/identity";
import { takeBy } from "../../src/intermediates";
import { toArrayBy } from "../../src/consumables";

describe("intermediates::takeBy", () => {
  it("empty array returns empty array", () => {
    const items = [];
    const result = toArrayBy(takeBy(items, identity)(), identity);
    expect(result).to.be.deep.equals(items);
  });

  it("should return a copied array", () => {
    const items = [];
    const result = toArrayBy(takeBy(items, identity)(), identity);
    expect(result).not.to.be.equals(items);
  });

  it("index should be incremented by 1", () => {
    const items = [3, 6, 5, 7, 3, 0];
    let current = 0;
    toArrayBy(
      takeBy(items, (_, index) => ((current = index), false))(),
      identity
    );
    expect(current).to.be.equals(items.length - 1);
  });

  it("should end immediately if return true", () => {
    const items = [3, 6, 5, 7, 3, 0];
    const result = toArrayBy(
      takeBy(items, (_, index) => index === 3)(),
      identity
    );
    expect(result).to.be.deep.equals([3, 6, 5]);
  });
});
