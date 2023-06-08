import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useState } from "react";
import DogMenu from "./DogMenu";
import Dog from "./Dog";
import './static/App.css';
import duke from "./static/duke.jpg"
import whiskey from "./static/whiskey.jpg"
import tubby from "./static/tubby.jpg"
import perry from "./static/perry.jpg"


function App(props) {
  const [ dogs, setDogs ] = useState(props.dogs);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/dogs">
            <DogMenu dogs={dogs}/>
          </Route>
          <Route exact path="/dogs/:name">
            <Dog dogs={dogs}/>
          </Route>
          <Redirect to="/dogs" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

App.defaultProps = {
  dogs: [
    {
      name: "Whiskey",
      age: 5,
      src: whiskey,
      facts: [
        "Whiskey loves eating popcorn.",
        "Whiskey is a terrible guard dog.",
        "Whiskey wants to cuddle with you!"
      ]
    },
    {
      name: "Duke",
      age: 3,
      src: duke,
      facts: [
        "Duke believes that ball is life.",
        "Duke likes snow.",
        "Duke enjoys pawing other dogs."
      ]
    },
    {
      name: "Perry",
      age: 4,
      src: perry,
      facts: [
        "Perry loves all humans.",
        "Perry demolishes all snacks.",
        "Perry hates the rain."
      ]
    },
    {
      name: "Tubby",
      age: 4,
      src: tubby,
      facts: [
        "Tubby is really stupid.",
        "Tubby does not like walks.",
        "Angelina used to hate Tubby, but claims not to anymore."
      ]
    }
  ]
}

export default App;
