/** Command-line tool to generate Markov text. */

const {markov} = require('./markov')
const fs = require('fs');
const axios = require('axios');
const { url } = require('inspector');
const { text } = require('stream/consumers');

produceMarkovText = path => {
    try {
        data = fs.readFileSync(`./${path}`, 'utf8')
        machine = new markov(data)
        markovText = machine.makeText()
        return markovText    
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

const webProduceMarkovText = async function(url) {
    try {
        response = await axios.get(url)
        responseData =  await response.data   

        machine = new markov(responseData)
        markovText = machine.makeText()
        return markovText

    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const isFile = string => {
    if (string.includes('.html') || string.includes('.txt') || string.includes('.json') || string.includes('.js')) {
        return true
    }
    return false
}

const makeText = function() {
    if (process.argv[2].startsWith('-out')) {
        let newFile = process.argv[3]
        let address = process.argv[4]
        console.log(cat(process.argv[4]))
        if (isFile(address)) {
            fs.writeFile(`${newFile}`, produceMarkovText(address), 'utf8', (err, data) => {
                console.error(err)
            })
        } else {
            fs.writeFile(`${newFile}`, webProduceMarkovText(address), 'utf8', (err, data) => {
                console.error(err)
            })
        }   
    } else {
        let address = process.argv[2]
        if (isFile(address)) {
            console.log(produceMarkovText(address))
        } else {
            console.log(await(webProduceMarkovText(address)))
        }
    }        
}

try {
    makeText()
} catch (err) {
    console.log('missing text file argument')
    console.error(err)
    process.exit(1)
}
