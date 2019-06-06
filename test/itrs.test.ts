import { expect } from "chai";

import {
  itrs,
  Itrs,
  BaseItrs,
  IntermediatableItrs,
  ConsumableItrs
} from "../src/itrs";

describe("Itrs Structure", () => {
  it("IntermediatableItrs should inherit a BaseItrs", () => {
    expect(IntermediatableItrs.prototype).to.be.instanceOf(BaseItrs);
  });

  it("ConsumableItrs should inherit a IntermediatableItrs", () => {
    expect(ConsumableItrs.prototype).to.be.instanceOf(IntermediatableItrs);
  });

  it("Itrs should inherit a ConsumableItrs", () => {
    expect(Itrs.prototype).to.be.instanceOf(ConsumableItrs);
  });
});

describe("itrs", () => {
  it("should return an Itrs instance", () => {
    expect(itrs([])).to.be.instanceOf(Itrs);
  });
});

describe("BaseItrs", () => {
  it("should be a iterable", () => {
    const generatorFunction = function*() {}.constructor;
    expect(BaseItrs.prototype)
      .to.be.have.property((Symbol.iterator as any) as string)
      .that.is.instanceOf(generatorFunction);
  });
});

describe("IntermediatableItrs", () => {
  it("should have intermediatable methods", () => {
    const methods = [
      "scanBy",
      "mapBy",
      "filterBy",
      "filterMap",
      "flat",
      "flatBy",
      "take",
      "takeBy",
      "skip",
      "skipBy",
      "step",
      "stepBy",
      "chunk",
      "chunkBy",
      "windows",
      "fold",
      "enumerate",
      "debug",
      "debugBy",
      "chain"
    ];
    for (const method of methods) {
      expect(IntermediatableItrs.prototype).to.be.have.property(method);
    }
  });
});

describe("ConsumableItrs", () => {
  it("should have consumable methods", () => {
    const methods = [
      "toArray",
      "toArrayBy",
      "toMap",
      "toMapBy",
      "count",
      "countBy",
      "sum",
      "sumBy",
      "max",
      "maxBy",
      "min",
      "minBy",
      "every",
      "everyBy",
      "some",
      "someBy",
      "concat",
      "nth",
      "forEach"
    ];
    for (const method of methods) {
      expect(ConsumableItrs.prototype).to.be.have.property(method);
    }
  });
});

describe("take", () => {
  it.skip("should be recognized as 1 if input is less than 1", () => {
    //
  });

  it.skip("length of returning array can be less than input", () => {
    //
  });
});
