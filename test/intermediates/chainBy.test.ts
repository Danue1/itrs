import { chain } from "../../src/intermediates";

describe.skip("intermediates::chainBy", () => {
  it("", () => {
    const a = function*() {
      yield 1;
    };
    const b = function*() {
      yield 2;
    };
    const c = chain(a(), b())();

    for (const a of c) {
      console.log(a);
    }
  });
});
