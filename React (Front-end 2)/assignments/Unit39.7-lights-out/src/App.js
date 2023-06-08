import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <h1>Black Square Board Game</h1>
      <p>Turn all the tiles white to win.</p>
      <Board />
    </div>
  );
}

export default App;
