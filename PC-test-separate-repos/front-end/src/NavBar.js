import { NavLink } from "react-router-dom";
import './static/NavBar.css';

const NavBar = ({user, setUser}) => {
    let userLinks;
    let userMessage;

    const logout = () => {
        localStorage.clear();
        setUser(() => '');
    }

    let navClass = 'NavBar black';

    if (user) {
        navClass = 'NavBar eggplant';
    }

    if (localStorage.token) {
        userLinks = [            
            <NavLink key="1" className="NavBar-link" to="/profile">PROFILE</NavLink>,
            <NavLink key="2" className="NavBar-link" to="/favorites">FAVORITES</NavLink>,
            <NavLink key="3" className="NavBar-link" onClick={logout} to="/">LOG OUT</NavLink>
            ]
    }

    if (!localStorage.token) {
        userLinks = [
            <NavLink key="4" className="NavBar-link" to="/login">LOGIN / SIGN UP</NavLink>,
        ]
    }

    return (
        <div className={navClass}>
            {userLinks}
        </div>
    )
}

export default NavBar;  