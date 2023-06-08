const {markov} = require('./markov')
const fs = require('fs')

let sampleText = ''

describe('tests for Markov Machine in markov.js', function() {

    beforeAll(function() {
        try {
            sampleText = fs.readFileSync('./eggs.txt', 'utf8')
        } catch (error) {
            console.error(error)
            process.exit(1)
        }        
    })

    test('Should return a string', function() {
        let machine = new markov(sampleText)
        let text = machine.makeText()
        expect(text).toEqual(expect.any(String))
    })

    test('Should return a string of specified length', function() {
        let machine = new markov(sampleText)
        let text = machine.makeText(28)
        let words = text.split(/[ \r\n]+/);
        let wordsArray = words.filter(c => c !== "");    
        expect(wordsArray.length).toEqual(28)
    })

})