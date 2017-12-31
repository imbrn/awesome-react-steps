import { deepFreeze } from "../../src/model/utils";

describe("the deepFreeze function", () => {
  it("freezes an object property", () => {
    const obj = { a: 1 };
    deepFreeze(obj);
    expect(() => (obj.a = 2)).toThrow();
    expect(obj.a).toBe(1);
  });

  it("freezes objects which are inside objects", () => {
    const obj = {
      a: { b: 1 }
    };
    deepFreeze(obj);
    expect(() => (obj.a.b = 5)).toThrow();
    expect(obj.a.b).toBe(1);
  });

  it("freezes arrays which are inside objects", () => {
    const obj = {
      a: [1, 2, 3]
    };
    deepFreeze(obj);
    expect(() => (obj.a[0] = 5)).toThrow();
    expect(obj.a[0]).toBe(1);
  });

  it("freezes an array value", () => {
    const array = [1, 2, 3];
    deepFreeze(array);
    expect(() => (array[0] = 5)).toThrow();
    expect(array[0]).toBe(1);
  });

  it("freezes objects which are inside arrays", () => {
    const array = [{ a: 1 }];
    deepFreeze(array);
    expect(() => (array[0].a = 5)).toThrow();
    expect(array[0].a).toBe(1);
  });

  it("freezes arrays which are inside arrays", () => {
    const array = [[1, 2, 3]];
    deepFreeze(array);
    expect(() => (array[0][0] = 5)).toThrow();
    expect(array[0][0]).toBe(1);
  });
});
