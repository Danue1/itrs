import { expect } from "chai";

import { identity } from "../../src/identity";
import { mapBy } from "../../src/intermediates";
import { toArrayBy } from "../../src/consumables";

describe("intermediates::mapBy", () => {
  it("empty array returns empty array", () => {
    const items = [];
    const result = toArrayBy(mapBy(items, identity)(), identity);
    expect(result).to.be.deep.equals(items);
  });

  it("should return a copied array", () => {
    const items = [3, 6, 5];
    const result = toArrayBy(mapBy(items, identity)(), identity);
    expect(result).not.to.be.equals(items);
  });

  it("identity reducer returns same element", () => {
    const items = [3, 6, 5];
    const result = toArrayBy(mapBy(items, identity)(), identity);
    expect(result).to.be.deep.equals(items);
  });

  it("transformation by index", () => {
    const items = [3, 6, 5];
    const reducer = <T>(_: T, index: number) => index;
    const result = toArrayBy(mapBy(items, reducer)(), identity);
    expect(result).to.be.deep.equals([0, 1, 2]);
  });

  it("linear transformation", () => {
    const items = [3, 6, 5];
    const reducer = (item: number) => item * 3;
    const result = toArrayBy(mapBy(items, reducer)(), identity);
    expect(result).to.be.deep.equals([9, 18, 15]);
  });

  it("transformation with index", () => {
    const items = [3, 6, 5];
    const reducer = (item: number, index: number) => item * index;
    const result = toArrayBy(mapBy(items, reducer)(), identity);
    expect(result).to.be.deep.equals([0, 6, 10]);
  });
});
