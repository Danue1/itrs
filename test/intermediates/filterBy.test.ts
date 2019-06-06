import { expect } from "chai";

import { identity } from "../../src/identity";
import { toArrayBy } from "../../src/consumables";
import { filterBy } from "../../src/intermediates";

describe("itermediates::filterBy", () => {
  it("empty array returns empty array", () => {
    const items = [];
    const result = toArrayBy(filterBy(items, identity)(), identity);
    expect(result).to.be.deep.equals(items);
  });

  it("should return a copied array", () => {
    const items = [];
    const result = toArrayBy(filterBy(items, () => true)(), identity);
    expect(result).not.to.be.equals(items);
  });

  it("returning true reducer returns same element", () => {
    const items = [3, 6, 5];
    const result = toArrayBy(filterBy(items, () => true)(), identity);
    expect(result).to.be.deep.equals(items);
  });

  it("returning false reducer returns empty", () => {
    const items = [3, 6, 5];
    const result = toArrayBy(filterBy(items, () => false)(), identity);
    expect(result).to.be.deep.equals([]);
  });

  it("filtering even", () => {
    const items = [3, 6, 5, 7, 3, 0];
    const reducer = (item: number) => item % 2 !== 0;
    const result = toArrayBy(filterBy(items, reducer)(), identity);
    expect(result).to.be.deep.equals([3, 5, 7, 3]);
  });

  it("filtering even by index", () => {
    const items = [3, 6, 5, 7, 3, 0];
    const reducer = (_: any, index: number) => index % 2 !== 0;
    const result = toArrayBy(filterBy(items, reducer)(), identity);
    expect(result).to.be.deep.equals([6, 7, 0]);
  });
});
