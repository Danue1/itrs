import { expect } from "chai";

import { identity } from "../../src/identity";
import { toArrayBy } from "../../src/consumables";
import { chunkBy } from "../../src/intermediates";

describe("intermediates::chunkBy", () => {
  it("empty array returns empty array", () => {
    const items = [];
    const result = toArrayBy(chunkBy(items, identity)(), identity);
    expect(result).to.be.deep.equals(items);
  });

  it.skip("should return a copied array", () => {});

  it.skip("returning true reducer returns same element", () => {});

  it.skip("returning false reducer returns empty", () => {});

  it.skip("filtering even", () => {});

  it.skip("filtering even by index", () => {});
});
