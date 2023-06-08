const express = require("express")
const router = new express.Router();
const items = require("./fakeDb")
const ExpressError = require("./expressError")


// GET /items - this should render a list of shopping items.
router.get('/', (req, res) => {
    res.json({items})
})

// POST /items - this route should accept JSON data and add it to the shopping list.
router.post('/', (req, res) => {
    const newItemName = req.body.name
    const newItemPrice = req.body.price
    const newItem = {name : newItemName, price : newItemPrice}
    items.push(newItem)
    res.status(201).json({newItem: newItem})
})

// GET /items/:name - this route should display a single item’s name and price.
router.get('/:name', (req, res) => {
    const theRightItem = items.find(item => `${item.name}` === req.params.name)
    if(theRightItem === undefined){
        throw new ExpressError(`${req.params.name} not found`, 404)
      }
    res.status(201).json({ item: theRightItem })
        
})


// PATCH /items/:name, this route should modify a single item’s name and/or price.
router.patch('/:name', (req, res) => {
    const itemToChange = items.find(item => `${item.name}` === req.params.name)
    const newItemName = req.body.name
    const newItemPrice = req.body.price
    const newItem = {name : newItemName, price : newItemPrice}

    if(itemToChange === undefined){
        throw new ExpressError(`${req.params.name} not found`, 404)
      }
    res.status(200).json({ changedItemTo : newItem })
        
})

// DELETE /items/:name - this route should allow you to delete a specific item from the array.
// {message: “Deleted”}

router.delete('/:name', (req, res) => {
    const indexToDelete = items.findIndex(item => `${item.name}` === req.params.name)
    if (indexToDelete === -1){
        throw new ExpressError(`${req.params.name} not found`, 404)
      }

    items.splice(indexToDelete, 1)
    res.status(200).json({ message : "Deleted" })

})


module.exports = router