import { wrapText } from "../src/text";

describe("the textWrap function", function() {
  test("should return empty array when there's no word", () => {
    expect(wrapText("", 4, mockCalc)).toEqual([]);
    expect(wrapText(null, 4, mockCalc)).toEqual([]);
    expect(wrapText(undefined, 4, mockCalc)).toEqual([]);
  });

  test("should return one line when text fit in the width", () => {
    expect(wrapText("This is a text", 20, mockCalc)).toEqual([
      "This is a text"
    ]);
  });

  test("should return at least one word per line", () => {
    expect(wrapText("This is the text I need to wrap", 1, mockCalc)).toEqual([
      "This",
      "is",
      "the",
      "text",
      "I",
      "need",
      "to",
      "wrap"
    ]);
  });

  test("should use the whole available width", () => {
    expect(wrapText("aaaaaa bbbbbb cccccc", 6, mockCalc)).toEqual([
      "aaaaaa",
      "bbbbbb",
      "cccccc"
    ]);
  });

  test("should consider white space for wrap", () => {
    expect(wrapText("aaa bb bb ccc", 4, mockCalc)).toEqual([
      "aaa",
      "bb",
      "bb",
      "ccc"
    ]);
  });

  test("should break lines correctly", () => {
    expect(wrapText("aaa bbb c ddd ee fffff g hhh", 6, mockCalc)).toEqual([
      "aaa",
      "bbb c",
      "ddd ee",
      "fffff",
      "g hhh"
    ]);
  });
});

const mockCalc = text => {
  return text.length;
};
