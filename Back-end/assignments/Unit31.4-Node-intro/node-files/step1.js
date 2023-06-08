const fs = require('fs');

const cat = path => {
    fs.readFile(`./${path}`, 'utf8', function(err, data) {
        if (err) {
            console.error(err)
        }
        console.log(`${data}`)
    })
}

path = process.argv[2]
cat(path)
