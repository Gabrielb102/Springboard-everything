// Write a function called constructNote, 
// which accepts two strings, a message and some letters. 
// The function should return true if the message can be 
// built with the letters that you are given; 
// otherwise, it should return false.

// input: "messagenospaces", "mesgnopac" output: true
// input: "messagenospaces", "ms" output: false

function constructNote(message, letters) {
    if (!letters) return false;
    if (!message) return true;
    const frequencies = trackFrequencies(message);
    // for each letter in the letters list
    for (let letter of letters) {
        // check against the object
        if (frequencies[letter]) {
            frequencies[letter] -= 1;
        }
        // end loop
    }
    for (let val of Object.values(frequencies)) {
        if (val > 0) return false;
    }
    // return true
    return true;
}

function trackFrequencies(word) {
    const frequencies = {};
    const letters = word.split('');
    for (let letter of letters) {
        frequencies[letter] = frequencies[letter] + 1 || 1;
    }
    return frequencies;
}
