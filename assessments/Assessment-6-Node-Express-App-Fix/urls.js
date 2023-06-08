const axios = require('axios');
const fs = require('fs');
const extractDomain = require('extract-domain');

const argv = process.argv;

const readUrlFile = (path) => {
    text = fs.readFileSync(`./${path}`, 'utf8')
    const urls = text.split('\n');
    return urls
}

const makeWebRequests = (urlList) => {
    let hostnamesPromises = {}
    for (let url of urls) {
        if (url === ''){
            continue
        }
        try {
            var promise = axios.get(url).then(data => data).catch(err => undefined)
            var hostname = extractDomain(url)
            hostnamesPromises[hostname] = promise
        } catch(e) {
            console.log(`Could not download ${url}`)
            continue;
        }
    }    
    return hostnamesPromises
}

async function writeHtmlToFiles(websiteObject) {
    for (let hostname of Object.keys(hostnamesPromises)) {
        const response = await hostnamesPromises[hostname]
        if (response) {
            try {
                fs.writeFileSync(`./${hostname}`, response.data)
                console.log(`Wrote file for ${hostname}`)
            } catch(err) {
                console.log(`Error Writing file for ${hostname}: ${err}`)
            }
        } else {
            console.log(`Couldn't download data from ${hostname}`)
        }
    }    
}

const path = argv[2]

const urls = readUrlFile(path)

const hostnamesPromises = makeWebRequests(urls)

writeHtmlToFiles(hostnamesPromises)

