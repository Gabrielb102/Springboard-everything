describe ("ES2015 Refactor tests", () => {
    const testArray = [4,6,5,3,-5];
    it ("should return same result as first ES5 function using two arrow functions", () => {
        expect(doubleArrow(testArray)).toEqual(double(testArray));
    });
    it ("should return same array as squareAndFindEvens", () => {
        expect(squareAndFindEvens(testArray)).toEqual(sqAndFindEvensArrow(testArray));
    });

});