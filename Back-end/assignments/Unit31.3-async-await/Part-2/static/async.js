shuffleDrawButton = document.querySelector('#one-card-new-deck')
drawAgainButton = document.querySelector('#keep-drawing')
cardsDisplay = document.querySelector('#cards')

shuffleDrawButton.onclick = async function(e) {
    e.preventDefault()
    cards.innerHTML = ''

    newCard = document.createElement('img')
    cards.append(newCard)

    let url = '/card-new-deck'
    let card = await axios.get(url)
    newCard.setAttribute('src' ,card.data.cards[0].image)
    sessionStorage.setItem('deck_id', card.data.deck_id)
}

drawAgainButton.onclick = async function(e) {
    e.preventDefault()

    newCard = document.createElement('img')
    cards.prepend(newCard)

    let url = '/draw-again/' + sessionStorage.getItem('deck_id')
    let card = await axios.get(url)
    let cardFace = await card.data.cards[0].image
    newCard.setAttribute('src' , cardFace)
}