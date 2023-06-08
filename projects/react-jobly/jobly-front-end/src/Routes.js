import { BrowserRouter, Route, Switch } from "react-router-dom";
import List from "./JobList";
import CompList from "./CompList";
import CompanyPage from "./CompanyPage";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import NavBar from "./NavBar";
import Logout from "./Logout";
import './resources/Routes.css'
import { useState } from "react";

const JoblyRouter = () => {

    const [ user, setUser ] = useState()
    console.log("user in state: ", user)

    return (
        <BrowserRouter>
            <NavBar setUser={setUser}/>
            <main>
                <Switch>
                    <Route exact path='/'>
                        <h1>Welcome to Jobly!</h1>
                        <p>{`A place to meet new professional acquaintances, and confuse them for your friends. A place that's here for you when your personal life has spurned you and left you feeling lost and dejected with a lacking personality. A place where your job IS your personality. Welcome to your refuge. Welcome home.`}</p>
                    </Route>
                    <Route exact path="/companies"><CompList/></Route>
                    <Route exact path="/companies/:handle"><CompanyPage /></Route>
                    <Route exact path="/jobs"><List type="jobs"/></Route>
                    <Route exact path="/login"><Login setUser={setUser}/></Route>
                    <Route exact path="/signup"><SignUp setUser={setUser}/></Route>
                    <Route exact path="/profile"><Profile mode="show"/></Route>
                    <Route exact path="/logout"><Logout /></Route>
                </Switch>
            </main>
        </BrowserRouter>
    )
}

export default JoblyRouter;