const unroll = require("./unroll");

describe("#unroll", () => {

  it("is a function", () => {
    expect(typeof unroll).toEqual("function");
  });

  it("Returns Square of numbers in a spiral order for a 4x4 array square", () => {
    const squarray = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
    ];
    const solution = [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]
    expect (unroll(squarray)).toEqual(solution);
  })

  it("Returns Square of data in a spiral order for a 3x3 array square", () => {
    const squarray = [
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "i"]
    ];
    const solution = ["a", "b", "c", "f", "i", "h", "g", "d", "e"];
    expect (unroll(squarray)).toEqual(solution);
  })
});
