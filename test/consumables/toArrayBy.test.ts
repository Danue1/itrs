import { expect } from "chai";

import { identity } from "../../src/identity";
import { toArrayBy } from "../../src/consumables";

describe("consumables::toArrayBy", () => {
  it("should return empty array", () => {
    const item = [];
    const result = toArrayBy(item, identity);
    expect(result).to.be.deep.equals(item);
  });

  it("should return different reference array", () => {
    const items = [];
    const result = toArrayBy(items, identity);
    expect(result).not.be.be.equals(items);
  });

  it("should return copied array", () => {
    const items = [1, 2, 3, 4, 5, 6];
    const result = toArrayBy(items, identity);
    expect(result).to.be.deep.equals(items);
  });

  it("string should be splited by 1 character", () => {
    const items = "items";
    const result = toArrayBy(items, identity);
    expect(result)
      .to.be.deep.equals(items.split(""))
      .that.is.lengthOf(items.length);
  });
});
