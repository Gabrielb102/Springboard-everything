describe ("ES5 function matches new function", () => {
    it ("first function works", () => {
        const testArray = [4,6,-12,123,55];
        expect(newFilterOutOdds(testArray)).toEqual(filterOutOdds(testArray));
    })
    it ("findMin works", () => {
        const testArray = [4,6,-12,123,55];
        expect(findMin(...testArray)).toEqual(-12);
    })
    it ("mergeObjects works", () => {
        const obj1 = {a:1, b:2};
        const obj2 = {c:3, d:4};
        const obj3 = {a:1, b:2, c:3, d:4}
        expect(mergeObjects(obj1, obj2)).toEqual(obj3);
    })
    it ("doubleAndReturnArgs works", () => {
        const testArray = [4,6,-12,123,55];
        expect(doubleAndReturnArgs(testArray, ...testArray)).toEqual([4,6,-12,123,55,8,12,-24,246,110]);
    })
})

describe ("tests for Slice and Dice!", () => {
    it ("removes a random element from array", () => {
        const testArray = ["bicycle", "unicycle", "skateboard", "pepper jack cheese"];
        const resultArray = removeRandom(testArray);
        expect(resultArray.length + 1).toEqual(testArray.length);
    })
    it ("combines two arrays", () => {
        const testArray = ["bicycle", "unicycle", "skateboard", "pepper jack cheese"];
        const testArray2 = [4,6,-12,123,55];
        expect (extend(testArray, testArray2).length).toEqual(testArray.length + testArray2.length);
    })
    it ("creates a new object with a new key/val pair", () => {
        const testObj = {grill: "clean", floor: "dirty", food: "nasty"};
        const newKey = "sink";
        const newValue = "grimy";
        const resultObj = addKeyVal(testObj, newKey, newValue);
        expect (resultObj[newKey]).toEqual(newValue);
    })
    it ("removes a key from an object", () => {
        const testObj = {grill: "clean", floor: "dirty", food: "nasty"};
        const targetKey = "grill";
        const resultObj = removeKey(testObj, targetKey);
        expect(resultObj[targetKey]).toEqual(undefined);
        })
    it ("combines two objects", () => {
        const obj1 = {sky: "blue", ground: "green", table: "brown"};
        const obj2 = {love: "great", life: "good", girl: "perfect"};
        const obj3 = {sky: "blue", ground: "green", table: "brown", love: "great", life: "good", girl: "perfect"};
        expect(combine(obj1,obj2)).toEqual(obj3);
    })
    it ("modifies a certain key", () => {
        const testObj = {grill: "clean", floor: "dirty", food: "nasty"};
        const targetKey = "food";
        const newValue = "lavish";
        const resultObj = update(testObj, targetKey, newValue);
        expect(resultObj[targetKey]).toEqual(newValue);
    })
})