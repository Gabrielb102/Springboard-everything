import React from "react";
import PlayingCardList from "./PlayingCardList";
import PokeDex from "./PokeDex";
import "./static/CardTable.css";

/* Main component. Renders card lists for
 * playing cards: PlayingCardList and pokemon: PokeDex. */

function CardTable() {
  return (
    <div className="CardTable">
      <header>
        <h1 className="CardTable-heading">Check out all my cards.</h1>
      </header>
      <main>
        <PlayingCardList />
        <PokeDex />
      </main>
    </div>
  );
}

export default CardTable;
