cupcakeListDOM = document.querySelector('#cupcake-list')
newCupcakeForm = document.querySelector('#cupcake-form')

async function populateCupcakeList() {
    cupcakesData = await axios.get('/api/cupcakes')
    cupcakesList = cupcakesData.cupcakesData
    return cupcakesData.data.cupcakes
}

window.addEventListener('DOMContentLoaded', async function(evt) {
    evt.preventDefault()
    cupcakesListDB = await populateCupcakeList()
    for (let cupcake of cupcakesListDB) {
        li = document.createElement('li')
        li.append(JSON.stringify(cupcake))
        cupcakeListDOM.append(li)
    }
})


async function addCupcake(evt) {

    flavor = document.querySelector('#flavor').value
    size = document.querySelector('#size').value
    rating = document.querySelector('#rating').value
    image = document.querySelector('#image').value

    await axios.post('/api/cupcakes', json={"flavor":flavor, "size":size, "rating":rating, "image":image})
}

newCupcakeForm.addEventListener('submit', addCupcake)