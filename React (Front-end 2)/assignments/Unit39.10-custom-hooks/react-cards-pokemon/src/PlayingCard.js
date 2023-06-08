import React, { useState } from "react";
import useFlip from "./hooks/useFlip ";
import backOfCard from "./static/back.png";
import "./static/PlayingCard.css"

/* Renders a single playing card. */
function PlayingCard({ front, back = backOfCard }) {

  const [ isFaceUp, flipCard ] = useFlip();

  return (
    <img
      src={isFaceUp ? front : back}
      alt="playing card"
      onClick={flipCard}
      className="PlayingCard Card"
    />
  );
}

export default PlayingCard;
