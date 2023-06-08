import { NavLink } from "react-router-dom";
import './resources/Navbar.css';

const NavBar = ({setUser}) => {
    let userLinks;

    const logout = () => {
        localStorage.clear();
        setUser(() => '');
    }

    if (localStorage.token) {
        userLinks = [            
            <NavLink className="Navbar-link" to="/profile">PROFILE</NavLink>,
            <NavLink className="Navbar-link" onClick={logout} to="/">LOG OUT</NavLink>
            ]
    }

    if (!localStorage.token) {
        userLinks = [
            <NavLink className="Navbar-link" to="/login">LOGIN</NavLink>,
            <NavLink className="Navbar-link" to="/signup">SIGN UP</NavLink>
        ]
    }

    return (
        <div className="Navbar">
            <NavLink className="Navbar-link" to="/companies">COMPANIES</NavLink>
            <NavLink className="Navbar-link" to="/jobs">JOBS</NavLink>
            {userLinks}
        </div>
    )
}

export default NavBar;