import { useEffect, useState } from "react";
import BackendAPI from "./BackendAPI";
import ReceiptsRouter from "./Routes";
import "./static/App.css"
// The name is truncated for most of the use in the app just to make it more readable

function App() {

  return (
    <div className="App">
      <ReceiptsRouter />
    </div>
  );
}

export default App;
