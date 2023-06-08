import VendingMachine from "./VendingMachine"
import './static/App.css';
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <VendingMachine />
      </div>
    </BrowserRouter>
  );
}

export default App;
