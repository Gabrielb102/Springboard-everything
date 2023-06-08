function isSubsequence(string, bigString) {
    // make frequency table for both strings
    const smallFrequency = trackFrequencies(string);
    const bigFrequency = trackFrequencies(bigString);
    for (let key of Object.keys(smallFrequency)) {
        // if the larger one has larger values than the smaller one, continue
        // else return false
        if (!bigFrequency[key]) return false;
        if (smallFrequency[key] > bigFrequency[key]) return false;
    }
    // now, iterate through the big string
    let si = 0;
    // once a letter of the small one is found, start checking for the next letter
    for (let i in bigString) {
        if (bigString[i] === string[si]) {
            console.log(bigString[i]);
            si++;
            // if the whole string is completed return true
            if (si === string.length) return true;
        }
    }
    return false;
}

function trackFrequencies(word) {
    const frequencies = {};
    const letters = word.split('');
    for (let letter of letters) {
        frequencies[letter] = frequencies[letter] + 1 || 1;
    }
    return frequencies;
}
