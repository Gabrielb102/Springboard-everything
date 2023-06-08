/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.markovChain = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chainObj = {}
    for (let word in this.words) {
      if (!chainObj[this.words[word]]) {
        chainObj[this.words[word]] = []
      }
      if (chainObj[this.words[word]]) {
        let index = Number.parseInt(word)
        index++
        if (this.words[index]) {
          chainObj[this.words[word]].push(this.words[index])
        } else {
          chainObj[this.words[word]].push(null)
        }
      }
    }
    return chainObj
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    const chainSize = (Object.keys(this.markovChain).length - 1)
    const index = Math.floor(Math.random() * chainSize)
    let returnString = ''
    let currentWord = Object.keys(this.markovChain)[index]
    let nextWord = ''
    let stringLength = 1
    returnString += currentWord

    while (stringLength < numWords) {
      let numNextwords = this.markovChain[currentWord].length
      nextWord = this.markovChain[currentWord][Math.floor(Math.random() * numNextwords)]
      if (nextWord === null){
        continue
      } else {
        returnString = returnString + ' ' + nextWord
        currentWord = nextWord
        stringLength ++
      }
    }
    return returnString
  }
}

module.exports = {'markov' : MarkovMachine}