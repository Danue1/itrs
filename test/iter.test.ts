import { expect } from "chai";

import {
  iter,
  Iter,
  BaseIter,
  IntermediatableIter,
  ConsumableIter
} from "../src/Iter";

describe("Iter Structure", () => {
  it("IntermediatableIter should inherit a BaseIter", () => {
    expect(IntermediatableIter.prototype).to.be.instanceOf(BaseIter);
  });

  it("ConsumableIter should inherit a IntermediatableIter", () => {
    expect(ConsumableIter.prototype).to.be.instanceOf(IntermediatableIter);
  });

  it("Iter should inherit a ConsumableIter", () => {
    expect(Iter.prototype).to.be.instanceOf(ConsumableIter);
  });
});

describe("iter", () => {
  it("should return an Iter instance", () => {
    expect(iter([])).to.be.instanceOf(Iter);
  });
});

describe("BaseIter", () => {
  it("should be a iterable", () => {
    const generatorFunction = function*() {}.constructor;
    expect(BaseIter.prototype)
      .to.be.have.property((Symbol.iterator as any) as string)
      .that.is.instanceOf(generatorFunction);
  });
});

describe("IntermediatableIter", () => {
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
      expect(IntermediatableIter.prototype).to.be.have.property(method);
    }
  });
});

describe("ConsumableIter", () => {
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
      expect(ConsumableIter.prototype).to.be.have.property(method);
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
