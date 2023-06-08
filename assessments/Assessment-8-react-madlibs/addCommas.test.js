const addCommas = require("./addCommas");

describe("#addCommas", () => {
  it("is a function", () => {
    expect(typeof addCommas).toBe("function");
  });

  it("Converts numbers over three digits in length to strings with correct comma placement", () => {
    expect(addCommas(1234)).toEqual("1,234");
    expect(addCommas(90000)).toEqual("90,000");
  });

  it("Converts numbers over six digits in length to strings with correct comma placement", () => {
    expect(addCommas(12345678)).toEqual("12,345,678");
    expect(addCommas(9000000)).toEqual("9,000,000");
  });

  it("Converts numbers with decimal places to the correct string", () => {
    expect(addCommas(1234.567)).toEqual("1,234.567");
    expect(addCommas(90000.8)).toEqual("90,000.8");
  });

  it("Converts negative numbers under three digits in length to strings with no commas", () => {
    expect(addCommas(-12)).toEqual("-12");
    expect(addCommas(-900)).toEqual("-900");
  });

  it("Converts negative numbers over six digits in length with decimals to strings with commas", () => {
    expect(addCommas(-3141592.65)).toEqual("-3,141,592.65");
  });
});
