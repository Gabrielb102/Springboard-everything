const hasDuplicate = (arr) => {
    const checkSet = new Set(arr);
    console.log(checkSet);
    console.log(arr);
    return !(checkSet.size === arr.length);
}

//I'm guessing the question meant that the keys are letters and the values are counts, like the example has
const vowelCount = string => {
    let stringMap = new Map();
    const vowels = new Set("aeiou");

    for (letter of string) {
        if ([...stringMap.keys()].includes(letter)) {
            stringMap.set(letter, (stringMap.get(letter) + 1))
        } else if (vowels.has(letter)) {
            stringMap.set(letter, 1);
        }
    }
    return stringMap;
}