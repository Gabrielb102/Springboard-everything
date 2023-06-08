shuffleDrawButton = document.querySelector('#one-card-new-deck')
drawAgainButton = document.querySelector('#keep-drawing')
cardsDisplay = document.querySelector('#cards')

shuffleDrawButton.onclick = e => {
    e.preventDefault()
    cards.innerHTML = ''

    newCard = document.createElement('img')
    cards.append(newCard)

    let url = '/card-new-deck'
    let cardPromise = axios.get(url)
    cardPromise.then(res => {
        newCard.setAttribute('src' ,res.data.cards[0].image)
        sessionStorage.setItem('deck_id', res.data.deck_id)
    })
}

drawAgainButton.onclick = e => {
    e.preventDefault()

    newCard = document.createElement('img')
    cards.prepend(newCard)

    let url = '/draw-again/' + sessionStorage.getItem('deck_id')
    let cardPromise = axios.get(url)
    cardPromise.then(res => {
        newCard.setAttribute('src' ,res.data.cards[0].image)
    })
}