import axios from "axios";
import { useState, useRef, useEffect } from "react";
import Card from "./Card";

const Deck = () => {
    
    var [ imgSrc, setImgSrc ] = useState(undefined);
    var [ card, setCard ] = useState(undefined);
    var [ draw, setDraw ] = useState(false);
    const [ deckId, setDeckId ] = useState('');

    const getNewDeck = async () => {
        const res = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");        
        return res.data.deck_id;
    }

    const drawACard = async () => {
        const res = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        imgSrc = res.data.cards[0].image;
        setImgSrc(imgSrc);
        setCard(<Card imgSrc={imgSrc} keepDrawing={draw}/>);
    }

    useEffect(() => {
        const drawRepeat = async () => {
            const res = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            imgSrc = res.data.cards[0].image;
            setImgSrc(imgSrc);
            setCard(<Card imgSrc={imgSrc} keepDrawing={draw}/>);
        }
        if (draw) {
            const intId = setInterval(drawRepeat, 1000)
            return () => {
                clearInterval(intId);
            }    
        }
    }, [draw]);

    useEffect(() => {
        const loadDeck = async () => {
            const newDeckId = await getNewDeck()
            setDeckId(newDeckId);
            console.log("newDeckId: ", newDeckId);
            setCard(<div>Click a Button to Draw a Card</div>)
        }
        loadDeck();
    }, []);

    useEffect(() => {
        console.log("imgSrc: ", imgSrc);
        if (imgSrc) {
            console.log("running");
            setCard(() => <Card imgSrc={imgSrc} />);
        }
    }, [imgSrc]);



    return (
        <>
            <div className="Card">
                {card ? card : <p>Loading...</p>}
            </div>
            <button onClick={drawACard}>New Card</button>
            <button onClick={() => setDraw(!draw)}>{draw ? "Stop Drawing" : "Keep Drawing"}</button>
        </>
    )
}

export default Deck;