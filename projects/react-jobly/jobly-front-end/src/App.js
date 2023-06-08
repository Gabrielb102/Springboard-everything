import NavBar from './NavBar';
import JoblyRouter from './Routes';
import './resources/App.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <a href='/'><h1 className='App-title'>Jobly</h1></a>
      <JoblyRouter />
    </div>
  );
}

export default App;
