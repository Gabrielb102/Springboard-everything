const fs = require('fs');
const axios = require('axios');
const { url } = require('inspector');

const cat = path => {
    fs.readFile(`./${path}`, 'utf8', function(err, data) {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        return data
    })
}

const webCat = async function(url) {
    try {
        // response = await axios.get(url)
        // return await response.data   
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


if (process.argv[2].startsWith('-out')) {
    let newFile = process.argv[3]
    let address = process.argv[4]
    console.log(cat(process.argv[4]))
    if (isFile(address)) {
        fs.writeFile(`${newFile}`, cat(address), 'utf8', (err, data) => {
            console.error(err)
        })
    } else {
        fs.writeFile(`${newFile}`, webCat(address), 'utf8', (err, data) => {
            console.error(err)
        })
    }   
} else {
    let address = process.argv[2]
    if (isFile(address)) {
        console.log(cat(address))
    } else {
        console.log(webCat(address))
    }
}



