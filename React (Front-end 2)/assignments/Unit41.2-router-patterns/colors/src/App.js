import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import Color from "./Color";
import ColorForm from "./ColorForm";
import './static/App.css';

function App() {
  const [ colors, setColors ] = useState(['red', 'green', 'blue']);
  const [ form, setForm ] = useState();

  const addColor = (newColor) => {
    setColors([...colors, newColor])
  }

  const addColorForm = <ColorForm addColor={addColor} />;
  const addColorButton = <button onClick={() => setForm(addColorForm)}>Add a New Color</button>;
  useEffect(() => {
    setForm(addColorButton);
  }, [colors]);

  // Render the list of links for each color
  const colorLinks = colors.map(color => {
    const path = `/colors/${color}`;
    return <li><Link to={path}>{color}</Link></li>
  });

  return (
    <div className="App">
      <h1>Welcome to the Color Factory</h1>
      <p>Colors well within your wildest imagination</p>
      <BrowserRouter>
        <Switch>
          <Route exact path="/colors">
            <ul>{colorLinks}</ul>
            <p>Don't see a color you like?</p>
            {form ? form : <p>Loading...</p>}
          </Route>
          <Route exact path="/colors/:color">
            <Color />
          </Route>
          <Route><Redirect to="/colors" /></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
