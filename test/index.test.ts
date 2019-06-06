import { expect } from "chai";

import "../src";

describe("Array", () => {
  it("prototype should have an iter method", () => {
    expect(Array.prototype)
      .to.have.property("iter")
      .that.is.instanceOf(Function);
  });

  it("instance should have an iter method", () => {
    expect([])
      .to.have.property("iter")
      .that.is.instanceOf(Function);
  });

  it("should be same", () => {
    expect(Array.prototype.iter).equals([].iter);
  });
});
