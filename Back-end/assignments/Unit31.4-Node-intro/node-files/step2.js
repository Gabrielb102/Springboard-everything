const fs = require('fs');
const axios = require('axios');
const { url } = require('inspector');

const cat = path => {
    fs.readFile(`./${path}`, 'utf8', function(err, data) {
        if (err) {
            console.error(err)
        }
        console.log(`${data}`)
    })
}

const webCat = async function(url) {
    try {
        response = await axios.get(url)
        console.log(await response.headers)    
    } catch (error) {
        console.error(error)
    }
}

const isFile = string => {
    if (string.includes('.html') || string.includes('.txt') || string.includes('.json') || string.includes('.js')) {
        return true
    }
    return false
}


address = process.argv[2]

if (isFile(address)) {
    cat(address)
} else {
    webCat(address)
}
