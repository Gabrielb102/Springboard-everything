function guessingGame() {
    const max = 99;
    let targetNum = Math.floor(Math.random() * (max + 1));
    console.log(targetNum);
    let numGuesses = 0;
    let won = false;
    return function(guess) {
        if (won === true) {
            return ("The game is over, you already won!")
        }
        numGuesses++;
        if (guess > targetNum) {
            return (`${guess} is too high!`);
        } else if (guess < targetNum) {
            return (`${guess} is too low!`);
        }
        if (guess === targetNum) {
            won = true;
            return (`You win! You found ${targetNum} in ${numGuesses} guesses.`)
        }
    }
}

module.exports = { guessingGame };
