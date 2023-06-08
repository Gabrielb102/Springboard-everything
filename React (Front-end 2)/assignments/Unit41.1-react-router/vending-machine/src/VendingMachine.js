import { BrowserRouter, Route, Link } from "react-router-dom";
import Snack from "./snack"

const VendingMachine = () => {
    return (
        <div className="VendingMachine">
            <BrowserRouter>
                <Route exact path="/">
                    <Link exact to="/squirt">Squirt</Link>
                    <Link exact to="/mtn-dew">Mtn-Dew</Link>
                    <Link exact to="/sierra-mist">Sierra-Mist</Link>
                    <Link exact to="/sprite">Sprite</Link>
                </Route>
                <Route exact path="/squirt">
                    <Snack name="squirt" />
                </Route>
                <Route exact path="/mtn-dew">
                    <Snack name="mtn-dew" />
                </Route>
                <Route exact path="/sierra-mist">
                    <Snack name="sierra-mist" />
                </Route>
                <Route exact path="/sprite">
                    <Snack name="sprite" />
                </Route>
            </BrowserRouter>
        </div>
    )
}

export default VendingMachine;