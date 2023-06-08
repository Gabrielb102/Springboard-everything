numForm = document.querySelector('#num-form')
numInput = document.querySelector('#num-input')
factList = document.querySelector('#fact-list')
fourx = document.querySelector('#fourx')

numForm.onsubmit = async function(e) {
    e.preventDefault()
    factHtml = document.createElement('p')
    factList.append(factHtml)

    dirtyStringArray = numInput.value.split(',')
    numArray = dirtyStringArray.map((num) => parseInt(num.trim()))    

    favNumber = numInput.value
    let url = `/${numArray.join(',')}`

    try {    
        let res = await axios.get(url)
    } catch {
        alert("Favorite number must be an integer, not an image or empty space")
    }

    if (numArray.length > 1) {
        var htmlString = ''
        var allPromises = []
        for (num of numArray) {
            fact = res.data[`${num}`]
            htmlString += fact
            htmlString += '\n'
            console.log("htmlString: " + htmlString)
        }
        factHtml.innerText = htmlString
    } else {
        factHtml.innerText = res.data.text
    }
}

fourx.onclick = async function(e) {
    e.preventDefault()
    factHtml = document.createElement('p')
    factList.append(factHtml)

    favNumber = numInput.value
    allPromises = []

    let url = `/${favNumber}`
    for (let i=0; i<4; i++) {
        let promise = axios.get(url)
        allPromises.push(promise)
    }

    var facts = ''

    res = await Promise.all(allPromises)
    
    for (response of res) {
        console.log(response.data.text)
        facts += response.data.text
        facts += '\n'
    }
    factHtml.innerText = facts
}