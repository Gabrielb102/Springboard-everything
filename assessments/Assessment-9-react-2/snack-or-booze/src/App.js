import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SnackOrBoozeApi from "./Api";
import Home from "./Home";
import NavBar from "./NavBar";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import NewItemForm from "./NewItemForm";
import MenuContext from "./Context";
import "./static/App.css";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [menu, setMenu] = useState([]);

  // Populte the menu after the page has rendered
  useEffect(() => {
    async function getSnacks() {
      let menu = await SnackOrBoozeApi.getMenu();
      setMenu(menu);
      setIsLoading(false);
    }
    getSnacks();
  }, []);

  // save function to be passed down to the newItemForm
  const save = async (newItem, category) => {
    const newMenuItem = SnackOrBoozeApi.postNewItem(newItem, category);
    const path = `./${category}`;
  }

  if (isLoading) {
    return <p style={{color : "white"}}>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar options={["Snacks", "Drinks", "Contribute"]}/>
        <main>
          {/* I decided to use context instead of props for the menu because
          1. I was passing the menu variable to pretty much every component except for the forms
          2. This way, when a menu item is changed, the menu state variable can also be changed right then and there without having to pass the function through two components */}
          <MenuContext.Provider value={{menu, setMenu}}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              // placed above the generic category route because otherwise "contribute" will be treated as a parameter
              <Route exact path="/contribute">
                <NewItemForm save={save}/>
              </Route>
              <Route exact path="/:category">
                <Menu />
              </Route>
              <Route exact path="/:category/:id">
                <MenuItem />
              </Route>
              <Route>
                <p>Hmmm. I can't seem to find what you want.</p>
                <Link to="/snacks">Go back to Food Menu</Link>
              </Route>
            </Switch>
          </MenuContext.Provider>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
