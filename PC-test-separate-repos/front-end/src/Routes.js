// react-router-dom replaced Switch with Routes at version 6, downgraded to react-router-dom 5.2.0 in order to use Switch
import { BrowserRouter, Route, Routes, Link, useParams } from "react-router-dom";
import CandidatePage from "./CandPage";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Favorites from "./Favorites";
import './static/Routes.css'

const ReceiptsRouter = () => {
    const [ user, setUser ] = useState();
    const [ results, setResults ] = useState([]);
    // Data organization
    // Originally I had the search results stored in state that originated here in the routes component
    // this was so that it could then be passed into the CandidatePage component - which displays the data
    // this would cut down on the number of requests to be made to the API by 1/candidate that you want to look at
    
    // By using caching, I was able to make it so that that request only takes place once for every unit of time (yaer in this case)
    // So the request can be "made" every time without actually making it, which also cleans up the code and the state organization. 

    return (
        <BrowserRouter>
            <>  
                <div id="header">
                    <h2 className="Routes-title">
                        <Link className="Routes-link" to="/">Pollitically Correct</Link>
                    </h2>
                <NavBar setUser={setUser} user={user}/>
                </div>
                <Routes>
                    <Route exact path="/" element={<Home results={results} setResults={setResults}/>}/>
                    <Route exact path="/login" element={
                        <>
                            <Login setUser={setUser}/>
                            <Signup setUser={setUser}/>
                        </>
                        }/>
                    <Route exact path="/favorites" element={<Favorites />} />
                    <Route exact path="/candidates/:id/:year" element={<CandidatePage />}/>
                </Routes>
            </>
        </BrowserRouter>
    );
}

export default ReceiptsRouter;